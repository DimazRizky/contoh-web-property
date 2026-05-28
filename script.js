/* ============================================================
   PROPERTYGROUP — script.js
   Interactivity: Navbar, Listings, Gallery, Testimonials, Form
   ============================================================ */

'use strict';

/* ============================================================
   1. NAVBAR — scroll effect & mobile hamburger
   ============================================================ */

const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

// Tambahkan class "scrolled" saat pengguna scroll ke bawah
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  backToTop.classList.toggle('show', window.scrollY > 400);
});

// Toggle menu mobile saat hamburger diklik
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Tutup menu mobile saat link diklik
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
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Delay bertahap untuk kartu dalam grid
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -48px 0px' });

// Daftarkan semua elemen .reveal dan beri delay bertahap
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
    name: 'Villa Harmoni Serpong',
    price: 'Rp 2,8 Miliar',
    location: 'Tangerang Selatan',
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&q=80',
    beds: '4 KT', baths: '3 KM', area: '320 m²'
  },
  {
    id: 2, tab: 'primary',
    name: 'Rumah Mewah Pondok Indah',
    price: 'Rp 6,5 Miliar',
    location: 'Jakarta Selatan',
    img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=500&q=80',
    beds: '5 KT', baths: '4 KM', area: '560 m²'
  },
  {
    id: 3, tab: 'secondary',
    name: 'Apartemen Gateway Pasteur',
    price: 'Rp 620 Juta',
    location: 'Bandung',
    img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&q=80',
    beds: '2 KT', baths: '1 KM', area: '68 m²'
  },
  {
    id: 4, tab: 'secondary',
    name: 'Townhouse Kebayoran Lama',
    price: 'Rp 1,4 Miliar',
    location: 'Jakarta Selatan',
    img: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500&q=80',
    beds: '3 KT', baths: '2 KM', area: '190 m²'
  },
  {
    id: 5, tab: 'shophouse',
    name: 'Ruko 3 Lantai BSD City',
    price: 'Rp 4,2 Miliar',
    location: 'Tangerang Selatan',
    img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=500&q=80',
    beds: '3 Lantai', baths: '2 KM', area: '210 m²'
  },
  {
    id: 6, tab: 'shophouse',
    name: 'Ruko Premium Summarecon',
    price: 'Rp 5,8 Miliar',
    location: 'Bekasi',
    img: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=500&q=80',
    beds: '4 Lantai', baths: '3 KM', area: '280 m²'
  },
  {
    id: 7, tab: 'warehouse',
    name: 'Gudang Industri Cikarang',
    price: 'Rp 8,5 Miliar',
    location: 'Bekasi',
    img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500&q=80',
    beds: '1 Office', baths: '2 KM', area: '2.400 m²'
  },
  {
    id: 8, tab: 'warehouse',
    name: 'Gudang Logistik Cakung',
    price: 'Rp 5,2 Miliar',
    location: 'Jakarta Timur',
    img: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=500&q=80',
    beds: '1 Office', baths: '1 KM', area: '1.800 m²'
  },
  {
    id: 9, tab: 'land',
    name: 'Kavling Komersial Depok',
    price: 'Rp 3,6 Miliar',
    location: 'Depok',
    img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500&q=80',
    beds: 'Tanah', baths: '—', area: '600 m²'
  },
  {
    id: 10, tab: 'land',
    name: 'Lahan Strategis Sentul',
    price: 'Rp 1,8 Miliar',
    location: 'Bogor',
    img: 'https://images.unsplash.com/photo-1464082354059-27db6ce50048?w=500&q=80',
    beds: 'Tanah', baths: '—', area: '1.200 m²'
  },
  {
    id: 11, tab: 'primary',
    name: 'Cluster Moderne Bintaro',
    price: 'Rp 1,95 Miliar',
    location: 'Tangerang Selatan',
    img: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=500&q=80',
    beds: '3 KT', baths: '2 KM', area: '160 m²'
  },
  {
    id: 12, tab: 'secondary',
    name: 'Rumah Second Terawat Bumi Serpong',
    price: 'Rp 890 Juta',
    location: 'Tangerang',
    img: 'https://images.unsplash.com/photo-1592595896551-12b371d546d5?w=500&q=80',
    beds: '3 KT', baths: '2 KM', area: '140 m²'
  },
];

// Tab label yang lebih ramah untuk badge
const TAB_LABELS = {
  primary: 'Primer',
  secondary: 'Sekunder',
  shophouse: 'Ruko',
  warehouse: 'Gudang',
  land: 'Tanah',
};

