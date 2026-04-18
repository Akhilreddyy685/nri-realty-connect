/* ============================================================
   NRI REALTORZ — App.js  v3.0
   Fixed: Tab navigation, Sell/Rent inline upload bar,
   Supabase open-source backend integration
   ============================================================ */
'use strict';

/* ============================================================
   SUPABASE CONFIG (Open Source PostgreSQL Backend)
   Free tier: supabase.com — 500MB DB, unlimited requests
   ============================================================ */
const SUPABASE_URL = 'https://YOUR_PROJECT.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_ANON_KEY';

// Lightweight Supabase REST API client (no npm needed)
const db = {
  async insert(table, data) {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify(data)
      });
      return { ok: res.ok, status: res.status };
    } catch (err) {
      console.warn('DB offline — saving locally:', err.message);
      // Fallback: save to localStorage when Supabase not yet configured
      const stored = JSON.parse(localStorage.getItem('nri_listings') || '[]');
      stored.push({ ...data, id: Date.now(), saved_at: new Date().toISOString() });
      localStorage.setItem('nri_listings', JSON.stringify(stored));
      return { ok: true, offline: true };
    }
  },

  async select(table, filters = '') {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${filters}`, {
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
        }
      });
      return res.ok ? await res.json() : [];
    } catch {
      return JSON.parse(localStorage.getItem('nri_' + table) || '[]');
    }
  }
};

/* ============================================================
   TELANGANA MARKET DATA — MagicBricks / NoBroker 2024-25
   ============================================================ */
const TELANGANA_PRICE_TRENDS = [
  { city:'Hyderabad', locality:'Gachibowli',    avgPrice:'₹98L–₹2.4Cr',  psf:'₹8,500–₹12,000',  trend:'up', change:'+8.2%',  type:'IT Hub' },
  { city:'Hyderabad', locality:'Jubilee Hills',  avgPrice:'₹3Cr–₹12Cr',   psf:'₹15,000–₹28,000', trend:'up', change:'+6.5%',  type:'Luxury' },
  { city:'Hyderabad', locality:'Kokapet',        avgPrice:'₹1.2Cr–₹3.8Cr',psf:'₹9,500–₹14,000',  trend:'up', change:'+12.3%', type:'Emerging' },
  { city:'Hyderabad', locality:'Kondapur',       avgPrice:'₹75L–₹1.8Cr',  psf:'₹7,500–₹11,000',  trend:'up', change:'+7.1%',  type:'IT Corridor' },
  { city:'Hyderabad', locality:'Banjara Hills',  avgPrice:'₹2.5Cr–₹8Cr',  psf:'₹14,000–₹22,000', trend:'up', change:'+5.8%',  type:'Premium' },
  { city:'Hyderabad', locality:'Manikonda',      avgPrice:'₹55L–₹1.4Cr',  psf:'₹5,500–₹8,500',   trend:'up', change:'+9.4%',  type:'Affordable' },
  { city:'Hyderabad', locality:'Narsingi',       avgPrice:'₹80L–₹2Cr',    psf:'₹6,800–₹10,500',  trend:'up', change:'+10.1%', type:'Emerging' },
  { city:'Hyderabad', locality:'Bachupally',     avgPrice:'₹45L–₹1.1Cr',  psf:'₹4,800–₹7,500',   trend:'up', change:'+6.8%',  type:'JNTU Area' },
  { city:'Hyderabad', locality:'Miyapur',        avgPrice:'₹50L–₹1.3Cr',  psf:'₹5,000–₹8,000',   trend:'up', change:'+7.5%',  type:'Metro Area' },
  { city:'Hyderabad', locality:'Tellapur',       avgPrice:'₹70L–₹2.2Cr',  psf:'₹7,000–₹11,500',  trend:'up', change:'+11.2%', type:'Emerging' },
  { city:'Warangal',  locality:'Hanamkonda',     avgPrice:'₹28L–₹75L',    psf:'₹3,200–₹5,500',   trend:'up', change:'+5.2%',  type:'City Centre' },
  { city:'Warangal',  locality:'Kazipet',        avgPrice:'₹22L–₹55L',    psf:'₹2,800–₹4,500',   trend:'up', change:'+4.8%',  type:'Railway Area' },
  { city:'Karimnagar', locality:'Karimnagar Town', avgPrice:'₹25L–₹65L',  psf:'₹2,900–₹5,000',   trend:'up', change:'+4.5%',  type:'City Centre' },
  { city:'Nizamabad',  locality:'Nizamabad Town',  avgPrice:'₹20L–₹55L',  psf:'₹2,500–₹4,200',   trend:'up', change:'+3.9%',  type:'City Centre' },
];

const TELANGANA_CITIES = [
  { name:'Hyderabad', emoji:'🏙️', count:342, priceRange:'₹45L – ₹12Cr+' },
  { name:'Warangal',  emoji:'🏛️', count:87,  priceRange:'₹20L – ₹1.2Cr' },
  { name:'Karimnagar',emoji:'🌆', count:54,  priceRange:'₹18L – ₹95L' },
  { name:'Nizamabad', emoji:'🏘️', count:43,  priceRange:'₹15L – ₹80L' },
  { name:'Khammam',   emoji:'🌿', count:38,  priceRange:'₹18L – ₹90L' },
  { name:'Secunderabad',emoji:'🚉', count:62, priceRange:'₹55L – ₹3.5Cr' },
  { name:'Nalgonda',  emoji:'🌾', count:28,  priceRange:'₹12L – ₹65L' },
  { name:'Mahbubnagar',emoji:'🏗️', count:22, priceRange:'₹14L – ₹70L' },
];

const PROPERTIES = [
  { id:1,  title:'3BHK Premium Apartment',     location:'Gachibowli, Hyderabad',  city:'Hyderabad', price:18500000, priceDisplay:'₹1.85 Cr', psf:'₹10,000/sqft', area:'1,850 sqft', bhk:'3 BHK', type:'Apartment',        listing:'Buy',   badge:'featured',   verified:true, views:2140, img:'images/property-apartment.png' },
  { id:2,  title:'Modern Villa with Pool',      location:'Jubilee Hills, Hyderabad',city:'Hyderabad', price:75000000, priceDisplay:'₹7.5 Cr',  psf:'₹23,440/sqft', area:'3,200 sqft', bhk:'5 BHK', type:'Villa',           listing:'Buy',   badge:'featured',   verified:true, views:3820, img:'images/property-luxury.png' },
  { id:3,  title:'2BHK Luxury Apartment',       location:'Kondapur, Hyderabad',    city:'Hyderabad', price:8500000,  priceDisplay:'₹85 L',    psf:'₹7,800/sqft',  area:'1,090 sqft', bhk:'2 BHK', type:'Apartment',        listing:'Buy',   badge:'verified',   verified:true, views:1540, img:'images/property-apartment.png' },
  { id:4,  title:'4BHK Independent Villa',      location:'Kokapet, Hyderabad',     city:'Hyderabad', price:32000000, priceDisplay:'₹3.2 Cr',  psf:'₹11,800/sqft', area:'2,710 sqft', bhk:'4 BHK', type:'Villa',           listing:'Buy',   badge:'verified',   verified:true, views:2670, img:'images/property-villa.png' },
  { id:5,  title:'Prime Commercial Space',       location:'HITEC City, Hyderabad',  city:'Hyderabad', price:45000000, priceDisplay:'₹4.5 Cr',  psf:'₹18,000/sqft', area:'2,500 sqft', bhk:'Office',type:'Commercial',      listing:'Buy',   badge:'verified',   verified:true, views:1180, img:'images/property-luxury.png' },
  { id:6,  title:'Open Residential Plot',        location:'Narsingi, Hyderabad',    city:'Hyderabad', price:9500000,  priceDisplay:'₹95 L',    psf:'₹4,750/sqft',  area:'2,000 sqft', bhk:'Plot',  type:'Plot / Land',     listing:'Buy',   badge:'verified',   verified:true, views:980,  img:'images/hero-plot.png' },
  { id:7,  title:'2BHK Furnished Apartment',     location:'Gachibowli, Hyderabad',  city:'Hyderabad', price:35000,    priceDisplay:'₹35,000/mo',psf:'—',           area:'1,250 sqft', bhk:'2 BHK', type:'Apartment',        listing:'Rent',  badge:'rent',       verified:true, views:892,  img:'images/property-apartment.png' },
  { id:8,  title:'3BHK Semi-Furnished Flat',     location:'Madhapur, Hyderabad',    city:'Hyderabad', price:45000,    priceDisplay:'₹45,000/mo',psf:'—',           area:'1,680 sqft', bhk:'3 BHK', type:'Apartment',        listing:'Rent',  badge:'rent',       verified:true, views:1120, img:'images/property-apartment.png' },
  { id:9,  title:'Independent Villa (Rental)',    location:'Banjara Hills, Hyderabad',city:'Hyderabad',price:125000,   priceDisplay:'₹1.25L/mo', psf:'—',           area:'3,500 sqft', bhk:'4 BHK', type:'Villa',           listing:'Rent',  badge:'rent',       verified:true, views:670,  img:'images/property-villa.png' },
  { id:10, title:'3BHK Independent House',        location:'Hanamkonda, Warangal',   city:'Warangal',  price:6500000,  priceDisplay:'₹65 L',    psf:'₹3,611/sqft',  area:'1,800 sqft', bhk:'3 BHK', type:'Independent House',listing:'Buy',   badge:'verified',   verified:true, views:543,  img:'images/property-villa.png' },
  { id:11, title:'2BHK Apartment',                location:'Kazipet, Warangal',      city:'Warangal',  price:3800000,  priceDisplay:'₹38 L',    psf:'₹3,455/sqft',  area:'1,100 sqft', bhk:'2 BHK', type:'Apartment',        listing:'Buy',   badge:'verified',   verified:true, views:412,  img:'images/property-apartment.png' },
  { id:12, title:'3BHK Premium Apartment',        location:'Karimnagar Town',        city:'Karimnagar',price:4500000,  priceDisplay:'₹45 L',    psf:'₹3,750/sqft',  area:'1,200 sqft', bhk:'3 BHK', type:'Apartment',        listing:'Buy',   badge:'verified',   verified:true, views:328,  img:'images/property-apartment.png' },
  { id:13, title:'Open Plot — HMDA Layout',       location:'Nizamabad Town',         city:'Nizamabad', price:2800000,  priceDisplay:'₹28 L',    psf:'₹2,333/sqft',  area:'1,200 sqft', bhk:'Plot',  type:'Plot / Land',     listing:'Buy',   badge:'verified',   verified:true, views:291,  img:'images/hero-plot.png' },
  { id:14, title:'BuildMyHome™ — 3BHK Villa Plot',location:'Bachupally, Hyderabad',  city:'Hyderabad', price:0,        priceDisplay:'BuildMyHome™',psf:'₹2,499–₹4,499/sqft',area:'Custom', bhk:'Custom',type:'Villa',     listing:'Build', badge:'buildmyhome',verified:true, views:1830, img:'images/hero-construction.png' },
];

const TESTIMONIALS = [
  { stars:5, text:"Built my 2,400 sqft villa in Jubilee Hills while living in Dubai — I didn't visit India once. Weekly video updates kept me completely at peace. Every rupee accounted for.", name:'Rajesh Kumar', loc:'Dubai, UAE · Villa in Jubilee Hills', initials:'RK' },
  { stars:5, text:"After being cheated by a local contractor I found NRI Realtorz. Transparency was night and day — fixed pricing, legal support, PM who answered at 11pm my time.", name:'Sunita Patel', loc:'New Jersey, USA · House in Warangal', initials:'SP' },
  { stars:5, text:"The construction tracker dashboard is incredible. I watched my home's foundation poured from my London living room. Delivered on time, exactly as promised.", name:'Arun Mehta', loc:'London, UK · Villa in Kokapet', initials:'AM' },
  { stars:5, text:"Sold my Hyderabad property without a single trip to India. Legal paperwork, verified buyers, closed in 3 months. Absolutely recommend.", name:'Priya Sharma', loc:'Toronto, Canada · Sold in Banjara Hills', initials:'PS' },
  { stars:5, text:"Bought 3BHK in Kondapur. Virtual tours, title verification, NRI home loan — seamless from start to finish. Zero hidden charges.", name:'Ravi Reddy', loc:'Singapore · Apartment in Kondapur', initials:'RR' },
];

const FAQS = [
  { q:'Can NRIs buy any type of property in India?', a:'NRIs can legally purchase residential and commercial properties under FEMA guidelines. Agricultural land, plantation property, or farmhouses require special RBI permission. We assist with all compliances.' },
  { q:'How do I pay for a property from abroad?', a:'NRIs can pay via NRE/NRO bank accounts, foreign inward remittance, or NRI home loans (SBI, HDFC, ICICI). We assist with all payment processes and repatriation documentation.' },
  { q:'What documents does an NRI need to buy property?', a:'Valid passport, PAN Card, OCI/PIO Card (if applicable), NRE/NRO bank statements, overseas address proof, and property documents. Our legal team handles all verification.' },
  { q:'How does the BuildMyHome™ service work?', a:'Share your plot details and vision. We create plans, handle permits, manage contractors, send weekly HD video updates, do quality inspections, and hand over your completed home.' },
  { q:'What taxes does an NRI pay when selling property?', a:'Short-term capital gains (< 2 years) taxed at 30%. Long-term at 20% with indexation. Under DTAA, double taxation is avoided in most NRI countries. We provide full tax advisory.' },
  { q:'How long does it take to build a home?', a:'A 1,500–2,000 sqft home takes 12–18 months from permit to handover. Ultra Luxury homes: 18–24 months. We guarantee a delivery timeline before work begins.' },
];

/* ============================================================
   GLOBAL STATE
   ============================================================ */
let currentTab = 'build';  // active hero tab
let uploadedFiles = [];    // files staged for upload

/* ============================================================
   PAGE NAVIGATION  — Fixed routing
   ============================================================ */
const VALID_PAGES = ['home','properties','buildmyhome','services','about','contact'];

function showPage(pageId) {
  if (!VALID_PAGES.includes(pageId)) pageId = 'home';
  document.querySelectorAll('.page').forEach(el => el.classList.remove('active'));
  const page = document.getElementById('page-' + pageId);
  if (page) {
    page.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  document.querySelectorAll('[data-page]').forEach(a => {
    a.classList.toggle('active', a.dataset.page === pageId);
  });
  if (pageId === 'home') setTimeout(initReveal, 100);
}

function initNavigation() {
  // Delegate all [data-page] clicks at document level
  document.addEventListener('click', e => {
    const link = e.target.closest('[data-page]');
    if (!link) return;
    e.preventDefault();
    e.stopPropagation();
    const target = link.dataset.page;
    history.pushState({ page: target }, '', '#' + target);
    showPage(target);
  });

  window.addEventListener('popstate', e => {
    const hash = window.location.hash.replace('#', '') || 'home';
    showPage(hash);
  });

  // Initial route
  const initHash = window.location.hash.replace('#', '') || 'home';
  showPage(initHash);

  // Hamburger menu
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
  }
}

/* ============================================================
   HERO TAB SYSTEM — Build / Buy / Rent / Sell
   Fixed: tabs correctly switch modes, Sell+Rent show upload bar
   ============================================================ */
function initHeroTabs() {
  const tabs        = document.querySelectorAll('.search-tab');
  const searchBar   = document.getElementById('heroSearchBar');
  const uploadStrip = document.getElementById('heroUploadStrip');
  const buildStrip  = document.getElementById('heroBuildStrip');
  const searchBtn   = document.getElementById('heroSearchBtn');
  const searchInput = document.getElementById('heroSearchInput');

  function switchTab(type) {
    currentTab = type;

    // Update active state
    tabs.forEach(t => t.classList.toggle('active', t.dataset.type === type));

    // Reset all strips
    searchBar   && (searchBar.style.display   = 'none');
    uploadStrip && (uploadStrip.style.display = 'none');
    buildStrip  && (buildStrip.style.display  = 'none');

    if (type === 'build') {
      buildStrip && (buildStrip.style.display = 'flex');
    } else if (type === 'sell' || type === 'rent') {
      uploadStrip && (uploadStrip.style.display = 'flex');
      // Update label
      const label = document.getElementById('uploadStripLabel');
      if (label) {
        label.textContent = type === 'sell'
          ? '📤 Upload photos, videos & documents to list your property for SALE'
          : '🔑 Upload photos, videos & documents to list your property for RENT';
      }
      const uploadBtn = document.getElementById('uploadStripBtn');
      if (uploadBtn) {
        uploadBtn.textContent = type === 'sell' ? 'List for Sale →' : 'List for Rent →';
        uploadBtn.onclick = () => openUploadModal(type);
      }
    } else {
      // Buy
      searchBar && (searchBar.style.display = 'flex');
    }
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => switchTab(tab.dataset.type));
  });

  // Default: show build
  switchTab('build');

  // Search button
  searchBtn?.addEventListener('click', () => {
    if (currentTab === 'build') {
      history.pushState({ page: 'buildmyhome' }, '', '#buildmyhome');
      showPage('buildmyhome');
      return;
    }
    const q = (searchInput?.value || '').toLowerCase().trim();
    const listing = currentTab === 'buy' ? 'Buy' : 'Rent';
    const filtered = PROPERTIES.filter(p =>
      p.listing === listing &&
      (!q || p.title.toLowerCase().includes(q) || p.location.toLowerCase().includes(q))
    );
    history.pushState({ page: 'properties' }, '', '#properties');
    showPage('properties');
    renderProperties(filtered.length ? filtered : PROPERTIES.filter(p => p.listing === listing));
  });
}

/* ============================================================
   HERO CAROUSEL — 15 second rotation
   ============================================================ */
const heroLabels = ['🏡 Premium Villas', '🏢 Modern Apartments', '🏗️ Under Construction', '🌿 Open Plots'];
let heroIdx = 0;

function initHeroCarousel() {
  const bgs = document.querySelectorAll('.hero-bg');
  if (!bgs.length) return;
  function rotate() {
    bgs[heroIdx].classList.remove('hero-bg-active');
    heroIdx = (heroIdx + 1) % bgs.length;
    bgs[heroIdx].classList.add('hero-bg-active');
    const lbl = document.getElementById('heroSlideLabel');
    if (lbl) {
      lbl.style.opacity = '0';
      setTimeout(() => { lbl.textContent = heroLabels[heroIdx]; lbl.style.opacity = '1'; }, 350);
    }
  }
  setInterval(rotate, 15000);
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
   STAT COUNTERS
   ============================================================ */
function initStatCounters() {
  const els = document.querySelectorAll('.hero-stat-value[data-count]');
  if (!els.length) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const target = +e.target.dataset.count;
      const t0 = Date.now();
      const tick = () => {
        const prog = Math.min((Date.now() - t0) / 2000, 1);
        const val = Math.floor((1 - Math.pow(1 - prog, 3)) * target);
        e.target.textContent = val.toLocaleString('en-IN') + '+';
        if (prog < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      io.unobserve(e.target);
    });
  }, { threshold: 0.6 });
  els.forEach(el => io.observe(el));
}

/* ============================================================
   PRICE TRENDS GRID
   ============================================================ */
function renderPriceTrends() {
  const grid = document.getElementById('priceTrendsGrid');
  if (!grid) return;
  grid.innerHTML = TELANGANA_PRICE_TRENDS.map(t => `
    <div class="price-trend-card" tabindex="0" onclick="filterAndGo('${t.city}')" onkeypress="if(event.key==='Enter')filterAndGo('${t.city}')">
      <div class="ptc-city">${t.city}</div>
      <div class="ptc-locality">${t.locality}</div>
      <div class="ptc-price">${t.avgPrice}</div>
      <div class="ptc-psf">${t.psf} per sq ft</div>
      <div class="ptc-trend ${t.trend}">
        ${t.trend === 'up' ? '↑' : '↓'} ${t.change} <span style="font-weight:400;opacity:0.7">YoY · ${t.type}</span>
      </div>
    </div>`).join('');
}

function filterAndGo(city) {
  history.pushState({ page: 'properties' }, '', '#properties');
  showPage('properties');
  const sel = document.getElementById('filterCity');
  if (sel) { sel.value = city; renderProperties(getFilteredProperties()); }
}

/* ============================================================
   CITIES GRID
   ============================================================ */
function renderCities() {
  const grid = document.getElementById('citiesGrid');
  if (!grid) return;
  grid.innerHTML = TELANGANA_CITIES.map(c => `
    <div class="city-card" onclick="filterAndGo('${c.name}')">
      <div class="city-flag">${c.emoji}</div>
      <div class="city-name">${c.name}</div>
      <div class="city-count">${c.count} Properties</div>
      <div class="city-price">${c.priceRange}</div>
    </div>`).join('');
}

/* ============================================================
   PROPERTY CARDS
   ============================================================ */
function propertyCardHTML(p) {
  const badges = { featured:'featured', buildmyhome:'buildmyhome', rent:'rent', sell:'sell', verified:'verified' };
  const badgeLabel = { featured:'⭐ Featured', buildmyhome:'BuildMyHome™', rent:'🔑 Rent', sell:'💰 For Sale', verified:'✓ Verified' };
  return `
    <div class="prop-card" data-id="${p.id}">
      <div class="prop-card-img">
        <img src="${p.img}" alt="${p.title}" loading="lazy" onerror="this.parentElement.style.background='linear-gradient(135deg,#1a2a4a,#2a4a6c)'">
        <span class="prop-badge ${badges[p.badge]||'verified'}">${badgeLabel[p.badge]||'✓ Verified'}</span>
        <div class="prop-wishlist" onclick="toggleWishlist(this)" title="Save">🤍</div>
      </div>
      <div class="prop-card-body">
        <div class="prop-price">${p.priceDisplay} <span class="prop-price-sub">${p.psf !== '—' ? p.psf : ''}</span></div>
        <div class="prop-title">${p.title}</div>
        <div class="prop-location">${p.location}</div>
        <div class="prop-meta">
          <div class="prop-meta-item"><span class="prop-meta-icon">📐</span>${p.area}</div>
          <div class="prop-meta-item"><span class="prop-meta-icon">🛏️</span>${p.bhk}</div>
          <div class="prop-meta-item"><span class="prop-meta-icon">👁️</span>${p.views.toLocaleString('en-IN')}</div>
        </div>
        <div class="prop-actions">
          <a class="btn-tour" href="#contact" data-page="contact">📹 Virtual Tour</a>
          <a class="btn-contact" href="#contact" data-page="contact">📞 Contact</a>
        </div>
      </div>
    </div>`;
}

function renderProperties(props, containerId = 'allPropertiesGrid') {
  const grid = document.getElementById(containerId);
  if (!grid) return;
  const noResults = document.getElementById('noResults');
  if (!props.length) {
    grid.innerHTML = '';
    if (noResults) noResults.style.display = 'block';
    return;
  }
  if (noResults) noResults.style.display = 'none';
  grid.innerHTML = props.map(propertyCardHTML).join('');
}

function renderFeatured() {
  renderProperties(PROPERTIES.filter(p => ['featured','buildmyhome'].includes(p.badge)).slice(0, 3), 'featuredPropertiesGrid');
}

function getFilteredProperties() {
  const listing = document.getElementById('filterListing')?.value || '';
  const city    = document.getElementById('filterCity')?.value    || '';
  const type    = document.getElementById('filterType')?.value    || '';
  const budget  = document.getElementById('filterBudget')?.value  || '';
  return PROPERTIES.filter(p => {
    if (listing && p.listing !== listing) return false;
    if (city    && p.city    !== city)    return false;
    if (type    && p.type    !== type)    return false;
    if (budget) {
      const [min, max] = budget.split('-').map(Number);
      if (p.price < min || p.price > max) return false;
    }
    return true;
  });
}

function initFilters() {
  const citySelect = document.getElementById('filterCity');
  if (citySelect) {
    TELANGANA_CITIES.forEach(c => {
      const o = new Option(c.name, c.name);
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
  showToast(el.classList.contains('active') ? '❤️ Saved to wishlist' : 'Removed from wishlist');
}

/* ============================================================
   UPLOAD MODAL — Full listing form with Supabase save
   ============================================================ */
function openUploadModal(listingType = 'sell') {
  const modal = document.getElementById('uploadModal');
  if (!modal) return;
  const title = document.getElementById('uploadModalTitle');
  const sub   = document.getElementById('uploadModalSub');
  const sel   = document.getElementById('modalListingType');
  const lbl   = document.getElementById('priceLabel');

  if (listingType === 'rent') {
    if (title) title.textContent = 'List Your Property for Rent';
    if (sub)   sub.textContent   = 'Reach 50,000+ NRI tenants — upload photos & details';
    if (sel)   sel.value = 'rent';
    if (lbl)   lbl.textContent = 'Monthly Rent (₹) *';
  } else {
    if (title) title.textContent = 'List Your Property for Sale';
    if (sub)   sub.textContent   = 'Reach 50,000+ NRI buyers — upload photos & details';
    if (sel)   sel.value = 'sell';
    if (lbl)   lbl.textContent = 'Asking Price (₹) *';
  }

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  uploadedFiles = [];
  const prev = document.getElementById('uploadPreviews');
  if (prev) prev.innerHTML = '';
}

function closeUploadModal() {
  const modal = document.getElementById('uploadModal');
  if (modal) modal.classList.remove('open');
  document.body.style.overflow = '';
}

window.handleFiles = function(files) {
  const previews = document.getElementById('uploadPreviews');
  const allowed  = ['image/jpeg','image/png','image/webp','image/gif','video/mp4','video/quicktime','application/pdf'];
  const maxSize  = 50 * 1024 * 1024;

  Array.from(files).forEach(file => {
    if (!allowed.includes(file.type)) { showToast('❌ Format not allowed: ' + file.name); return; }
    if (file.size > maxSize)          { showToast('❌ File too large (max 50MB): ' + file.name); return; }
    if (uploadedFiles.length >= 20)   { showToast('❌ Maximum 20 files allowed'); return; }

    uploadedFiles.push(file);
    const wrap = document.createElement('div');
    wrap.className = 'upload-preview-wrap';
    const idx = uploadedFiles.length - 1;

    let thumb;
    if (file.type.startsWith('image/')) {
      thumb = document.createElement('img');
      thumb.className = 'upload-preview';
      thumb.src = URL.createObjectURL(file);
      thumb.alt = file.name;
    } else if (file.type.startsWith('video/')) {
      thumb = document.createElement('div');
      thumb.style.cssText = 'width:80px;height:80px;border-radius:8px;background:#1a2a4a;display:flex;align-items:center;justify-content:center;font-size:2rem;border:2px solid var(--border)';
      thumb.textContent = '🎬';
    } else {
      thumb = document.createElement('div');
      thumb.style.cssText = 'width:80px;height:80px;border-radius:8px;background:#f3f4f6;display:flex;align-items:center;justify-content:center;font-size:2rem;border:2px solid var(--border)';
      thumb.textContent = '📄';
    }
    wrap.appendChild(thumb);

    const rm = document.createElement('div');
    rm.className = 'remove-btn';
    rm.textContent = '✕';
    rm.onclick = () => { uploadedFiles.splice(idx, 1); wrap.remove(); };
    wrap.appendChild(rm);
    previews?.appendChild(wrap);
  });

  showToast(`✅ ${uploadedFiles.length} file(s) ready to upload`);
};

window.submitListing = async function() {
  const inputs = document.querySelectorAll('#listingForm input[required], #listingForm select[required]');
  let valid = true;
  inputs.forEach(inp => {
    if (!inp.value.trim()) { inp.style.borderColor = '#ef4444'; valid = false; }
    else inp.style.borderColor = '';
  });
  if (!valid) { showToast('⚠️ Please fill all required fields'); return; }
  if (uploadedFiles.length === 0) { showToast('⚠️ Please upload at least one photo'); return; }

  const btn = document.querySelector('#uploadModal .modal-footer .btn-accent');
  if (btn) { btn.textContent = 'Submitting...'; btn.style.opacity = '0.7'; }

  // Build listing object
  const form = document.getElementById('listingForm');
  const inp  = (id) => form.querySelector('#' + id)?.value?.trim() || '';
  const formInputs = form.querySelectorAll('input, select, textarea');

  const listing = {
    title:        formInputs[0]?.value || '',
    listing_type: document.getElementById('modalListingType')?.value || 'sell',
    property_type:formInputs[2]?.value || '',
    city:         formInputs[3]?.value || '',
    locality:     formInputs[4]?.value || '',
    price:        formInputs[5]?.value || '',
    area_sqft:    formInputs[6]?.value || '',
    bhk:          formInputs[7]?.value || '',
    description:  formInputs[8]?.value || '',
    contact:      formInputs[9]?.value || '',
    file_count:   uploadedFiles.length,
    file_names:   uploadedFiles.map(f => f.name).join(', '),
    status:       'pending_review',
    created_at:   new Date().toISOString(),
  };

  // Save to Supabase (falls back to localStorage if not configured)
  const result = await db.insert('listings', listing);

  if (btn) { btn.textContent = 'Submit Listing →'; btn.style.opacity = '1'; }

  if (result.ok) {
    const msg = result.offline
      ? '✅ Listing saved locally! (Supabase integration pending setup)'
      : '🎉 Listing submitted! Our team will publish it within 24 hours.';
    showToast(msg, 4000);
    closeUploadModal();
    form.reset();
    uploadedFiles = [];
    const prev = document.getElementById('uploadPreviews');
    if (prev) prev.innerHTML = '';
  } else {
    showToast('❌ Submission failed. Please try again or call us: +91 9052201333');
  }
};

// Drag & Drop
function initDragDrop() {
  const zone = document.getElementById('uploadZone');
  if (!zone) return;
  ['dragover','dragenter'].forEach(ev => zone.addEventListener(ev, e => { e.preventDefault(); zone.classList.add('dragover'); }));
  ['dragleave','drop'].forEach(ev => zone.addEventListener(ev, () => zone.classList.remove('dragover')));
  zone.addEventListener('drop', e => { e.preventDefault(); handleFiles(e.dataTransfer.files); });
}

/* ============================================================
   ESCAPE KEY closes modal
   ============================================================ */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeUploadModal();
});
document.getElementById('uploadModal')?.addEventListener('click', e => {
  if (e.target === e.currentTarget) closeUploadModal();
});

/* ============================================================
   TESTIMONIALS
   ============================================================ */
function renderTestimonials() {
  const track = document.getElementById('testimonialsTrack');
  const dots  = document.getElementById('testimonialDots');
  if (!track) return;

  track.innerHTML = TESTIMONIALS.map(t => `
    <div class="testimonial-card">
      <div class="testimonial-stars">${'★'.repeat(t.stars)}</div>
      <p class="testimonial-text">"${t.text}"</p>
      <div class="testimonial-author">
        <div class="author-avatar">${t.initials}</div>
        <div><div class="author-name">${t.name}</div><div class="author-loc">${t.loc}</div></div>
      </div>
    </div>`).join('');

  let cur = 0;
  const total = TESTIMONIALS.length;
  const perView = window.innerWidth < 768 ? 1 : 3;
  const maxStep = Math.max(0, total - perView);

  if (dots) {
    dots.innerHTML = Array.from({ length: maxStep + 1 }, (_, i) =>
      `<div class="testimonial-dot${i===0?' active':''}" onclick="goToSlide(${i})"></div>`
    ).join('');
  }

  window.goToSlide = function(idx) {
    cur = Math.min(idx, maxStep);
    const pct = 100 / perView;
    track.style.transform = `translateX(-${cur * pct}%)`;
    document.querySelectorAll('.testimonial-dot').forEach((d, i) => d.classList.toggle('active', i === cur));
  };

  setInterval(() => window.goToSlide((cur + 1) > maxStep ? 0 : cur + 1), 5000);
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
      document.getElementById('service-' + tab.dataset.service)?.classList.add('active');
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
    </div>`).join('');
}
window.toggleFAQ = i => document.getElementById('faq' + i)?.classList.toggle('open');

