/**
 * ENTEN × Sabrang Malsico — orkestrasi gerak company profile.
 * Prinsip performa: hanya animasikan transform & opacity; semua gerak
 * dihormati oleh prefers-reduced-motion; tidak ada animasi width/height/top/left.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(pointer: fine)').matches;

/* ------------------------------------------------------------------ */
/* 1. Lenis smooth scroll                                              */
/* ------------------------------------------------------------------ */
let lenis: Lenis | null = null;
if (!reduced) {
  lenis = new Lenis({
    duration: 1.05,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.6,
  });
  lenis.on('scroll', () => ScrollTrigger.update());
  gsap.ticker.add((time) => lenis?.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

/* ------------------------------------------------------------------ */
/* 2. Header glassmorphism adaptif                                     */
/* ------------------------------------------------------------------ */
const header = document.querySelector<HTMLElement>('.site-glass');
if (header) {
  const onScroll = () => {
    header.classList.toggle('is-scrolled', (lenis ? lenis.scroll : window.scrollY) > 32);
  };
  onScroll();
  if (lenis) lenis.on('scroll', onScroll);
  else window.addEventListener('scroll', onScroll, { passive: true });
}

/* Glass mengikuti tema section di bawah header; dibuat SETELAH pin
   agar posisi trigger memperhitungkan pin-spacer (urutan GSAP). */
function initHeaderTheme() {
  (ScrollTrigger.getAll() as (ScrollTrigger & { vars?: { id?: string } })[]).forEach((st) => {
    if (st.vars && st.vars.id === 'header-theme') st.kill();
  });
  document.querySelectorAll<HTMLElement>('[data-header-theme]').forEach((section) => {
    ScrollTrigger.create({
      id: 'header-theme',
      trigger: section,
      start: 'top 78px',
      end: 'bottom 78px',
      onToggle: (self) => {
        if (self.isActive) {
          header?.classList.toggle('is-over-dark', section.dataset.headerTheme === 'dark');
        }
      },
    });
  });
}

/* ------------------------------------------------------------------ */
/* 3. Hero — kinetic masked-text reveal + multi-layer parallax         */
/* ------------------------------------------------------------------ */
if (!reduced) {
  const heroLines = gsap.utils.toArray<HTMLElement>('.hero-title .mask-line > span');
  if (heroLines.length) {
    gsap.to(heroLines, {
      y: 0,
      duration: 1.25,
      stagger: 0.11,
      ease: 'power4.out',
      delay: 0.15,
    });
  }
  gsap.fromTo(
    '.hero-meta',
    { opacity: 0, y: 18 },
    { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.75, stagger: 0.12 },
  );

  // Parallax berlapis: foto produk paling lambat, ornamen botani lebih cepat.
  const hero = document.querySelector<HTMLElement>('#beranda');
  if (hero) {
    gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((layer) => {
      const speed = Number(layer.dataset.parallax || '8');
      gsap.to(layer, {
        yPercent: speed,
        ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.6 },
      });
    });
  }
}

/* ------------------------------------------------------------------ */
/* 4. Staggered scroll-reveal                                          */
/* ------------------------------------------------------------------ */
if (!reduced) {
  document.querySelectorAll<HTMLElement>('[data-reveal-group]').forEach((group) => {
    const items = group.querySelectorAll<HTMLElement>('[data-reveal]');
    if (!items.length) return;
    gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.95,
      ease: 'power3.out',
      stagger: 0.09,
      scrollTrigger: { trigger: group, start: 'top 78%', once: true },
    });
  });
  document.querySelectorAll<HTMLElement>('[data-reveal]:not([data-reveal-group] [data-reveal])').forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.95,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 82%', once: true },
    });
  });
}

/* ------------------------------------------------------------------ */
/* 5. Carousel varian + ambient color                                  */
/* ------------------------------------------------------------------ */
const viewport = document.querySelector<HTMLElement>('.variants-viewport');
const slides = viewport
  ? Array.from(viewport.querySelectorAll<HTMLElement>('.variant-slide[data-slide]'))
  : [];
const ambientLayers = gsap.utils.toArray<HTMLElement>('.ambient-layer');
const progressBar = document.querySelector<HTMLElement>('.variants-progress > span');
const progressLabel = document.querySelector<HTMLElement>('.variants-progress-label');
const prevBtn = document.querySelector<HTMLButtonElement>('.carousel-prev');
const nextBtn = document.querySelector<HTMLButtonElement>('.carousel-next');
const dots = Array.from(document.querySelectorAll<HTMLButtonElement>('.variant-dot'));

function setAmbient(position: number) {
  ambientLayers.forEach((layer, i) => {
    const opacity = Math.max(0, 1 - Math.abs(position - i));
    gsap.set(layer, { opacity });
  });
}

if (viewport && slides.length) {
  let step = 1;
  let active = 0;
  const maxScroll = () => Math.max(1, viewport.scrollWidth - viewport.clientWidth);
  const measure = () => {
    step = slides.length > 1 ? slides[1].offsetLeft - slides[0].offsetLeft : 1;
  };
  const goTo = (i: number) => {
    const idx = Math.max(0, Math.min(slides.length - 1, i));
    viewport.scrollTo({ left: idx * step, behavior: reduced ? 'auto' : 'smooth' });
  };
  const sync = () => {
    const pos = Math.min(slides.length - 1, viewport.scrollLeft / step);
    const idx = Math.round(pos);
    if (idx !== active) {
      active = idx;
      dots.forEach((d, i) => {
        if (i === idx) d.setAttribute('aria-current', 'true');
        else d.removeAttribute('aria-current');
      });
    }
    if (progressLabel) progressLabel.textContent = String(idx + 1).padStart(2, '0');
    if (prevBtn) prevBtn.disabled = idx === 0;
    if (nextBtn) nextBtn.disabled = idx === slides.length - 1;
    setAmbient(pos);
    if (progressBar) gsap.set(progressBar, { scaleX: viewport.scrollLeft / maxScroll() });
  };

  let ticking = false;
  viewport.addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        sync();
        ticking = false;
      });
    },
    { passive: true },
  );

  prevBtn?.addEventListener('click', () => goTo(active - 1));
  nextBtn?.addEventListener('click', () => goTo(active + 1));
  dots.forEach((d) => d.addEventListener('click', () => goTo(Number(d.dataset.index))));
  viewport.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      goTo(active + 1);
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goTo(active - 1);
    }
  });

  /* Drag dengan mouse; sentuh/trackpad memakai scroll native + snap. */
  let down = false;
  let dragged = false;
  let startX = 0;
  let startLeft = 0;
  viewport.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse') return;
    down = true;
    dragged = false;
    startX = e.clientX;
    startLeft = viewport.scrollLeft;
  });
  viewport.addEventListener('pointermove', (e) => {
    if (!down) return;
    const dx = e.clientX - startX;
    if (!dragged && Math.abs(dx) > 6) {
      dragged = true;
      viewport.classList.add('is-dragging');
      viewport.setPointerCapture(e.pointerId);
    }
    if (dragged) viewport.scrollLeft = startLeft - dx;
  });
  const endDrag = () => {
    if (!down) return;
    down = false;
    if (dragged) {
      viewport.classList.remove('is-dragging');
      goTo(Math.round(viewport.scrollLeft / step));
      // Telan klik yang tersisa tepat setelah drag agar tautan tidak terbuka.
      viewport.addEventListener('click', (ev) => ev.preventDefault(), {
        once: true,
        capture: true,
      });
    }
    dragged = false;
  };
  viewport.addEventListener('pointerup', endDrag);
  viewport.addEventListener('pointercancel', endDrag);

  window.addEventListener('resize', () => {
    measure();
    sync();
  });
  window.addEventListener('load', () => {
    measure();
    sync();
  });
  measure();
  sync();
} else {
  setAmbient(0);
}
initHeaderTheme();

