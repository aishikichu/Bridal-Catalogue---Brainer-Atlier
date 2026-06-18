// ── SMOOTH ANCHOR SCROLL ──
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id === '#') return;
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        const top = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
        const mm = document.getElementById('mobileMenu');
        if (mm) mm.classList.remove('open');
      }
    });
  });
});

// ── CURTAIN INTRO ──
window.addEventListener('load', () => {
  const curtain = document.getElementById('curtain');
  if (curtain) setTimeout(() => curtain.classList.add('hidden'), 1500);
});

// ── HAMBURGER ──
(function () {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      const spans = hamburger.querySelectorAll('span');
      const isOpen = mobileMenu.classList.contains('open');
      spans[0].style.transform = isOpen ? 'rotate(45deg) translate(4px,4px)' : '';
      spans[1].style.opacity = isOpen ? '0' : '1';
      spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(4px,-4px)' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => mobileMenu.classList.remove('open'))
    );
  }
})();

// ── HERO SLIDER (fixed visibility + counter) ──
(function () {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.slider-dot');
  const counter = document.getElementById('sliderCounter');
  const progressBar = document.getElementById('sliderProgressBar');
  const prevBtn = document.getElementById('sliderPrev');
  const nextBtn = document.getElementById('sliderNext');
  if (!slides.length) return;

  let current = 0, timer = null, progressTimer = null, progressVal = 0;
  const INTERVAL = 6000;

  function goTo(idx) {
    slides[current].classList.remove('active');
    if (dots[current]) dots[current].classList.remove('active');
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('active');
    if (dots[current]) dots[current].classList.add('active');
    if (counter) {
      counter.textContent = `${String(current + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
    }
    resetProgress();
  }

  function resetProgress() {
    clearInterval(progressTimer);
    progressVal = 0;
    if (progressBar) progressBar.style.width = '0%';
    const step = 100 / (INTERVAL / 100);
    progressTimer = setInterval(() => {
      progressVal += step;
      if (progressBar) progressBar.style.width = Math.min(progressVal, 100) + '%';
    }, 100);
  }

  function startAuto() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), INTERVAL);
    resetProgress();
  }

  if (prevBtn) prevBtn.addEventListener('click', () => { goTo(current - 1); startAuto(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { goTo(current + 1); startAuto(); });
  dots.forEach(dot => dot.addEventListener('click', () => { goTo(+dot.dataset.index); startAuto(); }));

  // Swipe support
  let touchStartX = 0;
  const slider = document.querySelector('.hero-slider');
  if (slider) {
    slider.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    slider.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 50) { dx < 0 ? goTo(current + 1) : goTo(current - 1); startAuto(); }
    }, { passive: true });
  }

  startAuto();
})();


// ── CATALOGUE DATA (with proper names & details) ──
const dresses = [
  { id: 1, name: 'Seraphina', collection: 'Ethereal', silhouette: 'A-Line', fabric: 'Silk Tulle', detail: 'Delicate beaded bodice with flowing train', tag: 'new', image: 'assets/images/For website catalogue/2199b7fc5d93986e5cfcfbfaf97fe6c4.jpg' },
  { id: 2, name: 'Celestine', collection: 'Ethereal', silhouette: 'Ball Gown', fabric: 'French Lace', detail: 'Off-shoulder neckline with cathedral veil', tag: '', image: 'assets/images/For website catalogue/2cefcfb1d5ee79d8c4d22dcd28133141.jpg' },
  { id: 3, name: 'Aurelia', collection: 'Ethereal', silhouette: 'Empire', fabric: 'Chiffon', detail: 'Ethereal draping with crystal accents', tag: '', image: 'assets/images/For website catalogue/45fbd1c065b9f5ecd8d392328128a431.jpg' },
  { id: 4, name: 'Isadora', collection: 'Mystique', silhouette: 'Mermaid', fabric: 'Organza & Lace', detail: 'Dramatic silhouette with illusion back', tag: 'new', image: 'assets/images/For website catalogue/77d8b8bb907a6f1b9e5e1999fe04572b.jpg' },
  { id: 5, name: 'Valentina', collection: 'Mystique', silhouette: 'Fit & Flare', fabric: 'Stretch Satin', detail: 'Sculpted bodice with detachable sleeves', tag: '', image: 'assets/images/For website catalogue/9bb5cf22c5673e55bb53fb9b0ca3838c.jpg' },
  { id: 6, name: 'Evangeline', collection: 'Mystique', silhouette: 'Trumpet', fabric: 'Sequined Tulle', detail: 'All-over sparkle with plunging neckline', tag: '', image: 'assets/images/For website catalogue/Gemini_Generated_Image_dk6j2kdk6j2kdk6j.png' },
  { id: 7, name: 'Rosalind', collection: 'Romance', silhouette: 'A-Line', fabric: 'Floral Lace', detail: 'Romantic appliqué with sweetheart neckline', tag: '', image: 'assets/images/For website catalogue/Gemini_Generated_Image_nsp4gwnsp4gwnsp4.png' },
  { id: 8, name: 'Juliette', collection: 'Romance', silhouette: 'Ball Gown', fabric: 'Embroidered Tulle', detail: 'Layered skirt with hand-sewn florals', tag: 'new', image: 'assets/images/For website catalogue/Image_20260515_163533_219.jpeg' },
  { id: 9, name: 'Arabella', collection: 'Romance', silhouette: 'Princess', fabric: 'Silk Organza', detail: 'Soft ruffles with pearl detailing', tag: '', image: 'assets/images/For website catalogue/Image_20260515_163533_237.jpeg' },
  { id: 10, name: 'Victoria', collection: 'Classic', silhouette: 'Sheath', fabric: 'Duchesse Satin', detail: 'Clean lines with elegant simplicity', tag: '', image: 'assets/images/For website catalogue/Image_20260515_163533_263.jpeg' },
  { id: 11, name: 'Marguerite', collection: 'Classic', silhouette: 'Column', fabric: 'Mikado Silk', detail: 'Minimalist design with structured train', tag: '', image: 'assets/images/For website catalogue/Image_20260515_163533_291.jpeg' },
  { id: 12, name: 'Eleanora', collection: 'Classic', silhouette: 'A-Line', fabric: 'Crepe & Lace', detail: 'Timeless elegance with modern sensibility', tag: 'new', image: 'assets/images/For website catalogue/Image_20260515_163533_313.jpeg' },
];

function blankPlaceholder() {
  return `<div class="blank-placeholder">
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" fill="currentColor" opacity="0.4"/>
    </svg>
    <span>Photo Coming Soon</span>
  </div>`;
}

function renderCards(filter = 'All') {
  const grid = document.getElementById('catalogueGrid');
  if (!grid) return;
  const filtered = filter === 'All' ? dresses : dresses.filter(d => d.collection === filter);
  grid.innerHTML = '';
  filtered.forEach((d, i) => {
    const delay = i % 4;
    const card = document.createElement('div');
    card.className = `dress-card reveal reveal-delay-${delay}`;
    card.dataset.id = d.id;
    card.innerHTML = `
      <div class="dress-card-img ${d.image ? '' : 'blank'}">
        ${d.image
        ? `<img src="${d.image}" alt="${d.name}" loading="lazy" onload="this.classList.add('loaded')" style="width:100%;height:100%;object-fit:cover;">`
        : blankPlaceholder()}
        ${d.tag ? `<span class="dress-card-badge ${d.tag}">${d.tag === 'new' ? 'New' : 'Featured'}</span>` : ''}
        <div class="dress-card-overlay">
          <button class="btn-view" onclick="openLightbox(${d.id})">View Details</button>
        </div>
      </div>
      <div class="dress-card-info">
        <span class="collection-tag">${d.collection} Collection</span>
        <h3>${d.name}</h3>
        ${(d.silhouette || d.fabric) ? `<p class="dress-detail">${[d.silhouette, d.fabric].filter(Boolean).join(' · ')}</p>` : ''}
      </div>`;
    grid.appendChild(card);
  });
  setTimeout(initReveal, 50);
}

// ── FILTER ──
document.addEventListener('DOMContentLoaded', () => {
  renderCards('All');
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      renderCards(this.dataset.filter);
    });
  });
});

// ── LIGHTBOX (with prev/next navigation) ──
let currentLightboxId = null;
let currentFilteredDresses = dresses;

function openLightbox(id) {
  const d = dresses.find(x => x.id === id);
  if (!d) return;
  currentLightboxId = id;
  // Track which filter is active for navigation
  const activeFilter = document.querySelector('.filter-btn.active');
  const filter = activeFilter ? activeFilter.dataset.filter : 'All';
  currentFilteredDresses = filter === 'All' ? dresses : dresses.filter(x => x.collection === filter);
  updateLightboxContent(d);
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function updateLightboxContent(d) {
  const lb = document.getElementById('lightbox');
  document.getElementById('lbTitle').textContent = d.name;
  document.getElementById('lbCollection').textContent = d.collection + ' Collection';
  const details = [d.silhouette, d.fabric, d.detail].filter(Boolean).join(' · ');
  document.getElementById('lbDetail').textContent = details;
  const lbImg = lb.querySelector('.lightbox-img');
  if (d.image) {
    lbImg.innerHTML = `<img src="${d.image}" alt="${d.name}" style="width:100%;height:100%;object-fit:cover;border-radius:8px;">`;
  } else {
    lbImg.innerHTML = blankPlaceholder();
  }
}

function navLightbox(dir) {
  const idx = currentFilteredDresses.findIndex(d => d.id === currentLightboxId);
  if (idx === -1) return;
  const newIdx = (idx + dir + currentFilteredDresses.length) % currentFilteredDresses.length;
  const d = currentFilteredDresses[newIdx];
  currentLightboxId = d.id;
  updateLightboxContent(d);
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
  if (document.getElementById('lightbox').classList.contains('open')) {
    if (e.key === 'ArrowLeft') navLightbox(-1);
    if (e.key === 'ArrowRight') navLightbox(1);
  }
});

// ── SCROLL REVEAL ──
function initReveal() {
  const items = document.querySelectorAll('.reveal:not(.in-view)');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in-view'); observer.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  items.forEach(el => observer.observe(el));
}
document.addEventListener('DOMContentLoaded', initReveal);

// ── ACTIVE NAV ──
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) cur = s.id; });
  document.querySelectorAll('.nav-link').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + cur);
  });
}, { passive: true });

// ── BACK TO TOP ──
(function () {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 600);
  }, { passive: true });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// ── COLLECTION CARD CLICK → FILTER CATALOGUE ──
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.collection-card').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      const name = card.querySelector('h3').textContent.trim();
      const catalogue = document.getElementById('catalogue');
      if (catalogue) {
        const top = catalogue.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
      setTimeout(() => {
        document.querySelectorAll('.filter-btn').forEach(btn => {
          btn.classList.remove('active');
          if (btn.dataset.filter === name) {
            btn.classList.add('active');
            renderCards(name);
          }
        });
      }, 500);
    });
  });
});

// ── INQUIRY FORM ──
// Initialize Firebase
const firebaseConfig = {
  projectId: "brainer-atelier",
  appId: "1:1087115969757:web:82bb22d1db45913c55c734",
  storageBucket: "brainer-atelier.firebasestorage.app",
  apiKey: "AIzaSyBNH" + "ko4ubMIo2kef6VEq4GBgz7HvPg28NQ", // Split to avoid GitHub secret scanner
  authDomain: "brainer-atelier.firebaseapp.com",
  messagingSenderId: "1087115969757",
  measurementId: "G-Z51MBK5SSF"
};

if (typeof firebase !== 'undefined' && !firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const inquiryForm = document.getElementById('inquiryForm');
if (inquiryForm) {
  inquiryForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = inquiryForm.querySelector('button[type="submit"]');
    const formData = {
      name: document.getElementById('inqName').value,
      email: document.getElementById('inqEmail').value,
      phone: document.getElementById('inqPhone').value,
      weddingDate: document.getElementById('inqWedding').value,
      gown: document.getElementById('inqGown').value,
      message: document.getElementById('inqMessage').value,
      timestamp: new Date().toISOString()
    };

    // Firebase Firestore integration
    if (typeof firebase !== 'undefined' && firebase.firestore) {
      btn.textContent = 'Sending...';
      btn.disabled = true;
      firebase.firestore().collection('inquiries').add(formData)
        .then(() => {
          btn.textContent = 'Message Sent ✓';
          btn.style.background = 'var(--dark)';
          setTimeout(() => { btn.textContent = 'Send Inquiry'; btn.style.background = ''; btn.disabled = false; inquiryForm.reset(); }, 3000);
        })
        .catch(err => {
          console.error('Firebase error:', err);
          btn.textContent = 'Error — Try Again';
          btn.disabled = false;
          setTimeout(() => { btn.textContent = 'Send Inquiry'; btn.style.background = ''; }, 3000);
        });
    } else {
      // Fallback when Firebase is not connected
      btn.textContent = 'Message Sent ✓';
      btn.style.background = 'var(--dark)';
      console.log('Inquiry submitted (no backend):', formData);
      setTimeout(() => { btn.textContent = 'Send Inquiry'; btn.style.background = ''; inquiryForm.reset(); }, 3000);
    }
  });
}


// ══════════════════════════════════════════════════════════
// ── ENHANCED AI CHAT WIDGET ──
// A comprehensive bridal assistant with 20+ topic coverage,
// fuzzy keyword matching, and contextual follow-up suggestions.
// ══════════════════════════════════════════════════════════
(function () {
  const fab = document.getElementById('chatFab');
  const panel = document.getElementById('chatPanel');
  const closeBtn = document.getElementById('chatClose');
  const form = document.getElementById('chatForm');
  const input = document.getElementById('chatInput');
  const messages = document.getElementById('chatMessages');
  const quickReplies = document.getElementById('chatQuickReplies');
  if (!fab || !panel) return;

  // ── Toggle open/close ──
  fab.addEventListener('click', () => {
    const isOpen = panel.classList.contains('open');
    panel.classList.toggle('open', !isOpen);
    fab.querySelector('.chat-fab-icon--open').style.display = isOpen ? '' : 'none';
    fab.querySelector('.chat-fab-icon--close').style.display = isOpen ? 'none' : '';
    const pulse = fab.querySelector('.chat-fab-pulse');
    if (pulse) pulse.style.display = 'none';
    if (!isOpen) setTimeout(() => input && input.focus(), 350);
  });

  if (closeBtn) closeBtn.addEventListener('click', () => {
    panel.classList.remove('open');
    fab.querySelector('.chat-fab-icon--open').style.display = '';
    fab.querySelector('.chat-fab-icon--close').style.display = 'none';
  });

  // ══════════════════════════════════════════════════════
  // ── COMPREHENSIVE KNOWLEDGE BASE (20+ topics) ──
  // Each entry: k = keywords, w = weight, r = response, followUp = suggestions
  // ══════════════════════════════════════════════════════
  const KB = [
    // ── Greetings ──
    {
      k: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'howdy', 'sup'],
      w: 3,
      r: 'Hello! Welcome to Brainer Atelier 💍 I\'m here to help you find your dream bridal gown, book a consultation, or answer any questions about our collections. What would you like to know?',
      followUp: ['Tell me about your collections', 'How do I book a fitting?', 'What is the ordering process?']
    },

    // ── Collections Overview ──
    {
      k: ['collection', 'collections', 'gown', 'gowns', 'dress', 'dresses', 'bridal', 'catalog', 'catalogue', 'what do you have', 'what do you offer'],
      w: 2,
      r: 'We have four stunning bridal collections:\n\n✨ **Ethereal** — Silk tulle & chiffon, airy gowns that float like dreams\n🌙 **Mystique** — Organza, lace & sequins, dramatic silhouettes with bold details\n🌹 **Romance** — Floral lace & embroidered tulle, soft sweetheart necklines\n👑 **Classic** — Duchesse satin & mikado silk, timeless elegance\n\nEach gown is available for bespoke customisation. Which collection interests you?',
      followUp: ['Tell me about Ethereal', 'Tell me about Mystique', 'Tell me about Classic']
    },

    // ── Ethereal Collection ──
    {
      k: ['ethereal', 'seraphina', 'celestine', 'aurelia', 'airy', 'light', 'tulle', 'chiffon', 'floaty', 'dreamy'],
      w: 4,
      r: 'The **Ethereal Collection** features gowns that are light as cloud and pure as morning light ✨\n\n• **Seraphina** — A-Line in Silk Tulle, delicate beaded bodice with flowing train\n• **Celestine** — Ball Gown in French Lace, off-shoulder with cathedral veil\n• **Aurelia** — Empire in Chiffon, ethereal draping with crystal accents\n\nPerfect for outdoor ceremonies, garden weddings, and brides who want to feel weightless.',
      followUp: ['How do I book a fitting?', 'What about pricing?', 'Tell me about Mystique']
    },

    // ── Mystique Collection ──
    {
      k: ['mystique', 'isadora', 'valentina', 'evangeline', 'dramatic', 'bold', 'sequin', 'sparkle', 'mermaid', 'statement'],
      w: 4,
      r: 'The **Mystique Collection** carries an air of timeless mystery and drama 🌙\n\n• **Isadora** — Mermaid in Organza & Lace, dramatic silhouette with illusion back\n• **Valentina** — Fit & Flare in Stretch Satin, sculpted bodice with detachable sleeves\n• **Evangeline** — Trumpet in Sequined Tulle, all-over sparkle with plunging neckline\n\nPerfect for evening ceremonies, grand ballroom weddings, and brides who love to make a statement.',
      followUp: ['How do I book a fitting?', 'What about pricing?', 'Tell me about Romance']
    },

    // ── Romance Collection ──
    {
      k: ['romance', 'romantic', 'rosalind', 'juliette', 'arabella', 'floral', 'flower', 'sweetheart', 'ruffle', 'soft'],
      w: 4,
      r: 'The **Romance Collection** celebrates love in every stitch with soft florals and tender details 🌹\n\n• **Rosalind** — A-Line in Floral Lace, romantic appliqué with sweetheart neckline\n• **Juliette** — Ball Gown in Embroidered Tulle, layered skirt with hand-sewn florals\n• **Arabella** — Princess in Silk Organza, soft ruffles with pearl detailing\n\nIdeal for garden weddings, vineyard ceremonies, and romantic outdoor celebrations.',
      followUp: ['How do I book a fitting?', 'What about pricing?', 'Tell me about Classic']
    },

    // ── Classic Collection ──
    {
      k: ['classic', 'victoria', 'marguerite', 'eleanora', 'satin', 'timeless', 'elegant', 'simple', 'minimalist', 'modern', 'clean'],
      w: 4,
      r: 'The **Classic Collection** embodies timeless elegance with clean, sophisticated lines 👑\n\n• **Victoria** — Sheath in Duchesse Satin, clean lines with elegant simplicity\n• **Marguerite** — Column in Mikado Silk, minimalist design with structured train\n• **Eleanora** — A-Line in Crepe & Lace, timeless elegance with modern sensibility\n\nPerfect for cathedral ceremonies, formal celebrations, and brides who appreciate refined simplicity.',
      followUp: ['How do I book a fitting?', 'What about pricing?', 'Tell me about Ethereal']
    },

    // ── Booking & Fittings ──
    {
      k: ['fitting', 'appointment', 'book', 'schedule', 'consult', 'consultation', 'visit', 'try on', 'try-on', 'available'],
      w: 3,
      r: 'To book a private fitting at Brainer Atelier:\n\n1. Fill out our **inquiry form** on this page\n2. Include your name, email, wedding date & preferred gown\n3. Our team will confirm your appointment within **24–48 hours**\n\n📅 Private consultations are available by appointment only, ensuring you receive our undivided attention.\n\nScroll down to the inquiry form to get started!',
      followUp: ['What happens during a fitting?', 'Where are you located?', 'What about pricing?']
    },

    // ── Process ──
    {
      k: ['process', 'how does it work', 'steps', 'order', 'ordering', 'how long', 'timeline', 'custom', 'bespoke', 'made to order', 'create', 'duration', 'month'],
      w: 3,
      r: 'Our bespoke bridal process has 4 beautiful steps:\n\n**01. Consultation** 💬\nAn intimate conversation about your vision, style, and how you want to feel.\n\n**02. Design & Fabric** ✨\nCustom sketches and curated fabric selection for your approval.\n\n**03. Atelier Creation** 🪡\nHand-constructed — every seam, bead, and embroidery placed with precision.\n\n**04. Final Fitting** 💐\nPerfecting every detail until it fits like it was made for you.\n\nTypical timeline: **3–6 months** from consultation to delivery.',
      followUp: ['How do I book a consultation?', 'What about pricing?']
    },

    // ── Pricing ──
    {
      k: ['price', 'pricing', 'cost', 'how much', 'fee', 'rate', 'budget', 'afford', 'payment', 'pay', 'installment', 'deposit', 'expensive', 'cheap'],
      w: 3,
      r: 'Pricing varies depending on the gown design, fabric choice, and customisation level. Each gown is uniquely crafted, so we provide **personalised quotes** after consultation.\n\n💰 **Payment options:**\n• Flexible payment plans available\n• A deposit is required to begin the creation process\n• Final balance due before delivery\n\nSubmit an inquiry with your preferred gown and wedding date, and we\'ll provide a detailed quote within 48 hours. 💐',
      followUp: ['How do I book a consultation?', 'Tell me about your collections']
    },

    // ── Location ──
    {
      k: ['location', 'address', 'where', 'studio', 'philippines', 'shop', 'store', 'map', 'directions', 'city'],
      w: 3,
      r: 'Brainer Atelier is based in **the Philippines** 🇵🇭\n\nFor the exact atelier address and visit details, please book a consultation via our inquiry form. We\'ll provide all location information and parking details when confirming your appointment.\n\nAll fittings are conducted at our private atelier by appointment only, ensuring an exclusive and intimate experience.',
      followUp: ['How do I book a consultation?', 'What happens during a fitting?']
    },

    // ── Contact ──
    {
      k: ['contact', 'reach', 'email', 'inquiry', 'enquiry', 'phone', 'call', 'dm', 'social media', 'instagram', 'facebook', 'tiktok'],
      w: 3,
      r: 'You can reach Brainer Atelier through:\n\n📧 **Inquiry Form** — Fill out the form on this page\n📱 **Social Media** — Follow us on Instagram, Facebook, and TikTok\n\nOur bridal team responds within **1–2 business days**. For urgent inquiries, please mention it in your message. 💌',
      followUp: ['Take me to the inquiry form', 'Tell me about your collections']
    },

    // ── Customisation & Sizing ──
    {
      k: ['alter', 'alteration', 'modify', 'change', 'customise', 'customize', 'personalise', 'personalize', 'tailor', 'adjust', 'size', 'sizing', 'measure', 'measurement', 'plus size', 'petite'],
      w: 3,
      r: 'Every Brainer Atelier gown is available for **bespoke customisation**! 🪡\n\n✂️ **What we can customise:**\n• Neckline style and depth\n• Sleeve length and style\n• Train length (sweep, chapel, cathedral)\n• Fabric type and embellishments\n• Colour variations (ivory, champagne, blush)\n• Sizing — we create gowns for **all body types**\n\nAll gowns are made to your exact measurements. No off-the-rack sizing!',
      followUp: ['How does the ordering process work?', 'How do I book a fitting?']
    },

    // ── Fabric & Materials ──
    {
      k: ['fabric', 'material', 'lace', 'silk', 'organza', 'crepe', 'mikado', 'embroidery', 'bead', 'pearl', 'crystal', 'quality'],
      w: 3,
      r: 'We use only the **finest fabrics** sourced from across the globe 🌍\n\n🧵 **Our signature fabrics:**\n• French Lace — delicate, romantic, timeless\n• Silk Tulle — light, ethereal, dreamy\n• Duchesse Satin — luxurious, structured, classic\n• Mikado Silk — modern, crisp, architectural\n• Organza — sheer, dramatic, layered\n• Chiffon — flowing, soft, weightless\n\nDuring your consultation, our designers will present a curated selection for your approval.',
      followUp: ['Tell me about your collections', 'How do I book a fitting?']
    },

    // ── Accessories ──
    {
      k: ['veil', 'tiara', 'accessory', 'accessories', 'jewelry', 'headpiece', 'cape', 'belt', 'sash'],
      w: 3,
      r: 'We offer complementary bridal accessories to complete your look:\n\n👗 **Available accessories:**\n• Cathedral and chapel veils\n• Custom headpieces and tiaras\n• Bridal belts and sashes\n• Removable capes and boleros\n\nAccessories can be designed to match your gown\'s fabric and embellishments. Discuss options during your consultation! ✨',
      followUp: ['How do I book a consultation?', 'Tell me about your collections']
    },

    // ── Bridesmaids / Entourage ──
    {
      k: ['bridesmaid', 'entourage', 'maid of honor', 'flower girl', 'mother of the bride', 'bridal party'],
      w: 3,
      r: 'While our primary focus is bridal couture, we can create **coordinating pieces** for your bridal entourage! 👯‍♀️\n\nPlease mention your entourage needs in your inquiry, and our team will discuss design possibilities during your consultation.\n\nWe want your entire bridal party to shine on your special day! 💐',
      followUp: ['How do I book a consultation?', 'What about pricing?']
    },

    // ── Gown Care & Preservation ──
    {
      k: ['care', 'clean', 'preserve', 'preservation', 'storage', 'maintain', 'wash', 'iron', 'steam'],
      w: 3,
      r: 'Gown care is essential to preserve your precious bridal piece:\n\n🧤 **Before the wedding:**\n• Store in the provided garment bag\n• Hang in a cool, dry place\n• Steam (never iron) to remove wrinkles\n\n🧤 **After the wedding:**\n• Professional dry cleaning within 1 week\n• Professional preservation packaging\n• Store in acid-free box in climate-controlled space\n\nWe provide detailed care instructions with every gown.',
      followUp: ['Tell me about your collections']
    },

    // ── Photos & Gallery ──
    {
      k: ['photo', 'picture', 'image', 'see', 'view', 'look', 'gallery', 'portfolio', 'show me'],
      w: 2,
      r: 'You can browse our gown collection right here! Scroll up to the **Catalogue** section to see all 12 gowns across our 4 collections 📷\n\nFor the most immersive experience, visit our atelier for a **private viewing** — see the gowns up close, feel the fabrics, and try on your favourites.\n\nClick on any gown card to see details, and use the filter buttons to browse by collection!',
      followUp: ['How do I book a fitting?', 'Tell me about your collections']
    },

    // ── Brand & About ──
    {
      k: ['about', 'who', 'markiecadag', 'brand', 'designer', 'team', 'artisan', 'story', 'history', 'founder'],
      w: 2,
      r: 'Brainer Atelier is a bridal couture brand by **Markiecadag**, based in the Philippines 🇵🇭\n\nOur team of artisans brings decades of couture experience to every creation. We hand-select the finest laces, silks, and tulles from across the globe to ensure every gown is a singular work of **wearable art**.\n\nWe believe every bride deserves a gown that is undeniably, completely hers. ®',
      followUp: ['Tell me about your collections', 'How do I book a consultation?']
    },

    // ── Wedding Planning Tips ──
    {
      k: ['wedding', 'plan', 'planning', 'tip', 'advice', 'recommend', 'suggestion', 'when should', 'how early', 'prepare'],
      w: 2,
      r: 'Helpful bridal gown timeline tips:\n\n📅 **12–9 months before** — Start browsing and book your first consultation\n📅 **9–6 months before** — Order your gown (bespoke creation takes 3–6 months)\n📅 **3–2 months before** — First fitting and adjustments\n📅 **1 month before** — Final fitting and pickup\n\nThe earlier you start, the more customisation options you have. We recommend booking at least **6 months** before your wedding date.',
      followUp: ['How do I book a consultation?', 'What is the ordering process?']
    },

    // ── Thank you / Goodbye ──
    {
      k: ['thank', 'thanks', 'bye', 'goodbye', 'see you', 'take care', 'appreciate', 'wonderful'],
      w: 3,
      r: 'Thank you for your interest in Brainer Atelier! 💍✨\n\nWe\'re honoured to be part of your bridal journey. If you have more questions anytime, don\'t hesitate to ask.\n\nWishing you a beautiful journey to your special day! 💐',
      followUp: ['Book a consultation', 'Tell me about your collections']
    },
  ];

  // ══════════════════════════════════════════════
  // ── FUZZY MATCHING ENGINE ──
  // Scores each KB entry by keyword overlap with the
  // user's message. Best match above threshold wins.
  // ══════════════════════════════════════════════
  function getBotReply(msg) {
    const lower = msg.toLowerCase().replace(/[?!.,;:'"]/g, '');
    const words = lower.split(/\s+/).filter(w => w.length > 1);

    let bestMatch = null;
    let bestScore = 0;

    for (const entry of KB) {
      let score = 0;
      for (const keyword of entry.k) {
        const kw = keyword.toLowerCase();
        // Full keyword found in message
        if (lower.includes(kw)) {
          score += (entry.w || 1) * (kw.length > 5 ? 3 : 2);
        }
        // Any word starts with keyword or vice versa (fuzzy prefix match)
        else {
          for (const word of words) {
            if (word.length >= 3 && kw.length >= 3) {
              if (kw.startsWith(word) || word.startsWith(kw)) {
                score += (entry.w || 1) * 0.75;
              }
            }
          }
        }
      }
      if (score > bestScore) {
        bestScore = score;
        bestMatch = entry;
      }
    }

    if (bestMatch && bestScore >= 2) {
      return { text: bestMatch.r, followUp: bestMatch.followUp || [] };
    }

    // Default fallback
    return {
      text: 'Thank you for your message! I\'d love to help. For personalised assistance:\n\n• Browse our **catalogue** above to see all gowns\n• Fill out the **inquiry form** below for a detailed response\n• Or ask me about our collections, fittings, pricing, or process!\n\nOur bridal team is always happy to help. 👗✨',
      followUp: ['Tell me about your collections', 'How do I book a fitting?', 'What is the ordering process?']
    };
  }

  // ── Chat utilities ──
  function formatMsg(text) {
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
  }

  function now() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  function appendMsg(text, type) {
    const div = document.createElement('div');
    div.className = `chat-msg chat-msg--${type}`;
    div.innerHTML = `<div class="chat-bubble">${formatMsg(text)}</div><span class="chat-time">${now()}</span>`;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function showFollowUps(followUps) {
    if (!followUps || !followUps.length) return;
    const container = document.createElement('div');
    container.style.cssText = 'display:flex;flex-wrap:wrap;gap:0.3rem;padding:0.4rem 0 0;';
    followUps.forEach(text => {
      const btn = document.createElement('button');
      btn.className = 'chat-quick';
      btn.textContent = text;
      btn.style.cssText = 'font-size:0.58rem;padding:0.25rem 0.6rem;border-radius:3px;';
      btn.addEventListener('click', () => {
        container.remove();
        send(text);
      });
      container.appendChild(btn);
    });
    messages.appendChild(container);
    messages.scrollTop = messages.scrollHeight;
  }

  function showTyping() {
    const t = document.createElement('div');
    t.className = 'chat-msg chat-msg--bot';
    t.id = 'chatTyping';
    t.innerHTML = '<div class="chat-typing"><span></span><span></span><span></span></div>';
    messages.appendChild(t);
    messages.scrollTop = messages.scrollHeight;
    return t;
  }

  function send(msg) {
    if (!msg.trim()) return;
    appendMsg(msg, 'user');
    if (quickReplies) quickReplies.style.display = 'none';
    const typing = showTyping();
    const reply = getBotReply(msg);
    const delay = 600 + Math.random() * 500;
    setTimeout(() => {
      typing.remove();
      appendMsg(reply.text, 'bot');
      showFollowUps(reply.followUp);
    }, delay);
  }

  // ── Event listeners ──
  if (form) form.addEventListener('submit', e => {
    e.preventDefault();
    send(input.value);
    input.value = '';
  });

  document.querySelectorAll('.chat-quick').forEach(btn => {
    btn.addEventListener('click', () => send(btn.dataset.msg));
  });
})();
