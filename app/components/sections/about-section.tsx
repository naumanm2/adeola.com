import { sanityFetch } from '@/sanity/lib/live'
import Reflection from '../reflection'

const GENERAL_QUERY = `*[_type == "general"][0]{
  introShort
}`

export default async function AboutSection() {
  const { data: general } = await sanityFetch({ query: GENERAL_QUERY })

  return (
    <section id="about" className="scroll-mt-24 pt-10 pb-[30px]">
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
          <Reflection style={{ fontWeight: 700, fontSize: 'clamp(1.4rem, 3vw, 2rem)', letterSpacing: '0.1em', lineHeight: 1 }}>
            ABOUT
          </Reflection>
        </div>
        {general?.introShort && (
          <p
            style={{
              fontSize: '1rem',
              fontWeight: 500,
              letterSpacing: '0.005em',
              lineHeight: 1.55,
              margin: 0,
              color: 'rgba(255,255,255,0.82)',
              maxWidth: 720,
            }}
          >
            {general.introShort}
          </p>
        )}
      </div>
    </section>
  )
}
