// /javascript/hamburger.js :contentReference[oaicite:4]{index=4}&#8203;:contentReference[oaicite:5]{index=5}
document.addEventListener("DOMContentLoaded", function() {
  const hamburger = document.querySelector('.hamburger');
  const menuItems = document.querySelector('.menu-items');
  const menu = document.querySelector('.menu');

  hamburger.addEventListener('click', function() {
    menuItems.classList.toggle('active');
    hamburger.classList.toggle('active');
  });

  // Scroll ile arkaplan opaklığı
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) menu.classList.add('scrolled');
    else menu.classList.remove('scrolled');
  });
});
