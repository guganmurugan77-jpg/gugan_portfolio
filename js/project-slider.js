/**
 * AntiGravity Inertial Motion Project Slider & 3D Tilt Engine
 * Features kinetic drag physics, dynamic velocity skew, vertical oscillation, and 3D card perspective tilt.
 */

class AntiGravitySlider {
  constructor(viewportEl, trackEl) {
    this.viewport = viewportEl;
    this.track = trackEl;
    this.cards = Array.from(this.track.querySelectorAll('.project-card'));

    this.currentX = 0;
    this.targetX = 0;
    this.minX = 0;
    this.maxX = 0;

    this.isDragging = false;
    this.startX = 0;
    this.lastX = 0;
    this.velocity = 0;
    this.skew = 0;

    this.time = 0;
    this.animFrameId = null;

    this.init();
  }

  init() {
    this.calculateBounds();
    window.addEventListener('resize', () => this.calculateBounds());

    // Pointer Events for unified touch & mouse drag
    this.viewport.addEventListener('pointerdown', (e) => this.onPointerDown(e));
    window.addEventListener('pointermove', (e) => this.onPointerMove(e));
    window.addEventListener('pointerup', () => this.onPointerUp());
    window.addEventListener('pointercancel', () => this.onPointerUp());

    // Wheel horizontal scrolling
    this.viewport.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey) {
        e.preventDefault();
        const delta = e.deltaX !== 0 ? e.deltaX : e.deltaY;
        this.targetX -= delta * 1.2;
        this.clampTarget();
      }
    }, { passive: false });

    // 3D Tilt Setup on cards
    this.setupCardTilt();

    // Start Animation Loop
    this.loop();
  }

  calculateBounds() {
    const viewportWidth = this.viewport.clientWidth;
    const trackWidth = this.track.scrollWidth;
    this.minX = Math.min(0, viewportWidth - trackWidth - 40);
    this.maxX = 0;
    this.clampTarget();
  }

  clampTarget() {
    this.targetX = Math.max(this.minX, Math.min(this.maxX, this.targetX));
  }

  onPointerDown(e) {
    // If clicking an interactive button or tag inside the card, don't drag
    if (e.target.closest('button, a, input, select, .interactive-tab')) return;

    this.isDragging = true;
    this.startX = e.clientX - this.targetX;
    this.lastX = e.clientX;
    this.velocity = 0;
    this.viewport.setPointerCapture(e.pointerId);
  }

  onPointerMove(e) {
    if (!this.isDragging) return;

    const currentX = e.clientX;
    this.velocity = currentX - this.lastX;
    this.lastX = currentX;

    this.targetX = currentX - this.startX;

    // Resistance at bounds
    if (this.targetX > this.maxX) {
      this.targetX = this.maxX + (this.targetX - this.maxX) * 0.3;
    } else if (this.targetX < this.minX) {
      this.targetX = this.minX + (this.targetX - this.minX) * 0.3;
    }
  }

  onPointerUp() {
    if (!this.isDragging) return;
    this.isDragging = false;

    // Inertial throw
    this.targetX += this.velocity * 6;
    this.clampTarget();
  }

  slideNext() {
    const cardWidth = this.cards[0] ? this.cards[0].offsetWidth + 32 : 480;
    this.targetX -= cardWidth;
    this.clampTarget();
    if (window.cyberAudio) window.cyberAudio.playClick();
  }

  slidePrev() {
    const cardWidth = this.cards[0] ? this.cards[0].offsetWidth + 32 : 480;
    this.targetX += cardWidth;
    this.clampTarget();
    if (window.cyberAudio) window.cyberAudio.playClick();
  }

  setupCardTilt() {
    this.cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        if (this.isDragging) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -7;
        const rotateY = ((x - centerX) / centerX) * 7;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(${card.dataset.floatY || 0}px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(${card.dataset.floatY || 0}px)`;
      });
    });
  }

  loop() {
    this.time += 0.035;

    // Smooth interpolation towards targetX
    const lerpFactor = this.isDragging ? 0.25 : 0.08;
    this.currentX += (this.targetX - this.currentX) * lerpFactor;

    // Velocity skew effect: tilts the cards dynamically while moving
    const speed = this.targetX - this.currentX;
    this.skew += (speed * 0.04 - this.skew) * 0.1;
    const clampedSkew = Math.max(-8, Math.min(8, this.skew));

    // Update Track Transform with Dynamic Skew
    this.track.style.transform = `translate3d(${this.currentX.toFixed(2)}px, 0, 0) skewX(${clampedSkew.toFixed(2)}deg)`;

    // Anti-Gravity Vertical Oscillation (+/- 8px)
    this.cards.forEach((card, idx) => {
      const floatY = Math.sin(this.time + idx * 1.3) * 7;
      card.dataset.floatY = floatY.toFixed(2);
      // If card is not currently tilted by mouse hover, apply vertical oscillation
      if (!card.matches(':hover') || this.isDragging) {
        card.style.transform = `translateY(${floatY.toFixed(2)}px)`;
      }
    });

    this.animFrameId = requestAnimationFrame(() => this.loop());
  }
}

// Interactive Project Card Telemetry Simulator
function initProjectTelemetryTabs() {
  document.querySelectorAll('.project-card').forEach((card) => {
    const tabs = card.querySelectorAll('.telemetry-tab-btn');
    const displays = card.querySelectorAll('.telemetry-content-pane');

    tabs.forEach((tab) => {
      tab.addEventListener('click', (e) => {
        e.stopPropagation();
        if (window.cyberAudio) window.cyberAudio.playHover();
        
        const target = tab.dataset.tab;
        tabs.forEach((t) => t.classList.remove('active', 'border-accent-emerald', 'text-emerald', 'bg-emerald/10'));
        tab.classList.add('active', 'border-accent-emerald', 'text-emerald', 'bg-emerald/10');

        displays.forEach((pane) => {
          if (pane.dataset.pane === target) {
            pane.classList.remove('hidden');
          } else {
            pane.classList.add('hidden');
          }
        });
      });
    });
  });
}

window.initAntiGravitySlider = function () {
  const viewport = document.querySelector('.project-slider-viewport');
  const track = document.querySelector('.project-track');
  if (viewport && track) {
    const slider = new AntiGravitySlider(viewport, track);

    const prevBtn = document.getElementById('slider-prev');
    const nextBtn = document.getElementById('slider-next');
    if (prevBtn) prevBtn.addEventListener('click', () => slider.slidePrev());
    if (nextBtn) nextBtn.addEventListener('click', () => slider.slideNext());

    initProjectTelemetryTabs();
  }
};
