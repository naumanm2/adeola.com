import Image from 'next/image'
import { sanityFetch } from '@/sanity/lib/live'
import { urlFor } from '@/sanity/lib/image'

type Track = {
  _id: string
  title: string
  subtitle?: string
  audio?: { asset: { url: string } }
  coverImage?: { asset: object; alt?: string }
}

const AUDIO_QUERY = `*[_type == "audio"] | order(_createdAt desc){
  _id,
  title,
  subtitle,
  audio { asset->{ url } },
  coverImage
}`

export default async function AudioPage() {
  const { data: tracks } = await sanityFetch({ query: AUDIO_QUERY })

  return (
    <div className="pt-16 md:pt-24">
      <h1>Audio</h1>

      {tracks && tracks.length > 0 ? (
        <div className="mt-12 flex flex-col gap-10 md:max-w-3xl">
          {tracks.map((track: Track) => (
            <div
              key={track._id}
              className="flex flex-col gap-4 border-t border-white/10 pt-6 md:pt-8"
            >
              <div className="flex items-start gap-4 md:gap-6">
                {track.coverImage ? (
                  <div className="relative h-20 w-20 shrink-0 md:h-28 md:w-28 lg:h-32 lg:w-32">
                    <Image
                      src={urlFor(track.coverImage).width(400).url()}
                      alt={track.coverImage.alt ?? track.title}
                      fill
                      sizes="(min-width: 1024px) 128px, (min-width: 768px) 112px, 80px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-20 w-20 shrink-0 bg-white/5 md:h-28 md:w-28 lg:h-32 lg:w-32" />
                )}
                <div className="flex flex-col gap-1 pt-1">
                  <p className="text-base md:text-lg font-medium">
                    {track.title}
                  </p>
                  {track.subtitle && (
                    <p className="text-sm text-white/60">{track.subtitle}</p>
                  )}
                </div>
              </div>

              {track.audio?.asset?.url ? (
                <audio
                  controls
                  src={track.audio.asset.url}
                  aria-label={`Play ${track.title}`}
                  className="h-10 w-full opacity-80"
                />
              ) : (
                <p className="text-sm text-white/60">No audio file uploaded.</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-12 border-t border-white/10 pt-5 text-sm text-white/60">
          No tracks yet.
        </p>
      )}
    </div>
  )
}
