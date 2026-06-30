/* ============================================================
   THEMBA PROPERTY — script.js
   Interactivity: Navbar, Listings, Gallery, Testimonials, Form
   ============================================================ */

'use strict';

/* ============================================================
   1. NAVBAR — scroll effect & mobile hamburger
   ============================================================ */

const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  backToTop.classList.toggle('show', window.scrollY > 400);
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ============================================================
   2. SCROLL REVEAL — tampilkan elemen saat masuk viewport
   ============================================================ */

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -48px 0px' });

document.querySelectorAll('.reveal').forEach((el, i) => {
  const siblings = el.parentElement.querySelectorAll('.reveal');
  const idx = Array.from(siblings).indexOf(el);
  el.dataset.delay = idx * 80;
  revealObserver.observe(el);
});

/* ============================================================
   3. PROPERTY LISTINGS — data & filter tabs
   ============================================================ */

const LISTINGS = [
  {
    id: 1, tab: 'primary',
    name: 'Rumah Modern Cluster Gresik',
    price: 'Hubungi Kami',
    location: 'Driyorejo, Gresik',
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&q=80',
    beds: '3 KT', baths: '2 KM', area: '150 m²'
  },
  {
    id: 2, tab: 'primary',
    name: 'Perumahan Premium Surabaya Barat',
    price: 'Hubungi Kami',
    location: 'Surabaya Barat',
    img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=500&q=80',
    beds: '4 KT', baths: '3 KM', area: '280 m²'
  },
  {
    id: 3, tab: 'secondary',
    name: 'Rumah Second Terawat Sidoarjo',
    price: 'Hubungi Kami',
    location: 'Sidoarjo',
    img: 'https://images.unsplash.com/photo-1592595896551-12b371d546d5?w=500&q=80',
    beds: '3 KT', baths: '2 KM', area: '140 m²'
  },
  {
    id: 4, tab: 'secondary',
    name: 'Apartemen Strategis Surabaya',
    price: 'Hubungi Kami',
    location: 'Surabaya',
    img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&q=80',
    beds: '2 KT', baths: '1 KM', area: '65 m²'
  },
  {
    id: 5, tab: 'shophouse',
    name: 'Ruko 3 Lantai Jalan Strategis',
    price: 'Hubungi Kami',
    location: 'Gresik',
    img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=500&q=80',
    beds: '3 Lantai', baths: '2 KM', area: '200 m²'
  },
  {
    id: 6, tab: 'shophouse',
    name: 'Ruko Komersial Area Industri',
    price: 'Hubungi Kami',
    location: 'Driyorejo, Gresik',
    img: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=500&q=80',
    beds: '4 Lantai', baths: '2 KM', area: '260 m²'
  },
  {
    id: 7, tab: 'warehouse',
    name: 'Gudang Logistik Kawasan Industri',
    price: 'Hubungi Kami',
    location: 'Gresik',
    img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500&q=80',
    beds: '1 Office', baths: '2 KM', area: '2.000 m²'
  },
  {
    id: 8, tab: 'warehouse',
    name: 'Gudang Produksi Strategis',
    price: 'Hubungi Kami',
    location: 'Sidoarjo',
    img: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=500&q=80',
    beds: '1 Office', baths: '1 KM', area: '1.500 m²'
  },
  {
    id: 9, tab: 'land',
    name: 'Kavling Perumahan Gresik Barat',
    price: 'Hubungi Kami',
    location: 'Gresik',
    img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500&q=80',
    beds: 'Tanah', baths: '—', area: '500 m²'
  },
  {
    id: 10, tab: 'land',
    name: 'Lahan Komersial Pinggir Jalan',
    price: 'Hubungi Kami',
    location: 'Jawa Timur',
    img: 'https://images.unsplash.com/photo-1464082354059-27db6ce50048?w=500&q=80',
    beds: 'Tanah', baths: '—', area: '1.000 m²'
  },
  {
    id: 11, tab: 'primary',
    name: 'Cluster Eksklusif Wedoroanom',
    price: 'Hubungi Kami',
    location: 'Driyorejo, Gresik',
    img: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=500&q=80',
    beds: '3 KT', baths: '2 KM', area: '160 m²'
  },
  {
    id: 12, tab: 'secondary',
    name: 'Rumah Hook Posisi Strategis',
    price: 'Hubungi Kami',
    location: 'Surabaya',
    img: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500&q=80',
    beds: '4 KT', baths: '3 KM', area: '210 m²'
  },
];

