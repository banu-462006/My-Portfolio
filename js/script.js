/**
 * PORTFOLIO CLIENT-SIDE SCRIPT
 * Handles Theme Toggling, Project Filtering, Interactive Modals,
 * Scroll Spy, Smooth Navigation, and Toast Feedback.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initTypingEffect();
  initProjectFilters();
  initProjectModal();
  initContactForm();
  initClipboardCopy();
  initScrollEffects();
  initYear();
});

function initYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/* ===================================================================
   1. THEME TOGGLING (Dark / Light Mode)
   =================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');
  
  // Check persisted theme or system preference
  const savedTheme = localStorage.getItem('portfolio-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'dark'); // default dark for modern tech look

  setTheme(initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
    
    if (themeIcon) {
      if (theme === 'light') {
        themeIcon.className = 'fas fa-moon';
        themeToggleBtn.setAttribute('aria-label', 'Switch to dark theme');
      } else {
        themeIcon.className = 'fas fa-sun';
        themeToggleBtn.setAttribute('aria-label', 'Switch to light theme');
      }
    }
  }
}

/* ===================================================================
   2. NAVIGATION & MOBILE MENU
   =================================================================== */
function initNavigation() {
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const navbar = document.getElementById('navbar');

  // Toggle mobile dropdown
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      navMenu.classList.toggle('open');
    });

    // Close menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('open');
      });
    });
  }

  // Navbar glass blur background on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Active link scroll spy
  const sections = document.querySelectorAll('section[id]');
  
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.pageYOffset + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
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
}

/* ===================================================================
   3. TYPING EFFECT IN HERO
   =================================================================== */
function initTypingEffect() {
  const typingElement = document.getElementById('typing-text');
  if (!typingElement) return;

  const roles = [
    'Full Stack Developer',
    'Software Engineer',
    'Creative Problem Solver',
    'UI/UX Enthusiast'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 90;
  const deleteSpeed = 45;
  const delayBetweenRoles = 1800;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      setTimeout(type, delayBetweenRoles);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(type, 350);
    } else {
      setTimeout(type, isDeleting ? deleteSpeed : typeSpeed);
    }
  }

  setTimeout(type, 600);
}

/* ===================================================================
   4. PROJECT CATEGORY FILTERS
   =================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ===================================================================
   5. PROJECT DETAILS MODAL
   =================================================================== */
const projectsData = {
  'project-1': {
    title: 'Quantum Analytics SaaS Platform',
    badge: 'Full Stack / Cloud',
    image: 'assets/images/project-analytics.jpg',
    description: 'A modern, high-throughput cloud analytics application built for engineering teams. Features real-time telemetry streaming, interactive metric dashboards, microservice latency breakdown, and custom anomaly alerts.',
    features: [
      'Interactive visual charts powered by Chart.js and SVG metrics',
      'Secure JWT authentication with role-based dashboard permissions',
      'Server-sent events (SSE) for sub-second telemetry updates',
      'Exportable audit reports in CSV and PDF formats'
    ],
    techStack: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'PostgreSQL', 'Docker'],
    github: 'https://github.com',
    demo: 'https://demo.example.com'
  },
  'project-2': {
    title: 'Aura Minimalist E-Commerce Storefront',
    badge: 'Frontend / E-Commerce',
    image: 'assets/images/project-ecommerce.jpg',
    description: 'An elegant, high-conversion lifestyle e-commerce web application. Built with high attention to typography, micro-interactions, responsive shopping bag drawer, and seamless checkout UX.',
    features: [
      'Instant client-side cart drawer with local storage persistence',
      'Dynamic product filtering by price, category, and size',
      'Optimized responsive imagery with lazy loading and high LCP performance',
      'Integrated mock Stripe checkout flow with real-time card validation'
    ],
    techStack: ['JavaScript (ES6+)', 'Modern CSS', 'HTML5', 'REST API', 'Stripe API'],
    github: 'https://github.com',
    demo: 'https://demo.example.com'
  },
  'project-3': {
    title: 'Code Synapse: AI Developer Studio',
    badge: 'AI / Developer Tools',
    image: 'assets/images/project-ai-studio.jpg',
    description: 'An interactive developer cockpit combining multi-tab code editing with real-time AI code explanation, AST syntax tree analysis, and prompt engineering scratchpads.',
    features: [
      'Real-time streaming LLM code explanations and test generation',
      'Interactive syntax highlighted editor with split preview',
      'Visual neural network pipeline execution flowchart',
      'Dark mode tuned for long-hour developer ergonomics'
    ],
    techStack: ['React', 'Python', 'FastAPI', 'Gemini API', 'Tailwind CSS', 'WebSockets'],
    github: 'https://github.com',
    demo: 'https://demo.example.com'
  }
};

