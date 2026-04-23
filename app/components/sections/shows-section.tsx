import Image from 'next/image'
import { sanityFetch } from '@/sanity/lib/live'
import { urlFor, hasAsset } from '@/sanity/lib/image'
import CTA from '../cta'

type Ticket = { venue: string; url: string }

type Show = {
  _id: string
  title: string
  subtitle?: string[]
  date?: string
  live: boolean
  tickets?: Ticket[]
  mainImage?: { asset: object; alt?: string }
}

const SHOWS_QUERY = `*[_type == "show"] | order(date asc){
  _id,
  title,
  subtitle,
  date,
  live,
  tickets,
  mainImage
}`

const GENERAL_QUERY = `*[_type == "general"][0]{
  mainImage,
  introShort
}`

function formatShowDate(date?: string) {
  if (!date) return null
  const d = new Date(date)
  const day = String(d.getUTCDate()).padStart(2, '0')
  const month = d
    .toLocaleString('en-US', { month: 'short', timeZone: 'UTC' })
    .toUpperCase()
  const year = d.getUTCFullYear()
  const hour = String(d.getUTCHours()).padStart(2, '0')
  const minute = String(d.getUTCMinutes()).padStart(2, '0')
  return `${day} ${month} ${year} · ${hour}:${minute}`
}

function ShowRow({ show, muted }: { show: Show; muted?: boolean }) {
  const location = show.subtitle?.[0]
  const dateStr = formatShowDate(show.date)

  return (
    <div
      className={`border-t border-white/20 py-5 md:py-7 ${
        muted ? 'opacity-50' : ''
      }`}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
        {hasAsset(show.mainImage) ? (
          <div className="relative h-16 w-16 shrink-0 md:h-20 md:w-20">
            <Image
              src={urlFor(show.mainImage).width(240).url()}
              alt={show.mainImage.alt ?? ''}
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>
        ) : null}

        <p className="show-title flex-1 text-white">{show.title}</p>

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6 md:min-w-[18rem] md:justify-end">
          <div className="flex flex-col gap-1 md:text-right">
            {location && (
              <p className="text-sm tracking-widest text-white/60">{location}</p>
            )}
            {dateStr && (
              <p className="text-sm tracking-widest text-white/60">{dateStr}</p>
            )}
          </div>
          {show.live && show.tickets && show.tickets[0] && (
            <div>
              <CTA link={show.tickets[0].url} text="Tickets" external />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default async function ShowsSection() {
  const { data: shows } = await sanityFetch({ query: SHOWS_QUERY })
  const { data: general } = await sanityFetch({ query: GENERAL_QUERY })

  const upcoming: Show[] = shows?.filter((s: Show) => s.live) ?? []
  const past: Show[] = shows?.filter((s: Show) => !s.live) ?? []
  const totalCount = upcoming.length + past.length

  return (
    <section id="shows" className="scroll-mt-24">
      {/* Signature SHOWS giant — the one display-giant moment kept */}
      <div className="flex items-end justify-between gap-4">
        <div className="flex items-start gap-2 leading-none">
          <span
            className="display-giant display-giant--xl text-white"
            style={{ fontSize: 'clamp(4rem, 14vw, 12.5rem)' }}
          >
            SHOWS
          </span>
          <span className="text-gradient-gold text-lg md:text-2xl font-bold">
            ({totalCount})
          </span>
        </div>
      </div>
      <div className="relative flex flex-col items-start overflow-hidden">
        <span
          className="display-giant display-giant--xl reflect whitespace-nowrap"
          aria-hidden="true"
          style={{ fontSize: 'clamp(4rem, 14vw, 12.5rem)' }}
        >
          SHOWS
        </span>
      </div>

      {/* Intro */}
      {(hasAsset(general?.mainImage) || general?.introShort) && (
        <div className="mt-12 md:mt-16">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:gap-10">
            {hasAsset(general?.mainImage) && (
              <div className="relative h-60 w-[180px] shrink-0 md:h-[384px] md:w-[329px] lg:h-[520px] lg:w-[420px]">
                <Image
                  src={urlFor(general.mainImage).width(900).url()}
                  alt={general.mainImage.alt ?? ''}
                  fill
                  sizes="(min-width: 1024px) 420px, (min-width: 768px) 329px, 180px"
                  className="object-cover mix-blend-lighten"
                />
              </div>
            )}
            {general?.introShort && (
              <p className="flex-1 text-2xl font-medium leading-tight text-white md:text-4xl lg:text-5xl lg:leading-[0.95]">
                {general.introShort}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Upcoming */}
      <div className="mt-12 md:mt-16 flex w-full flex-col gap-6">
        <div className="flex items-baseline gap-2">
          <p className="display-section">Upcoming</p>
          <span className="text-gradient-gold text-sm md:text-base font-bold">
            ({upcoming.length})
          </span>
        </div>
        <div className="flex flex-col">
          {upcoming.length > 0 ? (
            upcoming.map((show) => <ShowRow key={show._id} show={show} />)
          ) : (
            <p className="border-t border-white/20 py-5 text-sm text-white/40">
              No upcoming shows at the moment.
            </p>
          )}
        </div>
      </div>

      {/* Past */}
      {past.length > 0 && (
        <div className="mt-12 md:mt-16 flex w-full flex-col gap-6">
          <div className="flex items-baseline gap-2">
            <p className="display-section">Past</p>
            <span className="text-sm md:text-base font-bold text-white/60">
              ({past.length})
            </span>
          </div>
          <div className="flex flex-col">
            {past.map((show) => (
              <ShowRow key={show._id} show={show} muted />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
