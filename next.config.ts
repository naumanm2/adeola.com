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
      { source: '/audio', destination: '/#audio', permanent: true },
      { source: '/video', destination: '/videos', permanent: true },
    ]
  },
}

export default nextConfig
