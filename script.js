// Particle Background
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random positioning
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random animation delay
        particle.style.animationDelay = Math.random() * 6 + 's';
        
        // Random colors
        const colors = ['#00D9FF', '#8B5FFF', '#00FF88'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        particlesContainer.appendChild(particle);
    }
}

// Navigation functionality
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Music toggle functionality
function initMusicToggle() {
    const musicToggle = document.getElementById('musicToggle');
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBzuL1PLatyMEL4TK8diNRgoUY7Xt66ZQDwpOo+Ptr2ERB');
    let isPlaying = false;

    musicToggle.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            musicToggle.style.background = 'var(--glass-color)';
        } else {
            audio.play().catch(() => {
                // Handle autoplay restriction
                console.log('Audio autoplay blocked');
            });
            musicToggle.style.background = 'var(--primary-color)';
        }
        isPlaying = !isPlaying;
    });

    audio.loop = true;
    audio.volume = 0.3;
}

// Tech sphere animation
function animateTechSphere() {
    const sphere = document.getElementById('techSphere');
    let rotation = 0;

    function rotate() {
        rotation += 0.5;
        sphere.style.transform = `rotateY(${rotation}deg) rotateX(${rotation * 0.5}deg)`;
        requestAnimationFrame(rotate);
    }

    rotate();
}

// Skills radar chart
function createSkillsChart() {
    const canvas = document.getElementById('skillsChart');
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 150;

    const skills = [
        { name: 'Machine Learning', value: 90 },
        { name: 'Python', value: 95 },
        { name: 'Data Visualization', value: 85 },
        { name: 'Full Stack Dev', value: 80 },
        { name: 'AI Development', value: 88 },
        { name: 'Analytics', value: 82 }
    ];

    const colors = ['#00D9FF', '#8B5FFF', '#00FF88', '#FFB800', '#FF5555', '#FF8C00'];

    function drawRadarChart() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw background circles
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 1;
        for (let i = 1; i <= 5; i++) {
            ctx.beginPath();
            ctx.arc(centerX, centerY, (radius / 5) * i, 0, Math.PI * 2);
            ctx.stroke();
        }

        // Draw axes
        const angleStep = (Math.PI * 2) / skills.length;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        
        for (let i = 0; i < skills.length; i++) {
            const angle = i * angleStep - Math.PI / 2;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(x, y);
            ctx.stroke();

            // Draw skill labels
            ctx.fillStyle = '#FFFFFF';
            ctx.font = '12px Inter';
            ctx.textAlign = 'center';
            const labelX = centerX + Math.cos(angle) * (radius + 20);
            const labelY = centerY + Math.sin(angle) * (radius + 20);
            ctx.fillText(skills[i].name, labelX, labelY);
        }

        // Draw skill polygon
        ctx.beginPath();
        ctx.strokeStyle = '#00D9FF';
        ctx.fillStyle = 'rgba(0, 217, 255, 0.2)';
        ctx.lineWidth = 2;

        for (let i = 0; i < skills.length; i++) {
            const angle = i * angleStep - Math.PI / 2;
            const value = (skills[i].value / 100) * radius;
            const x = centerX + Math.cos(angle) * value;
            const y = centerY + Math.sin(angle) * value;

            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }

            // Draw skill points
            ctx.save();
            ctx.fillStyle = colors[i % colors.length];
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }

    drawRadarChart();

    // Animate chart on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                let progress = 0;
                const animate = () => {
                    progress += 0.02;
                    if (progress <= 1) {
                        // Animate skill values
                        skills.forEach(skill => {
                            skill.currentValue = skill.value * progress;
                        });
                        drawRadarChart();
                        requestAnimationFrame(animate);
                    }
                };
                animate();
            }
        });
    });

    observer.observe(canvas);
}

