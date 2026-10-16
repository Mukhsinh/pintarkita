/**
 * PINTARKITA - Waktu Sholat & Countdown Engine
 * Accurate prayer times calculation for Indonesian cities (Kemenag Standard)
 */

const PRAYER_CITIES = {
  jakarta: { name: 'DKI Jakarta', lat: -6.2088, lng: 106.8456, timezone: 7 },
  surabaya: { name: 'Surabaya', lat: -7.2575, lng: 112.7521, timezone: 7 },
  semarang: { name: 'Semarang', lat: -6.9667, lng: 110.4167, timezone: 7 },
  bandung: { name: 'Bandung', lat: -6.9175, lng: 107.6191, timezone: 7 },
  yogyakarta: { name: 'Yogyakarta', lat: -7.7956, lng: 110.3695, timezone: 7 },
  medan: { name: 'Medan', lat: 3.5952, lng: 98.6722, timezone: 7 },
  palembang: { name: 'Palembang', lat: -2.9761, lng: 104.7754, timezone: 7 },
  makassar: { name: 'Makassar', lat: -5.1477, lng: 119.4327, timezone: 8 },
  denpasar: { name: 'Denpasar / Bali', lat: -8.6705, lng: 115.2126, timezone: 8 },
  samarinda: { name: 'Samarinda', lat: -0.5016, lng: 117.1265, timezone: 8 },
  jayapura: { name: 'Jayapura', lat: -2.5916, lng: 140.6690, timezone: 9 }
};

class PrayerTimeManager {
  constructor() {
    this.currentCityKey = localStorage.getItem('pintarkita_city') || 'jakarta';
    this.timerInterval = null;
    this.nextPrayer = null;
  }