// Render kartu listing ke dalam grid
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
        <p class="listing-loc">📍 ${p.location}</p>
        <div class="listing-meta">
          <span>🛏 ${p.beds}</span>
          <span>🚿 ${p.baths}</span>
          <span>📐 ${p.area}</span>
        </div>
      </div>
    </div>
  `).join('');

  // Aktifkan reveal observer untuk kartu baru
  grid.querySelectorAll('.reveal').forEach((el, i) => {
    el.dataset.delay = i * 60;
    revealObserver.observe(el);
  });
}

// Event listener untuk tombol filter tab
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderListings(btn.dataset.tab);
  });
});

// Render default semua listing
renderListings('all');

/* ============================================================
   4. GALLERY — render gambar & lightbox
   ============================================================ */

const GALLERY_IMAGES = [
  { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', label: 'Luxury Villa', size: 'wide' },
  { src: 'https://images.unsplash.com/photo-1565182999561-18d7dc61c393?w=800&q=80', label: 'Modern Interior', size: '' },
  { src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80', label: 'Premium Residence', size: 'tall' },
  { src: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80', label: 'Bright Living Room', size: '' },
  { src: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80', label: 'Elegant Lounge', size: '' },
  { src: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80', label: 'City Apartment', size: 'wide' },
  { src: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&q=80', label: 'Cozy Bedroom', size: '' },
  { src: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80', label: 'Modern Kitchen', size: '' },
  { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', label: 'Commercial Space', size: '' },
];

const galleryGrid    = document.getElementById('galleryGrid');
const lightbox       = document.getElementById('lightbox');
const lightboxImg    = document.getElementById('lightboxImg');
const lightboxClose  = document.getElementById('lightboxClose');
const lightboxPrev   = document.getElementById('lightboxPrev');
const lightboxNext   = document.getElementById('lightboxNext');
let currentLightboxIndex = 0;

// Render item galeri
galleryGrid.innerHTML = GALLERY_IMAGES.map((img, i) => `
  <div class="gallery-item ${img.size} reveal" data-index="${i}">
    <img src="${img.src}" alt="${img.label}" loading="lazy"/>
    <div class="gallery-item-overlay">
      <span>${img.label}</span>
    </div>
  </div>
`).join('');

// Aktifkan reveal untuk galeri
galleryGrid.querySelectorAll('.reveal').forEach((el, i) => {
  el.dataset.delay = i * 50;
  revealObserver.observe(el);
});

// Buka lightbox saat item galeri diklik
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
  document.body.style.overflow = 'hidden'; // Cegah scroll saat lightbox terbuka
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

// Navigasi lightbox
lightboxPrev.addEventListener('click', () => {
  currentLightboxIndex = (currentLightboxIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
  openLightbox(currentLightboxIndex);
});

lightboxNext.addEventListener('click', () => {
  currentLightboxIndex = (currentLightboxIndex + 1) % GALLERY_IMAGES.length;
  openLightbox(currentLightboxIndex);
});

// Keyboard navigation lightbox
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') lightboxPrev.click();
  if (e.key === 'ArrowRight') lightboxNext.click();
});

/* ============================================================
   5. TESTIMONIALS SLIDER — auto & manual navigation
   ============================================================ */

const TESTIMONIALS = [
  {
    quote: 'PropertyGroup benar-benar mengubah pengalaman kami dalam membeli rumah pertama. Tim mereka sangat profesional, transparan, dan selalu siap membantu. Prosesnya mudah dan menyenangkan!',
    name: 'Budi Santoso',
    role: 'Pembeli Rumah Pertama · Jakarta',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    stars: 5
  },
  {
    quote: 'Saya menjual properti komersial melalui PropertyGroup dan hasilnya luar biasa — terjual lebih cepat dari target dengan harga yang sangat memuaskan. Layanan konsultasinya benar-benar bernilai.',
    name: 'Siti Rahayu',
    role: 'Pemilik Ruko · Tangerang',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    stars: 5
  },
  {
    quote: 'Tim kontraktor mereka merenovasi gudang kami dengan kualitas premium dan tepat waktu. Harga sangat transparan, tidak ada biaya tersembunyi sama sekali. Highly recommended!',
    name: 'Ahmad Fauzi',
    role: 'Pemilik Bisnis Logistik · Bekasi',
    avatar: 'https://randomuser.me/api/portraits/men/55.jpg',
    stars: 5
  },
  {
    quote: 'Konsultan PropertyGroup membantu kami menganalisis portofolio investasi properti dengan sangat mendalam. Dalam 2 tahun, nilai investasi kami naik signifikan berkat panduan mereka.',
    name: 'Linda Wijaya',
    role: 'Investor Properti · Surabaya',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    stars: 5
  },
];

const sliderEl   = document.getElementById('testimonialsSlider');
const dotsEl     = document.getElementById('sliderDots');
let currentSlide = 0;
let autoSlide;

// Render semua kartu testimoni
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

// Render dots navigasi
dotsEl.innerHTML = TESTIMONIALS.map((_, i) => `
  <button class="dot ${i === 0 ? 'active' : ''}" data-dot="${i}" aria-label="Slide ${i + 1}"></button>
`).join('');

// Tampilkan slide ke-n
function goToSlide(n) {
  sliderEl.querySelectorAll('.testimonial-card').forEach(c => c.classList.remove('active'));
  dotsEl.querySelectorAll('.dot').forEach(d => d.classList.remove('active'));
  sliderEl.querySelector(`[data-index="${n}"]`).classList.add('active');
  dotsEl.querySelector(`[data-dot="${n}"]`).classList.add('active');
  currentSlide = n;
}

// Klik dot
dotsEl.addEventListener('click', (e) => {
  const dot = e.target.closest('.dot');
  if (!dot) return;
  clearInterval(autoSlide);
  goToSlide(parseInt(dot.dataset.dot));
  startAutoSlide();
});

// Auto-play setiap 5 detik
function startAutoSlide() {
  autoSlide = setInterval(() => {
    goToSlide((currentSlide + 1) % TESTIMONIALS.length);
  }, 5000);
}

startAutoSlide();

// Swipe gesture support untuk mobile
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

  // Validasi sederhana
  const name  = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();

  if (!name) { contactForm.name.focus(); return; }
  if (!email || !email.includes('@')) { contactForm.email.focus(); return; }

  // Simulasi pengiriman (integrasikan dengan backend nyata di sini)
  const btn = contactForm.querySelector('button[type="submit"]');
  btn.textContent = 'Sending…';
  btn.disabled = true;

  setTimeout(() => {
    contactForm.reset();
    btn.textContent = 'Send Message';
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

const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));
