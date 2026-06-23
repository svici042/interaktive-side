// javascript.js
// Interactive logic for donation landing page
// Demonstrates DOM manipulation, variables, functions, arrays, objects, loops, conditions and events

// Configuration and state variables
const GOAL_AMOUNT = 50000; // NOK
let raisedAmount = 0; // current raised (demo-local)
const donors = []; // array of donor objects {name,amount}

// Predefined projects (array of objects)
const projects = [
  {
    title: "Web Development",
    desc: "Full-stack web apps, performance and scalable UI.",
  },
  {
    title: "AI Experiments",
    desc: "Local model training, experiments and tooling.",
  },
  {
    title: "Creative Coding",
    desc: "Visuals, generative art and interactive installations.",
  },
  {
    title: "Marine Navigation App",
    desc: "Mapping and route planning for sea navigation.",
  },
  {
    title: "Portfolio Projects",
    desc: "High-quality portfolio with video and demos.",
  },
];

// Thank you messages
const thankYouMessages = [
  "Huge thanks — your support means a lot!",
  "You rock! Thank you for supporting the learning journey.",
  "Appreciate it — your contribution helps make big projects possible.",
  "Thank you! Every NOK helps toward the goal.",
  "Amazing support — thank you!",
];

// DOM references (use querySelector and getElementById)
const donationForm = document.getElementById("donationForm");
const donorNameInput = document.getElementById("donorName");
const donationAmountInput = document.getElementById("donationAmount");
const presetButtons = document.querySelectorAll(".preset");
const donorList = document.getElementById("donorList");
const raisedAmountEl = document.getElementById("raisedAmount");
const progressPercentEl = document.getElementById("progressPercent");
const progressFillEl = document.getElementById("progressFill");
const projectsGrid = document.getElementById("projectsGrid");
const whyToggle = document.getElementById("whyToggle");
const explainSection = document.getElementById("explain");
const thankMessageEl = document.getElementById("thankMessage");
const themeToggle = document.getElementById("themeToggle");
const hero = document.getElementById("hero");
const heroLayers = document.querySelectorAll('.hero-layer');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const reducedMotion = prefersReducedMotion.matches;
// Utility functions
function formatCurrency(n) {
  return Math.round(n).toLocaleString("en-US");
}

function updateProgress() {
  // calculate percent and update DOM
  const percent = Math.min(100, Math.round((raisedAmount / GOAL_AMOUNT) * 100));
  raisedAmountEl.textContent = formatCurrency(raisedAmount);
  progressPercentEl.textContent = percent;
  progressFillEl.style.width = percent + "%";
  progressFillEl.parentElement.setAttribute("aria-valuenow", percent);
}

function createDonorCard(donor) {
  // create a DOM element for the donor using createElement
  const card = document.createElement("div");
  card.className = "donor-card";
  const text = document.createElement("div");
  // format amount for display
  text.textContent = `${donor.name} supported the project with ${formatCurrency(donor.amount)} NOK`;
  const impact = document.createElement("div");
  // impact message based on amount
  if (donor.amount < 100) {
    impact.textContent = "Small support — thank you!";
  } else if (donor.amount >= 100 && donor.amount < 500) {
    impact.textContent = "Medium support — very grateful!";
  } else {
    impact.textContent = "Strong support — huge thanks!";
  }
  card.appendChild(text);
  card.appendChild(impact);
  return card;
}

function addDonor(name, amount) {
  // validation
  if (!name || name.trim().length === 0) {
    alert("Please enter your name.");
    return false;
  }
  amount = Number(amount);
  if (!amount || amount <= 0) {
    alert("Please enter an amount greater than 0.");
    return false;
  }
  const donor = { name: name.trim(), amount: amount };
  donors.push(donor);
  // update raised amount and UI
  raisedAmount += amount;
  updateProgress();
  // render donor card
  const card = createDonorCard(donor);
  donorList.prepend(card);
  // show a random thank-you message
  const rand =
    thankYouMessages[Math.floor(Math.random() * thankYouMessages.length)];
  thankMessageEl.textContent = rand;
  // clear form fields
  donorNameInput.value = "";
  donationAmountInput.value = "";
  return true;
}

// Render projects dynamically
function renderProjects() {
  projectsGrid.innerHTML = "";
  projects.forEach((p) => {
    const el = document.createElement("div");
    el.className = "project-card";
    const title = document.createElement("h4");
    title.textContent = p.title;
    const desc = document.createElement("p");
    desc.textContent = p.desc;
    el.appendChild(title);
    el.appendChild(desc);
    projectsGrid.appendChild(el);
  });
}

// Event listeners
// Preset amount buttons (guard if missing)
if (presetButtons && presetButtons.length) {
  presetButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const v = e.currentTarget.dataset.amount;
      if (donationAmountInput) donationAmountInput.value = v;
    });
  });
}

// Donation form submit (guard if missing)
if (donationForm) {
  donationForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = donorNameInput ? donorNameInput.value : "";
    const amount = donationAmountInput ? donationAmountInput.value : "";
    if (addDonor(name, amount)) {
      // optionally animate or focus
    }
  });
}

// Why toggle show/hide
if (whyToggle && explainSection) {
  whyToggle.addEventListener("click", () => {
    explainSection.classList.toggle("hidden");
  });
}

// Theme toggle
function applyTheme(theme) {
  if (theme === "light") {
    document.body.classList.add("theme-light");
    document.body.classList.remove("theme-dark");
    if (themeToggle) themeToggle.textContent = "Dark";
  } else {
    document.body.classList.add("theme-dark");
    document.body.classList.remove("theme-light");
    if (themeToggle) themeToggle.textContent = "Light";
  }
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isLight = document.body.classList.contains("theme-light");
    const newTheme = isLight ? "dark" : "light";
    applyTheme(newTheme);
    localStorage.setItem("siteTheme", newTheme);
  });
}

// Smooth parallax effect for hero background (guard)
function updateHeroParallax() {
  const scrolled = window.scrollY;
  if (hero) hero.style.backgroundPosition = `center ${50 + scrolled * 0.06}%`;
  if (reducedMotion) return;
  heroLayers.forEach((layer, index) => {
    const speedValues = [0.02, 0.05, 0.035, 0.06];
    const speed = speedValues[index] || 0.04;
    layer.style.transform = `translateY(${scrolled * speed}px)`;
  });
}
window.addEventListener("scroll", updateHeroParallax);

// Smooth anchor scrolling with offset for sticky header
(function enableSmoothAnchors() {
  const links = document.querySelectorAll('a[href^="#"]');
  const header = document.querySelector(".site-header");
  const headerHeight = header ? header.offsetHeight : 0;
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (!href || href === "#") return;
      if (href.startsWith("#")) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const rect = target.getBoundingClientRect();
          const offsetTop = window.scrollY + rect.top - headerHeight - 12;
          window.scrollTo({ top: offsetTop, behavior: "smooth" });
        }
      }
    });
  });
})();

// Initialize
function init() {
  // restore theme
  const savedTheme = localStorage.getItem("siteTheme") || "dark";
  applyTheme(savedTheme);
  renderProjects();
  updateProgress();
}

init();
