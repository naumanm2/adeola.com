'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import CTA from './cta'

const links = [
  { href: '/shows', label: 'Shows' },
  { href: '/audio', label: 'Audio' },
  { href: '/video', label: 'Video' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <nav
      aria-label="Primary"
      className="flex w-full items-center justify-between"
    >
      <Link
        href="/"
        className="font-bold tracking-wider text-white text-base md:text-lg"
      >
        ADEOLA
      </Link>

      {/* Desktop links */}
      <div className="hidden items-center gap-6 md:flex">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="text-sm text-white/60 transition-colors duration-200 hover:text-white focus-visible:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e2795] rounded-sm"
          >
            {label}
          </Link>
        ))}
        <CTA link="mailto:hello@adeola.com" text="Contact" />
      </div>

      {/* Mobile hamburger toggle */}
      <button
        type="button"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((v) => !v)}
        className="md:hidden flex h-11 w-11 items-center justify-center rounded-full text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <span className="relative block h-4 w-6">
          <span
            className={`absolute left-0 top-0 block h-0.5 w-6 bg-white transition-transform duration-200 ${
              open ? 'translate-y-[7px] rotate-45' : ''
            }`}
          />
          <span
            className={`absolute left-0 top-[7px] block h-0.5 w-6 bg-white transition-opacity duration-200 ${
              open ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`absolute left-0 top-[14px] block h-0.5 w-6 bg-white transition-transform duration-200 ${
              open ? '-translate-y-[7px] -rotate-45' : ''
            }`}
          />
        </span>
      </button>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        className={`fixed inset-0 z-40 md:hidden ${open ? '' : 'pointer-events-none'}`}
        aria-hidden={!open}
      >
        <div
          className={`absolute inset-0 bg-[#0e2795]/95 backdrop-blur-sm transition-opacity duration-200 ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setOpen(false)}
        />
        <div
          className={`relative flex h-full flex-col items-start gap-8 p-6 pt-24 transition-transform duration-200 ${
            open ? 'translate-x-0' : '-translate-x-4'
          }`}
        >
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-4xl font-bold uppercase tracking-widest text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-sm"
            >
              {label}
            </Link>
          ))}
          <div className="pt-4">
            <CTA link="mailto:hello@adeola.com" text="Contact" />
          </div>
        </div>
      </div>
    </nav>
  )
}
