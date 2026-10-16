/**
 * PINTARKITA - LMS Engine (Learning Management System)
 * Layanan dari PT. AKADEMI PROFESIONAL INDONESIA (AKAPRO)
 * Khusus Manajemen Rumah Sakit (BLUD/RSUD/RS Swasta) & Fasyankes
 * Features: Video Tutorial, Modul PDF, Kuis Interaktif, Laporan Pelatihan PDF Resmi, Sertifikat Digital
 */

class PintarLmsEngine {
  constructor() {
    this.currentCourse = null;
    this.activeModuleIndex = 0;
    this.quizAnswers = {};
    this.userScore = null;
    this.studentName = localStorage.getItem('pintarkita_student_name') || 'dr. Siti Rahmawati, Sp.A, MARS';
    this.studentInst = localStorage.getItem('pintarkita_student_inst') || 'RSUD dr. Soeselo Slawi / RSUD Bendan';

    // Mock enrolled hospital staff database for Official Training Report
    this.studentRecords = [
      { no: 1, name: 'dr. Siti Rahmawati, Sp.A, MARS', institution: 'RSUD dr. Soeselo Slawi (BLUD)', course: 'Bimtek Penyusunan Unit Cost & Clinical Pathway RS (ABC Modifikasi)', progress: '100%', quizScore: 92, status: 'LULUS KOMPETEN', date: '16 Okt 2026' },
      { no: 2, name: 'dr. Hendra Pratama, Sp.B', institution: 'RSUD dr. R. Goeteng Purbalingga', course: 'Bimtek Distribusi Insentif Jasa Pelayanan RS Terintegrasi KPI', progress: '100%', quizScore: 88, status: 'LULUS KOMPETEN', date: '15 Okt 2026' },
      { no: 3, name: 'Wahyu Hidayat, SE, Ak.', institution: 'RSUD Bendan Kota Pekalongan', course: 'Bimtek Tata Kelola Keuangan RS: Anggaran, Penatausahaan & Lapkeu', progress: '100%', quizScore: 95, status: 'LULUS KOMPETEN', date: '14 Okt 2026' },
      { no: 4, name: 'Ns. Ratna Sari, S.Kep.', institution: 'RS Sungai Bahar Jambi', course: 'Bimtek Manajemen Risiko Terintegrasi Renstra RS & STARKES', progress: '95%', quizScore: 85, status: 'LULUS KOMPETEN', date: '13 Okt 2026' },
      { no: 5, name: 'dr. Bambang Irawan, Sp.KJ', institution: 'RSUD Mayjen HA Thalib Jambi', course: 'Bimtek Administrasi & Interpretasi Hasil Psikotes MMPI-2 RS', progress: '100%', quizScore: 96, status: 'LULUS KOMPETEN', date: '12 Okt 2026' },
      { no: 6, name: 'Dewi Lestari, A.Md.Keb.', institution: 'RS Ibu & Anak An-Nisa', course: 'Bimtek Manajemen Komplain, Survei Kepuasan (SKM) & PPID RS', progress: '100%', quizScore: 90, status: 'LULUS KOMPETEN', date: '11 Okt 2026' }
    ];
  }

  init() {
    this.renderCatalog();
    this.setupEvents();
  }

