/**
 * PINTARKITA - Main Application Controller
 * Layanan dari PT. AKADEMI PROFESIONAL INDONESIA (AKAPRO)
 * Handles SPA navigation, dynamic landing page generation,
 * interactive tabs, WhatsApp direct messaging, and modals.
 */

class PintarKitaApp {
  constructor() {
    this.currentView = 'beranda';
    this.adminPhone = '6285726112001';
    this.picName = 'Mukhsin Hadi, SE, M.Si';
    // Cached DOM references for fast access
    this._domCache = {};
    // Simulator dispatcher map (replaces if-else chain)
    this._simMap = {
      'unit-cost-calc': 'renderUnitCostCalc',
      'jp-calculator': 'renderJpCalculator',
      'risk-matrix': 'renderRiskMatrix',
      'survey-demo': 'renderSurveyDemo',
      'clinic-billing': 'renderClinicBilling',
      'mmpi-simulator': 'renderMmpiSimulator'
    };
  }

  /** Cache a DOM element by id; only queries once */
  $(id) {
    if (!this._domCache[id]) {
      this._domCache[id] = document.getElementById(id);
    }
    return this._domCache[id];
  }

  /** Invalidate a cached element (after innerHTML replace) */
  $flush(id) {
    delete this._domCache[id];
  }

  init() {
    this.activeGalleryIndex = 0;
    this.currentGalleryFilter = 'all';
    this.setupNavigation();
    this.setupProductCards();
    this.setupAppDropdown();
    this.renderArticles();
    this.renderProfile();
    this.renderPartnersMarquee();
    this.renderGallery('all');
    this.renderBerandaGalleryPreview();
    this.setupGalleryLightbox();
    this.setupBookSlider();
    this.setupArticleReader();
    this.setupPrintCertificate();

    // Check URL hash for direct links (e.g., #pintar-uc, #pelatihan, #galeri)
    this.handleHashChange();
    window.addEventListener('hashchange', () => this.handleHashChange());

    // Initialize subsystems after a microtask to keep main thread responsive
    requestAnimationFrame(() => {
      if (window.PintarLms) window.PintarLms.init();
    });
  }

  handleHashChange() {
    const hash = window.location.hash.replace('#', '').trim();
    if (!hash) {
      this.switchView('beranda');
      return;
    }

    if (['beranda', 'pelatihan', 'artikel', 'profil', 'galeri'].includes(hash)) {
      this.switchView(hash);
    } else if (PINTAR_DATA.products[hash]) {
      this.openProductLanding(hash);
    }
  }

