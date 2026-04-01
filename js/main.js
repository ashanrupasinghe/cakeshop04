/**
 * Cake Shop – Main JavaScript
 * WordPress-Ready | Vanilla JS (no dependencies)
 */

(function () {
  'use strict';

  /* ── Sticky Nav ─────────────────────────── */
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  /* ── Mobile Hamburger ───────────────────── */
  const hamburger = document.querySelector('.hamburger');
  const navMenu   = document.querySelector('.nav-menu');
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const open = navMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', open);
      // Animate bars
      const bars = hamburger.querySelectorAll('span');
      if (open) {
        bars[0].style.transform = 'translateY(7px) rotate(45deg)';
        bars[1].style.opacity   = '0';
        bars[2].style.transform = 'translateY(-7px) rotate(-45deg)';
      } else {
        bars[0].style.transform = '';
        bars[1].style.opacity   = '';
        bars[2].style.transform = '';
      }
    });

    // Close on nav link click
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.querySelectorAll('span').forEach(b => {
          b.style.transform = '';
          b.style.opacity   = '';
        });
      });
    });
  }

  /* ── Back to Top ────────────────────────── */
  const btt = document.querySelector('.back-to-top');
  if (btt) {
    window.addEventListener('scroll', () => {
      btt.classList.toggle('show', window.scrollY > 400);
    });
    btt.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── Cake Filter Tabs ───────────────────── */
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('[data-filter-group]') || btn.parentElement;
      parent.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      const grid   = document.querySelector('[data-filter-grid]');
      if (!grid) return;

      grid.querySelectorAll('[data-category]').forEach(card => {
        const show = filter === 'all' || card.dataset.category === filter;
        card.style.display = show ? '' : 'none';
      });
    });
  });

  /* ── Product Option Buttons ─────────────── */
  document.querySelectorAll('.option-btns').forEach(group => {
    group.querySelectorAll('.option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        group.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
      });
    });
  });

  /* ── Quantity Control ───────────────────── */
  document.querySelectorAll('.qty-wrap').forEach(wrap => {
    const input   = wrap.querySelector('.qty-input');
    const btnPlus = wrap.querySelector('[data-qty="plus"]');
    const btnMinus= wrap.querySelector('[data-qty="minus"]');
    if (!input) return;
    if (btnPlus)  btnPlus.addEventListener('click',  () => { input.value = Math.min(99, +input.value + 1); });
    if (btnMinus) btnMinus.addEventListener('click', () => { input.value = Math.max(1,  +input.value - 1); });
  });

  /* ── Thumbnail Gallery ──────────────────── */
  document.querySelectorAll('.thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      const wrap = thumb.closest('.product-gallery');
      if (!wrap) return;
      wrap.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      // If images are used, swap main img src
      const mainImg = wrap.querySelector('.main-img img');
      const src     = thumb.dataset.src;
      if (mainImg && src) mainImg.src = src;
    });
  });

  /* ── Product Tabs ───────────────────────── */
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const nav    = btn.closest('.tab-nav');
      const panes  = btn.closest('.product-tabs').querySelectorAll('.tab-pane');
      const target = btn.dataset.tab;

      nav.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      panes.forEach(pane => {
        pane.classList.toggle('active', pane.id === target);
      });
    });
  });

  /* ── Contact Form ───────────────────────── */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = this.querySelector('[type="submit"]');
      const msg = document.getElementById('formMsg');
      btn.disabled    = true;
      btn.textContent = 'Sending…';

      // Simulate async (replace with fetch/AJAX for WordPress)
      setTimeout(() => {
        btn.disabled    = false;
        btn.textContent = 'Send Message';
        if (msg) {
          msg.textContent = 'Thank you! Your message has been sent.';
          msg.className   = 'form-success';
        }
        contactForm.reset();
      }, 1200);
    });
  }

  /* ── Smooth Scroll Anchors ──────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - offset,
          behavior: 'smooth'
        });
      }
    });
  });

})();
