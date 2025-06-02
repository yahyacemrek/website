document.addEventListener("DOMContentLoaded", () => {
  const btn  = document.querySelector('.hamburger');
  const menu = document.querySelector('.menu-items');
  const nav  = document.querySelector('.menu');

  // Erişilebilirlik için ARIA rolleri
  btn.setAttribute('role', 'button');
  btn.setAttribute('aria-label', 'Menüyü aç/kapat');
  btn.setAttribute('aria-expanded', 'false');
  btn.tabIndex = 0;

  // Menü aç/kapat işlevi
  btn.addEventListener('click', () => {
    // "hamburger--open" sınıfını hamburger ikonuna ekle/çıkar
    const isOpen = btn.classList.toggle('hamburger--open');

    // NAV etiketine "open" sınıfını ekle/çıkar
    // CSS'te .menu.open .menu-items { display: flex; } olmalı
    nav.classList.toggle('open', isOpen);

    // ARIA-expanded durumunu güncelle
    btn.setAttribute('aria-expanded', isOpen);
  });

  // Mobilde "Ürünlerimiz" alt menüsündeki oka tıklayınca alt menüyü aç/kapat
  document.querySelectorAll('.menu-items li > a .fa-caret-down').forEach(caret => {
    caret.addEventListener('click', e => {
      if (window.innerWidth <= 768) {
        e.preventDefault(); // Açılır linkin sayfanın yukarısına kaydırmasını engelle
        const parentLi = caret.closest('li');
        parentLi.classList.toggle('submenu-open');
      }
    });
  });
});
