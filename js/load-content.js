fetch('data/content.json')
  .then(response => response.json())
  .then(data => {
    const conceptImgs = document.querySelectorAll('.concept-img');
    conceptImgs.forEach((img, index) => {
      if (data.conceptImages && data.conceptImages[index]) {
        img.src = data.conceptImages[index];
      }
    });

    const menuSubheadingEl = document.querySelector('.section-menu .subheading');
    if (menuSubheadingEl && data.menuSubheading) {
      menuSubheadingEl.textContent = data.menuSubheading;
    }

    const ctaTextEl = document.querySelector('.cta-text');
    if (ctaTextEl && data.ctaText) {
      ctaTextEl.textContent = data.ctaText;
    }
  })
  .catch(err => {
    console.error('Error loading content', err);
  });
