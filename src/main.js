import './style.css';

// ==========================================
// SCROLL REVEAL ANIMATIONS
// ==========================================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      // Optional: Stop observing once revealed
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});


// ==========================================
// EXPERIENCE PIPELINE REVEAL
// ==========================================
const pipelineContainer = document.querySelector('.pipeline-container');
if (pipelineContainer) {
  const pipelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        pipelineObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -30px 0px' });
  pipelineObserver.observe(pipelineContainer);
}


// ==========================================
// NAVBAR SCROLL & ACTIVE LINK
// ==========================================
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

function onScroll() {
  const scrollY = window.scrollY;

  // Background blur trigger
  if (scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active section tracking
  const offset = 200;
  sections.forEach(section => {
    const top = section.offsetTop - offset;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);

    if (link && scrollY >= top && scrollY < bottom) {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', onScroll, { passive: true });

// ==========================================
// SMOOTH SCROLLING (OFFSET SUPPORT)
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerOffset = 80; // Navbar height
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ==========================================
// MOBILE MENU TOGGLE
// ==========================================
const menuBtn = document.getElementById('menuBtn');
const navLinksContainer = document.querySelector('.nav-links');
const navAnchorLinks = document.querySelectorAll('.nav-links .nav-link');

if (menuBtn && navLinksContainer) {
  menuBtn.addEventListener('click', () => {
    const isOpen = navLinksContainer.classList.toggle('nav-open');
    menuBtn.setAttribute('aria-expanded', String(isOpen));
  });
}

navAnchorLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768 && navLinksContainer.classList.contains('nav-open')) {
      navLinksContainer.classList.remove('nav-open');
      if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
    }
  });
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 768 && navLinksContainer?.classList.contains('nav-open')) {
    navLinksContainer.classList.remove('nav-open');
    if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
  }
});

// ==========================================
// WHOAMI TYPING ANIMATION
// ==========================================
const whoamiEl = document.getElementById('whoami-text');
if (whoamiEl) {
  const parts = [
    { text: '$ ', className: 'cmd-prefix' },
    { text: 'whoami', className: 'gradient-text' }
  ];
  let partIdx = 0;
  let charIdx = 0;
  let currentSpan = null;

  const whoamiObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        whoamiObserver.unobserve(entry.target);
        setTimeout(typeNext, 400);
      }
    });
  }, { threshold: 0.3 });

  function typeNext() {
    if (partIdx >= parts.length) return;
    const part = parts[partIdx];
    if (!currentSpan) {
      currentSpan = document.createElement('span');
      currentSpan.className = part.className;
      whoamiEl.appendChild(currentSpan);
    }
    currentSpan.textContent += part.text.charAt(charIdx);
    charIdx++;
    if (charIdx >= part.text.length) {
      partIdx++;
      charIdx = 0;
      currentSpan = null;
    }
    setTimeout(typeNext, 100);
  }

  whoamiObserver.observe(whoamiEl.closest('.hero-about'));
}
