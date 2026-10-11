(() => {
  const doc = document.documentElement;
  doc.classList.add('js');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Footer year
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Mobile menu
  const toggle = document.querySelector('.menu-toggle');
  const mobile = document.getElementById('mobile-menu');
  const setMenu = open => {
    toggle.setAttribute('aria-expanded', String(open));
    mobile.hidden = !open;
  };
  toggle?.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  mobile?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));

  // Topbar border + scroll progress
  const topbar = document.querySelector('.topbar');
  const bar = document.querySelector('.progress span');
  let ticking = false;
  const onScroll = () => {
    const max = doc.scrollHeight - innerHeight;
    bar?.style.setProperty('--p', max > 0 ? (scrollY / max).toFixed(4) : 0);
    topbar?.classList.toggle('scrolled', scrollY > 8);
    ticking = false;
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  // Reveal on scroll (staggered within each parent)
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const siblings = [...e.target.parentElement.children].filter(el => el.classList.contains('reveal'));
        e.target.style.setProperty('--rd', `${Math.min(siblings.indexOf(e.target), 6) * 0.08}s`);
        e.target.classList.add('in');
        io.unobserve(e.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('in'));
  }

  // Active nav link
  const links = [...document.querySelectorAll('.nav nav a[href^="#"]')];
  const sections = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window) {
    const navIO = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${e.target.id}`));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(s => navIO.observe(s));
  }

  // Hero drafting crosshair with coordinate readout
  const hero = document.querySelector('.hero');
  const cross = document.querySelector('.crosshair');
  const readout = document.querySelector('.ch-read');
  if (hero && cross && matchMedia('(hover: hover)').matches) {
    hero.addEventListener('pointermove', e => {
      const r = hero.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      cross.style.setProperty('--cx', `${x}px`);
      cross.style.setProperty('--cy', `${y}px`);
      readout.textContent = `X ${String(Math.round(x)).padStart(4, '0')} · Y ${String(Math.round(y)).padStart(4, '0')}`;
    });
  }

  // Capability cards: blueprint wipe originates from the pointer
  document.querySelectorAll('.cap-card').forEach(card => {
    card.addEventListener('pointerenter', e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });

  // Terminal lines type in when visible
  const term = document.querySelector('.terminal');
  if (term && 'IntersectionObserver' in window) {
    new IntersectionObserver((entries, o) => {
      if (entries[0].isIntersecting) { term.classList.add('in'); o.disconnect(); }
    }, { threshold: 0.4 }).observe(term);
  } else term?.classList.add('in');

  // Lightbox gallery
  const items = [...document.querySelectorAll('.g-item')];
  const lb = document.querySelector('.lightbox');
  if (lb && items.length && typeof lb.showModal === 'function') {
    const img = lb.querySelector('img');
    const cap = lb.querySelector('figcaption');
    let idx = 0;
    const show = i => {
      idx = (i + items.length) % items.length;
      const it = items[idx];
      img.src = it.dataset.full;
      img.alt = it.querySelector('img').alt;
      cap.textContent = `Fig. ${String(idx + 1).padStart(2, '0')} — ${it.dataset.caption}`;
    };
    items.forEach((it, i) => it.addEventListener('click', () => { show(i); lb.showModal(); }));
    lb.querySelector('.lb-close').addEventListener('click', () => lb.close());
    lb.querySelector('.lb-prev').addEventListener('click', () => show(idx - 1));
    lb.querySelector('.lb-next').addEventListener('click', () => show(idx + 1));
    lb.addEventListener('click', e => { if (e.target === lb) lb.close(); });
    lb.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft') show(idx - 1);
      if (e.key === 'ArrowRight') show(idx + 1);
    });
  } else {
    items.forEach(it => it.addEventListener('click', () => window.open(it.dataset.full, '_blank', 'noopener')));
  }

  // Copy email
  const toast = document.querySelector('.toast');
  const say = msg => {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(say.t);
    say.t = setTimeout(() => toast.classList.remove('show'), 2200);
  };
  document.querySelector('.copy-email')?.addEventListener('click', async e => {
    const email = e.currentTarget.dataset.email;
    try { await navigator.clipboard.writeText(email); say('Email copied to clipboard ✓'); }
    catch { say(email); }
  });
})();
