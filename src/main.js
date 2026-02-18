import './style.css'

// ==========================================
// TYPING EFFECT — Hero subtitle
// ==========================================
const typingWords = ['DevOps Engineer', 'Cloud Architect', 'Infrastructure Builder', 'Problem Solver'];
const typingEl = document.getElementById('typingText');
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentWord = typingWords[wordIndex];

  if (isDeleting) {
    typingEl.textContent = currentWord.substring(0, charIndex--);
  } else {
    typingEl.textContent = currentWord.substring(0, charIndex++);
  }

  let delay = isDeleting ? 40 : 80;

  if (!isDeleting && charIndex === currentWord.length + 1) {
    delay = 2000; // pause at end
    isDeleting = true;
  } else if (isDeleting && charIndex < 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % typingWords.length;
    delay = 300;
  }

  setTimeout(typeEffect, delay);
}

typeEffect();

// ==========================================
// STAT COUNTER ANIMATION
// ==========================================
function animateCounters() {
  const stats = document.querySelectorAll('.stat-number[data-count]');
  stats.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-count'));
    const duration = 1500;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      stat.textContent = Math.round(target * eased);
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  });
}

// ==========================================
// SCROLL ANIMATIONS — IntersectionObserver
// ==========================================
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

// Apply fade-up to key elements
const animSelectors = [
  '.section-header',
  '.about-text',
  '.terminal-card',
  '.exp-card',
  '.cert-card',
  '.testimonial-card',
  '.contact-content',
  '.hero-stats'
];

document.querySelectorAll(animSelectors.join(', ')).forEach((el, i) => {
  el.classList.add('fade-up');
  el.style.transitionDelay = `${(i % 4) * 0.1}s`;
  fadeObserver.observe(el);
});

// Counter animation trigger
const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
  const counterObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      animateCounters();
      counterObserver.unobserve(heroStats);
    }
  }, { threshold: 0.5 });
  counterObserver.observe(heroStats);
}

// ==========================================
// NAVBAR — scroll effect & active link
// ==========================================
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

function onScroll() {
  const scrollY = window.scrollY;

  // Navbar background
  if (scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active section highlight
  const offset = 150;
  sections.forEach(section => {
    const top = section.offsetTop - offset;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) {
      if (scrollY >= top && scrollY < bottom) {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}

window.addEventListener('scroll', onScroll, { passive: true });

// ==========================================
// SMOOTH SCROLLING
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      const top = target.offsetTop - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ==========================================
// CARD TILT EFFECT (subtle)
// ==========================================
document.querySelectorAll('[data-tilt]').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-6px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ==========================================
// MOBILE MENU TOGGLE
// ==========================================
const menuBtn = document.getElementById('menuBtn');
const navLinksContainer = document.querySelector('.nav-links');

if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    navLinksContainer.style.display =
      navLinksContainer.style.display === 'flex' ? 'none' : 'flex';
  });
}
