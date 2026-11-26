const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const music = document.getElementById("bgMusic");
const heroSlides = document.querySelectorAll(".hero-slide");
const carouselDots = document.querySelectorAll(".carousel-dot");
let activeSlide = 0;

menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
    }
});

document.addEventListener("click", () => {
    music.muted = false;
    music.volume = 0.35;
    music.play().catch(() => {});
}, { once: true });

music.addEventListener("ended", () => {
    music.currentTime = 0;
    music.play().catch(() => {});
});

function showSlide(index) {
    activeSlide = (index + heroSlides.length) % heroSlides.length;
    heroSlides.forEach((slide, slideIndex) => {
        slide.classList.toggle("active", slideIndex === activeSlide);
    });
    carouselDots.forEach((dot, dotIndex) => {
        const isActive = dotIndex === activeSlide;
        dot.classList.toggle("active", isActive);
        if (isActive) {
            dot.setAttribute("aria-current", "true");
        } else {
            dot.removeAttribute("aria-current");
        }
    });
}

document.querySelector(".carousel-previous").addEventListener("click", () => {
    showSlide(activeSlide - 1);
});

document.querySelector(".carousel-next").addEventListener("click", () => {
    showSlide(activeSlide + 1);
});

carouselDots.forEach((dot, index) => {
    dot.addEventListener("click", () => showSlide(index));
});

window.setInterval(() => showSlide(activeSlide + 1), 5000);