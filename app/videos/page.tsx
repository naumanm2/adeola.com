import type { Metadata } from 'next'
import { sanityFetch } from '@/sanity/lib/live'
import SiteFooter from '../components/site-footer'
import VideoCard from '../components/video-card'
import {
  type Video,
  VIDEO_FIELDS,
  formatVideoDate,
  videoCardProps,
} from '../components/video-card-props'

export const metadata: Metadata = {
  title: 'Videos — Adeola',
  description: 'Music videos and live sessions by Adeola.',
}

const VIDEOS_QUERY = `*[_type == "video"] | order(date desc){
  ${VIDEO_FIELDS}
}`

export default async function VideosPage() {
  const { data } = await sanityFetch({ query: VIDEOS_QUERY })
  const videos: Video[] = data ?? []

  return (
    <div>
      <section className="pt-10 pb-3 md:pb-[30px]">
        <h1 className="m-0 mb-8 uppercase">Videos</h1>

        {videos.length === 0 ? (
          <p className="m-0 text-sm text-white/40">No videos yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {videos.map((v) => (
              <VideoCard
                key={v._id}
                size="featured"
                date={formatVideoDate(v.date)}
                {...videoCardProps(v, 1200)}
              />
            ))}
          </div>
        )}
      </section>
      <SiteFooter />
    </div>
  )
}
