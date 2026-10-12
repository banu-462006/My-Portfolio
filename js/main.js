/**
 * PORTFOLIO JAVASCRIPT
 * Interactive features: Theming, Filtering, Typewriter, Mobile Menu, Modals & Form validation.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileMenu();
  initTypewriter();
  initProjectFiltering();
  initProjectModal();
  initScrollSpy();
  initBackToTop();
  initContactForm();
});

/* ==========================================================================
   1. Theme Management (Dark / Light Mode)
   ========================================================================== */
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('portfolio-theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Set initial theme
  const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', initialTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
    });
  }

  // Listen to system preference changes if user hasn't explicitly set one
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('portfolio-theme')) {
      document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    }
  });
}

/* ==========================================================================
   2. Mobile Navigation Menu
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');
  const navItems = document.querySelectorAll('.nav-link');

  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', isOpen);
  });

  // Close mobile menu when clicking any nav link
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !toggleBtn.contains(e.target) && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ==========================================================================
   3. Hero Section Typewriter Effect
   ========================================================================== */
function initTypewriter() {
  const typewriterElement = document.getElementById('typewriter-text');
  if (!typewriterElement) return;

  const roles = [
    'Python Developer',
    'AI & Machine Learning Enthusiast',
    'NLP & Deep Learning Explorer',
    'Web Developer'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 110;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      // Pause at full word
      typingSpeed = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   4. Project Category Filtering
   ========================================================================== */
function initProjectFiltering() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterButtons.length || !projectCards.length) return;

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Update active state
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   5. Project Details Modal
   ========================================================================== */
const projectDetailsData = {
  'project-1': {
    title: 'Farmer-to-Customer Green Cart',
    category: 'Web Platform & MySQL',
    description: 'A dedicated web platform designed to empower agricultural producers by connecting farmers directly with customers, eliminating intermediaries. Provides transparent market pricing, fresh farm inventory management, and a clean buying workflow.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'MySQL', 'Responsive UI'],
    highlights: [
      'Developed a direct farm-to-consumer marketplace interface, eliminating distributor commissions.',
      'Designed responsive product catalog layouts with clear pricing, farm details, and categorization.',
      'Integrated MySQL database backend to manage farm produce inventory, stock levels, and customer orders.',
      'Engineered an intuitive shopping cart and checkout interface for seamless customer ordering.'
    ],
    github: 'https://github.com/banu-462006',
    demo: 'https://github.com/banu-462006'
  },
  'project-2': {
    title: 'Terra Bloom – Healthy & Organic Food Ordering',
    category: 'Responsive Web Application',
    description: 'A modern, responsive organic food ordering website designed for healthy lifestyle enthusiasts. Features aesthetic signature meal presentations, customizable ingredients, real-time shopping cart calculation, and smooth checkout flow.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'CSS Grid', 'Flexbox'],
    highlights: [
      'Designed visually appetizing food menus featuring bowls, salads, and organic dishes.',
      'Built a reactive shopping cart with item additions, quantity management, and automatic subtotal updates.',
      'Engineered multi-step checkout workflow with customer details validation and order confirmation modal.',
      'Optimized layout for fast load times and seamless responsiveness across mobile, tablet, and desktop screens.'
    ],
    github: 'https://github.com/banu-462006',
    demo: 'https://github.com/banu-462006'
  },
  'project-3': {
    title: 'NLP-Based Conversational Chatbot',
    category: 'AI & Natural Language Processing',
    description: 'An intelligent conversational AI agent built with Python and Natural Language Processing. Analyzes user queries through text preprocessing pipelines, scores emotional sentiment, maps intents, and generates relevant, contextual responses.',
    technologies: ['Python', 'NLP', 'NLTK', 'Sentiment Analysis', 'Machine Learning', 'Text Preprocessing'],
    highlights: [
      'Implemented full text preprocessing pipeline: tokenization, stop-word filtering, and lemmatization.',
      'Integrated sentiment analysis to identify user sentiment (positive, neutral, negative) and tailor responses.',
      'Engineered intent-classification algorithms with dynamic fallback handling for unknown queries.',
      'Demonstrated core machine learning and Python data processing practices for real-world conversational AI.'
    ],
    github: 'https://github.com/banu-462006',
    demo: 'https://github.com/banu-462006'
  }
};

function initProjectModal() {
  const modal = document.getElementById('project-modal');
  const modalClose = document.getElementById('modal-close');
  const viewDetailBtns = document.querySelectorAll('.view-project-btn');

  if (!modal) return;

  function openModal(projectId) {
    const data = projectDetailsData[projectId];
    if (!data) return;

    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-category').textContent = data.category;
    document.getElementById('modal-desc').textContent = data.description;

    // Tech tags
    const tagsContainer = document.getElementById('modal-tags');
    tagsContainer.innerHTML = '';
    data.technologies.forEach(tech => {
      const span = document.createElement('span');
      span.className = 'tag';
      span.textContent = tech;
      tagsContainer.appendChild(span);
    });

    // Highlights list
    const highlightsContainer = document.getElementById('modal-highlights');
    highlightsContainer.innerHTML = '';
    data.highlights.forEach(item => {
      const li = document.createElement('li');
      li.style.marginBottom = '0.5rem';
      li.style.position = 'relative';
      li.style.paddingLeft = '1.25rem';
      li.innerHTML = `<span style="position: absolute; left: 0; color: var(--accent-primary);">✔</span> ${item}`;
      highlightsContainer.appendChild(li);
    });

    // Links
    const githubLink = document.getElementById('modal-github');
    const demoLink = document.getElementById('modal-demo');
    if (githubLink) githubLink.href = data.github;
    if (demoLink) demoLink.href = data.demo;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  viewDetailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-project');
      openModal(id);
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   6. ScrollSpy for Active Nav Link
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => observer.observe(sec));
}

/* ==========================================================================
   7. Back to Top Button
   ========================================================================== */
function initBackToTop() {
  const scrollTopBtn = document.getElementById('scroll-top');
  if (!scrollTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   8. Contact Form & Feedback Toast
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const toast = document.getElementById('toast');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const message = form.querySelector('#message').value.trim();

    if (!name || !email || !message) {
      showToast('Please fill out all required fields.', false);
      return;
    }

    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast('Please enter a valid email address.', false);
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Sending message...';
    submitBtn.disabled = true;

    // Simulate sending (or forward to mailto / formspree)
    setTimeout(() => {
      showToast('Thank you! Your message has been sent successfully.', true);
      form.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }, 1200);
  });

  function showToast(message, isSuccess) {
    if (!toast) return;
    const toastMsg = toast.querySelector('.toast-message');
    if (toastMsg) toastMsg.textContent = message;

    toast.className = 'toast show ' + (isSuccess ? 'success' : 'error');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }
}
