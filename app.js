// ============================================
// NRI REALTY CONNECT — Application Logic
// ============================================

// ===== SECURITY: Input Sanitization =====
function sanitizeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function sanitizeInput(input) {
  return String(input).replace(/[<>"'&]/g, char => ({
    '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#x27;', '&': '&amp;'
  })[char]);
}

// ===== MOCK DATA =====
const TELANGANA_CITIES = [
  'Hyderabad','Secunderabad','Warangal','Nizamabad','Karimnagar','Khammam',
  'Ramagundam','Mahbubnagar','Nalgonda','Adilabad','Siddipet','Suryapet',
  'Miryalaguda','Jagtial','Mancherial','Kamareddy','Bhongir','Medak',
  'Sangareddy','Wanaparthy','Nirmal','Gadwal','Kothagudem'
];
const AP_CITIES = [];
const ALL_CITIES = [...TELANGANA_CITIES];

const PROPERTIES = [
  { id:1, title:'Luxury 3 BHK Apartment in Gachibowli', type:'Apartment', bhk:'3 BHK', area:1850, price:12500000, priceLabel:'₹1.25 Cr', location:'Gachibowli, Hyderabad', state:'Telangana', city:'Hyderabad', image:'images/property-apartment.png', badge:'Verified', featured:true, listing:'Buy', amenities:['Pool','Gym','Parking','Garden'] },
  { id:2, title:'Modern Villa in Jubilee Hills', type:'Villa', bhk:'4 BHK', area:3200, price:45000000, priceLabel:'₹4.5 Cr', location:'Jubilee Hills, Hyderabad', state:'Telangana', city:'Hyderabad', image:'images/property-villa.png', badge:'Featured', featured:true, listing:'Buy', amenities:['Pool','Garden','Home Theater','Parking'] },
  { id:3, title:'Premium Plot in Shamshabad', type:'Plot / Land', bhk:'200 sq.yd', area:200, price:8000000, priceLabel:'₹80 Lakhs', location:'Shamshabad, Hyderabad', state:'Telangana', city:'Hyderabad', image:'images/property-plot.png', badge:'BuildMyHome™', featured:false, listing:'Buy', amenities:['Gated Community','Road Access'] },
  { id:6, title:'Commercial Space in HITEC City', type:'Commercial', bhk:'2500 sft', area:2500, price:35000000, priceLabel:'₹3.5 Cr', location:'HITEC City, Hyderabad', state:'Telangana', city:'Hyderabad', image:'images/property-apartment.png', badge:'Featured', featured:true, listing:'Buy', amenities:['24/7 Security','Power Backup','Parking'] },
  { id:7, title:'Gated Villa Plot in Warangal', type:'Plot / Land', bhk:'267 sq.yd', area:267, price:4500000, priceLabel:'₹45 Lakhs', location:'Kazipet, Warangal', state:'Telangana', city:'Warangal', image:'images/property-plot.png', badge:'BuildMyHome™', featured:false, listing:'Buy', amenities:['Gated','Avenue Plantation'] },
  { id:8, title:'2 BHK Flat for Rent in Kondapur', type:'Apartment', bhk:'2 BHK', area:1200, price:28000, priceLabel:'₹28,000/mo', location:'Kondapur, Hyderabad', state:'Telangana', city:'Hyderabad', image:'images/property-luxury.png', badge:'Verified', featured:false, listing:'Rent', amenities:['Semi-Furnished','Gym','Parking'] },
  { id:11, title:'Residential Plot in Nizamabad', type:'Plot / Land', bhk:'300 sq.yd', area:300, price:3500000, priceLabel:'₹35 Lakhs', location:'Armoor Road, Nizamabad', state:'Telangana', city:'Nizamabad', image:'images/property-plot.png', badge:'BuildMyHome™', featured:false, listing:'Buy', amenities:['DTCP Approved','Road Access'] },
  { id:12, title:'Penthouse in Banjara Hills', type:'Apartment', bhk:'4 BHK', area:4200, price:80000000, priceLabel:'₹8 Cr', location:'Banjara Hills, Hyderabad', state:'Telangana', city:'Hyderabad', image:'images/property-luxury.png', badge:'Featured', featured:true, listing:'Buy', amenities:['Terrace Pool','Concierge','Helipad'] },
  { id:14, title:'Furnished 2BHK in Madhapur', type:'Apartment', bhk:'2 BHK', area:1100, price:35000, priceLabel:'₹35,000/mo', location:'Madhapur, Hyderabad', state:'Telangana', city:'Hyderabad', image:'images/property-apartment.png', badge:'Verified', featured:false, listing:'Rent', amenities:['Fully Furnished','Gym','Pool'] },
  { id:16, title:'3 BHK Villa in Warangal', type:'Villa', bhk:'3 BHK', area:2400, price:9500000, priceLabel:'₹95 Lakhs', location:'Hanamkonda, Warangal', state:'Telangana', city:'Warangal', image:'images/property-villa.png', badge:'Verified', featured:true, listing:'Buy', amenities:['Garden','Parking','Vastu','Modular Kitchen'] },
  { id:17, title:'Premium Plot in Karimnagar', type:'Plot / Land', bhk:'350 sq.yd', area:350, price:5200000, priceLabel:'₹52 Lakhs', location:'Kothirampur, Karimnagar', state:'Telangana', city:'Karimnagar', image:'images/property-plot.png', badge:'BuildMyHome™', featured:false, listing:'Buy', amenities:['DTCP Approved','Corner Plot'] },
  { id:18, title:'Independent House in Secunderabad', type:'Independent House', bhk:'4 BHK', area:2800, price:18000000, priceLabel:'₹1.8 Cr', location:'Bowenpally, Secunderabad', state:'Telangana', city:'Secunderabad', image:'images/property-villa.png', badge:'Verified', featured:false, listing:'Buy', amenities:['Parking','Garden','Terrace'] },
];

