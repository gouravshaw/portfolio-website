import './style.css'

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Scroll-triggered animations with IntersectionObserver
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Animate elements when they come into view
const animatedElements = document.querySelectorAll(
  '.section-title, .about-text, .code-card, .project-card, .contact-content, .cert-card, .testimonial-card'
);

animatedElements.forEach((el, index) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = `opacity 0.8s ease-out ${index * 0.05}s, transform 0.8s ease-out ${index * 0.05}s`;
  observer.observe(el);
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
  } else {
    navbar.style.background = 'rgba(10, 10, 10, 0.8)';
    navbar.style.boxShadow = 'none';
  }
});

// Active nav link highlight on scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
    if (navLink) {
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLink.style.color = 'var(--accent-primary)';
        navLink.style.opacity = '1';
      } else {
        navLink.style.color = '';
        navLink.style.opacity = '';
      }
    }
  });
});
