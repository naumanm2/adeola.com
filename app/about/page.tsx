import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { sanityFetch } from '@/sanity/lib/live'
import { urlFor, hasAsset } from '@/sanity/lib/image'
import SiteFooter from '../components/site-footer'

const GENERAL_QUERY = `*[_type == "general"][0]{
  title,
  subtitle,
  mainImage,
  introShort,
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
      <h2 className="mt-10 mb-3 text-xl md:text-2xl font-medium text-white">
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="mt-8 mb-2 text-lg md:text-xl font-medium text-white">
        {children}
      </h3>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="my-8 border-l-2 border-white/30 pl-5 italic">
        <span className="text-gradient-pink-blue text-xl md:text-2xl font-medium leading-snug">
          {children}
        </span>
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
    <div className="flex flex-col">
      {/* Hero */}
      <section className="pt-16 md:pt-24">
        <div className="flex items-end justify-between gap-4">
          <p className="display-section">About</p>
          <div className="label-role flex gap-3 pb-2 md:pb-4">
            <span>SINGER</span>
            <span aria-hidden="true">•</span>
            <span>SONGWRITER</span>
          </div>
        </div>
        <div className="relative mt-6 flex flex-col items-center overflow-hidden">
          <span className="display-giant display-giant--xl whitespace-nowrap text-white">
            ABOUT
          </span>
          <span
            className="display-giant display-giant--xl reflect whitespace-nowrap"
            aria-hidden="true"
          >
            ABOUT
          </span>
        </div>
      </section>

      {/* Content */}
      <section className="mt-12 md:mt-20">
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          {hasAsset(general?.mainImage) && (
            <div className="relative aspect-[3/4] w-full max-w-md md:max-w-none md:sticky md:top-8">
              <Image
                src={urlFor(general.mainImage).width(1000).url()}
                alt={general.mainImage.alt ?? ''}
                fill
                sizes="(min-width: 1024px) 40vw, (min-width: 768px) 40vw, 90vw"
                className="object-cover mix-blend-lighten"
              />
            </div>
          )}

          <div>
            {general?.title && (
              <p className="label-role mb-6">{general.title}</p>
            )}
            {general?.introLong ? (
              <PortableText
                value={general.introLong}
                components={portableTextComponents}
              />
            ) : general?.introShort ? (
              <p className="body-text text-white/80 md:text-lg md:leading-relaxed">
                {general.introShort}
              </p>
            ) : (
              <p className="text-sm text-white/60">No bio yet.</p>
            )}
          </div>
        </div>
      </section>

      <SiteFooter wordmark="ADEOLA" />
    </div>
  )
}
