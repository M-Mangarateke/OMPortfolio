/**
 * Smooth Scroll and Navigation - Phase 3
 * Lenis smooth scroll with ScrollTrigger integration, sticky nav, and active section highlighting
 */

// Lenis instance
let lenis = null;
let lenisAnimationId = null;

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  // For reduced motion, skip Lenis but still set up nav
  if (motionConfig.reducedMotion) {
    console.log('%c⏭️ Lenis smooth scroll skipped (reduced motion)', 'color: #ff6b6b;');
    setupNavigation();
    return;
  }

  // If intro overlay is active, wait for scroll to be unlocked
  // Otherwise, initialize immediately
  if (document.body.style.overflow === 'hidden') {
    console.log('%c⏳ Waiting for scroll unlock to initialize Lenis', 'color: #ffa500;');
    waitForScrollUnlock();
  } else {
    initLenis();
    setupNavigation();
  }
});

/**
 * Wait for scroll to be unlocked by the intro overlay
 */
function waitForScrollUnlock() {
  const checkInterval = setInterval(() => {
    if (document.body.style.overflow !== 'hidden') {
      clearInterval(checkInterval);
      console.log('%c🔓 Scroll unlocked, initializing Lenis', 'color: #51cf66;');
      initLenis();
      setupNavigation();
    }
  }, 100);

  // Safety timeout: after 10 seconds, initialize anyway
  setTimeout(() => {
    clearInterval(checkInterval);
    if (!lenis) {
      console.log('%c⚠️ Timeout reached, force-initializing Lenis', 'color: #ffa500;');
      initLenis();
      setupNavigation();
    }
  }, 10000);
}

/**
 * Initialize Lenis smooth scroll
 */
function initLenis() {
  // Check if Lenis is available
  if (typeof Lenis === 'undefined') {
    console.error('❌ Lenis library not loaded');
    return;
  }

  // Initialize Lenis
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    smoothTouch: false, // Disable smooth scroll on touch devices for better performance
    touchMultiplier: 2,
    infinite: false
  });

  // Sync Lenis with GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);

  // Add Lenis to GSAP ticker for smooth integration
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  // Disable lag smoothing for better sync
  gsap.ticker.lagSmoothing(0);

  console.log('%c🌊 Lenis Smooth Scroll Initialized', 'color: #88ce02; font-weight: bold;');
}

/**
 * Setup navigation interactions
 */
function setupNavigation() {
  setupStickyNav();
  setupActiveSectionHighlight();
  setupSmoothScrollOnClick();

  console.log('%c🧭 Navigation Setup Complete', 'color: #88ce02; font-weight: bold;');
}

/**
 * Setup sticky navigation behavior
 */
function setupStickyNav() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  // Add a class when scrolled down
  ScrollTrigger.create({
    start: 'top -80',
    end: 'max',
    onUpdate: (self) => {
      if (self.direction === -1) {
        // Scrolling up
        navbar.classList.remove('navbar-hidden');
      } else {
        // Scrolling down
        if (self.progress > 0.05) {
          navbar.classList.add('navbar-scrolled');
        } else {
          navbar.classList.remove('navbar-scrolled');
        }
      }
    }
  });
}

/**
 * Setup active section highlighting in navigation
 */
function setupActiveSectionHighlight() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  if (navLinks.length === 0 || sections.length === 0) return;

  // Create ScrollTrigger for each section
  sections.forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => setActiveNav(section.id),
      onEnterBack: () => setActiveNav(section.id)
    });
  });

  /**
   * Set the active navigation link
   */
  function setActiveNav(sectionId) {
    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href === `#${sectionId}`) {
        link.classList.add('nav-link-active');
      } else {
        link.classList.remove('nav-link-active');
      }
    });
  }
}

/**
 * Setup smooth scroll on navigation click
 */
function setupSmoothScrollOnClick() {
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');

      // Only handle anchor links
      if (!href || !href.startsWith('#')) return;

      e.preventDefault();

      const targetId = href.substring(1);
      const targetSection = document.getElementById(targetId);

      if (!targetSection) {
        console.warn(`Section #${targetId} not found`);
        return;
      }

      // If Lenis is active, use it for smooth scrolling
      if (lenis && !motionConfig.reducedMotion) {
        lenis.scrollTo(targetSection, {
          duration: 1.5,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          offset: -80 // Offset for sticky nav
        });
      } else {
        // Fallback: use GSAP ScrollToPlugin
        gsap.to(window, {
          scrollTo: {
            y: targetSection,
            offsetY: 80
          },
          duration: motionConfig.reducedMotion ? motionConfig.durations.fast : motionConfig.durations.slow,
          ease: motionConfig.easings.liquid
        });
      }
    });
  });
}

/**
 * Cleanup function for Lenis
 */
function destroyLenis() {
  if (lenis) {
    lenis.destroy();
    lenis = null;
  }
  if (lenisAnimationId) {
    cancelAnimationFrame(lenisAnimationId);
    lenisAnimationId = null;
  }
}

// Export for potential cleanup
window.lenis = lenis;
window.destroyLenis = destroyLenis;
