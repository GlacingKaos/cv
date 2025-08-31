// Clases principales para funcionalidades del sitio web

class ThemeManager {
    constructor() {
        // Detectar preferencia del sistema si no hay preferencia guardada
        this.systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.theme = localStorage.getItem('theme') || (this.systemPrefersDark ? 'dark' : 'light');
        this.themeToggle = document.getElementById('theme-toggle');
        this.themeIndicator = document.getElementById('theme-indicator');
        this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        this.isFollowingSystem = !localStorage.getItem('theme');
        this.init();
    }

    init() {
        this.applyTheme();
        this.bindEvents();
        this.watchSystemTheme();
        this.updateIndicator();
    }

    watchSystemTheme() {
        // Escuchar cambios en la preferencia del sistema
        this.mediaQuery.addEventListener('change', (e) => {
            // Solo aplicar automáticamente si el usuario no ha establecido una preferencia manual
            if (this.isFollowingSystem) {
                this.theme = e.matches ? 'dark' : 'light';
                this.applyTheme();

                // Tracking para Google Analytics
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'theme_auto_change', {
                        'theme': this.theme,
                        'source': 'system'
                    });
                }
            }
        });
    }

    updateIndicator() {
        if (this.isFollowingSystem) {
            this.themeIndicator.classList.add('system-theme');
            this.themeToggle.setAttribute('title', 'Siguiendo tema del sistema | Click: cambiar tema | Doble click: seguir sistema');
        } else {
            this.themeIndicator.classList.remove('system-theme');
            this.themeToggle.setAttribute('title', 'Tema manual | Click: cambiar tema | Doble click: seguir sistema');
        }
    }

    applyTheme() {
        // Si está siguiendo el tema del sistema, no establecer data-theme
        // para permitir que CSS use prefers-color-scheme
        if (this.isFollowingSystem) {
            document.documentElement.removeAttribute('data-theme');
        } else {
            document.documentElement.setAttribute('data-theme', this.theme);
        }

        const icon = this.themeToggle.querySelector('i');

        // Actualizar icono del toggle
        if (this.theme === 'dark') {
            icon.className = 'fas fa-sun';
            this.themeToggle.setAttribute('aria-label', 'Cambiar a tema claro');
        } else {
            icon.className = 'fas fa-moon';
            this.themeToggle.setAttribute('aria-label', 'Cambiar a tema oscuro');
        }

        this.updateIndicator();
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        this.isFollowingSystem = false;
        localStorage.setItem('theme', this.theme);
        this.applyTheme();

        // Tracking para Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'theme_change', {
                'theme': this.theme,
                'source': 'manual'
            });
        }
    }

    // Método para resetear a la preferencia del sistema
    resetToSystemTheme() {
        localStorage.removeItem('theme');
        this.isFollowingSystem = true;
        this.theme = this.mediaQuery.matches ? 'dark' : 'light';
        this.applyTheme();

        if (typeof gtag !== 'undefined') {
            gtag('event', 'theme_reset_to_system', {
                'theme': this.theme
            });
        }

        // Mostrar feedback visual
        this.showSystemThemeNotification();
    }

    showSystemThemeNotification() {
        // Crear notificación temporal
        const notification = document.createElement('div');
        notification.className = 'theme-notification';
        notification.textContent = 'Siguiendo tema del sistema';
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: var(--accent-color);
            color: var(--text-light);
            padding: 12px 20px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            z-index: 9999;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Animar entrada
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remover después de 3 segundos
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    bindEvents() {
        this.themeToggle.addEventListener('click', () => this.toggleTheme());

        // Doble click para resetear a preferencia del sistema
        this.themeToggle.addEventListener('dblclick', () => this.resetToSystemTheme());
    }
}class MobileNavigation {
    constructor() {
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }

    init() {
        this.bindEvents();
    }

    toggleMenu() {
        this.hamburger.classList.toggle('active');
        this.navMenu.classList.toggle('active');

        // Prevenir scroll del body cuando el menú está abierto
        if (this.navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    closeMenu() {
        this.hamburger.classList.remove('active');
        this.navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    bindEvents() {
        this.hamburger.addEventListener('click', () => this.toggleMenu());

        // Cerrar menú al hacer clic en un enlace
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });

        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (!this.hamburger.contains(e.target) && !this.navMenu.contains(e.target)) {
                this.closeMenu();
            }
        });
    }
}

class SmoothScrolling {
    constructor() {
        this.navbarHeight = 70;
        this.init();
    }

    init() {
        this.bindEvents();
    }

    scrollToSection(targetId) {
        const targetElement = document.getElementById(targetId);
        if (!targetElement) return;

        const targetPosition = targetElement.offsetTop - this.navbarHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    bindEvents() {
        // Manejar clicks en enlaces de navegación
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                this.scrollToSection(targetId);

                // Tracking para Google Analytics
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'navigation_click', {
                        'target_section': targetId
                    });
                }
            });
        });
    }
}

