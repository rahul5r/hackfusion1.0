// HackFusion 1.0 - Fixed JavaScript with Working Theme System and Navigation
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 HackFusion 1.0 - Initializing...');
    
    // Initialize all components in the correct order
    initializeThemeToggle();
    initializeNavigation(); 
    initializeSponsorsNavigation();
    initializeFAQ();
    initializeCountdown();
    initializeScrollAnimations();
    initializeCounters();
    initializeInteractiveEffects();
    
    console.log('✅ All systems operational!');
});

// Theme Toggle Functionality - FIXED VERSION
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.querySelector('.theme-icon');
    const html = document.documentElement;
    
    console.log('Theme toggle button found:', !!themeToggle);
    console.log('Theme icon found:', !!themeIcon);
    
    if (!themeToggle || !themeIcon) {
        console.error('Theme toggle elements not found');
        return;
    }
    
    // Get saved theme or default to dark
    let currentTheme = localStorage.getItem('hackfusion-theme') || 'light';
    
    // Apply initial theme immediately
    html.setAttribute('data-color-scheme', currentTheme);
    updateThemeIcon(currentTheme);
    
    console.log('Initial theme set to:', currentTheme);
    
    // Theme toggle click handler
    themeToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('Theme toggle clicked!');
        
        // Toggle theme
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        // Apply theme with immediate effect
        html.setAttribute('data-color-scheme', currentTheme);
        localStorage.setItem('hackfusion-theme', currentTheme);
        updateThemeIcon(currentTheme);
        
        // Visual feedback
        themeToggle.style.transform = 'scale(1.2)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 150);
        
        console.log('Theme switched to:', currentTheme);
        
        // Force a repaint to ensure theme changes are applied
        document.body.style.display = 'none';
        setTimeout(() => {
            document.body.style.display = 'block';
        }, 1);
    });
    
    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.textContent = '🌙';
            themeToggle.setAttribute('aria-label', 'Switch to light mode');
        } else {
            themeIcon.textContent = '☀️';
            themeToggle.setAttribute('aria-label', 'Switch to dark mode');
        }
        console.log('Theme icon updated to:', themeIcon.textContent);
    }
    
    console.log('✅ Theme toggle initialized');
}

// FAQ Accordion Functionality - COMPLETELY FIXED
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    console.log('FAQ items found:', faqItems.length);
    
    if (faqItems.length === 0) {
        console.warn('No FAQ items found');
        return;
    }
    
    faqItems.forEach((item, index) => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle');
        
        if (!question || !answer || !toggle) {
            console.error(`FAQ item ${index} missing elements:`, {
                question: !!question,
                answer: !!answer,
                toggle: !!toggle
            });
            return;
        }
        
        // Set initial state
        answer.style.maxHeight = '0px';
        answer.style.overflow = 'hidden';
        answer.style.transition = 'max-height 0.3s ease-out, padding 0.3s ease-out';
        
        question.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isCurrentlyActive = item.classList.contains('active');
            
            console.log(`FAQ item ${index + 1} clicked, currently active:`, isCurrentlyActive);
            
            // Close all other FAQ items
            faqItems.forEach((otherItem, otherIndex) => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherToggle = otherItem.querySelector('.faq-toggle');
                    
                    if (otherAnswer) {
                        otherAnswer.style.maxHeight = '0px';
                        otherAnswer.style.paddingBottom = '0px';
                    }
                    if (otherToggle) {
                        otherToggle.textContent = '+';
                        otherToggle.style.transform = 'rotate(0deg)';
                    }
                }
            });
            
            // Toggle current item
            if (isCurrentlyActive) {
                // Close current item
                item.classList.remove('active');
                answer.style.maxHeight = '0px';
                answer.style.paddingBottom = '0px';
                toggle.textContent = '+';
                toggle.style.transform = 'rotate(0deg)';
                console.log(`FAQ item ${index + 1} closed`);
            } else {
                // Open current item
                item.classList.add('active');
                
                // Calculate the height needed
                const scrollHeight = answer.scrollHeight;
                answer.style.maxHeight = (scrollHeight + 40) + 'px'; // Add padding
                answer.style.paddingBottom = '20px';
                
                toggle.textContent = '−';
                toggle.style.transform = 'rotate(180deg)';
                
                console.log(`FAQ item ${index + 1} opened with height:`, scrollHeight);
            }
        });
        
        // Initialize toggle symbol
        toggle.textContent = '+';
        toggle.style.transition = 'transform 0.3s ease';
        
        console.log(`FAQ item ${index + 1} initialized`);
    });
    
    console.log('✅ FAQ system initialized');
}

