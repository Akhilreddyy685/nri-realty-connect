/* ============================================================
   NRI REALTORZ — App.js
   Tesla × MagicBricks inspired — Full platform logic
   ============================================================ */
'use strict';

/* ============================================================
   TELANGANA MARKET DATA
   Source: MagicBricks & NoBroker Telangana 2024-25
   ============================================================ */
const TELANGANA_PRICE_TRENDS = [
  { city:'Hyderabad', locality:'Gachibowli', avgPrice:'₹98L–₹2.4Cr', psf:'₹8,500–₹12,000', trend:'up', change:'+8.2%', type:'IT Hub' },
  { city:'Hyderabad', locality:'Jubilee Hills', avgPrice:'₹3Cr–₹12Cr', psf:'₹15,000–₹28,000', trend:'up', change:'+6.5%', type:'Luxury' },
  { city:'Hyderabad', locality:'Kokapet', avgPrice:'₹1.2Cr–₹3.8Cr', psf:'₹9,500–₹14,000', trend:'up', change:'+12.3%', type:'Emerging' },
  { city:'Hyderabad', locality:'Kondapur', avgPrice:'₹75L–₹1.8Cr', psf:'₹7,500–₹11,000', trend:'up', change:'+7.1%', type:'IT Corridor' },
  { city:'Hyderabad', locality:'Banjara Hills', avgPrice:'₹2.5Cr–₹8Cr', psf:'₹14,000–₹22,000', trend:'up', change:'+5.8%', type:'Premium' },
  { city:'Hyderabad', locality:'Manikonda', avgPrice:'₹55L–₹1.4Cr', psf:'₹5,500–₹8,500', trend:'up', change:'+9.4%', type:'Affordable' },
  { city:'Hyderabad', locality:'Narsingi', avgPrice:'₹80L–₹2Cr', psf:'₹6,800–₹10,500', trend:'up', change:'+10.1%', type:'Emerging' },
  { city:'Hyderabad', locality:'Bachupally', avgPrice:'₹45L–₹1.1Cr', psf:'₹4,800–₹7,500', trend:'up', change:'+6.8%', type:'JNTU Area' },
  { city:'Warangal', locality:'Hanamkonda', avgPrice:'₹28L–₹75L', psf:'₹3,200–₹5,500', trend:'up', change:'+5.2%', type:'City Centre' },
  { city:'Warangal', locality:'Kazipet', avgPrice:'₹22L–₹55L', psf:'₹2,800–₹4,500', trend:'up', change:'+4.8%', type:'Railway Area' },
  { city:'Karimnagar', locality:'Karimnagar Town', avgPrice:'₹25L–₹65L', psf:'₹2,900–₹5,000', trend:'up', change:'+4.5%', type:'City Centre' },
  { city:'Nizamabad', locality:'Nizamabad Town', avgPrice:'₹20L–₹55L', psf:'₹2,500–₹4,200', trend:'up', change:'+3.9%', type:'City Centre' },
];

const TELANGANA_CITIES = [
  { name:'Hyderabad', emoji:'🏙️', count:342, priceRange:'₹45L – ₹12Cr+' },
  { name:'Warangal', emoji:'🏛️', count:87, priceRange:'₹20L – ₹1.2Cr' },
  { name:'Karimnagar', emoji:'🌆', count:54, priceRange:'₹18L – ₹95L' },
  { name:'Nizamabad', emoji:'🏘️', count:43, priceRange:'₹15L – ₹80L' },
  { name:'Khammam', emoji:'🌿', count:38, priceRange:'₹18L – ₹90L' },
  { name:'Secunderabad', emoji:'🚉', count:62, priceRange:'₹55L – ₹3.5Cr' },
  { name:'Nalgonda', emoji:'🌾', count:28, priceRange:'₹12L – ₹65L' },
  { name:'Mahbubnagar', emoji:'🏗️', count:22, priceRange:'₹14L – ₹70L' },
];

