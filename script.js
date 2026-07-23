// Reduce el padding del navbar al hacer scroll
const nav = document.getElementById('mainNav');
const hero = document.querySelector('.hero');
const heroCopy = document.querySelector('.hero-copy');
const particlesWrap = document.querySelector('.hero-particles');

const updateNavOnScroll = () => {
  if (window.scrollY > 40) {
    nav.style.padding = '.5rem 0';
  } else {
    nav.style.padding = '.9rem 0';
  }
};

const updateHeroParallax = () => {
  if (!hero) return;
  const scrollY = window.scrollY || window.pageYOffset;
  const parallaxOffset = Math.min(scrollY * 0.16, 90);
  hero.style.setProperty('--hero-parallax', `${parallaxOffset}px`);

  if (heroCopy) {
    const fadeProgress = Math.max(0, Math.min(1, 1 - scrollY / 520));
    const copyShift = Math.min(scrollY * 0.03, 12);
    heroCopy.style.transform = `translateY(${copyShift}px)`;
    heroCopy.style.opacity = fadeProgress.toFixed(3);
    heroCopy.style.filter = `blur(${(1 - fadeProgress) * 1.8}px)`;
  }
};

let ticking = false;
window.addEventListener('scroll', () => {
  updateNavOnScroll();

  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateHeroParallax();
      ticking = false;
    });
    ticking = true;
  }
});

// Cierra el menú móvil al hacer clic en un link y mantiene el enlace activo
const navLinks = document.querySelectorAll('#navMenu .nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.forEach(item => item.classList.remove('active'));
    link.classList.add('active');

    const menu = document.getElementById('navMenu');
    if (menu.classList.contains('show')) {
      new bootstrap.Collapse(menu).hide();
    }
  });
});

// Detecta la sección visible en pantalla y actualiza el enlace activo
const sections = document.querySelectorAll('header[id], section[id], footer[id]');
const activateSection = () => {
  const scrollPosition = window.scrollY + nav.offsetHeight + 80;
  let currentId = 'inicio';

  sections.forEach(section => {
    if (scrollPosition >= section.offsetTop) {
      currentId = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
  });
};

// Partículas ligeras flotando en el hero
const createParticles = () => {
  if (!particlesWrap) return;

  const particleCount = 18;
  for (let index = 0; index < particleCount; index++) {
    const particle = document.createElement('span');
    particle.className = 'hero-particle';
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.opacity = (Math.random() * 0.15 + 0.05).toFixed(2);
    particle.style.animationDelay = `${Math.random() * 6}s`;
    particle.style.animationDuration = `${Math.random() * 6 + 8}s`;
    particle.style.width = `${Math.random() * 4 + 2}px`;
    particle.style.height = particle.style.width;
    particlesWrap.appendChild(particle);
  }
};

// Crossfade suave entre sesiones al hacer scroll
const sectionBlocks = document.querySelectorAll('section[id], footer[id]');
if (sectionBlocks.length) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      } else {
        entry.target.classList.remove('is-visible');
      }
    });
  }, {
    threshold: 0.18
  });

  sectionBlocks.forEach(section => sectionObserver.observe(section));
}

// El bloque de beneficios vuelve a animarse cada vez que entra al viewport
const benefitsWrap = document.querySelector('.benefits-wrap');

if (benefitsWrap) {
  const benefitsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        benefitsWrap.classList.add('is-visible');
      } else {
        benefitsWrap.classList.remove('is-visible');
      }
    });
  }, {
    threshold: 0.18
  });

  benefitsObserver.observe(benefitsWrap);
}

const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
  card.addEventListener('mousemove', (event) => {
    const rect = card.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--spot-x', `${x}%`);
    card.style.setProperty('--spot-y', `${y}%`);
  });

  card.addEventListener('mouseleave', () => {
    card.style.setProperty('--spot-x', '50%');
    card.style.setProperty('--spot-y', '50%');
  });
});

const heroPhrases = [
  'Programas de entrenamiento personalizados para una convivencia armónica y feliz.',
  'Entrenamiento con cariño para perros respetuosos y equilibrados.',
  'Mejoramos la conexión entre tú y tu mascota con técnicas probadas.',
  'Sesiones dinámicas que fortalecen el vínculo y la obediencia.',
  'Resultados claros con planes adaptados a cada perro y familia.'
];
const heroPhraseText = document.getElementById('heroPhraseText');
let heroPhraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typeHeroPhrase = () => {
  if (!heroPhraseText) return;

  const currentText = heroPhrases[heroPhraseIndex];

  if (isDeleting) {
    charIndex = Math.max(0, charIndex - 1);
  } else {
    charIndex = Math.min(currentText.length, charIndex + 1);
  }

  heroPhraseText.textContent = currentText.substring(0, charIndex);

  let delay = isDeleting ? 30 : 50;

  if (!isDeleting && charIndex === currentText.length) {
    delay = 1200;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    heroPhraseIndex = (heroPhraseIndex + 1) % heroPhrases.length;
    delay = 400;
  }

  setTimeout(typeHeroPhrase, delay);
};

window.addEventListener('load', () => {
  createParticles();
  updateNavOnScroll();
  updateHeroParallax();

  if (heroPhraseText) {
    heroPhraseText.textContent = '';
    typeHeroPhrase();
  }
  activateSection();
});

window.addEventListener('scroll', activateSection);
