import Link from 'next/link'
import { sanityFetch } from '@/sanity/lib/live'
import NewsletterForm from './newsletter-form'

type Social = { social: string; url: string }
type General = { socials?: Social[] }

const FOOTER_QUERY = `*[_type == "general"][0]{
  socials[]{ social, url }
}`

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  instagram: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  spotify: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424a.622.622 0 0 1-.857.207c-2.348-1.435-5.304-1.76-8.785-.964a.622.622 0 1 1-.277-1.215c3.809-.87 7.076-.496 9.712 1.115.294.181.387.564.207.857zm1.223-2.722a.78.78 0 0 1-1.072.258c-2.687-1.652-6.785-2.13-9.965-1.165a.78.78 0 0 1-.973-.519.781.781 0 0 1 .519-.972c3.632-1.102 8.147-.568 11.234 1.326a.78.78 0 0 1 .257 1.072zm.105-2.835C14.692 8.95 9.375 8.775 6.297 9.71a.937.937 0 1 1-.543-1.794c3.514-1.066 9.354-.86 13.045 1.345a.937.937 0 0 1-.885 1.606z" />
    </svg>
  ),
  'apple music': (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23 6.998v9.01c0 2.76-2.24 5-5 5H6c-2.76 0-5-2.24-5-5v-9.01c0-2.76 2.24-5 5-5h12c2.76 0 5 2.24 5 5zm-6.987-1.02L9.96 7.808v5.99c-.327-.094-.672-.149-1.03-.149-1.768 0-3.2 1.19-3.2 2.66s1.432 2.66 3.2 2.66 3.2-1.19 3.2-2.66V9.62l4.053-1.365v4.533c-.327-.094-.672-.149-1.03-.149-1.768 0-3.2 1.19-3.2 2.66s1.432 2.66 3.2 2.66S18.353 16.76 18.353 15.3V7.408l-2.34.57z" />
    </svg>
  ),
  youtube: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
  tiktok: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.95a8.28 8.28 0 0 0 4.84 1.54V7.03a4.85 4.85 0 0 1-1.07-.34z" />
    </svg>
  ),
  bandcamp: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M0 18.75l7.437-13.5H24l-7.438 13.5z" />
    </svg>
  ),
  twitter: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.213 5.567 5.95-5.567zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
}

export default async function SiteFooter() {
  const { data } = await sanityFetch({ query: FOOTER_QUERY })
  const general = (data ?? {}) as General
  const socials = general.socials ?? []

  return (
    <footer
      className="flex flex-col"
      style={{ gap: 44, paddingTop: 60, paddingBottom: 20 }}
    >
      {/* Newsletter */}
      <div
        id="newsletter"
        style={{
          borderTop: '1px solid rgba(255,255,255,0.25)',
          paddingTop: 36,
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
        }}
      >
        <div>
          <div
            style={{
              fontWeight: 700,
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              letterSpacing: '0.1em',
              lineHeight: 1,
            }}
          >
            NEWSLETTER
          </div>
          <div style={{ height: '1.25rem', overflow: 'hidden' }}>
            <span
              aria-hidden="true"
              style={{
                display: 'block',
                fontWeight: 700,
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                letterSpacing: '0.1em',
                lineHeight: 1,
                color: 'transparent',
                userSelect: 'none',
                pointerEvents: 'none',
                marginTop: 1,
                transform: 'scaleY(-1)',
                backgroundImage:
                  'linear-gradient(to top, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 50%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
              }}
            >
              NEWSLETTER
            </span>
          </div>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 36,
            alignItems: 'start',
          }}
        >
          <div>
            <div
              style={{
                fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
                fontWeight: 500,
                letterSpacing: '-0.01em',
                lineHeight: 1.1,
                marginBottom: 10,
              }}
            >
              Letters from the studio.
            </div>
            <div
              style={{
                fontSize: '0.85rem',
                color: 'rgba(255,255,255,0.6)',
                lineHeight: 1.5,
                maxWidth: 360,
              }}
            >
              Mostly quiet. A handful of times a year.
            </div>
          </div>
          <NewsletterForm />
        </div>
      </div>

      {/* Social icons */}
      {socials.length > 0 && (
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.2)',
            paddingTop: 28,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 24,
            alignItems: 'center',
          }}
        >
          {socials.map((s) => {
            const key = s.social.toLowerCase()
            const icon = SOCIAL_ICONS[key]
            return (
              <Link
                key={s.social}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.social}
                className="flex items-center justify-center text-white transition-colors duration-200 hover:text-white/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                style={{ width: 52, height: 52 }}
              >
                {icon ? (
                  <span
                    style={{ width: 32, height: 32, display: 'flex' }}
                    aria-hidden="true"
                  >
                    {icon}
                  </span>
                ) : (
                  <span
                    style={{
                      fontSize: '0.7rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      fontWeight: 700,
                    }}
                  >
                    {s.social}
                  </span>
                )}
              </Link>
            )
          })}
        </div>
      )}

      {/* Wordmark + reflection */}
      <div className="-mx-5 md:-mx-10">
        {/* Main wordmark */}
        <div style={{ textAlign: 'center' }}>
          <span
            style={{
              display: 'block',
              fontWeight: 700,
              fontSize: 'clamp(5rem, 24vw, 17rem)',
              letterSpacing: '-0.055em',
              color: '#fff',
              userSelect: 'none',
              lineHeight: 0.92,
            }}
          >
            ADEOLA
          </span>
        </div>
        {/* Reflection — scaleY(-1) from default center origin keeps content within
            its layout bounds; gradient "to top" in pre-flip space becomes bright-at-top
            after flip, giving a fade that's strongest near the join */}
        <div
          style={{
            textAlign: 'center',
            height: 'clamp(3rem, 10vw, 8rem)',
            overflow: 'hidden',
          }}
        >
          <span
            aria-hidden="true"
            style={{
              display: 'block',
              fontWeight: 700,
              fontSize: 'clamp(5rem, 24vw, 17rem)',
              letterSpacing: '-0.055em',
              lineHeight: 0.92,
              color: 'transparent',
              userSelect: 'none',
              pointerEvents: 'none',
              marginTop: 2,
              transform: 'scaleY(-1)',
              backgroundImage:
                'linear-gradient(to top, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 50%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
            }}
          >
            ADEOLA
          </span>
        </div>
      </div>

      {/* Copyright */}
      <div
        style={{
          textAlign: 'center',
          paddingBottom: 28,
          fontSize: '0.72rem',
          letterSpacing: '0.24em',
          color: 'rgba(255,255,255,0.55)',
        }}
      >
        cc. Adeola Ikuesan 2026
      </div>
    </footer>
  )
}