/* ------------------------------------------------------------------ */
/* 6. Magnetic buttons                                                 */
/* ------------------------------------------------------------------ */
if (!reduced && finePointer) {
  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    const xTo = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3.out' });
    const strength = 0.28;
    el.addEventListener('pointermove', (event) => {
      const rect = el.getBoundingClientRect();
      xTo((event.clientX - rect.left - rect.width / 2) * strength);
      yTo((event.clientY - rect.top - rect.height / 2) * strength);
    });
    el.addEventListener('pointerleave', () => {
      xTo(0);
      yTo(0);
    });
  });
}

/* ------------------------------------------------------------------ */
/* 7. Custom subtle cursor follower                                    */
/* ------------------------------------------------------------------ */
if (!reduced && finePointer) {
  const dot = document.querySelector<HTMLElement>('.cursor-dot');
  const ring = document.querySelector<HTMLElement>('.cursor-ring');
  if (dot && ring) {
    document.documentElement.classList.add('has-cursor');
    const dotX = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power2.out' });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power2.out' });
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.42, ease: 'power3.out' });
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.42, ease: 'power3.out' });
    window.addEventListener(
      'pointermove',
      (event) => {
        dotX(event.clientX);
        dotY(event.clientY);
        ringX(event.clientX);
        ringY(event.clientY);
      },
      { passive: true },
    );
    const interactives = 'a, button, [data-magnetic], [data-cursor]';
    document.querySelectorAll<HTMLElement>(interactives).forEach((el) => {
      el.addEventListener('pointerenter', () => ring.classList.add('is-active'));
      el.addEventListener('pointerleave', () => ring.classList.remove('is-active'));
    });
  }
}

/* ------------------------------------------------------------------ */
/* 8. Marquee tagline (transform-only, infinite)                       */
/* ------------------------------------------------------------------ */
if (!reduced) {
  document.querySelectorAll<HTMLElement>('.marquee-track').forEach((track) => {
    const tween = gsap.to(track, { xPercent: -50, ease: 'none', duration: 30, repeat: -1 });
    // Gerak dekoratif >5s: sediakan kontrol jeda (hover/focus).
    const zone = track.parentElement;
    if (zone) {
      zone.addEventListener('pointerenter', () => tween.pause());
      zone.addEventListener('pointerleave', () => tween.resume());
      zone.addEventListener('focusin', () => tween.pause());
      zone.addEventListener('focusout', () => tween.resume());
    }
  });
}

/* ------------------------------------------------------------------ */
/* 9. Navigasi: smooth anchor + menu mobile                            */
/* ------------------------------------------------------------------ */
document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const id = link.getAttribute('href');
    if (!id || id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    event.preventDefault();
    closeMenu();
    if (lenis) lenis.scrollTo(target as HTMLElement, { offset: -68, duration: 1.15 });
    else target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  });
});

const menuToggle = document.querySelector<HTMLButtonElement>('.menu-toggle');
const mobileMenu = document.querySelector<HTMLElement>('.mobile-menu');
function closeMenu() {
  if (!menuToggle || !mobileMenu) return;
  menuToggle.setAttribute('aria-expanded', 'false');
  gsap.to(mobileMenu, {
    opacity: 0,
    y: -12,
    duration: reduced ? 0 : 0.3,
    ease: 'power2.in',
    onComplete: () => mobileMenu.classList.add('hidden'),
  });
}
if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    const open = menuToggle.getAttribute('aria-expanded') === 'true';
    if (open) {
      closeMenu();
    } else {
      menuToggle.setAttribute('aria-expanded', 'true');
      mobileMenu.classList.remove('hidden');
      gsap.fromTo(
        mobileMenu,
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: reduced ? 0 : 0.35, ease: 'power3.out' },
      );
    }
  });
}

/* ------------------------------------------------------------------ */
/* 10. Refresh ScrollTrigger setelah seluruh aset siap                 */
/* ------------------------------------------------------------------ */
window.addEventListener('load', () => ScrollTrigger.refresh());
