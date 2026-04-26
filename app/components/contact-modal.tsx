'use client'

import { useEffect, useState } from 'react'
import CTA from './cta'

export default function ContactModal({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const [sent, setSent] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  function handleClose() {
    onClose()
    setTimeout(() => {
      setSent(false)
      setName('')
      setEmail('')
      setMessage('')
    }, 300)
  }

  if (!open) return null

  const fieldStyle: React.CSSProperties = {
    border: 'none',
    borderBottom: '0.5px solid rgba(255,255,255,0.35)',
    letterSpacing: '0.01em',
    fontFamily: 'inherit',
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Contact form"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose()
      }}
      className="fixed inset-0 z-[9000] flex items-center justify-center p-6"
      style={{ background: 'rgba(4,12,40,0.72)', backdropFilter: 'blur(10px)' }}
    >
      <div
        className="relative flex w-full max-w-[480px] flex-col gap-7"
        style={{
          background: '#0e2795',
          border: '1px solid rgba(255,255,255,0.25)',
          borderRadius: 16,
          padding: 'clamp(28px, 5vw, 48px)',
        }}
      >
        <button
          onClick={handleClose}
          aria-label="Close"
          className="absolute right-[18px] top-[18px] cursor-pointer bg-transparent p-1 text-base leading-none text-white/50 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          style={{ border: 'none' }}
        >
          ✕
        </button>

        <p style={{ fontSize: '1.4rem', fontWeight: 700, letterSpacing: '0.06em' }}>
          GET IN TOUCH
        </p>

        {sent ? (
          <p
            style={{
              color: 'rgba(255,255,255,0.75)',
              fontSize: '1rem',
              lineHeight: 1.6,
              paddingBottom: 12,
            }}
          >
            Thanks — I&apos;ll get back to you.
          </p>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setSent(true)
            }}
            className="flex flex-col gap-5"
          >
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="contact-name"
                style={{
                  fontSize: '0.7rem',
                  letterSpacing: '0.22em',
                  color: 'rgba(255,255,255,0.55)',
                  textTransform: 'uppercase',
                }}
              >
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                required
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-transparent py-2.5 text-base text-white outline-none placeholder:text-white/30"
                style={fieldStyle}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="contact-email"
                style={{
                  fontSize: '0.7rem',
                  letterSpacing: '0.22em',
                  color: 'rgba(255,255,255,0.55)',
                  textTransform: 'uppercase',
                }}
              >
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent py-2.5 text-base text-white outline-none placeholder:text-white/30"
                style={fieldStyle}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="contact-message"
                style={{
                  fontSize: '0.7rem',
                  letterSpacing: '0.22em',
                  color: 'rgba(255,255,255,0.55)',
                  textTransform: 'uppercase',
                }}
              >
                Message
              </label>
              <textarea
                id="contact-message"
                required
                rows={4}
                placeholder="What&apos;s on your mind?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="resize-none bg-transparent py-2.5 text-base text-white outline-none placeholder:text-white/30"
                style={fieldStyle}
              />
            </div>
            <div className="pt-1">
              <CTA type="submit" text="Send message" />
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
