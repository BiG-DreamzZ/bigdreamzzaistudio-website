# BiG-DreamzZ AI Studio Website

## Project Overview
A cinematic AI production studio website for BiG-DreamzZ AI Studio — featuring brand films, story-driven campaigns, and viral content, all 100% AI-produced.

## Live URL
- **Main Site**: https://big-dreamzz-ai-studio.netlify.app
- **Academy Landing Page**: https://big-dreamzz-ai-studio.netlify.app/academy.html

## Entry Points
- `index.html` — Main website with all sections (Studio, Work, About, Community)

## Recent Changes

### Community Section — CTA Links Updated
The following three call-to-action buttons in the **Community section** have been updated to link directly to the Academy landing page (`https://big-dreamzz-ai-studio.netlify.app/academy.html`):

| Button | CSS Class | Line | Status |
|--------|-----------|------|--------|
| **JOIN THE ACADEMY ➤** | `.comm-course-cta` | 3494 | ✅ Updated |
| **GET THE BLUEPRINT ➤** | `.comm-ebook-cta` | 3525 | ✅ Updated |
| **APPLY TO JOIN ➤** | `.comm-getpaid-cta` | 3543 | ✅ Updated |

**What changed:**
- `href="#"` → `href="https://big-dreamzz-ai-studio.netlify.app/academy.html"`
- Removed `onclick="return false;"` handlers that were preventing navigation
- Added `target="_blank"` so the link opens in a new tab
- Added `rel="noopener noreferrer"` for security best practices

## Features
- Cinematic dark-themed design with gold/red accents
- Multiple sections: Studio, Work, About, Community
- Community section includes: Academy course, eBook blueprint, Get Paid to Create (employment)
- Creator Spotlights carousel
- Responsive mobile-first design
- Scroll animations and reveal effects

## Recommended Next Steps
- Consider adding analytics tracking to the CTA buttons to measure click-through rates
- Update any other internal links if additional landing pages are created
