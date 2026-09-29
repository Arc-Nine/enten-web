import { scrollProgress } from './hero-progress';

const track = document.querySelector<HTMLElement>('.hero-track');
const image = document.querySelector<HTMLImageElement>('#hero-image');
const button = document.querySelector<HTMLButtonElement>('.motion-toggle');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');

if (track && image && button) {
  let enabled = !reduced.matches;
  let scheduled = false;
  const update = () => {
    scheduled = false;
    if (!enabled) return;
    const bounds = track.getBoundingClientRect();
    // Start on the first scroll; finish when the hero leaves the viewport.
    const progress = scrollProgress(-window.scrollY, bounds.top + window.scrollY + bounds.height);
    image.style.transform = `scale(${1 + 0.32 * progress})`;
  };
  const schedule = () => {
    if (!scheduled && enabled) { scheduled = true; requestAnimationFrame(update); }
  };
  const sync = () => {
    track.classList.toggle('scroll-enabled', enabled);
    button.hidden = reduced.matches;
    button.textContent = enabled ? 'Nonaktifkan gerak' : 'Aktifkan gerak';
    button.setAttribute('aria-pressed', String(enabled));
    if (reduced.matches) image.style.transform = 'none';
    schedule();
  };
  button.addEventListener('click', () => { enabled = !enabled; sync(); });
  reduced.addEventListener('change', () => { enabled = !reduced.matches; sync(); });
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
  sync();
}
