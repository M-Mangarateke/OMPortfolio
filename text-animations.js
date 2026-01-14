/**
 * Advanced Text Animations
 * Split and Scramble effects for all text elements
 */

// Track if hero has been animated
let heroAnimated = false;
let heroAnimationRetries = 0;
const maxHeroRetries = 30;
let introCompleted = false;

/**
 * Check if all prerequisites are ready for hero animation
 */
function checkHeroReadiness() {
  // Check if GSAP is loaded
  if (typeof gsap === 'undefined') {
    console.warn('⚠️ GSAP not loaded yet');
    return false;
  }

  if (window.heroAssetsReady === false) {
    console.warn('Hero assets still loading');
    return false;
  }

  // Check if DOM elements exist
  const heroName = document.querySelector('.hero-name');
  const exploreBtn = document.querySelector('.explore-btn');

  if (!heroName || !exploreBtn) {
    console.warn('⚠️ Hero elements not found yet');
    return false;
  }

  console.log('✅ All hero animation prerequisites ready');
  return true;
}

/**
 * Safe trigger function with readiness check
 */
function triggerHeroAnimationSafe() {
  if (heroAnimated) {
    console.log('%c⏭️ Hero already animated', 'color: #888;');
    return;
  }

  if (heroAnimationRetries >= maxHeroRetries) {
    console.error('❌ Max retries reached, giving up');
    return;
  }

  if (checkHeroReadiness()) {
    console.log('%c🎬 Starting hero animation', 'color: #51cf66; font-weight: bold;');
    animateHeroText();
  } else {
    heroAnimationRetries++;
    console.log('%c⏳ Retrying hero animation in 100ms (attempt ' + heroAnimationRetries + '/' + maxHeroRetries + ')', 'color: #ffa500;');
    setTimeout(triggerHeroAnimationSafe, 100);
  }
}

// Register event listener IMMEDIATELY (before DOMContentLoaded) to avoid race conditions
document.addEventListener('intro-complete', () => {
  console.log('%c📢 Intro complete event received!', 'color: #88ce02;');
  introCompleted = true;
  triggerHeroAnimationSafe();
});

// Global function to trigger hero animations (can be called from intro-overlay.js)
// Define this IMMEDIATELY so it's available
window.triggerHeroAnimations = function() {
  console.log('%c🎬 Hero animations triggered directly', 'color: #88ce02;');
  introCompleted = true;
  triggerHeroAnimationSafe();
};

console.log('%c✅ Hero animation triggers registered', 'color: #88ce02;');

// Wait for text effects to be loaded
document.addEventListener('DOMContentLoaded', () => {
  // Setup scroll-triggered text animations for other sections
  setupScrollTextAnimations();

  // Safety fallback: If intro completed but animation didn't run, try again
  setTimeout(() => {
    if (introCompleted && !heroAnimated) {
      console.log('%c⏰ Safety timeout: Triggering hero animations', 'color: #ff6b6b;');
      triggerHeroAnimationSafe();
    }
  }, 3000);

  // Ultimate fallback after 6 seconds
  setTimeout(() => {
    const introOverlayActive = document.getElementById('liquid-chrome-intro');
    if (!heroAnimated && !introOverlayActive) {
      console.log('%c⏰ Ultimate fallback: Forcing hero animation', 'color: #ff0000; font-weight: bold;');
      // Force animation even without intro completion
      introCompleted = true;
      triggerHeroAnimationSafe();
    }
  }, 6000);

  console.log('%c✨ Text Animations System Ready', 'color: #88ce02; font-weight: bold;');
});

/**
 * Animate Hero Section Text (triggers after intro)
 */
