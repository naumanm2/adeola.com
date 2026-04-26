'use client'

import { useState } from 'react'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  function handle(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setSent(true)
  }

  return (
    <div className="flex flex-col gap-3.5">
      <p
        style={{
          fontSize: '0.72rem',
          letterSpacing: '0.18em',
          color: 'rgba(255,255,255,0.5)',
          textTransform: 'uppercase',
        }}
      >
        Mailing list
      </p>
      {sent ? (
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
      ) : (
        <form
          onSubmit={handle}
          style={{
            display: 'flex',
            alignItems: 'stretch',
            borderBottom: '0.5px solid rgba(255,255,255,0.35)',
          }}
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 bg-transparent py-2.5 text-white outline-none placeholder:text-white/30"
            style={{
              border: 'none',
              fontSize: '0.95rem',
              letterSpacing: '0.02em',
              fontFamily: 'inherit',
            }}
          />
          <button
            type="submit"
            className="cursor-pointer font-bold uppercase"
            style={{
              background: '#fff',
              color: '#0e2795',
              border: 'none',
              fontFamily: 'inherit',
              fontSize: '0.72rem',
              letterSpacing: '0.22em',
              padding: '0 18px',
            }}
          >
            Join
          </button>
        </form>
      )}
    </div>
  )
}