  renderCatalog(filterCategory = 'Semua Pelatihan') {
    const grid = document.getElementById('lms-course-grid');
    if (!grid) return;

    const courses = PINTAR_DATA.lms.courses;
    const filtered = (filterCategory === 'Semua Pelatihan' || filterCategory === 'Semua Kategori')
      ? courses 
      : courses.filter(c => c.category === filterCategory);

    grid.innerHTML = filtered.map(course => `
      <div class="course-card glass-panel">
        <div class="course-thumb-wrap">
          <img src="${course.thumbnail}" alt="${course.title}" class="course-thumb" loading="lazy">
          <span class="course-badge">${course.badge}</span>
          <span class="course-cat-tag">${course.category}</span>
        </div>
        <div class="course-body">
          <div class="course-meta">
            <span><i class="fas fa-clock"></i> ${course.duration}</span>
            <span><i class="fas fa-book-open"></i> ${course.lessonsCount} Modul</span>
            <span class="text-warning"><i class="fas fa-star"></i> ${course.rating}</span>
          </div>
          <h4 class="course-title" title="${course.title}">${course.title}</h4>
          <p class="course-desc" title="${course.description}">${course.description}</p>
          <div class="course-target">
            <i class="fas fa-hospital-user text-primary"></i> <span>Sasaran: <strong>${course.target}</strong></span>
          </div>
          <div class="course-footer">
            <button class="btn btn-primary btn-block open-course-btn" data-id="${course.id}">
              <i class="fas fa-play-circle"></i> Buka Pembelajaran Diklat RS
            </button>
          </div>
        </div>
      </div>
    `).join('');

    // Attach click events
    grid.querySelectorAll('.open-course-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const courseId = btn.dataset.id;
        this.openCoursePlayer(courseId);
      });
    });
  }

  setupEvents() {
    // Category pills filter
    document.querySelectorAll('.lms-cat-pill').forEach(pill => {
      pill.addEventListener('click', (e) => {
        document.querySelectorAll('.lms-cat-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const cat = pill.dataset.cat;
        this.renderCatalog(cat);
      });
    });

    // Laporan Pelatihan PDF Trigger
    const laporanBtn = document.getElementById('btn-show-laporan');
    if (laporanBtn) {
      laporanBtn.addEventListener('click', () => this.showLaporanModal());
    }

    // Excel Export Trigger (if any)
    const exportExcelBtn = document.getElementById('btn-export-excel-alt');
    if (exportExcelBtn) {
      exportExcelBtn.addEventListener('click', () => this.exportToExcel());
    }

    // Certificate Generator Modal Trigger
    const certBtn = document.getElementById('btn-show-certificate');
    if (certBtn) {
      certBtn.addEventListener('click', () => this.showCertificateModal());
    }

    // Modal Close handlers
    const closePlayer = document.getElementById('close-lms-player');
    if (closePlayer) {
      closePlayer.addEventListener('click', () => {
        document.getElementById('lms-player-modal').classList.remove('open');
      });
    }

    const closeCert = document.getElementById('close-cert-modal');
    if (closeCert) {
      closeCert.addEventListener('click', () => {
        document.getElementById('cert-modal').classList.remove('open');
      });
    }

    const closeLaporan = document.getElementById('close-laporan-modal');
    if (closeLaporan) {
      closeLaporan.addEventListener('click', () => {
        document.getElementById('laporan-modal').classList.remove('open');
      });
    }

    const printLaporanBtn = document.getElementById('btn-print-laporan');
    if (printLaporanBtn) {
      printLaporanBtn.addEventListener('click', () => {
        window.print();
      });
    }
  }

  showLaporanModal() {
    const modal = document.getElementById('laporan-modal');
    if (!modal) return;

    const tbody = document.getElementById('laporan-table-body');
    if (tbody) {
      tbody.innerHTML = this.studentRecords.map(r => `
        <tr>
          <td class="text-center">${r.no}</td>
          <td><strong>${r.name}</strong></td>
          <td>${r.institution}</td>
          <td>${r.course}</td>
          <td class="text-center font-bold text-primary">${r.quizScore}</td>
          <td class="text-center"><span class="badge badge-success">${r.status}</span></td>
        </tr>
      `).join('');
    }

    modal.classList.add('open');
  }

  openCoursePlayer(courseId) {
    const course = PINTAR_DATA.lms.courses.find(c => c.id === courseId) || PINTAR_DATA.lms.courses[0];
    this.currentCourse = course;
    this.activeModuleIndex = 0;
    this.quizAnswers = {};
    this.userScore = null;

    const modal = document.getElementById('lms-player-modal');
    if (!modal) return;

    document.getElementById('player-course-title').textContent = course.title;
    document.getElementById('player-course-category').textContent = `${course.category} • ${course.duration}`;

    this.renderModuleList();
    this.loadModuleContent(0);

    modal.classList.add('open');
  }

  renderModuleList() {
    const listEl = document.getElementById('player-module-list');
    if (!listEl || !this.currentCourse) return;

    listEl.innerHTML = this.currentCourse.modules.map((m, idx) => `
      <div class="player-mod-item ${idx === this.activeModuleIndex ? 'active' : ''}" data-idx="${idx}">
        <div class="mod-icon">
          ${m.type === 'video' ? '<i class="fas fa-play-circle text-primary"></i>' : m.type === 'pdf' ? '<i class="fas fa-file-pdf text-danger"></i>' : '<i class="fas fa-clipboard-check text-warning"></i>'}
        </div>
        <div class="mod-info">
          <h6>${m.title}</h6>
          <small>${m.type === 'video' ? `Video Tutorial (${m.duration})` : m.type === 'pdf' ? `Buku Regulasi/Kerja PDF (${m.pages} Halaman)` : 'Kuis Evaluasi Kompetensi'}</small>
        </div>
      </div>
    `).join('');

    listEl.querySelectorAll('.player-mod-item').forEach(item => {
      item.addEventListener('click', () => {
        const idx = Number(item.dataset.idx);
        this.activeModuleIndex = idx;
        this.renderModuleList();
        this.loadModuleContent(idx);
      });
    });
  }

  loadModuleContent(index) {
    const contentArea = document.getElementById('player-content-area');
    if (!contentArea || !this.currentCourse) return;

    const mod = this.currentCourse.modules[index];
    if (!mod) return;

    if (mod.type === 'video') {
      contentArea.innerHTML = `
        <div class="video-player-container">
          <div class="video-frame glass-panel">
            <video controls poster="${this.currentCourse.thumbnail}" class="responsive-video">
              <source src="${mod.src || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}" type="video/mp4">
              Browser Anda tidak mendukung pemutar video HTML5.
            </video>
          </div>
          <div class="video-meta-box mt-3 p-3 glass-inset">
            <h4><i class="fas fa-film text-primary"></i> ${mod.title}</h4>
            <p>${mod.videoSummary || 'Materi bimbingan teknis interaktif disiapkan oleh narasumber praktisi rumah sakit dan konsultan manajemen PT. Akademi Profesional Indonesia.'}</p>
            <div class="d-flex flex-wrap gap-2 mt-2">
              <span class="badge badge-success"><i class="fas fa-check"></i> Kualitas HD 1080p</span>
              <span class="badge badge-blue"><i class="fas fa-hospital"></i> Standar RS BLUD & Swasta</span>
              <button class="btn btn-sm btn-outline-primary ml-auto" onclick="alert('Bahan paparan dan dokumen regulasi resmi telah tersedia pada Modul 2.');">
                <i class="fas fa-download"></i> Unduh Bahan Paparan PDF
              </button>
            </div>
          </div>
        </div>
      `;
    } else if (mod.type === 'pdf') {
      contentArea.innerHTML = `
        <div class="pdf-reader-container glass-panel p-3">
          <div class="pdf-toolbar d-flex align-items-center justify-content-between mb-3">
            <div>
              <span class="badge badge-danger"><i class="fas fa-file-pdf"></i> DOKUMEN MODUL RESMI DIKLAT RS</span>
              <h5 class="mt-1">${mod.title}</h5>
            </div>
            <div class="btn-group">
              <button class="btn btn-sm btn-secondary" onclick="alert('Zoom Out');"><i class="fas fa-search-minus"></i></button>
              <button class="btn btn-sm btn-secondary" onclick="alert('Zoom In');"><i class="fas fa-search-plus"></i></button>
              <button class="btn btn-sm btn-primary" onclick="alert('Dokumen modul regulasi berhasil diunduh.');">
                <i class="fas fa-download"></i> Unduh Dokumen Resmi
              </button>
            </div>
          </div>

          <div class="pdf-sheet glass-inset p-4">
            <div class="pdf-header border-bottom pb-3 mb-3">
              <div class="d-flex justify-content-between">
                <strong>PT. AKADEMI PROFESIONAL INDONESIA (AKAPRO)</strong>
                <span>DIVISI DIKLAT & KONSULTASI FASYANKES</span>
              </div>
              <h4 class="text-primary mt-2">${mod.title}</h4>
              <p class="text-muted small">Disusun oleh Tim Konsultan & Master Trainer PT. Akademi Profesional Indonesia</p>
            </div>

            <div class="pdf-body text-dark">
              <h5>1. DASAR HUKUM & STANDAR REGULASI RUMAH SAKIT</h5>
              <p>${mod.pdfSummary || 'Pedoman teknis komprehensif yang dirancang untuk memperkuat tata kelola keuangan, manajemen risiko, dan operasional rumah sakit di Indonesia.'}</p>
              
              <h5 class="mt-3">2. KERANGKA KERJA IMPLEMENTASI</h5>
              <ul>
                <li>Kepatuhan terhadap Permenkes No. 85/2015, Permendagri 79/2018 (BLUD), dan PMK No. 168/2023.</li>
                <li>Standar Akreditasi Rumah Sakit Kementerian Kesehatan RI (STARKES) dan ISO 31000:2018.</li>
                <li>Pemanfaatan sistem aplikasi terintegrasi untuk akuntabilitas saat pemeriksaan audit BPKP atau Inspektorat Daerah.</li>
              </ul>

              <h5 class="mt-3">3. LEMBAR KERJA SIMULASI RUMAH SAKIT</h5>
              <p>Peserta diharapkan menyelesaikan studi kasus riil unit cost, pembobotan indeks jaspel, atau grading risiko sebelum menempuh evaluasi kelulusan.</p>

              <div class="alert alert-info mt-4">
                <i class="fas fa-info-circle"></i> <strong>Petunjuk:</strong> Setelah menelaah dokumen ini, silakan klik <strong>Modul 3</strong> untuk mengerjakan Kuis Evaluasi Kompetensi dan mengklaim <strong>Sertifikat Digital</strong> resmi dari PT. AKAPRO.
              </div>
            </div>
          </div>
        </div>
      `;
    } else if (mod.type === 'quiz') {
      this.renderInteractiveQuiz(contentArea);
    }
  }

  renderInteractiveQuiz(container) {
    const questions = PINTAR_DATA.lms.quizQuestions;

    container.innerHTML = `
      <div class="quiz-container glass-panel p-4">
        <div class="quiz-header border-bottom pb-3 mb-3 d-flex justify-content-between align-items-center">
          <div>
            <span class="badge badge-warning"><i class="fas fa-clipboard-check"></i> UJI KOMPETENSI DIKLAT RUMAH SAKIT</span>
            <h4 class="mt-1">Kuis Evaluasi Kompetensi Manajemen Rumah Sakit</h4>
            <p class="text-muted small">Jawab 5 pertanyaan berbasis studi kasus fasyankes. Nilai kelulusan minimal: <strong>80% (Benar 4 dari 5)</strong></p>
          </div>
          <div class="quiz-timer glass-inset p-2 text-center">
            <small class="text-muted">Sisa Waktu</small>
            <div class="font-bold text-danger" id="quiz-countdown">15:00</div>
          </div>
        </div>

        <form id="lms-quiz-form">
          <div class="quiz-questions-list">
            ${questions.map((q, qIdx) => `
              <div class="quiz-card glass-inset p-3 mb-3">
                <h6 class="font-bold mb-2">Soal ${qIdx + 1}: ${q.question}</h6>
                <div class="quiz-options">
                  ${q.options.map((opt, optIdx) => `
                    <label class="quiz-opt-label">
                      <input type="radio" name="q_${qIdx}" value="${optIdx}" required>
                      <span>${opt}</span>
                    </label>
                  `).join('')}
                </div>
              </div>
            `).join('')}
          </div>

          <div class="quiz-submit-bar text-center mt-4">
            <button type="submit" class="btn btn-primary btn-lg">
              <i class="fas fa-paper-plane"></i> Kirim Jawaban & Lihat Hasil Kelulusan
            </button>
          </div>
        </form>

        <div id="quiz-result-box" class="quiz-result-box mt-4" style="display: none;">
          <!-- Dynamically populated on submit -->
        </div>
      </div>
    `;

    const form = document.getElementById('lms-quiz-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.submitQuiz(form);
      });
    }
  }

  submitQuiz(form) {
    const questions = PINTAR_DATA.lms.quizQuestions;
    let correctCount = 0;

    questions.forEach((q, idx) => {
      const selected = form.querySelector(`input[name="q_${idx}"]:checked`);
      if (selected && Number(selected.value) === q.answer) {
        correctCount++;
      }
    });

    const score = Math.round((correctCount / questions.length) * 100);
    this.userScore = score;
    const isPassed = score >= 80;

    const resBox = document.getElementById('quiz-result-box');
    resBox.style.display = 'block';

    resBox.innerHTML = `
      <div class="glass-panel p-4 text-center ${isPassed ? 'border-success' : 'border-danger'}">
        <div class="result-icon font-xxl mb-2">
          ${isPassed ? '<i class="fas fa-trophy text-warning"></i>' : '<i class="fas fa-redo text-danger"></i>'}
        </div>
        <h3>${isPassed ? 'SELAMAT, ANDA DINYATAKAN LULUS KOMPETENSI!' : 'MAAF, ANDA BELUM MENCAPAI PASSING GRADE'}</h3>
        <div class="score-display my-2">
          <span class="font-bold font-xxl ${isPassed ? 'text-success' : 'text-danger'}">${score}</span>
          <span class="text-muted">/ 100 Poin</span>
        </div>
        <p class="lead">${isPassed 
          ? `Luar biasa! Anda menjawab benar ${correctCount} dari ${questions.length} soal. Sertifikat Digital Resmi PT. Akademi Profesional Indonesia telah diterbitkan secara otomatis.` 
          : `Anda menjawab benar ${correctCount} dari ${questions.length} soal. Anda dapat mengulang kembali materi video/PDF dan mencoba kuis lagi.`}
        </p>

        <div class="d-flex justify-content-center gap-3 mt-4">
          ${isPassed ? `
            <button class="btn btn-warning btn-lg" id="btn-claim-cert-inline">
              <i class="fas fa-award"></i> Lihat & Cetak Sertifikat Digital Resmi
            </button>
          ` : `
            <button class="btn btn-secondary" onclick="window.PintarLms.loadModuleContent(2);">
              <i class="fas fa-redo"></i> Coba Kuis Lagi
            </button>
          `}
        </div>
      </div>
    `;

    if (isPassed) {
      document.getElementById('btn-claim-cert-inline').addEventListener('click', () => {
        document.getElementById('lms-player-modal').classList.remove('open');
        this.showCertificateModal();
      });
    }
  }

  exportToExcel() {
    const headers = ['No', 'Nama Peserta', 'Asal Rumah Sakit / Fasyankes', 'Program Diklat Manajemen RS', 'Progres Materi', 'Nilai Ujian (0-100)', 'Status Kelulusan', 'Tanggal Selesai'];
    const rows = this.studentRecords.map((r, i) => [
      r.no,
      `"${r.name}"`,
      `"${r.institution}"`,
      `"${r.course}"`,
      r.progress,
      r.quizScore,
      r.status,
      r.date
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(row => row.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Laporan_Pelatihan_Manajemen_RS_AKAPRO_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    alert('✅ Sukses! Data laporan pelatihan berhasil diunduh dalam format Excel (CSV).');
  }

  showCertificateModal() {
    const modal = document.getElementById('cert-modal');
    if (!modal) return;

    const certId = `AKAPRO-RS/${new Date().getFullYear()}/X/${Math.floor(10000 + Math.random() * 90000)}`;
    const studentNameEl = document.getElementById('cert-name');
    const certCourseEl = document.getElementById('cert-course');
    const certIdEl = document.getElementById('cert-reg-id');
    const certDateEl = document.getElementById('cert-date');

    if (studentNameEl) studentNameEl.textContent = this.studentName;
    if (certCourseEl) certCourseEl.textContent = this.currentCourse ? this.currentCourse.title : 'Bimtek Penyusunan Unit Cost & Clinical Pathway Rumah Sakit (ABC Modifikasi)';
    if (certIdEl) certIdEl.textContent = certId;
    if (certDateEl) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      certDateEl.textContent = new Date().toLocaleDateString('id-ID', options);
    }

    modal.classList.add('open');

    // Name customizer inside modal
    const editNameBtn = document.getElementById('btn-edit-student-name');
    if (editNameBtn) {
      editNameBtn.onclick = () => {
        const newName = prompt('Masukkan Nama Lengkap Beserta Gelar Tenaga Kesehatan / Pejabat RS:', this.studentName);
        if (newName && newName.trim()) {
          this.studentName = newName.trim();
          localStorage.setItem('pintarkita_student_name', this.studentName);
          if (studentNameEl) studentNameEl.textContent = this.studentName;
        }
      };
    }
  }
}

window.PintarLms = new PintarLmsEngine();
