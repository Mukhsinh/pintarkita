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
    this.setupBannerSlider();
    this.setupArticleReader();
    this.setupPrintCertificate();

    // Check URL hash for direct links (e.g., #pintar-uc, #pelatihan, #galeri)
    this.handleHashChange();
    window.addEventListener('hashchange', () => this.handleHashChange());

    // Initialize subsystems
    if (window.PrayerTimeManager) window.PrayerTimeManager.init();
    if (window.PintarLms) window.PintarLms.init();
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
    this.currentView = viewName;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Hide all view containers
    document.querySelectorAll('.view-container').forEach(c => {
      c.classList.remove('active');
    });

    // Show target container
    const target = document.getElementById(`view-${viewName}`);
    if (target) {
      target.classList.add('active');
    }

    // Update bottom nav active state
    document.querySelectorAll('.bottom-nav-item').forEach(item => {
      if (item.dataset.view === viewName) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Update desktop nav
    document.querySelectorAll('.top-nav-link').forEach(link => {
      if (link.dataset.view === viewName) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
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

    // Initialize simulator for this product
    if (prod.interactiveDemoType) {
      if (prod.interactiveDemoType === 'unit-cost-calc') {
        PINTAR_SIMULATORS.renderUnitCostCalc('landing-sim-slot');
      } else if (prod.interactiveDemoType === 'jp-calculator') {
        PINTAR_SIMULATORS.renderJpCalculator('landing-sim-slot');
      } else if (prod.interactiveDemoType === 'risk-matrix') {
        PINTAR_SIMULATORS.renderRiskMatrix('landing-sim-slot');
      } else if (prod.interactiveDemoType === 'survey-demo') {
        PINTAR_SIMULATORS.renderSurveyDemo('landing-sim-slot');
      } else if (prod.interactiveDemoType === 'clinic-billing') {
        PINTAR_SIMULATORS.renderClinicBilling('landing-sim-slot');
      } else if (prod.interactiveDemoType === 'mmpi-simulator') {
        PINTAR_SIMULATORS.renderMmpiSimulator('landing-sim-slot');
      }
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
            <a href="${waLink}" target="_blank" class="btn btn-sm btn-success">
              <i class="fab fa-whatsapp"></i> Demo Rumah Sakit
            </a>
          </div>
        </div>

        <!-- Hero Section with Distinct Image for Each Menu -->
        <section class="landing-hero">
          <div class="container">
            <div class="hero-grid">
              <div class="hero-text-col">
                <div class="d-flex align-items-center gap-2 mb-2">
                  <span class="product-badge-pill">${p.badge}</span>
                  <span class="badge badge-primary">PT. AKADEMI PROFESIONAL INDONESIA</span>
                </div>
                <h1 class="landing-hero-title">${p.fullName}</h1>
                <p class="landing-hero-subtitle">${p.tagline}</p>
                <p class="landing-summary-p">${p.summary}</p>

                <div class="landing-stats-row">
                  <div class="stat-box glass-panel">
                    <h3>${p.stat1.value}</h3>
                    <p>${p.stat1.label}</p>
                  </div>
                  <div class="stat-box glass-panel">
                    <h3>${p.stat2.value}</h3>
                    <p>${p.stat2.label}</p>
                  </div>
                  <div class="stat-box glass-panel">
                    <h3>${p.stat3.value}</h3>
                    <p>${p.stat3.label}</p>
                  </div>
                </div>

                <div class="landing-cta-buttons">
                  <a href="${waLink}" target="_blank" class="btn btn-primary btn-lg pulse-glow">
                    <i class="fas fa-headset"></i> Chat Admin (085726112001)
                  </a>
                  <a href="#simulator-section" class="btn btn-outline-primary btn-lg">
                    <i class="fas fa-play"></i> Coba Simulasi Fitur
                  </a>
                </div>

                <div class="compliance-row mt-3">
                  <small class="text-muted"><i class="fas fa-shield-alt text-primary"></i> Regulasi & Standar:</small>
                  <div class="d-flex flex-wrap gap-2 mt-1">
                    ${p.compliance.map(c => `<span class="badge badge-light-blue">${c}</span>`).join('')}
                  </div>
                </div>
              </div>

              <!-- Dedicated Distinct Visual Image -->
              <div class="hero-visual-col">
                <div class="landing-visual-card glass-panel">
                  <div class="visual-card-header">
                    <div class="circle-dots"><span></span><span></span><span></span></div>
                    <small class="font-bold text-primary">${p.name} • PT. AKAPRO Cloud System</small>
                  </div>
                  <img src="${p.heroImage}" alt="${p.name} Infographic & Preview" class="landing-preview-img" style="border-radius: 12px; max-height: 440px; object-fit: contain; background: #f8fafc;">
                  <div class="floating-benefit-badge glass-panel mt-2">
                    <img src="${p.icon}" alt="${p.name} Logo" class="benefit-logo">
                    <div>
                      <strong>Solusi Resmi Ber-HAKI Kemenkumham</strong>
                      <p>Kepatuhan regulasi Kemenkes & Kemendagri terjamin</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Problem & Solution Comparison -->
        <section class="landing-section bg-soft-alt">
          <div class="container">
            <div class="section-title-wrap text-center">
              <span class="subtitle-tag">Tantangan & Terobosan Rumah Sakit</span>
              <h2>Mengapa Rumah Sakit Membutuhkan ${p.name}?</h2>
              <p>Perbandingan nyata antara metode manual/konvensional dengan keunggulan solusi PT. Akademi Profesional Indonesia</p>
            </div>

            <div class="grid-2 mt-4">
              <div class="compare-card compare-problem glass-panel">
                <div class="compare-header text-danger">
                  <i class="fas fa-times-circle"></i> Tanpa ${p.name} (Kondisi Konvensional)
                </div>
                <p class="problem-quote">"${p.problemStatement}"</p>
                <ul class="compare-list">
                  <li><i class="fas fa-times text-danger"></i> Biaya tidak jelas dan keputusan tarif hanya berdasarkan asumsi</li>
                  <li><i class="fas fa-times text-danger"></i> Rawan kesalahan rumus Excel yang menyebabkan selisih anggaran</li>
                  <li><i class="fas fa-times text-danger"></i> Pembagian jaspel tidak transparan melahirkan konflik internal nakes</li>
                  <li><i class="fas fa-times text-danger"></i> Sulit akuntabel saat audit BPKP, Kemendagri, maupun Inspektorat</li>
                </ul>
              </div>

              <div class="compare-card compare-solution glass-panel highlight-border">
                <div class="compare-header text-success">
                  <i class="fas fa-check-circle"></i> Dengan ${p.name} (Solusi Cerdas AKAPRO)
                </div>
                <ul class="solution-list">
                  ${p.solutionHighlights.map(s => `
                    <li><i class="fas fa-check text-success"></i> ${s}</li>
                  `).join('')}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <!-- Interactive Simulator Section -->
        <section class="landing-section" id="simulator-section">
          <div class="container">
            <div class="section-title-wrap text-center">
              <span class="subtitle-tag">Uji Coba Langsung</span>
              <h2>Simulasi Fitur Interaktif ${p.name}</h2>
              <p>Rasakan kemudahan dan presisi perhitungan sistem kami langsung pada browser Anda.</p>
            </div>

            <div id="landing-sim-slot" class="mt-4">
              <!-- Simulator injected here -->
            </div>
          </div>
        </section>

        <!-- Core Features Grid -->
        <section class="landing-section bg-soft-alt">
          <div class="container">
            <div class="section-title-wrap text-center">
              <span class="subtitle-tag">Fitur Unggulan Sistem</span>
              <h2>Kemampuan Sistem yang Dirancang untuk Kebutuhan Riil Fasyankes</h2>
              <p>Setiap modul dirancang sesuai alur kerja operasional rumah sakit dan fasyankes Indonesia.</p>
            </div>

            <div class="grid-4 mt-4">
              ${p.features.map(f => `
                <div class="feature-card glass-panel">
                  <div class="feature-icon-wrap">
                    <i class="${f.icon}"></i>
                  </div>
                  <h4>${f.title}</h4>
                  <p>${f.desc}</p>
                </div>
              `).join('')}
            </div>
          </div>
        </section>

        <!-- Key Benefits List -->
        <section class="landing-section">
          <div class="container">
            <div class="benefits-panel glass-panel">
              <div class="grid-2 align-items-center">
                <div>
                  <span class="subtitle-tag">Dampak Positif Bagi Rumah Sakit</span>
                  <h2>Nilai Tambah Terbesar untuk Manajemen & Pasien</h2>
                  <div class="benefits-check-list mt-3">
                    ${p.benefits.map(b => `
                      <div class="benefit-item">
                        <i class="fas fa-badge-check text-primary"></i>
                        <span>${b}</span>
                      </div>
                    `).join('')}
                  </div>
                </div>
                <div class="text-center p-3">
                  <div class="cta-direct-box glass-inset p-4">
                    <img src="${p.icon}" alt="${p.name}" class="cta-box-logo">
                    <h3>Siap Mengoptimalkan Manajemen Rumah Sakit Anda?</h3>
                    <p>Konsultasikan kebutuhan spesifik institusi Anda bersama tim profesional PT. AKAPRO.</p>
                    <a href="${waLink}" target="_blank" class="btn btn-primary btn-lg btn-block pulse-glow">
                      <i class="fas fa-headset"></i> Chat Admin (085726112001)
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Sticky Bottom CTA for Mobile & Desktop -->
        <div class="landing-bottom-cta glass-panel">
          <div class="container d-flex align-items-center justify-content-between">
            <div class="d-none-mobile">
              <strong>Tertarik mengimplementasikan ${p.name} di Rumah Sakit Anda?</strong>
              <small class="d-block text-muted">Dapatkan jadwal paparan, proposal teknis, dan demo live untuk tim Anda.</small>
            </div>
            <a href="${waLink}" target="_blank" class="btn btn-success btn-lg ml-auto">
              <i class="fas fa-headset"></i> Chat Admin (085726112001)
            </a>
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
      advisorsGrid.innerHTML = c.team.map(m => `
        <div class="advisor-card glass-panel">
          <div class="advisor-avatar"><i class="fas fa-user-tie"></i></div>
          <h5 class="advisor-name">${m.name}</h5>
          <span class="advisor-role">${m.role}</span>
          <p class="advisor-desc">${m.desc}</p>
        </div>
      `).join('');
    }
  }

  renderPartnersMarquee() {
    const track = document.getElementById('partners-marquee-track');
    if (!track || !PINTAR_DATA.company || !PINTAR_DATA.company.partners) return;
    
    const partners = PINTAR_DATA.company.partners;
    // Duplicate for seamless infinite loop animation
    const allPartners = [...partners, ...partners];
    
    track.innerHTML = allPartners.map(p => `
      <div class="partner-card-ticker">
        <div class="partner-logo-wrap">
          <img src="${p.logo}" alt="${p.name}" class="partner-logo-img" loading="lazy">
        </div>
        <div class="partner-info">
          <div class="partner-name">${p.name}</div>
          <div class="partner-region">${p.region || ''}</div>
          <span class="partner-app-badge ${p.appBadge || 'badge-mr'}">${p.app || 'PINTAR MR'}</span>
        </div>
      </div>
    `).join('');
  }

  setupBannerSlider() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.hero-banner-slide');
    const dots = document.querySelectorAll('.banner-dot');
    if (slides.length <= 1) return;

    const showSlide = (idx) => {
      slides.forEach((s, i) => {
        s.classList.toggle('active', i === idx);
      });
      dots.forEach((d, i) => {
        d.classList.toggle('active', i === idx);
      });
      currentSlide = idx;
    };

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => showSlide(idx));
    });

    // Auto rotate every 6 seconds
    setInterval(() => {
      let next = (currentSlide + 1) % slides.length;
      showSlide(next);
    }, 6000);
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
    this.showLightboxPhoto(index);
    const modal = document.getElementById('gallery-lightbox-modal');
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