const PROPERTIES = [
  // HYDERABAD BUY
  { id:1, title:'3BHK Premium Apartment', location:'Gachibowli, Hyderabad', city:'Hyderabad', price:18500000, priceDisplay:'₹1.85 Cr', psf:'₹10,000/sqft', area:'1,850 sqft', bhk:'3 BHK', type:'Apartment', listing:'Buy', badge:'featured', verified:true, views:2140, img:'images/property-apartment.png' },
  { id:2, title:'Modern Villa with Pool', location:'Jubilee Hills, Hyderabad', city:'Hyderabad', price:75000000, priceDisplay:'₹7.5 Cr', psf:'₹23,440/sqft', area:'3,200 sqft', bhk:'5 BHK', type:'Villa', listing:'Buy', badge:'featured', verified:true, views:3820, img:'images/property-luxury.png' },
  { id:3, title:'2BHK Luxury Apartment', location:'Kondapur, Hyderabad', city:'Hyderabad', price:8500000, priceDisplay:'₹85 L', psf:'₹7,800/sqft', area:'1,090 sqft', bhk:'2 BHK', type:'Apartment', listing:'Buy', badge:'verified', verified:true, views:1540, img:'images/property-apartment.png' },
  { id:4, title:'4BHK Independent Villa', location:'Kokapet, Hyderabad', city:'Hyderabad', price:32000000, priceDisplay:'₹3.2 Cr', psf:'₹11,800/sqft', area:'2,710 sqft', bhk:'4 BHK', type:'Villa', listing:'Buy', badge:'verified', verified:true, views:2670, img:'images/property-villa.png' },
  { id:5, title:'Prime Commercial Space', location:'HITEC City, Hyderabad', city:'Hyderabad', price:45000000, priceDisplay:'₹4.5 Cr', psf:'₹18,000/sqft', area:'2,500 sqft', bhk:'Office', type:'Commercial', listing:'Buy', badge:'verified', verified:true, views:1180, img:'images/property-luxury.png' },
  { id:6, title:'Open Residential Plot', location:'Narsingi, Hyderabad', city:'Hyderabad', price:9500000, priceDisplay:'₹95 L', psf:'₹4,750/sqft', area:'2,000 sqft', bhk:'Plot', type:'Plot / Land', listing:'Buy', badge:'verified', verified:true, views:980, img:'images/hero-plot.png' },
  // RENT
  { id:7, title:'2BHK Furnished Apartment', location:'Gachibowli, Hyderabad', city:'Hyderabad', price:35000, priceDisplay:'₹35,000/mo', psf:'—', area:'1,250 sqft', bhk:'2 BHK', type:'Apartment', listing:'Rent', badge:'rent', verified:true, views:892, img:'images/property-apartment.png' },
  { id:8, title:'3BHK Semi-Furnished Flat', location:'Madhapur, Hyderabad', city:'Hyderabad', price:45000, priceDisplay:'₹45,000/mo', psf:'—', area:'1,680 sqft', bhk:'3 BHK', type:'Apartment', listing:'Rent', badge:'rent', verified:true, views:1120, img:'images/property-apartment.png' },
  { id:9, title:'Independent Villa (Rental)', location:'Banjara Hills, Hyderabad', city:'Hyderabad', price:125000, priceDisplay:'₹1.25L/mo', psf:'—', area:'3,500 sqft', bhk:'4 BHK', type:'Villa', listing:'Rent', badge:'rent', verified:true, views:670, img:'images/property-villa.png' },
  // WARANGAL
  { id:10, title:'3BHK Independent House', location:'Hanamkonda, Warangal', city:'Warangal', price:6500000, priceDisplay:'₹65 L', psf:'₹3,611/sqft', area:'1,800 sqft', bhk:'3 BHK', type:'Independent House', listing:'Buy', badge:'verified', verified:true, views:543, img:'images/property-villa.png' },
  { id:11, title:'2BHK Apartment', location:'Kazipet, Warangal', city:'Warangal', price:3800000, priceDisplay:'₹38 L', psf:'₹3,455/sqft', area:'1,100 sqft', bhk:'2 BHK', type:'Apartment', listing:'Buy', badge:'verified', verified:true, views:412, img:'images/property-apartment.png' },
  // KARIMNAGAR / NIZAMABAD
  { id:12, title:'3BHK Premium Apartment', location:'Karimnagar Town', city:'Karimnagar', price:4500000, priceDisplay:'₹45 L', psf:'₹3,750/sqft', area:'1,200 sqft', bhk:'3 BHK', type:'Apartment', listing:'Buy', badge:'verified', verified:true, views:328, img:'images/property-apartment.png' },
  { id:13, title:'Open Plot — HMDA Layout', location:'Nizamabad Town', city:'Nizamabad', price:2800000, priceDisplay:'₹28 L', psf:'₹2,333/sqft', area:'1,200 sqft', bhk:'Plot', type:'Plot / Land', listing:'Buy', badge:'verified', verified:true, views:291, img:'images/hero-plot.png' },
  // BUILD MY HOME
  { id:14, title:'BuildMyHome™ — 3BHK Villa Plot', location:'Bachupally, Hyderabad', city:'Hyderabad', price:0, priceDisplay:'BuildMyHome™', psf:'₹2,499–₹4,499/sqft', area:'1,800–2,500 sqft', bhk:'Custom', type:'Villa', listing:'Build', badge:'buildmyhome', verified:true, views:1830, img:'images/hero-construction.png' },
];

