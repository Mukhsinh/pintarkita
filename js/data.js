/**
 * PINTARKITA - Master Data & Product Knowledge
 * Layanan dari PT. AKADEMI PROFESIONAL INDONESIA (AKAPRO)
 * WhatsApp Admin: 085726112001
 */

const PINTAR_DATA = {
  adminWhatsApp: '6285726112001',
  adminDisplayPhone: '085726112001',
  picName: 'Mukhsin Hadi, SE, M.Si',
  companyName: 'PT. AKADEMI PROFESIONAL INDONESIA',
  companyShort: 'AKAPRO',
  tagline: 'Optimasi Nilai dengan Talenta Terampil Berbasis Teknologi',
  slogan: 'Membangun Entitas. Tumbuh Melesat. Berdampak Nyata.',

  // 6 Core Applications for Hospital & Fasyankes Management
  products: {
    'pintar-uc': {
      id: 'pintar-uc',
      name: 'PINTAR UC',
      fullName: 'Sistem Manajemen Unit Cost Terintegrasi Rumah Sakit',
      hakiNo: 'HAKI No: 000831709',
      menuBadge: 'Unit cost',
      tagline: 'Kelola Biaya dengan Cerdas, Ukur dengan Tepat, Layani dengan Bermutu, Kelola untuk Masa Depan',
      shortDesc: 'Aplikasi berbasis web untuk pengelolaan unit cost RS akurat, transparan, dan efisien berbasis Activity-Based Costing (ABC) Modifikasi terintegrasi Clinical Pathway.',
      icon: 'assets/icons/pintar-uc.svg',
      badge: 'Unit Cost RS • HAKI 000831709',
      themeColor: '#0052D4',
      accentColor: '#FF7A00',
      heroImage: 'assets/images/pintar-uc-info.jpg',
      stat1: { value: '38%', label: 'Efisiensi Biaya RS' },
      stat2: { value: 'ABC Modif', label: 'Metode Perhitungan' },
      stat3: { value: 'Real Cost', label: 'Bukan Asumsi' },
      summary: 'PINTAR UC adalah sistem aplikasi berbasis web untuk pengelolaan unit cost rumah sakit secara akurat, transparan, dan efisien berbasis metode Activity-Based Costing (ABC) Modifikasi. Terintegrasi dengan Clinical Pathway sesuai regulasi Kemenkes untuk penetapan tarif layanan yang presisi dan rasional.',
      problemStatement: 'Tanpa Unit Cost yang andal, risiko biaya membengkak dan RS terancam! Biaya tidak jelas, keputusan hanya berdasarkan asumsi, pemborosan tidak terdeteksi, likuiditas menurun, dan manajemen berjalan tanpa arah.',
      solutionHighlights: [
        'Pengelolaan Bahan: Kelola data bahan medis dan non-medis terpusat, terstruktur, dan real-time',
        'Proyeksi Biaya: Proyeksi kebutuhan bahan dan biaya berdasarkan tren historis dan prediksi cerdas',
        'Analisis Cost: Analisis mendalam terhadap komponen biaya untuk pengambilan keputusan berbasis data',
        'Penetapan Tarif: Perhitungan tarif layanan yang kompetitif, transparan, rasional, dan sesuai regulasi',
        'Penganggaran BHP: Perencanaan dan penganggaran Bahan Habis Pakai (BHP) terstruktur untuk kendali biaya',
        'Analisis Produk: Evaluasi kinerja dan profitabilitas produk layanan untuk peningkatan keberlanjutan'
      ],
      features: [
        {
          title: 'Activity-Based Costing (ABC) Modifikasi',
          desc: 'Mengalokasikan biaya berdasarkan aktivitas dan cost driver yang menyebabkan biaya terjadi secara presisi.',
          icon: 'fas fa-calculator'
        },
        {
          title: 'Integrasi Clinical Pathway Medis',
          desc: 'Standarisasi proses klinis berdasarkan bukti medis, estimasi biaya per episode layanan, serta monitoring variasi biaya.',
          icon: 'fas fa-notes-medical'
        },
        {
          title: 'Dashboard Unit Cost Real-Time',
          desc: 'Ringkasan total unit cost per layanan, tren unit cost periode berjalan, perbandingan antarlayanan, dan analisis varians.',
          icon: 'fas fa-chart-line'
        },
        {
          title: 'Pengendalian Biaya & Efisiensi Operasional',
          desc: 'Top Cost Driver sumber biaya utama, kepatuhan terhadap regulasi Kemenkes, serta transparansi & akuntabilitas audit BPKP/Inspektorat.',
          icon: 'fas fa-shield-alt'
        }
      ],
      benefits: [
        'Data Real Cost menjadi acuan akurat, bukan lagi asumsi biaya semata',
        'Pengambilan keputusan manajemen lebih tepat, berbasis data dan terukur',
        'Efisiensi & produktivitas meningkat, pemborosan biaya dapat dikendalikan',
        'Stabilitas keuangan terjaga, likuiditas sehat, dan direksi manajemen lebih tenang'
      ],
      compliance: ['Permenkes No. 85/2015 Pola Tarif RS', 'Permendagri 79/2018 (BLUD)', 'HAKI Kemenkumham No. 000831709', 'Standar Tarif INA-CBGs Kemenkes'],
      interactiveDemoType: 'unit-cost-calc'
    },

    'pintar-jp': {
      id: 'pintar-jp',
      name: 'PINTAR JP',
      fullName: 'Distribusi Insentif Jasa Pelayanan Terintegrasi dengan KPI',
      hakiNo: 'HAKI No: 001299375',
      menuBadge: 'Remunerasi',
      tagline: 'Kinerja Baik, Insentif Tepat, Layanan Makin Hebat! Kemudahan dan Akuntabilitas Remunerasi RS',
      shortDesc: 'Aplikasi berbasis web integratif untuk mengelola, menghitung, dan mendistribusikan insentif jasa pelayanan berbasis KPI secara transparan, adil, cepat, dan akuntabel.',
      icon: 'assets/icons/pintar-jp.svg',
      badge: 'Remunerasi Jaspel • HAKI 001299375',
      themeColor: '#0052D4',
      accentColor: '#FF7A00',
      heroImage: 'assets/images/pintar-jp-info.jpg',
      stat1: { value: 'P1-P2-P3', label: 'Komponen Terstruktur' },
      stat2: { value: '100%', label: 'Transparan & Auditabel' },
      stat3: { value: 'PPh 21', label: 'Pajak TER Terintegrasi' },
      summary: 'PINTAR JP merupakan sistem aplikasi berbasis web integratif untuk mendukung distribusi insentif jasa pelayanan yang terintegrasi dengan indikator kinerja pegawai, transparan, akuntabel, dan dapat ditelusuri. Membantu manajemen menghubungkan kinerja utama, kinerja tambahan, serta perilaku/potensi dengan distribusi insentif sesuai kebijakan organisasi.',
      problemStatement: 'Distribusi jasa pelayanan yang tidak transparan adalah bom waktu bagi produktivitas rumah sakit! Rentan konflik, rawan salah rumus Excel, dan ketiadaan korelasi antara kinerja nyata dengan insentif yang diterima.',
      solutionHighlights: [
        'Penyusunan Rencana Teknis Pembagian: Menetapkan alokasi dana secara makro sesuai porsi kelompok',
        'Penyusunan Format Pembagian: Berbasis kinerja, proporsi, dan Indeks Rupiah (PIR) untuk menjamin keadilan',
        'Penyusunan Indeks KPI: Merumuskan variabel P1 (Kinerja Utama), P2 (Kinerja Tambahan), dan P3 (Perilaku/Potensi)',
        'Penyusunan Regulasi (Perkada & Perdir): Legalisasi aspek hukum distribusi melalui Peraturan Daerah/Direktur',
        'Implementasi Berbasis Sistem: Digitalisasi formula ke platform PINTAR JP, menghilangkan proses manual',
        'Slip Jaspel Digital & Laporan Pajak PPh 21: Penerbitan slip insentif digital mandiri dan kalkulasi pajak terintegrasi'
      ],
      features: [
        {
          title: 'Formula P1, P2, P3 Terstandar',
          desc: 'P1 Kinerja Utama (Produktivitas, mutu, kepatuhan klinis), P2 Kinerja Tambahan (Inovasi, kolaborasi), P3 Perilaku (Integritas, disiplin).',
          icon: 'fas fa-users-cog'
        },
        {
          title: '9 Langkah Strategis Distribusi',
          desc: 'Alur sistematis dari pengukuran kinerja, verifikasi online atasan, hingga transfer terjadwal ke rekening pegawai.',
          icon: 'fas fa-tasks'
        },
        {
          title: 'Slip Penerimaan Jaspel Digital',
          desc: 'Penerbitan slip digital detail dan personal: poin indeks rupiah per KPI, detail perpajakan, dan insentif bersih.',
          icon: 'fas fa-file-invoice-dollar'
        },
        {
          title: 'Laporan Perpajakan PPh 21 TER Otomatis',
          desc: 'Kalkulasi otomatis potongan PPh 21 dan BPJS Ketenagakerjaan yang terintegrasi langsung dengan slip insentif.',
          icon: 'fas fa-balance-scale'
        }
      ],
      benefits: [
        'Motivasi kerja pegawai meningkat karena reward berbasis kinerja nyata',
        'Kualitas layanan medis meningkat dan kepuasan pasien terjaga',
        'Pengelolaan insentif lebih tepat sasaran dan hemat waktu pengerjaan',
        'Tata kelola transparan, akuntabel, serta bebas dari kecemburuan internal'
      ],
      compliance: ['Permendagri 79/2018 (Pedoman BLUD)', 'PMK No. 168/2023 (Pajak PPh 21 TER)', 'HAKI No. 001299375', 'Regulasi Perkada / Perdir RS'],
      interactiveDemoType: 'jp-calculator'
    },

    'pintar-mr': {
      id: 'pintar-mr',
      name: 'PINTAR MR',
      fullName: 'Sistem Manajemen Risiko Terintegrasi Renstra Rumah Sakit',
      hakiNo: 'HAKI No: 001299405',
      menuBadge: 'risiko',
      tagline: 'Strategi Tanpa Risiko Itu Bunuh Diri. Risiko Tanpa Strategi Itu Mimpi! Lebih Siap Menghadapi Risiko, Lebih Dekat Mencapai Tujuan',
      shortDesc: 'Platform digital terintegrasi untuk menyusun Renstra, menetapkan KPI, mengelola Risiko klinis & non-klinis, memonitor capaian, dan menghasilkan laporan kinerja realtime komprehensif.',
      icon: 'assets/icons/pintar-mr.svg',
      badge: 'Manajemen Risiko RS • HAKI 001299405',
      themeColor: '#0052D4',
      accentColor: '#FF7A00',
      heroImage: 'assets/images/pintar-mr-info.jpg',
      stat1: { value: 'Renstra', label: 'Terintegrasi Penuh' },
      stat2: { value: '5x5 Matrix', label: 'Heatmap Diagram' },
      stat3: { value: 'Klinis & Non', label: 'Kategori Risiko' },
      summary: 'PINTAR MR (HAKI No: 001299405) merupakan sistem aplikasi berbasis web terintegrasi untuk pengelolaan manajemen risiko rumah sakit yang selaras dengan manajemen rencana strategis (renstra). Dirancang untuk mendukung pengambilan keputusan berbasis data, meningkatkan kepatuhan regulasi/akreditasi, dan membangun budaya risiko positif di seluruh lini organisasi.',
      problemStatement: 'Tanpa konektivitas, strategi hanya jadi dokumen di lemari! Risiko klinis (Medical Error, HAIs, Keterlambatan Diagnosis) dan Risiko Non-Klinis (Keuangan, SDM, Cybersecurity, Legal) sering tidak terpantau sehingga mengancam kelangsungan RS.',
      solutionHighlights: [
        'Penyusunan Renstra & Penetapan KPI: Visi, misi, sasaran strategis, analisis SWOT terintegrasi cascading KPI',
        'Identifikasi & Analisis Risiko: Pemetaan profil risiko klinis dan non-klinis sesuai Kepmenkes 1354/2024 & ISO 31000',
        'Analisis Matriks 5x5 Interaktif: Penilaian probabilitas & dampak risiko berbasis diagram kartesius heatmap',
        'Mitigasi & Pengendalian: Penetapan rencana aksi mitigasi, PIC penanggung jawab, dan monitoring efektivitas',
        'Strategic Map Integrated: Pemetaan peta jalan strategis rumah sakit dengan 4 perspektif BSC (Keuangan, Pelanggan, Proses Internal, SDM/Infrastruktur)',
        'Dashboard & Pelaporan Kinerja: Dashboard eksekutif realtime, pelaporan berkala, dan ekspor otomatis'
      ],
      features: [
        {
          title: 'Pemetaan Risiko Klinis & Non-Klinis',
          desc: 'Memantau risiko medis (HAIs, Medication Error, Sentinel) dan risiko non-medis (Cash flow, IT, Sarpras, Regulasi).',
          icon: 'fas fa-shield-alt'
        },
        {
          title: 'Matriks TOWS / SWOT & Strategic Map',
          desc: 'Analisis kekuatan, kelemahan, peluang, ancaman, dan cascading KPI risiko berbasis diagram heatmap interaktif.',
          icon: 'fas fa-sitemap'
        },
        {
          title: 'Peringatan & Pengingat Tindak Lanjut',
          desc: 'Notifikasi otomatis atas mitigasi risiko yang mendekati batas waktu atau memiliki skor risiko ekstrem.',
          icon: 'fas fa-bell'
        },
        {
          title: 'Dasar Hukum & Standar Regulasi',
          desc: 'Selaras dengan Permendagri 79/2018, Kepmenkes HK.01.07/MENKES/1354/2024, ISO 31000:2018, dan Akreditasi STARKES.',
          icon: 'fas fa-gavel'
        }
      ],
      benefits: [
        'Menyelaraskan Rencana Strategis (Renstra) dengan Manajemen Risiko Rumah Sakit',
        'Mencapai target kinerja RS yang terukur, terkendali, dan terpantau berkala',
        'Mencegah risiko hukum, menjaga keselamatan pasien, dan meningkatkan mutu layanan',
        'Mendukung akuntabilitas tata kelola yang baik (Good Hospital Governance)'
      ],
      compliance: ['Kepmenkes HK.01.07/MENKES/1354/2024', 'ISO 31000:2018 Risk Management', 'Permendagri 79/2018', 'HAKI No. 001299405'],
      interactiveDemoType: 'risk-matrix'
    },

    'pintar-puas': {
      id: 'pintar-puas',
      name: 'PINTAR PUAS',
      fullName: 'Sistem Manajemen Komplain, Survei Kepuasan & Permohonan Informasi Publik Terintegrasi',
      menuBadge: 'SKM & PPID',
      tagline: 'Satu Aplikasi, Semua Solusi: Layanan Publik Lebih Transparan, Masyarakat Lebih Puas!',
      shortDesc: 'Platform terintegrasi untuk mengelola komplain, aduan, survei kepuasan pasien, dan permohonan informasi publik secara digital, cepat, transparan, dan akuntabel.',
      icon: 'assets/icons/pintar-puas.svg',
      badge: 'Solusi Layanan Prima RS',
      themeColor: '#0052D4',
      accentColor: '#FF7A00',
      heroImage: 'assets/images/pintar-puas-info.jpg',
      stat1: { value: '9 Unsur', label: 'SKM MenPAN-RB' },
      stat2: { value: 'PPID RS', label: 'Keterbukaan Informasi' },
      stat3: { value: 'Ombudsman', label: 'Bebas Maladministrasi' },
      summary: 'PINTAR PUAS adalah sistem terintegrasi untuk mengelola komplain, aduan, dan survei kepuasan pasien secara digital, cepat, transparan, dan akuntabel. Didukung untuk kebutuhan strategis PPID (Keterbukaan Informasi Publik), Ombudsman, Evaluasi Kinerja BLUD, Indeks Kepuasan Masyarakat (IKM), dan Inovasi Pelayanan Rumah Sakit.',
      problemStatement: 'Komplain pasien yang tidak tercatat dan lambat direspons sering viral di media sosial, menurunkan citra rumah sakit, serta survei kepuasan manual sulit direkapitulasi secara valid untuk evaluasi mutu.',
      solutionHighlights: [
        'Komplain & Aduan Online: Pasien dapat menyampaikan keluhan dengan mudah, cepat, dan aman via smartphone/QR',
        'Survei Kepuasan Digital: Pengumpulan penilaian pasien secara real-time melalui survei yang terintegrasi (PermenPAN-RB No. 14/2017)',
        'Dashboard Analitik: Pantau performa layanan dengan data akurat dan visualisasi interaktif per unit/poli',
        'Ticket Tracking System: Setiap aduan/tiket terpantau statusnya secara transparan dan ber-SLA',
        'Laporan Otomatis: Unduh laporan dalam format Excel/PDF secara instan untuk evaluasi berkala dan laporan Dinkes/Kemenkes',
        'Keamanan Data Terjamin: Sistem aman berbasis peran (Role-Based Access) dan standar perlindungan data pasien'
      ],
      features: [
        {
          title: 'Komplain Manajemen Terpadu',
          desc: 'Respons cepat, terukur, dan tuntas dengan eskalasi otomatis ke manajemen pelayanan jika melewati SLA.',
          icon: 'fas fa-comments'
        },
        {
          title: 'Survei Kepuasan Pasien (SKM)',
          desc: 'Mendengar suara pasien secara objektif untuk mengukur kualitas layanan rawat inap, rawat jalan, dan farmasi.',
          icon: 'fas fa-poll-h'
        },
        {
          title: 'Modul Permohonan Informasi (PPID)',
          desc: 'Mendukung keterbukaan informasi publik rumah sakit secara mudah, transparan, dan akuntabel.',
          icon: 'fas fa-info-circle'
        },
        {
          title: 'Dukungan Standar Ombudsman & KemenPAN-RB',
          desc: 'Menjamin standar mutu pelayanan publik bebas maladministrasi dan memenuhi standar penilaian WBK/WBBM.',
          icon: 'fas fa-shield-alt'
        }
      ],
      benefits: [
        'Meningkatkan kualitas layanan dan reputasi positif rumah sakit di mata masyarakat',
        'Respon komplain lebih cepat, tepat sasaran, dan terpantau langsung oleh direksi',
        'Data kepuasan akurat sebagai dasar pengambilan keputusan evaluasi kinerja unit kerja',
        'Mudah digunakan kapan saja dan di mana saja oleh pasien maupun staf rumah sakit'
      ],
      compliance: ['PermenPAN-RB No. 14/2017 Pedoman SKM', 'UU No. 14/2008 Keterbukaan Informasi Publik (PPID)', 'UU No. 25/2009 Pelayanan Publik'],
      interactiveDemoType: 'survey-demo'
    },

    'pintar-klinik': {
      id: 'pintar-klinik',
      name: 'PINTAR KLINIK',
      fullName: 'Aplikasi Manajemen Klinik Terintegrasi Pendaftaran, Kasir, Stok, Biaya, Lapkeu & Pajak',
      menuBadge: 'Klinik & Pajak',
      tagline: 'Solusi Lengkap Klinik Pratama & Utama: Rekam Medis Elektronik (RME) SATUSEHAT, Kasir POS, Gudang Obat, Lapkeu & Pajak PMK 168',
      shortDesc: 'Aplikasi manajemen klinik dari pendaftaran, antrean, kasir, manajemen stok farmasi, biaya, laporan keuangan standar akuntansi dan terintegrasi dengan perpajakan.',
      icon: 'assets/icons/pintar-klinik.svg',
      badge: 'SIM Klinik & Pajak',
      themeColor: '#0052D4',
      accentColor: '#FF7A00',
      heroImage: 'assets/images/pintar-klinik-3d.jpg',
      stat1: { value: 'SATUSEHAT', label: 'Bridging Kemenkes' },
      stat2: { value: 'PMK 168', label: 'PPh 21 TER Dokter' },
      stat3: { value: '100% RME', label: 'Permenkes 24/2022' },
      summary: 'PINTAR KLINIK adalah software manajemen operasional dan keuangan terlengkap untuk Klinik Pratama, Klinik Utama, dan Rumah Sakit Khusus. Menggabungkan alur pendaftaran, antrean display, Rekam Medis Elektronik (RME) terstandar SATUSEHAT Kemenkes, kasir POS multipayment, kontrol stok obat apotek FEFO, hingga pembukuan akuntansi otomatis dan kalkulator perpajakan dokter.',
      problemStatement: 'Klinik sering mengalami kebocoran stok obat, selisih uang kasir, kesulitan bridging RME ke SATUSEHAT Kemenkes, serta kebingungan menghitung pajak PPh 21 dokter sesuai skema TER PMK 168/2023.',
      solutionHighlights: [
        'Pendaftaran Pasien & Display Antrean Multi-Poli Ruang Tunggu dengan Panggilan Audio Suara',
        'Rekam Medis Elektronik (RME) Standar Kemenkes RI Siap Interoperabilitas SATUSEHAT',
        'Kasir & Billing Cepat: Cetak struk nota instan, integrasi QRIS, Debit, Asuransi, dan pemisahan jasa dokter',
        'Manajemen Inventori Apotek: Kartu stok otomatis, peringatan obat kedaluwarsa (ED), dan resep elektronik',
        'Laporan Keuangan Otomatis (Neraca, Laba Rugi, Buku Kas) langsung membentuk jurnal debet-kredit',
        'Tax Engine Terintegrasi: Perhitungan otomatis PPh 21 Dokter skema TER PMK 168, PPh 23, dan rekap bukti potong'
      ],
      features: [
        {
          title: 'Kasir & Billing Thermal POS',
          desc: 'Cetak nota struk kasir, perhitungan diskon promosi, rekonsiliasi kas harian per shift kasir, dan split bill.',
          icon: 'fas fa-cash-register'
        },
        {
          title: 'Farmasi & Smart Stock Control',
          desc: 'Kartu stok otomatis berkurang saat resep ditebus, kontrol stok minimum, dan peringatan kedaluwarsa obat.',
          icon: 'fas fa-pills'
        },
        {
          title: 'Bridging SATUSEHAT Kemenkes',
          desc: 'Sinkronisasi data rekam medis pasien sesuai mandat Permenkes No. 24/2022 tanpa kendala teknis.',
          icon: 'fas fa-network-wired'
        },
        {
          title: 'Perpajakan Terpadu PMK 168/2023',
          desc: 'Otomatisasi pemotongan PPh 21 dokter umum & spesialis sesuai kategori TER, bukti potong siap lapor SPT.',
          icon: 'fas fa-balance-scale'
        }
      ],
      benefits: [
        'Klinik aman dan patuh penuh terhadap regulasi RME Kemenkes & interoperabilitas SATUSEHAT',
        'Mencegah 100% kebocoran stok obat dan ketidaksesuaian kas fisik kasir',
        'Owner klinik dapat memantau pendapatan harian dan laba bersih secara live dari ponsel',
        'Kepatuhan pajak dokter dan badan usaha klinik terjamin tanpa perlu biaya konsultan mahal'
      ],
      compliance: ['Permenkes No. 24/2022 (RME)', 'Interoperabilitas SATUSEHAT Kemenkes', 'PMK No. 168/2023 (Pajak TER)', 'Standar Akuntansi Keuangan (SAK)'],
      interactiveDemoType: 'clinic-billing'
    },

    'pintar-mmpi-2': {
      id: 'pintar-mmpi-2',
      name: 'PINTAR MMPI-2',
      fullName: 'Aplikasi Psikotes MMPI-2 Sesuai Standar Berbasis Web & Realtime',
      menuBadge: 'Psikotes MCU',
      tagline: 'Tes Minnesota Multiphasic Personality Inventory (MMPI-2) Digital 567 Soal Baku dengan Skoring Cepat, Akurat, dan Validitas Teruji',
      shortDesc: 'Aplikasi psikotes MMPI-2 sesuai standar baku internasional berbasis web-based dan terintegrasi dengan hasil psikogram secara langsung dan realtime.',
      icon: 'assets/icons/pintar-mmpi.svg',
      badge: 'Psikotes MMPI-2 • MCU RS',
      themeColor: '#0052D4',
      accentColor: '#FF7A00',
      heroImage: 'assets/images/pintar-mmpi-info.jpg',
      stat1: { value: '567 Soal', label: 'Standar Baku' },
      stat2: { value: 'Detik', label: 'Skoring Realtime' },
      stat3: { value: 'T-Score', label: 'Profil Validitas & Klinis' },
      summary: 'PINTAR MMPI-2 adalah solusi psikotes berbasis web yang mengotomatisasi pengujian dan skoring inventori kepribadian terpopuler di dunia (MMPI-2 / 567 butir soal). Digunakan oleh Dokter Spesialis Kedokteran Jiwa (Sp.KJ), Psikolog Klinis, Instalasi MCU Rumah Sakit Umum dan RS Jiwa untuk seleksi pejabat publik, CPNS, Caleg, calon dokter spesialis (PPDS), dan evaluasi klinis kejiwaan.',
      problemStatement: 'Skoring manual MMPI-2 memakan waktu 1-2 jam per peserta, rawan salah hitung koreksi skor K, dan tidak memungkinkan menangani ratusan peserta seleksi MCU massal secara bersamaan.',
      solutionHighlights: [
        'Ujian Online Terstandar 567 Soal: Antarmuka responsif ramah pengguna (dapat dikerjakan via Laptop, Tablet, PC)',
        'Skala Validitas Otomatis: Deteksi manipulasi jawaban melalui Skala L (Lie), F (Infrequency), K (Correction), VRIN, dan TRIN',
        'Skala Klinis Lengkap: 1 Hs (Hypochondriasis), 2 D (Depression), 3 Hy (Hysteria), 4 Pd, 5 Mf, 6 Pa, 7 Pt, 8 Sc, 9 Ma, 0 Si',
        'Grafik Psikogram T-Score Berwarna: Visualisasi kurva profil kepribadian baku dengan garis batas deviasi (T > 65)',
        'Laporan Naratif Interpretasi Instan: Siap ditinjau dan ditandatangani secara digital oleh Psikiater (dr. Sp.KJ) atau Psikolog Klinis'
      ],
      features: [
        {
          title: 'Algoritma Skoring Instan Real-Time',
          desc: 'Hasil T-Score dan koreksi skala K langsung terhitung dalam hitungan detik begitu tombol selesai diklik.',
          icon: 'fas fa-brain'
        },
        {
          title: 'Assessment Massal (Batch Examination)',
          desc: 'Mampu menyelenggarakan ujian MCU serentak hingga ratusan peserta tanpa kendala lag server.',
          icon: 'fas fa-users'
        },
        {
          title: 'Deteksi Validitas & Kejujuran Jawaban',
          desc: 'Mendeteksi otomatis upaya faking good (tampil terlalu sempurna) maupun faking bad (membesar-besarkan gangguan).',
          icon: 'fas fa-user-check'
        },
        {
          title: 'Export PDF Laporan Resmi Terenkripsi',
          desc: 'Menghasilkan berkas rekam medis psikologis berbarcode pengaman rahasia medis.',
          icon: 'fas fa-file-pdf'
        }
      ],
      benefits: [
        'Memangkas waktu skoring psikotes MCU RS dari berhari-hari menjadi hitungan detik',
        'Akurasi 100% bebas dari risiko human error perhitungan transparansi manual',
        'Membuka peluang pendapatan RS melalui layanan Medical Check-Up (MCU) Jiwa massal instansi',
        'Kerahasiaan data medis pasien terjamin dengan enkripsi standar rumah sakit'
      ],
      compliance: ['Standar Baku University of Minnesota Press', 'Kode Etik Psikologi HIMPSI', 'Standar MCU Kesehatan Jiwa Kemenkes RI'],
      interactiveDemoType: 'mmpi-simulator'
    }
  },

  // Pelatihan (LMS) - EXCLUSIVELY focused on Hospital & Healthcare Management (RS / Fasyankes)
  lms: {
    title: 'LMS PINTARKITA - Pelatihan Manajemen Rumah Sakit & Fasyankes',
    subtitle: 'Sistem Pembelajaran & Bimbingan Teknis Terpadu untuk Peningkatan Kapasitas SDM Rumah Sakit (BLUD/RSUD/RS Swasta) dan Fasyankes Indonesia',
    categories: [
      'Semua Pelatihan',
      'Unit Cost & Tarif RS',
      'Remunerasi Jaspel & KPI',
      'Manajemen Risiko & Renstra',
      'Manajemen Komplain & Mutu',
      'Tata Kelola Keuangan RS',
      'Psikotes MMPI-2 RS',
      'Manajemen Keuangan Klinik'
    ],
    courses: [
      {
        id: 'course-1',
        title: 'Bimtek Penyusunan Unit Cost & Clinical Pathway Rumah Sakit (ABC Modifikasi)',
        category: 'Unit Cost & Tarif RS',
        target: 'Direksi RS, Tim Unit Cost, Komite Medis, Keuangan & Casemix',
        rating: 4.95,
        reviewsCount: 382,
        lessonsCount: 14,
        duration: '24 Jam Pelajaran (JP)',
        badge: 'HAKI No: 000831709',
        thumbnail: 'assets/images/PINTAR UC.jpeg',
        description: 'Bimbingan teknis intensif penyusunan biaya satuan (Unit Cost) rumah sakit metode Activity-Based Costing (ABC) Modifikasi terintegrasi Clinical Pathway sesuai regulasi Kemenkes dan pedoman tarif BLUD.',
        modules: [
          {
            title: 'Modul 1: Konsep Dasar Unit Cost & Alokasi Biaya Rumah Sakit',
            type: 'video',
            duration: '28 Menit',
            src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            videoSummary: 'Membedah struktur biaya langsung (BHP, obat, honor nakes), biaya tidak langsung (overhead, utilitas, depresiasi), dan penentuan Cost Center di RSUD/RS Swasta.',
            pdfSummary: 'Buku Pedoman Teknis Analisis Biaya Rumah Sakit & Pedoman Pola Tarif BLUD (Format PDF).',
            hasQuiz: true
          },
          {
            title: 'Modul 2: Integrasi Clinical Pathway dan Kendali Mutu INA-CBGs',
            type: 'pdf',
            pages: 32,
            pdfSummary: 'Panduan Standar Pelayanan Medis, evaluasi variansi Length of Stay (LOS), dan kesesuaian konsumsi obat terhadap paket tarif klaim BPJS Kesehatan.',
            hasQuiz: true
          },
          {
            title: 'Modul 3: Ujian Evaluasi Kompetensi Unit Cost Rumah Sakit',
            type: 'quiz',
            quizQuestionsCount: 5,
            passScore: 80
          }
        ]
      },
      {
        id: 'course-2',
        title: 'Bimtek Distribusi Insentif Jasa Pelayanan Rumah Sakit Terintegrasi KPI (P1, P2, P3)',
        category: 'Remunerasi Jaspel & KPI',
        target: 'Direktur RS, Bagian SDM, Keuangan, Komite Medik & Keperawatan',
        rating: 4.92,
        reviewsCount: 415,
        lessonsCount: 12,
        duration: '20 Jam Pelajaran (JP)',
        badge: 'HAKI No: 001299375',
        thumbnail: 'assets/images/pintar-jp-info.jpg',
        description: 'Strategi 9 langkah perumusan format remunerasi jasa pelayanan berkeadilan, proporsi kelompok PIR, indeks skor KPI individu, slip jaspel digital, dan kepatuhan pajak PPh 21 TER PMK 168.',
        modules: [
          {
            title: 'Modul 1: Formula Pembobotan P1 (Kinerja Utama), P2 (Tambahan), P3 (Perilaku)',
            type: 'video',
            duration: '32 Menit',
            src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            videoSummary: 'Penyusunan indikator produktivitas, mutu layanan medis, kepatuhan SPO, serta legalitas aspek hukum melalui Peraturan Kepala Daerah (Perkada) dan Peraturan Direktur (Perdir).',
            pdfSummary: 'Kumpulan Draf SK Direktur & Formula Excel Remunerasi RSUD/RS Swasta.',
            hasQuiz: true
          },
          {
            title: 'Modul 2: Mekanisme Perhitungan Pajak PPh 21 TER Nakes & Slip Digital',
            type: 'pdf',
            pages: 26,
            pdfSummary: 'Simulasi pemotongan PPh 21 TER Kategori A, B, C untuk dokter spesialis, dokter umum, perawat, dan tenaga penunjang rumah sakit.',
            hasQuiz: true
          },
          {
            title: 'Modul 3: Kuis Uji Kompetensi Remunerasi Rumah Sakit',
            type: 'quiz',
            quizQuestionsCount: 5,
            passScore: 80
          }
        ]
      },
      {
        id: 'course-3',
        title: 'Bimtek Manajemen Risiko Terintegrasi Renstra Rumah Sakit & Akreditasi STARKES',
        category: 'Manajemen Risiko & Renstra',
        target: 'Komite Mutu & Keselamatan Pasien (KMKP), SPI, Bagian Renstra RS',
        rating: 4.89,
        reviewsCount: 310,
        lessonsCount: 16,
        duration: '24 Jam Pelajaran (JP)',
        badge: 'HAKI No: 001299405',
        thumbnail: 'assets/images/pintar-mr-info.jpg',
        description: 'Penyusunan profil risiko klinis dan non-klinis rumah sakit selaras dengan Rencana Strategis (Renstra), Matriks 5x5 Heatmap, investigasi RCA insiden keselamatan pasien, serta standar Kepmenkes 1354/2024.',
        modules: [
          {
            title: 'Modul 1: Identifikasi & Analisis Risiko Klinis serta Non-Klinis RS',
            type: 'video',
            duration: '30 Menit',
            src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            videoSummary: 'Tutorial menyusun Digital Risk Register, grading dampak x kemungkinan 5x5, dan cascading indikator sasaran strategis rumah sakit.',
            pdfSummary: 'Pedoman Manajemen Risiko Rumah Sakit Berbasis ISO 31000 & STARKES Kemenkes.',
            hasQuiz: true
          },
          {
            title: 'Modul 2: Kuis Sertifikasi Pemahaman Manajemen Risiko Rumah Sakit',
            type: 'quiz',
            quizQuestionsCount: 5,
            passScore: 80
          }
        ]
      },
      {
        id: 'course-4',
        title: 'Bimtek Manajemen Komplain, Survei Kepuasan Pasien (SKM) & PPID Rumah Sakit',
        category: 'Manajemen Komplain & Mutu',
        target: 'Humas RS, Bagian Pengaduan, Customer Service, Mutu Layanan',
        rating: 4.91,
        reviewsCount: 260,
        lessonsCount: 10,
        duration: '16 Jam Pelajaran (JP)',
        badge: 'Standar KemenPAN-RB',
        thumbnail: 'assets/images/pintar-puas-info.jpg',
        description: 'Implementasi penanganan komplain ber-SLA, survei kepuasan masyarakat 9 unsur PermenPAN-RB No. 14/2017 secara digital, dan tata kelola keterbukaan informasi publik (PPID) RS.',
        modules: [
          {
            title: 'Modul 1: Standar Pelayanan Publik Rumah Sakit Bebas Maladministrasi',
            type: 'video',
            duration: '25 Menit',
            src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
            videoSummary: 'Tata cara penerimaan aduan, investigasi unit internal, notifikasi WhatsApp ke pasien, dan pelaporan IKM ke KemenPAN-RB.',
            pdfSummary: 'Instrumen Kuesioner SKM Digital & Standar Prosedur Operasional Penanganan Keluhan.',
            hasQuiz: true
          },
          {
            title: 'Modul 2: Kuis Uji Kompetensi Layanan Pengaduan Rumah Sakit',
            type: 'quiz',
            quizQuestionsCount: 5,
            passScore: 80
          }
        ]
      },
      {
        id: 'course-5',
        title: 'Bimtek Tata Kelola Keuangan RS, dari anggaran, penatausahaan, dan laporan keuangan',
        category: 'Tata Kelola Keuangan RS',
        target: 'Direksi RS, Bagian Keuangan, Akuntansi & Verifikasi, Perencanaan Anggaran RS',
        rating: 4.93,
        reviewsCount: 345,
        lessonsCount: 12,
        duration: '20 Jam Pelajaran (JP)',
        badge: 'Akuntansi & Keuangan RS',
        thumbnail: 'assets/images/Manajemen keuangan BLUD.jpg',
        description: 'Bimbingan teknis komprehensif tata kelola keuangan rumah sakit (BLUD/Swasta) mulai dari perencanaan dan penganggaran (RBA/RKA), penatausahaan kas dan belanja BHP, hingga penyusunan laporan keuangan standar akuntansi.',
        modules: [
          {
            title: 'Modul 1: Perencanaan & Penganggaran Rumah Sakit (RBA/RKA & Cash Budgeting)',
            type: 'video',
            duration: '30 Menit',
            src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            videoSummary: 'Menyusun Rencana Bisnis dan Anggaran (RBA) BLUD, proyeksi pendapatan fasyankes, dan pagu anggaran belanja operasional rumah sakit.',
            pdfSummary: 'Pedoman Teknis Penganggaran Rumah Sakit BLUD & Format RBA Resmi.',
            hasQuiz: true
          },
          {
            title: 'Modul 2: Penatausahaan Kas, Piutang Pasien, Pengadaan BHP & Akuntansi Beban',
            type: 'video',
            duration: '26 Menit',
            src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            videoSummary: 'Siklus penatausahaan kasir, verifikasi SPJ, rekonsiliasi piutang klaim BPJS Kesehatan, dan pengendalian persediaan farmasi.',
            pdfSummary: 'Kumpulan SOP Penatausahaan Keuangan & Instrumen Pengendalian Intern Kas RS.',
            hasQuiz: true
          },
          {
            title: 'Modul 3: Kuis Uji Kompetensi Tata Kelola Keuangan Rumah Sakit',
            type: 'quiz',
            quizQuestionsCount: 5,
            passScore: 80
          }
        ]
      },
      {
        id: 'course-6',
        title: 'Pelatihan Test Psikotes MMPI-2 Online',
        category: 'Psikotes MMPI-2 RS',
        target: 'Dokter Sp.KJ, Psikolog Klinis, Tim MCU Rumah Sakit',
        rating: 4.96,
        reviewsCount: 290,
        lessonsCount: 12,
        duration: '20 Jam Pelajaran (JP)',
        badge: 'Standar Baku MMPI-2',
        thumbnail: 'assets/images/PINTAR MMPI2.jpg',
        description: 'Pelatihan teknis pengoperasian tes MMPI-2 berbasis web, analisis skala validitas (L, F, K), skala klinis, interpretasi psikogram T-Score, dan penulisan laporan MCU jiwa.',
        modules: [
          {
            title: 'Modul 1: Metodologi Skoring dan Profiling MMPI-2 Komputerisasi',
            type: 'video',
            duration: '35 Menit',
            src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            videoSummary: 'Menganalisis profil T-Score di atas cut-off 65, deteksi faking good/bad, dan konversi koreksi K-Scale.',
            pdfSummary: 'Manual Interpretasi MMPI-2 Resmi untuk Instalasi MCU Jiwa Rumah Sakit.',
            hasQuiz: true
          },
          {
            title: 'Modul 2: Kuis Sertifikasi Asesmen MMPI-2 Rumah Sakit',
            type: 'quiz',
            quizQuestionsCount: 5,
            passScore: 80
          }
        ]
      },
      {
        id: 'course-7',
        title: 'Pelatihan Manajemen Keuangan Klinik',
        category: 'Manajemen Keuangan Klinik',
        target: 'Pemilik Klinik, Dokter Penanggung Jawab, Bagian Keuangan & Kasir Klinik Pratama/Utama',
        rating: 4.94,
        reviewsCount: 275,
        lessonsCount: 12,
        duration: '20 Jam Pelajaran (JP)',
        badge: 'SIM & Keuangan Klinik',
        thumbnail: 'assets/images/PINTAR KLINIK.jpg',
        description: 'Pelatihan komprehensif manajemen keuangan dan operasional klinik terintegrasi SIM Klinik, tata kelola kasir POS, pembukuan farmasi, klaim BPJS/asuransi, serta pelaporan pajak PMK 168.',
        modules: [
          {
            title: 'Modul 1: Tata Kelola Kasir POS & Billing Pelayanan Klinik',
            type: 'video',
            duration: '30 Menit',
            src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            videoSummary: 'Penyusunan tarif layanan klinik, integrasi pembayaran digital QRIS/EDC, dan alur pencatatan pendapatan jasa dokter.',
            pdfSummary: 'Modul Standar Operasional Prosedur (SOP) Kasir & Penagihan Billing Klinik.',
            hasQuiz: true
          },
          {
            title: 'Modul 2: Akuntansi Keuangan Klinik, Pembukuan Farmasi & Pajak PMK 168',
            type: 'pdf',
            pages: 28,
            pdfSummary: 'Panduan pencatatan arus kas, kartu stok BHP medis/obat, perhitungan laba rugi bulanan, dan pemotongan PPh 21 TER dokter klinik.',
            hasQuiz: true
          },
          {
            title: 'Modul 3: Kuis Uji Kompetensi Manajemen Keuangan Klinik',
            type: 'quiz',
            quizQuestionsCount: 5,
            passScore: 80
          }
        ]
      }
    ],

    // Hospital & Fasyankes Management Quiz Questions
    quizQuestions: [
      {
        question: 'Dalam pengelolaan Unit Cost rumah sakit sesuai modul PINTAR UC, metode alokasi biaya apakah yang digunakan untuk mengalokasikan biaya berdasarkan aktivitas dan cost driver pemicu biaya?',
        options: [
          'Activity-Based Costing (ABC) Modifikasi',
          'Alokasi Kasual Sepihak Tanpa Data',
          'Break Even Point Sederhana',
          'Metode Estimasi Rata-rata Manual'
        ],
        answer: 0,
        explanation: 'Metode Activity-Based Costing (ABC) Modifikasi mengalokasikan biaya ke setiap tindakan dan layanan medis berdasarkan cost driver riil pemicu konsumsi sumber daya.'
      },
      {
        question: 'Pada sistem remunerasi PINTAR JP (HAKI No: 001299375), komponen apakah yang menilai produktivitas, volume layanan, kualitas pelayanan, kepatuhan klinis, dan kepuasan pasien?',
        options: [
          'P1 (Kinerja Utama)',
          'P2 (Kinerja Tambahan)',
          'P3 (Perilaku / Potensi)',
          'Porsi Bunga Tabungan'
        ],
        answer: 0,
        explanation: 'Komponen P1 (Kinerja Utama) secara khusus mengukur produktivitas medis, volume layanan, kepatuhan klinis terhadap SOP, dan kepuasan pasien.'
      },
      {
        question: 'Berdasarkan modul PINTAR MR, manakah yang termasuk ke dalam kategori Risiko Klinis di rumah sakit?',
        options: [
          'Kesalahan Medis (Medical Error), Infeksi HAIs, dan Medication Error',
          'Risiko Cash Flow dan Bunga Bank',
          'Risiko Kerusakan Komputer Kantor',
          'Keterlambatan Pengiriman Surat Dinas'
        ],
        answer: 0,
        explanation: 'Risiko klinis meliputi Medical Error, Infeksi Nosokomial (HAIs), Medication Error, kegagalan tindakan medis, dan keterlambatan diagnosis pasien.'
      },
      {
        question: 'Pada instrumen PINTAR PUAS, regulasi nasional manakah yang menjadi acuan standar baku 9 unsur survei kepuasan masyarakat fasyankes?',
        options: [
          'PermenPAN-RB No. 14 Tahun 2017',
          'Peraturan Menteri Perdagangan No. 5 Tahun 2010',
          'Undang-Undang Ketenagakerjaan No. 13 Tahun 2003',
          'Instruksi Presiden No. 1 Tahun 2005'
        ],
        answer: 0,
        explanation: 'PermenPAN-RB No. 14/2017 menetapkan pedoman teknis penyusunan survei kepuasan masyarakat dengan 9 unsur pelayanan publik wajib.'
      },
      {
        question: 'Dalam tata kelola keuangan rumah sakit BLUD, dokumen perencanaan dan penganggaran komprehensif tahunan yang disusun memuat target kinerja dan belanja disebut?',
        options: [
          'Rencana Bisnis dan Anggaran (RBA)',
          'Daftar Absensi Pegawai',
          'Buku Kas Kecil',
          'Katalog Obat Rumah Sakit'
        ],
        answer: 0,
        explanation: 'RBA (Rencana Bisnis dan Anggaran) adalah dokumen rencana kerja dan anggaran tahunan BLUD yang memuat program, kegiatan, target kinerja, dan anggaran rumah sakit.'
      }
    ]
  },

  // Articles & Knowledge Base for Hospital Management
  articles: [
    {
      id: 'art-1',
      title: 'Strategi Pengendalian Defisit Klaim INA-CBGs RS Melalui Sinkronisasi Unit Cost & Clinical Pathway',
      category: 'Unit Cost & Tarif RS',
      date: '15 Oktober 2026',
      readTime: '6 Menit Baca',
      author: 'Mukhsin Hadi, SE, M.Si (Direktur PT. AKAPRO)',
      image: 'assets/images/pintar-uc-info.jpg',
      summary: 'Kupas tuntas mengapa rumah sakit sering mengalami selisih negatif tarif klaim BPJS dan bagaimana metode ABC Modifikasi PINTAR UC mengatasinya.',
      content: `
        <p>Banyak direksi rumah sakit (BLUD, RSUD, maupun RS Swasta) menghadapi defisit keuangan akibat klaim paket INA-CBGs yang berada di bawah biaya riil tindakan. Hal ini terjadi karena rumah sakit tidak memiliki data biaya satuan (unit cost) yang presisi.</p>
        <h4>Kenapa Tanpa Unit Cost Rumah Sakit Terancam?</h4>
        <p>Berdasarkan kajian PT. Akademi Profesional Indonesia, tanpa unit cost yang andal, biaya riil setiap tindakan medis tidak jelas, keputusan tarif hanya berdasarkan asumsi, pemborosan BHP tidak terdeteksi, likuiditas menurun, dan manajemen berjalan tanpa arah pasti.</p>
        <h4>Solusi Melalui PINTAR UC (HAKI No: 000831709)</h4>
        <p>PINTAR UC menghadirkan kalkulasi berbasis metode Activity-Based Costing (ABC) Modifikasi yang menghubungkan alokasi biaya langsung dan tidak langsung dengan standar Clinical Pathway. Hasilnya, tarif layanan menjadi rasional, efisiensi operasional meningkat hingga 38%, dan akuntabilitas saat diaudit BPKP terjamin.</p>
      `
    },
    {
      id: 'art-2',
      title: 'Formula Distribusi Insentif Jasa Pelayanan Rumah Sakit Berkeadilan Berbasis KPI (P1, P2, P3)',
      category: 'Remunerasi & KPI',
      date: '12 Oktober 2026',
      readTime: '5 Menit Baca',
      author: 'dr. Udi Suhono, Sp. B, FINACS (Trainer Layanan Medis AKAPRO)',
      image: 'assets/images/pintar-jp-info.jpg',
      summary: '9 langkah strategis mendistribusikan jasa medis tanpa konflik internal dengan integrasi KPI dan pajak PPh 21 TER PMK 168.',
      content: `
        <p>Distribusi jasa pelayanan yang tidak transparan adalah bom waktu bagi produktivitas rumah sakit. Tanpa integrasi KPI dan sistem yang solid, pembagian insentif hanya akan melahirkan kecemburuan sosial antar unit.</p>
        <h4>Prinsip Solusi PINTAR JP (HAKI No: 001299375)</h4>
        <p>PINTAR JP menerapkan formula terstruktur: P1 Kinerja Utama (Produktivitas & mutu), P2 Kinerja Tambahan (Inisiatif & kolaborasi), dan P3 Perilaku (Integritas & disiplin). Seluruh nakes menerima slip jaspel digital transparan yang terhubung dengan perhitungan pajak PPh 21 TER PMK 168/2023.</p>
      `
    },
    {
      id: 'art-3',
      title: 'Penerapan Manajemen Risiko Terintegrasi Renstra Rumah Sakit Sesuai Kepmenkes 1354/2024',
      category: 'Manajemen Risiko',
      date: '08 Oktober 2026',
      readTime: '7 Menit Baca',
      author: 'Amalinda Fajari, SE (Trainer Manajemen Risiko AKAPRO)',
      image: 'assets/images/pintar-mr-info.jpg',
      summary: 'Menyelaraskan sasaran strategis rumah sakit dengan manajemen risiko klinis dan non-klinis berbasis heatmap diagram 5x5.',
      content: `
        <p>Strategi tanpa risiko itu bunuh diri, risiko tanpa strategi itu mimpi! Penerapan manajemen risiko di rumah sakit harus selaras dengan Rencana Strategis (Renstra) sesuai mandat Kepmenkes HK.01.07/MENKES/1354/2024 dan ISO 31000:2018.</p>
        <h4>Keunggulan PINTAR MR (HAKI No: 001299405)</h4>
        <p>Aplikasi PINTAR MR memetakan profil risiko klinis (medical error, HAIs, kegagalan diagnosis) dan risiko non-klinis (cash flow, SDM, cybersecurity, sarpras) dalam diagram kartesius 5x5 interaktif, lengkap dengan Strategic Map dan cascading KPI.</p>
      `
    },
    {
      id: 'art-4',
      title: 'Tata Kelola Keuangan Rumah Sakit: Dari RBA, Penatausahaan Kas Hingga Laporan Keuangan Akuntabel',
      category: 'Tata Kelola Keuangan RS',
      date: '05 Oktober 2026',
      readTime: '6 Menit Baca',
      author: 'Rima Devaluasi, SE, M.Ak (Trainer Akuntansi Keuangan AKAPRO)',
      image: 'assets/images/pintar-klinik-3d.jpg',
      summary: 'Langkah praktis menyusun RBA BLUD, pembukuan kas, serta laporan keuangan akuntansi rumah sakit yang siap diaudit BPKP.',
      content: `
        <p>Pengelolaan keuangan rumah sakit BLUD maupun swasta memerlukan siklus akuntansi yang tertib mulai dari penetapan pagu anggaran (RBA), penatausahaan penerimaan pasien, belanja persediaan farmasi, hingga penyusunan laporan keuangan (Neraca, Laporan Operasional, dan Arus Kas).</p>
      `
    }
  ],

  // Company Profile strictly from PT. AKADEMI PROFESIONAL INDONESIA (AKAPRO) Company Profile PDF
  company: {
    officialName: 'PT. AKADEMI PROFESIONAL INDONESIA',
    shortName: 'AKAPRO',
    platformName: 'PINTARKITA',
    tagline: 'Optimasi Nilai dengan Talenta Terampil Berbasis Teknologi',
    slogan: 'Membangun Entitas. Tumbuh Melesat. Berdampak Nyata.',
    servicePromise: 'Profesional dalam kompetensi, terukur dalam proses, transparan dalam tata kelola, berkelanjutan dalam kemitraan.',
    about: 'PT. Akademi Profesional Indonesia (AKAPRO) merupakan perusahaan profesional yang bergerak di bidang pengembangan sumber daya manusia (SDM), konsultasi manajemen, sertifikasi kompetensi, serta penyediaan solusi teknologi digital berbasis web-based dan mobile terintegrasi. Perusahaan hadir sebagai mitra strategis bagi instansi pemerintah, rumah sakit (BLUD/RSUD/RS Swasta), BUMN, sektor korporasi, maupun pelaku usaha dalam meningkatkan kapasitas organisasi melalui pendekatan terpadu yang memadukan kompetensi SDM dengan inovasi teknologi informasi modern.',
    about2: 'Dengan mengedepankan kualitas layanan, profesionalisme, serta inovasi berkelanjutan, PT. Akademi Profesional Indonesia berkomitmen menghadirkan solusi komprehensif yang tidak hanya menjawab kebutuhan operasional saat ini, tetapi juga mendukung akuntabilitas, transparansi, serta keberlanjutan tata kelola organisasi di era ekonomi digital.',
    vision: 'Menjadi institusi profesional terdepan yang mempersiapkan talenta Indonesia dalam menghadapi era ekonomi digital melalui penyelenggaraan pembelajaran berkualitas, inovasi teknologi, serta kolaborasi strategis yang berkelanjutan.',
    missions: [
      'Menyelenggarakan program pelatihan dan bimbingan teknis yang berstandar tinggi serta relevan dengan perkembangan industri dan regulasi nasional.',
      'Mengembangkan solusi teknologi berbasis web dan mobile yang terintegrasi guna mendukung digitalisasi proses bisnis organisasi.',
      'Mendorong penerapan tata kelola yang transparan, akuntabel, dan berorientasi pada peningkatan kinerja.',
      'Membangun budaya transformasi digital di berbagai sektor melalui inovasi yang berkelanjutan.'
    ],
    coreValues: [
      { title: '1. EXCELLENCE', desc: 'Penerapan standar kualitas tertinggi tanpa kompromi dalam setiap program pelatihan, penyusunan aplikasi, dan layanan konsultasi.' },
      { title: '2. INOVASI BERKELANJUTAN', desc: 'Bereksperimen dan mengadopsi metodologi serta teknologi terkini untuk memberikan solusi terdepan yang relevan dengan kebutuhan pasar.' },
      { title: '3. KOLABORASI STRATEGIS', desc: 'Bekerja erat sebagai mitra pertumbuhan jangka panjang bersama klien demi menghasilkan dampak positif yang terukur.' },
      { title: '4. INTEGRITAS PROFESIONAL', desc: 'Menjunjung tinggi kejujuran, transparansi, serta tanggung jawab etis dalam seluruh skema kerja sama bisnis.' }
    ],
    legalities: {
      companyName: 'PT. AKADEMI PROFESIONAL INDONESIA',
      kemenkumham: 'AHU-041019.AH.01.30. Tahun 2025 (Terdaftar: 3 Agustus 2025)',
      nib: '0308250032922 (Sistem OSS Risk-Based Approach)',
      npwp: '33.750.330.1-185.000 (KPP Pratama Pekalongan)',
      status: 'PMDN (Penanaman Modal Dalam Negeri)',
      kbli: [
        { code: '78425', cat: 'UTAMA', desc: 'Pelatihan Kerja Bisnis dan Manajemen Swasta (Bimtek & Professional Training RS)' },
        { code: '62019', cat: 'Pendukung', desc: 'Aktivitas Pemrograman Komputer Lainnya (Pengembangan Solusi Software & Aplikasi RS)' },
        { code: '69201', cat: 'Pendukung', desc: 'Aktivitas Akuntansi, Pembukuan dan Pemeriksa (Konsultasi Keuangan RS & Audit Intern)' },
        { code: '74322', cat: 'Pendukung', desc: 'Aktivitas Sertifikasi Personel Independen' },
        { code: '85492', cat: 'Pendukung', desc: 'Jasa Pendidikan Komputer (Teknologi Informasi dan Komunikasi) Swasta' },
        { code: '74130', cat: 'Pendukung', desc: 'Aktivitas Desain Komunikasi Visual / Desain Grafis' }
      ]
    },
    hakiRecords: [
      { app: 'PINTAR UC', no: '000831709', title: 'Sistem Manajemen Unit Cost Terintegrasi Rumah Sakit' },
      { app: 'PINTAR JP', no: '001299375', title: 'Sistem Distribusi Insentif Jasa Pelayanan Terintegrasi KPI' },
      { app: 'PINTAR MR', no: '001299405', title: 'Sistem Manajemen Risiko Terintegrasi Renstra Rumah Sakit' }
    ],
    stats: [
      { number: '100+', label: 'Rumah Sakit & Fasyankes Terpasang' },
      { number: '30+', label: 'Provinsi Bimtek & FGD' },
      { number: '5+ HAKI', label: 'Hak Cipta Resmi Kemenkumham' },
      { number: '100%', label: 'Kepatuhan Regulasi Kemenkes & Kemendagri' }
    ],
    team: [
      {
        name: 'Mukhsin Hadi, SE, M.Si',
        role: 'Direktur PT. AKAPRO',
        desc: 'Arah strategis, master trainer, dan pakar remunerasi, unit cost, manajemen risiko bersertifikasi, konsultan pengembangan bisnis, dan pengembangan solusi aplikasi.'
      },
      {
        name: 'Sarah Safitri, A.Md',
        role: 'Manajer Keuangan',
        desc: 'Pengelolaan anggaran, administrasi keuangan, laporan, penagihan, dan penguatan akuntansi fasyankes.'
      },
      {
        name: 'dr. Udi Suhono, Sp. B, FINACS',
        role: 'Trainer Layanan Medis',
        desc: 'Konteks klinis, jasa pelayanan medis, mutu layanan, manajemen risiko, dan implementasi rumah sakit.'
      },
      {
        name: 'dr. Nur Ali Aziz Faizin, Sp. S',
        role: 'Trainer Layanan Medis',
        desc: 'Pengembangan program layanan medis, jasa pelayanan medis, dan fasilitasi pembelajaran klinis.'
      },
      {
        name: 'Arifudin, S.Kep. Ners',
        role: 'Trainer Layanan Paramedis',
        desc: 'Layanan keperawatan/paramedis, jasa pelayanan, mutu, dan praktik pelayanan rumah sakit.'
      },
      {
        name: 'Rima Devaluasi, SE, M.Ak',
        role: 'Trainer Akuntansi & Manajemen',
        desc: 'Akuntansi, manajemen, unit cost, laporan, dan tata kelola keuangan rumah sakit BLUD.'
      },
      {
        name: 'Amalinda Fajari, SE',
        role: 'Trainer Manajemen Risiko',
        desc: 'Manajemen unit cost, manajemen risiko, mitigasi dan penyusunan tata kelola (regulasi) organisasi.'
      }
    ],
    partners: [
      {
        id: 'p-1',
        name: 'RSUD Bandar Negara Husada',
        region: 'Pemerintah Provinsi Lampung',
        app: 'PINTAR MR',
        appDesc: 'Sistem Manajemen Risiko RS',
        appBadge: 'badge-mr',
        logo: 'assets/icons/partners/lampung.svg'
      },
      {
        id: 'p-2',
        name: 'RSUD Batiling',
        region: 'Fasilitas Pelayanan Kesehatan Daerah',
        app: 'PINTAR MR',
        appDesc: 'Sistem Manajemen Risiko RS',
        appBadge: 'badge-mr',
        logo: 'assets/icons/partners/batiling.svg'
      },
      {
        id: 'p-3',
        name: 'RSUD Kabupaten Kerinci',
        region: 'Pemerintah Kabupaten Kerinci, Jambi',
        app: 'PINTAR MR',
        appDesc: 'Sistem Manajemen Risiko RS',
        appBadge: 'badge-mr',
        logo: 'assets/icons/partners/kerinci.svg'
      },
      {
        id: 'p-4',
        name: 'UPTD Khusus RSU Haji Medan',
        region: 'Pemerintah Provinsi Sumatera Utara',
        app: 'PINTAR MR',
        appDesc: 'Sistem Manajemen Risiko RS',
        appBadge: 'badge-mr',
        logo: 'assets/icons/partners/sumut-haji.svg'
      },
      {
        id: 'p-5',
        name: 'RSUD Bumiayu',
        region: 'Pemerintah Kabupaten Brebes, Jateng',
        app: 'PINTAR MR',
        appDesc: 'Sistem Manajemen Risiko RS',
        appBadge: 'badge-mr',
        logo: 'assets/icons/partners/brebes-bumiayu.svg'
      },
      {
        id: 'p-6',
        name: 'RSUD Teungku Peukan',
        region: 'Pemerintah Kab. Aceh Barat Daya, Aceh',
        app: 'PINTAR MR',
        appDesc: 'Sistem Manajemen Risiko RS',
        appBadge: 'badge-mr',
        logo: 'assets/icons/partners/abdya.svg'
      },
      {
        id: 'p-7',
        name: 'RSUD dr. Soeroto',
        region: 'Pemerintah Kabupaten Ngawi, Jatim',
        app: 'PINTAR MR',
        appDesc: 'Sistem Manajemen Risiko RS',
        appBadge: 'badge-mr',
        logo: 'assets/icons/partners/ngawi.svg'
      },
      {
        id: 'p-8',
        name: 'RSUD Ahmad Ripin',
        region: 'Pemerintah Kab. Muaro Jambi, Jambi',
        app: 'PINTAR MR',
        appDesc: 'Sistem Manajemen Risiko RS',
        appBadge: 'badge-mr',
        logo: 'assets/icons/partners/muaro-jambi.svg'
      },
      {
        id: 'p-9',
        name: 'RSUD dr. Soeselo Slawi',
        region: 'Pemerintah Kabupaten Tegal, Jateng',
        app: 'PINTAR JP',
        appDesc: 'Distribusi Remunerasi Jaspel & KPI',
        appBadge: 'badge-jp',
        logo: 'assets/icons/partners/tegal.svg'
      },
      {
        id: 'p-10',
        name: 'RSUD dr. R. Goeteng Taroenadibrata',
        region: 'Pemerintah Kab. Purbalingga, Jateng',
        app: 'PINTAR JP & TARIF',
        appDesc: 'Remunerasi & Kendali Biaya JKN',
        appBadge: 'badge-jp',
        logo: 'assets/icons/partners/purbalingga.svg'
      },
      {
        id: 'p-11',
        name: 'RSUD Bendan Kota Pekalongan',
        region: 'Pemerintah Kota Pekalongan, Jateng',
        app: 'PINTAR UC',
        appDesc: 'Unit Cost ABC Modifikasi',
        appBadge: 'badge-uc',
        logo: 'assets/icons/partners/pekalongan.svg'
      },
      {
        id: 'p-12',
        name: 'RSUD Sungai Bahar',
        region: 'Pemerintah Kab. Muaro Jambi, Jambi',
        app: 'PINTAR JP',
        appDesc: 'Sistem Remunerasi Jaspel Nakes',
        appBadge: 'badge-jp',
        logo: 'assets/icons/partners/sungai-bahar.svg'
      },
      {
        id: 'p-13',
        name: 'RSUD Mayjen H.A. Thalib',
        region: 'Pemerintah Kota Sungai Penuh, Jambi',
        app: 'PINTAR JP & BLUD',
        appDesc: 'Tata Kelola Fleksibilitas BLUD & Jaspel',
        appBadge: 'badge-jp',
        logo: 'assets/icons/partners/sungai-penuh.svg'
      },
      {
        id: 'p-14',
        name: 'BPKP Perwakilan Jawa Tengah',
        region: 'Badan Pengawasan Keuangan & Pembangunan',
        app: 'PINTAR MR',
        appDesc: 'Peta Risiko & Tata Kelola Fasyankes',
        appBadge: 'badge-mr',
        logo: 'assets/icons/partners/bpkp.svg'
      },
      {
        id: 'p-15',
        name: 'Subdit BLUD Kemendagri RI',
        region: 'Kementerian Dalam Negeri Republik Indonesia',
        app: 'PINTAR UC',
        appDesc: 'Kaji Banding Tarif Layanan BLUD',
        appBadge: 'badge-uc',
        logo: 'assets/icons/partners/kemendagri.svg'
      },
      {
        id: 'p-16',
        name: 'Tim Unit Cost & Tarif Kemenkes RI',
        region: 'Kementerian Kesehatan Republik Indonesia',
        app: 'PINTAR UC',
        appDesc: 'Pedoman Perhitungan Biaya Satuan RS',
        appBadge: 'badge-uc',
        logo: 'assets/icons/partners/kemenkes.svg'
      }
    ],
    contact: {
      address: 'Perum Saphire Townhouse Blok C-3, Jl. Truntum, Kel. Krapyak, Kec. Pekalongan Utara, Kota Pekalongan, Jawa Tengah 51147',
      whatsapp: '085726112001',
      whatsappRaw: '6285726112001',
      email: 'mukhsin9@gmail.com / akademiprofesional@gmail.com',
      hours: 'Senin - Sabtu: 08.00 - 18.00 WIB (Support Pendampingan RS 24 Jam)'
    }
  },

  // Galeri Dokumentasi Kegiatan Lapangan & Kemitraan RS Resmi
  gallery: [
    {
      id: 'gal-1',
      title: 'Bimtek Penerapan Manajemen Risiko BLUD RSUD bersama BPKP Provinsi Jawa Tengah',
      category: 'Bimtek & Pelatihan RS',
      categorySlug: 'bimtek',
      location: 'Semarang, Jawa Tengah',
      speaker: 'Mukhsin Hadi, SE, M.Si',
      institution: 'BPKP Perwakilan Provinsi Jawa Tengah',
      image: 'assets/images/Galeri BPKP.jpg',
      badge: 'PINTAR MR • BPKP Jateng',
      description: 'Pemaparan komprehensif implementasi manajemen risiko terintegrasi Renstra rumah sakit, peta risiko 5x5, dan mitigasi risiko klinis & tata kelola keuangan RSUD oleh Mukhsin Hadi, SE, M.Si.',
      tags: ['Manajemen Risiko', 'PINTAR MR', 'BPKP Jateng', 'BLUD RSUD']
    },
    {
      id: 'gal-2',
      title: 'Implementasi & Go-Live Sistem Unit Cost Terpadu PINTAR UC di RSUD Bendan',
      category: 'Implementasi Aplikasi',
      categorySlug: 'aplikasi',
      location: 'Pekalongan, Jawa Tengah',
      speaker: 'Mukhsin Hadi, SE, M.Si bersama Direksi RSUD',
      institution: 'RSUD Bendan Kota Pekalongan',
      image: 'assets/images/galeri unit cost.jpg',
      badge: 'PINTAR UC • RSUD Bendan',
      description: 'Implementasi resmi aplikasi web PINTAR UC (HAKI 000831709) berbasis Activity-Based Costing (ABC) Modifikasi untuk perhitungan biaya satuan tindakan medis dan efisiensi operasional.',
      tags: ['Unit Cost', 'PINTAR UC', 'RSUD Bendan', 'ABC Modifikasi']
    },
    {
      id: 'gal-3',
      title: 'Rapat Kerja Teknis & FGD Analisis Unit Cost Layanan Medis',
      category: 'FGD & Tata Kelola',
      categorySlug: 'fgd',
      location: 'Ruang Rapat Perencanaan RS',
      speaker: 'Tim Ahli Unit Cost PT. AKAPRO',
      institution: 'Manajemen Keuangan & Pelayanan RS',
      image: 'assets/images/Gaeri Unit cost.jpg',
      badge: 'FGD Unit Cost',
      description: 'Diskusi teknis penetapan cost driver, telaah Clinical Pathway tindakan medis, dan standarisasi penganggaran Bahan Habis Pakai (BHP) bersama komite medik dan perencana rumah sakit.',
      tags: ['FGD', 'Unit Cost', 'Clinical Pathway', 'BHP RS']
    },
    {
      id: 'gal-4',
      title: 'Bimbingan Teknis Remunerasi Jasa Pelayanan Terintegrasi KPI PINTAR JP',
      category: 'Implementasi Aplikasi',
      categorySlug: 'aplikasi',
      location: 'Slawi, Kabupaten Tegal',
      speaker: 'Tim Konsultan PT. AKAPRO',
      institution: 'RSUD dr. Soeselo Slawi Kab. Tegal',
      image: 'assets/images/Galeri RS Soeselo.jpg',
      badge: 'PINTAR JP • RSUD dr. Soeselo',
      description: 'Pendampingan implementasi formula remunerasi berkeadilan melalui PINTAR JP (HAKI 001299375), formula P1, P2, P3, dan integrasi perhitungan pajak PPh 21 TER PMK 168.',
      tags: ['Remunerasi', 'PINTAR JP', 'RSUD dr Soeselo', 'Jaspel RS']
    },
    {
      id: 'gal-5',
      title: 'Paparan Struktur Pola Tarif Pasien JKN & Pengendalian Defisit RS',
      category: 'Bimtek & Pelatihan RS',
      categorySlug: 'bimtek',
      location: 'Purbalingga, Jawa Tengah',
      speaker: 'Mukhsin Hadi, SE, M.Si',
      institution: 'RSUD dr. R. Goeteng Taroenadibrata',
      image: 'assets/images/Galeri RS goeteng.jpeg',
      badge: 'Pola Tarif • RS Goeteng',
      description: 'Analisis komparatif pola tarif INA-CBGs dengan real cost rumah sakit daerah serta perumusan strategi kendali mutu dan kendali biaya (KMKB) fasyankes.',
      tags: ['Pola Tarif', 'Klaim JKN', 'INA-CBGs', 'RSUD Goeteng']
    },
    {
      id: 'gal-6',
      title: 'Kemitraan Strategis & Sesi Bersama Tim Manajemen Rumah Sakit',
      category: 'Kemitraan RS',
      categorySlug: 'kemitraan',
      location: 'Purbalingga, Jawa Tengah',
      speaker: 'Tim PT. AKAPRO & Direksi RSUD',
      institution: 'RSUD dr. R. Goeteng Taroenadibrata',
      image: 'assets/images/galeri RSUD Goeteng.jpg',
      badge: 'Kemitraan Strategis RS',
      description: 'Foto bersama di depan monumen dr. R. Goeteng Taroenadibrata, wujud komitmen pendampingan tata kelola dan transformasi digital fasyankes berkelanjutan.',
      tags: ['Kemitraan RS', 'AKAPRO', 'RSUD Goeteng', 'Transformasi Digital']
    },
    {
      id: 'gal-7',
      title: 'Pelatihan Implementasi Sistem Remunerasi Jasa Pelayanan Terintegrasi KPI',
      category: 'Bimtek & Pelatihan RS',
      categorySlug: 'bimtek',
      location: 'Muaro Jambi, Jambi',
      speaker: 'Tim Konsultan PT. AKAPRO',
      institution: 'RSUD Sungai Bahar Kabupaten Muaro Jambi',
      image: 'assets/images/Galeri sungai bahar.jpg',
      badge: 'PINTAR JP • RS Sungai Bahar',
      description: 'Pelatihan interaktif bagi jajaran manajemen dan tenaga kesehatan dalam mengoperasikan sistem remunerasi PINTAR JP secara transparan, akurat, dan minim friksi.',
      tags: ['Pelatihan Jaspel', 'PINTAR JP', 'RS Sungai Bahar', 'Remunerasi']
    },
    {
      id: 'gal-8',
      title: 'Sosialisasi Tata Kelola Fleksibilitas BLUD & Akuntabilitas Keuangan RS',
      category: 'FGD & Tata Kelola',
      categorySlug: 'fgd',
      location: 'Kota Sungai Penuh, Jambi',
      speaker: 'Mukhsin Hadi, SE, M.Si',
      institution: 'RSUD Mayjen H.A. Thalib Kota Sungai Penuh',
      image: 'assets/images/Galeri Sungai Penuh.jpg',
      badge: 'Tata Kelola BLUD',
      description: 'Sosialisasi penguatan fleksibilitas pengelolaan keuangan BLUD berdasarkan Permendagri 79/2018 untuk mewujudkan layanan prima dan tata kelola RS yang transparan.',
      tags: ['BLUD', 'Tata Kelola RS', 'RS Mayjen HA Thalib', 'Permendagri 79']
    },
    {
      id: 'gal-9',
      title: 'Rapat Kerja Teknis Perumusan Kebijakan Pola Tarif Rumah Sakit',
      category: 'FGD & Tata Kelola',
      categorySlug: 'fgd',
      location: 'Ruang Rapat Dewan Pengawas & Tim Tarif',
      speaker: 'Tim Konsultan Keuangan AKAPRO',
      institution: 'Tim Penyusun Tarif & Direksi Rumah Sakit',
      image: 'assets/images/Galeri Tarif.jpg',
      badge: 'Perumusan Tarif RS',
      description: 'Simulasi perhitungan skenario tarif baru, evaluasi daya beli masyarakat, dan penyusunan draf Peraturan Kepala Daerah (Perkada) tentang pola tarif layanan RSUD.',
      tags: ['Pola Tarif', 'Peraturan Daerah', 'Unit Cost', 'Keuangan RS']
    }
  ]
};

window.PINTAR_DATA = PINTAR_DATA;
