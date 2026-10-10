import Image from 'next/image'
import { sanityFetch } from '@/sanity/lib/live'
import { urlFor, hasAsset, type SanityImage } from '@/sanity/lib/image'

type GalleryImage = SanityImage & { _key: string }

const GALLERY_QUERY = `*[_type == "general"][0].gallery`

export default async function GallerySection() {
  const { data } = await sanityFetch({ query: GALLERY_QUERY })
  const photos = ((data ?? []) as GalleryImage[]).filter(hasAsset)

  if (photos.length === 0) return null

  return (
    <section aria-label="Photo gallery" className="py-3 md:pt-10 md:pb-[30px]">
      {/* Bleeds past the Container gutter so the next photo peeks in at the edge */}
      <ul
        tabIndex={0}
        aria-label="Photos, scroll horizontally"
        className="-mx-5 m-0 flex list-none snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 [scrollbar-width:none] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e2795] md:mx-0 md:scroll-px-0 md:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {photos.map((photo) => (
          <li
            key={photo._key}
            className="relative aspect-[4/5] w-[85%] flex-none snap-start overflow-hidden bg-white/[0.06] md:w-[calc((100%-2rem)/3)]"
          >
            <Image
              src={urlFor(photo).width(900).height(1125).fit('crop').url()}
              alt={photo.alt ?? ''}
              fill
              sizes="(min-width: 768px) 33vw, 85vw"
              className="object-cover"
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