const TESTIMONIALS = [
  { stars:5, text:"Built my 2,400 sqft villa in Jubilee Hills while living in Dubai — I didn't visit India once. The weekly video updates kept me completely at peace. Every rupee was accounted for.", name:'Rajesh Kumar', loc:'Dubai, UAE · Villa in Jubilee Hills', initials:'RK' },
  { stars:5, text:"After being cheated by a local contractor, I found NRI Realtorz. The transparency was night and day. Fixed pricing, legal support, and a dedicated PM who answered at 11pm my time.", name:'Sunita Patel', loc:'New Jersey, USA · House in Warangal', initials:'SP' },
  { stars:5, text:"The construction tracker dashboard is incredible. I watched my home's foundation being poured from my living room in London. Delivered on time, exactly as promised.", name:'Arun Mehta', loc:'London, UK · Villa in Kokapet', initials:'AM' },
  { stars:5, text:"Sold my Hyderabad property without a single trip to India. They handled the legal paperwork, found verified NRI buyers, and closed in 3 months. Highly recommend.", name:'Priya Sharma', loc:'Toronto, Canada · Sold in Banjara Hills', initials:'PS' },
  { stars:5, text:"Bought a 3BHK apartment in Kondapur. They arranged virtual tours, title verification, NRI home loan — seamless from start to finish. Zero hidden charges.", name:'Ravi Reddy', loc:'Singapore · Apartment in Kondapur', initials:'RR' },
];

const FAQS = [
  { q:'Can NRIs buy any type of property in India?', a:'NRIs can legally purchase residential and commercial properties in India under FEMA guidelines. You cannot purchase agricultural land, plantation property, or farmhouses without RBI special permission. We assist with all compliances.' },
  { q:'How do I pay for a property in India from abroad?', a:'NRIs can pay via NRE/NRO bank accounts, foreign inward remittance, or NRI home loans from Indian banks (SBI, HDFC, ICICI). We assist with all payment processes and repatriation documentation.' },
  { q:'What documents does an NRI need to buy property in India?', a:'Passport (valid), PAN Card, OCI/PIO Card (if applicable), NRE/NRO bank statements, overseas address proof, and the property documents. Our legal team handles all verification.' },
  { q:'How does the BuildMyHome™ service work?', a:'You share your plot details and vision. We create architectural plans, handle government permits, manage vetted contractors, send weekly HD video updates, do quality inspections, and hand over the finished home.' },
  { q:'What are the taxes an NRI pays when selling Indian property?', a:'Short-term capital gains (property held < 2 years) is taxed at 30%. Long-term is taxed at 20% with indexation. Under DTAA, double taxation can be avoided in most NRI countries. We provide full tax advisory.' },
  { q:'How long does it take to build a home?', a:'A standard 1,500–2,000 sqft home typically takes 12–18 months from permit approval to handover. Ultra Luxury homes may take 18–24 months. We provide a guaranteed delivery timeline before work begins.' },
];

/* ============================================================
   PAGE NAVIGATION
   ============================================================ */
function initNavigation() {
  const pages = { home:'page-home', properties:'page-properties', buildmyhome:'page-buildmyhome', services:'page-services', about:'page-about', contact:'page-contact' };

  function showPage(pageId) {
    document.querySelectorAll('.page').forEach(el => el.classList.remove('active'));
    const p = document.getElementById('page-' + pageId);
    if (p) { p.classList.add('active'); window.scrollTo({ top: 0, behavior: 'smooth' }); }
    document.querySelectorAll('.nav-links a').forEach(a => {
      a.classList.toggle('active', a.dataset.page === pageId);
    });
    if (pageId === 'home') initReveal();
  }

  // All [data-page] links
  document.addEventListener('click', e => {
    const link = e.target.closest('[data-page]');
    if (link) {
      e.preventDefault();
      history.pushState({}, '', '#' + link.dataset.page);
      showPage(link.dataset.page);
    }
  });

  // Hash routing
  function routeFromHash() {
    const hash = window.location.hash.replace('#','') || 'home';
    showPage(pages[hash] ? hash : 'home');
  }
  window.addEventListener('popstate', routeFromHash);
  routeFromHash();

  // Hamburger
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (hamburger) hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
}

