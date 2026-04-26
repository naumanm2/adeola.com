import Image from 'next/image'
import { sanityFetch } from '@/sanity/lib/live'
import { urlFor, hasAsset } from '@/sanity/lib/image'
import CTA from '../cta'

type Track = {
  _id: string
  title: string
  subtitle?: string
  coverImage?: { asset: object; alt?: string }
}

type Social = { social: string; url: string }

const MUSIC_QUERY = `{
  "track": *[_type == "audio"] | order(_createdAt desc)[0]{
    _id, title, subtitle, coverImage
  },
  "general": *[_type == "general"][0]{
    socials[]{ social, url }
  }
}`

export default async function AudioSection() {
  const { data } = await sanityFetch({ query: MUSIC_QUERY })
  const track = data?.track as Track | null
  const socials: Social[] = data?.general?.socials ?? []

  const spotifyLink = socials.find((s) =>
    s.social.toLowerCase() === 'spotify'
  )?.url

  const otherStreaming = socials
    .filter((s) => {
      const n = s.social.toLowerCase()
      return n === 'apple music' || n === 'bandcamp' || n === 'tidal'
    })
    .map((s) => s.social.toUpperCase())

  if (!track) return null

  return (
    <section id="music" className="scroll-mt-24 pt-10 pb-[30px]">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: 8,
        }}
      >
        <div
          style={{
            fontWeight: 700,
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            letterSpacing: '0.1em',
            lineHeight: 1,
          }}
        >
          MUSIC
        </div>
      </div>
      <div
        style={{
          fontSize: '0.72rem',
          letterSpacing: '0.26em',
          color: 'rgba(255,255,255,0.6)',
          marginBottom: 20,
        }}
      >
        NEW RELEASE
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(160px, 220px) 1fr',
          gap: 28,
          alignItems: 'center',
        }}
      >
        {/* EP cover */}
        <div
          style={{
            aspectRatio: '1/1',
            overflow: 'hidden',
            background: 'rgba(255,255,255,0.06)',
            position: 'relative',
          }}
        >
          {hasAsset(track.coverImage) ? (
            <Image
              src={urlFor(track.coverImage).width(440).url()}
              alt={(track.coverImage as { alt?: string }).alt ?? track.title}
              fill
              sizes="220px"
              className="object-cover"
            />
          ) : (
            <div className="h-full w-full bg-white/5" />
          )}
        </div>

        {/* EP info */}
        <div className="flex flex-col gap-2.5">
          <div
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.4rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 0.95,
              textTransform: 'uppercase',
            }}
          >
            {track.title}
          </div>
          {track.subtitle && (
            <div
              style={{
                fontSize: '0.82rem',
                letterSpacing: '0.2em',
                color: 'rgba(255,255,255,0.6)',
                textTransform: 'uppercase',
              }}
            >
              {track.subtitle}
            </div>
          )}
          <div className="mt-2 flex flex-wrap items-center gap-2.5">
            {spotifyLink ? (
              <CTA link={spotifyLink} text="Listen on Spotify" external />
            ) : (
              <CTA link="#music" text="Listen" />
            )}
            {otherStreaming.length > 0 && (
              <span
                style={{
                  fontSize: '0.8rem',
                  color: 'rgba(255,255,255,0.6)',
                  letterSpacing: '0.15em',
                  alignSelf: 'center',
                }}
              >
                {otherStreaming.join(' · ')}
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
