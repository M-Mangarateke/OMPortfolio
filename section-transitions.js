/**
 * Section Transitions - Phase 4
 * Liquid wipe overlay reveal for section entries with mobile fallback
 */

// Track which sections have been revealed
const revealedSections = new Set();

// Detect mobile/low-performance devices
const isMobileOrLowPerf = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                          window.innerWidth < 768;

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  initSectionTransitions();
});

/**
 * Initialize section transition system
 */
function initSectionTransitions() {
  // Create overlay container
  createTransitionOverlay();

  // Setup transitions for all main sections (skip hero)
  const sections = document.querySelectorAll('section:not(#home)');

  sections.forEach((section) => {
    setupSectionTransition(section);
  });

  console.log('%c🌊 Section Transitions Initialized', 'color: #88ce02; font-weight: bold;');
  console.log(`%cMode: ${isMobileOrLowPerf ? 'Color Wash Fallback' : 'SVG Mask'}`, 'color: #ffa500;');
}

/**
 * Create the transition overlay container
 */
function createTransitionOverlay() {
  const overlay = document.createElement('div');
  overlay.id = 'section-transition-overlay';
  overlay.className = isMobileOrLowPerf ? 'transition-overlay-fallback' : 'transition-overlay-svg';

  if (isMobileOrLowPerf) {
    // Simple color wash overlay for mobile
    overlay.innerHTML = '<div class="color-wash"></div>';
  } else {
    // SVG mask overlay for desktop
    overlay.innerHTML = `
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="liquid-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:rgba(185,185,194,0.95);stop-opacity:1" />
            <stop offset="50%" style="stop-color:rgba(220,220,228,0.98);stop-opacity:1" />
            <stop offset="100%" style="stop-color:rgba(185,185,194,0.95);stop-opacity:1" />
          </linearGradient>

          <filter id="liquid-blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
          </filter>
        </defs>

        <!-- Liquid wipe shape -->
        <path id="liquid-wipe-path"
              d="M -10 0 Q 0 10, 10 0 Q 20 -10, 30 0 Q 40 10, 50 0 Q 60 -10, 70 0 Q 80 10, 90 0 Q 100 -10, 110 0 L 110 110 L -10 110 Z"
              fill="url(#liquid-gradient)"
              filter="url(#liquid-blur)"
              style="transform-origin: center;"
        />
      </svg>
    `;
  }

  document.body.appendChild(overlay);
  injectTransitionStyles();
}

/**
 * Setup transition for a specific section
 */
function setupSectionTransition(section) {
  // Skip if already revealed
  if (revealedSections.has(section.id)) return;

  ScrollTrigger.create({
    trigger: section,
    start: 'top 85%',
    once: true, // Only trigger once per section
    onEnter: () => {
      if (!revealedSections.has(section.id)) {
        playTransition(section);
        revealedSections.add(section.id);
      }
    }
  });
}

/**
 * Play the liquid wipe transition
 */
function playTransition(section) {
  const overlay = document.getElementById('section-transition-overlay');
  if (!overlay) return;

  // Different animation based on mode
  if (motionConfig.reducedMotion) {
    // Simple fade for reduced motion
    playReducedMotionTransition(overlay, section);
  } else if (isMobileOrLowPerf) {
    // Color wash sweep for mobile
    playColorWashTransition(overlay, section);
  } else {
    // Full SVG mask transition for desktop
    playSVGMaskTransition(overlay, section);
  }
}

/**
 * Reduced motion: simple fade overlay
 */
function playReducedMotionTransition(overlay, section) {
  const tl = gsap.timeline();

  tl.set(overlay, { display: 'block', opacity: 0 })
    .to(overlay, {
      opacity: 0.3,
      duration: motionConfig.durations.instant,
      ease: 'none'
    })
    .to(overlay, {
      opacity: 0,
      duration: motionConfig.durations.instant,
      ease: 'none'
    })
    .set(overlay, { display: 'none' });
}

/**
 * Mobile fallback: color wash sweep
 */
function playColorWashTransition(overlay, section) {
  const colorWash = overlay.querySelector('.color-wash');
  if (!colorWash) return;

  const tl = gsap.timeline();

  tl.set(overlay, { display: 'block' })
    .set(colorWash, { x: '-100%' })
    .to(colorWash, {
      x: '0%',
      duration: motionConfig.durations.normal,
      ease: motionConfig.easings.liquid
    })
    .to(colorWash, {
      x: '100%',
      duration: motionConfig.durations.normal,
      ease: motionConfig.easings.liquid
    }, '+=0.1')
    .set(overlay, { display: 'none' });
}

/**
 * Desktop: SVG mask liquid wipe
 */
function playSVGMaskTransition(overlay, section) {
  const liquidPath = overlay.querySelector('#liquid-wipe-path');
  if (!liquidPath) return;

  const tl = gsap.timeline();

  tl.set(overlay, { display: 'block' })
    .fromTo(liquidPath, {
      attr: { d: 'M -10 -20 Q 0 -10, 10 -20 Q 20 -30, 30 -20 Q 40 -10, 50 -20 Q 60 -30, 70 -20 Q 80 -10, 90 -20 Q 100 -30, 110 -20 L 110 -20 L -10 -20 Z' }
    }, {
      attr: { d: 'M -10 110 Q 0 100, 10 110 Q 20 120, 30 110 Q 40 100, 50 110 Q 60 120, 70 110 Q 80 100, 90 110 Q 100 120, 110 110 L 110 110 L -10 110 Z' },
      duration: motionConfig.durations.slow,
      ease: motionConfig.easings.liquid
    })
    .set(overlay, { display: 'none' });
}

/**
 * Inject CSS styles for transitions
 */
function injectTransitionStyles() {
  const style = document.createElement('style');
  style.id = 'section-transition-styles';
  style.textContent = `
    /* Section Transition Overlay */
    #section-transition-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 9999;
      pointer-events: none;
      display: none;
    }

    /* SVG Mask Overlay */
    .transition-overlay-svg {
      background: transparent;
    }

    .transition-overlay-svg svg {
      width: 100%;
      height: 100%;
      display: block;
    }

    /* Color Wash Fallback */
    .transition-overlay-fallback .color-wash {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(185, 185, 194, 0.4) 30%,
        rgba(220, 220, 228, 0.6) 50%,
        rgba(185, 185, 194, 0.4) 70%,
        transparent 100%
      );
    }

    /* Reduced motion override */
    @media (prefers-reduced-motion: reduce) {
      #section-transition-overlay {
        background: rgba(200, 200, 210, 0.3);
      }
    }
  `;

  document.head.appendChild(style);
}
