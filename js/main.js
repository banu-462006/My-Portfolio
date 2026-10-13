/**
 * PORTFOLIO JAVASCRIPT — BANUSHRI KANDHAN
 * Handles Theme Toggling, Mobile Menu, Typewriter, Project Filtering,
 * ScrollSpy, Smooth Scrolling, Back-to-Top, and Contact Form Feedback.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileMenu();
  initTypewriter();
  initProjectFiltering();
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
  const initialTheme = storedTheme || (prefersDark ? 'dark' : 'dark');
  document.documentElement.setAttribute('data-theme', initialTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
    });
  }

  // System theme preference listener (only if user hasn't explicitly overridden)
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('portfolio-theme')) {
        document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
      }
    });
  }
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

  // Close menu when clicking any nav item
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

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
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
    'AI/ML Engineer',
    'Python Developer',
    'Machine Learning Practitioner',
    'B.Sc. Computer Science Graduate'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 45;
    } else {
      typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 95;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 1900; // Pause at end of text
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 350;
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
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   5. ScrollSpy for Active Nav Link
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-25% 0px -65% 0px',
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
   6. Back to Top Button
   ========================================================================== */
function initBackToTop() {
  const scrollTopBtn = document.getElementById('scroll-top');
  if (!scrollTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
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
   7. Contact Form & Feedback Toast
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const toast = document.getElementById('toast');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = form.querySelector('#name');
    const emailInput = form.querySelector('#email');
    const messageInput = form.querySelector('#message');

    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const message = messageInput ? messageInput.value.trim() : '';

    if (!name || !email || !message) {
      showToast('Please fill out all required fields.', false);
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast('Please enter a valid email address.', false);
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn ? submitBtn.innerHTML : 'Send Message';
    if (submitBtn) {
      submitBtn.innerHTML = 'Sending...';
      submitBtn.disabled = true;
    }

    // Client-side confirmation feedback
    setTimeout(() => {
      showToast('Thank you! Your message has been received.', true);
      form.reset();
      if (submitBtn) {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
    }, 800);
  });

  function showToast(message, isSuccess) {
    if (!toast) return;
    const toastMsg = toast.querySelector('.toast-message');
    if (toastMsg) toastMsg.textContent = message;

    toast.className = 'toast show ' + (isSuccess ? 'success' : 'error');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }
}