const TESTIMONIALS = [
  { name:'Rajesh Reddy', initials:'RR', country:'🇺🇸 USA', text:'BuildMyHome™ was a game-changer. I built my dream home in Hyderabad while living in Dallas. Weekly video updates kept me involved in every decision. The quality exceeded my expectations!', stars:5 },
  { name:'Priya Sharma', initials:'PS', country:'🇬🇧 UK', text:'I was nervous about buying property remotely, but NRI Realty Connect made it seamless. Virtual tours, legal verification, and a dedicated manager — everything was handled professionally.', stars:5 },
  { name:'Venkat Rao', initials:'VR', country:'🇦🇪 UAE', text:'Sold my father\'s property in Hyderabad without traveling to India. The legal team handled POA, documentation, and registration perfectly. Received funds within 3 weeks of sale.', stars:5 },
  { name:'Lakshmi Devi', initials:'LD', country:'🇸🇬 Singapore', text:'Invested in a villa plot in Shamshabad through NRI Realty Connect. The property verification report gave me complete confidence. Now using BuildMyHome™ to construct!', stars:5 },
  { name:'Anil Kumar', initials:'AK', country:'🇦🇺 Australia', text:'Their property management service is excellent. My apartment in Gachibowli has been rented out for 3 years — they handle tenants, maintenance, and send me monthly reports.', stars:4 },
];

