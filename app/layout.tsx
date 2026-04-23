import type { Metadata } from 'next'
import './globals.css'
import Container from './components/container'
import Nav from './components/nav'
import SmoothScroll from './components/smooth-scroll'
import { SanityLive } from '@/sanity/lib/live'

export const metadata: Metadata = {
  title: 'Adeola',
  description: 'Adeola',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-black focus:px-4 focus:py-2 focus:text-sm focus:text-white focus:outline focus:outline-2 focus:outline-white"
        >
          Skip to content
        </a>
        <SmoothScroll />
        <Container>
          <Nav />
          <main id="main-content">{children}</main>
        </Container>
        <SanityLive />
      </body>
    </html>
  )
}
