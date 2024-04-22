const slides = document.querySelectorAll('.slide');
const buttonPrevEl = document.querySelector('.prev');
const buttonNextEl = document.querySelector('.next');
const dots = document.querySelectorAll('.dot');
let currentIndex = 0;

function goToSlide(index) {
    slides.forEach((slide, i) => {
        if (i === index) {
            slide.classList.add('slide-active');
            dots[i].classList.add('dot-active');
        } else {
            slide.classList.remove('slide-active');
            dots[i].classList.remove('dot-active');
        }
    });
}

buttonPrevEl.addEventListener('click', ev => {
    currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
    goToSlide(currentIndex);
});

buttonNextEl.addEventListener('click', ev => {
    currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
    goToSlide(currentIndex);
});

dots.forEach((dot, index) => {
    dot.addEventListener('click', ev => {
        currentIndex = index;
        goToSlide(currentIndex);
    });
});

goToSlide(currentIndex);