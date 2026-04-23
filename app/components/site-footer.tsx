import Link from 'next/link'
import { sanityFetch } from '@/sanity/lib/live'

type Social = { social: string; url: string }

type General = {
  socials?: Social[]
  phone?: string
  email?: string
}

const FOOTER_QUERY = `*[_type == "general"][0]{
  socials[]{ social, url },
  phone,
  email
}`

export default async function SiteFooter({
  wordmark,
  size = 'lg',
}: {
  wordmark: string
  size?: 'sm' | 'lg'
}) {
  const { data } = await sanityFetch({ query: FOOTER_QUERY })
  const general = (data ?? {}) as General
  const socials = general.socials ?? []
  const hasContact = Boolean(general.phone || general.email)

  const sizeClass =
    size === 'sm' ? 'display-giant display-giant--sm' : 'display-giant'

  return (
    <footer className="mt-16 flex flex-col gap-6 md:mt-24">
      {(socials.length > 0 || hasContact) && (
        <div className="flex flex-col gap-4 border-t border-white pt-6 pb-2">
          {socials.length > 0 && (
            <div className="flex flex-wrap gap-x-8 gap-y-3 px-3">
              {socials.map((s) => (
                <Link
                  key={s.social}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-sm py-1 text-lg md:text-xl font-bold uppercase tracking-widest text-white transition-colors duration-200 hover:text-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                >
                  {s.social}
                </Link>
              ))}
            </div>
          )}
          {hasContact && (
            <div className="flex flex-wrap gap-x-8 gap-y-2 px-3">
              {general.email && (
                <a
                  href={`mailto:${general.email}`}
                  className="nav-link rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                >
                  {general.email}
                </a>
              )}
              {general.phone && (
                <a
                  href={`tel:${general.phone.replace(/\s+/g, '')}`}
                  className="nav-link rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                >
                  {general.phone}
                </a>
              )}
            </div>
          )}
        </div>
      )}

      <div className="relative flex w-full flex-col items-center overflow-hidden pt-6 md:pt-10">
        <span className={`${sizeClass} whitespace-nowrap text-white`}>
          {wordmark}
        </span>
        <span
          className={`${sizeClass} reflect whitespace-nowrap`}
          aria-hidden="true"
        >
          {wordmark}
        </span>
      </div>

      <div className="flex items-center justify-center pb-6">
        <p className="text-micro">cc. Adeola Ikuesan 2026</p>
      </div>
    </footer>
  )
}