// Project demos
function initProjectDemos() {
    const demoBtns = document.querySelectorAll('.demo-btn');
    const modal = document.getElementById('demoModal');
    const modalBody = document.getElementById('modalBody');
    const modalClose = document.getElementById('modalClose');

    const demoContent = {
        'flight-prediction': {
            title: 'Flight Price Forecasting Demo',
            content: `
                <div class="demo-content">
                    <h3>Flight Price Forecasting & Sentiment Analysis</h3>
                    <div class="demo-placeholder">
                        <div>
                            <p>🛫 Interactive ML Demo</p>
                            <p>Enter flight details to get price predictions</p>
                            <p>View sentiment analysis of airline reviews</p>
                        </div>
                    </div>
                    <p>This application uses advanced machine learning algorithms to predict flight prices and analyze customer sentiment from reviews.</p>
                </div>
            `
        },
        'data-visualizer': {
            title: 'AI Data Visualizer Demo',
            content: `
                <div class="demo-content">
                    <h3>AI-Powered Data Visualizer</h3>
                    <div class="demo-placeholder">
                        <div>
                            <p>📊 Smart Visualization Engine</p>
                            <p>Upload data and get AI-generated insights</p>
                            <p>Interactive charts and dashboards</p>
                        </div>
                    </div>
                    <p>This platform automatically generates meaningful visualizations and insights from your data using AI algorithms.</p>
                </div>
            `
        },
        'code-phantoms': {
            title: 'Code Phantoms Demo',
            content: `
                <div class="demo-content">
                    <h3>Code Phantoms Project</h3>
                    <div class="demo-placeholder">
                        <div>
                            <p>👻 Team Collaboration Platform</p>
                            <p>Advanced software engineering practices</p>
                            <p>Collaborative development tools</p>
                        </div>
                    </div>
                    <p>A collaborative project showcasing advanced programming concepts and team-based software engineering practices.</p>
                </div>
            `
        }
    };

    demoBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const demoType = btn.getAttribute('data-demo');
            const demo = demoContent[demoType];
            
            if (demo) {
                modalBody.innerHTML = demo.content;
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    modalClose.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Contact form functionality
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulate form submission
        const submitBtn = form.querySelector('.btn');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<span>Sending...</span>';
        submitBtn.style.opacity = '0.7';
        
        setTimeout(() => {
            submitBtn.innerHTML = '<span>Message Sent!</span>';
            submitBtn.style.background = 'var(--success-color)';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.style.opacity = '1';
                form.reset();
            }, 2000);
        }, 1500);
    });
}

// Scroll animations
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.timeline-item, .project-card, .cert-card, .achievement-card');
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// Navbar scroll effect
function initNavbarScroll() {
    const nav = document.querySelector('.nav');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(10, 10, 15, 0.95)';
            nav.style.backdropFilter = 'blur(20px)';
        } else {
            nav.style.background = 'rgba(10, 10, 15, 0.9)';
        }
    });
}

// Certificate hover effects
function initCertificateHovers() {
    const certCards = document.querySelectorAll('.cert-card');
    
    certCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateX(10px) scale(1.02)';
            card.style.boxShadow = '0 10px 30px rgba(0, 217, 255, 0.3)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateX(0) scale(1)';
            card.style.boxShadow = 'none';
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    initNavigation();
    initMusicToggle();
    animateTechSphere();
    createSkillsChart();
    initProjectDemos();
    initContactForm();
    initScrollAnimations();
    initNavbarScroll();
    initCertificateHovers();
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Add floating elements on mouse move
document.addEventListener('mousemove', (e) => {
    const cursor = { x: e.clientX, y: e.clientY };
    
    // Create floating particles on mouse move
    if (Math.random() > 0.98) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = cursor.x + 'px';
        particle.style.top = cursor.y + 'px';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = '#00D9FF';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '999';
        particle.style.animation = 'fadeOut 2s ease forwards';
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 2000);
    }
});

// Add fadeOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        0% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0) translateY(-50px);
        }
    }
`;
document.head.appendChild(style);

// Performance optimization: Throttle scroll events
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

// Apply throttling to scroll-heavy functions
window.addEventListener('scroll', throttle(() => {
    // Any additional scroll-based animations can go here
}, 16)); // ~60fps