// Navigation System - COMPLETELY FIXED
function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.getElementById('header');

    console.log('Navigation elements found:', {
        toggle: !!navToggle,
        menu: !!navMenu,
        links: navLinks.length,
        header: !!header
    });

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            toggleMobileMenu();
        });
    }

    // Handle navigation links
    navLinks.forEach((link, index) => {
        link.addEventListener('click', function(e) {
            console.log(`Nav link ${index + 1} clicked:`, this.textContent.trim());
            
            // Handle special links (sponsors, home)
            if (this.classList.contains('sponsors-link') || this.classList.contains('home-link')) {
                console.log('Special link detected, skipping scroll handling');
                
                return; // Let other handlers manage these
            }
            
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            console.log('Target ID:', targetId);
            
            if (targetId && targetId.startsWith('#') && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                const mainContent = document.getElementById('main-content');
                
                console.log('Target element found:', !!targetElement);
                console.log('Main content visible:', !mainContent?.classList.contains('hidden'));
                
                if (targetElement && mainContent && !mainContent.classList.contains('hidden')) {
                    smoothScrollTo(targetElement);
                    
                    
                    // Update active state
                    navLinks.forEach(navLink => navLink.classList.remove('active'));
                    this.classList.add('active');
                    
                    console.log(`Scrolled to ${targetId}`);
                }
            }
        });
    });

    // Learn More button functionality
    const learnMoreButtons = document.querySelectorAll('a[href="#about"]');
    console.log('Learn More buttons found:', learnMoreButtons.length);
    
    learnMoreButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const aboutSection = document.querySelector('#about');
            const mainContent = document.getElementById('main-content');
            
            if (aboutSection && mainContent && !mainContent.classList.contains('hidden')) {
                smoothScrollTo(aboutSection);
                console.log('Learn More clicked - scrolled to About');
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navMenu && navToggle && 
            !navMenu.contains(event.target) && 
            !navToggle.contains(event.target) &&
            navMenu.classList.contains('active')) {
            
        }
    });

    // Header scroll effects
    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateHeader() {
        const currentScrollY = window.scrollY;
        
        if (header) {
            // Enhanced scroll effects
            if (currentScrollY > 50) {
                header.style.backdropFilter = 'blur(25px)';
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.backdropFilter = 'blur(20px)';
                header.style.boxShadow = 'none';
            }

            // Hide/show header on scroll (desktop only)
            if (window.innerWidth > 768) {
                if (currentScrollY > lastScrollY && currentScrollY > 200) {
                    header.style.transform = 'translateY(-100%)';
                } else {
                    header.style.transform = 'translateY(0)';
                }
            }
        }
        
        lastScrollY = currentScrollY;
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });

    // Active navigation highlighting
    window.addEventListener('scroll', throttle(updateActiveNavigation, 100));
    
    console.log('✅ Navigation system initialized');
}

// Mobile menu helper functions
function toggleMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        const isActive = navMenu.classList.contains('active');
        console.log('Toggling mobile menu, currently active:', isActive);
        
        if (isActive) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }
}

function openMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.classList.add('active');
        navMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
        console.log('Mobile menu opened');
    }
}

function closeMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
        console.log('Mobile menu closed');
    }
}

// Smooth scrolling function - ENHANCED
function smoothScrollTo(element) {
    const header = document.getElementById('header');
    const headerHeight = header ? header.offsetHeight : 80;
    const targetPosition = element.offsetTop - headerHeight - 20;
    
    console.log('Smooth scrolling to position:', targetPosition);
    
    window.scrollTo({
        top: Math.max(0, targetPosition),
        behavior: 'smooth'
    });
}