function animateHeroText() {
  // Prevent multiple animations
  if (heroAnimated) {
    console.log('%c⏭️ Hero already animated, skipping', 'color: #888;');
    return;
  }

  const heroName = document.querySelector('.hero-name');

  if (!heroName) {
    console.error('❌ Hero name element not found in animateHeroText - this should not happen');
    return;
  }

  // Split liquid chrome text into characters
  const line1 = heroName.querySelector('.hero-name-line1');
  const line2 = heroName.querySelector('.hero-name-line2');

  if (!line1 || !line2) {
    console.error('❌ Hero name lines not found in animateHeroText - this should not happen');
    return;
  }

  const line1Letters = Array.from(line1.querySelectorAll('img'));
  const line2Letters = Array.from(line2.querySelectorAll('img'));
  const filmStrip = document.querySelector('.film-strip-container');
  const exploreBtn = document.querySelector('.explore-btn');

  if (!exploreBtn) {
    console.error('❌ Explore button not found!');
  } else {
    console.log('✅ Explore button found:', exploreBtn);
  }

  // Mark as animated
  heroAnimated = true;

  // Set visibility and opacity to proper values before animating
  const elementsToAnimate = [...line1Letters, ...line2Letters, filmStrip];

  gsap.set(elementsToAnimate, {
    visibility: 'visible',
    opacity: 1
  });

  // Handle explore button separately with direct DOM manipulation
  if (exploreBtn) {
    // Force visibility with inline styles to override CSS
    gsap.set(exploreBtn, {
      visibility: 'visible',
      opacity: 1,
      force3D: true
    });
  }

  // Animation Type 1: Slide up with rotation (Hero)
  const tl = gsap.timeline({ delay: 0.3 });

  tl.from(line1Letters, {
    y: 100,
    opacity: 0,
    rotation: 45,
    scale: 0.5,
    duration: 0.8,
    ease: 'back.out(1.7)',
    stagger: 0.05
  });

  tl.from(line2Letters, {
    y: 100,
    opacity: 0,
    rotation: -45,
    scale: 0.5,
    duration: 0.8,
    ease: 'back.out(1.7)',
    stagger: 0.05
  }, '-=0.4');

  // Animate film strip
  tl.from(filmStrip, {
    scale: 0,
    opacity: 0,
    duration: 0.6,
    ease: 'back.out(1.7)'
  }, '-=0.3');

  // Animate button if it exists - use fromTo for explicit control
  if (exploreBtn) {
    tl.fromTo(exploreBtn,
      {
        // FROM state
        scale: 0,
        rotation: 360,
        opacity: 0,
        visibility: 'visible', // Ensure it's visible during animation
        display: 'block'
      },
      {
        // TO state
        scale: 1,
        rotation: 0,
        opacity: 1,
        visibility: 'visible',
        display: 'block',
        duration: 0.6,
        ease: 'back.out(1.7)',
        force3D: true,
        onStart: () => {
          console.log('🔘 Explore button animation starting');
        },
        onComplete: () => {
          // Force visible state with inline styles to override CSS permanently
          exploreBtn.style.opacity = '1';
          exploreBtn.style.visibility = 'visible';
          exploreBtn.style.display = 'block';
          exploreBtn.style.transform = '';
          console.log('🔘 Explore button animation complete - button should be visible now');
        }
      },
      '-=0.2'
    );
  }

  console.log('%c🎬 Hero text animated', 'color: #88ce02;');
}

/**
 * Setup scroll-triggered text animations
 */
function setupScrollTextAnimations() {
  // About Section - Animation Type 2: Wave effect
  setupAboutTextAnimation();

  // Skills Section - Animation Type 3: Split from center
  setupSkillsTextAnimation();

  // Work Section - Animation Type 4: Elastic bounce
  setupWorkTextAnimation();

  // Showreel Section - Animation Type 5: Glitch effect
  setupShowreelTextAnimation();

  // Education Section - Animation Type 6: Float in
  setupEducationTextAnimation();

  // Contact Section - Animation Type 7: Scale pulse
  setupContactTextAnimation();

  // Setup scramble text for paragraphs and bullets
  setupScrambleAnimations();
}

/**
 * About Section - Wave effect
 */
function setupAboutTextAnimation() {
  const aboutTitle = document.querySelector('.about-title');
  if (!aboutTitle) return;

  const line1 = aboutTitle.querySelector('.about-title-line1');
  const line2 = aboutTitle.querySelector('.about-title-line2');

  if (line1 && line2) {
    const line1Letters = Array.from(line1.querySelectorAll('img'));
    const line2Letters = Array.from(line2.querySelectorAll('img'));

    ScrollTrigger.create({
      trigger: aboutTitle,
      start: 'top 80%',
      onEnter: () => {
        gsap.from(line1Letters, {
          y: 50,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
          stagger: {
            each: 0.08,
            from: 'start'
          }
        });

        gsap.from(line2Letters, {
          y: -50,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
          stagger: {
            each: 0.08,
            from: 'end'
          }
        });
      }
    });
  }
}

/**
 * Skills Section - Split from center
 */
