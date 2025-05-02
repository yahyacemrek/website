document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector('.hamburger');
  const menu = document.querySelector('.menu-items');
  const nav  = document.querySelector('.menu');

  // Erişilebilirlik için ARIA rolleri
  btn.setAttribute('role', 'button');
  btn.setAttribute('aria-label', 'Menüyü aç/kapat');
  btn.setAttribute('aria-expanded', 'false');
  btn.tabIndex = 0;

  // Menü aç/kapat işlevi
  btn.addEventListener('click', () => {
    const isOpen = btn.classList.toggle('hamburger--open');
    menu.classList.toggle('menu-items--open', isOpen);
    btn.setAttribute('aria-expanded', isOpen);
  });

  // Menü dışına tıklayınca kapatma
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && menu.classList.contains('menu-items--open')) {
      btn.classList.remove('hamburger--open');
      menu.classList.remove('menu-items--open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });

  // Scroll ile arka plan opaklığı (debounce)
  let timer;
  window.addEventListener('scroll', () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      nav.classList.toggle('menu--scrolled', window.scrollY > 50);
    }, 50);
  });

  // Mobile: "Ürünlerimiz" menüsündeki oka tıklayınca alt menüyü aç/kapat
  document.querySelectorAll('.menu-items li > a .fa-caret-down').forEach(caret => {
    caret.addEventListener('click', e => {
      if (window.innerWidth <= 768) {
        e.preventDefault();  // açılır linkin sayfayı kaydırmasını engelle
        const parentLi = caret.closest('li');
        parentLi.classList.toggle('submenu-open');
      }
    });
  });
});
