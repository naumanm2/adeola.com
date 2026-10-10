import type { Metadata } from 'next'
import SiteFooter from '../components/site-footer'
import ShowsSection from '../components/sections/shows-section'

export const metadata: Metadata = {
  title: 'Shows — Adeola',
  description: 'Upcoming live shows by Adeola.',
}

export default function ShowsPage() {
  return (
    <div>
      <div className="pt-10">
        <h1 className="m-0 mb-5 uppercase">Shows</h1>
      </div>
      <ShowsSection showHeading={false} />
      <SiteFooter />
    </div>
  )
}
