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

### Work Section — Cinematic Studio Experience (NEW)
The Work page has been completely redesigned to feel like a cinematic studio app:

| Feature | Description |
|---------|-------------|
| **🎬 NOW SHOWING Hero** | Full-width cinematic hero banner with letterbox bars, pulsing "NOW SHOWING" badge, featured project spotlight, gradient background with glow orb, scanline overlay |
| **📊 Stats Strip** | Animated number counters (9 Films · 4 Categories · 120+ Videos · 0 Cameras) that tick up on scroll |
| **🎞️ Film Strip Selector** | Film-frame styled category selector replacing flat buttons — each frame has sprocket holes, icons, labels, and project counts. Scrollable horizontally. |
| **🏆 Award Badges** | Gold-bordered badges on standout cards: "Director's Pick", "Client Favorite", "Most Viral" |
| **⏱️ Duration Tags** | Video duration shown on each card corner (e.g., "2:15") |
| **📋 Expandable Workflow** | "See How We Work" collapsible section embedded between grid halves — 5-step numbered pipeline with icons + a "What's Included" bonus section showing free deliverables (script, thumbnail, flyers, short clips) |
| **🔧 BTS Teaser Strip** | Auto-scrolling horizontal strip showing tools & process (Sora, Runway, ElevenLabs, Midjourney, etc.) with infinite loop animation |
| **🎭 Enhanced Portrait Modal** | Duration tag, AI tools used, "Start a Similar Project" CTA, Next/Prev project navigation buttons |
| **🎬 End CTA Panel** | "The Next Story Could Be Yours" closing scene with gold glow, cinematic typography, WhatsApp + contact buttons |

### Global Features
- Custom cursor (dot + ring) with hover effects
- Film grain overlay on entire site
- Floating gold particles
- Smoke canvas animation on hero
- Bottom navigation with animated center button
- TikTok-style portrait modal with Like/Comment/Share
- Share sheet (WhatsApp, TikTok, Instagram, Copy Link)
- Scroll reveal animations
- Responsive design (mobile-first)
- Back to top button
- WhatsApp floating button

## 🔗 Entry URIs (Single Page App)
All pages are accessed via JavaScript `showPage()` function:
- `showPage('home')` — Home page (default)
- `showPage('work')` — Work / Portfolio
- `showPage('about')` — About Us
- `showPage('contact')` — Contact
- `showPage('join')` — Join the Team

## 📦 Data Model
Projects are stored as a JavaScript array with the following structure:
```javascript
{
  id: Number,
  cat: String ("story"|"brand"|"social"|"product"),
  name: String,
  client: String,
  desc: String,
  yt: String (YouTube embed ID),
  mp4: String (direct video URL),
  clr: String (CSS gradient),
  glow: String (hex color for glow effect),
  gpos: String (CSS position for glow),
  duration: String (e.g. "2:15"),
  tools: Array of Strings (e.g. ["Sora","Runway"]),
  badge: String ("director"|"favorite"|"viral"|""),
  badge_txt: String (display text for badge)
}
```

## 🚧 Features Not Yet Implemented
- Real video content (currently using gradient placeholders)
- Real thumbnail images for project cards
- Video hover previews on desktop
- Backend form submission (forms show success message client-side only)
- Analytics / tracking integration
- SEO meta tags and Open Graph tags
- Real about page hero image

## 🔮 Recommended Next Steps
1. **Add real video content** — Upload videos and add YouTube IDs or MP4 URLs to PROJECTS array
2. **Add project thumbnail images** — Replace gradient backgrounds with real screenshots
3. **Connect contact form** — Integrate with a service like Formspree or EmailJS
4. **Add more projects** — Expand the PROJECTS array as new work is completed
5. **SEO optimization** — Add meta description, Open Graph tags, structured data
6. **Performance** — Consider splitting CSS/JS into separate files if the page grows further

## 🛠️ Technologies
- HTML5, CSS3, Vanilla JavaScript
- Google Fonts (Cinzel, Crimson Pro, Orbitron)
- No external frameworks — fully custom-built
- Deployed on Netlify (via GitHub)
