/**
 * Skills Draggable - Interactive Draggable Software Icons
 * Makes software icons in Skills Part 1 draggable using GSAP Draggable
 */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  initSkillsDraggable();
});

/**
 * Initialize draggable functionality for skills icons
 */
function initSkillsDraggable() {
  // Get all icon items in the skills section
  const iconItems = document.querySelectorAll('.software-icons-scattered .icon-item');

  if (iconItems.length === 0) {
    console.warn('No skill icons found for draggable initialization');
    return;
  }

  if (typeof Draggable === 'undefined' || typeof gsap === 'undefined') {
    console.warn('GSAP Draggable not available');
    return;
  }

  // Make each icon draggable
  Draggable.create(iconItems, {
    type: 'x,y',
    bounds: '.skills-part1',
    edgeResistance: 0.65,
    allowNativeTouchScrolling: false,

    onPress: function() {
      // Scale up when grabbing
      gsap.to(this.target, {
        scale: 1.1,
        duration: 0.2,
        ease: 'power2.out'
      });
    },

    onRelease: function() {
      // Scale back on release
      gsap.to(this.target, {
        scale: 1,
        duration: 0.3,
        ease: 'back.out(1.7)'
      });
    }
  });

  console.log('%c🎯 Skills Draggable Initialized', 'color: #88ce02; font-weight: bold;');
  console.log(`%c   → ${iconItems.length} draggable icons ready`, 'color: #888;');
}
