window.ANIM_CSS = `
<style>
  .lissajous-left {
    animation: spin-cw 6s linear infinite;
    transform-origin: 40px 40px;
  }
  .lissajous-right {
    animation: spin-ccw 4s linear infinite;
    transform-origin: 40px 40px;
  }
  @keyframes spin-cw  { to { transform: rotate(360deg);  } }
  @keyframes spin-ccw { to { transform: rotate(-360deg); } }

  .anim-v2 .lissajous-left  { color: var(--anim-color-left);  }
  .anim-v2 .lissajous-right { color: var(--anim-color-right); }
</style>
`;

// Two equilateral triangles, circumradius R=32px, centroid at (40,40).
// Opposite spin directions at a 3:2 frequency ratio (6s CW vs 4s CCW) — the same
// math as a phase-locked loop: the shapes periodically realign then diverge, tracing
// the beat frequency (LCM = 12s cycle) used in clock recovery and signal decoding.
// SVG (116×88): 8px padding around full rotation sweep of each centroid.

window.ANIM_SVG = `
<svg width="116" height="88" viewBox="0 0 116 88" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(8,8)">
    <g class="lissajous-left">
      <polygon points="72,40 24,68 24,12"
               fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
    </g>
  </g>
  <g transform="translate(36,8)">
    <g class="lissajous-right">
      <polygon points="72,40 24,68 24,12"
               fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
    </g>
  </g>
</svg>
`;
