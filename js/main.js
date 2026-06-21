document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initScrollProgress();
  initNav();
  initHamburger();
  initTyping();
  initScrollAnimations();
  initProgressBars();
  initForm();
  initBackToTop();
});

function initTheme() {
  document.documentElement.classList.add('dark');
  const toggle = document.getElementById('theme-toggle');
  if (toggle) toggle.style.display = 'none';
}

function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = total > 0 ? (window.scrollY / total * 100) + '%' : '0%';
  }, { passive: true });
}

function initNav() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { threshold: 0, rootMargin: '-50% 0px -50% 0px' });

  sections.forEach(s => observer.observe(s));
}

function initHamburger() {
  const toggle = document.getElementById('menu-toggle');
  const close  = document.getElementById('menu-close');
  const menu   = document.getElementById('mobile-menu');
  const links  = document.querySelectorAll('.mobile-nav-link');

  const openMenu  = () => { menu.classList.add('open');    document.body.style.overflow = 'hidden'; };
  const closeMenu = () => { menu.classList.remove('open'); document.body.style.overflow = ''; };

  toggle.addEventListener('click', openMenu);
  close.addEventListener('click', closeMenu);
  links.forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
}

function initTyping() {
  const el = document.getElementById('typing-text');
  if (!el) return;

  const titles = ['Frontend Developer', 'React Developer', 'UI/UX Enthusiast'];
  let titleIdx = 0, charIdx = 0, isDeleting = false;

  function tick() {
    const current = titles[titleIdx];
    el.textContent = current.slice(0, isDeleting ? --charIdx : ++charIdx);

    let delay = isDeleting ? 40 : 80;

    if (!isDeleting && charIdx === current.length) {
      delay = 1800;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      titleIdx = (titleIdx + 1) % titles.length;
      delay = 300;
    }

    setTimeout(tick, delay);
  }

  setTimeout(tick, 600);
}

function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('[data-animate]').forEach(el => {
    if (el.dataset.delay) el.style.transitionDelay = el.dataset.delay + 'ms';
    observer.observe(el);
  });
}

function initProgressBars() {
  const section = document.getElementById('skills');
  if (!section) return;

  let done = false;
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !done) {
      done = true;
      document.querySelectorAll('.progress-bar').forEach(bar => {
        bar.style.width = (bar.dataset.width || 0) + '%';
      });
    }
  }, { threshold: 0.3 });

  observer.observe(section);
}

function initForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  function setError(id, msg) {
    document.getElementById(id).classList.add('error');
    document.getElementById(id + '-error').textContent = msg;
  }
  function clearError(id) {
    document.getElementById(id).classList.remove('error');
    document.getElementById(id + '-error').textContent = '';
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    let valid = true;

    ['name', 'email', 'message'].forEach(clearError);

    if (name.length < 2)                                   { setError('name',    '이름을 2자 이상 입력해주세요.');       valid = false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))        { setError('email',   '유효한 이메일 주소를 입력해주세요.'); valid = false; }
    if (message.length < 10)                               { setError('message', '메시지를 10자 이상 입력해주세요.');   valid = false; }

    if (valid) {
      const btn = document.getElementById('submit-btn');
      btn.textContent = '전송 완료! ✓';
      btn.disabled = true;
      setTimeout(() => {
        form.reset();
        btn.textContent = '메시지 전송';
        btn.disabled = false;
      }, 3000);
    }
  });
}

function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 300);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}
