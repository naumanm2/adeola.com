import Image from 'next/image'
import Link from 'next/link'
import { sanityFetch } from '@/sanity/lib/live'
import { urlFor, hasAsset } from '@/sanity/lib/image'

type Video = {
  _id: string
  title: string
  subtitle?: string[]
  thumbnail?: { asset: object; alt?: string }
  videourl: string
}

const VIDEO_QUERY = `*[_type == "video"] | order(date desc){
  _id,
  title,
  subtitle,
  thumbnail,
  videourl
}`

export default async function VideoSection() {
  const { data: videos } = await sanityFetch({ query: VIDEO_QUERY })
  const list: Video[] = videos ?? []
  const featured = list[0]
  const rest = list.slice(1)

  return (
    <section id="video" className="scroll-mt-24 pt-10 pb-[30px]">
      <div style={{ marginBottom: 20 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
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
            VIDEOS
          </div>
        </div>
        <div
          style={{
            height: '1.25rem',
            overflow: 'hidden',
            marginTop: '-0.22em',
          }}
        >
          <span
            aria-hidden="true"
            style={{
              display: 'block',
              fontWeight: 700,
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              letterSpacing: '0.1em',
              lineHeight: 1,
              color: 'transparent',
              userSelect: 'none',
              pointerEvents: 'none',
              marginTop: '-0.22em',
              transform: 'scaleY(-1)',
              backgroundImage:
                'linear-gradient(to top, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 50%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
            }}
          >
            VIDEOS
          </span>
        </div>
      </div>

      {list.length === 0 ? (
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
      ) : (
        <>
          {/* Featured video */}
          {featured && (
            <>
              <Link
                href={featured.videourl}
                target="_blank"
                rel="noopener noreferrer"
                className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                style={{ marginBottom: 12 }}
              >
                <div
                  style={{
                    position: 'relative',
                    aspectRatio: '16/9',
                    background: 'rgba(255,255,255,0.06)',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  {hasAsset(featured.thumbnail) && (
                    <Image
                      src={urlFor(featured.thumbnail).width(1600).url()}
                      alt={
                        (featured.thumbnail as { alt?: string }).alt ??
                        featured.title
                      }
                      fill
                      sizes="(min-width: 1024px) 960px, 100vw"
                      className="object-cover"
                      style={{ opacity: 0.6 }}
                    />
                  )}
                  <div
                    style={{
                      position: 'relative',
                      width: 68,
                      height: 68,
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.16)',
                      backdropFilter: 'blur(6px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 1,
                    }}
                  >
                    <svg
                      width="18"
                      height="19"
                      viewBox="0 0 8 9"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path d="M8 4.5L0 9L0 0L8 4.5Z" fill="white" />
                    </svg>
                  </div>
                </div>
              </Link>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  marginBottom: 24,
                }}
              >
                <div
                  style={{
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    fontSize: '0.95rem',
                    textTransform: 'uppercase',
                  }}
                >
                  {featured.title}
                </div>
                {featured.subtitle && featured.subtitle.length > 0 && (
                  <div
                    style={{
                      fontSize: '0.75rem',
                      color: 'rgba(255,255,255,0.6)',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {featured.subtitle.join(' · ')}
                  </div>
                )}
              </div>
            </>
          )}

          {/* Video grid */}
          {rest.length > 0 && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 14,
              }}
            >
              {rest.map((v) => (
                <Link
                  key={v._id}
                  href={v.videourl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                >
                  <div
                    style={{
                      aspectRatio: '16/10',
                      background: 'rgba(255,255,255,0.08)',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    {hasAsset(v.thumbnail) && (
                      <Image
                        src={urlFor(v.thumbnail).width(600).url()}
                        alt={
                          (v.thumbnail as { alt?: string }).alt ?? v.title
                        }
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover"
                        style={{ opacity: 0.7 }}
                      />
                    )}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background:
                          'linear-gradient(135deg, rgba(255,206,229,0.08), rgba(0,47,109,0.6))',
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%,-50%)',
                        width: 38,
                        height: 38,
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.14)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <svg
                        width="10"
                        height="11"
                        viewBox="0 0 8 9"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path d="M8 4.5L0 9L0 0L8 4.5Z" fill="white" />
                      </svg>
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {v.title}
                    </div>
                    {v.subtitle && v.subtitle.length > 0 && (
                      <div
                        style={{
                          fontSize: '0.68rem',
                          color: 'rgba(255,255,255,0.55)',
                        }}
                      >
                        {v.subtitle.join(' · ')}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </section>
  )
}
