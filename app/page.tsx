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
    <div className="flex flex-col gap-6">
      {/* ── Hero ── */}
      <section className="relative flex flex-col items-start pt-16 pb-0 overflow-hidden">
        {/* Role label */}
        <div className="flex gap-3 text-white/60 text-base tracking-tight mb-1 px-1">
          <span>SINGER</span>
          <span>•</span>
          <span>SONGWRITER</span>
        </div>

        {/* Name */}
        <h1 className="font-bold leading-none tracking-tight">
          {general?.title ?? 'ADEOLA'}
        </h1>

        {/* EP CTA — full width */}
        <div className="w-full mt-3">
          <CTA link="/audio" text="EP OUT NOW" />
        </div>

        {/* Hero image — mix-blend-lighten for ghost effect */}
        {hasAsset(general?.mainImage) && (
          <div className="relative w-full max-w-sm aspect-[1/1] -mt-4 self-center">
            <Image
              src={urlFor(general.mainImage).width(600).url()}
              alt={general.mainImage.alt ?? ''}
              fill
              className="object-cover mix-blend-lighten"
              priority
            />
          </div>
        )}
      </section>

      {/* ── Bio / Quote ── */}
      {general?.introShort && (
        <section className="relative flex flex-col pb-6">
          {hasAsset(general?.profileImage) && (
            <div className="relative float-left mr-4 mb-2 w-[40%] aspect-[3/4]">
              <Image
                src={urlFor(general.profileImage).width(300).url()}
                alt={general.profileImage.alt ?? ''}
                fill
                className="object-cover"
              />
            </div>
          )}
          <p
            className="text-2xl font-medium tracking-wide leading-snug bg-clip-text text-transparent"
            style={{
              backgroundImage:
                'linear-gradient(180deg, #ffcee5 0%, #ffcee5 50%, #002f6d 100%)',
            }}
          >
            {general.introShort}
          </p>
          <div style={{ clear: 'both' }} />
        </section>
      )}

      {/* ── Videos ── */}
      {videos && videos.length > 0 && (
        <section className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <p className="text-5xl font-bold tracking-widest text-white">
              VIDEOS
            </p>
            {featuredVideo?.subtitle && featuredVideo.subtitle.length > 0 && (
              <p className="text-white/60 text-base tracking-tight">
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
              className="group flex flex-col gap-2"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-white/5">
                {hasAsset(featuredVideo.thumbnail) ? (
                  <Image
                    src={urlFor(featuredVideo.thumbnail).width(800).url()}
                    alt={
                      (featuredVideo.thumbnail as { alt?: string }).alt ??
                      featuredVideo.title
                    }
                    fill
                    className="object-cover transition-opacity duration-300 group-hover:opacity-70"
                  />
                ) : (
                  <div className="w-full h-full bg-white/5" />
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors duration-300">
                    <svg
                      width="14"
                      height="16"
                      viewBox="0 0 8 9"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M8 4.5L0 9L0 0L8 4.5Z" fill="white" />
                    </svg>
                  </div>
                </div>
              </div>
              <p className="font-bold text-xl tracking-tight text-white uppercase">
                {featuredVideo.title}
              </p>
            </Link>
          )}

          {/* See all CTA */}
          <CTA link="/video" text="See all videos" />

          {/* More videos — horizontal scroll row */}
          {moreVideos.length > 0 && (
            <div className="flex gap-3 overflow-x-auto -mx-4 px-4 pb-2">
              {moreVideos.map((video) => (
                <Link
                  key={video._id}
                  href={video.videourl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex-none w-[70vw] max-w-[280px] flex flex-col gap-2"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-white/5">
                    {hasAsset(video.thumbnail) ? (
                      <Image
                        src={urlFor(video.thumbnail).width(400).url()}
                        alt={
                          (video.thumbnail as { alt?: string }).alt ??
                          video.title
                        }
                        fill
                        className="object-cover transition-opacity duration-300 group-hover:opacity-70"
                      />
                    ) : (
                      <div className="w-full h-full bg-white/5" />
                    )}
                  </div>
                  <p className="font-bold text-sm tracking-tight text-white uppercase">
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
        <section className="border border-white rounded-xl p-4 flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <p className="text-3xl font-bold tracking-widest text-white uppercase">
              ABOUT
            </p>
            <p
              className="text-base font-medium tracking-wide leading-snug bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  'linear-gradient(180deg, #f6f6f6 0%, rgba(246,246,246,0) 100%)',
              }}
            >
              {general.introShort}
            </p>
          </div>
          <CTA link="/about" text="See full bio" />
        </section>
      )}

      {/* ── Socials + Footer ── */}
      <section className="flex flex-col gap-6">
        {/* Social links */}
        {general?.socials && general.socials.length > 0 && (
          <div className="border-t border-white pt-6 pb-4 px-3">
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {general.socials.map((s: Social) => (
                <Link
                  key={s.social}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white font-bold text-lg tracking-widest hover:text-white/70 transition-colors duration-200"
                >
                  {s.social.toUpperCase()}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Large reflective ADE text */}
        <div className="relative flex items-center justify-center h-48 overflow-hidden">
          {/* Reflection */}
          <p
            className="font-bold text-[clamp(6rem,28vw,12rem)] leading-none tracking-tighter text-white/10 select-none"
            style={{ transform: 'scaleY(-1)' }}
            aria-hidden="true"
          >
            ADE
          </p>
          {/* Real text */}
          <p className="absolute font-bold text-[clamp(6rem,28vw,12rem)] leading-none tracking-tighter text-white select-none">
            ADE
          </p>
        </div>

        {/* Copyright */}
        <div className="flex items-center justify-center pb-6">
          <p className="text-white text-xs tracking-widest">
            cc. Adeola Ikuesan 2026
          </p>
        </div>
      </section>
    </div>
  )
}
