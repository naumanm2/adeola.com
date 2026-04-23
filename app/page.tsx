import Image from 'next/image'
import Link from 'next/link'
import { sanityFetch } from '@/sanity/lib/live'
import { urlFor, hasAsset } from '@/sanity/lib/image'
import CTA from './components/cta'
import SiteFooter from './components/site-footer'

const GENERAL_QUERY = `*[_type == "general"][0]{
  title,
  subtitle,
  mainImage,
  profileImage,
  introShort
}`

const VIDEO_QUERY = `*[_type == "video"] | order(date desc) [0...1]{
  _id,
  title,
  subtitle,
  thumbnail,
  videourl
}`

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

  return (
    <div className="flex flex-col gap-12 md:gap-20">
      {/* ── Hero ── */}
      <section className="relative pt-16 md:pt-24">
        <div className="grid gap-8 md:grid-cols-2 md:items-center md:gap-10">
          <div className="flex flex-col items-start">
            <div className="label-role mb-2 flex gap-3 px-1">
              <span>SINGER</span>
              <span aria-hidden="true">•</span>
              <span>SONGWRITER</span>
            </div>
            <h1 className="font-bold leading-none tracking-tight">
              {general?.title ?? 'ADEOLA'}
            </h1>
            <div className="mt-5">
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
        <section className="relative">
          <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)] items-center gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-12">
            {hasAsset(general?.profileImage) && (
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src={urlFor(general.profileImage).width(700).url()}
                  alt={general.profileImage.alt ?? ''}
                  fill
                  sizes="(min-width: 768px) 33vw, 35vw"
                  className="object-cover"
                />
              </div>
            )}
            <p className="text-gradient-pink-blue text-xl font-medium tracking-wide leading-snug sm:text-2xl md:text-4xl md:leading-tight">
              {general.introShort}
            </p>
          </div>
        </section>
      )}

      {/* ── Featured video ── */}
      {featuredVideo && (
        <section className="flex flex-col gap-4 md:gap-6">
          <div className="flex items-end justify-between gap-4">
            <p className="display-section">Video</p>
            <Link
              href="/video"
              className="nav-link rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            >
              See all
            </Link>
          </div>

          <Link
            href={featuredVideo.videourl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
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
            <div className="flex flex-col gap-1">
              <p className="text-xl md:text-2xl font-bold uppercase tracking-tight text-white">
                {featuredVideo.title}
              </p>
              {featuredVideo.subtitle && featuredVideo.subtitle.length > 0 && (
                <p className="text-base tracking-tight text-white/60">
                  {featuredVideo.subtitle.join(' · ')}
                </p>
              )}
            </div>
          </Link>
        </section>
      )}

      {/* ── About card ── */}
      {general?.introShort && (
        <section className="flex flex-col gap-6 rounded-xl border border-white p-6 md:p-10">
          <p className="display-section">About</p>
          <p className="text-gradient-fade body-text md:text-lg md:leading-relaxed md:max-w-3xl">
            {general.introShort}
          </p>
          <div>
            <CTA link="/about" text="See full bio" />
          </div>
        </section>
      )}

      <SiteFooter wordmark="ADE" size="sm" />
    </div>
  )
}
