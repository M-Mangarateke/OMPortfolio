/**
 * GSAP Animations - Phase 1
 * Reveal-on-scroll animations for headings, text blocks, and grids
 */

// Wait for DOM and motionConfig to be ready
document.addEventListener('DOMContentLoaded', () => {
  initRevealAnimations();
});

/**
 * Initialize all reveal animations
 */
function initRevealAnimations() {
  // Reveal headings (liquid chrome SVG text)
  revealHeadings();

  // Reveal text blocks
  revealTextBlocks();

  // Reveal grids and grid items
  revealGrids();

  // Reveal general elements
  revealElements();

  console.log('%c✨ Phase 1 Reveal Animations Initialized', 'color: #88ce02; font-weight: bold;');
}

/**
 * Reveal headings with stagger on individual letters/SVGs
 * NOTE: Hero, About, Skills, Work, Showreel, Education, and Contact headings
 * are now handled by text-animations.js with advanced split text effects
 */
function revealHeadings() {
  const headings = document.querySelectorAll('[data-reveal-heading]');

  headings.forEach((heading) => {
    // Skip elements inside intro overlay
    if (heading.closest('#intro-overlay')) return;

    // Skip headings that are handled by text-animations.js
    const skipClasses = [
      '.hero-name',
      '.about-title',
      '.skills-title',
      '.work-title-line1',
      '.work-title-line2',
      '.showreel-title',
      '.education-title',
      '.contact-title-line1',
      '.contact-title-line2'
    ];

    const shouldSkip = skipClasses.some(selector => {
      return heading.matches(selector) || heading.closest(selector);
    });

    if (shouldSkip) return;

    const letters = heading.querySelectorAll('img');

    if (letters.length > 0) {
      // Animate individual letter SVGs with stagger
      gsap.from(letters, {
        y: motionConfig.transforms.yOffset,
        opacity: 0,
        duration: motionConfig.durations.normal,
        ease: motionConfig.easings.reveal,
        stagger: motionConfig.stagger.tight,
        scrollTrigger: {
          trigger: heading,
          start: motionConfig.scrollTrigger.start,
          toggleActions: motionConfig.scrollTrigger.toggleActions
        }
      });
    } else {
      // Fallback: animate the whole heading if no letter images found
      gsap.from(heading, {
        y: motionConfig.transforms.yOffset,
        opacity: 0,
        duration: motionConfig.durations.normal,
        ease: motionConfig.easings.reveal,
        scrollTrigger: {
          trigger: heading,
          start: motionConfig.scrollTrigger.start,
          toggleActions: motionConfig.scrollTrigger.toggleActions
        }
      });
    }
  });
}

/**
 * Reveal text blocks with stagger on paragraphs/list items
 * NOTE: About paragraphs are handled by text-animations.js with scramble text effects
 */
function revealTextBlocks() {
  const textBlocks = document.querySelectorAll('[data-reveal-text]');

  textBlocks.forEach((block) => {
    // Skip elements inside intro overlay
    if (block.closest('#intro-overlay')) return;

    // Skip about text (handled by scramble text)
    if (block.classList.contains('about-text')) {
      return;
    }

    // Find all paragraphs and list items
    const elements = block.querySelectorAll('p, li, h3');

    if (elements.length > 0) {
      // Animate with stagger
      gsap.from(elements, {
        y: motionConfig.transforms.yOffset * 0.5, // Less movement for text
        opacity: 0,
        duration: motionConfig.durations.normal,
        ease: motionConfig.easings.reveal,
        stagger: motionConfig.stagger.tight,
        scrollTrigger: {
          trigger: block,
          start: motionConfig.scrollTrigger.start,
          toggleActions: motionConfig.scrollTrigger.toggleActions
        }
      });
    } else {
      // Fallback: animate the whole block
      gsap.from(block, {
        y: motionConfig.transforms.yOffset * 0.5,
        opacity: 0,
        duration: motionConfig.durations.normal,
        ease: motionConfig.easings.reveal,
        scrollTrigger: {
          trigger: block,
          start: motionConfig.scrollTrigger.start,
          toggleActions: motionConfig.scrollTrigger.toggleActions
        }
      });
    }
  });
}

/**
 * Reveal grids with stagger on grid items
 */
function revealGrids() {
  const grids = document.querySelectorAll('[data-reveal-grid]');

  grids.forEach((grid) => {
    // Skip elements inside intro overlay
    if (grid.closest('#intro-overlay')) return;

    const items = grid.children;

    if (items.length > 0) {
      // Animate grid items with stagger
      gsap.from(items, {
        y: motionConfig.transforms.yOffset,
        opacity: 0,
        scale: motionConfig.transforms.scaleFrom,
        duration: motionConfig.durations.normal,
        ease: motionConfig.easings.reveal,
        stagger: motionConfig.stagger.normal,
        scrollTrigger: {
          trigger: grid,
          start: motionConfig.scrollTrigger.start,
          toggleActions: motionConfig.scrollTrigger.toggleActions
        }
      });
    }
  });
}

/**
 * Reveal general elements marked with data-reveal
 */
function revealElements() {
  const elements = document.querySelectorAll('[data-reveal]');

  elements.forEach((element) => {
    // Skip elements inside intro overlay
    if (element.closest('#intro-overlay')) return;

    // Skip hero elements (handled by text-animations.js)
    if (element.closest('.hero') ||
        element.classList.contains('film-strip-container') ||
        element.classList.contains('explore-btn')) {
      return;
    }

    gsap.from(element, {
      y: motionConfig.transforms.yOffset,
      opacity: 0,
      duration: motionConfig.durations.normal,
      ease: motionConfig.easings.reveal,
      scrollTrigger: {
        trigger: element,
        start: motionConfig.scrollTrigger.start,
        toggleActions: motionConfig.scrollTrigger.toggleActions
      }
    });
  });
}

/**
 * Refresh ScrollTrigger after images load
 * This prevents animation timing issues with lazy-loaded images
 */
window.addEventListener('load', () => {
  ScrollTrigger.refresh();
});
