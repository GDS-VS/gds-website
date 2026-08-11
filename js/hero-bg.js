// GDS – Hero: subtile generative Hintergrund-Animation (Partikel, Netzlinien, Formen)
(function () {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const hero = canvas.closest('.hero');
  if (!hero) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let width = 0, height = 0, dpr = 1;
  let particles = [];
  let shapes = [];
  let rafId = null;
  let paused = false;

  const mobile = () => width < 720;
  const rand = (min, max) => min + Math.random() * (max - min);

  function roundRectPath(c, x, y, w, h, r) {
    c.beginPath();
    c.moveTo(x + r, y);
    c.arcTo(x + w, y, x + w, y + h, r);
    c.arcTo(x + w, y + h, x, y + h, r);
    c.arcTo(x, y + h, x, y, r);
    c.arcTo(x, y, x + w, y, r);
    c.closePath();
  }

  function makeParticles() {
    const count = mobile() ? 20 : 52;
    particles = [];
    for (let i = 0; i < count; i++) {
      const x = width * (1 - Math.pow(Math.random(), 1.8));
      const y = rand(0, height);
      const depth = rand(0.35, 1);
      const rightness = x / width;
      particles.push({
        x, vx: rand(-0.055, 0.055) * depth,
        y, vy: rand(-0.05, 0.05) * depth,
        r: rand(1, 2.1) * depth,
        phase: rand(0, Math.PI * 2),
        opacity: (0.16 + 0.48 * rightness) * rand(0.6, 1),
      });
    }
  }

  function makeShapes() {
    shapes = [];
    const n = mobile() ? 2 : 4;
    for (let i = 0; i < n; i++) {
      shapes.push({
        kind: 'ring',
        x: rand(width * 0.55, width * 0.95),
        y: rand(height * 0.15, height * 0.9),
        r: rand(70, 200),
        depth: rand(0.15, 0.4),
        phase: rand(0, Math.PI * 2),
        opacity: rand(0.035, 0.09),
      });
    }
    if (!mobile()) {
      shapes.push({
        kind: 'frame',
        x: width * 0.78, y: height * 0.32,
        w: 130, h: 88, rot: -0.07,
        depth: 0.22, phase: rand(0, Math.PI * 2),
        opacity: 0.1,
      });
    }
  }

  function resize() {
    const rect = hero.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    makeParticles();
    makeShapes();
  }

  function step(p, t) {
    p.x += p.vx;
    p.y += p.vy + Math.sin(t * 0.00018 + p.phase) * 0.02;
    if (p.x < -20) p.x = width + 20;
    if (p.x > width + 20) p.x = -20;
    if (p.y < -20) p.y = height + 20;
    if (p.y > height + 20) p.y = -20;
  }

  function draw(t) {
    ctx.clearRect(0, 0, width, height);

    const maxDist = mobile() ? 100 : 130;
    ctx.lineWidth = 1;
    if (!mobile()) {
      ctx.shadowBlur = 4;
      ctx.shadowColor = 'rgba(122,122,224,0.5)';
    }
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist >= maxDist) continue;
        const o = (1 - dist / maxDist) * Math.min(a.opacity, b.opacity) * 0.5;
        if (o < 0.008) continue;
        ctx.strokeStyle = `rgba(122,122,224,${o})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
    ctx.shadowBlur = 0;

    shapes.forEach((s) => {
      const dx = Math.sin(t * 0.00012 + s.phase) * 14 * s.depth;
      const dy = Math.cos(t * 0.00009 + s.phase) * 10 * s.depth;
      ctx.save();
      ctx.translate(s.x + dx, s.y + dy);
      if (s.kind === 'ring') {
        ctx.beginPath();
        ctx.arc(0, 0, s.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,255,255,${s.opacity})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      } else if (s.kind === 'frame') {
        ctx.rotate(s.rot);
        ctx.strokeStyle = `rgba(122,122,224,${s.opacity})`;
        ctx.lineWidth = 1.2;
        roundRectPath(ctx, -s.w / 2, -s.h / 2, s.w, s.h, 8);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(-s.w / 2, -s.h / 2 + 20);
        ctx.lineTo(s.w / 2, -s.h / 2 + 20);
        ctx.strokeStyle = `rgba(122,122,224,${s.opacity * 0.8})`;
        ctx.stroke();
      }
      ctx.restore();
    });

    particles.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200,200,250,${p.opacity})`;
      ctx.fill();
    });
  }

  function frame(t) {
    if (paused) { rafId = null; return; }
    particles.forEach((p) => step(p, t));
    draw(t);
    rafId = requestAnimationFrame(frame);
  }

  function start() {
    resize();
    if (reduceMotion) { draw(0); return; }
    rafId = requestAnimationFrame(frame);
  }

  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 150);
  });

  document.addEventListener('visibilitychange', () => {
    paused = document.hidden;
    if (!paused && !reduceMotion && rafId === null) {
      rafId = requestAnimationFrame(frame);
    }
  });

  start();
})();
