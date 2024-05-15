
# Next.js PWA Configuration
This document explains the configuration for the `next-pwa` library used in the project to generate a service worker and enable Progressive Web App (PWA) features.
## Configuration File

The main configuration for `next-pwa` is defined in `next.config.js`. Below is a detailed explanation of the setup:

```javascript
/** @type {import('next').NextConfig} */
const getBuildId = require('./utils/buildid.js');
const getStaticPrecacheEntries = require('./utils/staticprecache.js');
const getGeneratedPrecacheEntries = require('./utils/precache.js');
const buildId = getBuildId();

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  dynamicStartUrl: false, // Precache home page instead of storing it in runtime cache by default
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
  buildExcludes: [
    /middleware-manifest\.json$/,
    /_buildManifest\.js$/,
  ],
});

const nextConfig = withPWA({
  eslint: {
    ignoreDuringBuilds: process.env.LINTMODE === 'nolint', // For fast build script
  },
});

module.exports = nextConfig;
```
### Configuration

1.  **Dynamic Imports**
    
    -   `getBuildId`: A utility function to get the build ID.
    -   `getStaticPrecacheEntries`: A utility function to get static precache entries.
    -   `getGeneratedPrecacheEntries`: A utility function to get generated precache entries.
2.  **Build ID**
    
    -   `buildId`: Obtained by calling `getBuildId()`.
3.  **Options**
    
    -   `dest`: Directory where the service worker file will be placed (`public`).
    -   `disable`: Disable PWA features in development mode (`process.env.NODE_ENV === 'development'`).
    -   `dynamicStartUrl`: When set to `false`, the home page is precached instead of storing it in the runtime cache by default.
    -   `register`: Automatically registers the service worker.
    -   `skipWaiting`: When set to `false`, the service worker won't skip waiting and will not immediately take control.
    -   `additionalManifestEntries`: Additional entries to be precached.
        -   `getStaticPrecacheEntries`: Adds static assets to the precache, excluding certain files.
        -   `getGeneratedPrecacheEntries`: Adds dynamically generated assets to the precache, using the `buildId`.
    -   `buildExcludes`: Excludes specific files from being included in the build manifest.
