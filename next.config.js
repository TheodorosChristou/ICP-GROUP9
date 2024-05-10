/** @type {import('next').NextConfig} */
const getBuildId = require('./utils/buildid.js')
const getStaticPrecacheEntries = require('./utils/staticprecache.js')
const getGeneratedPrecacheEntries = require('./utils/precache.js')
const buildId = getBuildId()

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  dynamicStartUrl: false, // precache home page instead of storing it in runtime cache by default
  register: true,
  skipWaiting: false,
  additionalManifestEntries: [
    ...getStaticPrecacheEntries({
        publicExcludes: [
        '!*.png',
        '!*.ico',
        '!browserconfig.xml',
      ],
    }), 
    ...getGeneratedPrecacheEntries(buildId),
  ],
  buildExcludes: [/middleware-manifest\.json$/,
   /_buildManifest\.js$/,
  ],
})





const nextConfig = withPWA({
  eslint: {
    ignoreDuringBuilds: process.env.LINTMODE === 'nolint', // for fastbuild script
  },
})

module.exports = nextConfig
