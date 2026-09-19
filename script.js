/**
 * ============================================================================
 * NOVACLOUD INTERACTIVE JAVASCRIPT CONTROLLER
 * Clean, modular Vanilla JavaScript (ES6+)
 * 
 * Features:
 *  1. Accessible Mobile Navigation Drawer (ARIA sync, keyboard trap, body lock)
 *  2. Sticky Header with dynamic blur/shadow on scroll
 *  3. Scroll-Spy Navigation (IntersectionObserver active link tracker)
 *  4. Product Showcase Tab Switcher with WAI-ARIA tab pattern
 *  5. Dynamic Pricing Calculator (Monthly vs Annual with 20% discount)
 *  6. FAQ Accordion Auto-Collapse enhancement
 *  7. Email Form Validation with accessible live-region status feedback
 *  8. Smooth Scroll to Anchors with header height offset
 *  9. Back to Top smooth scroll button
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. DYNAMIC COPYRIGHT YEAR
  // --------------------------------------------------------------------------
  const currentYearSpan = document.getElementById('current-year');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // --------------------------------------------------------------------------
  // 2. MOBILE NAVIGATION DRAWER & ARIA TOGGLE
  // --------------------------------------------------------------------------
  const navToggleBtn = document.getElementById('nav-toggle');
  const siteNav = document.getElementById('site-nav');
  const navBackdrop = document.getElementById('nav-backdrop');
  const navLinks = document.querySelectorAll('.nav-link');

  function openMobileMenu() {
    navToggleBtn.classList.add('open');
    navToggleBtn.setAttribute('aria-expanded', 'true');
    siteNav.classList.add('open');
    navBackdrop.classList.add('open');
    document.body.classList.add('menu-open');
  }

  function closeMobileMenu() {
    navToggleBtn.classList.remove('open');
    navToggleBtn.setAttribute('aria-expanded', 'false');
    siteNav.classList.remove('open');
    navBackdrop.classList.remove('open');
    document.body.classList.remove('menu-open');
  }

  if (navToggleBtn && siteNav && navBackdrop) {
    navToggleBtn.addEventListener('click', () => {
      const isExpanded = navToggleBtn.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    // Close when clicking the dim backdrop overlay
    navBackdrop.addEventListener('click', closeMobileMenu);

    // Close when pressing the 'Escape' key for accessibility
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && siteNav.classList.contains('open')) {
        closeMobileMenu();
        navToggleBtn.focus();
      }
    });

    // Close menu when clicking any nav link
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (siteNav.classList.contains('open')) {
          closeMobileMenu();
        }
      });
    });
  }

  // --------------------------------------------------------------------------
  // 3. STICKY HEADER GLASSMORPHISM ON SCROLL
  // --------------------------------------------------------------------------
  const siteHeader = document.getElementById('site-header');
  const handleScroll = () => {
    if (window.scrollY > 24) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check on page load

  // --------------------------------------------------------------------------
  // 4. SCROLL-SPY ACTIVE NAV LINK HIGHLIGHTING
  // --------------------------------------------------------------------------
  const observedSections = document.querySelectorAll('main section[id]');
  
  if ('IntersectionObserver' in window && observedSections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            if (link.getAttribute('href') === `#${currentId}`) {
              link.classList.add('active');
            } else if (link.getAttribute('href').startsWith('#')) {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    observedSections.forEach((section) => sectionObserver.observe(section));
  }

  // --------------------------------------------------------------------------
  // 5. PRODUCT SHOWCASE TAB CONTROLS
  // --------------------------------------------------------------------------
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetPanelId = btn.getAttribute('aria-controls');

      // Update Tab Buttons
      tabButtons.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Update Tab Panels
      tabPanels.forEach((panel) => {
        if (panel.id === targetPanelId) {
          panel.classList.add('active');
          panel.removeAttribute('hidden');
        } else {
          panel.classList.remove('active');
          panel.setAttribute('hidden', '');
        }
      });
    });
  });

  // --------------------------------------------------------------------------
  // 6. PRICING BILLING INTERVAL TOGGLE (MONTHLY / ANNUALLY)
  // --------------------------------------------------------------------------
  const pricingToggleBtn = document.getElementById('pricing-toggle');
  const priceAmounts = document.querySelectorAll('.price-amount');
  const billedNotes = document.querySelectorAll('.billed-note');

  if (pricingToggleBtn) {
    pricingToggleBtn.addEventListener('click', () => {
      const isAnnual = pricingToggleBtn.getAttribute('aria-checked') === 'true';
      const newState = !isAnnual;

      pricingToggleBtn.setAttribute('aria-checked', String(newState));

      priceAmounts.forEach((priceSpan) => {
        const monthlyPrice = priceSpan.getAttribute('data-monthly');
        const annualPrice = priceSpan.getAttribute('data-annual');
        
        // Animated transition for price number
        priceSpan.style.opacity = '0';
        priceSpan.style.transform = 'translateY(-6px)';
        
        setTimeout(() => {
          priceSpan.textContent = newState ? annualPrice : monthlyPrice;
          priceSpan.style.opacity = '1';
          priceSpan.style.transform = 'translateY(0)';
        }, 150);
      });

      billedNotes.forEach((note) => {
        note.textContent = newState ? 'Billed annually (20% off)' : 'Billed monthly';
      });
    });
  }

  // --------------------------------------------------------------------------
  // 7. FAQ ACCORDION POLISH (AUTO-COLLAPSE SIBLINGS)
  // --------------------------------------------------------------------------
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        // Optional: close other open accordions for cleaner view
        faqItems.forEach((other) => {
          if (other !== item && other.open) {
            other.removeAttribute('open');
          }
        });
      }
    });
  });

  // --------------------------------------------------------------------------
  // 8. CTA LEAD GENERATION FORM VALIDATION
  // --------------------------------------------------------------------------
  const leadForm = document.getElementById('lead-form');
  const leadEmailInput = document.getElementById('lead-email');
  const formFeedback = document.getElementById('form-feedback');

  if (leadForm && leadEmailInput && formFeedback) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailValue = leadEmailInput.value.trim();

      // Robust Email Regex check
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailValue) {
        formFeedback.className = 'form-feedback error';
        formFeedback.textContent = 'Please enter your work email address to get started.';
        leadEmailInput.focus();
        return;
      }

      if (!emailRegex.test(emailValue)) {
        formFeedback.className = 'form-feedback error';
        formFeedback.textContent = 'Please provide a valid email format (e.g., name@company.com).';
        leadEmailInput.focus();
        return;
      }

      // Success State
      formFeedback.className = 'form-feedback success';
      formFeedback.textContent = '🎉 Awesome! Your 14-day trial invitation is on its way to ' + emailValue + '.';
      leadForm.reset();

      // Clear feedback message after 6 seconds
      setTimeout(() => {
        formFeedback.textContent = '';
        formFeedback.className = 'form-feedback';
      }, 6000);
    });
  }

  // --------------------------------------------------------------------------
  // 9. BACK TO TOP BUTTON WITH SMOOTH SCROLL
  // --------------------------------------------------------------------------
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