/* ============================================================
   HERO CAROUSEL — 15 second rotation
   ============================================================ */
const heroLabels = ['🏡 Premium Villas', '🏢 Modern Apartments', '🏗️ Under Construction', '🌿 Open Plots'];
let heroIdx = 0, heroTimer;

function initHeroCarousel() {
  const bgs = document.querySelectorAll('.hero-bg');
  if (!bgs.length) return;
  function rotate() {
    bgs[heroIdx].classList.remove('hero-bg-active');
    heroIdx = (heroIdx + 1) % bgs.length;
    bgs[heroIdx].classList.add('hero-bg-active');
    const lbl = document.getElementById('heroSlideLabel');
    if (lbl) { lbl.style.opacity = '0'; setTimeout(() => { lbl.textContent = heroLabels[heroIdx]; lbl.style.opacity = '1'; }, 300); }
  }
  heroTimer = setInterval(rotate, 15000);
}

/* ============================================================
   HERO PARTICLES
   ============================================================ */
function initParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.className = 'hero-particle';
    const size = Math.random() * 60 + 20;
    p.style.cssText = `width:${size}px;height:${size}px;left:${Math.random()*100}%;top:${Math.random()*100}%;--duration:${6+Math.random()*8}s;--delay:${Math.random()*6}s`;
    container.appendChild(p);
  }
}

/* ============================================================
   STAT COUNTER
   ============================================================ */
function initStatCounters() {
  const els = document.querySelectorAll('.hero-stat-value[data-count]');
  if (!els.length) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const target = +e.target.dataset.count;
        const suffix = target >= 1000 ? '+' : (e.target.dataset.count === '8' ? '+' : '+');
        let start = 0; const dur = 2000;
        const t0 = Date.now();
        const tick = () => {
          const prog = Math.min((Date.now()-t0)/dur, 1);
          const ease = 1 - Math.pow(1-prog, 3);
          e.target.textContent = Math.floor(ease * target).toLocaleString('en-IN') + suffix;
          if (prog < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.6 });
  els.forEach(el => io.observe(el));
}

/* ============================================================
   PRICE TRENDS GRID — Telangana Market Data
   ============================================================ */
function renderPriceTrends() {
  const grid = document.getElementById('priceTrendsGrid');
  if (!grid) return;
  grid.innerHTML = TELANGANA_PRICE_TRENDS.map(t => `
    <div class="price-trend-card" onclick="filterByLocality('${t.city}')">
      <div class="ptc-city">${t.city}</div>
      <div class="ptc-locality">${t.locality}</div>
      <div class="ptc-price">${t.avgPrice}</div>
      <div class="ptc-psf">${t.psf} per sq ft</div>
      <div class="ptc-trend ${t.trend}">
        ${t.trend === 'up' ? '↑' : '↓'} ${t.change} <span style="font-weight:400;opacity:0.7">YoY · ${t.type}</span>
      </div>
    </div>
  `).join('');
}

