/* ===== Typing Effect ===== */
const roles = [
  "Full-Stack Developer",
  "Frontend Enthusiast",
  "Node.js Developer",
  "API Integrator",
  "Problem Solver"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.getElementById("typing-text");
const typingSpeed = 80;
const deletingSpeed = 40;
const pauseTime = 1800;

function typeEffect() {
  const current = roles[roleIndex];
  
  if (isDeleting) {
    typingEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === current.length) {
    isDeleting = true;
    setTimeout(typeEffect, pauseTime);
    return;
  }

  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
  }

  setTimeout(typeEffect, isDeleting ? deletingSpeed : typingSpeed);
}

/* ===== Navbar Scroll ===== */
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // Active section highlight
  const sections = document.querySelectorAll("section[id]");
  let current = "";
  sections.forEach((section) => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) {
      current = section.getAttribute("id");
    }
  });
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

/* ===== Mobile Menu ===== */
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("open");
  hamburger.classList.toggle("active");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
  });
});

/* ===== Scroll Reveal ===== */
const reveals = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
);

reveals.forEach((el) => revealObserver.observe(el));

/* ===== Counter Animation ===== */
const counters = document.querySelectorAll(".stat-num");
let counted = false;

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !counted) {
        counted = true;
        counters.forEach((counter) => {
          const target = +counter.getAttribute("data-target");
          const duration = 1500;
          const step = target / (duration / 16);
          let current = 0;

          const update = () => {
            current += step;
            if (current < target) {
              counter.textContent = Math.floor(current);
              requestAnimationFrame(update);
            } else {
              counter.textContent = target;
            }
          };
          update();
        });
      }
    });
  },
  { threshold: 0.5 }
);

if (counters.length) {
  counterObserver.observe(counters[0].closest(".about-stats") || counters[0]);
}

/* ===== Contact Form ===== */
const form = document.getElementById("contact-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  // Open mailto as fallback (no backend)
  const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  window.location.href = `mailto:rajpravir945@gmail.com?subject=${subject}&body=${body}`;

  form.reset();
});

/* ===== Smooth init ===== */
document.addEventListener("DOMContentLoaded", () => {
  typeEffect();
});
