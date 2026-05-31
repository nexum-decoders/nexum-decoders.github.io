(function () {
  // Lissajous 3:5 — same math as XY-mode oscilloscope / harmonograph.
  // The complex curve only becomes legible as the stroke-dashoffset draws it,
  // so the shape emerges from the motion rather than pre-existing.
  const N = 600;
  const A = 30, B = 30, f1 = 3, f2 = 5;
  const cx = 58, cy = 44;

  const pts = [];
  let L = 0;
  for (let i = 0; i <= N; i++) {
    const t = (i / N) * 2 * Math.PI;
    const x = cx + A * Math.sin(f1 * t + Math.PI / 2);
    const y = cy + B * Math.sin(f2 * t);
    if (i > 0) {
      const dx = x - pts[i - 1][0], dy = y - pts[i - 1][1];
      L += Math.sqrt(dx * dx + dy * dy);
    }
    pts.push([x, y]);
  }
  L = Math.ceil(L) + 4;

  const d = 'M' + pts.map(p => p[0].toFixed(2) + ',' + p[1].toFixed(2)).join('L');

  window.ANIM_CSS = `
<style>
  .harm-path {
    fill: none;
    stroke: currentColor;
    stroke-width: 1.5;
    stroke-linecap: round;
    stroke-dasharray: ${L};
    animation: harm-draw 5s ease-in-out infinite;
  }
  @keyframes harm-draw {
    0%   { stroke-dashoffset: ${L}; opacity: 1; }
    72%  { stroke-dashoffset: 0;    opacity: 1; }
    88%  { stroke-dashoffset: 0;    opacity: 0.6; }
    96%  { stroke-dashoffset: 0;    opacity: 0; }
    100% { stroke-dashoffset: ${L}; opacity: 0; }
  }
  .anim-v2 .harm-group { color: var(--anim-color-left); }
</style>`;

  window.ANIM_SVG = `
<svg width="116" height="88" viewBox="0 0 116 88" xmlns="http://www.w3.org/2000/svg">
  <g class="harm-group">
    <path class="harm-path" d="${d}"/>
  </g>
</svg>`;
})();