/* ============================================================
   CONTACT FORM — Save to Supabase
   ============================================================ */
function initContactForm() {
  document.getElementById('contactForm')?.addEventListener('submit', async e => {
    e.preventDefault();
    const name  = document.getElementById('contactName')?.value?.trim();
    const email = document.getElementById('contactEmail')?.value?.trim();
    const phone = document.getElementById('contactPhone')?.value?.trim();
    if (!name || !email || !phone) { showToast('⚠️ Please fill all required fields'); return; }

    const btn = e.target.querySelector('button[type=submit]');
    if (btn) { btn.textContent = 'Sending...'; btn.disabled = true; }

    const result = await db.insert('enquiries', {
      name, email, phone,
      country:  document.getElementById('contactCountry')?.value,
      interest: document.getElementById('contactInterest')?.value,
      city:     document.getElementById('contactCity')?.value,
      message:  document.getElementById('contactMessage')?.value,
      created_at: new Date().toISOString()
    });

    if (btn) { btn.textContent = 'Send Inquiry →'; btn.disabled = false; }
    showToast(`✅ Thank you ${name}! We'll contact you within 2 hours.`);
    e.target.reset();
  });
}

/* ============================================================
   CHATBOT
   ============================================================ */
const CHAT_KB = {
  build:    "Our **BuildMyHome™** service is our #1 priority for NRIs 🏗️\n\n• Fixed pricing: ₹2,499–₹4,499/sqft\n• Weekly HD video updates from site\n• GHMC permits managed by us\n• On-time delivery guaranteed\n\n📞 +91 9052201333",
  buy:      "We have **500+ verified Telangana properties** 🏠\n\n• 100% RERA verified\n• Virtual tours from abroad\n• NRI home loan: SBI/HDFC/ICICI\n• Zero brokerage\n\n📞 +91 9052201333",
  rent:     "**Rental properties** across Hyderabad, Warangal & more 🔑\n\n• 2BHK from ₹25,000/mo\n• 3BHK from ₹40,000/mo\n• Villas from ₹80,000/mo\n\n📞 +91 9052201333",
  sell:     "**Sell your property** without leaving abroad 💰\n\nClick 'List Property' in the navbar, or select 'Sell / Upload' tab in the search bar to upload photos & videos.\n\nFree listing · Reach 50,000+ NRIs!",
  price:    "**Telangana 2025 Market Rates** 📊\n\n📍 Gachibowli: ₹8,500–₹12,000/sqft\n📍 Jubilee Hills: ₹15,000–₹28,000/sqft\n📍 Kokapet: ₹9,500–₹14,000/sqft\n📍 Kondapur: ₹7,500–₹11,000/sqft\n📍 Warangal: ₹2,800–₹5,500/sqft",
  interior: "**Interior Design Packages** 🛋️\n\n• Villa: Starting ₹790/sqft\n• Apartment: Starting ₹590/sqft\n• Independent House: Starting ₹690/sqft\n• Smart Automation: Starting ₹1.45L\n\n5–10% below competitor pricing!",
  legal:    "**Legal & Tax Advisory** ⚖️\n\n• DTAA benefits (90+ countries)\n• FEMA repatriation guidance\n• Power of Attorney support\n• GHMC permits & RERA compliance\n\n📞 +91 9052201333",
  upload:   "To **list your property** 📤\n\n1. Click the 'Sell/Upload' tab in the hero search\n2. OR click '+ List Property' in the navbar\n3. Fill details, upload photos/videos/documents\n4. We'll review and publish within 24 hours!",
  contact:  "📞 **+91 90522 01333**\n📧 amarender.gade@gmail.com\n💬 WhatsApp: wa.me/919052201333\n\n✅ Available Mon–Sat, 9 AM – 8 PM IST\n✅ Response within 2 hours",
};

