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
      className="px-3 py-4 border-t border-white/20"
      style={opacity !== undefined ? { opacity } : undefined}
    >
      <div className="flex items-center gap-6 w-full">
        <p className="flex-1 font-bold text-3xl md:text-[32px] tracking-widest uppercase leading-[1.1]">
          {show.title}
        </p>
        <div className="flex flex-1 items-center gap-3">
          <div className="flex-1 flex flex-col gap-1">
            {location && (
              <p className="text-white/60 text-base tracking-widest">
                {location}
              </p>
            )}
            {dateStr && (
              <p className="text-white/60 text-base tracking-widest">
                {dateStr}
              </p>
            )}
          </div>
          {show.live && show.tickets && show.tickets[0] && (
            <CTA link={show.tickets[0].url} text="Tickets" external />
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
      <div className="pt-48 md:pt-60">
        <div className="flex items-end justify-between w-full">
          <div className="flex items-start gap-2 leading-none">
            <span
              className="font-bold text-white leading-none"
              style={{ fontSize: 'clamp(80px, 14vw, 200px)' }}
            >
              SHOWS
            </span>
            <span
              className="font-bold text-2xl"
              style={{
                backgroundImage:
                  'linear-gradient(207deg, rgb(255, 212, 133) 6%, rgb(249, 192, 88) 88%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              ({totalCount})
            </span>
          </div>
          <div className="flex items-center gap-2 pb-5 text-white">
            <span className="font-medium text-2xl">Explore</span>
            <svg
              width="11"
              height="13"
              viewBox="0 0 13 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M13 5.5L0 11L0 0L13 5.5Z" fill="white" />
            </svg>
          </div>
        </div>
        {/* Reflection */}
        <div
          className="pointer-events-none select-none"
          style={{ transform: 'scaleY(-1)' }}
        >
          <span
            className="font-bold leading-none"
            style={{
              fontSize: 'clamp(80px, 14vw, 200px)',
              display: 'block',
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

      <div className="h-40" />

      {/* Intro */}
      {(general?.mainImage || general?.introShort) && (
        <div className="flex flex-col gap-1 w-full mb-24">
          <div className="flex items-end gap-2">
            {general?.mainImage && (
              <div className="relative shrink-0 w-[200px] h-[240px] md:w-[329px] md:h-[384px]">
                <Image
                  src={urlFor(general.mainImage).width(658).url()}
                  alt={general.mainImage.alt ?? ''}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            {general?.introShort && (
              <p className="flex-1 font-medium text-3xl md:text-5xl leading-[0.88] text-white">
                {general.introShort}
              </p>
            )}
          </div>
        </div>
      )}

      {/* UPCOMING */}
      <div className="flex flex-col gap-6 w-full">
        <div className="flex items-start py-3 leading-none">
          <span className="font-bold text-4xl md:text-5xl text-white">
            UPCOMING
          </span>
          <span className="font-bold text-xl text-white">
            ({upcoming.length})
          </span>
        </div>
        <div className="flex flex-col gap-3 w-full">
          {upcoming.length > 0 ? (
            upcoming.map((show: Show) => <ShowRow key={show._id} show={show} />)
          ) : (
            <p className="text-white/30 text-sm border-t border-white/20 py-5">
              No upcoming shows at the moment.
            </p>
          )}
        </div>
      </div>

      <div className="h-24" />

      {/* PAST */}
      {past.length > 0 && (
        <div className="flex flex-col gap-6 w-full">
          <div className="flex items-start gap-1 py-3 leading-none">
            <span className="font-bold text-4xl md:text-5xl text-white uppercase">
              Past
            </span>
            <span className="font-bold text-xl text-white">
              ({past.length})
            </span>
          </div>
          <div className="flex flex-col gap-3 w-full">
            {past.map((show: Show, index: number) => {
              const opacityValues = [1, 0.8, 0.6, 0.4]
              const opacity = opacityValues[index] ?? 0.3
              return <ShowRow key={show._id} show={show} opacity={opacity} />
            })}
          </div>
        </div>
      )}

      <div className="h-24" />

      {/* Footer */}
      <div className="flex flex-col gap-2.5 w-full">
        {socials.length > 0 && (
          <div className="border-t border-white flex flex-col gap-3 pt-6 pb-4 px-3">
            <div className="flex gap-6 font-bold text-lg tracking-widest w-full">
              {socials.map((s: Social) => (
                <a
                  key={s.social}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-white uppercase hover:text-white/70 transition-colors"
                >
                  {s.social}
                </a>
              ))}
            </div>
          </div>
        )}
        <div className="flex flex-col items-center justify-end pt-16 w-full overflow-hidden">
          <span
            className="font-bold text-white leading-[0.88] whitespace-nowrap"
            style={{
              fontSize: 'clamp(60px, 24vw, 357px)',
              letterSpacing: '-0.02em',
            }}
          >
            ADEOLA
          </span>
          {/* Reflection */}
          <div
            className="pointer-events-none select-none w-full"
            style={{ transform: 'scaleY(-1)' }}
          >
            <span
              className="font-bold block"
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
        <div className="flex items-center justify-center pt-3 w-full">
          <p className="text-xs tracking-widest text-white">
            cc. Adeola Ikuesan 2025
          </p>
        </div>
      </div>
    </div>
  )
}
