function onInstall(e) {
    e.waitUntil(caches.open(CACHE_NAME).then(function(e) {
        return e.addAll([]).then(function() {
            console.log("WORKER: Install completed")
        })
    }))
}

function onActivate(e) {
    console.log("[Serviceworker]", "Activating!", e), e.waitUntil(caches.keys().then(function(e) {
        return Promise.all(e.filter(function(e) {
            return 0 !== e.indexOf(CACHE_NAME)
        }).map(function(e) {
            return caches["delete"](e)
        }))
    }))
}

function onFetch(e) {
  const url = new URL(e.request.url);
  console.log(url);
}

function onPush(e) {
    console.log('[Service Worker] Push Received.');
    console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);
}
/*
fucntion onNotificationclick(e) {
    console.log('[Service Worker] Notification click Received.');

    event.notification.close();

    event.waitUntil(
        clients.openWindow('https://developers.google.com/web/')
    );
}
*/
var CACHE_VERSION = "v1.0.0",
    CACHE_NAME = CACHE_VERSION + ":sw-cache::",
    REQUESTS_LIMIT = 70;
self.addEventListener("install", onInstall), 
self.addEventListener("activate", onActivate), 
self.addEventListener("fetch", onFetch),
self.addEventListener("push", onPush);
//self.addEventListener('notificationclick', onNotificationclick);
