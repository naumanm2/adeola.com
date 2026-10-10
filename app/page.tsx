import Image from 'next/image'
import { sanityFetch } from '@/sanity/lib/live'
import { urlFor, hasAsset } from '@/sanity/lib/image'
import CTA from './components/cta'
import AudioPlayer from './components/audio-player'
import SiteFooter from './components/site-footer'
import ShowsSection from './components/sections/shows-section'
import VideoSection from './components/sections/video-section'
import AboutSection from './components/sections/about-section'

const HERO_QUERY = `{
  "general": *[_type == "general"][0]{
    title,
    mainImage,
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
      <section className="pt-10 pb-10">
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
        <section className="pt-5 pb-[30px]">
          <p
            className="text-gradient-pink-blue m-0"
            style={{
              fontSize: 'clamp(1.3rem, 3.2vw, 2rem)',
              fontWeight: 500,
              letterSpacing: '0.01em',
              lineHeight: 1.2,
              maxWidth: 780,
            }}
          >
            {general.introShort}
          </p>
        </section>
      )}

      <VideoSection />
      <ShowsSection />
      <AboutSection />
      <SiteFooter />
    </div>
  )
}
