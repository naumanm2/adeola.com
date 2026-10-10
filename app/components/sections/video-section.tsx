import { sanityFetch } from '@/sanity/lib/live'
import CTA from '../cta'
import Reflection from '../reflection'
import VideoCard from '../video-card'
import { type Video, VIDEO_FIELDS, videoCardProps } from '../video-card-props'

const FEATURED_VIDEO_QUERY = `*[_type == "video"] | order(date desc)[0]{
  ${VIDEO_FIELDS}
}`

export default async function VideoSection() {
  const { data } = await sanityFetch({ query: FEATURED_VIDEO_QUERY })
  const featured = data as Video | null

  return (
    <section id="video" className="scroll-mt-24 py-3 md:pt-10 md:pb-[30px]">
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
              fontSize: '3rem',
              letterSpacing: '0.1em',
              lineHeight: 1,
            }}
          >
            VIDEOS
          </h2>
        </div>
        <Reflection
          style={{
            fontWeight: 700,
            fontSize: '3rem',
            letterSpacing: '0.1em',
            lineHeight: 1,
          }}
        >
          VIDEOS
        </Reflection>
      </div>

      {featured ? (
        <>
          <VideoCard
            size="featured"
            aspect="portrait"
            {...videoCardProps(featured, 1600)}
          />
          <div className="mt-6">
            <CTA
              link="/videos"
              text="See all videos"
              className="w-full md:w-auto"
            />
          </div>
        </>
      ) : (
        <p
          style={{
            borderTop: '1px solid rgba(255,255,255,0.2)',
            paddingTop: 20,
            fontSize: '0.875rem',
            color: 'rgba(255,255,255,0.4)',
          }}
        >
          No videos yet.
        </p>
      )}
    </section>
  )
}
