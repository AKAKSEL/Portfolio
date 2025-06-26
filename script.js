
// Theme Management
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('.theme-icon');
let isDarkMode = localStorage.getItem('theme') === 'dark';

function updateTheme() {
    if (isDarkMode) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.textContent = '☀️';
    } else {
        document.documentElement.removeAttribute('data-theme');
        themeIcon.textContent = '🌙';
    }
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
}

// Initialize theme
updateTheme();

themeToggle.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    updateTheme();
});

// Navigation Scroll Effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth Scrolling for Navigation Links
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerOffset = 80;
        const elementPosition = element.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// Add click listeners to navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.getAttribute('href').substring(1);
        scrollToSection(sectionId);
    });
});

// Scroll Reveal Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, observerOptions);

// Observe all scroll-reveal elements
document.querySelectorAll('.scroll-reveal').forEach(el => {
    observer.observe(el);
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
const submitText = document.querySelector('.submit-text');
const submitLoading = document.querySelector('.submit-loading');
const toast = document.getElementById('toast');

function showToast() {
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Show loading state
    submitText.style.display = 'none';
    submitLoading.style.display = 'inline';
    contactForm.querySelector('.form-submit').disabled = true;
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Reset form
    contactForm.reset();
    
    // Reset button state
    submitText.style.display = 'inline';
    submitLoading.style.display = 'none';
    contactForm.querySelector('.form-submit').disabled = false;
    
    // Show success toast
    showToast();
});

// Enhanced Form Input Animations
document.querySelectorAll('.form-input, .form-textarea').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
    
    // Check if input has value on page load
    if (input.value) {
        input.parentElement.classList.add('focused');
    }
});

// Parallax Effect for Background Elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const bgCircles = document.querySelectorAll('.bg-circle');
    
    bgCircles.forEach((circle, index) => {
        const speed = (index + 1) * 0.5;
        circle.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Project Card Stagger Animation
document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 150}ms`;
});

// Initialize animations on page load
window.addEventListener('load', () => {
    // Trigger initial scroll reveal check
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
    scrollRevealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            el.classList.add('revealed');
        }
    });
});

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close any open modals or forms
        document.activeElement.blur();
    }
});

// Performance Optimization - Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, 16);

window.addEventListener('scroll', throttledScrollHandler);