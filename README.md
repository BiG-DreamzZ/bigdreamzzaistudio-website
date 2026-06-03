# BiG-DreamzZ AI Studio — Faceless Creator Academy

## Project Overview
Landing page for the Faceless Creator Academy by BiG-DreamzZ AI Studio. A cinematic, dark-themed single-page website promoting an AI video creation course with employment pipeline.

## Live URLs
- **Academy Landing Page**: `academy.html`
- **Studio Portfolio (external)**: [https://big-dreamzz-ai-studio.netlify.app/](https://big-dreamzz-ai-studio.netlify.app/)

## Completed Features

### MEGA CTA — "See the Full Portfolio" Bar
The studio portfolio CTA bar has been completely redesigned from a subtle, easily-missed link into a **cinematic, attention-grabbing call-to-action** with the following animations and interactions:

1. **Breathing Glow Pulse** — The entire bar pulses with a gold glow that expands and contracts, drawing the eye
2. **Dual Shine Sweeps** — Two offset light streaks continuously sweep across the bar like a cinematic lens flare
3. **Animated Border Lines** — Top and bottom gold gradient lines with shifting animation
4. **Corner Accent Markers** — Four gold corner brackets that flash sequentially, creating a scanning/targeting effect
5. **Orbiting Dot System** — A pulsing gold dot with an orbiting ring and satellite particle
6. **Cascading Triple Arrows** — Three `›` arrows that cascade in sequence, creating directional motion
7. **Floating Gold Particles** — 12 randomized gold particles that float upward continuously inside the bar
8. **"VISIT STUDIO" Badge** — A gold badge positioned above the bar with its own pulse animation
9. **Magnetic 3D Tilt on Hover** — The bar tilts toward the cursor using perspective transforms on mousemove
10. **Gold Ripple on Click** — A radial gold ripple expands from the click point before navigation
11. **Subtle Breathing Scale** — The bar gently scales up and down (1 → 1.015) creating a "living" feel
12. **Hover Intensification** — All effects intensify on hover: brighter borders, stronger glow, faster arrows
13. **Italic Subtext** — "Explore the cinematic AI work brands are paying for" below the CTA
14. **Responsive Design** — Fully responsive with mobile-optimized sizing

### Existing Features (from original file)
- Scroll reveal animation system (multiple types: fade, scale, glow, type)
- Gold urgency marquee bars with countdown timer
- Module accordion system (6 modules)
- Portfolio reel loaded from Supabase
- Student review system with lightbox
- Employment pipeline section
- Sticky pricing bar
- Footer with social links
- Cohort countdown timer

## File Structure
```
academy.html    — Single-file landing page (HTML + CSS + JS)
README.md       — This file
```

## Technical Notes
- All CSS and JS are inline within `academy.html` (single-file architecture)
- CSS variables defined in `:root` — primary gold: `#EFB20C`
- 12+ custom `@keyframes` animations added for the CTA bar alone
- Particle system uses JavaScript DOM manipulation for randomized positions/timing
- 3D magnetic tilt uses `mousemove` event with `perspective()` transform
- Click ripple effect uses dynamically created elements with CSS transitions
- Zero console errors — clean execution verified

## Fonts Used
- **Cinzel** — Headings and logo
- **Orbitron** — UI labels, buttons, CTA text
- **Crimson Pro** — Body text and subtitles

## Recommended Next Steps
- A/B test the CTA bar conversion rate vs the original subtle version
- Consider adding analytics tracking on the CTA click event
- Could add a second instance of the CTA bar further down the page (after pricing section)
- Consider adding a scroll-triggered animation that makes the CTA bar "arrive" with extra fanfare
