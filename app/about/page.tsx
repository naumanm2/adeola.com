import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { sanityFetch } from '@/sanity/lib/live'
import { urlFor } from '@/sanity/lib/image'

const GENERAL_QUERY = `*[_type == "general"][0]{
  title,
  subtitle,
  mainImage,
  introLong
}`

const portableTextComponents = {
  types: {
    image: ({ value }: { value: { asset: object; alt?: string } }) => (
      <div className="relative my-8 aspect-[4/3] w-full">
        <Image
          src={urlFor(value).width(1200).url()}
          alt={value.alt ?? ''}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
    ),
  },
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="mb-4 leading-relaxed text-white/80">{children}</p>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="mt-10 mb-3 text-xl md:text-2xl font-medium">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="mt-8 mb-2 text-lg md:text-xl font-medium">{children}</h3>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="my-6 border-l-2 border-white/20 pl-4 italic text-white/70">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-medium text-white">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic">{children}</em>
    ),
    link: ({
      value,
      children,
    }: {
      value?: { href: string }
      children?: React.ReactNode
    }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-sm text-white underline underline-offset-4 transition-colors hover:text-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
      >
        {children}
      </a>
    ),
  },
}

export default async function AboutPage() {
  const { data: general } = await sanityFetch({ query: GENERAL_QUERY })

  return (
    <div className="pt-16 md:pt-24">
      <h1>About</h1>

      <div className="mt-12 grid grid-cols-1 items-start gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:gap-12 lg:gap-16">
        {/* Image */}
        {general?.mainImage && (
          <div className="relative aspect-[3/4] w-full max-w-md md:max-w-none">
            <Image
              src={urlFor(general.mainImage).width(900).url()}
              alt={general.mainImage.alt ?? ''}
              fill
              sizes="(min-width: 768px) 40vw, 90vw"
              className="object-cover"
            />
          </div>
        )}

        {/* Text */}
        <div className="md:max-w-prose">
          {general?.title && (
            <p className="mb-6 text-xs uppercase tracking-widest text-white/60">
              {general.title}
            </p>
          )}
          {general?.introLong ? (
            <PortableText
              value={general.introLong}
              components={portableTextComponents}
            />
          ) : (
            <p className="text-sm text-white/60">No bio yet.</p>
          )}
        </div>
      </div>
    </div>
  )
}
