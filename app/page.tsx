import Image from 'next/image'
import { sanityFetch } from '@/sanity/lib/live'
import { urlFor, hasAsset } from '@/sanity/lib/image'
import CTA from './components/cta'
import AudioPlayer from './components/audio-player'
import SiteFooter from './components/site-footer'
import VideoSection from './components/sections/video-section'
import GallerySection from './components/sections/gallery-section'
import AboutSection from './components/sections/about-section'

const HERO_QUERY = `{
  "general": *[_type == "general"][0]{
    title,
    mainImage,
    profileImage,
    introShort
  },
  "track": *[_type == "audio"] | order(_createdAt desc)[0]{
    title,
    subtitle,
    coverImage,
    "src": audio.asset->url
  }
}`

export default async function Home() {
  const { data } = await sanityFetch({ query: HERO_QUERY })
  const general = data?.general
  const track = data?.track

  return (
    <div>
      {/* Hero */}
      <section className="pt-10 pb-3 md:pb-10">
        {/* Text sits above the image, which is pulled up behind the title */}
        <div className="relative z-10">
          <div
            style={{
              display: 'flex',
              gap: 10,
              color: 'rgba(255,255,255,0.6)',
              fontSize: '0.85rem',
              letterSpacing: '0.04em',
              marginBottom: 12,
              textTransform: 'uppercase',
            }}
          >
            <span>SINGER</span>
            <span aria-hidden="true">•</span>
            <span>SONGWRITER</span>
          </div>

          <h1 className="hero-title m-0 mb-7 uppercase">
            {general?.title ?? 'ADEOLA'}
          </h1>

          <div>
            <CTA link="#music" text="EP OUT NOW" className="w-full md:w-auto" />
          </div>
        </div>

        {hasAsset(general?.mainImage) && (
          <div
            id="music"
            className="relative -mx-5 -mt-[calc((100vw-2.5rem)/3.95*0.92+4.5rem)] aspect-[3/4] md:-mt-[calc(clamp(3.2rem,11vw,7.5rem)*0.92+4.5rem)] scroll-mt-24 md:mx-0 md:max-w-[480px]"
          >
            <Image
              src={urlFor(general.mainImage).width(1200).url()}
              alt={general.mainImage.alt ?? ''}
              fill
              sizes="(min-width: 768px) 480px, 100vw"
              className="object-cover mix-blend-lighten"
              priority
            />
            {track?.src && (
              <div className="absolute inset-x-3 bottom-3">
                <AudioPlayer
                  src={track.src}
                  title={track.title}
                  subtitle={track.subtitle}
                  coverUrl={
                    hasAsset(track.coverImage)
                      ? urlFor(track.coverImage).width(112).height(112).url()
                      : undefined
                  }
                  coverAlt={track.coverImage?.alt}
                />
              </div>
            )}
          </div>
        )}
      </section>

      {/* Bio quote */}
      {general?.introShort && (
        <section className="py-3 md:pt-5 md:pb-[30px]">
          {/* Container so the photo width (cqw) tracks the text column */}
          <div className="max-w-[780px] [container-type:inline-size]">
            <p
              className="text-gradient-pink-blue bio-fade m-0"
              style={{
                fontSize: 'clamp(1.3rem, 3.2vw, 2rem)',
                fontWeight: 500,
                letterSpacing: '0.01em',
                lineHeight: 1.2,
                ...(hasAsset(general.profileImage) && {
                  '--bio-img-w': 'min(47cqw, 280px)',
                  '--bio-img-h': 'calc(var(--bio-img-w) * 1.5)',
                }),
              }}
            >
              {/* Inline-block photo: text starts on its bottom edge, then wraps below */}
              {hasAsset(general.profileImage) && (
                <Image
                  src={urlFor(general.profileImage).width(600).url()}
                  alt={general.profileImage.alt ?? ''}
                  width={600}
                  height={900}
                  sizes="(min-width: 640px) 280px, 47vw"
                  className="mr-2 inline-block h-[var(--bio-img-h)] w-[var(--bio-img-w)] object-cover align-baseline"
                />
              )}
              {general.introShort}
            </p>
          </div>
        </section>
      )}

      <VideoSection />
      <GallerySection />
      <AboutSection />
      <SiteFooter />
    </div>
  )
}
