'use client'

import Image from 'next/image'
import { useState } from 'react'

export function getYouTubeId(url: string): string | null {
  try {
    const u = new URL(url)
    const host = u.hostname.replace(/^www\.|^m\./, '')
    if (host === 'youtu.be') return u.pathname.slice(1).split('/')[0] || null
    if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
      if (u.pathname === '/watch') return u.searchParams.get('v')
      const match = u.pathname.match(/^\/(?:embed|shorts|live)\/([^/?]+)/)
      return match?.[1] ?? null
    }
  } catch {
    // Not a valid URL
  }
  return null
}

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e2795]'

function PlayIcon({ size }: { size: 'featured' | 'small' }) {
  const featured = size === 'featured'
  return (
    <span
      className={`flex items-center justify-center rounded-full ${
        featured
          ? 'h-[68px] w-[68px] bg-white/[0.18]'
          : 'h-11 w-11 bg-white/[0.14]'
      }`}
    >
      <svg
        width={featured ? 18 : 10}
        height={featured ? 19 : 11}
        viewBox="0 0 8 9"
        fill="none"
        aria-hidden="true"
        className="ml-[2px]"
      >
        <path d="M8 4.5L0 9L0 0L8 4.5Z" fill="white" />
      </svg>
    </span>
  )
}

export default function VideoCard({
  title,
  description,
  date,
  url,
  thumbnailUrl,
  thumbnailAlt,
  size,
  aspect = 'video',
}: {
  title: string
  description?: string
  date?: string
  url: string
  thumbnailUrl?: string
  thumbnailAlt?: string
  size: 'featured' | 'small'
  aspect?: 'portrait' | 'video'
}) {
  const [playing, setPlaying] = useState(false)
  const youTubeId = getYouTubeId(url)
  const featured = size === 'featured'
  const showPlayer = playing && youTubeId

  // The player is always 16:9; a tall preview would letterbox it
  const aspectClass =
    aspect === 'portrait' && !showPlayer
      ? 'aspect-[9/10] md:aspect-video'
      : 'aspect-video'

  return (
    <div className="flex flex-col gap-2.5">
      {description && (
        <p
          className={`m-0 text-white/60 ${featured ? 'text-base' : 'text-sm'}`}
        >
          {description}
        </p>
      )}

      <div
        className={`relative overflow-hidden bg-white/[0.06] ${aspectClass}`}
      >
        {showPlayer ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${youTubeId}?autoplay=1&rel=0&playsinline=1`}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : (
          <>
            {thumbnailUrl && (
              <Image
                src={thumbnailUrl}
                alt={thumbnailAlt ?? title}
                fill
                sizes={
                  featured
                    ? '(min-width: 1024px) 960px, 100vw'
                    : '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'
                }
                className={`object-cover ${featured ? 'opacity-60' : 'opacity-70'}`}
              />
            )}
            {!featured && (
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,206,229,0.08),rgba(0,47,109,0.6))]"
              />
            )}

            <div className="absolute inset-0 flex items-center justify-center">
              {youTubeId ? (
                <button
                  type="button"
                  onClick={() => setPlaying(true)}
                  aria-label={`Play ${title}`}
                  className={`rounded-full transition-opacity duration-200 hover:opacity-80 ${focusRing}`}
                >
                  <PlayIcon size={size} />
                </button>
              ) : (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Play ${title} (opens in a new tab)`}
                  className={`rounded-full transition-opacity duration-200 hover:opacity-80 ${focusRing}`}
                >
                  <PlayIcon size={size} />
                </a>
              )}
            </div>
          </>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <h3
          className={`m-0 font-bold uppercase ${
            featured ? 'text-xl' : 'text-[0.78rem] tracking-widest'
          }`}
        >
          {title}
        </h3>
        {date && <p className="m-0 text-sm text-white/40">{date}</p>}
      </div>
    </div>
  )
}
