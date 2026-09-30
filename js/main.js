const REDUCED_MOTION = matchMedia('(prefers-reduced-motion: reduce)').matches;
const IS_TOUCH = matchMedia('(pointer: coarse)').matches;

// Smooth scroll (Lenis), synced with GSAP ScrollTrigger
if (window.gsap && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

if (!REDUCED_MOTION && window.Lenis) {
  const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
  if (window.ScrollTrigger) lenis.on('scroll', ScrollTrigger.update);
  function raf(time) {
    lenis.raf(time);
    if (window.gsap) gsap.ticker.tick();
    else requestAnimationFrame(raf);
  }
  if (window.gsap) {
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  } else {
    requestAnimationFrame(raf);
  }
}

// Hero parallax — code card and chips drift at different speeds on scroll
if (!REDUCED_MOTION && !IS_TOUCH && window.gsap && window.ScrollTrigger) {
  gsap.to('[data-parallax-el="code"]', {
    y: -40, ease: 'none',
    scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true },
  });
  gsap.to('[data-parallax-el="chip1"]', {
    y: -70, ease: 'none',
    scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true },
  });
  gsap.to('[data-parallax-el="chip2"]', {
    y: -25, ease: 'none',
    scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true },
  });
  gsap.to('[data-parallax-el="chip3"]', {
    y: -55, ease: 'none',
    scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true },
  });
}

// Custom cursor
if (!REDUCED_MOTION && !IS_TOUCH) {
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (dot && ring) {
    let ringX = 0, ringY = 0, targetX = 0, targetY = 0;
    addEventListener('pointermove', (e) => {
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
      targetX = e.clientX;
      targetY = e.clientY;
    });
    (function animateRing() {
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      requestAnimationFrame(animateRing);
    })();
    document.querySelectorAll('a, button, .cube-face').forEach((el) => {
      el.addEventListener('pointerenter', () => ring.classList.add('is-hover'));
      el.addEventListener('pointerleave', () => ring.classList.remove('is-hover'));
    });
  }
}

// Rotating role line
document.querySelectorAll('[data-role-rotator]').forEach((el) => {
  const roles = (el.dataset.roles || '').split(',').map((r) => r.trim()).filter(Boolean);
  if (roles.length < 2) return;
  const span = el.querySelector('span');
  if (!span || REDUCED_MOTION) return;
  let i = 0;
  setInterval(() => {
    i = (i + 1) % roles.length;
    span.style.transition = 'opacity .3s ease, transform .3s ease';
    span.style.opacity = '0';
    span.style.transform = 'translateY(6px)';
    setTimeout(() => {
      span.textContent = roles[i];
      span.style.transform = 'translateY(-6px)';
      requestAnimationFrame(() => {
        span.style.opacity = '1';
        span.style.transform = 'translateY(0)';
      });
    }, 300);
  }, 2600);
});

// Typewriter code snippet
const typeEl = document.querySelector('[data-typewriter]');
if (typeEl) {
  const full = "const dev = {\n  name: 'Haya Shakil',\n  role: 'Frontend Developer',\n  stack: ['HTML', 'CSS', 'JS', 'Laravel'],\n  available: true,\n};";
  if (REDUCED_MOTION) {
    typeEl.textContent = full;
  } else {
    let i = 0;
    const speed = 18;
    const tick = () => {
      typeEl.textContent = full.slice(0, i);
      i += 2;
      if (i <= full.length) setTimeout(tick, speed);
    };
    setTimeout(tick, 900);
  }
}

// Cursor spotlight — hero background only, desktop
const spotlight = document.querySelector('[data-spotlight]');
const heroSectionEl = document.querySelector('#hero');
if (spotlight && heroSectionEl && !REDUCED_MOTION && !IS_TOUCH) {
  heroSectionEl.addEventListener('pointermove', (e) => {
    const r = heroSectionEl.getBoundingClientRect();
    spotlight.style.setProperty('--sx', `${e.clientX - r.left}px`);
    spotlight.style.setProperty('--sy', `${e.clientY - r.top}px`);
    spotlight.classList.add('is-active');
  });
  heroSectionEl.addEventListener('pointerleave', () => spotlight.classList.remove('is-active'));
}

