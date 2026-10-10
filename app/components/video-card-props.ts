import { urlFor, hasAsset } from '@/sanity/lib/image'

export type Video = {
  _id: string
  title: string
  subtitle?: string[]
  date?: string
  thumbnail?: { asset: object; alt?: string }
  videourl: string
}

export const VIDEO_FIELDS = `_id, title, subtitle, date, thumbnail, videourl`

// Maps a Sanity video document to <VideoCard> props
export function videoCardProps(v: Video, width: number) {
  return {
    title: v.title,
    description:
      v.subtitle
        ?.map((s) => s.trim())
        .filter(Boolean)
        .join(' · ') || undefined,
    url: v.videourl,
    thumbnailUrl: hasAsset(v.thumbnail)
      ? urlFor(v.thumbnail).width(width).url()
      : undefined,
    thumbnailAlt: v.thumbnail?.alt,
  }
}

export function formatVideoDate(date?: string) {
  if (!date) return undefined
  return new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
