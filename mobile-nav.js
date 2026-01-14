// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.nav-hamburger');
    const navContainer = document.querySelector('.nav-container');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navContainer.classList.toggle('mobile-active');
        navbar.classList.toggle('mobile-menu-open');

        // Prevent scrolling when menu is open
        if (navContainer.classList.contains('mobile-active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navContainer.classList.remove('mobile-active');
            navbar.classList.remove('mobile-menu-open');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navbar.contains(event.target);
        if (!isClickInsideNav && navContainer.classList.contains('mobile-active')) {
            hamburger.classList.remove('active');
            navContainer.classList.remove('mobile-active');
            navbar.classList.remove('mobile-menu-open');
            document.body.style.overflow = '';
        }
    });
});