const FAQS = [
  { q:'Can NRIs buy property in India?', a:'Yes! NRIs can buy residential and commercial properties in India. However, NRIs cannot buy agricultural land, farmhouse, or plantation property. We guide you through all regulations and FEMA compliance.' },
  { q:'What documents do NRIs need to buy property?', a:'You need a valid Indian passport, PAN card, OCI/PIO card (if applicable), NRE/NRO bank account details, and address proof of overseas residence. For POA-based transactions, additional consulate-attested documents are required.' },
  { q:'How does the BuildMyHome™ service work?', a:'Share your plot details and requirements. Our architect creates custom designs. Once approved, we handle permits, construction, and handover. You get weekly video updates and quality inspection reports throughout the process.' },
  { q:'Is there any brokerage charged?', a:'We charge zero brokerage on property transactions. Our revenue comes from a transparent, flat service fee that is disclosed upfront before you commit. No hidden charges, ever.' },
  { q:'Can I get a home loan as an NRI?', a:'Yes! We have partnerships with SBI, HDFC, ICICI, and other banks offering NRI-specific home loan products. Loan amounts up to 80% of property value with competitive interest rates.' },
  { q:'How are properties verified?', a:'Every property undergoes a 27-point verification: title check, RERA compliance, encumbrance certificate, physical inspection, owner KYC, legal opinion, and valuation assessment by certified professionals.' },
  { q:'What is the DTAA benefit for NRIs?', a:'The Double Taxation Avoidance Agreement prevents you from being taxed twice on Indian property income. Benefits vary by country — we help you optimize tax liability based on your country of residence.' },
];

const CITY_DATA = [
  { name:'Hyderabad', state:'Telangana', count:'850+ Properties', color:'#1A3A5C' },
  { name:'Warangal', state:'Telangana', count:'150+ Properties', color:'#2A4A6C' },
  { name:'Karimnagar', state:'Telangana', count:'95+ Properties', color:'#0A2F4F' },
  { name:'Nizamabad', state:'Telangana', count:'75+ Properties', color:'#1A3A5C' },
  { name:'Khammam', state:'Telangana', count:'65+ Properties', color:'#2A4A6C' },
  { name:'Secunderabad', state:'Telangana', count:'120+ Properties', color:'#0A2F4F' },
  { name:'Nalgonda', state:'Telangana', count:'55+ Properties', color:'#1A3A5C' },
  { name:'Mahbubnagar', state:'Telangana', count:'50+ Properties', color:'#2A4A6C' },
  { name:'Siddipet', state:'Telangana', count:'45+ Properties', color:'#0A2F4F' },
  { name:'Adilabad', state:'Telangana', count:'40+ Properties', color:'#1A3A5C' },
  { name:'Suryapet', state:'Telangana', count:'35+ Properties', color:'#2A4A6C' },
  { name:'Ramagundam', state:'Telangana', count:'30+ Properties', color:'#0A2F4F' },
];

// ===== PAGE LOADER =====
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('pageLoader').classList.add('hidden');
  }, 800);
  initApp();
});

function initApp() {
  initRouter();
  initNavbar();
  initHeroParticles();
  initCounters();
  renderFeaturedProperties();
  renderAllProperties();
  renderCities();
  renderTestimonials();
  renderFAQs();
  initServiceTabs();
  initSearchTabs();
  initFilters();
  initContactForm();
  initScrollAnimations();
  initBackToTop();
}

// ===== ROUTER =====
function initRouter() {
  function navigate() {
    const hash = window.location.hash.replace('#','') || 'home';
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
    const page = document.getElementById('page-' + hash);
    if (page) {
      page.classList.add('active');
      const navLink = document.querySelector(`.nav-links a[data-page="${hash}"]`);
      if (navLink) navLink.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => initScrollAnimations(), 100);
    }
  }
  window.addEventListener('hashchange', navigate);
  navigate();
}

// ===== NAVBAR =====
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    if (navLinks.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    });
  });
}

// ===== HERO PARTICLES =====
function initHeroParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.classList.add('hero-particle');
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 15 + 's';
    particle.style.animationDuration = (10 + Math.random() * 10) + 's';
    particle.style.width = (2 + Math.random() * 4) + 'px';
    particle.style.height = particle.style.width;
    container.appendChild(particle);
  }
}

// ===== ANIMATED COUNTERS =====
function initCounters() {
  const counters = document.querySelectorAll('.hero-stat-value[data-count]');
  let started = false;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started) {
        started = true;
        counters.forEach(counter => {
          const target = parseInt(counter.dataset.count);
          const duration = 2000;
          const start = performance.now();
          function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            counter.textContent = Math.floor(eased * target).toLocaleString() + (target >= 100 ? '+' : '+');
            if (progress < 1) requestAnimationFrame(update);
          }
          requestAnimationFrame(update);
        });
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));
}

