import Link from 'next/link'
import CTA from './cta'

const links = [
  { href: '/shows', label: 'Shows' },
  { href: '/audio', label: 'Audio' },
  { href: '/video', label: 'Video' },
]

export default function Nav() {
  return (
    <div className="w-full flex items-center justify-between">
      <Link href="/" className="text-white">
        ADEOLA
      </Link>
      <div className="flex items-center gap-6">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="text-white/60 hover:text-white text-sm transition-colors duration-200"
          >
            {label}
          </Link>
        ))}
        <CTA link={'adeola'} text={'Contact'} />
      </div>
    </div>
  )
}
