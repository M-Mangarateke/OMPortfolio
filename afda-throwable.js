/**
 * AFDA Logo Throwable - Interactive Draggable Logo
 * Makes the AFDA logo draggable and throwable with basic physics
 */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  initAFDAThrowable();
});

/**
 * Initialize throwable functionality for AFDA logo
 */
function initAFDAThrowable() {
  // Get the AFDA logo element
  const afdaLogo = document.querySelector('.afda-logo');

  if (!afdaLogo) {
    console.warn('AFDA logo not found for throwable initialization');
    return;
  }

  // Get the education section as bounds
  const educationSection = document.querySelector('#education');

  if (!educationSection) {
    console.warn('Education section not found for bounds');
    return;
  }

  const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

  // Create the draggable instance with throwing physics
  Draggable.create(afdaLogo, {
    type: 'x,y',
    bounds: educationSection,
    edgeResistance: 0.8,
    allowNativeTouchScrolling: isTouchDevice,
    dragClickables: true,

    onPress: function() {
      // Kill any floating animation
      gsap.killTweensOf(afdaLogo);

      // Scale up when grabbing
      gsap.to(afdaLogo, {
        scale: 1.15,
        duration: 0.2,
        ease: 'power2.out'
      });
    },

    onRelease: function() {
      // Scale back with elastic bounce
      gsap.to(afdaLogo, {
        scale: 1,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)'
      });
    }
  });

  console.log('%c🎯 AFDA Logo Throwable Initialized', 'color: #88ce02; font-weight: bold;');
  console.log('%c   → Logo is now draggable!', 'color: #888;');
}
