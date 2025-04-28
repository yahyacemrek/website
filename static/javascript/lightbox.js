document.addEventListener("DOMContentLoaded", function() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.querySelector('.lightbox-content');
  const captionText = document.querySelector('.caption');
  const closeBtn = document.querySelector('.close');

  document.querySelectorAll('.lightbox-image').forEach(img => {
    img.addEventListener('click', function() {
      lightbox.style.display = "block";
      lightboxImage.src = this.src;
      captionText.innerText = this.alt;
    });
  });

  closeBtn.addEventListener('click', function() {
    lightbox.style.display = "none";
  });

  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
    }
  });
});
