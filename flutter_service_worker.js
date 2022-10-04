'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "42b2c23b222a5ed34b323fed637940e3",
"assets/assets/fonts/Baloo-Chettan-Regular.ttf": "a67ee72b54a03d425eb928e92702f54f",
"assets/assets/images/arrow-left.png": "99ee2f6ad153bf530a24ff3bd2db04e3",
"assets/assets/images/beer-gfx.png": "bda320d95aa680fa71bfe09d388eb875",
"assets/assets/images/beerCounter.png": "bfa46ccd39b978f2d613b7357006145f",
"assets/assets/images/beertap-logo.png": "ef921a8e24429e84458d74efd127fb56",
"assets/assets/images/brands.png": "4cea4a760ea9f254819257592b3f38f3",
"assets/assets/images/food-and-drink.png": "11f4469d230744e646e3a842b803bfd3",
"assets/assets/images/gear-icon.jpg": "38af34bbe1098d93f97328e409e361f2",
"assets/assets/images/geography.png": "4ce0e8fa8563d694db2fd7907097508f",
"assets/assets/images/main-menu/background.png": "1a2cc28fe8147706d2ffd3d694304f88",
"assets/assets/images/movies.png": "b27f16a83c2400c4e7398379073d851a",
"assets/assets/images/music.png": "b04663abb88d2224c7573da2d35ef0fd",
"assets/assets/images/pause.png": "f8e2b53c83ac138a04cae36b7538ea81",
"assets/assets/images/sports.png": "891944ab49857b75a65d23b8b3df5deb",
"assets/assets/images/starts-with.png": "d5dcf2a6d407ac7d0a93bf345181fff7",
"assets/assets/images/technology.png": "28c90c7d251326644f1a2218b179b460",
"assets/assets/images/you-lost.png": "37ca9470c721e99a61b887ef59739a67",
"assets/assets/videos/beer-animation-glass.mp4": "5387543fcb31e92c7ed19f0f26649f9e",
"assets/assets/videos/beer-animation-glass.webm": "3ea107a6abb8c83bb30d00fda3079656",
"assets/assets/videos/beer-animation-transparent.webm": "e970c070c052b53cd11fde229cfd32e0",
"assets/FontManifest.json": "44ce53071865a00708e0c6fb4344e06c",
"assets/fonts/MaterialIcons-Regular.otf": "95db9098c58fd6db106f1116bae85a0b",
"assets/NOTICES": "9ab2b6993b5d339d90bef62f7134ab45",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/shaders/ink_sparkle.frag": "ae6c1fd6f6ee6ee952cde379095a8f3f",
"canvaskit/canvaskit.js": "2bc454a691c631b07a9307ac4ca47797",
"canvaskit/canvaskit.wasm": "bf50631470eb967688cca13ee181af62",
"canvaskit/profiling/canvaskit.js": "38164e5a72bdad0faa4ce740c9b8e564",
"canvaskit/profiling/canvaskit.wasm": "95a45378b69e77af5ed2bc72b2209b94",
"favicon.ico": "1983a9e5dc51d44ac6c9c2c60e3baf61",
"favicon.png": "9742921a852d4818ebfd2f3495766013",
"flutter.js": "f85e6fb278b0fd20c349186fb46ae36d",
"icons/Icon-192.png": "3b563806524fd43b1107b750c3c102b6",
"icons/Icon-512.png": "3b563806524fd43b1107b750c3c102b6",
"icons/Icon-maskable-192.png": "3b563806524fd43b1107b750c3c102b6",
"icons/Icon-maskable-512.png": "3b563806524fd43b1107b750c3c102b6",
"index.html": "d521111080e05c66b292743bbc050cc6",
"/": "d521111080e05c66b292743bbc050cc6",
"main.dart.js": "70cc3eb257ca0d6ab5551ccbc03af9c5",
"manifest.json": "a052fc08a99c772d81e2370b55397ace",
"script.js": "8229bb66964edef18ac2c3aa76b43147",
"version.json": "1c3ba6d973a11603a84deac549304799"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
