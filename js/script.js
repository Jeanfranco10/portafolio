/* ===================================
   PORTFOLIO - JAVASCRIPT
   =================================== */

document.addEventListener('DOMContentLoaded', function() {
    // ===================================
    // NAVBAR SCROLL EFFECT
    // ===================================
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 25, 47, 0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(10, 25, 47, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // ===================================
    // MOBILE MENU TOGGLE
    // ===================================
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animate hamburger to X
        const spans = navToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // ===================================
    // SCROLL SPY - Active Nav Link
    // ===================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function scrollSpy() {
        const scrollY = window.scrollY;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', scrollSpy);

    // ===================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ===================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===================================
    // FADE-IN ANIMATION ON SCROLL
    // ===================================
    const fadeElements = document.querySelectorAll('.fade-in');
    
    // Add fade-in class to elements
    const elementsToAnimate = [
        '.hero-content',
        '.hero-image',
        '.about-text',
        '.stat-item',
        '.skill-category',
        '.project-card',
        '.contact-link',
        '.projects-more'
    ];
    
    elementsToAnimate.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('fade-in');
        });
    });
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // ===================================
    // TYPING EFFECT FOR HERO TITLE
    // ===================================
    const heroTitle = document.querySelector('.hero-title');
    const titles = ['Full Stack Developer', 'Java Developer', 'React Developer', 'Node.js Developer'];
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeEffect() {
        const currentTitle = titles[titleIndex];
        
        if (isDeleting) {
            heroTitle.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            heroTitle.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentTitle.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typingSpeed = 500; // Pause before next word
        }
        
        setTimeout(typeEffect, typingSpeed);
    }
    
    // Start typing effect after page loads
    setTimeout(typeEffect, 1000);

    // ===================================
    // STAT COUNTER ANIMATION
    // ===================================
    function animateCounter(element, target, suffix = '') {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + suffix;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + suffix;
            }
        }, 30);
    }
    
    // Observe stat items for counter animation
    const statObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('.stat-number');
                const text = statNumber.textContent;
                
                if (text === '18+') {
                    animateCounter(statNumber, 18, '+');
                } else if (text === '5+') {
                    animateCounter(statNumber, 5, '+');
                }
                
                statObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.stat-item').forEach(item => {
        statObserver.observe(item);
    });

    // ===================================
    // PROJECT CARD TILT EFFECT
    // ===================================
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // ===================================
    // SKILL BADGE HOVER SOUND (OPTIONAL)
    // ===================================
    // Uncomment if you want a subtle click sound
    /*
    document.querySelectorAll('.skill-badge').forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            const audio = new Audio('data:audio/wav;base64,...'); // Short click sound
            audio.volume = 0.1;
            audio.play();
        });
    });
    */

    // ===================================
    // CONSOLE EASTER EGG
    // ===================================
    console.log('%c👋 Hola! Soy Jean Franco', 'color: #64FFDA; font-size: 20px; font-weight: bold;');
    console.log('%cFull Stack Developer | Lima, Perú', 'color: #8892B0; font-size: 14px;');
    console.log('%c¡Gracias por visitar mi portafolio!', 'color: #CCD6F6; font-size: 12px;');
});