const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const cursor = document.querySelector(".cursor");
const cursorRing = document.querySelector(".cursor-ring");
const magneticButtons = document.querySelectorAll(".magnetic");

if (!prefersReduced) {
  document.addEventListener("mousemove", (event) => {
    const { clientX, clientY } = event;
    if (cursor) cursor.style.transform = `translate(${clientX}px, ${clientY}px)`;
    if (cursorRing) cursorRing.style.transform = `translate(${clientX}px, ${clientY}px)`;
  });

  magneticButtons.forEach((button) => {
    button.addEventListener("mousemove", (event) => {
      const rect = button.getBoundingClientRect();
      const offsetX = event.clientX - rect.left - rect.width / 2;
      const offsetY = event.clientY - rect.top - rect.height / 2;
      button.style.transform = `translate(${offsetX * 0.15}px, ${offsetY * 0.15}px)`;
      if (cursorRing) {
        cursorRing.style.width = "48px";
        cursorRing.style.height = "48px";
        cursorRing.style.border = "1px solid rgba(225, 6, 0, 0.5)";
      }
    });

    button.addEventListener("mouseleave", () => {
      button.style.transform = "translate(0, 0)";
      if (cursorRing) {
        cursorRing.style.width = "32px";
        cursorRing.style.height = "32px";
        cursorRing.style.border = "1px solid rgba(255, 255, 255, 0.2)";
      }
    });
  });
}

const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.2 }
);

reveals.forEach((reveal) => observer.observe(reveal));

const tiltCards = document.querySelectorAll("[data-tilt]");
if (!prefersReduced) {
  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const offsetX = (event.clientX - rect.left) / rect.width - 0.5;
      const offsetY = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `rotateX(${offsetY * -8}deg) rotateY(${offsetX * 8}deg)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "rotateX(0) rotateY(0)";
    });
  });
}

const scramble = document.querySelector(".scramble");
if (scramble && !prefersReduced) {
  const text = scramble.dataset.text || scramble.textContent;
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let frame = 0;

  const animate = () => {
    frame += 1;
    const progress = Math.min(frame / 20, 1);
    scramble.textContent = text
      .split("")
      .map((char, index) => {
        if (index < Math.floor(progress * text.length)) return char;
        return letters[Math.floor(Math.random() * letters.length)];
      })
      .join("");

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };

  window.addEventListener("load", () => requestAnimationFrame(animate));
}

const hero = document.querySelector(".hero");
if (hero && !prefersReduced) {
  hero.addEventListener("mousemove", (event) => {
    const { clientX, clientY } = event;
    const x = (clientX / window.innerWidth - 0.5) * 12;
    const y = (clientY / window.innerHeight - 0.5) * 12;
    hero.style.backgroundPosition = `${50 + x}% ${50 + y}%`;
  });
}

const form = document.querySelector(".contact-form");
if (form) {
  form.addEventListener("submit", () => {
    const button = form.querySelector("button");
    if (button) button.textContent = "Sending...";
  });
}