class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }

    init() {
        this.setupObserver();
        this.observeElements();
    }

    setupObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    entry.target.classList.remove('hidden');
                }
            });
        }, this.observerOptions);
    }

    observeElements() {
        // Elementos que se animan al entrar en vista
        const elementsToAnimate = [
            '.certification-card',
            '.timeline-item',
            '.project-card',
            '.skill-item',
            '.education-card',
            '.contact-card',
            '.language-item'
        ];

        elementsToAnimate.forEach(selector => {
            document.querySelectorAll(selector).forEach((element, index) => {
                element.classList.add('hidden');
                element.style.transitionDelay = `${index * 0.1}s`;
                this.observer.observe(element);
            });
        });
    }
}

class SkillsAnimator {
    constructor() {
        this.skillBars = document.querySelectorAll('.skill-progress');
        this.languageBars = document.querySelectorAll('.language-progress');
        this.animated = false;
        this.init();
    }

    init() {
        this.setupObserver();
    }

    setupObserver() {
        const skillsSection = document.getElementById('skills');
        const educationSection = document.getElementById('education');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animated) {
                    this.animateSkills();
                    this.animateLanguages();
                    this.animated = true;
                }
            });
        }, { threshold: 0.3 });

        if (skillsSection) observer.observe(skillsSection);
        if (educationSection) observer.observe(educationSection);
    }

    animateSkills() {
        this.skillBars.forEach((bar, index) => {
            setTimeout(() => {
                const skillLevel = bar.dataset.skill;
                bar.style.width = `${skillLevel}%`;
            }, index * 200);
        });
    }

    animateLanguages() {
        this.languageBars.forEach((bar, index) => {
            setTimeout(() => {
                const languageLevel = bar.dataset.language;
                bar.style.width = `${languageLevel}%`;
            }, index * 300);
        });
    }
}

class ActiveNavigation {
    constructor() {
        this.sections = document.querySelectorAll('section[id]');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateActiveLink(); // Inicializar al cargar
    }

    updateActiveLink() {
        let current = '';
        const scrollPos = window.scrollY + 100;

        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    bindEvents() {
        window.addEventListener('scroll', this.throttle(() => {
            this.updateActiveLink();
        }, 100));
    }

    throttle(func, limit) {
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
}

class CVDownloader {
    constructor() {
        this.downloadLinks = document.querySelectorAll('a[download]');
        this.init();
    }

    init() {
        this.bindEvents();
    }

    trackDownload(filename) {
        // Google Analytics tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', 'file_download', {
                'file_name': filename,
                'file_extension': filename.split('.').pop()
            });
        }

        console.log(`CV descargado: ${filename}`);
    }

    bindEvents() {
        this.downloadLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const filename = link.getAttribute('href').split('/').pop();
                this.trackDownload(filename);
            });
        });
    }
}

class ContactHandler {
    constructor() {
        this.contactLinks = document.querySelectorAll('.contact-btn, .hero-actions .btn');
        this.init();
    }

    init() {
        this.bindEvents();
    }

    trackContactAction(action, platform) {
        // Google Analytics tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', 'contact_action', {
                'action': action,
                'platform': platform
            });
        }

        console.log(`Acción de contacto: ${action} via ${platform}`);
    }

    bindEvents() {
        this.contactLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                let platform = 'unknown';
                let action = 'click';

                if (href.includes('mailto:')) {
                    platform = 'email';
                    action = 'email_open';
                } else if (href.includes('wa.me')) {
                    platform = 'whatsapp';
                    action = 'whatsapp_open';
                } else if (href.includes('linkedin.com')) {
                    platform = 'linkedin';
                    action = 'linkedin_visit';
                } else if (href.includes('github.com')) {
                    platform = 'github';
                    action = 'github_visit';
                } else if (href.startsWith('#')) {
                    platform = 'internal';
                    action = 'section_navigate';
                }

                this.trackContactAction(action, platform);
            });
        });
    }
}

class PerformanceOptimizer {
    constructor() {
        this.images = document.querySelectorAll('img[src]');
        this.init();
    }

    init() {
        this.setupLazyLoading();
        this.optimizeScrollEvents();
    }

    setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            });

            this.images.forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    optimizeScrollEvents() {
        let ticking = false;

        const optimizedScrollHandler = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    // Aquí van los handlers de scroll optimizados
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', optimizedScrollHandler, { passive: true });
    }
}

class AccessibilityEnhancer {
    constructor() {
        this.init();
    }

    init() {
        this.setupKeyboardNavigation();
        this.setupFocusManagement();
        this.setupAriaAttributes();
    }

