const menuBtn = document.querySelector(".menuBtn");
const menuPanel = document.getElementById("menuPanel");
const yearEl = document.getElementById("year");
const form = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

yearEl.textContent = new Date().getFullYear();

menuBtn.addEventListener("click", () => {
  const expanded = menuBtn.getAttribute("aria-expanded") === "true";
  menuBtn.setAttribute("aria-expanded", String(!expanded));
  menuPanel.hidden = expanded;
});

menuPanel.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => {
    menuBtn.setAttribute("aria-expanded", "false");
    menuPanel.hidden = true;
  });
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 760) {
    menuBtn.setAttribute("aria-expanded", "false");
    menuPanel.hidden = true;
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !message) {
    formNote.textContent = "Please fill out all fields.";
    return;
  }

  formNote.textContent = "Message sent! I’ll get back to you soon.";
  form.reset();
});

/* =========================
   Scroll reveal + stagger
========================= */
const animated = [...document.querySelectorAll("[data-animate]")];

// add stagger delay automatically for grids
animated.forEach((el) => {
  const parentGrid = el.closest(".grid--3") || el.closest(".servicesGrid");

  if (parentGrid) {
    const siblings = [...parentGrid.querySelectorAll("[data-animate]")];
    const index = siblings.indexOf(el);
    el.style.setProperty("--delay", `${index * 90}ms`);
  }
});

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-inview");
        io.unobserve(entry.target); // reveal once
      }
    });
  },
  { threshold: 0.15 },
);

animated.forEach((el) => io.observe(el));

/* =========================
   Header scroll state
========================= */
const header = document.querySelector(".header");

const onScroll = () => {
  if (window.scrollY > 10) header.classList.add("is-scrolled");
  else header.classList.remove("is-scrolled");
};
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });
