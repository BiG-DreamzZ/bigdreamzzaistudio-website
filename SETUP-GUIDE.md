# BiG-DreamzZ — Progressive Web App — Setup Guide

You now have **two installable apps**:

- **The Studio** (`index.html`) — your public website. Icon = your hooded-figure image.
- **The Director's Panel** (`admin.html`) — your private admin panel. Icon = a custom gold "BD" clapperboard mark.

Both can be installed to a phone or desktop home screen and open full-screen like a real app, and both work even with a weak or dropped connection.

---

## What's in this package

```
index.html                      ← your studio site (now PWA-enabled)
admin.html                      ← your admin panel (now PWA-enabled)
manifest.webmanifest            ← studio app description
admin-manifest.webmanifest      ← admin app description
service-worker.js               ← studio offline/caching engine
admin-service-worker.js         ← admin offline/caching engine
icons/                          ← all app icons (studio + admin)
```

Everything that was already in your `index.html` and `admin.html` is untouched — I only **added** the PWA pieces. Your design, videos, and content all look and work exactly as before.

---

## How to put it live (the only step that matters)

A PWA only "becomes installable" when the files sit together on your real website over **https://** (not when opened from your computer). So:

1. Upload **all of these files and the `icons` folder** to the same place your current `index.html` and `admin.html` live — your web host / server root.
2. **Keep the folder structure** — the `icons` folder must stay a folder next to the HTML files. Don't rename anything.
3. Replace your old `index.html` and `admin.html` with these new versions.

That's it. Visit your site on a phone and within a few seconds an **"Install BiG-DreamzZ"** banner slides up from the bottom.

> **Important:** Your site must be served over **https** (the lock icon in the browser). Almost every host gives this free. If yours shows "Not secure," turn on SSL/HTTPS in your host settings first — the install feature won't appear without it.

---

## What your visitors will see

**On Android / Chrome / Edge (phone or desktop):**
A gold "Install" banner appears at the bottom. One tap → the app installs to their home screen with your icon. No app store needed.

**On iPhone / iPad (Safari):**
Apple doesn't allow an automatic install button, so the banner instead shows simple instructions: *tap Share → Add to Home Screen.* Same result — your icon on their home screen.

If someone dismisses the banner, it stays hidden for 7 days so it's never annoying.

---

## Updating your site later

Whenever you change `index.html` (or `admin.html`), open the matching service-worker file and bump the version number once:

- In `service-worker.js`: change `bigdreamzz-studio-v1` → `...-v2`
- In `admin-service-worker.js`: change `bigdreamzz-admin-v1` → `...-v2`

That one change tells every installed app to grab your fresh version automatically next time it opens. (If you forget, it still updates — this just makes it instant.)

---

## How to confirm it's working

1. Open your live site in Chrome on a computer.
2. Press F12 → **Application** tab → **Manifest**: you should see "BiG-DreamzZ AI Studio" with your icons.
3. Under **Service Workers** you should see one "activated and running."
4. The address bar will show a small **install icon** (a screen with a down-arrow). Click it to install on desktop too.

---

## A couple of honest notes

- The studio icon (512px) is a detailed photo, so it's about 230 KB — totally fine for an icon, loads once, then cached.
- Video playback is handled with "network-first" so your streams are never served stale from cache.
- The admin panel uses "network-first" too, so it always shows live data and only falls back to cache when offline.

If anything doesn't appear, it's almost always one of two things: the site isn't on https yet, or the `icons` folder didn't upload alongside the HTML files. Check those first.
