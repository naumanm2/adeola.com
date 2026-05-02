'use client'

import { useEffect, useRef, useState } from 'react'
import CTA from './cta'
import ContactModal from './contact-modal'

const links = [
  { id: 'music', label: 'Music' },
  { id: 'shows', label: 'Shows' },
  { id: 'video', label: 'Videos' },
  { id: 'about', label: 'About' },
  { id: 'newsletter', label: 'Newsletter' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [contactOpen, setContactOpen] = useState(false)
  const drawerRef = useRef<HTMLDivElement>(null)
  const contactTriggerRef = useRef<HTMLElement | null>(null)

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
    <>
      <nav
        aria-label="Primary"
        className="flex w-full items-center justify-between py-[22px]"
      >
        <div aria-hidden="true" />

        {/* Desktop links */}
        <div className="hidden items-center gap-7 md:flex">
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
          <CTA
            text="Contact"
            onClick={() => {
              contactTriggerRef.current = document.activeElement as HTMLElement
              setContactOpen(true)
            }}
          />
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
          className="relative z-50 flex h-11 w-11 items-center justify-center rounded-full text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:hidden"
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
      </nav>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        className={`fixed inset-0 z-40 transition-opacity duration-200 md:hidden ${
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
                className={`rounded-sm text-3xl font-bold uppercase tracking-widest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:text-4xl ${
                  active ? 'text-white' : 'text-white/60'
                }`}
              >
                {label}
              </a>
            )
          })}
          <div className="pt-4">
            <CTA
              text="Contact"
              onClick={() => {
                contactTriggerRef.current = document.activeElement as HTMLElement
                setOpen(false)
                setContactOpen(true)
              }}
            />
          </div>
        </div>
      </div>

      <ContactModal
        open={contactOpen}
        onClose={() => setContactOpen(false)}
        triggerRef={contactTriggerRef}
      />
    </>
  )
}
