(function () {
  // Ruled cardioid — build up CW (k=0→N), hold, then build down CW (erase k=0→N).
  // Both phases sweep in the same clockwise direction.
  const N = 60;
  const R = 32;
  const cx = 58, cy = 44;

  const lineEls = Array.from({ length: N }, (_, k) => {
    const a1 = (k / N) * 2 * Math.PI;
    const a2 = (2 * k / N) * 2 * Math.PI;
    const x1 = (cx + R * Math.cos(a1)).toFixed(2);
    const y1 = (cy + R * Math.sin(a1)).toFixed(2);
    const x2 = (cx + R * Math.cos(a2)).toFixed(2);
    const y2 = (cy + R * Math.sin(a2)).toFixed(2);
    return `<line id="rl${k}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" opacity="0"/>`;
  }).join('\n    ');

  window.ANIM_CSS = `
<style>
  .ruled-group line { stroke: currentColor; stroke-width: 0.9; }
  .anim-v2 .ruled-group { color: var(--anim-color-left); }
</style>`;

  window.ANIM_SVG = `
<svg width="116" height="88" viewBox="0 0 116 88" xmlns="http://www.w3.org/2000/svg">
  <g class="ruled-group">
    ${lineEls}
  </g>
</svg>`;

  const DUR = 10000, BUILD_END = 0.5, HOLD_END = 0.5;
  let els = null;

  requestAnimationFrame(function loop(now) {
    if (!els) {
      if (!document.getElementById('rl0')) { requestAnimationFrame(loop); return; }
      els = Array.from({ length: N }, (_, k) => document.getElementById(`rl${k}`));
    }

    const phase = (now % DUR) / DUR;
    let n;

    if (phase < BUILD_END) {
      // build up CW: reveal k=0..n
      n = Math.round(N * phase / BUILD_END);
      els.forEach((el, k) => el && el.setAttribute('opacity', k < n ? '0.65' : '0'));
    } else if (phase < HOLD_END) {
      els.forEach(el => el && el.setAttribute('opacity', '0.65'));
    } else {
      // build down CW: erase from k=0 forward
      n = Math.round(N * (phase - HOLD_END) / (1 - HOLD_END));
      els.forEach((el, k) => el && el.setAttribute('opacity', k >= n ? '0.65' : '0'));
    }

    requestAnimationFrame(loop);
  });
})();
