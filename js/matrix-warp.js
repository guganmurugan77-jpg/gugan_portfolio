/**
 * AntiGravity Spatial Grid & Particle Warp Engine
 * Simulates a gravitational field warp on deep cyan grid lines with floating cyber particles.
 */

(function () {
  const canvas = document.getElementById('warp-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  // Mouse interaction state with inertial smoothing
  const mouse = {
    x: width / 2,
    y: height / 2,
    targetX: width / 2,
    targetY: height / 2,
    radius: 180,
    strength: 45,
    isHovered: false
  };

  // Grid Configuration
  const GRID_SPACING = 50;
  let cols = Math.ceil(width / GRID_SPACING) + 2;
  let rows = Math.ceil(height / GRID_SPACING) + 2;
  let points = [];

  class GridPoint {
    constructor(baseX, baseY) {
      this.baseX = baseX;
      this.baseY = baseY;
      this.x = baseX;
      this.y = baseY;
      this.vx = 0;
      this.vy = 0;
      this.spring = 0.08;
      this.friction = 0.88;
    }

    update() {
      // Vector from mouse to point
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < mouse.radius) {
        const force = (1 - dist / mouse.radius) * mouse.strength;
        const angle = Math.atan2(dy, dx);
        this.vx += Math.cos(angle) * force * 0.15;
        this.vy += Math.sin(angle) * force * 0.15;
      }

      // Spring force back to base position
      const dBaseX = this.baseX - this.x;
      const dBaseY = this.baseY - this.y;
      this.vx += dBaseX * this.spring;
      this.vy += dBaseY * this.spring;

      // Friction damping
      this.vx *= this.friction;
      this.vy *= this.friction;

      this.x += this.vx;
      this.y += this.vy;
    }
  }

  function initGrid() {
    cols = Math.ceil(width / GRID_SPACING) + 2;
    rows = Math.ceil(height / GRID_SPACING) + 2;
    points = [];

    for (let r = 0; r < rows; r++) {
      const row = [];
      for (let c = 0; c < cols; c++) {
        const baseX = (c - 1) * GRID_SPACING;
        const baseY = (r - 1) * GRID_SPACING;
        row.push(new GridPoint(baseX, baseY));
      }
      points.push(row);
    }
  }

  // Floating Cyber Particles
  const PARTICLE_COUNT = 45;
  const particles = [];
  const CYBER_GLYPHS = ['0x1A', 'SYN', 'ACK', 'SEC', '8.0', 'PORT', '0xFF', 'ETH', 'SSH', 'TCP'];

  class Particle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 20;
      this.size = Math.random() * 2 + 1;
      this.speedY = -(Math.random() * 0.6 + 0.2);
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.opacity = Math.random() * 0.5 + 0.2;
      this.pulseSpeed = Math.random() * 0.02 + 0.01;
      this.pulseAngle = Math.random() * Math.PI * 2;
      this.isGlyph = Math.random() > 0.8;
      this.glyph = CYBER_GLYPHS[Math.floor(Math.random() * CYBER_GLYPHS.length)];
    }

    update() {
      this.y += this.speedY;
      this.x += this.speedX;
      this.pulseAngle += this.pulseSpeed;

      // Mouse repulsion
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        const force = (1 - dist / 100) * 1.5;
        this.x += (dx / dist) * force;
        this.y += (dy / dist) * force;
      }

      if (this.y < -20 || this.x < -20 || this.x > width + 20) {
        this.reset(false);
      }
    }

    draw() {
      const currentOpacity = this.opacity * (0.7 + 0.3 * Math.sin(this.pulseAngle));
      ctx.save();
      if (this.isGlyph) {
        ctx.font = '9px "JetBrains Mono", monospace';
        ctx.fillStyle = `rgba(0, 255, 102, ${currentOpacity * 0.7})`;
        ctx.fillText(this.glyph, this.x, this.y);
      } else {
        ctx.fillStyle = `rgba(0, 229, 255, ${currentOpacity})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(0, 229, 255, 0.6)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle());
  }

  initGrid();

  // Resize handler
  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initGrid();
  });

  // Track Mouse
  window.addEventListener('mousemove', (e) => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
    mouse.isHovered = true;
  });

  window.addEventListener('mouseleave', () => {
    mouse.isHovered = false;
  });

  // Main Render Loop
  function render() {
    // Smooth mouse interpolation
    mouse.x += (mouse.targetX - mouse.x) * 0.1;
    mouse.y += (mouse.targetY - mouse.y) * 0.1;

    ctx.clearRect(0, 0, width, height);

    // 1. Update Grid Points
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        points[r][c].update();
      }
    }

    // 2. Draw Horizontal & Vertical Grid Lines
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(10, 37, 64, 0.45)'; // #0A2540 deep cyan lines

    // Horizontal Lines
    for (let r = 0; r < rows; r++) {
      ctx.beginPath();
      for (let c = 0; c < cols; c++) {
        const pt = points[r][c];
        if (c === 0) {
          ctx.moveTo(pt.x, pt.y);
        } else {
          ctx.lineTo(pt.x, pt.y);
        }
      }
      ctx.stroke();
    }

    // Vertical Lines
    for (let c = 0; c < cols; c++) {
      ctx.beginPath();
      for (let r = 0; r < rows; r++) {
        const pt = points[r][c];
        if (r === 0) {
          ctx.moveTo(pt.x, pt.y);
        } else {
          ctx.lineTo(pt.x, pt.y);
        }
      }
      ctx.stroke();
    }

    // Highlight Grid Intersections near mouse
    ctx.fillStyle = 'rgba(0, 255, 102, 0.35)';
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const pt = points[r][c];
        const dx = pt.x - mouse.x;
        const dy = pt.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          const alpha = (1 - dist / 140) * 0.8;
          ctx.fillStyle = `rgba(0, 255, 102, ${alpha})`;
          ctx.fillRect(pt.x - 1.5, pt.y - 1.5, 3, 3);
        }
      }
    }

    // 3. Render Cyber Floating Particles
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
})();
