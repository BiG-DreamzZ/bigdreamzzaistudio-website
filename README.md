# BiG-DreamzZ AI Studio — Portfolio Website

> **"We Don't Just Create. We Pour Soul."**

A cinematic portfolio website for BiG-DreamzZ AI Studio — designed to feel like walking into a real film production studio. Built as a single-page application with multiple sections accessible via bottom navigation.

## 🎬 Live URL
- **Production**: https://bigdreamzzaistudio.netlify.app

## 📁 Project Structure
```
index.html    — Single-file application (HTML + CSS + JS)
README.md     — This documentation
```

## ✅ Completed Features

### Pages / Sections
1. **Home** — Hero with cinematic animations, smoke canvas, floating particles, cycling marketing statements, social proof results strip, quick-navigate cards
2. **Work** ⭐ (MAJOR UPDATE) — Full cinematic portfolio experience
3. **About** — Brand story, stats, services list, client testimonials
4. **Contact** — Contact details, WhatsApp integration, contact form
5. **Join Us** — Team recruitment page with application form

### Work Section — Cinematic Portfolio
- Category filters with animated transitions
- Grid cards with unique color themes per project
- "Now Showing" featured hero with random project rotation
- Portrait modal detail view (see below)

### 🆕 Project Detail View — CINEMATIC FULLSCREEN (Latest Update)

**Fullscreen Immersive Experience:**
- Modal now covers the **entire screen** — no more boring black space
- Animated gradient backgrounds with pulsing glow effect
- Dual glow orbs per project for depth and atmosphere
- Floating particle system (canvas-based, 40 particles) using project accent color
- Animated light streaks rising through the scene
- Film grain overlay for cinematic texture
- Project counter indicator (e.g., "01 / 09") in top-right
- View count per project (persisted in localStorage)
- "100% AI-Produced" badge in views row

**Working Like System:**
- ❤️ Like button with localStorage persistence
- Heart explosion particle animation on like (8 particles: ❤️💛🧡💖✨)
- Double-tap to like (Instagram-style) with big heart overlay animation
- Like count persistence per project
- Visual feedback: scale animation, red glow on liked state

**Working Share System (8 Platforms):**
- **WhatsApp** — Opens WhatsApp share with project-specific message + deep link
- **Facebook** — Opens Facebook share dialog with project URL
- **X / Twitter** — Opens tweet composer with project text + URL
- **Telegram** — Opens Telegram share with project URL
- **LinkedIn** — Opens LinkedIn share with project URL
- **Instagram** — Copies link to clipboard, then opens Instagram
- **Email** — Opens email compose with subject + body pre-filled
- **Copy Link** — Copies full share text + URL to clipboard
- **Native Share** (mobile) — Uses device's native share API when available
- Share sheet shows project preview card (name + color + URL)
- All shares include **project-specific deep link** (e.g., `?project=3`)

**Deep Linking:**
- URLs like `https://bigdreamzzaistudio.netlify.app?project=5` open that specific project
- Shared links take visitors directly to the work section and open that exact project
- Share text includes project name, description, and studio branding

**Navigation & Gestures:**
- Swipe up/down on mobile to navigate between projects
- Arrow keys (↑↓←→) for keyboard navigation
- L key to like, S key to open share
- Escape key to close
- Cinematic slide transitions between projects
- First-visit swipe hint animation

**Comment System:**
- Comment button opens WhatsApp with project-specific pre-filled message

### Open Graph Meta Tags
- `og:title`, `og:description`, `og:image`, `og:url`, `og:site_name`
- `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`
- Rich previews when links are shared on social media

### Other Features
- Custom cursor with ring follower
- Film grain overlay
- Smooth page transitions
- Bottom navigation bar
- Floating WhatsApp button
- Back-to-top button
- Auto-scrolling results strip
- Responsive design

## 🔗 Functional Entry URIs

| Path | Description |
|------|-------------|
| `/` | Home page (default) |
| `/?project=1` | Deep link to "The Okada Rider" |
| `/?project=2` | Deep link to "MOADOP 20-Video Campaign" |
| `/?project=3` | Deep link to "I Gave My Boyfriend 4 Million" |
| `/?project=4` | Deep link to "Trading Psychology Confessions" |
| `/?project=5` | Deep link to "Zavina Capsules Campaign" |
| `/?project=6` | Deep link to "Herbal Tea Visual Story" |
| `/?project=7` | Deep link to "Financial Confession Series" |
| `/?project=8` | Deep link to "Brand Story Production" |
| `/?project=9` | Deep link to "Product Launch Film" |

## 📊 Data Storage
- **Likes**: `localStorage` key `bdz_likes` — JSON object mapping project ID → boolean
- **Views**: `localStorage` key `bdz_views` — JSON object mapping project ID → increment count
- **Swipe hint**: `localStorage` key `bdz_swipe_seen` — shown only on first visit

## 🚀 Recommended Next Steps
1. **Add real video content** — Replace gradient backgrounds with actual video thumbnails/previews (mp4/yt fields in PROJECTS array)
2. **Create OG image** — Design and upload `og-image.png` for social sharing previews
3. **Server-side like counts** — Move likes to a backend/database for global counts visible to all visitors
4. **Analytics** — Add view tracking via Google Analytics or similar
5. **Video player** — Implement actual video playback when play button is clicked
6. **Comment system** — Add a proper comment section (or keep WhatsApp integration)
7. **SEO** — Add structured data (JSON-LD) for video/creative work schema
