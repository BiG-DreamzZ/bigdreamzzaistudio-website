# BiG-DreamzZ AI Studio — Website

## Project Overview
A cinematic, dark-themed website for **BiG-DreamzZ AI Studio** — a 100% AI-powered video production studio creating soul-stirring brand films, story-driven campaigns, and viral content worldwide.

**Live URL:** https://big-dreamzz-ai-studio.netlify.app

## Pages & Navigation
The site uses a single-page architecture (`index.html`) with 4 main pages navigated via a bottom nav bar:

| Page | Section ID | Description |
|------|-----------|-------------|
| **Studio (Home)** | `#page-home` | Hero section, video feed grid, stats, why section, process, reviews, final CTA |
| **Work** | `#page-work` | Now Showing hero, category film strip, full video portfolio grid, workflow section, BTS strip |
| **About** | `#page-about` | Origin story, creative DNA, stats, services, testimonials, founder section |
| **Community** | `#page-join` | Course showcase, ebook, get-paid section, creator spotlights, journey steps, perks, application form |
| **Contact** | `#page-contact` | Urgency banner, contact form, process steps, testimonial, social links |

## Entry URI
- `/index.html` — Main and only entry point (single-page app)

## Currently Completed Features
- ✅ Cinematic loading screen with branded animation
- ✅ Production ticker bar (scrolling status updates)
- ✅ Custom cursor with hover effects (desktop only)
- ✅ Full hero section with smoke canvas, particles, parallax
- ✅ Animated stats counters
- ✅ Video portfolio grid with category filtering
- ✅ Portrait & Landscape video modals with full playback controls
- ✅ Like, share, comment functionality in modals
- ✅ Share sheet (WhatsApp, Facebook, Twitter, Telegram, etc.)
- ✅ Review screenshot lightbox with swipe navigation
- ✅ Contact form with urgency/scarcity elements
- ✅ Community page with course, ebook, get-paid sections
- ✅ WhatsApp floating button
- ✅ Back-to-top button
- ✅ Scroll reveal animations throughout
- ✅ Gold marquee banner
- ✅ **FULL RESPONSIVE DESIGN** — Optimized for all screen sizes:
  - Mobile phones (default)
  - Tablets / iPad Portrait (768px+)
  - Desktop / iPad Landscape (1024px+)
  - Large Desktop (1280px+)
  - Extra Large (1440px+)
  - Ultrawide (1920px+)

## Responsive Breakpoints (Added May 2026)
| Breakpoint | Target |
|-----------|--------|
| Default (0–767px) | Mobile phones |
| `768px` | Tablets, iPad portrait |
| `1024px` | Desktop, iPad landscape |
| `1280px` | Large desktop |
| `1440px` | Extra large desktop |
| `1920px` | Ultrawide monitors |

### What the Desktop Responsive Update Covers:
- Hero section properly scaled and centered
- Navigation bars properly spaced for large screens
- Video feed grid: 3 columns (tablet) → 4 columns (desktop) → 5 columns (ultrawide)
- Work portfolio grid: 3 → 4 → 5 columns with proper spacing
- All text properly sized with `clamp()` for fluid scaling
- Content sections constrained to readable max-widths with auto-centering
- Quick navigation cards in 2-column grid on desktop
- Process steps in 2-column grid on desktop
- Services in 2-column (desktop) / 3-column (ultrawide) grid
- Community paths in responsive grid layout
- Portrait modal centered on desktop (phone-width card)
- Bottom nav bar styled as floating pill on desktop
- All padding and spacing scales proportionally
- Share sheet, lightbox, modals all desktop-optimized

## Tech Stack
- Pure HTML5 / CSS3 / Vanilla JavaScript
- Google Fonts: Cinzel, Crimson Pro, Orbitron
- HLS.js for video streaming
- No build tools or frameworks — single file deployment

## Recommended Next Steps
1. Add Open Graph image (`og-image.png`) for social sharing
2. Consider extracting CSS into separate stylesheet for maintainability
3. Add lazy loading for video thumbnails for performance
4. Consider adding a desktop top navigation bar alternative to bottom nav
5. Add SEO-optimized content and structured data markup
