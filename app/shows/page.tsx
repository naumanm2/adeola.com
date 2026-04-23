import Image from 'next/image'
import { sanityFetch } from '@/sanity/lib/live'
import { urlFor } from '@/sanity/lib/image'
import CTA from '../components/cta'

type Ticket = { venue: string; url: string }

type Show = {
  _id: string
  title: string
  subtitle?: string[]
  date?: string
  live: boolean
  tickets?: Ticket[]
}

type Social = {
  social: string
  url: string
}

const SHOWS_QUERY = `*[_type == "show"] | order(date asc){
  _id,
  title,
  subtitle,
  date,
  live,
  tickets
}`

const GENERAL_QUERY = `*[_type == "general"][0]{
  mainImage,
  introShort,
  socials[]{ social, url }
}`

function ShowRow({ show, opacity }: { show: Show; opacity?: number }) {
  const location = show.subtitle?.[0]
  const dateObj = show.date ? new Date(show.date) : null
  const dateStr = dateObj
    ? dateObj.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }) +
      ' ' +
      dateObj.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
    : null

  return (
    <div
      className="border-t border-white/20 px-3 py-4 md:py-6"
      style={opacity !== undefined ? { opacity } : undefined}
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
        <p className="flex-1 text-2xl font-bold uppercase tracking-widest leading-[1.1] md:text-3xl lg:text-4xl">
          {show.title}
        </p>
        <div className="flex flex-col gap-3 md:flex-1 md:flex-row md:items-center">
          <div className="flex flex-1 flex-col gap-1">
            {location && (
              <p className="text-sm tracking-widest text-white/60 md:text-base">
                {location}
              </p>
            )}
            {dateStr && (
              <p className="text-sm tracking-widest text-white/60 md:text-base">
                {dateStr}
              </p>
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

export default async function ShowsPage() {
  const { data: shows } = await sanityFetch({ query: SHOWS_QUERY })
  const { data: general } = await sanityFetch({ query: GENERAL_QUERY })

  const upcoming: Show[] = shows?.filter((s: Show) => s.live) ?? []
  const past: Show[] = shows?.filter((s: Show) => !s.live) ?? []
  const totalCount = upcoming.length + past.length
  const socials: Social[] = general?.socials ?? []

  return (
    <div>
      {/* Hero */}
      <div className="pt-24 md:pt-40 lg:pt-48">
        <div className="flex items-end justify-between w-full gap-4">
          <div className="flex items-start gap-2 leading-none">
            <span
              className="font-bold leading-none text-white"
              style={{ fontSize: 'clamp(80px, 14vw, 200px)' }}
            >
              SHOWS
            </span>
            <span className="text-gradient-gold text-lg md:text-2xl font-bold">
              ({totalCount})
            </span>
          </div>
          <div className="flex items-center gap-2 pb-2 md:pb-5 text-white">
            <span className="text-base md:text-2xl font-medium">Explore</span>
            <svg
              width="11"
              height="13"
              viewBox="0 0 13 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M13 5.5L0 11L0 0L13 5.5Z" fill="white" />
            </svg>
          </div>
        </div>
        {/* Reflection */}
        <div
          className="pointer-events-none select-none"
          style={{ transform: 'scaleY(-1)' }}
          aria-hidden="true"
        >
          <span
            className="block font-bold leading-none"
            style={{
              fontSize: 'clamp(80px, 14vw, 200px)',
              height: 0,
              backgroundImage:
                'linear-gradient(to bottom, rgba(255,255,255,0) 13%, rgba(255,255,255,0.01) 81%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0px 51px 5px rgba(255,255,255,0.1)',
            }}
          >
            SHOWS
          </span>
        </div>
      </div>

      <div className="h-20 md:h-32" />

      {/* Intro */}
      {(general?.mainImage || general?.introShort) && (
        <div className="mb-16 md:mb-24 w-full">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:gap-8">
            {general?.mainImage && (
              <div className="relative h-60 w-[180px] shrink-0 md:h-[384px] md:w-[329px] lg:h-[520px] lg:w-[420px]">
                <Image
                  src={urlFor(general.mainImage).width(900).url()}
                  alt={general.mainImage.alt ?? ''}
                  fill
                  sizes="(min-width: 1024px) 420px, (min-width: 768px) 329px, 180px"
                  className="object-cover"
                />
              </div>
            )}
            {general?.introShort && (
              <p className="flex-1 text-2xl font-medium leading-tight text-white md:text-4xl lg:text-5xl lg:leading-[0.9]">
                {general.introShort}
              </p>
            )}
          </div>
        </div>
      )}

      {/* UPCOMING */}
      <div className="flex w-full flex-col gap-6">
        <div className="flex items-start gap-2 py-3 leading-none">
          <span className="text-3xl md:text-5xl font-bold text-white">
            UPCOMING
          </span>
          <span className="text-base md:text-xl font-bold text-white">
            ({upcoming.length})
          </span>
        </div>
        <div className="flex w-full flex-col gap-3">
          {upcoming.length > 0 ? (
            upcoming.map((show: Show) => <ShowRow key={show._id} show={show} />)
          ) : (
            <p className="border-t border-white/20 py-5 text-sm text-white/30">
              No upcoming shows at the moment.
            </p>
          )}
        </div>
      </div>

      <div className="h-16 md:h-24" />

      {/* PAST */}
      {past.length > 0 && (
        <div className="flex w-full flex-col gap-6">
          <div className="flex items-start gap-2 py-3 leading-none">
            <span className="text-3xl md:text-5xl font-bold uppercase text-white">
              Past
            </span>
            <span className="text-base md:text-xl font-bold text-white">
              ({past.length})
            </span>
          </div>
          <div className="flex w-full flex-col gap-3">
            {past.map((show: Show, index: number) => {
              const opacityValues = [1, 0.8, 0.6, 0.4]
              const opacity = opacityValues[index] ?? 0.3
              return <ShowRow key={show._id} show={show} opacity={opacity} />
            })}
          </div>
        </div>
      )}

      <div className="h-16 md:h-24" />

      {/* Footer */}
      <div className="flex w-full flex-col gap-2.5">
        {socials.length > 0 && (
          <div className="flex flex-col gap-3 border-t border-white px-3 pt-6 pb-4">
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-lg md:text-xl font-bold tracking-widest w-full">
              {socials.map((s: Social) => (
                <a
                  key={s.social}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[120px] rounded-sm py-1 uppercase text-white transition-colors hover:text-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                >
                  {s.social}
                </a>
              ))}
            </div>
          </div>
        )}
        <div className="flex w-full flex-col items-center justify-end overflow-hidden pt-10 md:pt-16">
          <span
            className="font-bold text-white leading-[0.88] whitespace-nowrap"
            style={{
              fontSize: 'clamp(60px, 24vw, 357px)',
              letterSpacing: '-0.02em',
            }}
          >
            ADEOLA
          </span>
          <div
            className="pointer-events-none w-full select-none"
            style={{ transform: 'scaleY(-1)' }}
            aria-hidden="true"
          >
            <span
              className="block font-bold"
              style={{
                fontSize: 'clamp(60px, 24vw, 357px)',
                letterSpacing: '-0.02em',
                height: 0,
                backgroundImage:
                  'linear-gradient(180deg, rgba(255,255,255,0) 58.5%, rgba(255,255,255,0.01) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0px 148px 24px rgba(255,255,255,0.25)',
              }}
            >
              ADEOLA
            </span>
          </div>
        </div>
        <div className="flex w-full items-center justify-center pt-3">
          <p className="text-xs tracking-widest text-white">
            cc. Adeola Ikuesan 2026
          </p>
        </div>
      </div>
    </div>
  )
}
