// To add or remove photos, just edit the array.
const photos = [
  { file: 'Photos/black_white_coast.jpg', alt: 'Black-and-white coastal photograph', num: 'Plate 01', loc: 'TBD', meta: 'Black & white' },
  { file: 'Photos/drive/M1100618.jpg', alt: 'Landscape photograph M1100618', num: 'Plate 02', loc: 'TBD', meta: 'M1100618' },
  { file: 'Photos/web/M1100604.jpg', alt: 'Landscape photograph M1100604', num: 'Plate 03', loc: 'TBD', meta: 'M1100604' },
  { file: 'Photos/web/M1100611.jpg', alt: 'Landscape photograph M1100611', num: 'Plate 04', loc: 'TBD', meta: 'M1100611' },
  { file: 'Photos/drive/L1000685.jpg', alt: 'Landscape photograph L1000685', num: 'Plate 05', loc: 'TBD', meta: 'L1000685' },
  { file: 'Photos/drive/L1000689.jpg', alt: 'Landscape photograph L1000689', num: 'Plate 06', loc: 'TBD', meta: 'L1000689' },
  { file: 'Photos/drive/L1000677.jpg', alt: 'Landscape photograph L1000677', num: 'Plate 07', loc: 'TBD', meta: 'L1000677' },
  { file: 'Photos/coastline_with_flowers.jpg', alt: 'Coastline with wildflowers', num: 'Plate 08', loc: 'TBD', meta: 'TBD' },
  { file: 'Photos/harbor_pier.jpg', alt: 'Harbor pier', num: 'Plate 09', loc: 'TBD', meta: 'TBD' },
  { file: 'Photos/lighthouse.jpg', alt: 'Lighthouse by the coast', num: 'Plate 10', loc: 'TBD', meta: 'TBD' },
  { file: 'Photos/ocean_pier.jpg', alt: 'Pier over the ocean', num: 'Plate 11', loc: 'TBD', meta: 'TBD' },
  { file: 'Photos/palm_tree_house.jpg', alt: 'Palm tree house', num: 'Plate 12', loc: 'TBD', meta: 'TBD' },
  { file: 'Photos/pier_stores.jpg', alt: 'Stores along a pier', num: 'Plate 13', loc: 'TBD', meta: 'TBD' },
  { file: 'Photos/stuffed_dog_in_lifeboat.jpg', alt: 'Stuffed dog in a lifeboat', num: 'Plate 14', loc: 'TBD', meta: 'TBD' },
];

const galleryGrid = document.getElementById('galleryGrid');

photos.forEach(photo => {
  const figure = document.createElement('figure');
  figure.className = 'plate';

  figure.innerHTML = `
    <img class="plate__img" src="${photo.file}" alt="${photo.alt}" loading="lazy" decoding="async">
  `;

  galleryGrid.appendChild(figure);
});

const plates = document.querySelectorAll('.plate');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0, rootMargin: '0px 0px 25% 0px' });

plates.forEach(plate => observer.observe(plate));

const nav = document.querySelector('nav');

let scrollTicking = false;

window.addEventListener('scroll', () => {
  if (!scrollTicking) {
    requestAnimationFrame(() => {
      nav.classList.toggle('is-scrolled', window.scrollY > 60);
      scrollTicking = false;
    });
    scrollTicking = true;
  }
}, { passive: true });

const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
const lbCaption = document.getElementById('lbCaption');
let current = 0;

function renderLightbox(i) {
  current = (i + photos.length) % photos.length;
  const photo = photos[current];
  lbImg.src = photo.file;
  lbImg.alt = photo.alt;
  lbCaption.innerHTML = `<span class="brass">${photo.num}</span><span class="loc">${photo.loc}</span><span>${photo.meta}</span>`;
}

function openLightbox(i) {
  renderLightbox(i);
  lightbox.classList.add('is-open');
}

function closeLightbox() {
  lightbox.classList.remove('is-open');
}

plates.forEach((plate, i) => plate.addEventListener('click', () => openLightbox(i)));
document.getElementById('lbClose').addEventListener('click', closeLightbox);
document.getElementById('lbPrev').addEventListener('click', () => renderLightbox(current - 1));
document.getElementById('lbNext').addEventListener('click', () => renderLightbox(current + 1));

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('is-open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') renderLightbox(current - 1);
  if (e.key === 'ArrowRight') renderLightbox(current + 1);
});
