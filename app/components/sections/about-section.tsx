import { sanityFetch } from '@/sanity/lib/live'
import CTA from '../cta'
import Reflection from '../reflection'

const GENERAL_QUERY = `*[_type == "general"][0]{
  aboutText,
  introShort
}`

export default async function AboutSection() {
  const { data: general } = await sanityFetch({ query: GENERAL_QUERY })
  // Falls back to the short intro until "About Card Text" is filled in Studio
  const text: string | undefined = general?.aboutText || general?.introShort

  return (
    <section id="about" className="scroll-mt-24 py-3 md:pt-10 md:pb-[30px]">
      <div
        style={{
          border: '1px solid rgba(255,255,255,0.7)',
          borderRadius: 12,
          padding: 'clamp(20px, 4vw, 36px)',
          display: 'grid',
          gap: 18,
        }}
      >
        <div>
          <h2
            style={{
              fontWeight: 700,
              fontSize: 'clamp(1.4rem, 3vw, 2rem)',
              letterSpacing: '0.1em',
              lineHeight: 1,
            }}
          >
            ABOUT
          </h2>
          <Reflection
            style={{
              fontWeight: 700,
              fontSize: 'clamp(1.4rem, 3vw, 2rem)',
              letterSpacing: '0.1em',
              lineHeight: 1,
            }}
          >
            ABOUT
          </Reflection>
        </div>
        {text && (
          <p className="text-gradient-fade about-fade m-0 max-w-[720px] text-lg leading-[1.3] font-medium md:text-xl">
            {text}
          </p>
        )}
        <div className="mt-4">
          <CTA link="/about" text="See full bio" className="w-full md:w-auto" />
        </div>
      </div>
    </section>
  )
}
