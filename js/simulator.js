/**
 * PINTARKITA - Interactive Product Simulator & Demo Engine
 * Allows potential clients to test-drive features directly on marketing landing pages
 */

const PINTAR_SIMULATORS = {
  // 1. PINTAR UC - Unit Cost & Clinical Pathway Simulator
  renderUnitCostCalc(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <div class="simulator-card glass-panel">
        <div class="sim-header">
          <span class="sim-badge"><i class="fas fa-calculator"></i> Interactive Sandbox</span>
          <h4>Simulasi Perhitungan Unit Cost vs Tarif INA-CBGs</h4>
          <p>Uji coba kalkulasi biaya riil tindakan medis berbasis Clinical Pathway dan evaluasi margin klaim BPJS Kesehatan.</p>
        </div>

        <div class="sim-body grid-2">
          <div class="sim-controls">
            <div class="form-group">
              <label>Pilih Prosedur / Diagnosis Medis:</label>
              <select id="uc-procedure" class="form-control">
                <option value="sc" data-inacbg="7450000" data-direct="4200000" data-indirect="1800000">Sectio Caesarea (SC) Ringan - ICD O82</option>
                <option value="app" data-inacbg="5800000" data-direct="3100000" data-indirect="1400000">Apendektomi Akut - ICD K35</option>
                <option value="cat" data-inacbg="4600000" data-direct="2400000" data-indirect="1100000">Fakoemulsifikasi Katarak - ICD H26</option>
                <option value="dbd" data-inacbg="3900000" data-direct="1800000" data-indirect="950000">Demam Berdarah Dengue (LOS 4 Hari) - ICD A91</option>
              </select>
            </div>

            <div class="form-group">
              <label>Biaya Langsung Medis (BHP, Obat, Honor Nakes):</label>
              <input type="range" id="uc-direct" min="1000000" max="8000000" step="100000" value="4200000" class="sim-slider">
              <div class="slider-val" id="uc-direct-val">Rp 4.200.000</div>
            </div>

            <div class="form-group">
              <label>Biaya Tidak Langsung (Depresiasi, Utilitas, Overhead):</label>
              <input type="range" id="uc-indirect" min="500000" max="4000000" step="50000" value="1800000" class="sim-slider">
              <div class="slider-val" id="uc-indirect-val">Rp 1.800.000</div>
            </div>

            <div class="form-group">
              <label>Target Margin Keuntungan RS (%):</label>
              <input type="number" id="uc-margin" value="20" min="0" max="100" class="form-control">
            </div>
          </div>

          <div class="sim-results glass-inset">
            <h5 class="text-center">Analisis Efisiensi Biaya</h5>
            
            <div class="sim-metric-row">
              <span class="sim-metric-label">Total Unit Cost Riil:</span>
              <strong id="res-total-uc" class="text-primary">Rp 6.000.000</strong>
            </div>

            <div class="sim-metric-row">
              <span class="sim-metric-label">Paket Klaim INA-CBGs:</span>
              <strong id="res-inacbg">Rp 7.450.000</strong>
            </div>

            <div class="sim-metric-row">
              <span class="sim-metric-label">Selisih Margin (vs Klaim):</span>
              <strong id="res-margin" class="text-success">+Rp 1.450.000 (Surplus)</strong>
            </div>

            <div class="sim-metric-row highlight">
              <span class="sim-metric-label">Rekomendasi Tarif (+Margin):</span>
              <strong id="res-suggested-tariff" class="text-warning">Rp 7.200.000</strong>
            </div>

            <div class="sim-progress-bar">
              <div class="sim-progress-fill" id="uc-progress-fill" style="width: 80.5%;"></div>
            </div>
            <small id="uc-status-note" class="text-muted"><i class="fas fa-check-circle text-success"></i> Biaya rumah sakit aman dan berada di bawah plafon klaim BPJS Kesehatan.</small>

            <a href="https://wa.me/6285726112001?text=Halo%20Admin%20PINTARKITA,%20saya%20tertarik%20dengan%20aplikasi%20PINTAR%20UC.%20Mohon%20jadwalkan%20presentasi%20dan%20demo%20lengkapnya." target="_blank" class="btn btn-primary btn-block mt-3 font-bold">
              <i class="fab fa-whatsapp"></i> Konsultasi Implementasi PINTAR UC
            </a>
          </div>
        </div>
      </div>
    `;

    const procSelect = document.getElementById('uc-procedure');
    const directInput = document.getElementById('uc-direct');
    const indirectInput = document.getElementById('uc-indirect');
    const marginInput = document.getElementById('uc-margin');

    const updateCalc = () => {
      const direct = Number(directInput.value);
      const indirect = Number(indirectInput.value);
      const marginPct = Number(marginInput.value) || 0;
      const selectedOpt = procSelect.options[procSelect.selectedIndex];
      const inacbg = Number(selectedOpt.dataset.inacbg);

      const totalUC = direct + indirect;
      const diff = inacbg - totalUC;
      const suggested = totalUC * (1 + marginPct / 100);

      document.getElementById('uc-direct-val').textContent = `Rp ${direct.toLocaleString('id-ID')}`;
      document.getElementById('uc-indirect-val').textContent = `Rp ${indirect.toLocaleString('id-ID')}`;
      document.getElementById('res-total-uc').textContent = `Rp ${totalUC.toLocaleString('id-ID')}`;
      document.getElementById('res-inacbg').textContent = `Rp ${inacbg.toLocaleString('id-ID')}`;
      document.getElementById('res-suggested-tariff').textContent = `Rp ${Math.round(suggested).toLocaleString('id-ID')}`;

      const resMarginEl = document.getElementById('res-margin');
      const progressFill = document.getElementById('uc-progress-fill');
      const noteEl = document.getElementById('uc-status-note');

      const ratio = Math.min((totalUC / inacbg) * 100, 100);
      progressFill.style.width = `${ratio}%`;

      if (diff >= 0) {
        resMarginEl.innerHTML = `<span class="badge badge-success">+Rp ${diff.toLocaleString('id-ID')} (Surplus)</span>`;
        progressFill.style.background = 'linear-gradient(90deg, #10B981, #059669)';
        noteEl.innerHTML = '<i class="fas fa-check-circle text-success"></i> Pengendalian Clinical Pathway optimal. Rumah sakit memperoleh margin positif.';
      } else {
        resMarginEl.innerHTML = `<span class="badge badge-danger">-Rp ${Math.abs(diff).toLocaleString('id-ID')} (Defisit Klaim!)</span>`;
        progressFill.style.background = 'linear-gradient(90deg, #EF4444, #B91C1C)';
        noteEl.innerHTML = '<i class="fas fa-exclamation-triangle text-danger"></i> Biaya riil melampaui tarif klaim INA-CBGs. Perlu evaluasi BHP dan LOS tindakan.';
      }
    };

    procSelect.addEventListener('change', () => {
      const opt = procSelect.options[procSelect.selectedIndex];
      directInput.value = opt.dataset.direct;
      indirectInput.value = opt.dataset.indirect;
      updateCalc();
    });

    directInput.addEventListener('input', updateCalc);
    indirectInput.addEventListener('input', updateCalc);
    marginInput.addEventListener('input', updateCalc);

    updateCalc();
  },

  // 2. PINTAR JP - Remunerasi & Insentif KPI Simulator
  renderJpCalculator(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <div class="simulator-card glass-panel">
        <div class="sim-header">
          <span class="sim-badge"><i class="fas fa-hand-holding-usd"></i> Kalkulator Remunerasi Adil</span>
          <h4>Simulasi Pembagian Jasa Pelayanan Berbasis KPI</h4>
          <p>Hitung alokasi insentif dokter dan nakes dengan parameter skor kinerja individu (IKI) dan pajak PPh 21 TER.</p>
        </div>

        <div class="sim-body grid-2">
          <div class="sim-controls">
            <div class="form-group">
              <label>Total Pendapatan Jasa Pelayanan RS / Bulan:</label>
              <input type="range" id="jp-pool" min="50000000" max="1000000000" step="25000000" value="350000000" class="sim-slider">
              <div class="slider-val" id="jp-pool-val">Rp 350.000.000</div>
            </div>

            <div class="form-group">
              <label>Porsi Alokasi Kelompok Medis Langsung (%):</label>
              <input type="number" id="jp-medis-pct" value="45" min="20" max="70" class="form-control">
            </div>

            <div class="form-group">
              <label>Skor KPI Individu Pegawai (0 - 100):</label>
              <input type="range" id="jp-kpi" min="50" max="100" value="92" class="sim-slider">
              <div class="slider-val" id="jp-kpi-val">92 Poin (Sangat Memuaskan)</div>
            </div>

            <div class="form-group">
              <label>Jabatan Pegawai:</label>
              <select id="jp-role" class="form-control">
                <option value="spesialis" data-bobot="4.5">Dokter Spesialis Bedah (Bobot 4.5)</option>
                <option value="umum" data-bobot="2.5">Dokter Umum Poli (Bobot 2.5)</option>
                <option value="perawat" data-bobot="1.8">Perawat Ahli Kamar Operasi (Bobot 1.8)</option>
                <option value="farmasi" data-bobot="1.5">Apoteker / Farmasi Klinis (Bobot 1.5)</option>
                <option value="admin" data-bobot="1.0">Staf Manajemen / Pendaftaran (Bobot 1.0)</option>
              </select>
            </div>
          </div>

          <div class="sim-results glass-inset">
            <h5 class="text-center">Estimasi Slip Jaspel Digital</h5>
            <div class="sim-metric-row">
              <span class="sim-metric-label">Dana Pool Jaspel Medis:</span>
              <strong id="jp-res-pool-medis" class="text-primary">Rp 157.500.000</strong>
            </div>
            <div class="sim-metric-row">
              <span class="sim-metric-label">Indeks Total Kinerja (Bobot x KPI):</span>
              <strong id="jp-res-indeks">414 Poin</strong>
            </div>
            <div class="sim-metric-row">
              <span class="sim-metric-label">Jasa Pelayanan Bruto:</span>
              <strong id="jp-res-bruto" class="text-primary font-bold">Rp 18.250.000</strong>
            </div>
            <div class="sim-metric-row">
              <span class="sim-metric-label">Potongan Pajak PPh 21 TER:</span>
              <strong id="jp-res-pajak" class="text-danger">-Rp 1.095.000 (6%)</strong>
            </div>
            <div class="sim-metric-row highlight">
              <span class="sim-metric-label">Take Home Pay Insentif Bersih:</span>
              <strong id="jp-res-netto" class="text-success font-xl">Rp 17.155.000</strong>
            </div>

            <p class="small text-muted mt-2"><i class="fas fa-shield-alt text-primary"></i> Transparan, terverifikasi otomatis dengan sistem absensi, mutu rekam medis, dan SOP fasyankes.</p>

            <a href="https://wa.me/6285726112001?text=Halo%20Admin%20PINTARKITA,%20kami%20ingin%20berkonsultasi%20mengenai%20formula%20remunerasi%20PINTAR%20JP%20untuk%20fasyankes%20kami." target="_blank" class="btn btn-primary btn-block mt-3 font-bold">
              <i class="fab fa-whatsapp"></i> Konsultasi Skema Remunerasi PINTAR JP
            </a>
          </div>
        </div>
      </div>
    `;

    const poolInput = document.getElementById('jp-pool');
    const medisPctInput = document.getElementById('jp-medis-pct');
    const kpiInput = document.getElementById('jp-kpi');
    const roleSelect = document.getElementById('jp-role');

    const updateJp = () => {
      const pool = Number(poolInput.value);
      const medisPct = Number(medisPctInput.value) || 45;
      const kpi = Number(kpiInput.value);
      const opt = roleSelect.options[roleSelect.selectedIndex];
      const bobot = Number(opt.dataset.bobot);

      const poolMedis = pool * (medisPct / 100);
      const totalIndex = bobot * kpi;
      
      // Proportional factor mock
      const bruto = (poolMedis / 100) * (totalIndex / 35);
      
      // TER Tax estimation
      let taxPct = 0.05;
      if (bruto > 15000000) taxPct = 0.07;
      if (bruto > 30000000) taxPct = 0.10;
      
      const taxAmount = bruto * taxPct;
      const netto = bruto - taxAmount;

      document.getElementById('jp-pool-val').textContent = `Rp ${pool.toLocaleString('id-ID')}`;
      document.getElementById('jp-kpi-val').textContent = `${kpi} Poin (${kpi >= 90 ? 'Sangat Memuaskan' : kpi >= 75 ? 'Baik' : 'Cukup'})`;
      document.getElementById('jp-res-pool-medis').textContent = `Rp ${Math.round(poolMedis).toLocaleString('id-ID')}`;
      document.getElementById('jp-res-indeks').textContent = `${totalIndex.toFixed(1)} Poin`;
      document.getElementById('jp-res-bruto').textContent = `Rp ${Math.round(bruto).toLocaleString('id-ID')}`;
      document.getElementById('jp-res-pajak').textContent = `-Rp ${Math.round(taxAmount).toLocaleString('id-ID')} (${taxPct * 100}%)`;
      document.getElementById('jp-res-netto').textContent = `Rp ${Math.round(netto).toLocaleString('id-ID')}`;
    };

    poolInput.addEventListener('input', updateJp);
    medisPctInput.addEventListener('input', updateJp);
    kpiInput.addEventListener('input', updateJp);
    roleSelect.addEventListener('change', updateJp);

    updateJp();
  },

  // 3. PINTAR MR - Interactive 5x5 Risk Matrix
  renderRiskMatrix(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <div class="simulator-card glass-panel">
        <div class="sim-header">
          <span class="sim-badge"><i class="fas fa-shield-alt"></i> Standar ISO 31000 & STARKES</span>
          <h4>Matriks Grading Risiko Interaktif 5x5</h4>
          <p>Klik salah satu sel probabilitas & dampak di bawah untuk melihat tingkat keparahan risiko dan tindakan mitigasinya.</p>
        </div>

        <div class="matrix-wrapper">
          <div class="matrix-grid-5x5" id="risk-grid">
            <!-- Dynamically generated 5x5 cells -->
          </div>
        </div>

        <div class="risk-detail-card glass-inset mt-3" id="risk-info-box">
          <h5 id="risk-title">Pilih Sel Matriks untuk Menganalisis</h5>
          <p id="risk-desc">Sistem PINTAR MR secara otomatis mengklasifikasikan risiko ke dalam 4 pita warna (Hijau: Rendah, Kuning: Sedang, Oranye: Tinggi, Merah: Ekstrem) sesuai panduan Komite Nasional Keselamatan Pasien (KNKP).</p>
          <div class="risk-meta-tags" id="risk-tags">
            <span class="tag-pill tag-blue">Investigasi Sederhana</span>
            <span class="tag-pill tag-orange">Review Komite Mutu</span>
          </div>
        </div>

        <a href="https://wa.me/6285726112001?text=Halo%20Admin%20PINTARKITA,%20kami%20butuh%20demo%20aplikasi%20PINTAR%20MR%20untuk%20persiapan%20akreditasi%20rumah%20sakit." target="_blank" class="btn btn-primary btn-block font-bold mt-3">
          <i class="fab fa-whatsapp"></i> Siapkan Manajemen Risiko Fasyankes Anda
        </a>
      </div>
    `;

    const grid = document.getElementById('risk-grid');
    const infoBox = document.getElementById('risk-info-box');
    const titleEl = document.getElementById('risk-title');
    const descEl = document.getElementById('risk-desc');
    const tagsEl = document.getElementById('risk-tags');

    const likelihoods = ['1 - Sangat Jarang', '2 - Jarang', '3 - Mungkin', '4 - Sering', '5 - Sangat Sering'];
    const impacts = ['5 - Katastropik', '4 - Mayor', '3 - Moderat', '2 - Minor', '1 - Tidak Signifikan'];

    // Render cells (rows: impact 5 down to 1; cols: prob 1 to 5)
    grid.innerHTML = '';
    for (let r = 5; r >= 1; r--) {
      for (let c = 1; c <= 5; c++) {
        const score = r * c;
        let colorClass = 'risk-low';
        let band = 'Rendah';

        if (score >= 15 || (r >= 4 && c >= 3)) {
          colorClass = 'risk-extreme';
          band = 'Ekstrem';
        } else if (score >= 8) {
          colorClass = 'risk-high';
          band = 'Tinggi';
        } else if (score >= 4) {
          colorClass = 'risk-moderate';
          band = 'Sedang';
        }

        const cell = document.createElement('div');
        cell.className = `matrix-cell ${colorClass}`;
        cell.innerHTML = `<strong>${score}</strong><small>${band}</small>`;
        cell.dataset.impact = r;
        cell.dataset.prob = c;
        cell.dataset.score = score;
        cell.dataset.band = band;

        cell.addEventListener('click', () => {
          document.querySelectorAll('.matrix-cell').forEach(c => c.classList.remove('selected'));
          cell.classList.add('selected');

          titleEl.innerHTML = `Tingkat Risiko: <span class="badge ${colorClass}">${band} (Skor: ${score})</span>`;
          if (band === 'Ekstrem') {
            descEl.innerHTML = `<strong>Tindakan Wajib:</strong> Lakukan RCA (Root Cause Analysis) komprehensif maksimal dalam 45 hari. Laporkan segera ke Direktur Utama dan Dewan Pengawas. Tindakan mitigasi darurat harus diambil dalam waktu kurang dari 24 jam.`;
            tagsEl.innerHTML = `
              <span class="tag-pill tag-danger"><i class="fas fa-exclamation-triangle"></i> Wajib Investigasi RCA</span>
              <span class="tag-pill tag-danger">Pelaporan Kemenkes 2x24 Jam</span>
              <span class="tag-pill tag-blue">Mitigasi Langsung Direksi</span>
            `;
          } else if (band === 'Tinggi') {
            descEl.innerHTML = `<strong>Tindakan Wajib:</strong> Lakukan investigasi mendalam oleh Komite Mutu & Keselamatan Pasien (KMKP) dalam 14 hari. Kaji ulang SOP operasional dan lakukan redesign proses dengan metode FMEA.`;
            tagsEl.innerHTML = `
              <span class="tag-pill tag-orange"><i class="fas fa-shield-alt"></i> Investigasi Lanjutan</span>
              <span class="tag-pill tag-blue">Pembaruan SOP & FMEA</span>
            `;
          } else if (band === 'Sedang') {
            descEl.innerHTML = `<strong>Tindakan Wajib:</strong> Lakukan investigasi sederhana maksimal 7 hari oleh Kepala Unit terkait. Pantau kepatuhan staf terhadap checklist keselamatan.`;
            tagsEl.innerHTML = `
              <span class="tag-pill tag-warning">Investigasi Sederhana Unit</span>
              <span class="tag-pill tag-blue">Monitoring Bulanan</span>
            `;
          } else {
            descEl.innerHTML = `<strong>Tindakan Wajib:</strong> Risiko dapat diterima dengan prosedur rutin yang berjalan. Lakukan pencatatan pada Risk Register berkala.`;
            tagsEl.innerHTML = `
              <span class="tag-pill tag-success">Risiko Terkendali</span>
              <span class="tag-pill tag-blue">Review Tahunan</span>
            `;
          }
        });

        grid.appendChild(cell);
      }
    }
  },

  // 4. PINTAR PUAS - Survey Kepuasan & Pengaduan
  renderSurveyDemo(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <div class="simulator-card glass-panel">
        <div class="sim-header">
          <span class="sim-badge"><i class="fas fa-smile"></i> KemenPAN-RB No. 14/2017</span>
          <h4>Simulasi Survey Kepuasan Pasien (SKM Digital)</h4>
          <p>Coba langsung bagaimana pasien memberikan feedback lewat smartphone dengan antarmuka yang ramah dan interaktif.</p>
        </div>

        <div class="survey-mockup glass-inset p-3">
          <div class="survey-question">
            <h5>1. Bagaimana keramahan dan kesigapan petugas pendaftaran fasyankes?</h5>
            <div class="smiley-rating" id="rating-group-1">
              <button class="smiley-btn" data-score="1"><span class="emo">😡</span><span>Tidak Puas</span></button>
              <button class="smiley-btn" data-score="2"><span class="emo">🙁</span><span>Kurang</span></button>
              <button class="smiley-btn" data-score="3"><span class="emo">😊</span><span>Puas</span></button>
              <button class="smiley-btn active" data-score="4"><span class="emo">😍</span><span>Sangat Puas</span></button>
            </div>
          </div>

          <div class="survey-question mt-3">
            <h5>2. Bagaimana kecepatan waktu tunggu obat di instalasi farmasi?</h5>
            <div class="smiley-rating" id="rating-group-2">
              <button class="smiley-btn" data-score="1"><span class="emo">😡</span><span>>60 Menit</span></button>
              <button class="smiley-btn" data-score="2"><span class="emo">🙁</span><span>30-60 Mnt</span></button>
              <button class="smiley-btn active" data-score="3"><span class="emo">😊</span><span>15-30 Mnt</span></button>
              <button class="smiley-btn" data-score="4"><span class="emo">😍</span><span><15 Menit</span></button>
            </div>
          </div>

          <div class="survey-summary-box mt-3 p-3 text-center">
            <h6>Indeks Kepuasan Terhitung (IKM):</h6>
            <div class="ikm-score text-success font-xl">88.75 / 100 <span class="badge badge-success">Mutu Pelayanan: A (Sangat Baik)</span></div>
            <p class="small text-muted mt-1">Data survey otomatis tersinkronisasi ke dashboard manajemen & laporan berkala MenPAN-RB.</p>
          </div>

          <div class="text-center mt-3">
            <a href="https://wa.me/6285726112001?text=Halo%20Admin%20PINTARKITA,%20kami%20tertarik%20menggunakan%20aplikasi%20PINTAR%20PUAS%20untuk%20survey%20kepuasan%20dan%20pengaduan." target="_blank" class="btn btn-primary">
              <i class="fas fa-headset"></i> Chat Admin untuk Uji Coba PINTAR PUAS
            </a>
          </div>
        </div>
      </div>
    `;

    document.querySelectorAll('.smiley-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const parent = btn.parentElement;
        parent.querySelectorAll('.smiley-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  },

  // 5. PINTAR KLINIK - Billing & Pajak Simulator
  renderClinicBilling(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <div class="simulator-card glass-panel">
        <div class="sim-header">
          <span class="sim-badge"><i class="fas fa-cash-register"></i> Kasir, Billing & Pajak PMK 168</span>
          <h4>Simulasi Transaksi Billing & Pajak Dokter Klinik</h4>
          <p>Lihat integrasi otomatis antara kasir kasir pasien, fee dokter, dan pemotongan pajak PPh 21 secara realtime.</p>
        </div>

        <div class="sim-body grid-2">
          <div class="sim-controls">
            <div class="form-group">
              <label>Pilih Layanan / Tindakan Pasien:</label>
              <div class="checkbox-group">
                <label class="check-item"><input type="checkbox" id="chk-konsul" checked data-price="150000" data-dokter="120000"> Konsultasi Dokter Umum / Gigi (Rp 150.000)</label>
                <label class="check-item"><input type="checkbox" id="chk-tindakan" checked data-price="250000" data-dokter="180000"> Tindakan Medis / Perawatan Luka (Rp 250.000)</label>
                <label class="check-item"><input type="checkbox" id="chk-lab" data-price="180000" data-dokter="30000"> Pemeriksaan Laboratorium Darah Lengkap (Rp 180.000)</label>
                <label class="check-item"><input type="checkbox" id="chk-obat" checked data-price="120000" data-dokter="0"> Resep Obat Farmasi (Rp 120.000)</label>
              </div>
            </div>

            <div class="form-group">
              <label>Metode Pembayaran:</label>
              <select class="form-control">
                <option>QRIS Dinamis (Real-Time Settlement)</option>
                <option>Debit / Credit Card (EDC)</option>
                <option>Asuransi Swasta / Perusahaan</option>
                <option>Tunai / Cash</option>
              </select>
            </div>
          </div>

          <div class="sim-results glass-inset p-3 thermal-receipt">
            <div class="receipt-header text-center">
              <h6>KLINIK PRATAMA PINTARKITA</h6>
              <small>Jl. Kesehatan No. 45 Jakarta | SATUSEHAT Bridged</small>
              <hr class="receipt-dash">
            </div>

            <div class="receipt-items" id="receipt-items-list">
              <!-- Rendered items -->
            </div>

            <hr class="receipt-dash">
            <div class="receipt-row"><span>Total Tagihan Pasien:</span><strong id="rcpt-total" class="text-primary font-bold">Rp 520.000</strong></div>
            <div class="receipt-row"><span>Hak Jasa Medis Dokter:</span><strong id="rcpt-dokter">Rp 300.000</strong></div>
            <div class="receipt-row"><span>Potongan PPh 21 Dokter (5%):</span><strong id="rcpt-pajak" class="text-danger">-Rp 15.000</strong></div>
            <div class="receipt-row highlight"><span>Net Jasa Dokter:</span><strong id="rcpt-dokter-net" class="text-success">Rp 285.000</strong></div>
            <div class="receipt-row"><span>Pendapatan Bersih Klinik:</span><strong id="rcpt-klinik" class="text-primary">Rp 220.000</strong></div>

            <div class="text-center mt-3">
              <span class="badge badge-success"><i class="fas fa-check"></i> Jurnal Akuntansi & Kartu Stok Otomatis Terupdate</span>
            </div>

            <a href="https://wa.me/6285726112001?text=Halo%20Admin%20PINTARKITA,%20saya%20ingin%20berlangganan%20aplikasi%20PINTAR%20KLINIK%20lengkap%20dengan%20perpajakan." target="_blank" class="btn btn-primary btn-block mt-3 font-bold">
              <i class="fab fa-whatsapp"></i> Dapatkan Demo PINTAR KLINIK
            </a>
          </div>
        </div>
      </div>
    `;

    const checkboxes = container.querySelectorAll('input[type="checkbox"]');
    const updateReceipt = () => {
      let total = 0;
      let totalDokter = 0;
      const listEl = document.getElementById('receipt-items-list');
      if (!listEl) return;
      listEl.innerHTML = '';

      checkboxes.forEach(chk => {
        if (chk.checked) {
          const price = Number(chk.dataset.price);
          const dokter = Number(chk.dataset.dokter);
          total += price;
          totalDokter += dokter;

          const row = document.createElement('div');
          row.className = 'receipt-row';
          row.innerHTML = `<span>${chk.parentElement.textContent.split('(')[0].trim()}</span><span>Rp ${price.toLocaleString('id-ID')}</span>`;
          listEl.appendChild(row);
        }
      });

      const pajak = totalDokter * 0.05;
      const dokterNet = totalDokter - pajak;
      const klinikNet = total - totalDokter;

      document.getElementById('rcpt-total').textContent = `Rp ${total.toLocaleString('id-ID')}`;
      document.getElementById('rcpt-dokter').textContent = `Rp ${totalDokter.toLocaleString('id-ID')}`;
      document.getElementById('rcpt-pajak').textContent = `-Rp ${pajak.toLocaleString('id-ID')}`;
      document.getElementById('rcpt-dokter-net').textContent = `Rp ${dokterNet.toLocaleString('id-ID')}`;
      document.getElementById('rcpt-klinik').textContent = `Rp ${klinikNet.toLocaleString('id-ID')}`;
    };

    checkboxes.forEach(chk => chk.addEventListener('change', updateReceipt));
    updateReceipt();
  },

  // 6. PINTAR MMPI-2 - Interactive Assessment Simulator
  renderMmpiSimulator(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <div class="simulator-card glass-panel">
        <div class="sim-header">
          <span class="sim-badge"><i class="fas fa-brain"></i> MMPI-2 Web-Based Real-Time</span>
          <h4>Simulasi Uji Coba Psikotes MMPI-2 & Skoring Otomatis</h4>
          <p>Jawab 4 butir contoh pernyataan di bawah ini untuk melihat bagaimana algoritma langsung menghasilkan Profil Validitas dan Skala Klinis.</p>
        </div>

        <div class="sim-body grid-2">
          <div class="sim-controls">
            <div class="mmpi-sample-q">
              <p>1. "Saya merasa bangun tidur dengan perasaan segar dan bertenaga hampir setiap pagi."</p>
              <div class="btn-group-toggle">
                <button class="btn btn-outline-primary mmpi-btn active" data-q="1" data-val="T">Benar</button>
                <button class="btn btn-outline-primary mmpi-btn" data-q="1" data-val="F">Salah</button>
              </div>
            </div>

            <div class="mmpi-sample-q mt-3">
              <p>2. "Saya tidak pernah berbohong seumur hidup saya, bahkan untuk hal terkecil."</p>
              <div class="btn-group-toggle">
                <button class="btn btn-outline-primary mmpi-btn" data-q="2" data-val="T">Benar</button>
                <button class="btn btn-outline-primary mmpi-btn active" data-q="2" data-val="F">Salah</button>
              </div>
              <small class="text-muted"><i class="fas fa-info-circle"></i> Menguji Skala L (Lie Scale)</small>
            </div>

            <div class="mmpi-sample-q mt-3">
              <p>3. "Saya merasa sering memikirkan hal-hal yang terlalu buruk untuk dibicarakan."</p>
              <div class="btn-group-toggle">
                <button class="btn btn-outline-primary mmpi-btn" data-q="3" data-val="T">Benar</button>
                <button class="btn btn-outline-primary mmpi-btn active" data-q="3" data-val="F">Salah</button>
              </div>
            </div>

            <div class="mmpi-sample-q mt-3">
              <p>4. "Saya memiliki nafsu makan yang normal seperti orang sehat pada umumnya."</p>
              <div class="btn-group-toggle">
                <button class="btn btn-outline-primary mmpi-btn active" data-q="4" data-val="T">Benar</button>
                <button class="btn btn-outline-primary mmpi-btn" data-q="4" data-val="F">Salah</button>
              </div>
            </div>
          </div>

          <div class="sim-results glass-inset p-3">
            <h5 class="text-center">Profil Hasil MMPI-2 Real-Time</h5>
            
            <div class="validity-scale-bars">
              <div class="scale-bar-item">
                <div class="scale-label"><span>Skala L (Lie):</span> <strong>T-Score 48 (Valid)</strong></div>
                <div class="scale-track"><div class="scale-fill bg-success" style="width: 48%;"></div></div>
              </div>
              <div class="scale-bar-item mt-2">
                <div class="scale-label"><span>Skala F (Infrequency):</span> <strong>T-Score 52 (Valid)</strong></div>
                <div class="scale-track"><div class="scale-fill bg-success" style="width: 52%;"></div></div>
              </div>
              <div class="scale-bar-item mt-2">
                <div class="scale-label"><span>Skala K (Defensiveness):</span> <strong>T-Score 55 (Optimal)</strong></div>
                <div class="scale-track"><div class="scale-fill bg-primary" style="width: 55%;"></div></div>
              </div>
            </div>

            <hr class="my-3">
            <h6>Interpretasi Ringkas Psikolog Klinis:</h6>
            <div class="alert alert-success small">
              <strong>Profil Valid:</strong> Peserta menjawab secara kooperatif, jujur, dan tidak terdeteksi kecenderungan memalsukan jawaban ke arah baik (faking good) maupun ke arah buruk (faking bad).
            </div>

            <div class="text-center mt-3">
              <a href="https://wa.me/6285726112001?text=Halo%20Admin%20PINTARKITA,%20saya%20ingin%20jadwalkan%20demo%20aplikasi%20PINTAR%20MMPI-2%20untuk%20RS%20/%20Klinik%20/%20Institusi." target="_blank" class="btn btn-primary btn-block font-bold">
                <i class="fas fa-headset"></i> Chat Admin untuk Uji Coba MMPI-2
              </a>
            </div>
          </div>
        </div>
      </div>
    `;

    container.querySelectorAll('.btn-group-toggle .mmpi-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const parent = btn.parentElement;
        parent.querySelectorAll('.mmpi-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  }
};

window.PINTAR_SIMULATORS = PINTAR_SIMULATORS;
