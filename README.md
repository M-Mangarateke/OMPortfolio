# Oreneile Machitje Portfolio Website

Single-page portfolio for Motion Picture and VFX work built with HTML, CSS, and JavaScript and a full asset pack (SVG chrome text, film strip hero, polaroid collage, pastel section blocks).

## Sections (in order)

- Navigation: anchor links for every section, active link highlight, background changes on scroll.
- Hero (Home): liquid chrome name, film strip, and Explore button that scrolls to About.
- About Me: profile image and bio text blocks.
- Skills: scattered software icons followed by technical, creative, and professional lists.
- My Work: Burn Mouth polaroid stack and a poster grid collage.
- Showreel: local MP4 video player.
- Education: degree details and AFDA logo.
- Contact: Thank You heading and email link with copy-to-clipboard feedback.

## Features

- Smooth anchor scrolling and Explore jump behavior.
- Section fade-ins on scroll (IntersectionObserver).
- Active nav link state as you scroll.
- Responsive layout for desktop, tablet, and mobile.
- Email copy feedback while preserving mailto behavior.

## File Structure

```
OMPortfolioWeb/
  index.html
  styles.css
  script.js
  assets/
    images/
    videos/
  docs/
    motion/
      AGENT_PROMPT.md
      IMPLEMENTATION_PLAN.md
      LIBRARIES_STACK.md
      MOTION_SYSTEM.md
      MOTION_TOKENS.md
      QA_CHECKLIST.md
      SECTION_SPECS.md
  README.md
```

## Motion Specs Index

- docs/motion/LIBRARIES_STACK.md: required, avoided, and optional libraries plus accessibility/perf rules.
- docs/motion/MOTION_TOKENS.md: timing, easing, reveal, hover, parallax, and section-transition language.
- docs/motion/MOTION_SYSTEM.md: end-to-end motion architecture and behavior requirements.
- docs/motion/SECTION_SPECS.md: per-section entry moments and interactions.
- docs/motion/IMPLEMENTATION_PLAN.md: phased delivery plan with exit criteria.
- docs/motion/QA_CHECKLIST.md: functional, visual, performance, and accessibility checks.
- docs/motion/AGENT_PROMPT.md: agent constraints and phase order.

## Quick Verification Checklist

- Open index.html and confirm every nav link scrolls to the correct section.
- Click the Explore button and confirm it scrolls to About.
- Scroll down once and confirm each section fades in only once.
- Verify the Showreel video plays from assets/videos/showreel/Showreel.mp4.
- Click the email link and confirm mailto opens and a copy-to-clipboard toast appears.
- Resize to mobile width and confirm no horizontal overflow or clipped content.

## How to Use

1. Open index.html in any modern browser (no build step).
2. Edit text and content directly in index.html.
3. Replace images in assets/images and keep filenames or update paths.
4. Replace the showreel file at assets/videos/showreel/Showreel.mp4 (or swap to an embed in index.html).
5. Update colors, layout, and typography in styles.css.

## Customization Notes

- Hero name and section titles use individual SVG letters under assets/images/liquidchrometext.
- The work collage uses layered SVGs under assets/images/work.
- The contact email is set in the contact section and the mailto link.

## Browser Support

- Chrome, Firefox, Safari, Edge (current versions)

## Credits

Design based on Oreneile Machitje's original PDF portfolio, translated into HTML, CSS, and JavaScript.

**Last Updated**: January 2026
