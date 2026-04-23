import Image from 'next/image'
import { sanityFetch } from '@/sanity/lib/live'
import { urlFor, hasAsset } from '@/sanity/lib/image'

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

export default async function AudioSection() {
  const { data: tracks } = await sanityFetch({ query: AUDIO_QUERY })
  const trackList: Track[] = tracks ?? []

  return (
    <section id="audio" className="scroll-mt-24">
      <div className="flex items-baseline gap-2">
        <p className="display-section">Audio</p>
        <span className="text-gradient-gold text-sm md:text-base font-bold">
          ({trackList.length})
        </span>
      </div>

      <div className="mt-6 md:mt-8">
        {trackList.length > 0 ? (
          <div className="flex flex-col">
            {trackList.map((track) => (
              <article
                key={track._id}
                className="flex flex-col gap-5 border-t border-white/20 py-6 md:flex-row md:items-center md:gap-8 md:py-8"
              >
                <div className="flex items-center gap-5 md:gap-6 md:flex-1">
                  {hasAsset(track.coverImage) ? (
                    <div className="relative h-20 w-20 shrink-0 md:h-24 md:w-24 lg:h-28 lg:w-28">
                      <Image
                        src={urlFor(track.coverImage).width(400).url()}
                        alt={track.coverImage.alt ?? track.title}
                        fill
                        sizes="(min-width: 1024px) 112px, (min-width: 768px) 96px, 80px"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-20 w-20 shrink-0 bg-white/5 md:h-24 md:w-24 lg:h-28 lg:w-28" />
                  )}
                  <div className="flex flex-col gap-1">
                    <p className="show-title text-white">{track.title}</p>
                    {track.subtitle && (
                      <p className="text-sm tracking-wide text-white/60">
                        {track.subtitle}
                      </p>
                    )}
                  </div>
                </div>

                <div className="md:flex-1 md:max-w-md">
                  {track.audio?.asset?.url ? (
                    <div className="rounded-full bg-white/5 p-2">
                      <audio
                        controls
                        src={track.audio.asset.url}
                        aria-label={`Play ${track.title}`}
                        className="h-10 w-full"
                      />
                    </div>
                  ) : (
                    <p className="text-sm text-white/40">
                      No audio file uploaded.
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="border-t border-white/20 pt-5 text-sm text-white/60">
            No tracks yet.
          </p>
        )}
      </div>
    </section>
  )
}
