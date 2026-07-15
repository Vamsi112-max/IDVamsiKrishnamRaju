// ============================================================
// VAMSI INAMPUDI — PORTFOLIO
// Small, dependency-free behaviors. No framework required.
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---- mobile nav ---- */
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.navlinks');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.style.display === 'flex';
      links.style.display = open ? 'none' : 'flex';
      links.style.cssText += open ? '' : `
        position:absolute; top:64px; left:0; right:0; background:#0A0D10;
        flex-direction:column; padding:20px 28px; border-bottom:1px solid #212830; gap:18px;
      `;
    });
  }

  /* ---- scroll reveal ---- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  /* ---- project card: cursor-follow glow + click-through navigation ----
     Cards are <article> elements (not <a>) so real links to external demo /
     source URLs inside them stay valid, unbroken, ctrl-click-able HTML.
     A click anywhere else on the card navigates to the detail page. */
  document.querySelectorAll('.proj-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    });

    const dest = card.dataset.href;
    if (dest) {
      card.addEventListener('click', (e) => {
        if (e.target.closest('a')) return; // let real links behave normally
        window.location.href = dest;
      });
    }
  });

  /* ---- live-looking stat counters (hero "system status" panel) ----
     Purely decorative, ambient — ticks gently to reinforce the
     "systems that watch and think" thesis without being gimmicky. */
  const counters = document.querySelectorAll('[data-count-to]');
  if ('IntersectionObserver' in window && counters.length) {
    const seen = new WeakSet();
    const cio = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !seen.has(entry.target)) {
          seen.add(entry.target);
          animateCount(entry.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(el => cio.observe(el));
  }

  function animateCount(el) {
    const to = parseFloat(el.dataset.countTo);
    const decimals = el.dataset.countTo.includes('.') ? 2 : 0;
    const duration = 1100;
    const start = performance.now();
    function frame(now) {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = to * eased;
      el.textContent = decimals ? val.toFixed(decimals) : Math.round(val);
      if (p < 1) requestAnimationFrame(frame);
      else el.textContent = decimals ? to.toFixed(decimals) : to;
    }
    requestAnimationFrame(frame);
  }

  /* ---- gentle uptime ticker in hero terminal, if present ---- */
  const uptimeEl = document.querySelector('[data-uptime]');
  if (uptimeEl) {
    let seconds = parseInt(uptimeEl.dataset.uptime, 10) || 0;
    setInterval(() => {
      seconds += 1;
      const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
      const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
      const s = String(seconds % 60).padStart(2, '0');
      uptimeEl.textContent = `${h}:${m}:${s}`;
    }, 1000);
  }

});
