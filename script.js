
// 1. RESPONSIVE NAVIGATION MENU
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");

menuBtn.addEventListener("click", function () {
    navLinks.classList.toggle("active");

    menuBtn.textContent =
        navLinks.classList.contains("active") ? "✕" : "☰";
});

document.querySelectorAll(".nav-links a").forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.classList.remove("active");
        menuBtn.textContent = "☰";
    });
});


// 2. IMAGE SLIDER
const sliderImage = document.getElementById("slider-image");
const nextBtn = document.getElementById("next-slide");
const prevBtn = document.getElementById("prev-slide");
const dotsContainer = document.getElementById("slider-dots");

const images = [
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
];

let currentSlide = 0;

images.forEach(function (image, index) {
    const dot = document.createElement("button");
    dot.classList.add("slider-dot");
    dot.setAttribute("aria-label", "Show image " + (index + 1));

    dot.addEventListener("click", function () {
        currentSlide = index;
        showSlide();
    });

    dotsContainer.appendChild(dot);
});

function showSlide() {
    sliderImage.src = images[currentSlide];

    document.querySelectorAll(".slider-dot").forEach(function (dot, index) {
        dot.classList.toggle("active", index === currentSlide);
    });
}

nextBtn.addEventListener("click", function () {
    currentSlide = (currentSlide + 1) % images.length;
    showSlide();
});

prevBtn.addEventListener("click", function () {
    currentSlide = (currentSlide - 1 + images.length) % images.length;
    showSlide();
});

showSlide();


// 3. FAQ ACCORDION
document.querySelectorAll(".faq-question").forEach(function (question) {
    question.addEventListener("click", function () {
        const item = question.parentElement;
        const isOpen = item.classList.contains("open");

        document.querySelectorAll(".faq-item").forEach(function (faq) {
            faq.classList.remove("open");
            faq.querySelector(".faq-question").setAttribute("aria-expanded", "false");
            faq.querySelector(".faq-question span").textContent = "+";
        });

        if (!isOpen) {
            item.classList.add("open");
            question.setAttribute("aria-expanded", "true");
            question.querySelector("span").textContent = "−";
        }
    });
});


// 4. CONTACT FORM VALIDATION
const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const messageError = document.getElementById("message-error");
    const status = document.getElementById("form-status");

    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";
    status.textContent = "";

    let valid = true;

    if (name === "") {
        nameError.textContent = "Please enter your name.";
        valid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
        emailError.textContent = "Please enter your email.";
        valid = false;
    } else if (!emailPattern.test(email)) {
        emailError.textContent = "Please enter a valid email.";
        valid = false;
    }

    if (message === "") {
        messageError.textContent = "Please enter your message.";
        valid = false;
    }

    if (valid) {
        status.textContent = "Form validated successfully! (Demo only)";
        contactForm.reset();
    }
});


// 5. SCROLL-TO-TOP BUTTON
const scrollTopBtn = document.getElementById("scroll-top");

window.addEventListener("scroll", function () {
    scrollTopBtn.classList.toggle("show", window.scrollY > 300);
});

scrollTopBtn.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


// 6. DARK / LIGHT MODE
const themeBtn = document.getElementById("theme-btn");

themeBtn.addEventListener("click", function () {
    document.body.classList.toggle("light-theme");

    themeBtn.textContent =
        document.body.classList.contains("light-theme") ? "🌙" : "☀️";
});


// BONUS: ANIMATED COUNTERS
const counters = document.querySelectorAll(".counter");
let countersStarted = false;

function startCounters() {
    const stats = document.querySelector(".stats");

    if (countersStarted || stats.getBoundingClientRect().top > window.innerHeight) {
        return;
    }

    countersStarted = true;

    counters.forEach(function (counter) {
        const target = Number(counter.dataset.target);
        const duration = 1500;
        const startTime = performance.now();

        function updateCounter(time) {
            const progress = Math.min((time - startTime) / duration, 1);
            counter.textContent = Math.floor(progress * target) + "+";

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }

        requestAnimationFrame(updateCounter);
    });
}

window.addEventListener("scroll", startCounters);
window.addEventListener("load", startCounters);


// BONUS: AUTOMATIC FOOTER YEAR
document.getElementById("year").textContent = new Date().getFullYear();
