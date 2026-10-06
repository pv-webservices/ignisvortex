// Progressive enhancement only: every page is fully usable without this script.
const root = document.documentElement;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

/* Loader: hide as soon as the DOM is ready (min 450ms so it doesn't flash). */
const loaderStart = performance.now();
const hideLoader = (): void => {
  const wait = Math.max(0, 450 - (performance.now() - loaderStart));
  window.setTimeout(() => root.classList.add('loaded'), reducedMotion.matches ? 0 : wait);
};
hideLoader();

/* Mobile menu (native <dialog> with focus trapping). */
function initMenu(): void {
  const menu = document.querySelector<HTMLDialogElement>('#mobile-menu');
  const trigger = document.querySelector<HTMLButtonElement>('.menu-toggle');
  if (!menu || !trigger) return;
  const setOpenState = (open: boolean): void => {
    trigger.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('menu-open', open);
  };
  const close = (): void => { menu.close(); setOpenState(false); trigger.focus(); };
  trigger.addEventListener('click', () => { if (menu.open) close(); else { menu.showModal(); setOpenState(true); } });
  menu.querySelector('.menu-close')?.addEventListener('click', close);
  menu.addEventListener('cancel', () => setOpenState(false));
  menu.addEventListener('click', (e) => { if (e.target === menu) close(); });
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpenState(false)));
  menu.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const focusable = Array.from(menu.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), summary')).filter((el) => el.offsetParent !== null);
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
  });
}

/* Header shadow on scroll. */
function initHeader(): void {
  const header = document.querySelector('.site-header');
  let ticking = false;
  const update = (): void => { header?.classList.toggle('scrolled', window.scrollY > 24); ticking = false; };
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  update();
}

/* Count-up for KPI numbers. */
function countUp(el: HTMLElement): void {
  const target = Number(el.dataset.count);
  if (!Number.isFinite(target) || reducedMotion.matches) return;
  const duration = 1400;
  const start = performance.now();
  const tick = (now: number): void => {
    const p = Math.min(1, (now - start) / duration);
    el.textContent = String(Math.round(target * (1 - Math.pow(1 - p, 3))));
    if (p < 1) requestAnimationFrame(tick);
  };
  el.textContent = '0';
  requestAnimationFrame(tick);
}

/* Scroll reveals, step-line and counters share one observer. */
function initReveals(): void {
  const targets = document.querySelectorAll<HTMLElement>('.reveal, [data-steps], [data-count]');
  if (reducedMotion.matches || !('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('in'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target as HTMLElement;
      el.classList.add('in');
      if (el.dataset.count) countUp(el);
      observer.unobserve(el);
    });
  }, { threshold: 0.06 });
  targets.forEach((el) => observer.observe(el));
}

/* Practice-area explorer: hover/focus swaps the sticky preview. */
function initExplorer(): void {
  document.querySelectorAll<HTMLElement>('[data-explorer]').forEach((explorer) => {
    const rows = explorer.querySelectorAll<HTMLElement>('[data-preview]');
    const slides = explorer.querySelectorAll<HTMLElement>('[data-slide]');
    const activate = (id: string): void => {
      rows.forEach((r) => r.classList.toggle('active', r.dataset.preview === id));
      slides.forEach((s) => s.classList.toggle('active', s.dataset.slide === id));
    };
    rows.forEach((row) => {
      const id = row.dataset.preview ?? '1';
      row.addEventListener('mouseenter', () => activate(id));
      row.addEventListener('focus', () => activate(id));
    });
  });
}

/* Horizontal product rail with buttons and a progress bar. */
function initRails(): void {
  document.querySelectorAll<HTMLElement>('[data-rail]').forEach((rail) => {
    const track = rail.querySelector<HTMLElement>('[data-rail-track]');
    const prev = rail.querySelector<HTMLButtonElement>('[data-rail-prev]');
    const next = rail.querySelector<HTMLButtonElement>('[data-rail-next]');
    const bar = rail.querySelector<HTMLElement>('[data-rail-bar]');
    if (!track) return;
    const step = (): number => (track.querySelector<HTMLElement>('.rail-item')?.offsetWidth ?? 320) + 20;
    const update = (): void => {
      const max = track.scrollWidth - track.clientWidth;
      if (prev) prev.disabled = track.scrollLeft <= 4;
      if (next) next.disabled = track.scrollLeft >= max - 4;
      const visible = track.clientWidth / track.scrollWidth;
      const progress = max > 0 ? visible + (1 - visible) * (track.scrollLeft / max) : 1;
      bar?.style.setProperty('--p', progress.toFixed(3));
    };
    const behavior: ScrollBehavior = reducedMotion.matches ? 'auto' : 'smooth';
    prev?.addEventListener('click', () => track.scrollBy({ left: -step(), behavior }));
    next?.addEventListener('click', () => track.scrollBy({ left: step(), behavior }));
    track.addEventListener('scroll', () => requestAnimationFrame(update), { passive: true });
    window.addEventListener('resize', update);
    update();
  });
}

/* Click-to-play client videos: source is attached only when the visitor presses play. */
function initVideos(): void {
  document.querySelectorAll<HTMLVideoElement>('video[data-lazy-video]').forEach((video) => {
    const button = document.querySelector<HTMLButtonElement>(`[data-video-target="${video.id}"]`);
    button?.addEventListener('click', () => {
      video.querySelectorAll<HTMLSourceElement>('source[data-src]').forEach((s) => { s.src = s.dataset.src ?? ''; s.removeAttribute('data-src'); });
      video.load();
      video.controls = true;
      button.hidden = true;
      video.play().catch(() => { /* playback blocked: native controls remain available */ });
    });
  });
}

/* Ambient muted loop: loads when near the viewport, never under reduced motion, pausable. */
function initAmbient(): void {
  const video = document.querySelector<HTMLVideoElement>('video[data-ambient]');
  const toggle = document.querySelector<HTMLButtonElement>('[data-ambient-toggle]');
  if (!video || reducedMotion.matches || !('IntersectionObserver' in window)) return;
  let loaded = false;
  let userPaused = false;
  const setToggle = (playing: boolean): void => {
    if (!toggle) return;
    toggle.hidden = false;
    toggle.setAttribute('aria-label', playing ? 'Pause background video' : 'Play background video');
    toggle.innerHTML = playing
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M8 5v14m8-14v14"/></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M8 5.5v13l10.5-6.5L8 5.5Z"/></svg>';
  };
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      if (!loaded) {
        video.querySelectorAll<HTMLSourceElement>('source[data-src]').forEach((s) => { s.src = s.dataset.src ?? ''; });
        video.load();
        loaded = true;
      }
      if (!userPaused) video.play().then(() => setToggle(true)).catch(() => setToggle(false));
    } else if (loaded) {
      video.pause();
    }
  }, { rootMargin: '200px 0px' });
  observer.observe(video);
  toggle?.addEventListener('click', () => {
    if (video.paused) { userPaused = false; video.play().then(() => setToggle(true)).catch(() => setToggle(false)); }
    else { userPaused = true; video.pause(); setToggle(false); }
  });
}

initMenu();
initHeader();
initReveals();
initExplorer();
initRails();
initVideos();
initAmbient();
