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

  // ---- Homepage hero intro: calm stat entrance + rotating headline phrase ----
  // Only actually starts once the hero is visible (i.e. not hidden behind the
  // WIP gate), otherwise it would play out unseen while the gate is up and
  // look "finished" the moment someone unlocks it.
  let heroIntroStarted = false;
  function startHeroIntro() {
    if (heroIntroStarted) return;
    heroIntroStarted = true;

    const heroStats = document.querySelector('.hero-stats');
    const phraseWrap = document.querySelector('.hero-phrase');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (heroStats) {
      requestAnimationFrame(() => heroStats.classList.add('is-visible'));
    }

    if (phraseWrap && !reduceMotion) {
      const items = [...phraseWrap.querySelectorAll('.hero-phrase-item')];
      if (items.length > 1) {
        let idx = Math.max(0, items.findIndex((el) => el.classList.contains('is-active')));
        const HOLD = 3000;
        const TRANSITION = 550;
        const advance = () => {
          const current = items[idx];
          idx = (idx + 1) % items.length;
          const next = items[idx];
          current.classList.remove('is-active');
          current.classList.add('is-leaving');
          next.classList.add('is-active');
          setTimeout(() => current.classList.remove('is-leaving'), TRANSITION);
          setTimeout(advance, HOLD);
        };
        setTimeout(advance, HOLD);
      }
    }
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

    // Header scroll shadow (the header is always the light variant now, so no
    // adaptive dark/light contrast switching is needed any more)
    const header = document.querySelector('header.site-header');
    if (header) {
      header.classList.add('on-light');
      const onScroll = () => {
        header.classList.toggle('scrolled', window.scrollY > 10);
      };
      window.addEventListener('scroll', onScroll);
      onScroll();
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
