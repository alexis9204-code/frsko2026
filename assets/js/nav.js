/* FRSKO — Navigation JS */
(function() {
  'use strict';

  const header = document.getElementById('site-header');
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');

  // Sticky header shadow
  if (header) {
    window.addEventListener('scroll', function() {
      header.classList.toggle('is-scrolled', window.scrollY > 10);
    }, { passive: true });
  }

  // Mobile nav toggle
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function() {
      const isOpen = mainNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on outside click
    document.addEventListener('click', function(e) {
      if (mainNav.classList.contains('is-open') &&
          !mainNav.contains(e.target) &&
          !navToggle.contains(e.target)) {
        mainNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  // Dropdown behavior for desktop + mobile
  const dropdownItems = document.querySelectorAll('.nav-item.has-dropdown');

  dropdownItems.forEach(function(item) {
    const link = item.querySelector('.nav-link');
    const isMobile = () => window.innerWidth <= 900;

    // Desktop: click to toggle
    link && link.addEventListener('click', function(e) {
      if (isMobile()) {
        e.preventDefault();
        const isOpen = item.classList.toggle('is-open');
        link.setAttribute('aria-expanded', isOpen);
        // Close siblings
        dropdownItems.forEach(function(other) {
          if (other !== item) {
            other.classList.remove('is-open');
            const otherLink = other.querySelector('.nav-link');
            if (otherLink) otherLink.setAttribute('aria-expanded', 'false');
          }
        });
      }
    });

    // Desktop: keyboard open
    link && link.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        if (!isMobile()) {
          e.preventDefault();
          const isOpen = item.classList.toggle('is-open');
          link.setAttribute('aria-expanded', isOpen);
        }
      }
      if (e.key === 'Escape') {
        item.classList.remove('is-open');
        link.setAttribute('aria-expanded', 'false');
        link.focus();
      }
    });

    // Close on Escape from within dropdown
    item.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        item.classList.remove('is-open');
        link && link.setAttribute('aria-expanded', 'false');
        link && link.focus();
      }
    });
  });

  // Close all dropdowns on outside click (desktop)
  document.addEventListener('click', function(e) {
    if (window.innerWidth > 900) {
      dropdownItems.forEach(function(item) {
        if (!item.contains(e.target)) {
          item.classList.remove('is-open');
          const link = item.querySelector('.nav-link');
          if (link) link.setAttribute('aria-expanded', 'false');
        }
      });
    }
  });

  // Mark active nav item based on current URL
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.main-nav .nav-link');
  navLinks.forEach(function(link) {
    const href = link.getAttribute('href');
    if (href && href !== '/' && currentPath.startsWith(href)) {
      link.classList.add('is-active');
    }
  });

})();
