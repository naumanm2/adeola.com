'use client'

import { useState } from 'react'
import CTA from './cta'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  function handle(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setSent(true)
  }

  if (sent) {
    return (
      <p
        style={{
          color: 'rgba(255,255,255,0.55)',
          fontSize: '0.9rem',
          borderBottom: '0.5px solid rgba(255,255,255,0.35)',
          paddingBottom: 10,
        }}
      >
        Thanks — I&apos;ll be in touch.
      </p>
    )
  }

  return (
    <form
      onSubmit={handle}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        borderBottom: '0.5px solid rgba(255,255,255,0.35)',
        paddingBottom: 8,
      }}
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="min-w-0 flex-1 bg-transparent py-2.5 text-white outline-none placeholder:text-white/30"
        style={{
          border: 'none',
          fontSize: '0.95rem',
          letterSpacing: '0.02em',
          fontFamily: 'inherit',
        }}
      />
      <CTA text="Join" type="submit" />
    </form>
  )
}
