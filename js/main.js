/**
 * AntiGravity Cyber-Obsidian Master Orchestration Engine
 * Handles Target Cursor, Magnetic CTAs, Filterable Matrix, CGPA Progress Gauge, and Resume Modal
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Components
  initCustomTargetCursor();
  initMagneticElements();
  initTopBarTelemetry();
  initSkillMatrixFilter();
  initCgpaCircularGauge();
  initResumeModal();
  initSoundToggle();
  initMobileNavigation();

  // Initialize Project Slider
  if (window.initAntiGravitySlider) {
    window.initAntiGravitySlider();
  }
});

// =========================================================================
// 1. DUAL-RING TARGET CURSOR WITH CROSSHAIRS
// =========================================================================
function initCustomTargetCursor() {
  const cursor = document.getElementById('custom-cursor');
  if (!cursor || window.innerWidth < 768) return;

  let mouseX = -100;
  let mouseY = -100;
  let currentX = -100;
  let currentY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Track hover state across interactive items
  const interactiveTargets = document.querySelectorAll('a, button, input, textarea, .skill-card, .project-card, .interactive-badge, .filter-tab');
  
  interactiveTargets.forEach((target) => {
    target.addEventListener('mouseenter', () => {
      cursor.classList.add('hovering');
      if (window.cyberAudio) window.cyberAudio.playHover();
    });
    target.addEventListener('mouseleave', () => {
      cursor.classList.remove('hovering');
    });
  });

  window.addEventListener('mousedown', () => cursor.classList.add('clicking'));
  window.addEventListener('mouseup', () => cursor.classList.remove('clicking'));

  function renderCursor() {
    // Smooth lerp
    currentX += (mouseX - currentX) * 0.22;
    currentY += (mouseY - currentY) * 0.22;

    cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
    requestAnimationFrame(renderCursor);
  }

  requestAnimationFrame(renderCursor);
}

// =========================================================================
// 2. MAGNETIC HOVER PHYSICS ON PRIMARY CTAS
// =========================================================================
function initMagneticElements() {
  const magneticEls = document.querySelectorAll('.magnetic-target');
  
  magneticEls.forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      el.style.transform = `translate3d(${x * 0.25}px, ${y * 0.25}px, 0)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = `translate3d(0px, 0px, 0)`;
      el.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
    });

    el.addEventListener('mouseenter', () => {
      el.style.transition = 'none';
    });
  });
}

// =========================================================================
// 3. TOP TELEMETRY BAR & CHENNAI LIVE CLOCK
// =========================================================================
function initTopBarTelemetry() {
  const clockEl = document.getElementById('live-chennai-clock');
  const pingEl = document.getElementById('live-ping-val');

  function updateClock() {
    if (!clockEl) return;
    const now = new Date();
    // Chennai, India is UTC+5:30
    const options = {
      timeZone: 'Asia/Kolkata',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    clockEl.textContent = `${now.toLocaleTimeString('en-GB', options)} IST`;
  }

  updateClock();
  setInterval(updateClock, 1000);

  // Micro ping jitter simulation
  setInterval(() => {
    if (pingEl) {
      const ping = Math.floor(Math.random() * 6 + 18);
      pingEl.textContent = `${ping}ms`;
    }
  }, 3000);
}

// =========================================================================
// 4. TECHNICAL ARSENAL & SOC CAPABILITY MATRIX FILTER
// =========================================================================
function initSkillMatrixFilter() {
  const filterBtns = document.querySelectorAll('.skill-filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');
  const activeCountEl = document.getElementById('active-skills-count');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (window.cyberAudio) window.cyberAudio.playClick();
      
      const filter = btn.dataset.filter;

      filterBtns.forEach((b) => {
        b.classList.remove('bg-emerald-500/20', 'border-emerald-400', 'text-emerald-400');
        b.classList.add('border-white/10', 'text-gray-400');
      });

      btn.classList.add('bg-emerald-500/20', 'border-emerald-400', 'text-emerald-400');
      btn.classList.remove('border-white/10', 'text-gray-400');

      let visibleCount = 0;

      skillCards.forEach((card) => {
        const category = card.dataset.category;
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      if (activeCountEl) {
        activeCountEl.textContent = `${visibleCount} VECTORS ACTIVE`;
      }
    });
  });

  // Clicking a skill command snippet automatically copies it and gives toast feedback
  document.querySelectorAll('.skill-cli-reveal').forEach((snippet) => {
    snippet.addEventListener('click', (e) => {
      e.stopPropagation();
      const cmd = snippet.innerText.trim();
      navigator.clipboard.writeText(cmd).then(() => {
        const orig = snippet.innerHTML;
        snippet.innerHTML = `<span class="text-emerald-400 font-bold">✓ COPIED COMMAND TO CLIPBOARD</span>`;
        if (window.cyberAudio) window.cyberAudio.playConfirm();
        setTimeout(() => {
          snippet.innerHTML = orig;
        }, 1800);
      });
    });
  });
}

// =========================================================================
// 5. CGPA 8.0 PROGRESS CIRCLE INDICATOR
// =========================================================================
function initCgpaCircularGauge() {
  const circle = document.getElementById('cgpa-circle-progress');
  const scoreText = document.getElementById('cgpa-score-val');
  if (!circle || !scoreText) return;

  const totalCircumference = 2 * Math.PI * 52; // r=52 -> 326.72
  circle.style.strokeDasharray = `${totalCircumference} ${totalCircumference}`;
  circle.style.strokeDashoffset = totalCircumference;

  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        // 8.0 / 10.0 = 80%
        const targetPercent = 0.8;
        const targetOffset = totalCircumference - (totalCircumference * targetPercent);

        circle.style.transition = 'stroke-dashoffset 2s cubic-bezier(0.16, 1, 0.3, 1)';
        circle.style.strokeDashoffset = targetOffset;

        // Counter up to 8.0
        let current = 0.0;
        const interval = setInterval(() => {
          current += 0.1;
          if (current >= 8.0) {
            current = 8.0;
            clearInterval(interval);
          }
          scoreText.textContent = current.toFixed(1);
        }, 25);
      }
    });
  }, { threshold: 0.3 });

  const parent = document.getElementById('academic-section');
  if (parent) observer.observe(parent);
}

// =========================================================================
// 6. RESUME MODAL & ATS DOWNLOAD ENGINE
// =========================================================================
function initResumeModal() {
  const modal = document.getElementById('resume-modal');
  const openBtns = document.querySelectorAll('.open-resume-btn');
  const closeBtns = document.querySelectorAll('.close-resume-btn');
  const printBtn = document.getElementById('print-resume-btn');

  if (!modal) return;

  openBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('open');
      if (window.cyberAudio) window.cyberAudio.playConfirm();
    });
  });

  closeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      modal.classList.remove('open');
      if (window.cyberAudio) window.cyberAudio.playClick();
    });
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('open');
    }
  });

  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Escape key closes modal
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      modal.classList.remove('open');
    }
  });

  // Copy email & phone quick action
  const copyEmailBtn = document.getElementById('copy-email-btn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('guganmurugan77@gmail.com').then(() => {
        const span = copyEmailBtn.querySelector('span');
        const orig = span.textContent;
        span.textContent = 'COPIED!';
        if (window.cyberAudio) window.cyberAudio.playConfirm();
        setTimeout(() => (span.textContent = orig), 2000);
      });
    });
  }
}

// =========================================================================
// 7. SOUND TOGGLE BUTTON
// =========================================================================
function initSoundToggle() {
  const soundBtn = document.getElementById('sound-toggle-btn');
  if (!soundBtn || !window.cyberAudio) return;

  soundBtn.addEventListener('click', () => {
    const isMuted = !window.cyberAudio.toggle();
    const label = soundBtn.querySelector('.sound-label');
    const icon = soundBtn.querySelector('.sound-icon');

    if (!isMuted) {
      soundBtn.classList.add('active');
      label.textContent = 'AUDIO: ON';
      icon.innerHTML = `<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>`;
    } else {
      soundBtn.classList.remove('active');
      label.textContent = 'AUDIO: OFF';
      icon.innerHTML = `<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"/></svg>`;
    }
  });
}

// =========================================================================
// 8. MOBILE NAVIGATION DRAWER
// =========================================================================
function initMobileNavigation() {
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const mobileNav = document.getElementById('mobile-nav-drawer');
  const closeBtn = document.getElementById('close-mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!menuToggle || !mobileNav) return;

  menuToggle.addEventListener('click', () => {
    mobileNav.classList.remove('hidden');
    if (window.cyberAudio) window.cyberAudio.playClick();
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      mobileNav.classList.add('hidden');
    });
  }

  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      mobileNav.classList.add('hidden');
    });
  });
}
