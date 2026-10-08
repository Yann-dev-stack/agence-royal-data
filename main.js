import './style.css'

window.addEventListener('load', () => {
  const loader = document.getElementById('loader-wrapper');
  if (loader) {
    loader.style.opacity = '0';
    setTimeout(() => {
      loader.style.visibility = 'hidden';
      loader.style.display = 'none';
    }, 500);
  }
});

// Language Toggle
const langBtn = document.getElementById('lang-toggle');
if (langBtn) {
  langBtn.addEventListener('click', () => {
    const currentLang = document.documentElement.lang;
    const newLang = currentLang === 'fr' ? 'en' : 'fr';
    document.documentElement.lang = newLang;
    langBtn.innerHTML = newLang === 'fr' ? 'EN' : 'FR';
  });
}

// Theme Toggle
const themeBtn = document.getElementById('theme-toggle');
if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    themeBtn.innerHTML = newTheme === 'dark' ? '<i class="fa-regular fa-sun"></i>' : '<i class="fa-regular fa-moon"></i>';
  });
}

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const mainNav = document.getElementById('main-nav');
if (hamburger && mainNav) {
  hamburger.addEventListener('click', () => {
    mainNav.classList.toggle('active');
    const icon = mainNav.classList.contains('active') ? 'fa-xmark' : 'fa-bars';
    hamburger.innerHTML = `<i class="fa-solid ${icon}"></i>`;
  });
}

// Header Scroll Effect
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Scroll Animations (Intersection Observer)
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Number animation
      if (entry.target.classList.contains('stats')) {
        const counters = entry.target.querySelectorAll('.stat-number');
        counters.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          if (!target) return;
          const duration = 1500;
          const increment = target / (duration / 16);
          let current = 0;
          const updateCounter = () => {
            current += increment;
            if (current < target) {
              counter.innerText = Math.ceil(current);
              requestAnimationFrame(updateCounter);
            } else {
              counter.innerText = target;
              if (counter.hasAttribute('data-prefix')) {
                 counter.innerText = counter.getAttribute('data-prefix') + counter.innerText;
              }
            }
          };
          updateCounter();
        });
      }
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-up, .stats').forEach(el => {
  observer.observe(el);
});

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.parentElement;
    item.classList.toggle('active');
  });
});

// Curved Gallery Animation
const track = document.getElementById('gallery-track');
if (track) {
  let pos = 0;
  const speed = 1.2; // pixels per frame
  const items = Array.from(track.children);
  
  // Clone items for infinite loop
  items.forEach(item => {
    track.appendChild(item.cloneNode(true));
  });
  items.forEach(item => {
    track.appendChild(item.cloneNode(true));
  });

  const animateGallery = () => {
    pos -= speed;
    
    // We assume each item + gap is ~300px
    const itemWidthStr = window.getComputedStyle(items[0]).width;
    const itemWidth = parseFloat(itemWidthStr) || 260;
    const gap = 40; // 2.5rem
    const firstSetWidth = (itemWidth + gap) * items.length;
    
    if (Math.abs(pos) >= firstSetWidth) {
      pos += firstSetWidth;
    }
    track.style.transform = `translateX(${pos}px)`;
    
    const allItems = track.children;
    const centerX = window.innerWidth / 2;
    const maxDist = window.innerWidth / 2 + itemWidth;
    
    for (let i = 0; i < allItems.length; i++) {
      const el = allItems[i];
      // Since it's absolutely positioned track, the center of the item relative to viewport is:
      // track.left + pos + (item index * (itemWidth + gap)) + (itemWidth / 2)
      // track left is 50% (window.innerWidth / 2)
      
      const elCenter = (window.innerWidth / 2) + pos + (i * (itemWidth + gap)) + (itemWidth / 2);
      const dist = elCenter - centerX;
      
      let normalizedDist = dist / (window.innerWidth / 2);
      if (normalizedDist > 1.5) normalizedDist = 1.5;
      if (normalizedDist < -1.5) normalizedDist = -1.5;
      
      // Scale: 1 at center, up to 1.3 at edges
      let scale = 1 + Math.pow(Math.abs(normalizedDist), 2) * 0.3;
      if (scale > 1.4) scale = 1.4;
      
      // Rotate: 0 at center, up to 45deg at edges
      let rotateY = -normalizedDist * 40;
      if (rotateY > 60) rotateY = 60;
      if (rotateY < -60) rotateY = -60;
      
      // Z-index: center is lowest (further back), edges are highest (closer)
      const zIndex = Math.round(Math.abs(normalizedDist) * 100);
      
      el.style.transform = `rotateY(${rotateY}deg) scale(${scale})`;
      el.style.zIndex = zIndex;
    }
    
    requestAnimationFrame(animateGallery);
  };
  
  // Wait a tick to ensure styles are computed
  setTimeout(() => {
    animateGallery();
  }, 100);
}

// Testimonials Carousel
const testimonials = [
  {
    initials: "SM",
    name: "Sarah M.",
    role: "Propriétaire d'entreprise",
    textFr: "\"Une qualité de travail irréprochable et des conseils d'experts — c'est ce que j'ai vécu avec Royal Data. Voyez par vous-même pourquoi je leur confie tous mes projets de création !\"",
    textEn: "\"Flawless work quality and expert guidance — that's what I experienced with Royal Data. See for yourself why I trust them with all my creation projects!\""
  },
  {
    initials: "RI",
    name: "Roberdi Idohou",
    role: "Formation Affiches IA",
    textFr: "\"Juste une première expérimentation, avec ce que j'ai appris avec Royal Data — déjà un résultat que je n'espérais pas.\"",
    textEn: "\"Just a first experiment, with what I learned with Royal Data — already a result I didn't expect.\""
  },
  {
    initials: "KF",
    name: "Keebah Food",
    role: "Cliente",
    textFr: "\"Après avoir suivi la formation, voilà ma première affiche... je suis surprise du résultat, alors que je doutais tellement avant de commencer.\"",
    textEn: "\"After taking the training, here is my first poster... I am surprised by the result, whereas I doubted so much before starting.\""
  }
];

let currentTestiIndex = 0;
const testiAvatar = document.getElementById('testi-avatar');
const testiName = document.getElementById('testi-name');
const testiRole = document.getElementById('testi-role');
const testiTextFr = document.getElementById('testi-text-fr');
const testiTextEn = document.getElementById('testi-text-en');
const testiPrev = document.getElementById('testi-prev');
const testiNext = document.getElementById('testi-next');
const testiFront = document.getElementById('testi-front');

function updateTestimonial(index) {
  if (!testiFront) return;
  
  // Add animation class
  testiFront.style.opacity = '0';
  testiFront.style.transform = 'translateY(10px)';
  
  setTimeout(() => {
    const data = testimonials[index];
    testiAvatar.textContent = data.initials;
    testiName.textContent = data.name;
    testiRole.textContent = data.role;
    testiTextFr.textContent = data.textFr;
    testiTextEn.textContent = data.textEn;
    
    testiFront.style.opacity = '1';
    testiFront.style.transform = 'translateY(0)';
  }, 300);
}

if (testiPrev && testiNext) {
  testiPrev.addEventListener('click', () => {
    currentTestiIndex = (currentTestiIndex - 1 + testimonials.length) % testimonials.length;
    updateTestimonial(currentTestiIndex);
  });
  
  testiNext.addEventListener('click', () => {
    currentTestiIndex = (currentTestiIndex + 1) % testimonials.length;
    updateTestimonial(currentTestiIndex);
  });
  
  // Ensure transition exists on the front card
  testiFront.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
}
