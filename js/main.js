// ===== TERMINAL TYPEWRITER =====
const lines = [
  '> Initializing security toolkit...',
  '> Loading exploit modules... done',
  '> Welcome. You are being watched.',
];
let lineIdx = 0, charIdx = 0, deleting = false, pause = false;
const terminal = document.getElementById('terminalOutput');

function typeWriter() {
  if (!terminal) return;
  if (pause) { setTimeout(typeWriter, 1500); pause = false; return; }

  const current = lines[lineIdx];
  if (!deleting) {
    terminal.textContent = current.slice(0, charIdx + 1) + '▮';
    charIdx++;
    if (charIdx === current.length) { pause = true; deleting = true; setTimeout(typeWriter, 1500); return; }
  } else {
    terminal.textContent = current.slice(0, charIdx) + '▮';
    charIdx--;
    if (charIdx < 0) {
      deleting = false; charIdx = 0;
      lineIdx = (lineIdx + 1) % lines.length;
      setTimeout(typeWriter, 400); return;
    }
  }
  setTimeout(typeWriter, deleting ? 30 : 55);
}
typeWriter();

// ===== NAV SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.borderBottomColor = window.scrollY > 40 ? '#1a2535' : 'transparent';
});

// ===== HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));

// ===== COUNTER ANIMATION =====
function animateCounters() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = +el.dataset.target;
    let current = 0;
    const step = Math.ceil(target / 40);
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current;
      if (current >= target) clearInterval(timer);
    }, 40);
  });
}

// ===== SKILL BARS =====
function animateSkillBars() {
  document.querySelectorAll('.skill-fill').forEach(el => {
    el.style.width = el.dataset.width;
  });
}

// ===== INTERSECTION OBSERVER =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      if (id === 'about') animateCounters();
      if (id === 'skills') animateSkillBars();
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

['about','skills','writeups','ctf','contact'].forEach(id => {
  const el = document.getElementById(id);
  if (el) observer.observe(el);
});

// ===== WRITEUP FILTER =====
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.writeup-card').forEach(card => {
      const show = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('hidden', !show);
    });
  });
});

// ===== CONTACT FORM =====
document.getElementById('contactForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.textContent = '> Message sent!';
  btn.style.background = '#00c8ff';
  setTimeout(() => {
    btn.textContent = 'Send Message_';
    btn.style.background = '';
    e.target.reset();
  }, 3000);
});

// ===== SMOOTH REVEAL =====
const style = document.createElement('style');
style.textContent = `
  section { opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease, transform 0.6s ease; }
  section.visible, #hero { opacity: 1; transform: none; }
`;
document.head.appendChild(style);
document.getElementById('hero')?.classList.add('visible');
