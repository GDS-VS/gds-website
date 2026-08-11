// GDS – wiederverwendbarer generativer Hintergrund (Partikel, Netzlinien, Formen) fuer blaue Sektionen
(function () {
  const canvases = document.querySelectorAll('.bg-canvas');
  if (!canvases.length) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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

  function createInstance(canvas) {
    const host = canvas.parentElement;
    const ctx = canvas.getContext('2d');
    if (!ctx || !host) return;

    const bias = canvas.dataset.bias || 'right';
    const density = canvas.dataset.density || 'normal';
    const theme = canvas.dataset.theme || 'dark';

    let width = 0, height = 0, dpr = 1;
    let particles = [];
    let shapes = [];
    let rafId = null;
    let paused = true;
    let inView = false;

    const mobile = () => width < 720;
    const baseCount = density === 'header' ? 14 : density === 'light' ? 26 : 52;
    const mobileCount = density === 'header' ? 7 : density === 'light' ? 12 : 20;
    const opacityScale = density === 'header' ? 0.6 : 1;
    const particleColor = theme === 'light' ? '25,25,112' : '200,200,250';
    const ringColor = theme === 'light' ? '25,25,112' : '255,255,255';

    function particleX() {
      return rand(0, width);
    }

    function makeParticles() {
      const count = mobile() ? mobileCount : baseCount;
      particles = [];
      for (let i = 0; i < count; i++) {
        const x = particleX();
        const y = rand(0, height);
        const depth = rand(0.35, 1);
        particles.push({
          x, vx: rand(-0.055, 0.055) * depth,
          y, vy: rand(-0.05, 0.05) * depth,
          r: rand(1, 2.1) * depth,
          phase: rand(0, Math.PI * 2),
          opacity: (0.18 + 0.28 * rand(0, 1)) * rand(0.6, 1) * opacityScale,
        });
      }
    }

    function makeShapes() {
      shapes = [];
      if (density === 'header') return;
      const n = mobile() ? 1 : (density === 'light' ? 2 : 3);
      const xMin = width * 0.1;
      const xMax = width * 0.9;
      for (let i = 0; i < n; i++) {
        shapes.push({
          kind: 'ring',
          x: rand(xMin, xMax),
          y: rand(height * 0.15, height * 0.9),
          r: rand(50, density === 'light' ? 120 : 180),
          depth: rand(0.15, 0.4),
          phase: rand(0, Math.PI * 2),
          opacity: rand(0.03, 0.08),
        });
      }
      if (!mobile() && density !== 'light') {
        shapes.push({
          kind: 'frame',
          x: rand(xMin, xMax), y: rand(height * 0.2, height * 0.85),
          w: 130, h: 88, rot: -0.07,
          depth: 0.22, phase: rand(0, Math.PI * 2),
          opacity: 0.1,
        });
      }
    }

    function resize() {
      const rect = host.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      if (width === 0 || height === 0) return;
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

      const maxDist = mobile() ? 90 : (density === 'header' ? 75 : density === 'light' ? 110 : 130);
      ctx.lineWidth = 1;
      if (!mobile() && density !== 'header') {
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
          ctx.strokeStyle = `rgba(${ringColor},${s.opacity})`;
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
        ctx.fillStyle = `rgba(${particleColor},${p.opacity})`;
        ctx.fill();
      });
    }

    function frame(t) {
      if (paused) { rafId = null; return; }
      particles.forEach((p) => step(p, t));
      draw(t);
      rafId = requestAnimationFrame(frame);
    }

    function play() {
      paused = false;
      if (rafId === null) rafId = requestAnimationFrame(frame);
    }
    function stop() {
      paused = true;
    }

    resize();
    if (reduceMotion) {
      draw(0);
    } else {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          inView = entry.isIntersecting;
          if (inView && !document.hidden) play();
          else stop();
        });
      }, { rootMargin: '80px' });
      io.observe(host);

      document.addEventListener('visibilitychange', () => {
        if (document.hidden) stop();
        else if (inView) play();
      });
    }

    let resizeTimer = null;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    });
  }

  canvases.forEach(createInstance);
})();
