// Mobile navigation
const menuToggle = document.querySelector("#menu-toggle");
const navLinks = document.querySelector("#nav-links");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    menuToggle.textContent = "☰";
  });
});

// Theme toggle
const themeToggle = document.querySelector("#theme-toggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
  const isLight = document.body.classList.contains("light-theme");
  themeToggle.textContent = isLight ? "☾ Dark theme" : "☼ Light theme";
});

// Dynamic copyright year
document.querySelector("#year").textContent = new Date().getFullYear();

// Project filtering uses an array of objects and updates the DOM.
const projectCards = Array.from(document.querySelectorAll(".project-card"));
const filterButtons = Array.from(document.querySelectorAll(".filter-button"));
const projectSearch = document.querySelector("#project-search");
const emptyState = document.querySelector("#empty-state");
let activeFilter = "all";

const projectData = projectCards.map((card) => ({
  element: card,
  category: card.dataset.category,
  searchableText: `${card.dataset.search} ${card.textContent}`.toLowerCase()
}));

function filterProjects() {
  const searchTerm = projectSearch.value.trim().toLowerCase();
  let visibleCount = 0;

  projectData.forEach((project) => {
    const matchesCategory = activeFilter === "all" || project.category === activeFilter;
    const matchesSearch = project.searchableText.includes(searchTerm);
    const shouldShow = matchesCategory && matchesSearch;
    project.element.hidden = !shouldShow;
    if (shouldShow) visibleCount += 1;
  });

  emptyState.hidden = visibleCount > 0;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle("active", item === button));
    filterProjects();
  });
});
projectSearch.addEventListener("input", filterProjects);

// Front-end form validation only; no data is sent to a server.
const contactForm = document.querySelector("#contact-form");
const feedback = document.querySelector("#form-feedback");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.querySelector("#name").value.trim();
  const email = document.querySelector("#email").value.trim();
  const message = document.querySelector("#message").value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (name.length < 2) {
    showFeedback("Please enter a name with at least 2 characters.", false);
  } else if (!emailPattern.test(email)) {
    showFeedback("Please enter a valid email address.", false);
  } else if (message.length < 10) {
    showFeedback("Your message should contain at least 10 characters.", false);
  } else {
    showFeedback("Validation successful! This demo does not send your message.", true);
    contactForm.reset();
  }
});

function showFeedback(message, isSuccess) {
  feedback.textContent = message;
  feedback.classList.toggle("success", isSuccess);
  feedback.classList.toggle("error", !isSuccess);
}
