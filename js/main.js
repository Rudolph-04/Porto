/* ==========================================================================
   main.js — interaksi kecil untuk portfolio
   1. Tahun otomatis di footer
   2. Menu hamburger (mobile)
   3. Header dapat garis bawah saat di-scroll
   4. Link navigasi aktif mengikuti section yang sedang dilihat
   5. Animasi muncul saat di-scroll (reveal)
   6. Bintang jatuh di hero
   ========================================================================== */

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* 1. Tahun di footer --------------------------------------------------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* 2. Menu hamburger ---------------------------------------------------- */
  var toggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('site-nav');

  function setMenu(open) {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    nav.classList.toggle('is-open', open);
  }

  toggle.addEventListener('click', function () {
    setMenu(toggle.getAttribute('aria-expanded') !== 'true');
  });

  // Tutup menu saat link diklik, saat tekan Escape, atau klik di luar menu
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) setMenu(false);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      setMenu(false);
      toggle.focus();
    }
  });

  document.addEventListener('click', function (e) {
    if (nav.classList.contains('is-open') && !nav.contains(e.target) && !toggle.contains(e.target)) {
      setMenu(false);
    }
  });

  /* 3. Header saat di-scroll -------------------------------------------- */
  var header = document.querySelector('.site-header');

  function onScroll() {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Browser lama tanpa IntersectionObserver: tampilkan semua konten apa adanya
  if (!('IntersectionObserver' in window)) {
    document.documentElement.classList.remove('js');
    return;
  }

  /* 4. Link navigasi aktif ---------------------------------------------- */
  var navLinks = nav.querySelectorAll('a[href^="#"]');
  var linkById = {};

  navLinks.forEach(function (link) {
    linkById[link.getAttribute('href').slice(1)] = link;
  });

  var sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      navLinks.forEach(function (l) { l.classList.remove('is-active'); });
      var active = linkById[entry.target.id];
      if (active) active.classList.add('is-active');
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  document.querySelectorAll('main section[id]').forEach(function (s) {
    sectionObserver.observe(s);
  });

  /* 5. Reveal saat di-scroll -------------------------------------------- */
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px' });

  document.querySelectorAll('.reveal').forEach(function (el) {
    revealObserver.observe(el);
  });

  /* 6. Bintang jatuh ----------------------------------------------------- */
  // Posisi & waktu dibuat acak supaya tidak kelihatan berulang.
  var sky = document.querySelector('.sky');
  if (sky && !reduceMotion) {
    var track = document.createElement('div');
    track.className = 'sky-track';

    // Di HP teksnya memenuhi layar, jadi bintangnya dikurangi supaya tidak ganggu baca
    var STAR_COUNT = window.innerWidth < 760 ? 4 : 12;

    for (var i = 0; i < STAR_COUNT; i++) {
      var star = document.createElement('span');
      star.className = 'shooting-star';
      star.style.setProperty('--x', (10 + Math.random() * 70).toFixed(1) + '%');
      star.style.setProperty('--y', (25 + Math.random() * 50).toFixed(1) + '%');
      star.style.setProperty('--dur', (2.8 + Math.random() * 2.4).toFixed(2) + 's');
      star.style.setProperty('--delay', (Math.random() * 6).toFixed(2) + 's');
      track.appendChild(star);
    }

    sky.appendChild(track);
  }
})();
