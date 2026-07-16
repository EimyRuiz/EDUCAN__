// Reduce el padding del navbar al hacer scroll
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    nav.style.padding = '.5rem 0';
  } else {
    nav.style.padding = '.9rem 0';
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
  if (heroPhraseText) {
    heroPhraseText.textContent = '';
    typeHeroPhrase();
  }
  activateSection();
});

window.addEventListener('scroll', activateSection);