const TAB_LABELS = {
  primary: 'Primer',
  secondary: 'Sekunder',
  shophouse: 'Ruko',
  warehouse: 'Gudang',
  land: 'Tanah',
};

function renderListings(tab) {
  const grid = document.getElementById('listingsGrid');
  const filtered = tab === 'all' ? LISTINGS : LISTINGS.filter(p => p.tab === tab);

  grid.innerHTML = filtered.map((p, i) => `
    <div class="listing-card listing-type-${p.tab} reveal" style="--delay:${i * 60}ms">
      <div class="listing-img">
        <img src="${p.img}" alt="${p.name}" loading="lazy"/>
        <span class="listing-badge">${TAB_LABELS[p.tab] || p.tab}</span>
      </div>
      <div class="listing-body">
        <p class="listing-price">${p.price}</p>
        <p class="listing-name">${p.name}</p>
        <p class="listing-loc"><img src="assets/icons/icon19.png" alt="Lokasi" class="meta-icon" /> ${p.location}</p>
        <div class="listing-meta">
          <span><img src="assets/icons/icon25.png" alt="Kamar" class="meta-icon" /> ${p.beds}</span>
          <span><img src="assets/icons/icon26.png" alt="Kamar Mandi" class="meta-icon" /> ${p.baths}</span>
          <span><img src="assets/icons/icon27.png" alt="Luas" class="meta-icon" /> ${p.area}</span>
        </div>
      </div>
    </div>
  `).join('');

  grid.querySelectorAll('.reveal').forEach((el, i) => {
    el.dataset.delay = i * 60;
    revealObserver.observe(el);
  });
}

document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderListings(btn.dataset.tab);
  });
});

renderListings('all');

/* ============================================================
   4. GALLERY — render gambar & lightbox
   ============================================================ */

