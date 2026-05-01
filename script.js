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

// ── Vehicle Make / Model dropdowns ───────────────────────
const CAR_DATA = {
  Acura: ["ILX", "Integra", "MDX", "RDX", "TLX", "NSX"],
  "Alfa Romeo": ["Giulia", "Stelvio", "Tonale"],
  "Aston Martin": ["DB11", "DBS", "DBX", "Vantage"],
  Audi: [
    "A3",
    "A4",
    "A5",
    "A6",
    "A7",
    "A8",
    "Q3",
    "Q4 e-tron",
    "Q5",
    "Q7",
    "Q8",
    "TT",
    "R8",
    "e-tron GT",
  ],
  Bentley: ["Bentayga", "Continental GT", "Flying Spur"],
  BMW: [
    "2 Series",
    "3 Series",
    "4 Series",
    "5 Series",
    "7 Series",
    "8 Series",
    "X1",
    "X2",
    "X3",
    "X4",
    "X5",
    "X6",
    "X7",
    "M3",
    "M4",
    "M5",
    "i4",
    "iX",
  ],
  Buick: ["Enclave", "Encore", "Encore GX", "Envision"],
  Cadillac: [
    "CT4",
    "CT5",
    "Escalade",
    "Escalade ESV",
    "XT4",
    "XT5",
    "XT6",
    "LYRIQ",
  ],
  Chevrolet: [
    "Blazer",
    "Bolt EV",
    "Camaro",
    "Colorado",
    "Corvette",
    "Equinox",
    "Express",
    "Malibu",
    "Silverado 1500",
    "Silverado 2500",
    "Spark",
    "Suburban",
    "Tahoe",
    "Trailblazer",
    "Traverse",
    "Trax",
  ],
  Chrysler: ["300", "Pacifica", "Voyager"],
  Dodge: ["Challenger", "Charger", "Durango", "Hornet"],
  Ferrari: ["296 GTB", "F8 Tributo", "Roma", "SF90 Stradale", "Portofino M"],
  Fiat: ["500", "500X"],
  Ford: [
    "Bronco",
    "Bronco Sport",
    "Edge",
    "Escape",
    "Expedition",
    "Explorer",
    "F-150",
    "F-250",
    "F-350",
    "Maverick",
    "Mustang",
    "Mustang Mach-E",
    "Ranger",
    "Transit",
  ],
  Genesis: ["G70", "G80", "G90", "GV70", "GV80"],
  GMC: [
    "Acadia",
    "Canyon",
    "Sierra 1500",
    "Sierra 2500",
    "Sierra 3500",
    "Terrain",
    "Yukon",
    "Yukon XL",
  ],
  Honda: [
    "Accord",
    "Civic",
    "CR-V",
    "HR-V",
    "Odyssey",
    "Passport",
    "Pilot",
    "Ridgeline",
  ],
  Hyundai: [
    "Elantra",
    "Ioniq 5",
    "Ioniq 6",
    "Kona",
    "Palisade",
    "Santa Cruz",
    "Santa Fe",
    "Sonata",
    "Tucson",
    "Venue",
  ],
  Infiniti: ["Q50", "Q60", "QX50", "QX55", "QX60", "QX80"],
  Jaguar: ["E-Pace", "F-Pace", "F-Type", "I-Pace", "XE", "XF"],
  Jeep: [
    "Cherokee",
    "Compass",
    "Gladiator",
    "Grand Cherokee",
    "Grand Wagoneer",
    "Renegade",
    "Wagoneer",
    "Wrangler",
  ],
  Kia: [
    "Carnival",
    "EV6",
    "EV9",
    "Forte",
    "K5",
    "Niro",
    "Seltos",
    "Soul",
    "Sorento",
    "Sportage",
    "Stinger",
    "Telluride",
  ],
  Lamborghini: ["Huracán", "Revuelto", "Urus"],
  "Land Rover": [
    "Defender",
    "Discovery",
    "Discovery Sport",
    "Range Rover",
    "Range Rover Evoque",
    "Range Rover Sport",
    "Range Rover Velar",
  ],
  Lexus: ["ES", "GS", "GX", "IS", "LC", "LS", "LX", "NX", "RX", "UX"],
  Lincoln: ["Aviator", "Corsair", "Navigator", "Nautilus"],
  Maserati: ["Ghibli", "GranTurismo", "Grecale", "Levante", "Quattroporte"],
  Mazda: [
    "CX-30",
    "CX-5",
    "CX-50",
    "CX-90",
    "Mazda3",
    "Mazda6",
    "MX-5 Miata",
    "MX-30",
  ],
  McLaren: ["720S", "Artura", "GT"],
  "Mercedes-Benz": [
    "A-Class",
    "C-Class",
    "CLA",
    "CLS",
    "E-Class",
    "EQB",
    "EQC",
    "EQE",
    "EQS",
    "G-Class",
    "GLA",
    "GLB",
    "GLC",
    "GLE",
    "GLS",
    "S-Class",
    "SL",
    "AMG GT",
  ],
  MINI: [
    "Clubman",
    "Convertible",
    "Countryman",
    "Hardtop 2 Door",
    "Hardtop 4 Door",
  ],
  Mitsubishi: ["Eclipse Cross", "Mirage", "Outlander", "Outlander Sport"],
  Nissan: [
    "Altima",
    "Armada",
    "Frontier",
    "Kicks",
    "Leaf",
    "Maxima",
    "Murano",
    "Pathfinder",
    "Rogue",
    "Sentra",
    "Titan",
    "Versa",
    "Z",
  ],
  Porsche: [
    "718 Boxster",
    "718 Cayman",
    "911",
    "Cayenne",
    "Macan",
    "Panamera",
    "Taycan",
  ],
  Ram: ["1500", "2500", "3500", "ProMaster", "ProMaster City"],
  Rivian: ["R1S", "R1T"],
  "Rolls-Royce": ["Cullinan", "Ghost", "Phantom", "Spectre", "Wraith"],
  Subaru: [
    "Ascent",
    "BRZ",
    "Crosstrek",
    "Forester",
    "Impreza",
    "Legacy",
    "Outback",
    "Solterra",
    "WRX",
  ],
  Tesla: ["Cybertruck", "Model 3", "Model S", "Model X", "Model Y"],
  Toyota: [
    "4Runner",
    "Camry",
    "Corolla",
    "GR86",
    "Highlander",
    "Land Cruiser",
    "Prius",
    "RAV4",
    "Sequoia",
    "Sienna",
    "Supra",
    "Tacoma",
    "Tundra",
    "Venza",
  ],
  Volkswagen: [
    "Atlas",
    "Atlas Cross Sport",
    "Golf",
    "ID.4",
    "Jetta",
    "Passat",
    "Taos",
    "Tiguan",
  ],
  Volvo: ["C40 Recharge", "S60", "S90", "V60", "V90", "XC40", "XC60", "XC90"],
};

