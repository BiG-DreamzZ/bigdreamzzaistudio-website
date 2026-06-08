/* BiG-DreamzZ AI Studio - Service Worker (minimal / install-only)
   Caches ONLY the studio page shell so the app is installable + opens
   offline. It NEVER handles or caches the admin page, and it does NOT
   call clients.claim(), so it cannot take over admin navigations.
   Images, videos, CDN, API calls all go straight to the network. */
const CACHE_VERSION = 'bigdreamzz-studio-v7';
const SHELL_CACHE = CACHE_VERSION + '-shell';
const SHELL_ASSETS = ['./index.html', './manifest.webmanifest'];

self.addEventListener('install', function(e){
  self.skipWaiting();
  e.waitUntil(caches.open(SHELL_CACHE).then(function(c){
    return Promise.all(SHELL_ASSETS.map(function(a){
      return c.add(a).catch(function(err){ console.warn('[Studio SW] skip', a, err); });
    }));
  }));
});

self.addEventListener('activate', function(e){
  e.waitUntil(caches.keys().then(function(keys){
    return Promise.all(keys.filter(function(k){
      return k.indexOf('bigdreamzz-studio-') === 0 && k.indexOf(CACHE_VERSION) !== 0;
    }).map(function(k){ return caches.delete(k); }));
  }));
});

self.addEventListener('fetch', function(e){
  var req = e.request;
  if(req.method !== 'GET') return;
  if(req.mode !== 'navigate') return;
  // Only handle STUDIO navigations. Anything containing 'admin' is left
  // entirely to the network / the admin worker.
  if(req.url.indexOf('admin') > -1) return;
  e.respondWith(
    fetch(req).then(function(r){
      var cp = r.clone();
      caches.open(SHELL_CACHE).then(function(c){ c.put('./index.html', cp); });
      return r;
    }).catch(function(){
      return caches.match('./index.html');
    })
  );
});

self.addEventListener('message', function(e){ if(e.data === 'SKIP_WAITING') self.skipWaiting(); });
