/* FRSKO — UI Components JS */
(function() {
  'use strict';

  // ── FAQ Accordion ───────────────────────────────────────
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function(item) {
    const btn = item.querySelector('.faq-question');
    if (!btn) return;
    btn.addEventListener('click', function() {
      const isOpen = item.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', isOpen);
    });
    // Keyboard
    btn.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });
  });

  // ── ROI Calculator (generic) ────────────────────────────
  const calcForm = document.getElementById('roi-calc');
  if (calcForm) {
    calcForm.addEventListener('input', function() {
      const leads = parseFloat(calcForm.querySelector('[name="leads"]').value) || 0;
      const closeRate = parseFloat(calcForm.querySelector('[name="close_rate"]').value) || 0;
      const avgDeal = parseFloat(calcForm.querySelector('[name="avg_deal"]').value) || 0;
      const result = calcForm.querySelector('.calc-result');
      if (result) {
        const revenue = leads * (closeRate / 100) * avgDeal;
        result.textContent = '$' + revenue.toLocaleString('es-MX', { maximumFractionDigits: 0 });
      }
    });
  }

  // ── Contact / LP Form submission stub ──────────────────
  const forms = document.querySelectorAll('.js-form');
  forms.forEach(function(form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      if (btn) {
        btn.disabled = true;
        btn.textContent = 'Enviando…';
      }
      // TODO: integrate HubSpot Forms API or Netlify Forms
      setTimeout(function() {
        const success = form.querySelector('.form-success');
        if (success) {
          form.style.display = 'none';
          success.style.display = 'block';
        } else {
          alert('¡Mensaje recibido! Te contactaremos pronto.');
          form.reset();
          if (btn) { btn.disabled = false; btn.textContent = 'Enviar'; }
        }
      }, 800);
    });
  });

  // ── Smooth scroll for anchor links ─────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80; // header height
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // ── Intersection observer for subtle fade-in ───────────
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(function(el) {
      observer.observe(el);
    });
  }

  // ── Diagnostico IA stepper (specific tool) ─────────────
  const diagForm = document.getElementById('diagnostico-ia-form');
  if (diagForm) {
    const steps = diagForm.querySelectorAll('.diag-step');
    const nextBtns = diagForm.querySelectorAll('.diag-next');
    const prevBtns = diagForm.querySelectorAll('.diag-prev');
    let currentStep = 0;

    function showStep(n) {
      steps.forEach(function(step, i) { step.style.display = i === n ? 'block' : 'none'; });
      currentStep = n;
    }
    showStep(0);

    nextBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        if (currentStep < steps.length - 1) showStep(currentStep + 1);
      });
    });
    prevBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        if (currentStep > 0) showStep(currentStep - 1);
      });
    });
  }

})();
