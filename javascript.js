// javascript.js
// Interactive logic for donation landing page
// Demonstrates DOM manipulation, variables, functions, arrays, objects, loops, conditions and events

// Configuration and state variables
const GOAL_AMOUNT = 50000; // NOK
const MAX_DONATION_AMOUNT = 50000; // NOK
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
  {
    title: "Video and Audio Content",
    desc: "Creating and editing video and audio content for learning, portfolio work and media projects.",
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
const donationModal = document.getElementById("donationModal");
const closeDonationModal = document.getElementById("closeDonationModal");
const modalDonationAmount = document.getElementById("modalDonationAmount");
const customVideoPlayer = document.getElementById("customVideoPlayer");
const projectVideo = document.getElementById("projectVideo");
const hero = document.getElementById("hero");
// use the parallax items placed in the hero and across the page (images 2-5)
const parallaxItems = document.querySelectorAll(".parallax-item");
const pageParallaxItems = document.querySelectorAll(".page-parallax-item");
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
);
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
  if (!Number.isFinite(amount) || amount <= 0) {
    alert("Please enter a valid amount greater than 0.");
    return false;
  }
  if (amount > MAX_DONATION_AMOUNT) {
    alert(`Please enter an amount up to ${formatCurrency(MAX_DONATION_AMOUNT)} NOK.`);
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

function openDonationModal(amount) {
  if (!donationModal) return;
  if (modalDonationAmount) {
    modalDonationAmount.textContent = `Selected amount: ${formatCurrency(amount)} NOK`;
  }
  donationModal.classList.remove("hidden");
  document.body.classList.add("modal-open");
  if (closeDonationModal) closeDonationModal.focus();
}

function closeVippsModal() {
  if (!donationModal) return;
  donationModal.classList.add("hidden");
  document.body.classList.remove("modal-open");
}

function formatVideoTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${remainingSeconds}`;
}

function createVideoButton(label, className) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = className;
  button.textContent = label;
  return button;
}

function setupCustomVideoPlayer() {
  if (!customVideoPlayer || !projectVideo) return;

  const controls = document.createElement("div");
  controls.className = "video-controls";

  const playButton = createVideoButton("Play", "video-control-button");
  const muteButton = createVideoButton("Mute", "video-control-button");

  const progress = document.createElement("input");
  progress.className = "video-progress";
  progress.type = "range";
  progress.min = "0";
  progress.max = "100";
  progress.value = "0";
  progress.step = "0.1";
  progress.setAttribute("aria-label", "Video progress");

  const timeDisplay = document.createElement("span");
  timeDisplay.className = "video-time";
  timeDisplay.textContent = "0:00 / 0:00";

  const volume = document.createElement("input");
  volume.className = "video-volume";
  volume.type = "range";
  volume.min = "0";
  volume.max = "1";
  volume.value = projectVideo.volume;
  volume.step = "0.05";
  volume.setAttribute("aria-label", "Video volume");

  controls.appendChild(playButton);
  controls.appendChild(progress);
  controls.appendChild(timeDisplay);
  controls.appendChild(muteButton);
  controls.appendChild(volume);
  customVideoPlayer.appendChild(controls);

  function updateVideoUi() {
    const duration = projectVideo.duration || 0;
    const currentTime = projectVideo.currentTime || 0;
    progress.value = duration ? (currentTime / duration) * 100 : 0;
    timeDisplay.textContent = `${formatVideoTime(currentTime)} / ${formatVideoTime(duration)}`;
    playButton.textContent = projectVideo.paused ? "Play" : "Pause";
    muteButton.textContent = projectVideo.muted ? "Unmute" : "Mute";
  }

  playButton.addEventListener("click", () => {
    if (projectVideo.paused) {
      projectVideo.play();
    } else {
      projectVideo.pause();
    }
  });

  projectVideo.addEventListener("click", () => {
    if (projectVideo.paused) {
      projectVideo.play();
    } else {
      projectVideo.pause();
    }
  });

  progress.addEventListener("input", () => {
    if (!projectVideo.duration) return;
    projectVideo.currentTime = (Number(progress.value) / 100) * projectVideo.duration;
  });

  muteButton.addEventListener("click", () => {
    projectVideo.muted = !projectVideo.muted;
    updateVideoUi();
  });

  volume.addEventListener("input", () => {
    projectVideo.volume = Number(volume.value);
    projectVideo.muted = projectVideo.volume === 0;
    updateVideoUi();
  });

  projectVideo.addEventListener("loadedmetadata", updateVideoUi);
  projectVideo.addEventListener("timeupdate", updateVideoUi);
  projectVideo.addEventListener("play", updateVideoUi);
  projectVideo.addEventListener("pause", updateVideoUi);
  projectVideo.addEventListener("ended", updateVideoUi);

  updateVideoUi();
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
      openDonationModal(Number(amount));
    }
  });
}

if (closeDonationModal) {
  closeDonationModal.addEventListener("click", closeVippsModal);
}

if (donationModal) {
  donationModal.addEventListener("click", (e) => {
    if (e.target === donationModal) closeVippsModal();
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeVippsModal();
});

// Why toggle show/hide
if (whyToggle && explainSection) {
  whyToggle.addEventListener("click", () => {
    explainSection.classList.remove("hidden");
    const header = document.querySelector(".site-header");
    const headerHeight = header ? header.offsetHeight : 0;
    const rect = explainSection.getBoundingClientRect();
    const offsetTop = window.scrollY + rect.top - headerHeight - 12;
    window.scrollTo({ top: offsetTop, behavior: "smooth" });
  });
}

// Smooth parallax effect for hero background (guard)
function updateHeroParallax() {
  const scrolled = window.scrollY;
  if (hero) hero.style.backgroundPosition = `center ${50 + scrolled * 0.06}%`;
  if (reducedMotion) return;
  parallaxItems.forEach((layer, index) => {
    const speedValues = [0.02, 0.05, 0.035, 0.06];
    const hMult = index % 2 === 0 ? -1 : 1; // alternate horizontal direction
    const speed = speedValues[index] || 0.04;
    const x = scrolled * speed * 0.4 * hMult;
    const y = scrolled * speed;
    layer.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  });
  pageParallaxItems.forEach((layer, index) => {
    const speedValues = [-0.08, -0.13, -0.06, -0.1];
    const hMult = index % 2 === 0 ? 1 : -1;
    const speed = speedValues[index] || -0.08;
    const x = Math.sin(scrolled * 0.004 + index) * 18 * hMult;
    const y = scrolled * speed;
    const rotate = Math.sin(scrolled * 0.002 + index) * 5;
    layer.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rotate}deg)`;
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
  setupCustomVideoPlayer();
  renderProjects();
  updateProgress();
}

init();
