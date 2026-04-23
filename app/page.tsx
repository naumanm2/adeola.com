import Image from 'next/image'
import { sanityFetch } from '@/sanity/lib/live'
import { urlFor, hasAsset } from '@/sanity/lib/image'
import CTA from './components/cta'
import SiteFooter from './components/site-footer'
import ShowsSection from './components/sections/shows-section'
import AudioSection from './components/sections/audio-section'
import VideoSection from './components/sections/video-section'
import AboutSection from './components/sections/about-section'

const HERO_QUERY = `*[_type == "general"][0]{
  title,
  subtitle,
  mainImage,
  profileImage,
  introShort
}`

export default async function Home() {
  const { data: general } = await sanityFetch({ query: HERO_QUERY })

  return (
    <div className="flex flex-col gap-20 md:gap-32">
      {/* Hero */}
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
              <CTA link="#audio" text="EP OUT NOW" />
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

      {/* Bio quote */}
      {general?.introShort && (
        <section>
          <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)] items-center gap-5 md:gap-12">
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

      <ShowsSection />
      <AudioSection />
      <VideoSection />
      <AboutSection />

      <SiteFooter />
    </div>
  )
}
