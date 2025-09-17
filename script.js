// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

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

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
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

// Contact form handling - now just a direct Gmail link
// No form submission needed as we're using direct Gmail link


// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    // Set background color based on type
    if (type === 'success') {
        notification.style.backgroundColor = '#10b981';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#ef4444';
    } else {
        notification.style.backgroundColor = '#3b82f6';
    }
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.project-card, .skill-category, .stat');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        typeWriter(heroTitle, originalText, 50);
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Resume download functionality
document.addEventListener('DOMContentLoaded', () => {
    const resumeButtons = document.querySelectorAll('a[href="resume.pdf"]');
    
    resumeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Check if resume.pdf exists, if not, redirect to resume.html
            fetch('resume.pdf')
                .then(response => {
                    if (!response.ok) {
                        // If PDF doesn't exist, redirect to HTML version
                        e.preventDefault();
                        window.open('resume.html', '_blank');
                    }
                })
                .catch(() => {
                    // If fetch fails, redirect to HTML version
                    e.preventDefault();
                    window.open('resume.html', '_blank');
                });
        });
    });
});

// Projects toggle functionality
document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('toggleProjects');
    const hiddenProjects = document.querySelectorAll('.hidden-project');
    let showingAll = false;

    if (toggleBtn) {
        toggleBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (showingAll) {
                // Hide additional projects
                hiddenProjects.forEach(project => {
                    project.classList.remove('show');
                });
                toggleBtn.textContent = 'View All Projects';
                showingAll = false;
            } else {
                // Show all projects
                hiddenProjects.forEach(project => {
                    project.classList.add('show');
                });
                toggleBtn.textContent = 'Show Less';
                showingAll = true;
            }
        });
    }
});

// Add CSS for loading animation
const style = document.createElement('style');
style.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    .nav-link.active {
        color: #2563eb;
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Hero subtitle: typewriter effect with typing/deleting like the referenced site
document.addEventListener('DOMContentLoaded', () => {
    const roleElement = document.querySelector('.hero-role');
    if (!roleElement) return;

    const roles = [
        'UI/UX Designer',
        'Web Designer',
        'Web Developer',
        'FrontEnd Developer',
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const TYPE_SPEED = 120; // ms per char (slower typing)
    const DELETE_SPEED = 80; // ms per char (slower deleting)
    const PAUSE_END = 1500; // longer pause after type
    const PAUSE_START = 500; // longer pause before typing starts

    function tick() {
        const current = roles[roleIndex];

        if (isDeleting) {
            charIndex = Math.max(0, charIndex - 1);
        } else {
            charIndex = Math.min(current.length, charIndex + 1);
        }

        roleElement.textContent = current.substring(0, charIndex);

        let timeout = isDeleting ? DELETE_SPEED : TYPE_SPEED;

        if (!isDeleting && charIndex === current.length) {
            timeout = PAUSE_END;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            timeout = PAUSE_START;
        }

        setTimeout(tick, timeout);
    }

    // Start typing loop
    setTimeout(tick, 300);
});
