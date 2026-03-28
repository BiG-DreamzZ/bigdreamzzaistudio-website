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
4. **Contact** ⭐ (MAJOR UPDATE) — Full cinematic contact experience with urgency, social proof, and conversion-optimized layout
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

### 🆕 Contact Section — Cinematic Redesign (Latest Update)

**Conversion-Optimized Layout:**
- New headline: "You Didn't Come Here by Accident." with gold shimmer animation
- Section label: "Your Next Chapter Starts Here"
- Emotional subtext that validates the visitor's decision

**Urgency — Production Calendar:**
- Dark card with animated gold progress bar (fills from 0% to 73% on scroll)
- Animated counter: "11 / 15 Slots Filled"
- Red urgency text: "⚡ 4 remaining"
- Green pulsing dot indicates active status
- Progress bar glows and pulses at the fill point
- Counter animates digit-by-digit when section enters viewport

**Contact Form (Immediately Visible):**
- 5 fields: Name, WhatsApp, Industry dropdown, Service dropdown, Brand description
- Industry dropdown (Fashion, Health, Finance, Real Estate, Food, Tech, Beauty, Education, Entertainment, Other)
- Service dropdown (kept from original)
- Button text: "Send My Story →" (brand-aligned language)
- Success state: "Story Received! ✔" in green

**Social Icons — Real Brand Colours:**
- WhatsApp (green #25D366), Instagram (pink #E1306C), TikTok (white/teal), Telegram (blue #0088CC), Email (gold)
- Real SVG icons (not emojis) — professional appearance
- Each icon has brand-coloured hover glow + lift animation
- Circular design with colored borders matching platform

**Trust & Social Proof:**
- "Trusted by MOADOP Herbal · Zavina Herbal · 60+ brands in 12+ industries" strip
- Response guarantee: "🟢 Online Now · Worldwide · Response Within 24hrs"
- Green pulsing dot animation on the guarantee

**"What Happens Next" Section:**
- 4-step checklist with gold checkmarks
- Each item fades/slides in with staggered delay (rv d1 d2 d3 d4)
- Steps: instant receipt → human review → WhatsApp response → production begins

**"How We Work" — 3-Step Process:**
- Numbered steps (01, 02, 03) in gold Orbitron font
- Gold left-border accent with hover effects
- Steps: Tell Story → Build Vision → World Takes Notice
- Each step reveals with scroll animation

**One Powerful Testimonial:**
- MOADOP HERBAL — 20-Video Production Contract
- Cinematic quote treatment with gold quotation mark
- Star rating, italic text, client name and role
- Dark gradient background with gold top border

**Closing Line:**
- "Every brand that has worked with us has asked one question after: 'Why didn't I start sooner?'"
- Gold italic text, centered

**Cinematic Atmosphere:**
- Floating gold particle canvas (30 particles, canvas-based)
- Gold spotlight radial gradient with pulsing animation at top of section
- Particles start/stop when navigating to/from the contact page
- All elements use the rv (reveal) scroll animation system

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
8. **Contact form backend** — Connect the contact form to a service (Formspree, Google Sheets, or a backend) for actual message delivery
9. **Cloudinary integration** — Set up Cloudinary for video hosting and delivery
10. **Dynamic slot counter** — Connect the urgency counter to a real backend to track actual monthly slots