  init() {
    this.setupCitySelector();
    this.updateSchedule();
    
    // Start real-time 1-second countdown
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      this.tick();
    }, 1000);
  }

  setupCitySelector() {
    const selector = document.getElementById('prayer-city-select');
    if (!selector) return;

    selector.innerHTML = '';
    for (const [key, city] of Object.entries(PRAYER_CITIES)) {
      const opt = document.createElement('option');
      opt.value = key;
      opt.textContent = city.name;
      if (key === this.currentCityKey) opt.selected = true;
      selector.appendChild(opt);
    }

    selector.addEventListener('change', (e) => {
      this.currentCityKey = e.target.value;
      localStorage.setItem('pintarkita_city', this.currentCityKey);
      this.updateSchedule();
    });
  }

  // Indonesian Ministry of Religious Affairs (Kemenag) Standard Prayer Calculation
  calculateTimes(date, cityKey) {
    const city = PRAYER_CITIES[cityKey] || PRAYER_CITIES.jakarta;
    const lat = city.lat;
    const lng = city.lng;
    const tz = city.timezone;

    // Day of year
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);

    // Approximate solar declination & equation of time
    const b = (2 * Math.PI * (dayOfYear - 81)) / 365;
    const eot = 9.87 * Math.sin(2 * b) - 7.53 * Math.cos(b) - 1.5 * Math.sin(b); // minutes
    const declination = 23.45 * Math.sin((2 * Math.PI / 365) * (dayOfYear - 81)); // degrees

    const degToRad = (deg) => (deg * Math.PI) / 180;
    const radToDeg = (rad) => (rad * 180) / Math.PI;

    // Solar noon (Dzuhur) in local hours
    const solarNoonMinutes = 720 - 4 * lng + tz * 60 - eot;
    const dzuhurHour = solarNoonMinutes / 60 + (2 / 60); // +2 mins ihtiyat standard Kemenag

    // Hour angle calculation helper
    const getHourAngle = (angle) => {
      const cosH = (Math.sin(degToRad(angle)) - Math.sin(degToRad(lat)) * Math.sin(degToRad(declination))) /
                   (Math.cos(degToRad(lat)) * Math.cos(degToRad(declination)));
      if (cosH > 1 || cosH < -1) return null;
      return radToDeg(Math.acos(cosH));
    };

    // Subuh (Kemenag -20 deg)
    const subuhHA = getHourAngle(-20);
    const subuhHour = dzuhurHour - (subuhHA / 15);

    // Sunrise / Terbit (-0.833 deg)
    const sunriseHA = getHourAngle(-0.833);
    const sunriseHour = dzuhurHour - (sunriseHA / 15);

    // Ashar (Shafi'i shadow length = 1 + shadow at noon)
    const noonZenith = Math.abs(lat - declination);
    const asharZenith = radToDeg(Math.atan(1 + Math.tan(degToRad(noonZenith))));
    const asharAngle = 90 - asharZenith;
    const asharHA = getHourAngle(asharAngle);
    const asharHour = dzuhurHour + (asharHA / 15);

    // Maghrib (-0.833 deg)
    const maghribHour = dzuhurHour + (sunriseHA / 15) + (2 / 60);

    // Isya (Kemenag -18 deg)
    const isyaHA = getHourAngle(-18);
    const isyaHour = dzuhurHour + (isyaHA / 15) + (2 / 60);

    const formatTime = (floatHours) => {
      let totalMinutes = Math.round(floatHours * 60);
      let hours = Math.floor(totalMinutes / 60);
      let mins = totalMinutes % 60;
      if (hours >= 24) hours -= 24;
      return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
    };

    return {
      subuh: formatTime(subuhHour),
      terbit: formatTime(sunriseHour),
      dzuhur: formatTime(dzuhurHour),
      ashar: formatTime(asharHour),
      maghrib: formatTime(maghribHour),
      isya: formatTime(isyaHour)
    };
  }

  updateSchedule() {
    const now = new Date();
    const times = this.calculateTimes(now, this.currentCityKey);

    // Update DOM time items
    const elements = {
      'prayer-subuh': times.subuh,
      'prayer-terbit': times.terbit,
      'prayer-dzuhur': times.dzuhur,
      'prayer-ashar': times.ashar,
      'prayer-maghrib': times.maghrib,
      'prayer-isya': times.isya
    };

    for (const [id, val] of Object.entries(elements)) {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    }

    // Set Indonesian date display
    const dateEl = document.getElementById('prayer-current-date');
    if (dateEl) {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      dateEl.textContent = now.toLocaleDateString('id-ID', options);
    }

    this.determineNextPrayer(times, now);
  }

  determineNextPrayer(times, now) {
    const todayStr = now.toISOString().split('T')[0];
    const prayerList = [
      { name: 'Subuh', time: times.subuh, key: 'subuh' },
      { name: 'Terbit', time: times.terbit, key: 'terbit' },
      { name: 'Dzuhur', time: times.dzuhur, key: 'dzuhur' },
      { name: 'Ashar', time: times.ashar, key: 'ashar' },
      { name: 'Maghrib', time: times.maghrib, key: 'maghrib' },
      { name: 'Isya', time: times.isya, key: 'isya' }
    ];

    let upcoming = null;
    let currentPrayerKey = 'isya';

    for (let i = 0; i < prayerList.length; i++) {
      const [h, m] = prayerList[i].time.split(':').map(Number);
      const prayerDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m, 0);

      if (now < prayerDate) {
        upcoming = { ...prayerList[i], date: prayerDate };
        currentPrayerKey = i > 0 ? prayerList[i - 1].key : 'isya';
        break;
      }
    }

    // If all prayers passed today, next is tomorrow's Subuh
    if (!upcoming) {
      const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
      const tomorrowTimes = this.calculateTimes(tomorrow, this.currentCityKey);
      const [h, m] = tomorrowTimes.subuh.split(':').map(Number);
      upcoming = {
        name: 'Subuh (Besok)',
        key: 'subuh',
        time: tomorrowTimes.subuh,
        date: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), h, m, 0)
      };
      currentPrayerKey = 'isya';
    }

    this.nextPrayer = upcoming;

    // Highlight active / next prayer pill in UI
    document.querySelectorAll('.prayer-pill').forEach(pill => {
      pill.classList.remove('active', 'next');
      if (pill.dataset.prayer === upcoming.key) {
        pill.classList.add('next');
      }
    });

    const labelEl = document.getElementById('prayer-next-label');
    if (labelEl) {
      labelEl.textContent = `Menuju ${upcoming.name}`;
    }
  }

  tick() {
    const now = new Date();
    
    // Live digital clock in header
    const clockEl = document.getElementById('live-clock');
    if (clockEl) {
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      const city = PRAYER_CITIES[this.currentCityKey] || PRAYER_CITIES.jakarta;
      const tzName = city.timezone === 7 ? 'WIB' : city.timezone === 8 ? 'WITA' : 'WIT';
      clockEl.textContent = `${h}:${m}:${s} ${tzName}`;
    }

    if (!this.nextPrayer) return;

    let diffMs = this.nextPrayer.date - now;
    if (diffMs <= 0) {
      // Re-calculate next prayer
      this.updateSchedule();
      return;
    }

    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const mins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diffMs % (1000 * 60)) / 1000);

    const countdownEl = document.getElementById('prayer-countdown');
    if (countdownEl) {
      countdownEl.textContent = `${String(hours).padStart(2, '0')}j ${String(mins).padStart(2, '0')}m ${String(secs).padStart(2, '0')}d`;
    }
  }
}

window.PrayerTimeManager = new PrayerTimeManager();
