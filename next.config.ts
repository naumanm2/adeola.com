import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  async redirects() {
    return [
      { source: '/shows', destination: '/#shows', permanent: true },
      { source: '/audio', destination: '/#audio', permanent: true },
      { source: '/video', destination: '/#video', permanent: true },
      { source: '/about', destination: '/#about', permanent: true },
    ]
  },
}

export default nextConfig
