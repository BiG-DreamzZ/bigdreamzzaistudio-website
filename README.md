# BiG-DreamzZ AI Studio — Portfolio Website

> **"We Don't Just Create. We Pour Soul."**

A cinematic portfolio website for BiG-DreamzZ AI Studio — designed to feel like walking into a real film production studio. Built as a single-page application with multiple sections accessible via bottom navigation.

## 🎬 Live URL
- **Production**: Deploy via the Publish tab

## 📁 Project Structure
```
index.html              — Main website (single-file: HTML + CSS + JS, ~400KB)
admin.html              — Director's Panel / Admin dashboard
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
| read | bool | Read by admin? |
| submitted_at | datetime | Submission timestamp |

### community_applications
Stores creator community applications.
| Field | Type | Description |
|-------|------|-------------|
| id | text | Unique record ID |
| name | text | Applicant name |
| whatsapp | text | WhatsApp number |
| skill | text | Primary skill |
| sample_work | text | Link to work samples |
| message | text | About themselves |
| status | text | pending/approved/rejected |
| submitted_at | datetime | Submission timestamp |

### portfolio
Stores portfolio projects managed from admin.
| Field | Type | Description |
|-------|------|-------------|
| id | text | Unique record ID |
| title | text | Project title |
| client_name | text | Client name |
| category | text | Project category |
| description | text | Project description |
| video_url | text | Video file URL |
| thumbnail_url | text | Thumbnail URL |
| published | bool | Live on site? |
| duration | text | Video duration |
| tools | text | Tools used |
| badge | text | Badge type |
| badge_text | text | Badge display text |
| gradient_colors | text | Card background |
| glow_color | text | Card glow color |

### testimonials
Stores client testimonials managed from admin.
| Field | Type | Description |
|-------|------|-------------|
| id | text | Unique record ID |
| name | text | Client name |
| role | text | Client role/title |
| quote | text | Testimonial text |
| avatar_url | text | Client photo URL |
| rating | number | 1-5 stars |
| published | bool | Live on site? |

## ✅ Completed Features

### Main Website (index.html)
- **5-page SPA**: Studio (Home), Work, About, Contact, Community
- **Cinematic design**: Gold/black/red theme, film grain, custom cursor, particles
- **Working Contact Form**: Submits to `contact_submissions` table via API
- **Working Community Application Form**: Submits to `community_applications` table via API
- **Toast notifications** for form submissions (success/error)
- All visual effects, animations, and responsive design

### Admin Panel (admin.html)
- **Login system**: Simple client-side auth (email: admin@bigdreamzz.com)
- **Dashboard**: Stats overview with animated counters
- **Portfolio Manager**: Add, edit, delete projects
- **Testimonials Manager**: Add, edit, delete testimonials
- **Inbox**: View contact submissions, mark read, WhatsApp reply
- **Community Applications**: View, approve, reject, WhatsApp message
- **Media Upload**: Cloudinary integration for files
- **All data operations** use the RESTful Table API

## 🎯 Functional Entry URIs
- `/index.html` — Main website (Studio/Home default)
- `/admin.html` — Admin panel (requires login)
- Navigation via bottom bar: Studio | Work | About | Community
- Center button → Contact/Start a Project

## ⚠️ Admin Login Credentials
- **Email:** admin@bigdreamzz.com
- **Password:** BigDreamzZ2026!

## 📋 Remaining Next Steps
1. **Add real video content** to portfolio (upload via admin, replace gradient placeholders)
2. **Connect portfolio display** on main site to pull from database (currently hardcoded)
3. **Connect testimonials display** on main site to pull from database (currently hardcoded)
4. **Set up Cloudinary** unsigned upload preset `bigdreamzz_uploads`
5. **Add Google Analytics** tracking code
6. **Create Course landing page** with payment integration
7. **Create eBook landing page** with payment integration
8. **Add email notifications** for new form submissions
9. **Replace placeholder content** (creator spotlights, marquee thumbnails)
10. **SEO** — Add structured data markup

## 🔧 Technologies Used
- HTML5, CSS3, Vanilla JavaScript
- Google Fonts (Cinzel, Crimson Pro, Orbitron)
- Font Awesome 6.5.1
- RESTful Table API (data persistence)
- Cloudinary (media hosting)
