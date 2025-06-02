// referances.js

document.addEventListener("DOMContentLoaded", function () {
  let currentIndex = 0;
  const slides = document.querySelectorAll(".slider-section .slide");
  const totalSlides = slides.length;
  const slidesContainer = document.querySelector(".slider-section .slides");

  function updateSlidePosition() {
    slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  function showNextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlidePosition();
  }

  function showPrevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlidePosition();
  }

  // Otomatik geçiş (5 saniyede bir)
  let slideInterval = setInterval(showNextSlide, 5000);

  document.querySelector(".next-slide").addEventListener("click", function () {
    clearInterval(slideInterval);
    showNextSlide();
    slideInterval = setInterval(showNextSlide, 5000);
  });

  document.querySelector(".prev-slide").addEventListener("click", function () {
    clearInterval(slideInterval);
    showPrevSlide();
    slideInterval = setInterval(showNextSlide, 5000);
  });
});
