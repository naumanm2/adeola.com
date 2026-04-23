import Image from 'next/image'
import Link from 'next/link'
import { sanityFetch } from '@/sanity/lib/live'
import { urlFor } from '@/sanity/lib/image'
import CTA from './components/cta'

const GENERAL_QUERY = `*[_type == "general"][0]{
  title,
  subtitle,
  mainImage,
  profileImage,
  introShort,
  socials
}`

const VIDEO_QUERY = `*[_type == "video"] | order(date desc) [0...4]{
  _id,
  title,
  subtitle,
  thumbnail,
  videourl
}`

function hasAsset(img: unknown): img is { asset: { _ref: string } } {
  if (typeof img !== 'object' || img === null) return false
  const asset = (img as { asset?: unknown }).asset
  return typeof asset === 'object' && asset !== null && '_ref' in asset
}

type Social = { social: string; url: string }
type Video = {
  _id: string
  title: string
  subtitle?: string[]
  thumbnail?: { asset: object; alt?: string }
  videourl: string
}

export default async function Home() {
  const { data: general } = await sanityFetch({ query: GENERAL_QUERY })
  const { data: videos } = await sanityFetch({ query: VIDEO_QUERY })

  const featuredVideo: Video | undefined = videos?.[0]
  const moreVideos: Video[] = videos?.slice(1) ?? []

  return (
    <div className="flex flex-col gap-6 md:gap-12">
      {/* ── Hero ── */}
      <section className="relative pt-16 md:pt-24">
        <div className="grid gap-6 md:grid-cols-2 md:items-center md:gap-10">
          <div className="flex flex-col items-start">
            <div className="mb-1 flex gap-3 px-1 text-base tracking-tight text-white/60">
              <span>SINGER</span>
              <span aria-hidden="true">•</span>
              <span>SONGWRITER</span>
            </div>
            <h1 className="font-bold leading-none tracking-tight">
              {general?.title ?? 'ADEOLA'}
            </h1>
            <div className="mt-4">
              <CTA link="/audio" text="EP OUT NOW" />
            </div>
          </div>

          {hasAsset(general?.mainImage) && (
            <div className="relative mx-auto aspect-square w-full max-w-sm md:max-w-none md:-mt-8">
              <Image
                src={urlFor(general.mainImage).width(900).url()}
                alt={general.mainImage.alt ?? ''}
                fill
                sizes="(min-width: 768px) 50vw, 90vw"
                className="object-cover mix-blend-lighten"
                priority
              />
            </div>
          )}
        </div>
      </section>

      {/* ── Bio / Quote ── */}
      {general?.introShort && (
        <section className="relative pb-6">
          <div className="grid gap-6 md:grid-cols-[1fr_2fr] md:items-center md:gap-10">
            {hasAsset(general?.profileImage) ? (
              <div className="relative float-left mr-4 mb-2 aspect-[3/4] w-[40%] md:float-none md:m-0 md:w-full">
                <Image
                  src={urlFor(general.profileImage).width(600).url()}
                  alt={general.profileImage.alt ?? ''}
                  fill
                  sizes="(min-width: 768px) 33vw, 40vw"
                  className="object-cover"
                />
              </div>
            ) : null}
            <p className="text-gradient-pink-blue text-2xl font-medium tracking-wide leading-snug md:text-4xl md:leading-tight">
              {general.introShort}
            </p>
          </div>
          <div className="clear-both md:hidden" />
        </section>
      )}

      {/* ── Videos ── */}
      {videos && videos.length > 0 && (
        <section className="flex flex-col gap-3 md:gap-6">
          <div className="flex flex-col gap-1">
            <p className="text-5xl md:text-6xl font-bold tracking-widest text-white">
              VIDEOS
            </p>
            {featuredVideo?.subtitle && featuredVideo.subtitle.length > 0 && (
              <p className="text-base tracking-tight text-white/60">
                {featuredVideo.subtitle.join(' · ')}
              </p>
            )}
          </div>

          {/* Featured video */}
          {featuredVideo && (
            <Link
              href={featuredVideo.videourl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-white/5">
                {hasAsset(featuredVideo.thumbnail) ? (
                  <Image
                    src={urlFor(featuredVideo.thumbnail).width(1600).url()}
                    alt={
                      (featuredVideo.thumbnail as { alt?: string }).alt ??
                      featuredVideo.title
                    }
                    fill
                    sizes="(min-width: 1024px) 1280px, 100vw"
                    className="object-cover transition-opacity duration-300 group-hover:opacity-70"
                  />
                ) : (
                  <div className="h-full w-full bg-white/5" />
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 transition-colors duration-300 group-hover:bg-white/20 md:h-16 md:w-16">
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
              <p className="text-xl md:text-2xl font-bold uppercase tracking-tight text-white">
                {featuredVideo.title}
              </p>
            </Link>
          )}

          {/* See all CTA */}
          <div>
            <CTA link="/video" text="See all videos" />
          </div>

          {/* More videos — horizontal scroll on mobile, grid on md+ */}
          {moreVideos.length > 0 && (
            <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0">
              {moreVideos.map((video) => (
                <Link
                  key={video._id}
                  href={video.videourl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex w-[70vw] max-w-[280px] flex-none flex-col gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 md:w-auto md:max-w-none"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-white/5">
                    {hasAsset(video.thumbnail) ? (
                      <Image
                        src={urlFor(video.thumbnail).width(600).url()}
                        alt={
                          (video.thumbnail as { alt?: string }).alt ??
                          video.title
                        }
                        fill
                        sizes="(min-width: 768px) 33vw, 70vw"
                        className="object-cover transition-opacity duration-300 group-hover:opacity-70"
                      />
                    ) : (
                      <div className="h-full w-full bg-white/5" />
                    )}
                  </div>
                  <p className="text-sm md:text-base font-bold uppercase tracking-tight text-white">
                    {video.title}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </section>
      )}

      {/* ── About ── */}
      {general?.introShort && (
        <section className="flex flex-col gap-6 rounded-xl border border-white p-4 md:p-8">
          <div className="flex flex-col gap-3">
            <p className="text-3xl md:text-4xl font-bold uppercase tracking-widest text-white">
              ABOUT
            </p>
            <p className="text-gradient-fade text-base md:text-lg font-medium tracking-wide leading-snug md:leading-relaxed md:max-w-3xl">
              {general.introShort}
            </p>
          </div>
          <div>
            <CTA link="/about" text="See full bio" />
          </div>
        </section>
      )}

      {/* ── Socials + Footer ── */}
      <section className="flex flex-col gap-6">
        {/* Social links */}
        {general?.socials && general.socials.length > 0 && (
          <div className="border-t border-white px-3 pt-6 pb-4">
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {general.socials.map((s: Social) => (
                <Link
                  key={s.social}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-sm py-1 text-lg md:text-xl font-bold tracking-widest text-white transition-colors duration-200 hover:text-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                >
                  {s.social.toUpperCase()}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Large reflective ADE text */}
        <div className="relative flex h-48 items-center justify-center overflow-hidden md:h-64">
          <p
            className="select-none font-bold leading-none tracking-tighter text-white/10"
            style={{
              fontSize: 'clamp(6rem, 28vw, 12rem)',
              transform: 'scaleY(-1)',
            }}
            aria-hidden="true"
          >
            ADE
          </p>
          <p
            className="absolute select-none font-bold leading-none tracking-tighter text-white"
            style={{ fontSize: 'clamp(6rem, 28vw, 12rem)' }}
          >
            ADE
          </p>
        </div>

        {/* Copyright */}
        <div className="flex items-center justify-center pb-6">
          <p className="text-xs tracking-widest text-white">
            cc. Adeola Ikuesan 2026
          </p>
        </div>
      </section>
    </div>
  )
}