// ===== RENDER FUNCTIONS =====
function createPropertyCard(p) {
  const badgeClass = p.badge === 'Featured' ? 'featured' : p.badge === 'BuildMyHome™' ? 'buildmyhome-badge-sm' : '';
  return `
    <div class="property-card reveal">
      <div class="property-card-image">
        <img src="${p.image}" alt="${p.title}" loading="lazy">
        <span class="property-badge ${badgeClass}">${p.badge}</span>
        <div class="property-wishlist" onclick="this.innerHTML=this.innerHTML==='♡'?'❤️':'♡';event.stopPropagation()">♡</div>
      </div>
      <div class="property-card-body">
        <div class="property-price">${p.priceLabel} ${p.listing==='Rent'?'':'<span>onwards</span>'}</div>
        <div class="property-title">${p.title}</div>
        <div class="property-location">📍 ${p.location}</div>
        <div class="property-specs">
          <div class="property-spec">🏠 <strong>${p.bhk}</strong></div>
          <div class="property-spec">📐 <strong>${p.area.toLocaleString()}</strong> ${p.type==='Plot / Land'?'sq.yd':'sq.ft'}</div>
          <div class="property-spec">🏷️ <strong>${p.type}</strong></div>
        </div>
        <div class="property-actions">
          <button class="btn-primary" onclick="showToast('Virtual tour request sent! Our team will contact you shortly.')">Book Virtual Tour</button>
          <button class="btn-outline" onclick="showToast('Your inquiry has been submitted. Our NRI manager will reach out within 24 hours.')">Contact Manager</button>
        </div>
      </div>
    </div>`;
}

function renderFeaturedProperties() {
  const grid = document.getElementById('featuredPropertiesGrid');
  if (!grid) return;
  grid.innerHTML = PROPERTIES.filter(p => p.featured).map(createPropertyCard).join('');
}

function renderAllProperties(filters = {}) {
  const grid = document.getElementById('allPropertiesGrid');
  const noResults = document.getElementById('noResults');
  if (!grid) return;
  let filtered = [...PROPERTIES];
  if (filters.state) filtered = filtered.filter(p => p.state === filters.state);
  if (filters.city) filtered = filtered.filter(p => p.city === filters.city);
  if (filters.type) filtered = filtered.filter(p => p.type === filters.type);
  if (filters.listing) filtered = filtered.filter(p => p.listing === filters.listing);
  if (filters.budget) {
    const [min, max] = filters.budget.split('-').map(Number);
    filtered = filtered.filter(p => p.price >= min && p.price <= max);
  }
  if (filters.search) {
    const q = filters.search.toLowerCase();
    filtered = filtered.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q) ||
      p.city.toLowerCase().includes(q)
    );
  }
  grid.innerHTML = filtered.map(createPropertyCard).join('');
  if (noResults) noResults.style.display = filtered.length === 0 ? 'block' : 'none';
  setTimeout(() => initScrollAnimations(), 50);
}

function renderCities() {
  const grid = document.getElementById('citiesGrid');
  if (!grid) return;
  grid.innerHTML = CITY_DATA.map(c => `
    <div class="city-card reveal" style="background:linear-gradient(135deg,${c.color},${c.color}dd)" onclick="window.location.hash='properties'">
      <div class="city-card-overlay">
        <h3>${c.name}</h3>
        <span>${c.state} · ${c.count}</span>
      </div>
    </div>`).join('');
}

