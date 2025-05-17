// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Typing effect
const phrases = ["Engineering Student | AI & Data Science Enthusiast"];
let phraseIndex = 0;
let typingIndex = 0;
const typingElement = document.getElementById("typing-text");

function typeEffect() {
  if (phraseIndex >= phrases.length) phraseIndex = 0;
  const currentPhrase = phrases[phraseIndex];
  typingElement.innerHTML = currentPhrase.substring(0, typingIndex);
  typingIndex++;

  if (typingIndex <= currentPhrase.length) {
    setTimeout(typeEffect, 100);
  } else {
    setTimeout(() => {
      typingIndex = 0;
      phraseIndex++;
      typeEffect();
    }, 2000);
  }
}

// Scroll to top button logic
const scrollBtn = document.getElementById("scrollTopBtn");
window.addEventListener('scroll', () => {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
});

if (scrollBtn) {
  scrollBtn.onclick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
}

// Reveal on scroll
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  reveals.forEach(el => {
    const windowHeight = window.innerHeight;
    const revealTop = el.getBoundingClientRect().top;
    if (revealTop < windowHeight - 100) {
      el.classList.add('active');
    }
  });
}
window.addEventListener('scroll', revealOnScroll);

// Form submission handler
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = new FormData(form);

      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: data,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          status.textContent = "Thanks for your message!";
          status.style.color = "lightgreen";
          form.reset();
        } else {
          status.textContent = "Oops! Something went wrong.";
          status.style.color = "red";
        }
      } catch (error) {
        status.textContent = "Error: Network problem or wrong form URL.";
        status.style.color = "red";
      }
    });
  }

  // Hire button
  const hireBtn = document.getElementById("hireButton");
  if (hireBtn) {
    hireBtn.addEventListener("click", () => {
      window.location.href = 'https://forms.gle/your-google-form-link'; // Replace with actual URL
    });
  }

  // Dark mode preference
  const bodyElement = document.body;
  const toggleDarkModeBtn = document.getElementById("toggle-dark");

  if (localStorage.getItem("theme") === "dark") {
    bodyElement.classList.add("dark-mode");
  }

  if (toggleDarkModeBtn) {
    toggleDarkModeBtn.addEventListener("click", () => {
      bodyElement.classList.toggle("dark-mode");

      if (bodyElement.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
      } else {
        localStorage.setItem("theme", "light");
      }
    });
  }

  // Initial animations
  typeEffect();
  revealOnScroll();
});