const makeSelect = document.getElementById("make");
const modelSelect = document.getElementById("model");

// Populate makes (alphabetical; Other at end)
Object.keys(CAR_DATA)
  .sort()
  .forEach((make) => {
    const opt = document.createElement("option");
    opt.value = opt.textContent = make;
    makeSelect.appendChild(opt);
  });
const otherMakeOpt = document.createElement("option");
otherMakeOpt.value = otherMakeOpt.textContent = "Other";
makeSelect.appendChild(otherMakeOpt);

makeSelect.addEventListener("change", () => {
  modelSelect.innerHTML = '<option value="">Select model...</option>';
  const models = CAR_DATA[makeSelect.value];
  if (models) {
    models.forEach((model) => {
      const opt = document.createElement("option");
      opt.value = opt.textContent = model;
      modelSelect.appendChild(opt);
    });
  }
  if (makeSelect.value) {
    const otherOpt = document.createElement("option");
    otherOpt.value = otherOpt.textContent = "Other";
    modelSelect.appendChild(otherOpt);
    modelSelect.disabled = false;
  } else {
    modelSelect.disabled = true;
  }
});

// ── Contact form (client-side validation + mock submit) ───
const form = document.getElementById("contact-form");
const successMsg = document.getElementById("form-success");

// Phone auto-format as user types → (XXX) XXX-XXXX
document.getElementById("phone").addEventListener("input", (e) => {
  let digits = e.target.value.replace(/\D/g, "").slice(0, 10);
  let formatted = "";
  if (digits.length > 0) formatted = "(" + digits.slice(0, 3);
  if (digits.length >= 4) formatted += ") " + digits.slice(3, 6);
  if (digits.length >= 7) formatted += "-" + digits.slice(6, 10);
  e.target.value = formatted;
});

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

  // Phone format (must be complete US number)
  const phoneField = form.querySelector("#phone");
  const phoneDigits = phoneField.value.replace(/\D/g, "");
  if (phoneDigits.length !== 10) {
    phoneField.classList.add("error");
    valid = false;
  }

  if (!valid) return;

  // CC the customer on the submission email (reliable delivery vs _autoresponse)
  document.getElementById("fs-cc").value = emailField.value;
  // Set Reply-To so the owner can reply directly to the customer
  document.getElementById("_replyto").value = emailField.value;

  const submitBtn = form.querySelector('[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.textContent = "Sending…";

  // POST into the hidden iframe — no page redirect, no fetch/AJAX needed
  form.submit();

  // Show confirmation immediately after dispatching the POST
  setTimeout(() => {
    form.reset();
    modelSelect.disabled = true;
    successMsg.textContent = "✔ Thank you! We'll be in touch shortly.";
    successMsg.style.borderColor = "";
    successMsg.style.color = "";
    successMsg.classList.add("show");
    setTimeout(() => successMsg.classList.remove("show"), 6000);
    submitBtn.disabled = false;
    submitBtn.textContent = "Send Request";
  }, 400);
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

// ── Insurance Providers Marquee ───────────────────────────
(function () {
  const marquee = document.getElementById("ip-marquee");
  if (!marquee) return;

  // Pause on touch (hover handled by CSS)
  let resumeTimer;
  marquee.addEventListener(
    "touchstart",
    () => {
      clearTimeout(resumeTimer);
      marquee.classList.add("paused");
    },
    { passive: true },
  );

  marquee.addEventListener(
    "touchend",
    () => {
      resumeTimer = setTimeout(() => marquee.classList.remove("paused"), 1000);
    },
    { passive: true },
  );

  // Respect prefers-reduced-motion
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    marquee.style.animationDuration = "120s";
  }
})();
