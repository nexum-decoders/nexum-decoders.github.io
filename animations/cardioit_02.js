(function () {
  // Ruled cardioid — N chord lines connect point k on a circle to point 2k.
  // No cardioid exists in the source data; it emerges as lines accumulate,
  // the same construction used in string-art and circle multiplication tables.
  const N = 60;
  const R = 32;
  const cx = 58, cy = 44;
  const drawDur = 4;   // seconds to sweep all lines in
  const cycleDur = 6;  // total cycle length

  // k=0 is degenerate — start from k=1, add diameter as a static line instead
  const lineEls = Array.from({ length: N - 1 }, (_, i) => {
    const k = i + 1;
    const a1 = (k / N) * 2 * Math.PI;
    const a2 = (2 * k / N) * 2 * Math.PI;
    const x1 = (cx + R * Math.cos(a1)).toFixed(2);
    const y1 = (cy + R * Math.sin(a1)).toFixed(2);
    const x2 = (cx + R * Math.cos(a2)).toFixed(2);
    const y2 = (cy + R * Math.sin(a2)).toFixed(2);
    const delay = (k * drawDur / N).toFixed(3);
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="ruled-line" style="animation-delay:${delay}s"/>`;
  }).join('\n    ');

  window.GEAR_CSS = `
<style>
  .ruled-line {
    stroke: currentColor;
    stroke-width: 0.9;
    opacity: 0;
    animation: ruled-on ${cycleDur}s linear infinite;
    animation-fill-mode: both;
  }
  .zero-line {
    stroke: currentColor;
    stroke-width: 0.9;
    opacity: 0.65;
  }
  @keyframes ruled-on {
    0%   { opacity: 0;    }
    2%   { opacity: 0.65; }
    72%  { opacity: 0.65; }
    100% { opacity: 0;    }
  }
  .gear-v2 .ruled-group { color: var(--gear-v2-left); }
</style>`;

  window.GEAR_SVG = `
<svg width="116" height="88" viewBox="0 0 116 88" xmlns="http://www.w3.org/2000/svg">
  <g class="ruled-group">
    <line x1="${cx - R}" y1="${cy}" x2="${cx + R}" y2="${cy}" class="zero-line"/>
    ${lineEls}
  </g>
</svg>`;
})();