function filterByLocality(city) {
  history.pushState({}, '', '#properties');
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-properties').classList.add('active');
  document.getElementById('filterCity').value = city;
  renderProperties(getFilteredProperties());
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ============================================================
   CITIES GRID
   ============================================================ */
function renderCities() {
  const grid = document.getElementById('citiesGrid');
  if (!grid) return;
  grid.innerHTML = TELANGANA_CITIES.map(c => `
    <div class="city-card" onclick="filterByLocality('${c.name}')">
      <div class="city-flag">${c.emoji}</div>
      <div class="city-name">${c.name}</div>
      <div class="city-count">${c.count} Properties</div>
      <div class="city-price">${c.priceRange}</div>
    </div>
  `).join('');
}

/* ============================================================
   PROPERTY CARDS
   ============================================================ */
function formatPrice(price, listing) {
  if (listing === 'Rent') return `₹${(price/1000).toFixed(0)}K/mo`;
  if (listing === 'Build') return 'BuildMyHome™';
  if (price >= 10000000) return `₹${(price/10000000).toFixed(2)} Cr`;
  if (price >= 100000) return `₹${(price/100000).toFixed(0)} L`;
  return `₹${price.toLocaleString('en-IN')}`;
}

function propertyCardHTML(p) {
  const badgeColors = { featured:'featured', verified:'verified', buildmyhome:'buildmyhome', rent:'rent', sell:'sell' };
  return `
    <div class="prop-card" data-id="${p.id}">
      <div class="prop-card-img">
        <img src="${p.img}" alt="${p.title}" loading="lazy" onerror="this.style.display='none'">
        <span class="prop-badge ${badgeColors[p.badge] || 'verified'}">${p.badge === 'buildmyhome' ? 'BuildMyHome™' : p.badge === 'featured' ? '⭐ Featured' : p.badge === 'rent' ? '🔑 Rent' : '✓ Verified'}</span>
        <div class="prop-wishlist" onclick="toggleWishlist(this)" title="Save property">🤍</div>
      </div>
      <div class="prop-card-body">
        <div class="prop-price">${p.priceDisplay} <span class="prop-price-sub">${p.psf !== '—' ? p.psf : ''}</span></div>
        <div class="prop-title">${p.title}</div>
        <div class="prop-location">${p.location}</div>
        <div class="prop-meta">
          <div class="prop-meta-item"><span class="prop-meta-icon">📐</span>${p.area}</div>
          <div class="prop-meta-item"><span class="prop-meta-icon">🛏️</span>${p.bhk}</div>
          <div class="prop-meta-item"><span class="prop-meta-icon">👁️</span>${p.views.toLocaleString('en-IN')} views</div>
        </div>
        <div class="prop-actions">
          <a href="#contact" class="btn-tour" data-page="contact">📹 Virtual Tour</a>
          <a href="#contact" class="btn-contact" data-page="contact">📞 Contact</a>
        </div>
      </div>
    </div>
  `;
}

function renderProperties(props, containerId = 'allPropertiesGrid') {
  const grid = document.getElementById(containerId);
  if (!grid) return;
  if (!props.length) {
    grid.innerHTML = '';
    const no = document.getElementById('noResults');
    if (no) no.style.display = 'block';
    return;
  }
  const no = document.getElementById('noResults');
  if (no) no.style.display = 'none';
  grid.innerHTML = props.map(propertyCardHTML).join('');
}

function renderFeatured() {
  const featured = PROPERTIES.filter(p => p.badge === 'featured' || p.id <= 4).slice(0, 3);
  renderProperties(featured, 'featuredPropertiesGrid');
}

function getFilteredProperties() {
  const listing = document.getElementById('filterListing')?.value || '';
  const city = document.getElementById('filterCity')?.value || '';
  const type = document.getElementById('filterType')?.value || '';
  const budget = document.getElementById('filterBudget')?.value || '';

  return PROPERTIES.filter(p => {
    if (listing && p.listing !== listing) return false;
    if (city && p.city !== city) return false;
    if (type && p.type !== type) return false;
    if (budget) {
      const [min, max] = budget.split('-').map(Number);
      if (p.price < min || p.price > max) return false;
    }
    return true;
  });
}

function initFilters() {
  // Populate city filter
  const citySelect = document.getElementById('filterCity');
  if (citySelect) {
    TELANGANA_CITIES.forEach(c => {
      const o = document.createElement('option');
      o.value = c.name; o.textContent = c.name;
      citySelect.appendChild(o);
    });
  }
  document.getElementById('applyFilters')?.addEventListener('click', () => {
    renderProperties(getFilteredProperties());
  });
  renderProperties(PROPERTIES);
}

function toggleWishlist(el) {
  el.classList.toggle('active');
  el.textContent = el.classList.contains('active') ? '❤️' : '🤍';
  showToast(el.classList.contains('active') ? '❤️ Property saved!' : 'Removed from saved');
}

/* ============================================================
   HERO SEARCH
   ============================================================ */
function initHeroSearch() {
  const tabs = document.querySelectorAll('.search-tab');
  const uploadPrompt = document.getElementById('uploadPrompt');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const type = tab.dataset.type;

      // Show upload prompt for sell/rent
      if (uploadPrompt) {
        uploadPrompt.classList.toggle('visible', type === 'sell' || type === 'rent');
        if (type === 'rent') uploadPrompt.querySelector('.btn-upload-quick').onclick = () => openUploadModal('rent');
        if (type === 'sell') uploadPrompt.querySelector('.btn-upload-quick').onclick = () => openUploadModal('sell');
      }
    });
  });

  document.getElementById('heroSearchBtn')?.addEventListener('click', () => {
    const q = document.getElementById('heroSearchInput').value.trim().toLowerCase();
    const activeTab = document.querySelector('.search-tab.active')?.dataset.type;

    if (activeTab === 'build') {
      history.pushState({}, '', '#buildmyhome');
      document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
      document.getElementById('page-buildmyhome').classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (activeTab === 'sell') { openUploadModal('sell'); return; }

    history.pushState({}, '', '#properties');
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-properties').classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const filtered = PROPERTIES.filter(p => {
      const matchQ = !q || p.title.toLowerCase().includes(q) || p.location.toLowerCase().includes(q) || p.city.toLowerCase().includes(q);
      const matchType = !activeTab || activeTab === 'buy' ? p.listing === 'Buy' : activeTab === 'rent' ? p.listing === 'Rent' : true;
      return matchQ && matchType;
    });
    renderProperties(filtered.length ? filtered : PROPERTIES);
  });
}

