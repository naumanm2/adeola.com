import Image from 'next/image'
import { sanityFetch } from '@/sanity/lib/live'
import { urlFor, hasAsset } from '@/sanity/lib/image'
import CTA from './components/cta'
import SiteFooter from './components/site-footer'
import ShowsSection from './components/sections/shows-section'
import VideoSection from './components/sections/video-section'
import AboutSection from './components/sections/about-section'

const HERO_QUERY = `*[_type == "general"][0]{
  title,
  subtitle,
  mainImage,
  introShort
}`

export default async function Home() {
  const { data: general } = await sanityFetch({ query: HERO_QUERY })

  return (
    <div>
      {/* Hero */}
      <section className="pt-10 pb-10">
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

        <h1 className="m-0 mb-7 uppercase">
          {general?.title ?? 'ADEOLA'}
        </h1>

        <div className="mb-2.5">
          <CTA link="#music" text={general?.subtitle ?? 'EP OUT NOW'} />
        </div>

        {hasAsset(general?.mainImage) && (
          <div
            className="relative mx-auto max-w-[480px]"
            style={{ marginTop: -30, aspectRatio: '3/4' }}
          >
            <Image
              src={urlFor(general.mainImage).width(960).url()}
              alt={general.mainImage.alt ?? ''}
              fill
              sizes="(min-width: 768px) 480px, 100vw"
              className="object-contain mix-blend-lighten"
              priority
            />
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