const GALLERY_IMAGES = [
  { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', label: 'Rumah Mewah', size: 'wide' },
  { src: 'https://images.unsplash.com/photo-1565182999561-18d7dc61c393?w=800&q=80', label: 'Interior Modern', size: '' },
  { src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80', label: 'Residensial Premium', size: 'tall' },
  { src: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80', label: 'Ruang Tamu Cerah', size: '' },
  { src: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80', label: 'Ruang Keluarga Elegan', size: '' },
  { src: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80', label: 'Properti Komersial', size: 'wide' },
  { src: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80', label: 'Properti Eksklusif', size: '' },
  { src: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80', label: 'Cluster Perumahan', size: '' },
];

const galleryGrid   = document.getElementById('galleryGrid');
const lightbox      = document.getElementById('lightbox');
const lightboxImg   = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev  = document.getElementById('lightboxPrev');
const lightboxNext  = document.getElementById('lightboxNext');
let currentLightboxIndex = 0;

galleryGrid.innerHTML = GALLERY_IMAGES.map((img, i) => `
  <div class="gallery-item ${img.size} reveal" data-index="${i}">
    <img src="${img.src}" alt="${img.label}" loading="lazy"/>
    <div class="gallery-item-overlay">
      <span>${img.label}</span>
    </div>
  </div>
`).join('');

galleryGrid.querySelectorAll('.reveal').forEach((el, i) => {
  el.dataset.delay = i * 50;
  revealObserver.observe(el);
});

galleryGrid.addEventListener('click', (e) => {
  const item = e.target.closest('.gallery-item');
  if (!item) return;
  currentLightboxIndex = parseInt(item.dataset.index);
  openLightbox(currentLightboxIndex);
});

function openLightbox(index) {
  lightboxImg.src = GALLERY_IMAGES[index].src;
  lightboxImg.alt = GALLERY_IMAGES[index].label;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

lightboxPrev.addEventListener('click', () => {
  currentLightboxIndex = (currentLightboxIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
  openLightbox(currentLightboxIndex);
});
lightboxNext.addEventListener('click', () => {
  currentLightboxIndex = (currentLightboxIndex + 1) % GALLERY_IMAGES.length;
  openLightbox(currentLightboxIndex);
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape')      closeLightbox();
  if (e.key === 'ArrowLeft')   lightboxPrev.click();
  if (e.key === 'ArrowRight')  lightboxNext.click();
});

/* ============================================================
   5. TESTIMONIALS SLIDER
   ============================================================ */

const TESTIMONIALS = [
  {
    quote: 'Themba Property benar-benar membantu saya menemukan properti investasi yang tepat. Analisis yang diberikan sangat detail dan mereka mendampingi saya dari awal hingga transaksi selesai. Sangat profesional dan terpercaya!',
    name: 'Bapak Andi S.',
    role: 'Investor Properti · Surabaya',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    stars: 5
  },
  {
    quote: 'Proses KPR saya yang sempat macet berhasil diselesaikan berkat pendampingan dari Themba Property. Mereka sangat paham seluk-beluk perbankan dan prosesnya cepat. Terima kasih banyak!',
    name: 'Ibu Sari W.',
    role: 'Pembeli Rumah Pertama · Gresik',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    stars: 5
  },
  {
    quote: 'Sebagai developer, bermitra dengan Themba Property membuka banyak pintu ke investor dan pembeli yang qualified. Strategi pemasaran mereka efektif dan tim mereka sangat responsif dalam setiap proses.',
    name: 'Bapak Rudi H.',
    role: 'Developer Properti · Jawa Timur',
    avatar: 'https://randomuser.me/api/portraits/men/55.jpg',
    stars: 5
  },
  {
    quote: 'Tim Themba Property membantu saya menganalisis peluang investasi dengan sangat mendalam. Dalam setahun, keputusan properti yang saya ambil berbuah hasil yang jauh melebihi ekspektasi saya.',
    name: 'Ibu Linda W.',
    role: 'Investor Aset Properti · Surabaya',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    stars: 5
  },
];

const sliderEl   = document.getElementById('testimonialsSlider');
const dotsEl     = document.getElementById('sliderDots');
let currentSlide = 0;
let autoSlide;

sliderEl.innerHTML = TESTIMONIALS.map((t, i) => `
  <div class="testimonial-card ${i === 0 ? 'active' : ''}" data-index="${i}">
    <div class="testimonial-stars">${'★'.repeat(t.stars)}</div>
    <p class="testimonial-quote">${t.quote}</p>
    <div class="testimonial-author">
      <img src="${t.avatar}" alt="${t.name}" class="testimonial-avatar"/>
      <div>
        <p class="testimonial-name">${t.name}</p>
        <p class="testimonial-role">${t.role}</p>
      </div>
    </div>
  </div>
`).join('');

dotsEl.innerHTML = TESTIMONIALS.map((_, i) => `
  <button class="dot ${i === 0 ? 'active' : ''}" data-dot="${i}" aria-label="Slide ${i + 1}"></button>
`).join('');

function goToSlide(n) {
  sliderEl.querySelectorAll('.testimonial-card').forEach(c => c.classList.remove('active'));
  dotsEl.querySelectorAll('.dot').forEach(d => d.classList.remove('active'));
  sliderEl.querySelector(`[data-index="${n}"]`).classList.add('active');
  dotsEl.querySelector(`[data-dot="${n}"]`).classList.add('active');
  currentSlide = n;
}

dotsEl.addEventListener('click', (e) => {
  const dot = e.target.closest('.dot');
  if (!dot) return;
  clearInterval(autoSlide);
  goToSlide(parseInt(dot.dataset.dot));
  startAutoSlide();
});

function startAutoSlide() {
  autoSlide = setInterval(() => {
    goToSlide((currentSlide + 1) % TESTIMONIALS.length);
  }, 5000);
}
startAutoSlide();

// Swipe gesture support
let touchStartX = 0;
sliderEl.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
sliderEl.addEventListener('touchend', (e) => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) {
    clearInterval(autoSlide);
    goToSlide(diff > 0
      ? (currentSlide + 1) % TESTIMONIALS.length
      : (currentSlide - 1 + TESTIMONIALS.length) % TESTIMONIALS.length
    );
    startAutoSlide();
  }
});

/* ============================================================
   6. CONTACT FORM — validasi & submit
   ============================================================ */

const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name  = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();
  if (!name)  { contactForm.name.focus(); return; }
  if (!email || !email.includes('@')) { contactForm.email.focus(); return; }

  const btn = contactForm.querySelector('button[type="submit"]');
  btn.textContent = 'Mengirim…';
  btn.disabled = true;

  setTimeout(() => {
    contactForm.reset();
    btn.textContent = 'Kirim Pesan';
    btn.disabled = false;
    formSuccess.style.display = 'block';
    setTimeout(() => { formSuccess.style.display = 'none'; }, 5000);
  }, 1200);
});

/* ============================================================
   7. BACK TO TOP BUTTON
   ============================================================ */

const backToTop = document.getElementById('backToTop');
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ============================================================
   8. ACTIVE NAV LINK — highlight berdasarkan section visible
   ============================================================ */

const sections   = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.35 });

sections.forEach(s => sectionObserver.observe(s));
