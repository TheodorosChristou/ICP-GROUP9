self.addEventListener("install", event => {
console.log("Service worker installed");
 });
self.addEventListener("activate", event => {
   console.log("Service worker activated");
});
 
 const cacheName = "testsw";
 const version = "v0.0.1";