/* ============================================================
   UPLOAD / LIST PROPERTY MODAL
   ============================================================ */
let uploadedFiles = [];

function openUploadModal(listingType = 'sell') {
  const modal = document.getElementById('uploadModal');
  const title = document.getElementById('uploadModalTitle');
  const sub = document.getElementById('uploadModalSub');
  const select = document.getElementById('modalListingType');
  const priceLabel = document.getElementById('priceLabel');

  if (listingType === 'rent') {
    title.textContent = 'List Your Property for Rent';
    sub.textContent = 'Reach 50,000+ NRI tenants — fill in details & upload photos';
    select.value = 'rent';
    priceLabel.textContent = 'Monthly Rent (₹) *';
  } else {
    title.textContent = 'List Your Property for Sale';
    sub.textContent = 'Reach 50,000+ NRI buyers — fill in details & upload photos';
    select.value = 'sell';
    priceLabel.textContent = 'Asking Price (₹) *';
  }

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  uploadedFiles = [];
  document.getElementById('uploadPreviews').innerHTML = '';
}

function closeUploadModal() {
  document.getElementById('uploadModal').classList.remove('open');
  document.body.style.overflow = '';
}

function handleFiles(files) {
  const previews = document.getElementById('uploadPreviews');
  const allowed = ['image/jpeg','image/png','image/webp','video/mp4','video/quicktime'];
  const maxSize = 50 * 1024 * 1024;

  Array.from(files).forEach(file => {
    if (!allowed.includes(file.type)) { showToast('❌ Invalid file type: ' + file.name); return; }
    if (file.size > maxSize) { showToast('❌ File too large (max 50MB): ' + file.name); return; }
    if (uploadedFiles.length >= 20) { showToast('❌ Maximum 20 files allowed'); return; }

    uploadedFiles.push(file);
    const wrap = document.createElement('div');
    wrap.className = 'upload-preview-wrap';
    const idx = uploadedFiles.length - 1;

    if (file.type.startsWith('image/')) {
      const img = document.createElement('img');
      img.className = 'upload-preview';
      img.src = URL.createObjectURL(file);
      img.alt = file.name;
      wrap.appendChild(img);
    } else {
      const vid = document.createElement('div');
      vid.style.cssText = 'width:80px;height:80px;border-radius:8px;background:#1a2a4a;display:flex;align-items:center;justify-content:center;font-size:1.8rem;border:2px solid var(--border)';
      vid.textContent = '🎬';
      wrap.appendChild(vid);
    }

    const rm = document.createElement('div');
    rm.className = 'remove-btn';
    rm.textContent = '✕';
    rm.onclick = () => { uploadedFiles.splice(idx, 1); wrap.remove(); };
    wrap.appendChild(rm);
    previews.appendChild(wrap);
  });

  showToast(`✅ ${files.length} file(s) added (${uploadedFiles.length} total)`);
}

function submitListing() {
  const form = document.getElementById('listingForm');
  const inputs = form.querySelectorAll('input[required], select[required]');
  let valid = true;
  inputs.forEach(i => { if (!i.value.trim()) { i.style.borderColor = '#ef4444'; valid = false; } else { i.style.borderColor = ''; } });

  if (!valid) { showToast('⚠️ Please fill in all required fields'); return; }
  if (uploadedFiles.length === 0) { showToast('⚠️ Please upload at least one photo'); return; }

  showToast('🎉 Listing submitted! Our team will review and publish within 24 hours.');
  closeUploadModal();
  form.reset();
  uploadedFiles = [];
  document.getElementById('uploadPreviews').innerHTML = '';
}

