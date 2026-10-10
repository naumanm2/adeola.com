import type { Metadata } from 'next'
import Image from 'next/image'
import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponents,
} from '@portabletext/react'
import { sanityFetch } from '@/sanity/lib/live'
import { urlFor, hasAsset } from '@/sanity/lib/image'
import SiteFooter from '../components/site-footer'

export const metadata: Metadata = {
  title: 'About — Adeola',
  description: 'Biography of Finnish-Nigerian singer-songwriter Adeola.',
}

const ABOUT_QUERY = `*[_type == "general"][0]{
  introLong[]{
    ...,
    _type == "image" => {
      ...,
      "dimensions": asset->metadata.dimensions
    }
  }
}`

type BioImage = {
  asset: { _ref: string }
  alt?: string
  dimensions?: { width: number; height: number }
}

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e2795]'

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="m-0 mb-5 text-lg leading-relaxed text-white/80 empty:hidden">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-10 mb-4 text-2xl font-bold uppercase tracking-widest">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 mb-3 text-xl font-bold uppercase tracking-widest">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l border-white/30 pl-4 text-xl text-white">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const href: string = value?.href ?? '#'
      const external = /^https?:\/\//.test(href)
      return (
        <a
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          className={`rounded-sm underline underline-offset-4 hover:text-white ${focusRing}`}
        >
          {children}
        </a>
      )
    },
  },
  types: {
    image: ({ value }: { value: BioImage }) => {
      if (!hasAsset(value)) return null
      const { width = 1200, height = 800 } = value.dimensions ?? {}
      return (
        <Image
          src={urlFor(value).width(1200).url()}
          alt={value.alt ?? ''}
          width={width}
          height={height}
          sizes="(min-width: 768px) 720px, 100vw"
          className="my-8 h-auto w-full"
        />
      )
    },
  },
}

export default async function AboutPage() {
  const { data } = await sanityFetch({ query: ABOUT_QUERY })
  const bio: PortableTextBlock[] = data?.introLong ?? []

  return (
    <div>
      <section className="pt-10 pb-3 md:pb-[30px]">
        <h1 className="m-0 mb-8 uppercase">About</h1>
        <div className="max-w-[720px]">
          <PortableText value={bio} components={components} />
        </div>
      </section>
      <SiteFooter />
    </div>
  )
}
