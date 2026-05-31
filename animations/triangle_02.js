window.GEAR_CSS = `
<style>
  .gear-left {
    animation: spin-cw var(--gear-speed, 4s) linear infinite;
    transform-origin: 40px 40px;
  }
  .gear-right {
    animation: spin-ccw var(--gear-speed, 4s) linear infinite;
    transform-origin: 40px 40px;
  }
  .gear-right2 {
    animation: spin-ccw var(--gear-speed, 4s) linear infinite;
    transform-origin: 40px 40px;
  }
  @keyframes spin-cw  { to { transform: rotate(360deg);  } }
  @keyframes spin-ccw { to { transform: rotate(-360deg); } }

  .gear-v2 .gear-left   { color: var(--gear-v2-left);  }
  .gear-v2 .gear-right  { color: var(--gear-v2-right); }
  .gear-v2 .gear-right2 { color: var(--gear-v2-left);  }
</style>
`;

// Three equilateral triangles, circumradius R=32px, inradius r=16px, centroid at (40,40).
// Left and right2 spin CW; right spins CCW — each adjacent pair counter-rotates.
// Center-to-center of adjacent triangles = 28px; T1–T3 center distance = 56px.
// T1 and T3 initial offsets: circles of R=32 centered 56px apart intersect at
// ±sqrt(32²−28²) = ±15.49px off-axis → T1 tip at 29°, T3 tip at 151° (lower meeting point).
// SVG (144×88): 8px padding around full rotation sweep of each centroid.

window.GEAR_SVG = `
<svg width="144" height="88" viewBox="0 0 144 88" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(8,8)">
    <g class="gear-left">
      <g transform="rotate(29, 40, 40)">
        <polygon points="72,40 24,68 24,12"
                 fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
      </g>
    </g>
  </g>
  <g transform="translate(36,8)">
    <g class="gear-right">
      <polygon points="72,40 24,68 24,12"
               fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
    </g>
  </g>
  <g transform="translate(64,8)">
    <g class="gear-right2">
      <g transform="rotate(31, 40, 40)">
        <polygon points="72,40 24,68 24,12"
                 fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
      </g>
    </g>
  </g>
</svg>
`;
