# Oreneile Machitje Portfolio Website

Single-page portfolio for Motion Picture and VFX work built with HTML, CSS, and JavaScript and a full asset pack (SVG chrome text, film strip hero, polaroid collage, pastel section blocks).

## Sections (in order)

- Navigation: anchor links for every section, active link highlight, background changes on scroll.
- Hero (Home): entrance intro, liquid chrome name, film strip, and Explore button that scrolls to About.
- About Me: profile image and bio text blocks.
- Skills: scattered software icons followed by technical, creative, and professional lists.
- My Work: Burn Mouth polaroid stack and a poster grid collage.
- Showreel: local MP4 video player.
- Social Media Video Editing: horizontal gallery of short edits with on-demand playback.
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

## Add a social media video

Keep original exports on the external drive. The gallery serves the eight current exports through the site's existing Netlify CDN. The repository's Git LFS rule covers the MP4 files. Install Git LFS before committing additional MP4s and check that the deployment serves the actual files. Use a web-ready MP4 with its playback metadata at the beginning of the file so it can start as it downloads.

Save the MP4 under `assets/videos/social-media/` and a lightweight WebP still under `assets/images/social-videos/`. Add a card inside `#social-video-list` in `index.html`. The gallery displays a portrait crop. Set `data-video-size` to the video's actual dimensions so the player preserves its framing. Use `data-captions` to point to an English WebVTT file for speech and meaningful audio when that information isn't already captioned on screen.

```html
<li>
    <a class="social-video-card" href="assets/videos/social-media/edit.mp4" data-video-size="1080x1920">
        <span class="social-video-poster">
            <img src="assets/images/social-videos/edit.webp" width="360" height="640" alt="" loading="lazy" decoding="async">
            <span class="social-video-play" aria-hidden="true"></span>
        </span>
        <span class="social-video-caption">
            <span class="visually-hidden">Play </span>
            <span class="social-video-card-title">Edit title</span>
            <time datetime="PT30S">0:30</time>
        </span>
    </a>
</li>
```

The gallery loads posters while browsing. It opens a single player when a visitor selects a video and releases it when they close the player. For larger future uploads, set the card link to a hosted MP4 or to `https://player.mux.com/PLAYBACK_ID`. [Mux](https://www.mux.com/pricing) creates adaptive streams at different quality levels. Its free plan includes up to 10 stored videos and 100,000 delivery minutes per month.

## Verify the shared link

The favicon uses the portfolio's chrome initial. The share card uses the original filmstrip art and is saved at `assets/images/branding/share-card.jpg`. The canonical URL and share image in `index.html` use `https://oreneilemachitje.com/`. After deploying, check that the JPEG loads publicly and then paste the public page URL into the app where it will be shared.

## Search discovery

`robots.txt` points crawlers to `sitemap.xml`. The sitemap lists the canonical homepage. Section anchors are part of that page. Keep the profile facts in the homepage and structured data in sync.

## Customization Notes

- Hero name and section titles use individual SVG letters under assets/images/liquidchrometext.
- The work collage uses layered SVGs under assets/images/work.
- The contact email is set in the contact section and the mailto link.

## Browser Support

- Chrome, Firefox, Safari, Edge (current versions)

## Credits

Design based on Oreneile Machitje's original PDF portfolio, translated into HTML, CSS, and JavaScript.

**Last Updated**: January 2026