    setupKeyboardNavigation() {
        // Navegación con teclado para el menú hamburguesa
        const hamburger = document.getElementById('hamburger');
        if (hamburger) {
            hamburger.setAttribute('tabindex', '0');
            hamburger.setAttribute('role', 'button');
            hamburger.setAttribute('aria-label', 'Abrir menú de navegación');

            hamburger.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    hamburger.click();
                }
            });
        }

        // Escape para cerrar menú móvil
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const navMenu = document.querySelector('.nav-menu');
                if (navMenu && navMenu.classList.contains('active')) {
                    document.querySelector('.hamburger').click();
                }
            }
        });
    }

    setupFocusManagement() {
        // Mejorar la gestión del foco en elementos interactivos
        const interactiveElements = document.querySelectorAll('a, button, input, select, textarea');

        interactiveElements.forEach(element => {
            element.addEventListener('focus', () => {
                element.classList.add('focused');
            });

            element.addEventListener('blur', () => {
                element.classList.remove('focused');
            });
        });
    }

    setupAriaAttributes() {
        // Añadir atributos ARIA dinámicamente donde sea necesario
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
            const skillLevel = bar.dataset.skill;
            bar.setAttribute('role', 'progressbar');
            bar.setAttribute('aria-valuenow', skillLevel);
            bar.setAttribute('aria-valuemin', '0');
            bar.setAttribute('aria-valuemax', '100');
        });

        // Mejorar la accesibilidad de las tarjetas
        const cards = document.querySelectorAll('.certification-card, .project-card, .contact-card');
        cards.forEach(card => {
            card.setAttribute('tabindex', '0');
        });
    }
}

class AnalyticsTracker {
    constructor() {
        this.init();
    }

    init() {
        this.setupPageTracking();
        this.setupEventTracking();
    }

    setupPageTracking() {
        // Tracking básico de página
        if (typeof gtag !== 'undefined') {
            gtag('event', 'page_view', {
                'page_title': document.title,
                'page_location': window.location.href
            });
        }
    }

    setupEventTracking() {
        // Tracking de tiempo en página
        let startTime = Date.now();

        window.addEventListener('beforeunload', () => {
            const timeSpent = Math.round((Date.now() - startTime) / 1000);
            if (typeof gtag !== 'undefined') {
                gtag('event', 'time_on_page', {
                    'value': timeSpent
                });
            }
        });

        // Tracking de scroll depth
        let maxScroll = 0;
        window.addEventListener('scroll', this.throttle(() => {
            const scrollPercent = Math.round(
                (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
            );

            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;

                // Tracking en hitos de 25%
                if (maxScroll >= 25 && maxScroll < 50) {
                    this.trackScrollMilestone(25);
                } else if (maxScroll >= 50 && maxScroll < 75) {
                    this.trackScrollMilestone(50);
                } else if (maxScroll >= 75 && maxScroll < 100) {
                    this.trackScrollMilestone(75);
                } else if (maxScroll >= 100) {
                    this.trackScrollMilestone(100);
                }
            }
        }, 250));
    }

    trackScrollMilestone(percent) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'scroll_milestone', {
                'percent': percent
            });
        }
    }

    throttle(func, limit) {
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
}

class ErrorHandler {
    constructor() {
        this.init();
    }

    init() {
        this.setupGlobalErrorHandling();
    }

    setupGlobalErrorHandling() {
        window.addEventListener('error', (e) => {
            console.error('Error capturado:', e);

            // Tracking de errores en Google Analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'exception', {
                    'description': e.message,
                    'fatal': false
                });
            }
        });

        window.addEventListener('unhandledrejection', (e) => {
            console.error('Promise rechazada:', e);

            if (typeof gtag !== 'undefined') {
                gtag('event', 'exception', {
                    'description': 'Unhandled Promise Rejection',
                    'fatal': false
                });
            }
        });
    }
}

// Inicialización del sitio web
class WebsiteManager {
    constructor() {
        this.components = [];
        this.init();
    }

    init() {
        // Esperar a que el DOM esté completamente cargado
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
        } else {
            this.initializeComponents();
        }
    }

    initializeComponents() {
        try {
            // Inicializar todos los componentes
            this.components = [
                new ErrorHandler(),
                new ThemeManager(),
                new MobileNavigation(),
                new SmoothScrolling(),
                new ScrollAnimations(),
                new SkillsAnimator(),
                new ActiveNavigation(),
                new CVDownloader(),
                new ContactHandler(),
                new PerformanceOptimizer(),
                new AccessibilityEnhancer(),
                new AnalyticsTracker()
            ];

            console.log('Sitio web inicializado correctamente');

            // Tracking de inicialización exitosa
            if (typeof gtag !== 'undefined') {
                gtag('event', 'website_initialized', {
                    'components_loaded': this.components.length
                });
            }

        } catch (error) {
            console.error('Error al inicializar el sitio web:', error);

            if (typeof gtag !== 'undefined') {
                gtag('event', 'exception', {
                    'description': 'Website initialization failed',
                    'fatal': true
                });
            }
        }
    }
}

// Inicializar el sitio web
const website = new WebsiteManager();