// Glowing headline on scroll — intensity tracks how close the hero is to center
const glowEls = document.querySelectorAll('.glow-text');
if (!REDUCED_MOTION && glowEls.length) {
  const updateGlow = () => {
    glowEls.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const center = innerHeight / 2;
      const distance = Math.abs(rect.top + rect.height / 2 - center);
      const strength = Math.max(0, 1 - distance / innerHeight);
      el.style.textShadow = `0 0 ${24 * strength + 4}px rgba(225,29,72,${0.2 + strength * 0.35})`;
    });
  };
  addEventListener('scroll', updateGlow, { passive: true });
  updateGlow();
}

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach((el) => revealObserver.observe(el));

// Scroll progress bar
const progressFill = document.querySelector('.scroll-progress-fill');
if (progressFill) {
  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    const pct = max > 0 ? Math.min(1, scrollY / max) : 0;
    progressFill.style.transform = `scaleX(${pct})`;
  };
  addEventListener('scroll', updateProgress, { passive: true });
  addEventListener('resize', updateProgress);
  updateProgress();
}

// Scrollspy — highlight the nav link for the section in view
const navLinks = document.querySelectorAll('[data-nav-link]');
if (navLinks.length) {
  const linkFor = (id) => [...navLinks].find((l) => l.getAttribute('href') === `#${id}`);
  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const link = linkFor(entry.target.id);
      if (!link) return;
      if (entry.isIntersecting) {
        navLinks.forEach((l) => l.classList.remove('is-active'));
        link.classList.add('is-active');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  navLinks.forEach((link) => {
    const section = document.querySelector(link.getAttribute('href'));
    if (section) spyObserver.observe(section);
  });
}

// Animated counters
const counters = document.querySelectorAll('[data-counter]');
if (counters.length) {
  const countUp = (el) => {
    const target = Number(el.dataset.counter);
    if (REDUCED_MOTION) { el.textContent = target; return; }
    const duration = 1200;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        countUp(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach((el) => counterObserver.observe(el));
}

// Magnetic button — scoped to [data-magnetic] only
if (!REDUCED_MOTION && !IS_TOUCH) {
  document.querySelectorAll('[data-magnetic]').forEach((btn) => {
    btn.addEventListener('pointermove', (e) => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.3;
      const y = (e.clientY - r.top - r.height / 2) * 0.3;
      btn.style.transform = `translate(${x}px, ${y}px)`;
    });
    btn.addEventListener('pointerleave', () => { btn.style.transform = ''; });
  });
}

// Project filter
const filterTabs = document.querySelectorAll('.filter-tab');
const projectCards = document.querySelectorAll('.project-card');

filterTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    filterTabs.forEach((t) => t.classList.remove('active'));
    tab.classList.add('active');
    const category = tab.dataset.filter;

    projectCards.forEach((card) => {
      const matches = category === 'all' || card.dataset.category === category;
      card.style.display = matches ? '' : 'none';
    });
  });
});

// Per-card carousel (prev/next + dots)
document.querySelectorAll('[data-carousel]').forEach((carousel) => {
  const track = carousel.querySelector('[data-carousel-track]');
  const slides = track ? Array.from(track.children) : [];
  const dots = carousel.querySelectorAll('.carousel-dots span');
  let index = 0;

  function show(i) {
    index = (i + slides.length) % slides.length;
    if (track) track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, di) => d.classList.toggle('active', di === index));
  }

  carousel.querySelector('.carousel-arrow.prev')?.addEventListener('click', () => show(index - 1));
  carousel.querySelector('.carousel-arrow.next')?.addEventListener('click', () => show(index + 1));
  dots.forEach((d, di) => d.addEventListener('click', () => show(di)));
});
