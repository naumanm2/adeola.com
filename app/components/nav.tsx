'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import CTA from './cta'

const links = [
  { id: 'shows', label: 'Shows' },
  { id: 'audio', label: 'Audio' },
  { id: 'video', label: 'Video' },
  { id: 'about', label: 'About' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [activeId, setActiveId] = useState<string | null>(null)
  const drawerRef = useRef<HTMLDivElement>(null)

  // Scroll-spy: track which section is most in view
  useEffect(() => {
    const sections = links
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-30% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    )
    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Drawer keyboard handling + body scroll lock
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        return
      }
      if (e.key !== 'Tab' || !drawerRef.current) return
      const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      )
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = document.activeElement
      if (e.shiftKey && active === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && active === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open])

  return (
    <nav
      aria-label="Primary"
      className="flex w-full items-center justify-between"
    >
      <Link
        href="/"
        className="font-bold tracking-wider text-white text-base md:text-lg rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
      >
        ADEOLA
      </Link>

      {/* Desktop links */}
      <div className="hidden items-center gap-6 md:flex">
        {links.map(({ id, label }) => {
          const active = activeId === id
          return (
            <a
              key={id}
              href={`/#${id}`}
              aria-current={active ? 'true' : undefined}
              className={`nav-link rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e2795] ${
                active ? 'nav-link--active border-b border-white pb-0.5' : ''
              }`}
            >
              {label}
            </a>
          )
        })}
        <CTA link="mailto:hello@adeola.com" text="Contact" />
      </div>

      {/* Mobile hamburger toggle */}
      <button
        type="button"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((v) => !v)}
        className="md:hidden relative z-50 flex h-11 w-11 items-center justify-center rounded-full text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
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
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-200 ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden={!open}
      >
        <div
          className="absolute inset-0 bg-[#0e2795] backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
        <div
          ref={drawerRef}
          className={`relative flex h-full flex-col items-start gap-6 p-6 pt-24 transition-transform duration-200 ${
            open ? 'translate-x-0' : '-translate-x-4'
          }`}
        >
          {links.map(({ id, label }) => {
            const active = activeId === id
            return (
              <a
                key={id}
                href={`/#${id}`}
                onClick={() => setOpen(false)}
                aria-current={active ? 'true' : undefined}
                className={`text-3xl sm:text-4xl font-bold uppercase tracking-widest rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                  active ? 'text-white' : 'text-white/60'
                }`}
              >
                {label}
              </a>
            )
          })}
          <div className="pt-4">
            <CTA link="mailto:hello@adeola.com" text="Contact" />
          </div>
        </div>
      </div>
    </nav>
  )
}