// Drag & Drop
function initDragDrop() {
  const zone = document.getElementById('uploadZone');
  if (!zone) return;
  zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('dragover'); });
  zone.addEventListener('dragleave', () => zone.classList.remove('dragover'));
  zone.addEventListener('drop', e => { e.preventDefault(); zone.classList.remove('dragover'); handleFiles(e.dataTransfer.files); });
}

/* ============================================================
   TESTIMONIALS CAROUSEL
   ============================================================ */
function renderTestimonials() {
  const track = document.getElementById('testimonialsTrack');
  const dots = document.getElementById('testimonialDots');
  if (!track) return;

  track.innerHTML = TESTIMONIALS.map(t => `
    <div class="testimonial-card">
      <div class="testimonial-stars">${'★'.repeat(t.stars)}</div>
      <p class="testimonial-text">"${t.text}"</p>
      <div class="testimonial-author">
        <div class="author-avatar">${t.initials}</div>
        <div><div class="author-name">${t.name}</div><div class="author-loc">${t.loc}</div></div>
      </div>
    </div>
  `).join('');

  if (dots) {
    dots.innerHTML = TESTIMONIALS.map((_, i) => `<div class="testimonial-dot ${i===0?'active':''}" onclick="goToTestimonial(${i})"></div>`).join('');
  }

  let cur = 0;
  const total = TESTIMONIALS.length;

  window.goToTestimonial = function(idx) {
    cur = idx;
    track.style.transform = `translateX(-${idx * (100/3)}%)`;
    document.querySelectorAll('.testimonial-dot').forEach((d,i) => d.classList.toggle('active', i===idx));
  };

  setInterval(() => goToTestimonial((cur+1) % (total - 2)), 5000);
}

/* ============================================================
   SERVICES TABS
   ============================================================ */
function initServicesTabs() {
  document.querySelectorAll('.service-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.service-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.service-content').forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      const target = document.getElementById('service-' + tab.dataset.service);
      if (target) target.classList.add('active');
    });
  });
}

/* ============================================================
   FAQs
   ============================================================ */
function renderFAQs() {
  const list = document.getElementById('faqList');
  if (!list) return;
  list.innerHTML = FAQS.map((f, i) => `
    <div class="faq-item" id="faq${i}">
      <div class="faq-q" onclick="toggleFAQ(${i})">${f.q}<span class="arrow">▾</span></div>
      <div class="faq-a">${f.a}</div>
    </div>
  `).join('');
}

window.toggleFAQ = function(i) {
  const item = document.getElementById('faq' + i);
  item.classList.toggle('open');
};

/* ============================================================
   CONTACT FORM
   ============================================================ */
function initContactForm() {
  document.getElementById('contactForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('contactName')?.value?.trim();
    const email = document.getElementById('contactEmail')?.value?.trim();
    const phone = document.getElementById('contactPhone')?.value?.trim();
    if (!name || !email || !phone) { showToast('⚠️ Please fill all required fields'); return; }
    showToast(`✅ Thank you ${name}! Our team will contact you within 2 hours.`);
    e.target.reset();
  });
}

/* ============================================================
   CHATBOT
   ============================================================ */
const CHAT_RESPONSES = {
  build: "Our BuildMyHome™ service is perfect for NRIs! 🏗️\n\nWe handle everything from design to handover:\n• Fixed pricing: ₹2,499–₹4,499/sqft\n• Weekly HD video updates\n• GHMC approvals managed\n• On-time delivery guaranteed\n\nCall us: +91 9052201333",
  buy: "We have 500+ verified Telangana properties! 🏠\n\nFor buying:\n• 100% RERA verified listings\n• Virtual tours from abroad\n• NRI home loan assistance (SBI/HDFC/ICICI)\n• Zero brokerage\n\nBrowse: #properties\nOr call: +91 9052201333",
  rent: "For renting, we have 50+ verified rental properties across Hyderabad, Warangal & more! 🔑\n\nRents start from:\n• 2BHK: ₹25,000/mo\n• 3BHK: ₹40,000/mo\n• Villa: ₹80,000/mo\n\nContact: +91 9052201333",
  sell: "To sell your property:\n📤 Click 'List Property' at the top\n• Upload photos & videos\n• Reach 50,000+ NRI buyers\n• Completely free listing\n\nOr call: +91 9052201333",
  price: "Telangana 2025 Market Rates:\n\n📍 Gachibowli: ₹8,500–₹12,000/sqft\n📍 Jubilee Hills: ₹15,000–₹28,000/sqft\n📍 Kokapet: ₹9,500–₹14,000/sqft\n📍 Kondapur: ₹7,500–₹11,000/sqft\n📍 Warangal: ₹2,800–₹5,500/sqft",
  interior: "Our interior packages:\n🛋️ Villa: Starting ₹790/sqft\n🏢 Apartment: Starting ₹590/sqft\n🏠 Independent House: Starting ₹690/sqft\n🤖 Smart Automation: Starting ₹1.45L\n\n5–10% below competitor pricing! Call: +91 9052201333",
  legal: "For NRI legal matters, we help with:\n⚖️ DTAA benefits\n📝 Power of Attorney\n🏛️ GHMC permits & RERA\n💸 Repatriation under FEMA\n\nBook a legal consultation: +91 9052201333",
  contact: "📞 Call: +91 9052201333\n📧 amarender.gade@gmail.com\n💬 WhatsApp: wa.me/919052201333\n\nAvailable Mon–Sat, 9 AM – 8 PM IST\n\nOur team responds within 2 hours!",
  default: "Great question! 😊 Our NRI specialists are available 24/7.\n\n📞 Call: +91 9052201333\n💬 WhatsApp: wa.me/919052201333\n📧 amarender.gade@gmail.com\n\nFor instant answers, try: build | buy | sell | rent | price | interior | legal"
};

