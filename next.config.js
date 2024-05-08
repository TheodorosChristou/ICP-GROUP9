/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  dynamicStartUrl: false, // precache home page instead of storing it in runtime cache by default
  register: false,
  skipWaiting: false,
  buildExcludes: [/middleware-manifest\.json$/], // for Next 12, see https://github.com/shadowwalker/next-pwa/issues/288
})

const nextConfig = withPWA({
  eslint: {
    ignoreDuringBuilds: process.env.LINTMODE === 'nolint', // for fastbuild script
  },
})

module.exports = nextConfig