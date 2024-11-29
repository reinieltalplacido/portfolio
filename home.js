function debounce(func, delay = 100) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

function scrollTimelineAnimation() {
  const items = document.querySelectorAll(".timeline-item");

  items.forEach((item) => {
    const itemPosition = item.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (itemPosition < windowHeight * 0.8 && itemPosition > 0) {
      item.classList.add("show");
    } else {
      item.classList.remove("show");
    }
  });
}

window.addEventListener("load", scrollTimelineAnimation);

window.addEventListener("scroll", debounce(scrollTimelineAnimation, 100));

document.querySelectorAll("nav a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: "smooth",
      });
    }
  });
});

window.addEventListener("scroll", () => {
  const navLinks = document.querySelectorAll("nav a");
  let currentSection = "";

  document.querySelectorAll("section").forEach((section) => {
    const sectionTop = section.offsetTop - 50;
    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").substring(1) === currentSection) {
      link.classList.add("active");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const themeToggle = document.getElementById("theme-toggle");
  const sunIcon = document.getElementById("sun");
  const moonIcon = document.getElementById("moon");

  const currentTheme = localStorage.getItem("theme");
  if (currentTheme === "dark") {
    document.body.classList.add("dark-mode");
    moonIcon.classList.remove("hidden");
    sunIcon.classList.add("hidden");
  }

  themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    const isDarkMode = document.body.classList.contains("dark-mode");

    if (isDarkMode) {
      moonIcon.classList.add("hidden");
      sunIcon.classList.remove("hidden");
      localStorage.setItem("theme", "dark");
    } else {
      moonIcon.classList.remove("hidden");
      sunIcon.classList.add("hidden");
      localStorage.setItem("theme", "light");
    }
  });
});

document.getElementById("contactForm") .addEventListener("submit", function (event) {
    event.preventDefault();

    alert("Your message has been sent successfully!");

    this.reset();
  });