function setupSkillsTextAnimation() {
  // Skills animation disabled per user request
  return;

  const skillsTitle = document.querySelector('.skills-title');
  if (!skillsTitle) return;

  const letters = Array.from(skillsTitle.querySelectorAll('img'));
  const middle = Math.floor(letters.length / 2);

  ScrollTrigger.create({
    trigger: skillsTitle,
    start: 'top 80%',
    onEnter: () => {
      letters.forEach((letter, index) => {
        const distance = Math.abs(index - middle);
        const delay = distance * 0.05;

        gsap.from(letter, {
          scale: 0,
          opacity: 0,
          rotation: index < middle ? -180 : 180,
          duration: 0.8,
          ease: 'back.out(1.7)',
          delay: delay
        });
      });
    }
  });
}

/**
 * Work Section - Elastic bounce
 */
function setupWorkTextAnimation() {
  const workLine1 = document.querySelector('.work-title-line1');
  const workLine2 = document.querySelector('.work-title-line2');

  if (workLine1 && workLine2) {
    const line1Letters = Array.from(workLine1.querySelectorAll('img'));
    const line2Letters = Array.from(workLine2.querySelectorAll('img'));

    ScrollTrigger.create({
      trigger: workLine1,
      start: 'top 80%',
      onEnter: () => {
        gsap.from(line1Letters, {
          y: -100,
          opacity: 0,
          duration: 1,
          ease: 'elastic.out(1, 0.6)',
          stagger: 0.06
        });

        gsap.from(line2Letters, {
          y: -100,
          opacity: 0,
          duration: 1,
          ease: 'elastic.out(1, 0.6)',
          stagger: 0.06
        });
      }
    });
  }
}

/**
 * Showreel Section - Glitch effect
 */
function setupShowreelTextAnimation() {
  const showreelTitle = document.querySelector('.showreel-title');
  if (!showreelTitle) return;

  const letters = Array.from(showreelTitle.querySelectorAll('img'));

  ScrollTrigger.create({
    trigger: showreelTitle,
    start: 'top 80%',
    onEnter: () => {
      letters.forEach((letter, index) => {
        // Random glitch positions
        const glitchX = gsap.utils.random(-50, 50);
        const glitchY = gsap.utils.random(-50, 50);

        gsap.from(letter, {
          x: glitchX,
          y: glitchY,
          opacity: 0,
          duration: 0.4,
          ease: 'power4.out',
          delay: index * 0.04
        });
      });
    }
  });
}

/**
 * Education Section - Float in
 */
function setupEducationTextAnimation() {
  const educationTitle = document.querySelector('.education-title');
  if (!educationTitle) return;

  const letters = Array.from(educationTitle.querySelectorAll('img'));

  ScrollTrigger.create({
    trigger: educationTitle,
    start: 'top 80%',
    onEnter: () => {
      gsap.from(letters, {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        stagger: {
          each: 0.06,
          ease: 'sine.inOut'
        }
      });
    }
  });
}

/**
 * Contact Section - Scale pulse
 */
function setupContactTextAnimation() {
  const contactLine1 = document.querySelector('.contact-title-line1');
  const contactLine2 = document.querySelector('.contact-title-line2');

  if (contactLine1 && contactLine2) {
    const line1Letters = Array.from(contactLine1.querySelectorAll('img'));
    const line2Letters = Array.from(contactLine2.querySelectorAll('img'));

    ScrollTrigger.create({
      trigger: contactLine1,
      start: 'top 80%',
      onEnter: () => {
        gsap.from(line1Letters, {
          scale: 2,
          opacity: 0,
          duration: 0.6,
          ease: 'back.out(2)',
          stagger: 0.04
        });

        gsap.from(line2Letters, {
          scale: 2,
          opacity: 0,
          duration: 0.6,
          ease: 'back.out(2)',
          stagger: 0.04
        });
      }
    });
  }
}

/**
 * Setup Scramble Text for paragraphs
 */
function setupScrambleAnimations() {
  // About section paragraphs only
  const aboutParagraphs = document.querySelectorAll('.about-text p');
  aboutParagraphs.forEach((p, index) => {
    ScrollTrigger.create({
      trigger: p,
      start: 'top 85%',
      onEnter: () => {
        const originalText = p.textContent;
        scrambleText(p, {
          text: originalText,
          duration: 1.5,
          speed: 30
        });
      }
    });
  });
}