function getResponse(msg) {
  const m = msg.toLowerCase();
  if (m.match(/build|construct|buildmyhome/)) return CHAT_RESPONSES.build;
  if (m.match(/buy|purchase/)) return CHAT_RESPONSES.buy;
  if (m.match(/rent|lease/)) return CHAT_RESPONSES.rent;
  if (m.match(/sell|list/)) return CHAT_RESPONSES.sell;
  if (m.match(/price|rate|cost|sqft|per.*sq/)) return CHAT_RESPONSES.price;
  if (m.match(/interior|design|automation|smart/)) return CHAT_RESPONSES.interior;
  if (m.match(/legal|tax|rera|permit|dtaa|fema/)) return CHAT_RESPONSES.legal;
  if (m.match(/contact|call|phone|whatsapp|email/)) return CHAT_RESPONSES.contact;
  return CHAT_RESPONSES.default;
}

window.toggleChat = function() {
  const c = document.getElementById('chatbot');
  c.style.display = c.style.display === 'flex' ? 'none' : 'flex';
  if (c.style.display === 'flex') document.getElementById('chatInput')?.focus();
};

window.sendChat = function() {
  const input = document.getElementById('chatInput');
  const msgs = document.getElementById('chatMsgs');
  const msg = input.value.trim();
  if (!msg) return;

  msgs.innerHTML += `<div class="chat-msg user-msg">${msg}</div>`;
  input.value = '';
  msgs.scrollTop = msgs.scrollHeight;

  const typing = document.createElement('div');
  typing.className = 'chat-msg bot-msg';
  typing.innerHTML = '<em style="opacity:0.6">Typing...</em>';
  msgs.appendChild(typing);
  msgs.scrollTop = msgs.scrollHeight;

  setTimeout(() => {
    typing.innerHTML = getResponse(msg).replace(/\n/g, '<br>');
    msgs.scrollTop = msgs.scrollHeight;
  }, 900);
};

/* ============================================================
   TOAST
   ============================================================ */
window.showToast = function(msg, dur = 3500) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), dur);
};

/* ============================================================
   SCROLL ANIMATIONS
   ============================================================ */
function initReveal() {
  const els = document.querySelectorAll('.reveal, .reveal-left');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(el => io.observe(el));
}

/* ============================================================
   NAVBAR SCROLL
   ============================================================ */
function initNavScroll() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

/* ============================================================
   BACK TO TOP
   ============================================================ */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 400), { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ============================================================
   LOADER
   ============================================================ */
function hideLoader() {
  const loader = document.getElementById('pageLoader');
  if (loader) { loader.style.opacity = '0'; setTimeout(() => loader.classList.add('hidden'), 500); }
}

/* ============================================================
   INIT ALL
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initHeroCarousel();
  initParticles();
  initStatCounters();
  renderPriceTrends();
  renderCities();
  renderFeatured();
  renderTestimonials();
  renderFAQs();
  initFilters();
  initHeroSearch();
  initServicesTabs();
  initContactForm();
  initDragDrop();
  initNavScroll();
  initBackToTop();
  initReveal();

  setTimeout(hideLoader, 800);
  setTimeout(initReveal, 900);
});
