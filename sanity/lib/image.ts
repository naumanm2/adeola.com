import createImageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

import { dataset, projectId } from '../env'

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId, dataset })

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source)
}

export type SanityImage = { asset: { _ref: string }; alt?: string }

export function hasAsset(img: unknown): img is SanityImage {
  if (typeof img !== 'object' || img === null) return false
  const asset = (img as { asset?: unknown }).asset
  return typeof asset === 'object' && asset !== null && '_ref' in asset
}
