/**
 * Navigation Enhancement - Phase 3 (Revised)
 * Sticky nav, active section highlighting, and smooth scroll on click (native scroll)
 */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  console.log('%c🧭 Navigation System Initialized', 'color: #88ce02; font-weight: bold;');
});

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
 * Setup instant scroll on navigation click
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

      // Instant scroll to section with offset for navbar
      const navbarHeight = 80;
      const targetPosition = targetSection.offsetTop - navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'auto' // Instant, no smooth scrolling
      });
    });
  });
}