function getChatResponse(msg) {
  const m = msg.toLowerCase();
  if (m.match(/build|construct|buildmyhome/))    return CHAT_KB.build;
  if (m.match(/buy|purchase|invest/))             return CHAT_KB.buy;
  if (m.match(/rent|lease|tenant/))               return CHAT_KB.rent;
  if (m.match(/sell|sale|list/))                  return CHAT_KB.sell;
  if (m.match(/price|rate|cost|sqft|value/))      return CHAT_KB.price;
  if (m.match(/interior|design|autom|smart/))     return CHAT_KB.interior;
  if (m.match(/legal|tax|rera|permit|dtaa|fema/)) return CHAT_KB.legal;
  if (m.match(/upload|photo|video|document/))     return CHAT_KB.upload;
  if (m.match(/contact|call|phone|whatsapp/))     return CHAT_KB.contact;
  return "Great question! 😊 For personalized help:\n\n📞 **+91 9052201333**\n💬 WhatsApp: wa.me/919052201333\n\nYou can also ask me about:\n**build · buy · sell · rent · price · interior · legal · upload**";
}

window.toggleChat = function() {
  const c = document.getElementById('chatbot');
  if (!c) return;
  const isOpen = c.style.display === 'flex';
  c.style.display = isOpen ? 'none' : 'flex';
  if (!isOpen) document.getElementById('chatInput')?.focus();
};

