const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}, { passive: true });

document.querySelectorAll('[data-scroll]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.dataset.scroll;
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});

(function () {
  const heroName = document.querySelector('.hero__name');
  if (!heroName) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let tx = 0, ty = 0, cx = 0, cy = 0, raf = null;

  document.addEventListener('mousemove', (e) => {
    const mx = (e.clientX / window.innerWidth  - 0.5) * 2;
    const my = (e.clientY / window.innerHeight - 0.5) * 2;
    tx = mx * 8;
    ty = my * 4;
    if (!raf) raf = requestAnimationFrame(tick);
  });

  function tick() {
    cx += (tx - cx) * 0.07;
    cy += (ty - cy) * 0.07;
    heroName.style.transform = `translate(${cx}px, ${cy}px)`;
    if (Math.abs(tx - cx) + Math.abs(ty - cy) > 0.05) {
      raf = requestAnimationFrame(tick);
    } else {
      heroName.style.transform = `translate(${tx}px, ${ty}px)`;
      raf = null;
    }
  }
})();

(function () {
  const btn     = document.getElementById('secret-btn');
  const overlay = document.getElementById('transition-overlay');
  if (!btn || !overlay) return;

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    overlay.classList.add('active');
    setTimeout(() => {
      window.location.href = 'Secret/login.html';
    }, 700);
  });
})();

(function () {
  const timeEl = document.getElementById('now-time');
  if (!timeEl) return;

  function tick() {
    const now = new Date();
    const hh  = String(now.getHours()).padStart(2, '0');
    const mm  = String(now.getMinutes()).padStart(2, '0');
    const ss  = String(now.getSeconds()).padStart(2, '0');
    timeEl.textContent = `${hh}:${mm}:${ss}`;
  }

  tick();
  setInterval(tick, 1000);
})();

(function () {
  const descEl = document.getElementById('now-desc');
  const iconEl = document.getElementById('now-icon');
  const tempEl = document.getElementById('now-temp');
  if (!descEl || !iconEl || !tempEl) return;

  const WMO = {
    0:  { icon: '☀️',  label: 'ясно' },
    1:  { icon: '🌤️',  label: 'преимущественно ясно' },
    2:  { icon: '⛅',  label: 'переменная облачность' },
    3:  { icon: '☁️',  label: 'пасмурно' },
    45: { icon: '🌫️',  label: 'туман' },
    48: { icon: '🌫️',  label: 'изморозь' },
    51: { icon: '🌦️',  label: 'лёгкая морось' },
    53: { icon: '🌦️',  label: 'морось' },
    55: { icon: '🌧️',  label: 'сильная морось' },
    61: { icon: '🌧️',  label: 'небольшой дождь' },
    63: { icon: '🌧️',  label: 'дождь' },
    65: { icon: '🌧️',  label: 'сильный дождь' },
    71: { icon: '🌨️',  label: 'небольшой снег' },
    73: { icon: '🌨️',  label: 'снег' },
    75: { icon: '❄️',  label: 'сильный снег' },
    77: { icon: '🌨️',  label: 'снежная крупа' },
    80: { icon: '🌦️',  label: 'ливневый дождь' },
    81: { icon: '🌧️',  label: 'ливень' },
    82: { icon: '⛈️',  label: 'сильный ливень' },
    85: { icon: '🌨️',  label: 'снегопад' },
    86: { icon: '❄️',  label: 'сильный снегопад' },
    95: { icon: '⛈️',  label: 'гроза' },
    96: { icon: '⛈️',  label: 'гроза с градом' },
    99: { icon: '⛈️',  label: 'сильная гроза с градом' },
  };

  const LAT = 46.9597;
  const LON = 142.7384;

  async function fetchWeather() {
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current_weather=true&temperature_unit=celsius`;
      const res  = await fetch(url);
      if (!res.ok) throw new Error('network');
      const data = await res.json();
      const cw   = data.current_weather;

      const code  = cw.weathercode;
      const temp  = Math.round(cw.temperature);
      const info  = WMO[code] || { icon: '🌡️', label: `код ${code}` };

      iconEl.textContent = info.icon;
      descEl.textContent = info.label;
      tempEl.textContent = `${temp > 0 ? '+' : ''}${temp}°C`;
    } catch {
      descEl.textContent = 'нет данных';
      iconEl.textContent = '·';
      tempEl.textContent = '';
    }
  }

  fetchWeather();
  setInterval(fetchWeather, 12 * 60 * 1000);
})();
