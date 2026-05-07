'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/assets/videos/beer-glass.mp4": "5aed2f2a61d1e8886e14e1416ce4bd5c",
"assets/assets/fonts/Baloo-Chettan-Regular.ttf": "a67ee72b54a03d425eb928e92702f54f",
"assets/assets/images/geography.png": "4ce0e8fa8563d694db2fd7907097508f",
"assets/assets/images/love.png": "15125521ac13c299a7781a9a1022de42",
"assets/assets/images/feedback.png": "45a7a1f04f63ed066448c43f6e43bcd0",
"assets/assets/images/sports.png": "891944ab49857b75a65d23b8b3df5deb",
"assets/assets/images/crime.png": "aac1f2b59a42db745c109ac48287f2a7",
"assets/assets/images/movies.png": "b27f16a83c2400c4e7398379073d851a",
"assets/assets/images/arrow-left.png": "99ee2f6ad153bf530a24ff3bd2db04e3",
"assets/assets/images/food-and-drink.png": "11f4469d230744e646e3a842b803bfd3",
"assets/assets/images/party.png": "74b25cd58c25ba5fc90ee9d4facd94f7",
"assets/assets/images/pause.png": "f8e2b53c83ac138a04cae36b7538ea81",
"assets/assets/images/beertap-logo.png": "ef921a8e24429e84458d74efd127fb56",
"assets/assets/images/after-dark.png": "d1844cc01625f29d7464a916622c9e70",
"assets/assets/images/beer-gfx.png": "bda320d95aa680fa71bfe09d388eb875",
"assets/assets/images/gear-icon.jpg": "38af34bbe1098d93f97328e409e361f2",
"assets/assets/images/starts-with.png": "d5dcf2a6d407ac7d0a93bf345181fff7",
"assets/assets/images/sex.png": "c10cb5d901d22732021205995fe1ad7c",
"assets/assets/images/technology.png": "28c90c7d251326644f1a2218b179b460",
"assets/assets/images/beerCounter.png": "bfa46ccd39b978f2d613b7357006145f",
"assets/assets/images/porn.png": "483f33a4f2782cfec3f3bfd3aca4f5df",
"assets/assets/images/beer-bottom.png": "37b6d6fb5f83db5309727fe30371695a",
"assets/assets/images/brands.png": "4cea4a760ea9f254819257592b3f38f3",
"assets/assets/images/you-lost.png": "c738534bbdec1b5105111c348fff87c7",
"assets/assets/images/music.png": "b04663abb88d2224c7573da2d35ef0fd",
"assets/AssetManifest.json": "445c22abfa8f58a5507ac9954ea8dbb6",
"assets/AssetManifest.bin.json": "34daad7b630839eb9c59936eac2b06f2",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "89ed8f4e49bcdfc0b5bfc9b24591e347",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/fonts/MaterialIcons-Regular.otf": "0db35ae7a415370b89e807027510caf0",
"assets/AssetManifest.bin": "e0b206318177275ae20bd6a588d3eb3b",
"assets/NOTICES": "0b78765873ce4d25f4d1a0dc248f9204",
"assets/FontManifest.json": "44ce53071865a00708e0c6fb4344e06c",
"script.js": "8229bb66964edef18ac2c3aa76b43147",
"favicon.png": "9742921a852d4818ebfd2f3495766013",
"manifest.json": "3d30e96afab3caabf0787ae7576d88f7",
"favicon.ico": "1983a9e5dc51d44ac6c9c2c60e3baf61",
"index.html": "9615c01fcfcfcf9993996aa524c9b9b9",
"/": "9615c01fcfcfcf9993996aa524c9b9b9",
"canvaskit/skwasm.js.symbols": "262f4827a1317abb59d71d6c587a93e2",
"canvaskit/chromium/canvaskit.js.symbols": "a012ed99ccba193cf96bb2643003f6fc",
"canvaskit/chromium/canvaskit.wasm": "b1ac05b29c127d86df4bcfbf50dd902a",
"canvaskit/chromium/canvaskit.js": "671c6b4f8fcc199dcc551c7bb125f239",
"canvaskit/canvaskit.js.symbols": "48c83a2ce573d9692e8d970e288d75f7",
"canvaskit/skwasm.wasm": "9f0c0c02b82a910d12ce0543ec130e60",
"canvaskit/canvaskit.wasm": "1f237a213d7370cf95f443d896176460",
"canvaskit/skwasm.worker.js": "89990e8c92bcb123999aa81f7e203b1c",
"canvaskit/canvaskit.js": "66177750aff65a66cb07bb44b8c6422b",
"canvaskit/skwasm.js": "694fda5704053957c2594de355805228",
"flutter.js": "f393d3c16b631f36852323de8e583132",
"flutter_bootstrap.js": "b70cf28dafd67763405c41b8395d5916",
"main.dart.js": "b6da7bcb52464fb4e50239aa55ff3169",
"version.json": "7ed7100f8c3c51958b11df9ddbedfd29",
"icons/Icon-maskable-512.png": "3b563806524fd43b1107b750c3c102b6",
"icons/Icon-maskable-192.png": "3b563806524fd43b1107b750c3c102b6",
"icons/Icon-512.png": "3b563806524fd43b1107b750c3c102b6",
"icons/Icon-192.png": "3b563806524fd43b1107b750c3c102b6"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
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
        // Claim client to enable caching on first launch
        self.clients.claim();
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
      // Claim client to enable caching on first launch
      self.clients.claim();
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