window.sendChat = function() {
  const input = document.getElementById('chatInput');
  const msgs  = document.getElementById('chatMsgs');
  const msg   = input?.value?.trim();
  if (!msg || !msgs) return;

  msgs.innerHTML += `<div class="chat-msg user-msg">${msg.replace(/</g,'&lt;')}</div>`;
  input.value = '';
  msgs.scrollTop = msgs.scrollHeight;

  const typing = document.createElement('div');
  typing.className = 'chat-msg bot-msg';
  typing.innerHTML = '<em style="opacity:0.55">Typing...</em>';
  msgs.appendChild(typing);
  msgs.scrollTop = msgs.scrollHeight;

  setTimeout(() => {
    typing.innerHTML = getChatResponse(msg).replace(/\n/g,'<br>').replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>');
    msgs.scrollTop = msgs.scrollHeight;
  }, 800);
};

/* ============================================================
   TOAST
   ============================================================ */
window.showToast = function(msg, dur = 3500) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), dur);
};

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
function initReveal() {
  const els = document.querySelectorAll('.reveal:not(.visible), .reveal-left:not(.visible)');
  if (!els.length) return;
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
  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 60), { passive: true });
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
  if (!loader) return;
  loader.style.opacity = '0';
  setTimeout(() => loader.classList.add('hidden'), 500);
}

