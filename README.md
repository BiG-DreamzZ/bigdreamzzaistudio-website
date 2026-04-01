# BiG-DreamzZ AI Studio — Portfolio Website

> **"We Don't Just Create. We Pour Soul."**

A cinematic portfolio website for BiG-DreamzZ AI Studio — designed to feel like walking into a real film production studio. Built as a single-page application with multiple sections accessible via bottom navigation.

## 🎬 Live URL
- **Production**: Deploy via the Publish tab
- **Admin Panel**: `/admin.html`

## 📁 Project Structure
```
index.html              — Main website (single-file: HTML + CSS + JS, ~400KB)
admin.html              — Director's Panel / Admin dashboard (~73KB)
AI-conversation-log.md  — Continuity document for AI sessions
README.md               — This documentation
```

## 🗄️ Data Tables (RESTful Table API)

### contact_submissions
Stores contact form inquiries from the website.
| Field | Type | Description |
|-------|------|-------------|
| id | text | Unique record ID |
| name | text | Contact person's name |
| whatsapp | text | WhatsApp number |
| industry | text | Their industry |
| service | text | Service needed |
| message | text | Their message |
| read | bool | Whether the message has been read |
| status | text | Status: new, read, replied, archived |

### community_applications
Stores community/creator applications.
| Field | Type | Description |
|-------|------|-------------|
| id | text | Unique record ID |
| name | text | Applicant name |
| whatsapp | text | WhatsApp number |
| skill | text | Primary skill |
| sample_work | text | Link to sample work |
| message | text | About themselves |
| status | text | pending, approved, rejected |

### portfolio
Stores portfolio projects managed via admin.
| Field | Type | Description |
|-------|------|-------------|
| id | text | Unique record ID |
| title | text | Project title |
| client | text | Client name |
| category | text | brand, story, social, product |
| description | text | Project description |
| video_url | text | Video URL |
| thumbnail_url | text | Thumbnail image URL |
| published | bool | Whether visible on site |
| featured | bool | Whether featured/highlighted |
| sort_order | number | Display order |

### testimonials
Stores client testimonials.
| Field | Type | Description |
|-------|------|-------------|
| id | text | Unique record ID |
| name | text | Client name |
| role | text | Client role/title |
| quote | text | Testimonial quote |
| rating | number | Rating out of 5 |
| published | bool | Whether visible on site |
| avatar_url | text | Client avatar image URL |

## ✅ Completed Features

### Main Website (index.html)

#### Studio (Home) Page
- Full-screen cinematic hero with animated text and smoke canvas effect
- Floating gold particles
- "See Our Work" and "Start a Project" CTAs
- Gold marquee strip with rotating marketing messages
- Animated stats bar (60+ Clients, 120+ Videos, 100% AI, 12+ Industries)
- Portfolio feed grid with project cards (gradient-styled)
- "Now Showing" hero section with featured project
- Quick navigation cards to other sections
- Transparent watermark

#### Work Page
- Film strip category selector (All, Brand, Story, Social, Product)
- Work stats strip with animated counters
- Split portfolio grid (top and bottom halves)
- Expandable "See How We Work" workflow accordion (5 steps + bonuses)
- Behind the Scenes tool strip
- End CTA panel
- Video modal (portrait-style) for project previews

#### About Page
- Cinematic parallax hero with pan animation
- Origin story with gold-bordered quotes
- Creative DNA accordion (expandable beliefs)
- Animated stats grid
- "Not For Everyone" statement section
- Founder profile section
- Services showcase
- Social proof and closing statement
- Ambient particle canvas

#### Contact (Start a Project) Page
- "See How We Work" expandable workflow
- Urgency production calendar with animated progress bar
- Multi-field contact form — **CONNECTED TO TABLE API** ✅
- Social media links (WhatsApp, Instagram, TikTok, Telegram, Email)
- "What Happens After You Hit Send" checklist
- "How We Work" 3-step summary
- Dynamic testimonial section — **CONNECTED TO TABLE API** ✅
- Particle effects and spotlight background

