// home_page.js

document.addEventListener('DOMContentLoaded', () => {
  // Slider container'ı ve içindeki slaytları seçiyoruz
  const sliderContainer = document.querySelector('.home-page-slider .slides');
  const slides = document.querySelectorAll('.home-page-slider .slide');
  const prevBtn = document.querySelector('.prev-home-slide');
  const nextBtn = document.querySelector('.next-home-slide');

  // Geçerli slayt indeksi
  let currentIndex = 0;

  // Slayt pozisyonunu güncelleyen fonksiyon
  const updateSlidePosition = () => {
    // translateX ile sola kaydırıyoruz
    sliderContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
  };

  // Sonraki buton tıklandığında
  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlidePosition();
  });

  // Önceki buton tıklandığında
  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlidePosition();
  });

  // İsteğe bağlı: Otomatik kaydırma eklemek isterseniz, aşağıdaki satırın yorumunu kaldırabilirsiniz
  // setInterval(() => {
  //   currentIndex = (currentIndex + 1) % slides.length;
  //   updateSlidePosition();
  // }, 5000); // Her 5 saniyede bir slayt değişir
});
