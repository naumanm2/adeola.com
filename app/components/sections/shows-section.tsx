import { sanityFetch } from '@/sanity/lib/live'
import CTA from '../cta'
import Reflection from '../reflection'

type Ticket = { venue: string; url: string }

type Show = {
  _id: string
  title: string
  subtitle?: string[]
  date?: string
  live: boolean
  tickets?: Ticket[]
}

const SHOWS_QUERY = `*[_type == "show"] | order(date asc){
  _id,
  title,
  subtitle,
  date,
  live,
  tickets[]{ venue, url }
}`

function formatShowDate(date?: string) {
  if (!date) return null
  const d = new Date(date)
  const month = String(d.getUTCMonth() + 1).padStart(2, '0')
  const day = String(d.getUTCDate()).padStart(2, '0')
  return `${month}.${day}`
}

export default async function ShowsSection() {
  const { data: shows } = await sanityFetch({ query: SHOWS_QUERY })
  const upcoming: Show[] = (shows ?? []).filter((s: Show) => s.live)

  return (
    <section id="shows" className="scroll-mt-24 pt-10 pb-[30px]">
      <div style={{ marginBottom: 20 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
          }}
        >
          <h2
            style={{
              fontWeight: 700,
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              letterSpacing: '0.1em',
              lineHeight: 1,
            }}
          >
            SHOWS
          </h2>
        </div>
        <Reflection style={{ fontWeight: 700, fontSize: 'clamp(2rem, 5vw, 3rem)', letterSpacing: '0.1em', lineHeight: 1 }}>
          SHOWS
        </Reflection>
      </div>

      <div
        style={{
          fontSize: '0.72rem',
          letterSpacing: '0.26em',
          color: 'rgba(255,255,255,0.6)',
          marginBottom: 20,
        }}
      >
        UPCOMING{' '}
        <span
          className="text-gradient-gold"
          style={{ marginLeft: 4 }}
        >
          ({upcoming.length})
        </span>
      </div>

      <div className="flex flex-col">
        {upcoming.length === 0 ? (
          <p
            style={{
              borderTop: '1px solid rgba(255,255,255,0.2)',
              paddingTop: 20,
              fontSize: '0.875rem',
              color: 'rgba(255,255,255,0.4)',
            }}
          >
            No upcoming shows at the moment.
          </p>
        ) : (
          upcoming.map((show, i) => {
            const dateStr = formatShowDate(show.date)
            const venue = show.subtitle?.[0] ?? show.tickets?.[0]?.venue
            const ticketUrl = show.tickets?.[0]?.url

            return (
              <div
                key={show._id}
                className="grid items-center gap-x-5 gap-y-2 py-5 sm:gap-x-5"
                style={{
                  gridTemplateColumns: '64px 1fr auto',
                  borderTop: '1px solid rgba(255,255,255,0.2)',
                  borderBottom:
                    i === upcoming.length - 1
                      ? '1px solid rgba(255,255,255,0.2)'
                      : 'none',
                  padding: '20px 0',
                }}
              >
                {/* Date */}
                <div
                  style={{
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                    fontSize: '1rem',
                  }}
                >
                  {dateStr ?? '—'}
                </div>

                {/* City + venue */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
                  <div
                    style={{
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      fontSize: 'clamp(1rem, 2vw, 1.15rem)',
                      textTransform: 'uppercase',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {show.title}
                  </div>
                  {venue && (
                    <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>
                      {venue}
                    </div>
                  )}
                </div>

                {/* Tickets */}
                {ticketUrl ? (
                  <CTA link={ticketUrl} text="Tickets" external />
                ) : (
                  <div />
                )}
              </div>
            )
          })
        )}
      </div>
    </section>
  )
}
