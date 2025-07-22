fetch('data/content.json')
  .then(response => response.json())
  .then(data => {
    const img1 = document.getElementById('concept-img-1');
    const img2 = document.getElementById('concept-img-2');
    if (img1 && data.concept_img1) {
      img1.src = data.concept_img1;
    }
    if (img2 && data.concept_img2) {
      img2.src = data.concept_img2;
    }
    const ctaTextEl = document.getElementById('cta-text');
    if (ctaTextEl && data.cta_text) {
      ctaTextEl.textContent = data.cta_text;
    }
  })
  .catch(err => {
    console.error('Error loading content', err);
  });
