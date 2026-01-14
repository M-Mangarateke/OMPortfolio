// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer removed - now using GSAP ScrollTrigger (see gsap-animations.js)

// Active navigation link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Explore button scroll to about section
const exploreBtn = document.querySelector('.explore-btn');
if (exploreBtn) {
    exploreBtn.addEventListener('click', () => {
        document.querySelector('#about').scrollIntoView({
            behavior: 'smooth'
        });
    });
}

// Parallax effect for decorative elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shells = document.querySelectorAll('.shell-decor');

    shells.forEach((shell, index) => {
        const speed = 0.5 + (index * 0.2);
        shell.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.05}deg)`;
    });

    const starfish = document.querySelector('.starfish-decor');
    if (starfish) {
        starfish.style.transform = `rotate(${scrolled * 0.1}deg)`;
    }
});

// Add animation classes to polaroids
const polaroids = document.querySelectorAll('.polaroid');
polaroids.forEach((polaroid, index) => {
    polaroid.style.animationDelay = `${index * 0.1}s`;
});

// Navbar background change on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(100, 96, 98, 0.5)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.background = 'rgba(100, 96, 98, 0.39)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Skill icons animation removed - now using GSAP ScrollTrigger (see gsap-animations.js)

// Add CSS for navigation active state (other animations now handled by GSAP)
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--accent-blue);
    }

    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Email copy functionality
const emailLink = document.querySelector('.email');
if (emailLink) {
    emailLink.addEventListener('click', (e) => {
        // Allow default mailto behavior, but also copy to clipboard
        const email = emailLink.textContent;
        navigator.clipboard.writeText(email).then(() => {
            // Create temporary tooltip
            const tooltip = document.createElement('div');
            tooltip.textContent = 'Email copied to clipboard!';
            tooltip.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: var(--accent-blue);
                color: white;
                padding: 15px 25px;
                border-radius: 8px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                z-index: 10000;
                animation: slideIn 0.3s ease;
            `;
            document.body.appendChild(tooltip);

            setTimeout(() => {
                tooltip.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => tooltip.remove(), 300);
            }, 2000);
        });
    });
}

// Add slide animations
const slideStyle = document.createElement('style');
slideStyle.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(slideStyle);

// Console message
console.log('%c👋 Welcome to Oreneile Machitje\'s Portfolio!', 'color: #5ba3d0; font-size: 20px; font-weight: bold;');
console.log('%c🎬 Motion Picture & Visual Effects', 'color: #d4a5c7; font-size: 14px;');
