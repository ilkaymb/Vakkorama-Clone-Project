// NAVBAR SCROLL
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});
// NAVBAR SUBMENU
document.getElementById('menu-toggle').addEventListener('click', function() {
    document.getElementById('side-navbar').style.left = '0';
    document.getElementById('overlay').style.display = 'block';
});

document.getElementById('overlay').addEventListener('click', function() {
    document.getElementById('side-navbar').style.left = '-250px';
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('submenu').style.display = 'none';
});

document.querySelectorAll('.close-btn').forEach(button => {
    button.addEventListener('click', function() {
        document.getElementById('side-navbar').style.left = '-250px';
        document.getElementById('overlay').style.display = 'none';
        document.getElementById('submenu').style.display = 'none';
    });
});
//SLIDER
let slideIndex = 1;
let isTransitioning = false;
let slideInterval;

showSlides(slideIndex);
startSlideInterval();

function startSlideInterval() {
    slideInterval = setInterval(() => {
        if (!isTransitioning) {
            isTransitioning = true;
            showSlides(slideIndex += 1, 1);
        }
    }, 5000);
}

function stopSlideInterval() {
    clearInterval(slideInterval);
}

function currentSlide(n) {
    if (!isTransitioning) {
        isTransitioning = true;
        showSlides(slideIndex = n);
    }
}

function showSlides(n, direction = 1) {
    let i;
    let slides = document.getElementsByClassName("slide");
    let lines = document.getElementsByClassName("line");
    let newSlideIndex = (n > slides.length) ? 1 : (n < 1) ? slides.length : n;
    let currentSlideIndex = (slideIndex - 1 + slides.length) % slides.length;

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        slides[i].style.transform = "translateX(100%)";
    }

    slides[newSlideIndex - 1].style.display = "block";
    slides[newSlideIndex - 1].style.transform = direction > 0 ? "translateX(100%)" : "translateX(-100%)";
    slides[currentSlideIndex].style.display = "block";
    slides[currentSlideIndex].style.transform = "translateX(0)";

    setTimeout(() => {
        slides[currentSlideIndex].style.transform = direction > 0 ? "translateX(-100%)" : "translateX(100%)";
        slides[newSlideIndex - 1].style.transform = "translateX(0)";
    }, 10);

    for (i = 0; i < lines.length; i++) {
        lines[i].className = lines[i].className.replace(" active", "");
    }
    lines[newSlideIndex - 1].className += " active";

    slideIndex = newSlideIndex;

    setTimeout(() => {
        isTransitioning = false;
    }, 600);
}

const lines = document.getElementsByClassName("line");
for (let i = 0; i < lines.length; i++) {
    lines[i].addEventListener("mouseover", stopSlideInterval);
    lines[i].addEventListener("mouseout", startSlideInterval);
}
// SECOND SLIDER
document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.slider');
    const leftArrow = document.getElementById('left');
    const rightArrow = document.getElementById('right');
    let cardWidth = document.querySelector('.scroll-card').offsetWidth + 20;
    let visibleCards = Math.floor(slider.offsetWidth / cardWidth);
    let scrollAmount = 0;
    let maxScroll = (slider.scrollWidth - slider.clientWidth);

    function updateScroll() {
        cardWidth = document.querySelector('.scroll-card').offsetWidth + 20;
        visibleCards = Math.floor(slider.offsetWidth / cardWidth);
        maxScroll = (slider.scrollWidth - slider.clientWidth);
        scrollAmount = Math.min(scrollAmount, maxScroll);
        slider.style.transform = `translateX(-${scrollAmount}px)`;
    }

    leftArrow.addEventListener('click', () => {
        scrollAmount = Math.max(scrollAmount - cardWidth * visibleCards, 0);
        slider.style.transform = `translateX(-${scrollAmount}px)`;
    });

    rightArrow.addEventListener('click', () => {
        scrollAmount = Math.min(scrollAmount + cardWidth * visibleCards, maxScroll);
        slider.style.transform = `translateX(-${scrollAmount}px)`;
    });

    window.addEventListener('resize', updateScroll);

    updateScroll();
});

//SCROLL TO TOP
document.getElementById('scroll-top').addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