#### Community Page
- Letter-by-letter animated title
- Manifesto line, Exclusivity badge
- Animated community counter (4 stats)
- "What You'll Create" scrolling marquee
- Three cinematic path cards (Brands, Creators, Learners)
- Cinematic video frame placeholder
- Course accordion card & eBook accordion card
- Creator roles ecosystem (10 animated tags)
- Creator journey timeline (4 steps)
- Creator spotlights (3 cards), Enhanced perks section (5 perks)
- Application form — **CONNECTED TO TABLE API** ✅

#### Site-Wide Features
- Cinematic loading screen (2-second intro)
- "Currently in Production" ticker
- Enhanced floating WhatsApp button
- Custom gold cursor (desktop only)
- Film grain overlay
- Responsive bottom navigation (5 tabs)
- Top navigation bar with logo and CTA
- Open Graph / social sharing meta tags
- Google Fonts (Cinzel, Crimson Pro, Orbitron)

### Dynamic Data Connection ✅ (NEW)
- **Portfolio data**: Loaded dynamically from Table API at startup. Falls back to hardcoded data if API unavailable. Projects added/edited in admin automatically appear on the main site.
- **Testimonials**: Loaded dynamically from Table API. Displayed on the Contact page.
- **Visual system**: Projects from the API automatically receive cinematic gradient backgrounds, glow effects, and positioning — no manual styling needed.

### Admin Panel (admin.html) ✅
- **Login**: Client-side authentication (credentials configured)
- **Dashboard**: 4 stat cards with animated counters + badge counts for unread items
- **Portfolio Manager**: Full CRUD — add/edit/delete projects with title, client, category, description, video URL, thumbnail URL, published toggle
- **Testimonials Manager**: Full CRUD — add/edit/delete testimonials with name, role, quote, rating, published toggle
- **Contact Submissions Viewer**: Card-based inbox with mark as read, WhatsApp reply, delete
- **Community Applications Viewer**: Card-based view with approve/reject/WhatsApp actions
- **Media Upload**: Cloudinary integration (drag & drop upload, URL copy)
- All connected to the Table API

## 🎯 Functional Entry URIs
- `/` or `/index.html` — Main website (loads Studio/Home by default)
- `/admin.html` — Director's Panel (admin dashboard)
- Navigation via bottom bar: Studio | Work | Center Logo (Contact) | About | Community

## 🔧 Technologies Used
- **HTML5** — Semantic single-file architecture
- **CSS3** — Custom properties, animations, gradients, clip-paths, backdrop filters
- **Vanilla JavaScript** — No frameworks, all DOM manipulation
- **Google Fonts** — Cinzel, Crimson Pro, Orbitron
- **Font Awesome 6.5** — Icons (admin panel)
- **RESTful Table API** — Built-in database for all data persistence
- **Cloudinary** — Media upload CDN (admin panel)
- **IntersectionObserver API** — Scroll-triggered animations

## ❌ Features Not Yet Implemented

### Secondary Gaps
1. **No Real Videos in Portfolio** — All project cards use gradient backgrounds as placeholders. No actual video files uploaded yet.
2. **Course & eBook CTAs Lead Nowhere** — "Secure Your Seat" and "Get The Blueprint" buttons have no landing pages or payment integration.
3. **No Analytics/Tracking** — No Google Analytics or visitor tracking.
4. **No Email Notifications** — Form submissions only visible in admin panel, no email alerts.
5. **No SEO Structured Data** — Missing JSON-LD schema markup.
6. **Cloudinary Upload Preset** — The preset `bigdreamzz_uploads` needs to be configured as an unsigned preset in Cloudinary dashboard.

## 📋 Recommended Next Steps
1. **Upload Real Videos** — Use admin panel to add real video URLs (YouTube or Cloudinary) to portfolio projects
2. **Set Up Cloudinary Unsigned Preset** — Configure `bigdreamzz_uploads` in Cloudinary settings
3. **Add Google Analytics** — Add GA4 tracking script to index.html
4. **Create Course Landing Page** — Separate page with full curriculum, pricing, payment gateway (Paystack/Flutterwave)
5. **Create eBook Landing Page** — Dedicated page with book details, payment integration
6. **Add Email Notifications** — Set up email alerts for new form submissions (could use a webhook or email service)
7. **SEO Enhancements** — Add JSON-LD structured data markup
8. **Performance Audit** — Consider lazy loading and code optimization

---

*Last Updated: 2026-04-01*
*Session Count: 2*