function initProjectModal() {
  const modalOverlay = document.getElementById('project-modal');
  const modalClose = document.getElementById('modal-close');
  const viewDetailsButtons = document.querySelectorAll('.view-project-details');

  if (!modalOverlay) return;

  viewDetailsButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      const data = projectsData[projectId];

      if (data) {
        document.getElementById('modal-title').textContent = data.title;
        document.getElementById('modal-badge').textContent = data.badge;
        document.getElementById('modal-img').src = data.image;
        document.getElementById('modal-img').alt = data.title;
        document.getElementById('modal-description').textContent = data.description;

        // Render features
        const featuresList = document.getElementById('modal-features');
        featuresList.innerHTML = '';
        data.features.forEach(f => {
          const li = document.createElement('li');
          li.className = 'achievement-item';
          li.textContent = f;
          featuresList.appendChild(li);
        });

        // Render tech stack tags
        const techContainer = document.getElementById('modal-tech');
        techContainer.innerHTML = '';
        data.techStack.forEach(t => {
          const tag = document.createElement('span');
          tag.className = 'tag-badge';
          tag.textContent = t;
          techContainer.appendChild(tag);
        });

        // Set action links
        document.getElementById('modal-github-link').href = data.github;
        document.getElementById('modal-demo-link').href = data.demo;

        // Show modal
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Close modal
  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ===================================================================
   6. CONTACT FORM & FEEDBACK
   =================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    if (!name || !email || !message) {
      showToast('Please fill out all required fields.', 'fa-exclamation-circle');
      return;
    }

    // Email pattern check
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      showToast('Please enter a valid email address.', 'fa-exclamation-circle');
      return;
    }

    // Submit state simulation
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      form.reset();
      showToast('Message sent successfully! I will reply soon.', 'fa-check-circle');
    }, 1000);
  });
}

/* ===================================================================
   7. COPY EMAIL TO CLIPBOARD
   =================================================================== */
function initClipboardCopy() {
  const copyBtn = document.getElementById('copy-email-btn');
  if (!copyBtn) return;

  copyBtn.addEventListener('click', () => {
    const emailToCopy = copyBtn.getAttribute('data-email') || 'alex.developer@example.com';
    
    navigator.clipboard.writeText(emailToCopy).then(() => {
      showToast('Email address copied to clipboard!', 'fa-copy');
      const originalText = copyBtn.textContent;
      copyBtn.textContent = 'Copied!';
      setTimeout(() => {
        copyBtn.textContent = originalText;
      }, 2000);
    }).catch(() => {
      showToast('Failed to copy. Please manually select the email.', 'fa-exclamation-circle');
    });
  });
}

/* ===================================================================
   8. TOAST NOTIFICATION HELPER
   =================================================================== */
function showToast(message, iconClass = 'fa-info-circle') {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast-notification';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i class="fas ${iconClass}"></i> <span>${message}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

/* ===================================================================
   9. SCROLL REVEAL / SUBTLE MOTION
   =================================================================== */
function initScrollEffects() {
  // Reveal elements on scroll
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.project-card, .skills-category-card, .timeline-card, .contact-card').forEach(el => {
    observer.observe(el);
  });
}
