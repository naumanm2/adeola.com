import Image from 'next/image'
import Link from 'next/link'
import { sanityFetch } from '@/sanity/lib/live'
import { urlFor, hasAsset } from '@/sanity/lib/image'
import SiteFooter from '../components/site-footer'

type Video = {
  _id: string
  title: string
  subtitle?: string[]
  date?: string
  thumbnail?: { asset: object; alt?: string }
  videourl: string
}

const VIDEO_QUERY = `*[_type == "video"] | order(date desc){
  _id,
  title,
  subtitle,
  date,
  thumbnail,
  videourl
}`

function formatDate(date?: string) {
  if (!date) return null
  const d = new Date(date)
  const day = String(d.getUTCDate()).padStart(2, '0')
  const month = d
    .toLocaleString('en-US', { month: 'short', timeZone: 'UTC' })
    .toUpperCase()
  const year = d.getUTCFullYear()
  return `${day} ${month} ${year}`
}

function VideoCard({ video, featured }: { video: Video; featured?: boolean }) {
  return (
    <Link
      href={video.videourl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-white/5">
        {hasAsset(video.thumbnail) ? (
          <Image
            src={urlFor(video.thumbnail)
              .width(featured ? 1600 : 900)
              .url()}
            alt={(video.thumbnail as { alt?: string }).alt ?? video.title}
            fill
            sizes={
              featured
                ? '(min-width: 1024px) 1280px, 100vw'
                : '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'
            }
            className="object-cover transition-opacity duration-300 group-hover:opacity-70"
          />
        ) : (
          <div className="h-full w-full bg-white/5" />
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`flex items-center justify-center rounded-full bg-white/10 transition-colors duration-300 group-hover:bg-white/20 ${
              featured ? 'h-14 w-14 md:h-16 md:w-16' : 'h-12 w-12 md:h-14 md:w-14'
            }`}
          >
            <svg
              width="14"
              height="16"
              viewBox="0 0 8 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M8 4.5L0 9L0 0L8 4.5Z" fill="white" />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <p
          className={`font-bold uppercase tracking-tight text-white ${
            featured ? 'text-2xl md:text-3xl' : 'text-base md:text-lg'
          }`}
        >
          {video.title}
        </p>
        {video.subtitle && video.subtitle.length > 0 && (
          <p className="text-sm tracking-wide text-white/60 md:text-base">
            {video.subtitle.join(' · ')}
          </p>
        )}
        {video.date && (
          <p className="text-micro mt-1 text-white/60">
            {formatDate(video.date)}
          </p>
        )}
      </div>
    </Link>
  )
}

export default async function VideoPage() {
  const { data: videos } = await sanityFetch({ query: VIDEO_QUERY })
  const list: Video[] = videos ?? []

  const featured = list[0]
  const rest = list.slice(1)

  // Group rest by year
  const groups = new Map<string, Video[]>()
  for (const v of rest) {
    const year = v.date ? String(new Date(v.date).getUTCFullYear()) : '—'
    if (!groups.has(year)) groups.set(year, [])
    groups.get(year)!.push(v)
  }

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="pt-16 md:pt-24">
        <div className="flex items-start gap-2 leading-none">
          <p className="display-section">Video</p>
          <span className="text-gradient-gold text-lg md:text-2xl font-bold">
            ({list.length})
          </span>
        </div>
        <div className="relative mt-6 flex flex-col items-center overflow-hidden">
          <span className="display-giant display-giant--xl whitespace-nowrap text-white">
            VIDEO
          </span>
          <span
            className="display-giant display-giant--xl reflect whitespace-nowrap"
            aria-hidden="true"
          >
            VIDEO
          </span>
        </div>
      </section>

      {list.length > 0 ? (
        <>
          {featured && (
            <section className="mt-12 md:mt-20">
              <VideoCard video={featured} featured />
            </section>
          )}

          {rest.length > 0 && (
            <section className="mt-16 md:mt-24 flex flex-col gap-12 md:gap-16">
              {Array.from(groups.entries()).map(([year, items]) => (
                <div key={year} className="flex flex-col gap-6 md:gap-8">
                  <div className="flex items-baseline gap-3 border-b border-white/20 pb-3">
                    <p className="text-2xl md:text-3xl font-bold tracking-widest text-white">
                      {year}
                    </p>
                    <span className="text-sm text-white/40 tracking-widest">
                      ({items.length})
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((video) => (
                      <VideoCard key={video._id} video={video} />
                    ))}
                  </div>
                </div>
              ))}
            </section>
          )}
        </>
      ) : (
        <p className="mt-12 border-t border-white/20 pt-5 text-sm text-white/60">
          No videos yet.
        </p>
      )}

      <SiteFooter wordmark="VIDEO" />
    </div>
  )
}
