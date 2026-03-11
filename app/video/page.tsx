import Image from 'next/image'
import Link from 'next/link'
import { sanityFetch } from '@/sanity/lib/live'
import { urlFor } from '@/sanity/lib/image'

type Video = {
  _id: string
  title: string
  subtitle?: string[]
  date?: string
  thumbnail?: { asset: object; alt?: string }
  videourl: string
}

const VIDEO_QUERY = `*[_type == "video"] | order(date desc){
  _id,
  title,
  subtitle,
  date,
  thumbnail,
  videourl
}`

export default async function VideoPage() {
  const { data: videos } = await sanityFetch({ query: VIDEO_QUERY })

  return (
    <div className="pt-16 md:pt-24">
      <h1>Video</h1>

      {videos && videos.length > 0 ? (
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {videos.map((video: Video) => (
            <Link
              key={video._id}
              href={video.videourl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-3"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video w-full overflow-hidden bg-white/5">
                {video.thumbnail ? (
                  <Image
                    src={urlFor(video.thumbnail).width(800).url()}
                    alt={video.thumbnail.alt ?? video.title}
                    fill
                    className="object-cover transition-opacity duration-300 group-hover:opacity-70"
                  />
                ) : (
                  <div className="w-full h-full bg-white/5" />
                )}
                {/* Play icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors duration-300">
                    <svg
                      width="14"
                      height="16"
                      viewBox="0 0 8 9"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M8 4.5L0 9L0 0L8 4.5Z" fill="white" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="flex flex-col gap-1">
                <p className="font-medium group-hover:text-white/70 transition-colors duration-200">
                  {video.title}
                </p>
                {video.subtitle && video.subtitle.length > 0 && (
                  <p className="text-white/50 text-sm">
                    {video.subtitle.join(' · ')}
                  </p>
                )}
                {video.date && (
                  <p className="text-white/30 text-sm">
                    {new Date(video.date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-white/30 text-sm mt-12 border-t border-white/10 pt-5">
          No videos yet.
        </p>
      )}
    </div>
  )
}
