/* BiG-DreamzZ AI Studio - Service Worker */
const CACHE_VERSION = 'bigdreamzz-studio-v2';
const SHELL_CACHE = CACHE_VERSION + '-shell';
const ASSET_CACHE = CACHE_VERSION + '-assets';
const SHELL_ASSETS = ['./', './index.html', './manifest.webmanifest'];

self.addEventListener('install', function(e){
  e.waitUntil(caches.open(SHELL_CACHE).then(function(c){
    return Promise.all(SHELL_ASSETS.map(function(a){
      return c.add(a).catch(function(err){ console.warn('[SW] skip', a, err); });
    }));
  }).then(function(){ return self.skipWaiting(); }));
});
self.addEventListener('activate', function(e){
  e.waitUntil(caches.keys().then(function(keys){
    return Promise.all(keys.filter(function(k){ return k.indexOf(CACHE_VERSION)!==0; })
      .map(function(k){ return caches.delete(k); }));
  }).then(function(){ return self.clients.claim(); }));
});
function isVideo(u){ return /\.(m3u8|ts|mp4|m4s|mpd)(\?|$)/i.test(u) || u.indexOf('b-cdn.net')>-1 || u.indexOf('mediadelivery')>-1; }
function isAsset(u){ return /\.(css|js|woff2?|ttf|otf|png|jpe?g|webp|svg|gif|ico)(\?|$)/i.test(u) || u.indexOf('fonts.googleapis.com')>-1 || u.indexOf('fonts.gstatic.com')>-1 || u.indexOf('cdn.jsdelivr.net')>-1 || u.indexOf('cdnjs.cloudflare.com')>-1; }
self.addEventListener('fetch', function(e){
  var req = e.request; if(req.method!=='GET') return;
  var url = req.url; if(url.indexOf('cloudflareinsights.com')>-1) return;
  if(isVideo(url)){ e.respondWith(fetch(req).catch(function(){ return caches.match(req); })); return; }
  if(req.mode==='navigate'){
    e.respondWith(caches.match('./index.html').then(function(cached){
      var net = fetch(req).then(function(r){ var cp=r.clone(); caches.open(SHELL_CACHE).then(function(c){ c.put('./index.html', cp); }); return r; }).catch(function(){ return cached; });
      return cached || net;
    })); return;
  }
  if(isAsset(url)){
    e.respondWith(caches.match(req).then(function(cached){
      var net = fetch(req).then(function(r){ if(r&&r.status===200){ var cp=r.clone(); caches.open(ASSET_CACHE).then(function(c){ c.put(req, cp); }); } return r; }).catch(function(){ return cached; });
      return cached || net;
    })); return;
  }
  e.respondWith(fetch(req).catch(function(){ return caches.match(req); }));
});
self.addEventListener('message', function(e){ if(e.data==='SKIP_WAITING') self.skipWaiting(); });
