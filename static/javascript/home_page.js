document.addEventListener("DOMContentLoaded", function () {
    let index = 0;
    const slides = document.querySelectorAll(".slide");
    const totalSlides = slides.length;
    const slideContainer = document.querySelector(".slides");
  
    function updateSlide() {
      slideContainer.style.transform = `translateX(-${index * 100}%)`;
    }
    function nextSlide() {
      index = (index + 1) % totalSlides;
      updateSlide();
    }
    function prevSlide() {
      index = (index - 1 + totalSlides) % totalSlides;
      updateSlide();
    }
  
    setInterval(nextSlide, 4000);
    document.querySelector('.next').addEventListener("click", nextSlide);
    document.querySelector('.prev').addEventListener("click", prevSlide);
  });
  