// Active navigation highlighting - FIXED
function updateActiveNavigation() {
    const mainContent = document.getElementById('main-content');
    if (!mainContent || mainContent.classList.contains('hidden')) {
        return;
    }
    
    const sections = document.querySelectorAll('#main-content section[id]');
    const navLinks = document.querySelectorAll('.nav-link:not(.sponsors-link):not(.home-link)');
    const scrollPosition = window.scrollY + 200;
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = sectionId;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Sponsors Page Navigation - FIXED
function initializeSponsorsNavigation() {
    const sponsorsLink = document.querySelector('.sponsors-link');
    const homeLink = document.querySelector('.home-link');
    const backButton = document.getElementById('back-to-main');
    const mainContent = document.getElementById('main-content');
    const sponsorsContent = document.getElementById('sponsors-content');
    
    console.log('Sponsors navigation elements:', {
        sponsorsLink: !!sponsorsLink,
        homeLink: !!homeLink,
        backButton: !!backButton,
        mainContent: !!mainContent,
        sponsorsContent: !!sponsorsContent
    });
    
    function showSponsorsPage() {
        console.log('Showing sponsors page');
        if (mainContent && sponsorsContent) {
            mainContent.classList.add('hidden');
            sponsorsContent.classList.remove('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            updateNavActiveState('sponsors');
            
            console.log('✅ Navigated to sponsors page');
        }
    }
    
    function showMainPage() {
        console.log('Showing main page');
        if (mainContent && sponsorsContent) {
            sponsorsContent.classList.add('hidden');
            mainContent.classList.remove('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            updateNavActiveState('home');
            console.log('✅ Navigated to main page');
        }
    }
    
    function updateNavActiveState(page) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => link.classList.remove('active'));
        
        if (page === 'sponsors' && sponsorsLink) {
            sponsorsLink.classList.add('active');
        } else if (page === 'home' && homeLink) {
            homeLink.classList.add('active');
        }
    }
    
    // Event listeners
    if (sponsorsLink) {
        sponsorsLink.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Sponsors link clicked');
            showSponsorsPage();
        });
    }
    
    if (backButton) {
        backButton.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Back button clicked');
            showMainPage();
        });
    }
    
    if (homeLink) {
        homeLink.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Home link clicked');
            showMainPage();
        });
    }
    
    console.log('✅ Sponsors navigation initialized');
}

// Countdown Timer - ENHANCED
function initializeCountdown() {
    const targetDate = new Date('September 27, 2025 09:00:00').getTime();
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    console.log('Countdown elements found:', {
        days: !!daysElement,
        hours: !!hoursElement,
        minutes: !!minutesElement,
        seconds: !!secondsElement
    });

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            animateNumberChange(daysElement, days.toString().padStart(2, '0'));
            animateNumberChange(hoursElement, hours.toString().padStart(2, '0'));
            animateNumberChange(minutesElement, minutes.toString().padStart(2, '0'));
            animateNumberChange(secondsElement, seconds.toString().padStart(2, '0'));
        } else {
            // Event has started
            if (daysElement) daysElement.textContent = '00';
            if (hoursElement) hoursElement.textContent = '00';
            if (minutesElement) minutesElement.textContent = '00';
            if (secondsElement) secondsElement.textContent = '00';
        }
    }

    function animateNumberChange(element, newValue) {
        if (element && element.textContent !== newValue) {
            element.style.transform = 'scale(1.1)';
            element.style.transition = 'transform 0.2s ease, color 0.2s ease';
            
            setTimeout(() => {
                element.textContent = newValue;
                element.style.transform = 'scale(1)';
            }, 100);
        }
    }

    // Initial update and start interval
    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
    
    console.log('✅ Countdown timer initialized');
}

// Scroll Animations with Intersection Observer
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Animate cards and sections
    const animateElements = document.querySelectorAll('.card, .section-header');
    let elementCount = 0;
    
    animateElements.forEach(element => {
        if (!element.style.opacity) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            elementCount++;
        }
        fadeObserver.observe(element);
    });

    // Staggered animations for grids
    const gridContainers = document.querySelectorAll('.domains-grid, .contact-grid, .facilities-grid, .rules-grid, .tiers-grid');
    gridContainers.forEach(container => {
        const cards = container.querySelectorAll('.card');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });
    });
    
    console.log(`✅ Scroll animations initialized for ${elementCount} elements`);
}

