document.addEventListener("DOMContentLoaded", function () {
  const products = document.querySelectorAll('.product');
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
  };
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  products.forEach(product => observer.observe(product));
});
