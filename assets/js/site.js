(() => {
  const root = document.documentElement;
  const storedTheme = localStorage.getItem('jaami-theme');
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  root.dataset.theme = storedTheme || (prefersLight ? 'light' : 'dark');

  const updateThemeLabel = () => {
    document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
      const isLight = root.dataset.theme === 'light';
      button.textContent = isLight ? '☾' : '☼';
      button.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
      button.setAttribute('title', isLight ? 'Dark mode' : 'Light mode');
    });
  };

  document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
    button.addEventListener('click', () => {
      root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('jaami-theme', root.dataset.theme);
      updateThemeLabel();
    });
  });
  updateThemeLabel();

  const nav = document.querySelector('.site-nav');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  const setNavState = () => {
    if (nav) nav.classList.toggle('is-stuck', window.scrollY > 24);
  };
  setNavState();
  window.addEventListener('scroll', setNavState, { passive: true });

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('is-open');
      document.body.classList.toggle('menu-open', open);
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.textContent = open ? '×' : '☰';
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        document.body.classList.remove('menu-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.textContent = '☰';
      });
    });
  }

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  document.querySelectorAll('img').forEach((img) => {
    const markMissing = () => img.classList.add('is-missing');
    if (img.complete && !img.naturalWidth) markMissing();
    img.addEventListener('error', markMissing, { once: true });
  });
})();
