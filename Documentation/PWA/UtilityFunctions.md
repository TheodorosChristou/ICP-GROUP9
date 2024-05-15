
# Utility Functions

This document provides an overview of the utility functions used in the project. These functions assist in generating build IDs, precaching static and dynamic content, and integrating with the `next-pwa` library.

## `buildid.js`

This module generates a unique build ID using the `nanoid` library.

### Code

```javascript
const { nanoid } = require('nanoid');

let buildId = 0;

function getBuildId() {
  if (!buildId) {
    buildId = nanoid();
  }
  return buildId;
}

module.exports = getBuildId;
```
### Explanation

-   **nanoid**: A library for generating unique IDs.
-   **buildId**: A variable to store the generated build ID.
-   **getBuildId()**: A function that generates and returns a unique build ID. It ensures the ID is generated only once.

## `precache.js`

This module handles the generation of precache entries for pages in the application.

### Code

```javascript

const path = require('path');
const fs = require('fs');

const pages = [
  { route: '/', precacheHtml: false, precacheJson: false },
  { route: '/map', precacheHtml: false, precacheJson: false },
];

function readJsonFile(dataFile) {
  let json = fs.readFileSync(dataFile, { encoding: 'utf8' });
  return JSON.parse(json);
}

function getPageJSONPath(buildId, pageRoute) {
  return path.posix.join('/_next/data/', buildId, `${pageRoute}.json`);
}

function getJSONEntry(buildId, pageRoute) {
  return { url: getPageJSONPath(buildId, pageRoute), revision: null };
}

function getHTMLEntry(buildId, pageRoute) {
  return { url: pageRoute, revision: buildId };
}

function getNormalPageEntries(buildId, page) {
  let entries = [];
  if (page.precacheHtml) {
    entries.push(getHTMLEntry(buildId, page.route));
  }
  if (page.precacheJson) {
    entries.push(getJSONEntry(buildId, page.route));
  }
  return entries;
}

function getDynamicPageEntries(buildId, page) {
  let pageList = page.dynamicPages.map(actualPage => path.posix.join(page.route, actualPage));
  let entries = pageList.map(route => getNormalPageEntries(
    buildId, { route: route, precacheHtml: page.precacheHtml, precacheJson: page.precacheJson }
  ));
  return entries.reduce((acc, curr) => acc.concat(curr), []);
}

function getPageEntries(buildId, page) {
  if (Array.isArray(page.dynamicPages)) {
    return getDynamicPageEntries(buildId, page);
  } else {
    return getNormalPageEntries(buildId, page);
  }
}

function getGeneratedPrecacheEntries(buildId) {
  if (typeof buildId !== 'string') {
    console.error('getGeneratedPrecacheEntries: buildId should be a string', buildId);
    return;
  } else if (buildId === '') {
    console.error('getGeneratedPrecacheEntries: buildId cannot be an empty string');
    return;
  }

  return pages.map(page => getPageEntries(buildId, page)).reduce((acc, curr) => acc.concat(curr), []);
}

module.exports = getGeneratedPrecacheEntries;
```
### Explanation

-   **pages**: An array of page objects with their routes and precaching preferences.
-   **readJsonFile()**: Reads and parses a JSON file.
-   **getPageJSONPath()**: Constructs the path for a page's JSON data.
-   **getJSONEntry()**: Creates a JSON entry object for precaching.
-   **getHTMLEntry()**: Creates an HTML entry object for precaching.
-   **getNormalPageEntries()**: Generates precache entries for normal pages.
-   **getDynamicPageEntries()**: Generates precache entries for dynamic pages.
-   **getPageEntries()**: Determines whether a page is dynamic or normal and gets the corresponding entries.
-   **getGeneratedPrecacheEntries()**: Generates precache entries for all pages, ensuring the build ID is valid.

## `staticprecache.js`

This module handles the generation of precache entries for static files in the public directory.

### Code

```javascript
const path = require('path');
const fs = require('fs');
const globby = require('globby');
const crypto = require('crypto');

const getRevision = file => crypto.createHash('md5').update(fs.readFileSync(file)).digest('hex');

function getStaticPrecacheEntries(pwaOptions) {
  const basePath = pwaOptions.basePath || '/';
  const sw = pwaOptions.sw || 'sw.js';
  const publicExcludes = pwaOptions.publicExcludes || ['!noprecache/**/*'];

  let manifestEntries = globby
    .sync(
      [
        '**/*',
        '!workbox-*.js',
        '!workbox-*.js.map',
        '!worker-*.js',
        '!worker-*.js.map',
        '!fallback-*.js',
        '!fallback-*.js.map',
        `!${sw.replace(/^\/+/, '')}`,
        `!${sw.replace(/^\/+/, '')}.map`,
        ...publicExcludes
      ],
      {
        cwd: 'public'
      }
    )
    .map(f => ({
      url: path.posix.join(basePath, `/${f}`),
      revision: getRevision(`public/${f}`)
    }));
  return manifestEntries;
}

module.exports = getStaticPrecacheEntries;
``` 

### Explanation

-   **getRevision()**: Generates an MD5 hash of a file's content to use as its revision.
-   **getStaticPrecacheEntries()**: Generates precache entries for static files in the `public` directory.
    -   **pwaOptions**: Configuration options for `next-pwa`.
    -   **basePath**: The base path for URLs (default is `/`).
    -   **sw**: The service worker file name (default is `sw.js`).
    -   **publicExcludes**: An array of patterns to exclude from precaching (default excludes files in `noprecache` directory).
    -   **manifestEntries**: An array of objects representing the static files to be precached with their URLs and revisions.

These utility functions are essential for managing the caching strategy and ensuring the PWA works efficiently by caching necessary resources and handling updates correctly.
