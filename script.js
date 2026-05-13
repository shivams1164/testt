const stickyHeader = document.getElementById('stickyHeader');
const heroSection = document.querySelector('.hero');
let lastScrollY = window.scrollY;
let ticking = false;

function updateStickyHeader() {
  const offset = heroSection.getBoundingClientRect().height - 80;
  const currentScroll = window.scrollY;
  const scrollDown = currentScroll > lastScrollY;

  if (currentScroll > offset && scrollDown) {
    stickyHeader.classList.add('visible');
  } else {
    stickyHeader.classList.remove('visible');
  }

  lastScrollY = currentScroll;
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(updateStickyHeader);
    ticking = true;
  }
});

// Carousel behavior
const carouselTrack = document.querySelector('[data-carousel-track]');
const prevButton = document.querySelector('.carousel-control.prev');
const nextButton = document.querySelector('.carousel-control.next');
const slides = Array.from(document.querySelectorAll('.carousel-card'));
let currentIndex = 0;
let isDragging = false;
let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID;

function setCarouselPosition() {
  const slide = slides[currentIndex];
  if (!slide) return;
  const offset = slide.offsetLeft - (carouselTrack.clientWidth - slide.clientWidth) / 2;
  carouselTrack.scrollTo({ left: offset, behavior: 'smooth' });
}

function goToSlide(index) {
  currentIndex = (index + slides.length) % slides.length;
  setCarouselPosition();
}

prevButton.addEventListener('click', () => {
  goToSlide(currentIndex - 1);
});

nextButton.addEventListener('click', () => {
  goToSlide(currentIndex + 1);
});

function handleTouchStart(event) {
  isDragging = true;
  startX = event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
  prevTranslate = carouselTrack.scrollLeft;
  carouselTrack.classList.add('dragging');
}

function handleTouchMove(event) {
  if (!isDragging) return;
  const currentX = event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
  const deltaX = startX - currentX;
  carouselTrack.scrollLeft = prevTranslate + deltaX;
}

function handleTouchEnd() {
  if (!isDragging) return;
  isDragging = false;
  carouselTrack.classList.remove('dragging');
  const slideWidth = slides[0].offsetWidth + parseInt(getComputedStyle(slides[0]).marginRight, 10);
  const moved = (carouselTrack.scrollLeft + slideWidth / 2) / slideWidth;
  currentIndex = Math.round(moved);
  goToSlide(currentIndex);
}

carouselTrack.addEventListener('touchstart', handleTouchStart, { passive: true });
carouselTrack.addEventListener('mousedown', handleTouchStart);
carouselTrack.addEventListener('touchmove', handleTouchMove, { passive: true });
carouselTrack.addEventListener('mousemove', handleTouchMove);
carouselTrack.addEventListener('touchend', handleTouchEnd);
carouselTrack.addEventListener('mouseup', handleTouchEnd);
carouselTrack.addEventListener('mouseleave', handleTouchEnd);

// Keyboard support for controls
[prevButton, nextButton].forEach((button) => {
  button.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      button.click();
    }
  });
});

window.addEventListener('resize', () => {
  setCarouselPosition();
});

window.addEventListener('load', () => {
  goToSlide(0);
});

