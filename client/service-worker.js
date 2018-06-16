// Set this to true for production
var doCache = false;

// Name our cache
const VERSION = 'login-v1';
var urlsToCache = [
    '/components/Login.js',
    '/css/login.css'
];

// Delete old caches that are not our current one!
self.addEventListener("activate", event => {
    console.log("inside activate");
    const cacheWhitelist = [VERSION];
    event.waitUntil(
        caches.keys()
            .then(keyList =>
                Promise.all(keyList.map(key => {
                    if (!cacheWhitelist.includes(key)) {
                        console.log('Deleting cache: ' + key)
                        return caches.delete(key);
                    }
                }))
            )
    );
});

// The first time the user starts up the PWA, 'install' is triggered.
self.addEventListener('install', function(event) {
    if (doCache) {
        // Perform install steps
        event.waitUntil(
            caches.open(VERSION)
                .then(function (cache) {
                    console.log('opened cache');
                    return cache.addAll(urlsToCache);
                })
        );
    }
});

// When the webpage goes to fetch files, we intercept that request and serve up the matching files
// if we have them
self.addEventListener('fetch', function(event) {
    if (doCache) {
        event.respondWith(
            caches.match(event.request).then(function(response) {
                console.log('fetch cache and return response');
                return response || fetch(event.request);
            })
        );
    }
});