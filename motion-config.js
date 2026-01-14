/**
 * Motion Configuration Module
 * Centralized configuration for GSAP animations with prefers-reduced-motion support
 */

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, CustomEase, Draggable);

// Detect reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Motion Configuration
const motionConfig = {
  // Reduced motion flag
  reducedMotion: prefersReducedMotion,

  // Animation durations (in seconds)
  durations: {
    instant: 0.2,
    fast: 0.4,
    normal: 0.6,
    slow: 0.8,
    verySlow: 1.2
  },

  // Custom easings
  easings: {
    // Smooth reveal
    reveal: prefersReducedMotion ? 'power1.out' : 'power2.out',
    // Subtle bounce for interactive elements
    bounce: prefersReducedMotion ? 'power1.out' : 'back.out(1.2)',
    // Smooth entrance
    entrance: prefersReducedMotion ? 'none' : 'power3.out',
    // Liquid smooth
    liquid: prefersReducedMotion ? 'power1.inOut' : 'power2.inOut'
  },

  // ScrollTrigger defaults
  scrollTrigger: {
    start: 'top 80%',
    end: 'bottom 20%',
    toggleActions: prefersReducedMotion ? 'play none none none' : 'play none none reverse'
  },

  // Stagger amounts
  stagger: {
    tight: prefersReducedMotion ? 0 : 0.05,
    normal: prefersReducedMotion ? 0 : 0.1,
    loose: prefersReducedMotion ? 0 : 0.15
  },

  // Transform amounts
  transforms: {
    // Y offset for reveal animations
    yOffset: prefersReducedMotion ? 10 : 30,
    // X offset for slide animations
    xOffset: prefersReducedMotion ? 10 : 50,
    // Scale amount
    scaleFrom: prefersReducedMotion ? 0.98 : 0.8
  }
};

/**
 * Helper function to get animation configuration based on reduced motion preference
 * @param {Object} normalConfig - Configuration for normal motion
 * @param {Object} reducedConfig - Configuration for reduced motion
 * @returns {Object} - Appropriate configuration based on user preference
 */
function getMotionConfig(normalConfig, reducedConfig = {}) {
  if (motionConfig.reducedMotion) {
    return {
      duration: reducedConfig.duration || motionConfig.durations.instant,
      ease: reducedConfig.ease || 'none',
      ...reducedConfig
    };
  }
  return normalConfig;
}

/**
 * Helper function to create reveal animation
 * @param {Element|String} target - Element or selector to animate
 * @param {Object} options - Additional GSAP options
 * @returns {gsap.core.Tween} - GSAP animation instance
 */
function createReveal(target, options = {}) {
  const defaults = {
    y: motionConfig.transforms.yOffset,
    opacity: 0,
    duration: motionConfig.durations.normal,
    ease: motionConfig.easings.reveal,
    scrollTrigger: {
      trigger: target,
      ...motionConfig.scrollTrigger
    }
  };

  return gsap.from(target, { ...defaults, ...options });
}

/**
 * Helper function to create stagger reveal animation
 * @param {Element|String} targets - Elements or selector to animate
 * @param {Object} options - Additional GSAP options
 * @returns {gsap.core.Tween} - GSAP animation instance
 */
function createStaggerReveal(targets, options = {}) {
  const defaults = {
    y: motionConfig.transforms.yOffset,
    opacity: 0,
    duration: motionConfig.durations.normal,
    ease: motionConfig.easings.reveal,
    stagger: motionConfig.stagger.normal
  };

  return gsap.from(targets, { ...defaults, ...options });
}

/**
 * Initialize GSAP defaults
 */
function initGSAP() {
  // Set GSAP defaults
  gsap.defaults({
    ease: motionConfig.easings.reveal,
    duration: motionConfig.durations.normal
  });

  // ScrollTrigger configuration
  ScrollTrigger.config({
    // Prevent layout shift
    ignoreMobileResize: true
  });

  // Debug in development (comment out for production)
  // ScrollTrigger.defaults({ markers: true });

  console.log('%c🎬 GSAP Motion System Initialized', 'color: #88ce02; font-weight: bold;');
  console.log(`%cReduced Motion: ${motionConfig.reducedMotion ? 'Enabled' : 'Disabled'}`,
    `color: ${motionConfig.reducedMotion ? '#ff6b6b' : '#51cf66'};`);
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGSAP);
} else {
  initGSAP();
}

// Export for use in other scripts
window.motionConfig = motionConfig;
window.getMotionConfig = getMotionConfig;
window.createReveal = createReveal;
window.createStaggerReveal = createStaggerReveal;