// Animated Counters - ENHANCED
function initializeCounters() {
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statCards = entry.target.querySelectorAll('.stat-card[data-counter]');
                statCards.forEach(card => {
                    const targetValue = parseInt(card.getAttribute('data-counter'));
                    const numberElement = card.querySelector('.stat-number');
                    
                    if (targetValue && numberElement && numberElement.textContent === '0') {
                        console.log(`Starting counter animation for: ${targetValue}`);
                        animateCounter(numberElement, targetValue);
                    }
                });
                
                // Handle prize counter
                const prizeCounter = document.getElementById('prize-counter');
                if (prizeCounter && entry.target.contains(prizeCounter)) {
                    animatePrizeCounter();
                }
                
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const aboutStats = document.querySelector('.about-stats');
    const prizesSection = document.querySelector('.prizes');
    
    if (aboutStats) {
        statsObserver.observe(aboutStats);
    }
    if (prizesSection) {
        statsObserver.observe(prizesSection);
    }
    
    console.log('✅ Counter animations initialized');
}

// Counter animation function
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
            
            // Completion effect
            element.style.transform = 'scale(1.1)';
            element.style.transition = 'transform 0.3s ease';
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 300);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Prize counter animation
function animatePrizeCounter() {
    const prizeCounter = document.getElementById('prize-counter');
    if (!prizeCounter) {
        return;
    }
    
    console.log('Starting prize counter animation');
    
    let current = 0;
    const target = 50;
    const duration = 2500;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            prizeCounter.textContent = '₹50K+';
            clearInterval(timer);
            
            // Celebration effect
            prizeCounter.style.transform = 'scale(1.2)';
            prizeCounter.style.transition = 'transform 0.5s ease';
            setTimeout(() => {
                prizeCounter.style.transform = 'scale(1)';
            }, 500);
            
            console.log('Prize counter animation completed');
        } else {
            prizeCounter.textContent = `₹${Math.floor(current)}K+`;
        }
    }, 16);
}

// Interactive Effects
function initializeInteractiveEffects() {
    // Enhanced hover effects for cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Domain cards special effects
    const domainCards = document.querySelectorAll('.domain-card');
    domainCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.domain-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.domain-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });

    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Timeline marker animations
    const timelineMarkers = document.querySelectorAll('.timeline-marker');
    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const marker = entry.target;
                marker.style.transform = 'translateX(-50%) scale(1.2)';
                marker.style.transition = 'transform 0.3s ease';
                setTimeout(() => {
                    marker.style.transform = 'translateX(-50%) scale(1)';
                }, 300);
            }
        });
    }, { threshold: 0.5 });

    timelineMarkers.forEach(marker => {
        timelineObserver.observe(marker);
    });
    
    console.log('✅ Interactive effects initialized');
}

// Performance optimization: Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Accessibility improvements
document.addEventListener('keydown', function(e) {
    // Enter key for FAQ questions
    if (e.key === 'Enter' || e.key === ' ') {
        const activeElement = document.activeElement;
        if (activeElement && activeElement.classList.contains('faq-question')) {
            e.preventDefault();
            activeElement.click();
        }
    }
    
    // Escape key to close mobile menu
    if (e.key === 'Escape') {
        
    }
});

// Loading animation and initial setup
document.body.style.opacity = '0';
window.addEventListener('load', function() {
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
        
        // Trigger hero animations
        const heroElements = document.querySelectorAll('.hero .card, .hero h1, .hero p');
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                if (element.style.opacity !== undefined) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            }, index * 100);
        });
        
        console.log('✅ Page load animations completed');
    }, 100);
});

// Error handling
window.addEventListener('error', function(e) {
    console.warn('HackFusion: Non-critical error caught:', e.error?.message || e.message);
});

// Ensure theme is applied on page load
(function() {
    const savedTheme = localStorage.getItem('hackfusion-theme') || 'dark';
    document.documentElement.setAttribute('data-color-scheme', savedTheme);
    console.log('Theme applied on page load:', savedTheme);
})();

// Debug helper - remove in production
window.hackfusionDebug = {
    toggleTheme: () => {
        const toggle = document.getElementById('theme-toggle');
        if (toggle) toggle.click();
    },
    openFAQ: (index) => {
        const faqItems = document.querySelectorAll('.faq-question');
        if (faqItems[index]) faqItems[index].click();
    },
    showSponsors: () => {
        const link = document.querySelector('.sponsors-link');
        if (link) link.click();
    }
};

console.log('🎯 HackFusion 1.0 JavaScript fully loaded and ready!');