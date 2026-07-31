// ===================================================
// GDS – Shared script (nav, form)
// ===================================================

(function () {
  // ---- Work-in-progress password gate ----
  const WIP_KEY = 'gds_unlocked';
  const WIP_HASH = '4332cd76590d0efdbd8d067acf531546da2ba0a67c538440e7defedbea48d1dc';

  async function sha256Hex(text) {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
    return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('');
  }

  function hideWipGate() {
    const gate = document.getElementById('wipGate');
    if (gate) gate.classList.add('hidden');
  }

  const alreadyUnlocked = localStorage.getItem(WIP_KEY) === 'true';
  if (alreadyUnlocked) {
    hideWipGate();
  }

  // ---- Homepage hero intro: typewriter headline + stat count-up/scramble ----
  // Only actually starts once the hero is visible (i.e. not hidden behind the
  // WIP gate), otherwise it would play out unseen while the gate is up and
  // look "finished" the moment someone unlocks it.
  let heroIntroStarted = false;
  function startHeroIntro() {
    if (heroIntroStarted) return;
    heroIntroStarted = true;

    const heroStats = document.querySelector('.hero-stats');
    const heroH1 = document.querySelector('.hero h1');
    if (!heroStats || !heroH1 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const typeHeadline = (el, onDone) => {
      const segments = [...el.childNodes]
        .map((n) => ({
          text: n.textContent.replace(/\s+/g, ' '),
          grad: n.nodeType === 1 && n.classList.contains('grad-text'),
        }))
        .filter((s) => s.text.length > 0);

      // Build the full final text up front (all characters present, just
      // invisible) so line-wrapping is computed once against the complete
      // content — nothing reflows or jumps between lines as characters
      // are revealed, unlike incrementally growing the text.
      el.textContent = '';
      const charSpans = [];
      segments.forEach((seg) => {
        const host = seg.grad
          ? (() => {
              const span = document.createElement('span');
              span.className = 'grad-text';
              el.appendChild(span);
              return span;
            })()
          : el;
        [...seg.text].forEach((ch) => {
          const cspan = document.createElement('span');
          cspan.textContent = ch;
          cspan.style.visibility = 'hidden';
          host.appendChild(cspan);
          charSpans.push(cspan);
        });
      });

      const totalChars = charSpans.length;
      const charDelay = 65;
      const start = performance.now();

      const frame = (now) => {
        const shown = Math.floor((now - start) / charDelay);
        for (let i = 0; i < totalChars; i++) {
          charSpans[i].style.visibility = i < shown ? 'visible' : 'hidden';
        }
        if (shown < totalChars) {
          requestAnimationFrame(frame);
        } else {
          charSpans.forEach((s) => { s.style.visibility = 'visible'; });
          if (onDone) onDone();
        }
      };
      requestAnimationFrame(frame);
    };

    const countBetween = (el, from, target, suffix, duration) => {
      const start = performance.now();
      const frame = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(from + (target - from) * eased) + suffix;
        if (progress < 1) requestAnimationFrame(frame);
        else el.textContent = target + suffix;
      };
      requestAnimationFrame(frame);
    };

    const scrambleText = (el, finalText, duration) => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const start = performance.now();
      const frame = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        if (progress < 1) {
          let out = '';
          for (let i = 0; i < finalText.length; i++) out += chars[(Math.random() * chars.length) | 0];
          el.textContent = out;
          requestAnimationFrame(frame);
        } else {
          el.textContent = finalText;
        }
      };
      requestAnimationFrame(frame);
    };

    // Capture each stat's final value up front, then keep it randomly
    // "spinning" (like a slot machine) for as long as the headline is still
    // typing, so both effects visibly run together instead of one waiting
    // for the other. Once typing finishes, every stat settles into place.
    const spinChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const statMeta = [...heroStats.querySelectorAll('.stat')].map((statEl) => {
      const el = statEl.querySelector('b');
      const target = el.textContent.trim();
      const label = statEl.textContent.replace(target, '');
      const match = target.match(/^(\d+)(%?)$/);
      if (match) {
        const targetNum = parseInt(match[1], 10);
        const isAnsprechpartner = /Ansprechpartner/i.test(label);
        const isKernleistungen = /Kernleistungen/i.test(label);
        return {
          el,
          isNumber: true,
          suffix: match[2],
          target: targetNum,
          from: isAnsprechpartner ? 10 : 0,
          duration: isKernleistungen ? 2200 : 1400,
        };
      }
      return { el, isNumber: false, target, length: target.length };
    });

    // Lock each number/letters element to the widest width it will ever
    // need (spin values + final value), so the differing digit/letter
    // count never shifts the following stats in the flex row.
    statMeta.forEach((s) => {
      const probe = s.isNumber ? (s.suffix === '%' ? '100%' : '12') : 'W'.repeat(s.length);
      const original = s.el.textContent;
      s.el.textContent = probe;
      const w = s.el.getBoundingClientRect().width;
      s.el.textContent = original;
      s.el.style.minWidth = Math.ceil(w) + 'px';
    });

    let spinning = true;
    const spin = () => {
      if (!spinning) return;
      statMeta.forEach((s) => {
        if (s.isNumber) {
          const max = s.suffix === '%' ? 100 : 12;
          s.el.textContent = Math.floor(Math.random() * (max + 1)) + s.suffix;
        } else {
          let out = '';
          for (let i = 0; i < s.length; i++) out += spinChars[(Math.random() * spinChars.length) | 0];
          s.el.textContent = out;
        }
      });
      setTimeout(spin, 70);
    };
    spin();

    typeHeadline(heroH1, () => {
      spinning = false;
      setTimeout(() => {
        statMeta.forEach((s) => {
          if (s.isNumber) countBetween(s.el, s.from, s.target, s.suffix, s.duration);
          else scrambleText(s.el, s.target, 700);
        });
      }, 100);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (alreadyUnlocked) startHeroIntro();

    // Work-in-progress password gate
    const wipForm = document.getElementById('wipForm');
    if (wipForm) {
      wipForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const input = document.getElementById('wipPassword');
        const error = document.getElementById('wipError');
        const hash = await sha256Hex(input.value.trim());
        if (hash === WIP_HASH) {
          localStorage.setItem(WIP_KEY, 'true');
          hideWipGate();
          startHeroIntro();
        } else {
          error.textContent = 'Falsches Passwort.';
          input.value = '';
          input.focus();
        }
      });
    }

    // Mobile nav toggle
    const burger = document.getElementById('burger');
    const nav = document.getElementById('mainNav');
    if (burger && nav) {
      burger.addEventListener('click', () => {
        burger.classList.toggle('open');
        nav.classList.toggle('open');
      });
      nav.querySelectorAll('a').forEach((a) =>
        a.addEventListener('click', () => {
          burger.classList.remove('open');
          nav.classList.remove('open');
        })
      );
    }

    // Header scroll shadow + adaptive color (the header switches between its
    // dark and light gradient depending on which section sits at its position)
    const header = document.querySelector('header.site-header');
    if (header) {
      const sections = Array.from(document.querySelectorAll('section')).map((el) => ({
        el,
        isLight: !el.classList.contains('hero') && !el.classList.contains('section-dark'),
      }));
      let ticking = false;

      const updateHeaderContrast = () => {
        // Probe right at the header's own bottom edge: at scrollY 0 the header
        // still sits in normal flow (nothing is "underneath" it yet), so the
        // section starting immediately below must count as the current one.
        const probe = header.offsetHeight;
        let current = null;
        for (const s of sections) {
          const rect = s.el.getBoundingClientRect();
          if (rect.top <= probe && rect.bottom > probe) {
            current = s;
            break;
          }
        }
        if (!current) current = sections[0];
        if (!current) return;
        header.classList.toggle('on-light', current.isLight);
      };

      const onScroll = () => {
        header.classList.toggle('scrolled', window.scrollY > 10);
        if (!ticking) {
          window.requestAnimationFrame(() => {
            updateHeaderContrast();
            ticking = false;
          });
          ticking = true;
        }
      };

      window.addEventListener('scroll', onScroll);
      window.addEventListener('resize', updateHeaderContrast);
      updateHeaderContrast();
    }

    // Scroll-triggered reveal animations
    const revealEls = document.querySelectorAll('.reveal, .reveal-group');
    if (revealEls.length) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in-view');
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
      );
      revealEls.forEach((el) => io.observe(el));
    }

    // FAQ accordion
    document.querySelectorAll('.faq-item').forEach((item) => {
      const q = item.querySelector('.faq-q');
      const a = item.querySelector('.faq-a');
      q.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        item.closest('.faq-list').querySelectorAll('.faq-item.open').forEach((openItem) => {
          if (openItem !== item) {
            openItem.classList.remove('open');
            openItem.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
            openItem.querySelector('.faq-a').style.maxHeight = '0px';
          }
        });
        item.classList.toggle('open', !isOpen);
        q.setAttribute('aria-expanded', String(!isOpen));
        a.style.maxHeight = !isOpen ? a.scrollHeight + 'px' : '0px';
      });
    });

    // Contact form submission
    const form = document.getElementById('contactForm');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const msg = document.getElementById('formMsg');
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalHtml = submitBtn.innerHTML;
        submitBtn.textContent = '...';
        submitBtn.disabled = true;

        try {
          const endpoint = 'https://formspree.io/f/mdaqjgdn';
          const res = await fetch(endpoint, {
            method: 'POST',
            headers: { Accept: 'application/json' },
            body: new FormData(form),
          });

          if (res.ok) {
            msg.textContent = msg.dataset.ok;
            msg.className = 'form-msg show ok';
            form.reset();
          } else {
            throw new Error('Form submission failed');
          }
        } catch (err) {
          msg.textContent = msg.dataset.err;
          msg.className = 'form-msg show err';
        } finally {
          submitBtn.innerHTML = originalHtml;
          submitBtn.disabled = false;
        }
      });
    }
  });
})();
