/* ============================================================
   SCRIPT.JS – Starline Collision Center
============================================================ */

// ── Year ──────────────────────────────────────────────────
document.getElementById("year").textContent = new Date().getFullYear();

// ── Navbar scroll shadow ──────────────────────────────────
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 40);
});

// ── Mobile hamburger ──────────────────────────────────────
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

function closeMenu() {
  navLinks.classList.remove("open");
  hamburger.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
  const bars = hamburger.querySelectorAll("span");
  bars[0].style.transform = "";
  bars[1].style.opacity = "";
  bars[2].style.transform = "";
}

function openMenu() {
  navLinks.classList.add("open");
  hamburger.setAttribute("aria-expanded", "true");
  document.body.classList.add("menu-open");
  const bars = hamburger.querySelectorAll("span");
  bars[0].style.transform = "translateY(7px) rotate(45deg)";
  bars[1].style.opacity = "0";
  bars[2].style.transform = "translateY(-7px) rotate(-45deg)";
}

hamburger.addEventListener("click", () => {
  navLinks.classList.contains("open") ? closeMenu() : openMenu();
});

// Close on nav link tap
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

// Close when tapping the dark overlay background (not a link)
navLinks.addEventListener("click", (e) => {
  if (e.target === navLinks) closeMenu();
});

// Close on ESC key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenu();
});

// ── Scroll-reveal (fade-up) ───────────────────────────────
const fadeEls = document.querySelectorAll(
  ".service-card, .feature, .stat-card, .about-text, .section-header, .contact-info, .contact-form-wrap",
);
fadeEls.forEach((el) => el.classList.add("fade-up"));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);
fadeEls.forEach((el) => observer.observe(el));

// ── Contact form (client-side validation + mock submit) ───
const form = document.getElementById("contact-form");
const successMsg = document.getElementById("form-success");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let valid = true;

  // Clear previous errors
  form.querySelectorAll(".error").forEach((el) => el.classList.remove("error"));

  // Required fields
  const required = form.querySelectorAll("[required]");
  required.forEach((field) => {
    if (!field.value.trim()) {
      field.classList.add("error");
      valid = false;
    }
  });

  // Email format
  const emailField = form.querySelector("#email");
  if (
    emailField.value &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)
  ) {
    emailField.classList.add("error");
    valid = false;
  }

  if (!valid) return;

  const submitBtn = form.querySelector('[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.textContent = "Sending…";

  // Collect form data
  const data = Object.fromEntries(new FormData(form));

  fetch("https://formsubmit.co/ajax/gareginmiqayelyan8@gmail.com", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (!res.ok) throw new Error("HTTP " + res.status);
      return res.json();
    })
    .then((json) => {
      console.log("FormSubmit response:", json);
      if (json.success === "true" || json.success === true) {
        form.reset();
        successMsg.textContent = "✔ Thank you! We'll be in touch shortly.";
        successMsg.style.borderColor = "";
        successMsg.style.color = "";
        successMsg.classList.add("show");
        setTimeout(() => successMsg.classList.remove("show"), 6000);
      } else {
        // FormSubmit returns success:"false" when email not yet activated
        const msg = json.message || "";
        throw new Error(msg);
      }
    })
    .catch((err) => {
      console.error("FormSubmit error:", err.message);
      const isActivation =
        err.message.toLowerCase().includes("verif") ||
        err.message.toLowerCase().includes("confirm") ||
        err.message.toLowerCase().includes("activat");
      successMsg.textContent = isActivation
        ? "⚠ Please check gareginmiqayelyan8@gmail.com for an activation email from FormSubmit and click the confirmation link, then try again."
        : "⚠ Something went wrong. Please call us at (323) 677-4777.";
      successMsg.style.borderColor = "var(--red)";
      successMsg.style.color = "var(--red)";
      successMsg.classList.add("show");
      setTimeout(() => {
        successMsg.classList.remove("show");
        successMsg.style.borderColor = "";
        successMsg.style.color = "";
      }, 9000);
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = "Send Request";
    });
});

// ── Smooth-scroll for hash links ─────────────────────────
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (target) {
      e.preventDefault();
      const offset = navbar.offsetHeight + 8;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  });
});

// ── Active nav link highlight on scroll ──────────────────
const sections = document.querySelectorAll("section[id]");
const allNavLinks = document.querySelectorAll(".nav-links a");

window.addEventListener(
  "scroll",
  () => {
    let current = "";
    sections.forEach((sec) => {
      if (window.scrollY >= sec.offsetTop - navbar.offsetHeight - 80) {
        current = sec.id;
      }
    });
    allNavLinks.forEach((link) => {
      link.style.color = "";
      link.style.borderBottomColor = "";
      if (link.getAttribute("href") === "#" + current) {
        link.style.color = "var(--gold)";
        link.style.borderBottomColor = "var(--gold)";
      }
    });
  },
  { passive: true },
);