  setupNavigation() {
    // Bottom nav bar items
    document.querySelectorAll('.bottom-nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        const view = item.dataset.view;
        if (view === 'whatsapp') {
          // Direct open to WhatsApp Chat Admin
          window.open(`https://wa.me/${this.adminPhone}?text=Halo%20Admin%20PINTARKITA%20(PT.%20Akademi%20Profesional%20Indonesia),%20saya%20ingin%20berkonsultasi%20mengenai%20solusi%20aplikasi%20dan%20bimtek%20manajemen%20rumah%20sakit.`, '_blank');
          return;
        }
        if (view === 'aplikasi-sheet') {
          // Open Mobile Application Bottom Sheet
          const sheet = document.getElementById('mobile-app-modal');
          if (sheet) sheet.classList.add('open');
          return;
        }
        if (view) {
          window.location.hash = view;
          this.switchView(view);
        }
      });
    });

    // Close mobile app modal
    const closeAppModalBtn = document.getElementById('close-mobile-app-modal');
    if (closeAppModalBtn) {
      closeAppModalBtn.addEventListener('click', () => {
        document.getElementById('mobile-app-modal').classList.remove('open');
      });
    }

    // Top desktop nav items
    document.querySelectorAll('.top-nav-link[data-view]').forEach(link => {
      link.addEventListener('click', (e) => {
        const view = link.dataset.view;
        if (view) {
          window.location.hash = view;
          this.switchView(view);
        }
      });
    });

    // Brand logo clicks return to home
    const brandLogos = document.querySelectorAll('.brand-home-link');
    brandLogos.forEach(logo => {
      logo.addEventListener('click', () => {
        window.location.hash = 'beranda';
        this.switchView('beranda');
      });
    });

    // Back to home buttons on landing pages
    document.querySelectorAll('.back-to-home-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        window.location.hash = 'beranda';
        this.switchView('beranda');
      });
    });

    // "Lihat Seluruh Galeri Foto" button on Beranda
    const seeAllGalleryBtn = document.getElementById('btn-see-all-gallery');
    if (seeAllGalleryBtn) {
      seeAllGalleryBtn.addEventListener('click', () => {
        window.location.hash = 'galeri';
        this.switchView('galeri');
      });
    }
  }

  switchView(viewName) {
    if (this.currentView === viewName && document.querySelector(`#view-${viewName}.active`)) return;
    this.currentView = viewName;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Batch DOM reads/writes in a single rAF for jank-free transition
    requestAnimationFrame(() => {
      // Hide all view containers in one pass
      const views = document.querySelectorAll('.view-container');
      for (let i = 0, len = views.length; i < len; i++) {
        views[i].classList.remove('active');
      }

      // Show target container
      const target = this.$(`view-${viewName}`) || document.getElementById(`view-${viewName}`);
      if (target) target.classList.add('active');

      // Update bottom nav active state in one pass
      const navItems = document.querySelectorAll('.bottom-nav-item');
      for (let i = 0, len = navItems.length; i < len; i++) {
        navItems[i].classList.toggle('active', navItems[i].dataset.view === viewName);
      }

      // Update desktop nav
      const topLinks = document.querySelectorAll('.top-nav-link');
      for (let i = 0, len = topLinks.length; i < len; i++) {
        topLinks[i].classList.toggle('active', topLinks[i].dataset.view === viewName);
      }
    });
  }

  setupProductCards() {
    // When clicking any product menu icon on Beranda
    document.querySelectorAll('.product-menu-item').forEach(item => {
      item.addEventListener('click', () => {
        const prodId = item.dataset.product;
        if (prodId) {
          window.location.hash = prodId;
          this.openProductLanding(prodId);
        }
      });
    });
  }

  openProductLanding(prodId) {
    const prod = PINTAR_DATA.products[prodId];
    if (!prod) return;

    this.currentView = `landing-${prodId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Hide other views
    document.querySelectorAll('.view-container').forEach(c => {
      c.classList.remove('active');
    });

    const landingContainer = document.getElementById('view-landing-page');
    if (!landingContainer) return;

    landingContainer.innerHTML = this.buildLandingPageHTML(prod);
    landingContainer.classList.add('active');

    // Deselect bottom nav active states
    document.querySelectorAll('.bottom-nav-item').forEach(item => {
      item.classList.remove('active');
    });

    // Attach back button
    landingContainer.querySelector('.btn-back-home').addEventListener('click', () => {
      window.location.hash = 'beranda';
      this.switchView('beranda');
    });

    // Smooth scroll with sticky navbar offset for simulator action buttons
    landingContainer.querySelectorAll('a[href="#simulator-section"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const simSection = document.getElementById('simulator-section');
        if (simSection) {
          const topOffset = simSection.getBoundingClientRect().top + window.pageYOffset - 85;
          window.scrollTo({ top: topOffset, behavior: 'smooth' });
        }
      });
    });

    // Initialize simulator for this product
    // Dispatch simulator via lookup map (O(1) instead of if-else chain)
    if (prod.interactiveDemoType && this._simMap[prod.interactiveDemoType]) {
      // Defer simulator rendering to next frame for faster initial paint
      requestAnimationFrame(() => {
        const method = this._simMap[prod.interactiveDemoType];
        if (PINTAR_SIMULATORS[method]) {
          PINTAR_SIMULATORS[method]('landing-sim-slot');
        }
      });
    }
  }

  buildLandingPageHTML(p) {
    const waText = encodeURIComponent(`Halo Admin PINTARKITA (PT. Akademi Profesional Indonesia), kami dari Rumah Sakit / Fasyankes tertarik untuk jadwalkan demo dan konsultasi aplikasi ${p.name} (${p.fullName}). Mohon informasi lebih lanjut.`);
    const waLink = `https://wa.me/${this.adminPhone}?text=${waText}`;

    return `
      <div class="landing-page-wrap">
        <!-- Sticky Sub-Nav Header -->
        <div class="landing-sticky-nav glass-panel">
          <div class="container d-flex align-items-center justify-content-between">
            <button class="btn btn-sm btn-outline-primary btn-back-home">
              <i class="fas fa-arrow-left"></i> Kembali ke Beranda
            </button>
            <div class="d-flex align-items-center gap-2">
              <img src="${p.icon}" alt="${p.name}" class="landing-mini-icon">
              <div>
                <strong class="text-primary">${p.name}</strong>
                ${p.hakiNo ? `<small class="d-block text-muted" style="font-size: 0.65rem;">${p.hakiNo}</small>` : ''}
              </div>
            </div>
            <div class="d-flex align-items-center gap-2">
              <a href="#simulator-section" class="btn btn-sm btn-outline-primary">
                <i class="fas fa-play-circle"></i> Uji Coba
              </a>
              <a href="${waLink}" target="_blank" class="btn btn-sm btn-success">
                <i class="fas fa-headset"></i> Chat Admin
              </a>
            </div>
          </div>
        </div>

        <!-- Hero Section: Clean Enterprise Header -->
        <section class="landing-hero">
          <div class="container text-center">
            <div class="landing-hero-head-wrap mx-auto" style="max-width: 860px;">
              <div class="d-inline-flex align-items-center gap-2 mb-3 flex-wrap justify-content-center">
                <span class="product-badge-pill">${p.badge}</span>
                <span class="badge badge-primary font-semibold">PT. AKADEMI PROFESIONAL INDONESIA</span>
              </div>
              <h1 class="landing-hero-title mb-3">${p.fullName}</h1>
              ${p.tagline ? `<p class="landing-hero-subtitle text-primary font-semibold mb-3">${p.tagline}</p>` : ''}
              <p class="landing-summary-p mx-auto text-muted mb-4" style="max-width: 780px;">${p.summary}</p>

              ${(p.stat1 && p.stat1.value) ? `
              <div class="landing-stats-row justify-content-center mb-4">
                <div class="stat-box glass-panel">
                  <h3>${p.stat1.value}</h3>
                  <p>${p.stat1.label}</p>
                </div>
                ${p.stat2 ? `
                <div class="stat-box glass-panel">
                  <h3>${p.stat2.value}</h3>
                  <p>${p.stat2.label}</p>
                </div>` : ''}
                ${p.stat3 ? `
                <div class="stat-box glass-panel">
                  <h3>${p.stat3.value}</h3>
                  <p>${p.stat3.label}</p>
                </div>` : ''}
              </div>` : ''}

              <div class="landing-cta-buttons justify-content-center gap-3">
                <a href="#simulator-section" class="btn btn-primary btn-lg font-bold">
                  <i class="fas fa-play-circle"></i> Uji Coba
                </a>
                <a href="${waLink}" target="_blank" class="btn btn-success btn-lg pulse-glow font-bold">
                  <i class="fas fa-headset"></i> Chat Admin
                </a>
              </div>

              <div class="compliance-row mt-4 justify-content-center">
                <small class="text-muted"><i class="fas fa-shield-alt text-primary"></i> Kepatuhan Regulasi & Standar:</small>
                <div class="d-flex flex-wrap gap-2 mt-1 justify-content-center">
                  ${p.compliance.map(c => `<span class="badge badge-light-blue font-semibold">${c}</span>`).join('')}
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Dedicated Full Poster Showcase -->
        <section class="landing-section bg-soft-alt">
          <div class="container">
            <div class="section-title-wrap text-center mb-4">
              <span class="subtitle-tag">Poster Infografis & Arsitektur</span>
              <h2>Poster Resmi & Arsitektur Solusi ${p.name}</h2>
              <p class="text-muted">Pelajari arsitektur sistem, struktur alur implementasi, dan kerangka regulasi fasyankes secara menyeluruh.</p>
            </div>

            <div class="poster-featured-wrap">
              <div class="poster-showcase-card glass-panel">
                <div class="poster-showcase-bar d-flex justify-content-between align-items-center flex-wrap gap-2 p-3 border-bottom">
                  <div class="d-flex align-items-center gap-2">
                    <img src="${p.icon}" alt="${p.name}" style="width: 28px; height: 28px; object-fit: contain;">
                    <strong class="text-dark font-bold">${p.name} • Infografis Resmi PT. AKAPRO</strong>
                  </div>
                  <div class="d-flex align-items-center gap-2">
                    <span class="badge badge-primary-soft font-semibold"><i class="fas fa-shield-alt"></i> HAKI Terdaftar Kemenkumham RI</span>
                    <button type="button" class="btn btn-sm btn-outline-primary" onclick="window.PintarKita.openImageLightbox('${p.heroImage}', 'Poster Resmi ${p.name} - PT. Akademi Profesional Indonesia')">
                      <i class="fas fa-expand"></i> Buka Layar Penuh
                    </button>
                  </div>
                </div>

                <div class="poster-image-stage" onclick="window.PintarKita.openImageLightbox('${p.heroImage}', 'Poster Resmi ${p.name} - PT. Akademi Profesional Indonesia')" title="Klik untuk memperbesar gambar">
                  <img src="${p.heroImage}" alt="Poster Infografis ${p.name}" class="poster-full-img">
                  <div class="poster-zoom-floating-badge">
                    <i class="fas fa-search-plus"></i> Klik untuk Memperbesar Gambar
                  </div>
                </div>

                <div class="poster-showcase-footer p-3 d-flex justify-content-between align-items-center flex-wrap gap-2 text-muted font-sm">
                  <span><i class="fas fa-certificate text-primary"></i> Standar Implementasi Resmi Fasyankes PT. Akademi Profesional Indonesia</span>
                  <span><i class="fas fa-lock text-success"></i> Dilindungi Hak Kekayaan Intelektual Republik Indonesia</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Dampak Kritis Tanpa Sistem (Copywriting Provokatif Formal) -->
        <section class="landing-section landing-dampak-section">
          <div class="container">
            <div class="section-title-wrap text-center mb-4">
              <span class="subtitle-tag subtitle-danger"><i class="fas fa-exclamation-triangle"></i> Analisis Risiko & Konsekuensi</span>
              <h2>${p.dampakTitle || 'Dampak Kritis Tanpa Sistem Terstandar'}</h2>
              <p class="dampak-statement-lead">${p.dampakStatement || p.problemStatement}</p>
            </div>

            <div class="grid-4 mt-4">
              ${(p.dampakItems || []).map((item, idx) => `
                <div class="dampak-card glass-panel">
                  <div class="dampak-card-head">
                    <span class="dampak-index">0${idx + 1}</span>
                    <i class="fas fa-exclamation-circle text-danger font-lg"></i>
                  </div>
                  <h4 class="dampak-card-title">${item.title}</h4>
                  <p class="dampak-card-desc">${item.desc}</p>
                </div>
              `).join('')}
            </div>
          </div>
        </section>

        <!-- Keunggulan Sistem (Mengapa Memilih Kami) -->
        <section class="landing-section bg-soft-alt">
          <div class="container">
            <div class="section-title-wrap text-center mb-4">
              <span class="subtitle-tag">Keunggulan Solusi</span>
              <h2>Keunggulan Kompetitif ${p.name}</h2>
              <p>Metodologi ilmiah dan rancangan sistem yang disesuaikan secara spesifik dengan karakteristik operasional fasyankes Indonesia.</p>
            </div>

            <div class="grid-4 mt-4">
              ${(p.keunggulan || p.features).map(k => `
                <div class="advantage-card glass-panel">
                  <div class="advantage-icon-bubble">
                    <i class="fas fa-check-circle text-primary"></i>
                  </div>
                  <h4 class="advantage-card-title">${k.title}</h4>
                  <p class="advantage-card-desc">${k.desc}</p>
                </div>
              `).join('')}
            </div>
          </div>
        </section>

        <!-- Manfaat Nyata Bagi Rumah Sakit -->
        <section class="landing-section">
          <div class="container">
            <div class="section-title-wrap text-center mb-4">
              <span class="subtitle-tag">Manfaat Nyata</span>
              <h2>Nilai Tambah Terukur untuk Manajemen & Pasien</h2>
              <p>Dampak langsung yang terbukti meningkatkan akuntabilitas keuangan, keharmonisan internal, dan kualitas layanan rumah sakit.</p>
            </div>

            <div class="grid-4 mt-4">
              ${(p.manfaat || []).map(m => `
                <div class="benefit-card glass-panel">
                  <div class="benefit-icon-bubble">
                    <i class="fas fa-award text-success"></i>
                  </div>
                  <h4 class="benefit-card-title">${m.title}</h4>
                  <p class="benefit-card-desc">${m.desc}</p>
                </div>
              `).join('')}
            </div>
          </div>
        </section>

        <!-- Interactive Simulator Section -->
        <section class="landing-section bg-soft-alt" id="simulator-section">
          <div class="container">
            <div class="section-title-wrap text-center mb-3">
              <span class="subtitle-tag">Uji Coba Langsung</span>
              <h2>Simulasi Fitur Interaktif ${p.name}</h2>
              <p>Rasakan kemudahan dan presisi perhitungan sistem kami langsung pada browser Anda tanpa instalasi.</p>
            </div>

            <div id="landing-sim-slot" class="mt-4">
              <!-- Simulator injected here -->
            </div>
          </div>
        </section>


        <!-- Sticky Bottom CTA for Mobile & Desktop -->
        <div class="landing-bottom-cta glass-panel">
          <div class="container d-flex align-items-center justify-content-between">
            <div class="cta-provocative-text">
              <strong class="d-block text-dark font-bold cta-hook-title">${this.getProvocativeHook(p.id).title}</strong>
              <small class="d-block text-muted cta-hook-desc">${this.getProvocativeHook(p.id).desc}</small>
            </div>
            <div class="d-flex align-items-center gap-2 ml-auto flex-shrink-0">
              <a href="#simulator-section" class="btn btn-outline-primary btn-sm btn-uji-coba-sticky">
                <i class="fas fa-play-circle"></i> Uji Coba
              </a>
              <a href="${waLink}" target="_blank" class="btn btn-success btn-sm btn-chat-admin-cta">
                <i class="fas fa-headset"></i> Chat Admin
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderArticles() {
    const grid = document.getElementById('articles-grid');
    if (!grid) return;

    grid.innerHTML = PINTAR_DATA.articles.map(art => `
      <article class="article-card glass-panel" data-id="${art.id}">
        <div class="article-img-wrap">
          <img src="${art.image}" alt="${art.title}" class="article-thumb" loading="lazy">
          <span class="article-cat-tag">${art.category}</span>
        </div>
        <div class="article-body">
          <div class="article-meta">
            <span><i class="far fa-calendar-alt"></i> ${art.date}</span>
            <span><i class="far fa-clock"></i> ${art.readTime}</span>
          </div>
          <h3 class="article-title">${art.title}</h3>
          <p class="article-snippet">${art.summary}</p>
          <div class="article-author">
            <i class="fas fa-user-circle"></i> <span>${art.author}</span>
          </div>
          <button class="btn btn-link read-article-btn" data-id="${art.id}">
            Baca Selengkapnya <i class="fas fa-arrow-right"></i>
          </button>
        </div>
      </article>
    `).join('');

    // Attach article read clicks
    grid.querySelectorAll('.read-article-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.openArticleModal(btn.dataset.id);
      });
    });
  }

  openArticleModal(artId) {
    const art = PINTAR_DATA.articles.find(a => a.id === artId);
    if (!art) return;

    const modal = document.getElementById('article-modal');
    if (!modal) return;

    document.getElementById('art-modal-title').textContent = art.title;
    document.getElementById('art-modal-meta').innerHTML = `
      <span><i class="far fa-calendar-alt"></i> ${art.date}</span> • 
      <span><i class="far fa-clock"></i> ${art.readTime}</span> • 
      <span><i class="fas fa-user-edit"></i> ${art.author}</span>
    `;
    document.getElementById('art-modal-body').innerHTML = art.content;

    modal.classList.add('open');
  }

  setupArticleReader() {
    const closeBtn = document.getElementById('close-article-modal');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        document.getElementById('article-modal').classList.remove('open');
      });
    }
  }

  renderProfile() {
    const c = PINTAR_DATA.company;
    
    // Management & Expert Team (PDF Page 5)
    const advisorsGrid = document.getElementById('profile-advisors-grid');
    if (advisorsGrid && c.team) {
      advisorsGrid.innerHTML = c.team.map((m, idx) => {
        const isMaster = idx === 0;
        let icon = 'fa-user-tie';
        if (m.role.includes('Medis')) icon = 'fa-user-md';
        else if (m.role.includes('Paramedis')) icon = 'fa-user-nurse';
        else if (m.role.includes('Akuntansi')) icon = 'fa-chart-line';
        else if (m.role.includes('Risiko')) icon = 'fa-shield-alt';
        else if (m.role.includes('Operasional')) icon = 'fa-tasks';

        return `
        <div class="advisor-card glass-panel ${isMaster ? 'advisor-lead-card' : ''}">
          <div class="advisor-avatar-box">
            <div class="advisor-avatar">
              <i class="fas ${icon}"></i>
            </div>
          </div>
          <h5 class="advisor-name">${m.name}</h5>
          <span class="advisor-role ${isMaster ? 'role-badge-master' : ''}">${m.role}</span>
          <p class="advisor-desc">${m.desc}</p>
        </div>
      `;
      }).join('');
    }
  }

  getProvocativeHook(prodId) {
    const hooks = {
      'pintar-uc': {
        title: 'Berapa Ratus Juta Lagi Rumah Sakit Anda Boncos Akibat Tarif Tebak-tebakan?',
        desc: 'Kendalikan biaya riil tindakan medis & kunci tarif rasional sebelum audit membongkar kebocoran anggaran fasyankes.'
      },
      'pintar-jp': {
        title: 'Hentikan Konflik Internal & Kecemburuan Nakes Akibat Pembagian Jaspel yang Tidak Transparan!',
        desc: 'Terapkan formula berkeadilan P1, P2, P3 & integrasi pajak PPh 21 TER PMK 168 tanpa celah manipulasi.'
      },
      'pintar-mr': {
        title: 'Strategi Tanpa Risiko Itu Bunuh Diri, Risiko Tanpa Strategi Itu Mimpi Buruk Fasyankes!',
        desc: 'Deteksi dini potensi gugatan malpraktik, defisit likuiditas, & temuan BPKP sebelum menjadi bencana institusi.'
      },
      'pintar-puas': {
        title: 'Jangan Tunggu Keluhan Pasien Viral di Medsos Baru Rumah Sakit Kelabakan Bertindak!',
        desc: 'Tangkap komplain pasien realtime & penuhi 9 unsur mutu PermenPAN-RB No. 14/2017 sebelum reputasi anjlok.'
      },
      'pintar-klinik': {
        title: 'Masih Mencatat Keuangan Manual & Rawan Denda Pajak PMK 168? Amankan Klinik Anda Sekarang!',
        desc: 'Otomatisasi kasir POS, stok farmasi, billing tindakan, hingga laporan keuangan laba rugi dalam satu sentuhan.'
      },
      'pintar-mmpi-2': {
        title: 'Singkirkan Skoring Manual yang Menghabiskan Waktu & Rawan Salah Interpretasi Psikologis!',
        desc: 'Dapatkan profil psikogram T-Score & validitas akurat dalam hitungan detik untuk MCU Rumah Sakit.'
      },
      'pintar-mmpi2': {
        title: 'Singkirkan Skoring Manual yang Menghabiskan Waktu & Rawan Salah Interpretasi Psikologis!',
        desc: 'Dapatkan profil psikogram T-Score & validitas akurat dalam hitungan detik untuk MCU Rumah Sakit.'
      }
    };
    return hooks[prodId] || {
      title: 'Jangan Biarkan Tata Kelola Rumah Sakit Berjalan Tanpa Sistem Terukur!',
      desc: 'Tingkatkan akuntabilitas, transparansi, dan efisiensi manajemen fasyankes Anda hari ini bersama PT. AKAPRO.'
    };
  }

  renderPartnersMarquee() {
    const track = document.getElementById('partners-marquee-track');
    if (!track || !PINTAR_DATA.company || !PINTAR_DATA.company.partners) return;
    
    const partners = PINTAR_DATA.company.partners;
    // Duplicate for seamless infinite loop animation
    const allPartners = [...partners, ...partners];
    
    track.innerHTML = allPartners.map(p => `
      <div class="partner-card-ticker" title="Mitra Profesional PT. AKAPRO">
        <div class="partner-logo-wrap">
          <img src="${p.logo}" alt="Mitra Profesional" class="partner-logo-img" loading="lazy">
        </div>
      </div>
    `).join('');
  }

  setupBookSlider() {
    let currentPage = 0;
    const pages = document.querySelectorAll('.flipbook-page');
    const pills = document.querySelectorAll('.book-pill-btn');
    const currentIdxEl = document.getElementById('book-current-idx');
    const totalCountEl = document.getElementById('book-total-count');
    const prevBtn = document.getElementById('book-nav-prev');
    const nextBtn = document.getElementById('book-nav-next');
    const wrapper = document.getElementById('flipbook-wrapper');

    if (!pages.length) return;
    if (totalCountEl) totalCountEl.textContent = pages.length;

    let isFlipping = false;

    const showPage = (idx, direction = 'next') => {
      if (idx === currentPage || isFlipping) return;
      isFlipping = true;

      const oldPage = pages[currentPage];
      const newPage = pages[idx];

      // Add 3D book flip animations
      if (direction === 'next') {
        oldPage.classList.add('flipping-out-left');
        newPage.classList.add('flipping-in-right');
      } else {
        oldPage.classList.add('flipping-out-right');
        newPage.classList.add('flipping-in-left');
      }

      setTimeout(() => {
        pages.forEach((p, i) => {
          p.classList.remove('active', 'flipping-out-left', 'flipping-out-right', 'flipping-in-left', 'flipping-in-right');
          if (i === idx) p.classList.add('active');
        });

        pills.forEach((pill, i) => {
          pill.classList.toggle('active', i === idx);
        });

        if (currentIdxEl) currentIdxEl.textContent = idx + 1;
        currentPage = idx;
        isFlipping = false;
      }, 500);
    };

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const next = (currentPage + 1) % pages.length;
        showPage(next, 'next');
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        const prev = (currentPage - 1 + pages.length) % pages.length;
        showPage(prev, 'prev');
      });
    }

    pills.forEach((pill, idx) => {
      pill.addEventListener('click', () => {
        const dir = idx >= currentPage ? 'next' : 'prev';
        showPage(idx, dir);
      });
    });

    // Page poster frame click also turns page
    document.querySelectorAll('.book-poster-frame').forEach((frame) => {
      frame.addEventListener('click', (e) => {
        if (!e.target.closest('a') && !e.target.closest('button')) {
          const next = (currentPage + 1) % pages.length;
          showPage(next, 'next');
        }
      });
    });

    // Touch gesture swipe support (turning pages like a book)
    if (wrapper) {
      let touchStartX = 0;
      let touchEndX = 0;

      wrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      wrapper.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const swipeDistance = touchEndX - touchStartX;
        if (Math.abs(swipeDistance) > 40) {
          if (swipeDistance < 0) {
            const next = (currentPage + 1) % pages.length;
            showPage(next, 'next');
          } else {
            const prev = (currentPage - 1 + pages.length) % pages.length;
            showPage(prev, 'prev');
          }
        }
      }, { passive: true });

      // Mouse drag support
      let isMouseDown = false;
      let mouseStartX = 0;

      wrapper.addEventListener('mousedown', (e) => {
        if (e.target.closest('a') || e.target.closest('button')) return;
        isMouseDown = true;
        mouseStartX = e.clientX;
      });

      window.addEventListener('mouseup', (e) => {
        if (!isMouseDown) return;
        isMouseDown = false;
        const diff = e.clientX - mouseStartX;
        if (Math.abs(diff) > 50) {
          if (diff < 0) {
            const next = (currentPage + 1) % pages.length;
            showPage(next, 'next');
          } else {
            const prev = (currentPage - 1 + pages.length) % pages.length;
            showPage(prev, 'prev');
          }
        }
      });
    }

    // Auto flip every 7 seconds (pauses on hover)
    let autoInterval = setInterval(() => {
      const next = (currentPage + 1) % pages.length;
      showPage(next, 'next');
    }, 7000);

    if (wrapper) {
      wrapper.addEventListener('mouseenter', () => clearInterval(autoInterval));
      wrapper.addEventListener('mouseleave', () => {
        clearInterval(autoInterval);
        autoInterval = setInterval(() => {
          const next = (currentPage + 1) % pages.length;
          showPage(next, 'next');
        }, 7000);
      });
    }
  }

  setupPrintCertificate() {
    const printBtn = document.getElementById('btn-print-certificate');
    if (printBtn) {
      printBtn.addEventListener('click', () => {
        window.print();
      });
    }
  }

  setupAppDropdown() {
    // Dropdown desktop sub-items
    document.querySelectorAll('.nav-sub-item').forEach(item => {
      item.addEventListener('click', (e) => {
        const appId = item.dataset.app;
        const dropdownWrap = document.querySelector('.nav-dropdown-item-wrap');
        if (dropdownWrap) dropdownWrap.classList.remove('open');
        if (appId) {
          window.location.hash = appId;
          this.openProductLanding(appId);
        }
      });
    });

    // Mobile sheet app cards
    document.querySelectorAll('.mobile-app-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const appId = card.dataset.app;
        const modal = document.getElementById('mobile-app-modal');
        if (modal) modal.classList.remove('open');
        if (appId) {
          window.location.hash = appId;
          this.openProductLanding(appId);
        }
      });
    });

    // Toggle dropdown on mobile/touch if needed
    const dropdownToggle = document.getElementById('btn-dropdown-apps');
    const dropdownWrap = document.querySelector('.nav-dropdown-item-wrap');
    if (dropdownToggle && dropdownWrap) {
      dropdownToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownWrap.classList.toggle('open');
      });

      document.addEventListener('click', (e) => {
        if (!dropdownWrap.contains(e.target)) {
          dropdownWrap.classList.remove('open');
        }
      });
    }
  }

  renderGallery(filter = 'all') {
    const grid = document.getElementById('gallery-grid');
    if (!grid || !PINTAR_DATA.gallery) return;

    this.currentGalleryFilter = filter;
    const items = filter === 'all'
      ? PINTAR_DATA.gallery
      : PINTAR_DATA.gallery.filter(item => item.categorySlug === filter);

    grid.innerHTML = items.map((item) => {
      const globalIndex = PINTAR_DATA.gallery.findIndex(g => g.id === item.id);
      return `
        <div class="gallery-card glass-panel" data-index="${globalIndex}">
          <div class="gallery-thumb-wrap">
            <img src="${item.image}" alt="${item.title}" class="gallery-thumb" loading="lazy">
            <div class="gallery-badge"><i class="fas fa-tag"></i> ${item.badge}</div>
            <div class="gallery-overlay">
              <div class="gallery-zoom-icon">
                <i class="fas fa-search-plus"></i>
              </div>
            </div>
          </div>
          <div class="gallery-info">
            <div class="gallery-location-meta">
              <i class="fas fa-map-marker-alt"></i> <span>${item.location}</span>
            </div>
            <h4 class="gallery-title">${item.title}</h4>
            <p class="gallery-desc">${item.description}</p>
            <div class="gallery-footer-bar">
              <span class="gallery-speaker"><i class="fas fa-user-tie text-primary"></i> ${item.speaker}</span>
              <span class="btn-open-photo">Lihat Foto <i class="fas fa-arrow-right"></i></span>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Attach click events on gallery cards
    grid.querySelectorAll('.gallery-card').forEach(card => {
      card.addEventListener('click', () => {
        const idx = parseInt(card.dataset.index, 10);
        this.openLightbox(idx);
      });
    });

    // Setup filter buttons
    document.querySelectorAll('.gallery-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.gallery-filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.renderGallery(btn.dataset.filter);
      });
    });
  }

  renderBerandaGalleryPreview() {
    const container = document.getElementById('beranda-gallery-preview');
    if (!container || !PINTAR_DATA.gallery) return;

    // Show top 3 highlight photos on homepage
    const highlights = PINTAR_DATA.gallery.slice(0, 3);
    container.innerHTML = highlights.map((item, idx) => `
      <div class="gallery-card glass-panel" data-index="${idx}">
        <div class="gallery-thumb-wrap">
          <img src="${item.image}" alt="${item.title}" class="gallery-thumb" loading="lazy">
          <div class="gallery-badge"><i class="fas fa-award"></i> ${item.badge}</div>
          <div class="gallery-overlay">
            <div class="gallery-zoom-icon"><i class="fas fa-search-plus"></i></div>
          </div>
        </div>
        <div class="gallery-info">
          <div class="gallery-location-meta">
            <i class="fas fa-map-marker-alt"></i> <span>${item.location}</span>
          </div>
          <h4 class="gallery-title">${item.title}</h4>
          <p class="gallery-desc">${item.description}</p>
          <div class="gallery-footer-bar">
            <span class="gallery-speaker"><i class="fas fa-user-tie text-primary"></i> ${item.speaker}</span>
            <span class="btn-open-photo">Buka Detail <i class="fas fa-expand"></i></span>
          </div>
        </div>
      </div>
    `).join('');

    container.querySelectorAll('.gallery-card').forEach(card => {
      card.addEventListener('click', () => {
        const idx = parseInt(card.dataset.index, 10);
        this.openLightbox(idx);
      });
    });
  }

  setupGalleryLightbox() {
    const modal = document.getElementById('gallery-lightbox-modal');
    const closeBtn = document.getElementById('close-lightbox-modal');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');

    if (closeBtn && modal) {
      closeBtn.addEventListener('click', () => modal.classList.remove('open'));
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('open');
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const total = PINTAR_DATA.gallery.length;
        this.activeGalleryIndex = (this.activeGalleryIndex - 1 + total) % total;
        this.showLightboxPhoto(this.activeGalleryIndex);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const total = PINTAR_DATA.gallery.length;
        this.activeGalleryIndex = (this.activeGalleryIndex + 1) % total;
        this.showLightboxPhoto(this.activeGalleryIndex);
      });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!modal || !modal.classList.contains('open')) return;
      if (e.key === 'Escape') modal.classList.remove('open');
      if (e.key === 'ArrowLeft') prevBtn && prevBtn.click();
      if (e.key === 'ArrowRight') nextBtn && nextBtn.click();
    });
  }

  openLightbox(index) {
    this.activeGalleryIndex = index;
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');
    if (prevBtn) prevBtn.style.display = 'flex';
    if (nextBtn) nextBtn.style.display = 'flex';
    this.showLightboxPhoto(index);
    const modal = document.getElementById('gallery-lightbox-modal');
    if (modal) modal.classList.add('open');
  }

  openImageLightbox(src, title) {
    const modal = document.getElementById('gallery-lightbox-modal');
    const img = document.getElementById('lightbox-img');
    const titleEl = document.getElementById('lightbox-title');
    const badge = document.getElementById('lightbox-badge');
    const meta = document.getElementById('lightbox-meta');
    const desc = document.getElementById('lightbox-desc');
    const download = document.getElementById('lightbox-download');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');

    if (img) {
      img.src = src;
      img.alt = title || 'Preview Dokumen';
    }
    if (titleEl) titleEl.textContent = title || 'Dokumen Resmi PINTARKITA';
    if (badge) badge.textContent = 'Poster & Arsitektur Resmi';
    if (meta) {
      meta.innerHTML = `<span><i class="fas fa-shield-alt text-primary"></i> Hak Kekayaan Intelektual PT. Akademi Profesional Indonesia</span>`;
    }
    if (desc) desc.textContent = 'Infografis resmi beresolusi tinggi menampilkan arsitektur sistem, alur proses bisnis fasyankes, serta dasar regulasi Kementerian Kesehatan & Kemendagri.';
    if (download) {
      download.href = src;
      download.setAttribute('download', src.split('/').pop());
    }
    if (prevBtn) prevBtn.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'none';
    if (modal) modal.classList.add('open');
  }

  showLightboxPhoto(index) {
    const item = PINTAR_DATA.gallery[index];
    if (!item) return;

    const img = document.getElementById('lightbox-img');
    const title = document.getElementById('lightbox-title');
    const badge = document.getElementById('lightbox-badge');
    const meta = document.getElementById('lightbox-meta');
    const desc = document.getElementById('lightbox-desc');
    const download = document.getElementById('lightbox-download');

    if (img) {
      img.src = item.image;
      img.alt = item.title;
    }
    if (title) title.textContent = item.title;
    if (badge) badge.textContent = item.category;
    if (meta) {
      meta.innerHTML = `
        <span><i class="fas fa-map-marker-alt text-danger"></i> ${item.location}</span> &bull; 
        <span><i class="fas fa-hospital text-primary"></i> ${item.institution}</span> &bull; 
        <span><i class="fas fa-user-tie text-success"></i> ${item.speaker}</span>
      `;
    }
    if (desc) desc.textContent = item.description;
    if (download) {
      download.href = item.image;
      download.setAttribute('download', item.image.split('/').pop());
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.PintarKita = new PintarKitaApp();
  window.PintarKita.init();
});