function renderTestimonials() {
  const track = document.getElementById('testimonialsTrack');
  const dots = document.getElementById('testimonialDots');
  if (!track || !dots) return;
  track.innerHTML = TESTIMONIALS.map(t => `
    <div class="testimonial-card">
      <div class="testimonial-inner">
        <div class="testimonial-stars">${'★'.repeat(t.stars)}${'☆'.repeat(5-t.stars)}</div>
        <p class="testimonial-text">"${t.text}"</p>
        <div class="testimonial-author">
          <div class="testimonial-avatar">${t.initials}</div>
          <div class="testimonial-info"><h4>${t.name}</h4><span>${t.country}</span></div>
        </div>
      </div>
    </div>`).join('');
  dots.innerHTML = TESTIMONIALS.map((_, i) => `<div class="testimonial-dot ${i===0?'active':''}" data-index="${i}"></div>`).join('');

  let current = 0;
  function goTo(index) {
    current = index;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.querySelectorAll('.testimonial-dot').forEach((d, i) => d.classList.toggle('active', i === current));
  }
  dots.querySelectorAll('.testimonial-dot').forEach(d => d.addEventListener('click', () => goTo(parseInt(d.dataset.index))));
  setInterval(() => goTo((current + 1) % TESTIMONIALS.length), 5000);
}

function renderFAQs() {
  const list = document.getElementById('faqList');
  if (!list) return;
  list.innerHTML = FAQS.map(f => `
    <div class="faq-item reveal">
      <button class="faq-question" onclick="toggleFaq(this)">
        <span>${f.q}</span>
        <span class="faq-icon">+</span>
      </button>
      <div class="faq-answer"><p>${f.a}</p></div>
    </div>`).join('');
}

// ===== INTERACTIONS =====
function toggleFaq(btn) {
  const isActive = btn.classList.contains('active');
  document.querySelectorAll('.faq-question').forEach(q => {
    q.classList.remove('active');
    q.nextElementSibling.style.maxHeight = '0';
  });
  if (!isActive) {
    btn.classList.add('active');
    btn.nextElementSibling.style.maxHeight = btn.nextElementSibling.scrollHeight + 'px';
  }
}

function initSearchTabs() {
  document.querySelectorAll('.search-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.search-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });
  const searchBtn = document.getElementById('heroSearchBtn');
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      const q = document.getElementById('heroSearchInput').value;
      window.location.hash = 'properties';
      setTimeout(() => renderAllProperties({ search: q }), 200);
    });
  }
}

function initServiceTabs() {
  document.querySelectorAll('.service-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.service-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.service-content').forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      const content = document.getElementById('service-' + tab.dataset.service);
      if (content) content.classList.add('active');
    });
  });
}

function initFilters() {
  const stateSelect = document.getElementById('filterState');
  const citySelect = document.getElementById('filterCity');
  if (stateSelect) {
    stateSelect.addEventListener('change', () => {
      const state = stateSelect.value;
      const cities = state === 'Telangana' ? TELANGANA_CITIES : state === 'Andhra Pradesh' ? AP_CITIES : ALL_CITIES;
      citySelect.innerHTML = '<option value="">All Cities</option>' + cities.map(c => `<option>${c}</option>`).join('');
    });
  }
  const applyBtn = document.getElementById('applyFilters');
  if (applyBtn) {
    applyBtn.addEventListener('click', () => {
      renderAllProperties({
        state: document.getElementById('filterState').value,
        city: document.getElementById('filterCity').value,
        type: document.getElementById('filterType').value,
        budget: document.getElementById('filterBudget').value,
        listing: document.getElementById('filterListing').value,
      });
    });
  }
}

function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = sanitizeInput(document.getElementById('contactName').value.trim());
    const email = sanitizeInput(document.getElementById('contactEmail').value.trim());
    const phone = sanitizeInput(document.getElementById('contactPhone').value.trim());
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name || !email || !phone) return showToast('Please fill in all required fields.');
    if (!emailRegex.test(email)) return showToast('Please enter a valid email address.');
    if (phone.length < 8) return showToast('Please enter a valid phone number.');
    showToast(`Thank you, ${name}! Your inquiry has been submitted. Our NRI specialist will contact you within 24 hours.`);
    form.reset();
  });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    if (!el.classList.contains('visible')) observer.observe(el);
  });
}

// ===== BACK TO TOP =====
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ===== TOAST =====
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = sanitizeHTML(message);
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}
