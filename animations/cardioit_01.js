(function () {
  // Ruled cardioid with rounded cusp cap + build-up / build-down cycle.
  // A quadratic bezier connects P1(1) and P1(N-1) just right of the cusp,
  // rounding the tip of the cardioid. Chord lines appear one by one (build up),
  // hold briefly at full pattern, then disappear in reverse (build down).
  const N = 60;
  const R = 32;
  const cx = 58, cy = 44;


  // Chord lines
  const lineEls = Array.from({ length: N }, (_, k) => {
    const a1 = (k / N) * 2 * Math.PI;
    const a2 = (2 * k / N) * 2 * Math.PI;
    const x1 = (cx + R * Math.cos(a1)).toFixed(2);
    const y1 = (cy + R * Math.sin(a1)).toFixed(2);
    const x2 = (cx + R * Math.cos(a2)).toFixed(2);
    const y2 = (cy + R * Math.sin(a2)).toFixed(2);
    return `<line id="rl${k}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" opacity="0"/>`;
  }).join('\n    ');

  window.GEAR_CSS = `
<style>
  .ruled-group line { stroke: currentColor; stroke-width: 0.9; }
  .gear-v2 .ruled-group { color: var(--gear-v2-left); }
</style>`;

  window.GEAR_SVG = `
<svg width="116" height="88" viewBox="0 0 116 88" xmlns="http://www.w3.org/2000/svg">
  <g class="ruled-group">
    ${lineEls}
  </g>
</svg>`;

  const DUR = 8000, BUILD_END = 0.44, HOLD_END = 0.56;
  let els = null;

  requestAnimationFrame(function loop(now) {
    if (!els) {
      if (!document.getElementById('rl0')) { requestAnimationFrame(loop); return; }
      els = Array.from({ length: N }, (_, k) => document.getElementById(`rl${k}`));
    }

    const phase = (now % DUR) / DUR;
    let n;

    if (phase < BUILD_END) {
      n = Math.round(N * phase / BUILD_END);
    } else if (phase < HOLD_END) {
      n = N;
    } else {
      n = Math.round(N * (1 - (phase - HOLD_END) / (1 - HOLD_END)));
    }

    els.forEach((el, k) => el && el.setAttribute('opacity', k < n ? '0.65' : '0'));
    requestAnimationFrame(loop);
  });
})();