/* ============================================================
   HERO CLIP BAR — Sell/Rent inline file handler
   ============================================================ */
window.handleHeroClip = function(files) {
  const previews = document.getElementById('heroClipPreviews');
  if (!previews) return;
  const allowed = ['image/jpeg','image/png','image/webp','video/mp4','video/quicktime','application/pdf'];
  const maxSize = 50 * 1024 * 1024;
  let added = 0;

  Array.from(files).forEach(file => {
    if (!allowed.includes(file.type)) { showToast('❌ Format not allowed: ' + file.name); return; }
    if (file.size > maxSize) { showToast('❌ File too large (max 50MB)'); return; }

    uploadedFiles.push(file);
    added++;

    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative;display:inline-block';

    let thumb;
    if (file.type.startsWith('image/')) {
      thumb = document.createElement('img');
      thumb.src = URL.createObjectURL(file);
      thumb.style.cssText = 'width:44px;height:44px;border-radius:8px;object-fit:cover;border:2px solid #C8A96E';
    } else if (file.type.startsWith('video/')) {
      thumb = document.createElement('div');
      thumb.style.cssText = 'width:44px;height:44px;border-radius:8px;background:#1a2a4a;display:flex;align-items:center;justify-content:center;font-size:1.3rem;border:2px solid #A8894E';
      thumb.textContent = '🎬';
    } else {
      thumb = document.createElement('div');
      thumb.style.cssText = 'width:44px;height:44px;border-radius:8px;background:#f3f4f6;display:flex;align-items:center;justify-content:center;font-size:1.3rem;border:2px solid #9CA3AF';
      thumb.textContent = '📄';
    }
    const rm = document.createElement('span');
    rm.textContent = '✕';
    rm.style.cssText = 'position:absolute;top:-5px;right:-5px;background:#ef4444;color:#fff;border-radius:50%;width:16px;height:16px;font-size:0.6rem;display:flex;align-items:center;justify-content:center;cursor:pointer;line-height:1';
    rm.onclick = () => { wrap.remove(); };

    wrap.appendChild(thumb);
    wrap.appendChild(rm);
    previews.appendChild(wrap);
  });

  if (added > 0) {
    showToast(`✅ ${added} file(s) clipped — click "List for Sale/Rent" to submit`);
  }
};

/* ============================================================
   GLOBAL WINDOW FUNCTIONS (called inline from HTML)
   ============================================================ */
window.openUploadModal  = openUploadModal;
window.closeUploadModal = closeUploadModal;
window.filterAndGo      = filterAndGo;

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initHeroCarousel();
  initParticles();
  initStatCounters();
  initHeroTabs();        // ← Fixed tab system
  renderPriceTrends();
  renderCities();
  renderFeatured();
  renderTestimonials();
  renderFAQs();
  initFilters();
  initServicesTabs();
  initContactForm();
  initDragDrop();
  initNavScroll();
  initBackToTop();
  initReveal();

  setTimeout(hideLoader, 700);
  setTimeout(initReveal, 900);
});
