if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,a)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let t={};const r=e=>i(e,c),o={module:{uri:c},exports:t,require:r};s[c]=Promise.all(n.map((e=>o[e]||r(e)))).then((e=>(a(...e),t)))}}define(["./workbox-dc237ac1"],(function(e){"use strict";importScripts(),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.clientsClaim(),e.precacheAndRoute([{url:"/",revision:"bQehfa00sBICQ_hwonYR0"},{url:"/_next/data/-VWnYrZn_c218BLR5kQC7/about.json",revision:null},{url:"/_next/data/-VWnYrZn_c218BLR5kQC7/denizens.json",revision:null},{url:"/_next/static/bQehfa00sBICQ_hwonYR0/_buildManifest.js",revision:"c791657044e2842472cc878bdec47ec6"},{url:"/_next/static/bQehfa00sBICQ_hwonYR0/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/0b7b90cd.abad55a865e4a8c0.js",revision:"abad55a865e4a8c0"},{url:"/_next/static/chunks/121-4e71c0b828171ac4.js",revision:"4e71c0b828171ac4"},{url:"/_next/static/chunks/536-22490c955d06cf1b.js",revision:"22490c955d06cf1b"},{url:"/_next/static/chunks/592-181b564fe535f322.js",revision:"181b564fe535f322"},{url:"/_next/static/chunks/733.e110de17b0aae12a.js",revision:"e110de17b0aae12a"},{url:"/_next/static/chunks/framework-2c16ac744b6cdea6.js",revision:"2c16ac744b6cdea6"},{url:"/_next/static/chunks/main-b0798e0d2eae5c9e.js",revision:"b0798e0d2eae5c9e"},{url:"/_next/static/chunks/pages/404-76634073ce825bf1.js",revision:"76634073ce825bf1"},{url:"/_next/static/chunks/pages/_app-a534e8cbaab73d3d.js",revision:"a534e8cbaab73d3d"},{url:"/_next/static/chunks/pages/_error-77823ddac6993d35.js",revision:"77823ddac6993d35"},{url:"/_next/static/chunks/pages/archive-c620ef02cbf8a1f3.js",revision:"c620ef02cbf8a1f3"},{url:"/_next/static/chunks/pages/index-df2a4b9bea585595.js",revision:"df2a4b9bea585595"},{url:"/_next/static/chunks/pages/map-401db70be806bfda.js",revision:"401db70be806bfda"},{url:"/_next/static/chunks/pages/map/%5BLat%5D/%5BLon%5D/map-fbef44ed5f49be1b.js",revision:"fbef44ed5f49be1b"},{url:"/_next/static/chunks/pages/route/%5Bid%5D/update-d7674e6be917b53f.js",revision:"d7674e6be917b53f"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-7d7572c9b7d03bc7.js",revision:"7d7572c9b7d03bc7"},{url:"/_next/static/css/3b426f7e64152bbf.css",revision:"3b426f7e64152bbf"},{url:"/_next/static/css/fc1c9daac70c093b.css",revision:"fc1c9daac70c093b"},{url:"/_next/static/media/layers-2x.9859cd12.png",revision:"9859cd12"},{url:"/_next/static/media/layers.ef6db872.png",revision:"ef6db872"},{url:"/_next/static/media/mark.9ca311fa.ico",revision:"f43014df24cd65deff7bf7e53081325d"},{url:"/_next/static/media/marker-icon.d577052a.png",revision:"d577052a"},{url:"/_next/static/media/user.c61acebc.ico",revision:"3671e6e5d6b7bd854825244d6793f87f"},{url:"/denizens",revision:"-VWnYrZn_c218BLR5kQC7"},{url:"/img/12.PNG",revision:"8ed743b8c6e57130018783b444293cee"},{url:"/img/404.png",revision:"4538f4917fca73238b8b925011584649"},{url:"/img/Anchor.ico",revision:"3fd5dbecc7c65f84d5653aca4a5ffef2"},{url:"/img/Anchor.png",revision:"3fd5dbecc7c65f84d5653aca4a5ffef2"},{url:"/img/Ship.PNG",revision:"9c93cc254fef2a3fb6b96680e76b2e0d"},{url:"/img/Ship2.PNG",revision:"56b227ea9bf2d22c95f6cbb418fdbc8d"},{url:"/img/humitidy.ico",revision:"9287eac619aa82e5991c72ae39be1fd6"},{url:"/img/mark.ico",revision:"f43014df24cd65deff7bf7e53081325d"},{url:"/img/maskable_icon.png",revision:"4731faffe66da265997ca7356509ee55"},{url:"/img/pressure.ico",revision:"2192dbda3e647b314d94d498ed6e5b81"},{url:"/img/user.ico",revision:"3671e6e5d6b7bd854825244d6793f87f"},{url:"/img/waves.jpg",revision:"722ce1b6138927d1e41760dc560fb4f8"},{url:"/img/waves3.jpg",revision:"42a17b7403ed2e324fe7f6442ffaca88"},{url:"/img/weather.ico",revision:"18337d56b703750ec8e17f7b4069130f"},{url:"/img/wind.ico",revision:"b4128e267e635a72fa46f4de3d99668e"},{url:"/manifest.json",revision:"5a4f0f3b717149a630de0030331c565b"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
