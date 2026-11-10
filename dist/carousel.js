import { icon } from './icons.js';

export function startCarousel(carousel) {
  const slides = [...carousel.querySelectorAll('.hero-slide')];
  const dots = [...carousel.querySelectorAll('[data-slide]')];
  const rotation = carousel.querySelector('[data-rotation]');
  const track = carousel.querySelector('.hero-slides');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0;
  let timer;
  let playing;

  function show(index) {
    const next = (index + slides.length) % slides.length;
    if (next === current) return;
    slides[current].inert = true;
    slides[current].setAttribute('aria-hidden', 'true');
    dots[current].removeAttribute('aria-current');
    slides[next].inert = false;
    slides[next].setAttribute('aria-hidden', 'false');
    dots[next].setAttribute('aria-current', 'true');
    current = next;
  }

  function setPlaying(enabled) {
    if (enabled === playing) return;
    playing = enabled;
    clearInterval(timer);
    rotation.innerHTML = icon(playing ? 'pause' : 'play', 16);
    rotation.setAttribute('aria-label', playing ? 'Jeda rotasi banner' : 'Putar banner otomatis');
    track.setAttribute('aria-live', playing ? 'off' : 'polite');
    if (playing) timer = setInterval(() => {
      if (!document.hidden && !carousel.matches(':hover')) show(current + 1);
    }, 6500);
  }

  function move(index) {
    setPlaying(false);
    show(index);
  }

  carousel.addEventListener('focusin', event => {
    if (event.target !== rotation || rotation.matches(':focus-visible')) setPlaying(false);
  });
  carousel.addEventListener('click', event => {
    const control = event.target.closest('button');
    if (!control) return;
    if (control === rotation) setPlaying(!playing);
    else if (control.hasAttribute('data-slide')) move(Number(control.dataset.slide));
    else if (control.hasAttribute('data-step')) move(current + Number(control.dataset.step));
  });
  carousel.addEventListener('keydown', event => {
    if (!event.target.closest('.hero-controls') || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    move(current + (event.key === 'ArrowLeft' ? -1 : 1));
  });
  const respectMotion = () => { if (motion.matches) setPlaying(false); };
  motion.addEventListener('change', respectMotion);
  setPlaying(!motion.matches);

  return () => {
    clearInterval(timer);
    motion.removeEventListener('change', respectMotion);
  };
}
