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
  @keyframes spin-cw  { to { transform: rotate(360deg);  } }
  @keyframes spin-ccw { to { transform: rotate(-360deg); } }

  .gear-v2 .gear-left  { color: var(--gear-v2-left);  }
  .gear-v2 .gear-right { color: var(--gear-v2-right); }
</style>
`;

// Equilateral triangles, circumradius R=32px, inradius r=16px, centroid at (40,40).
// Both triangles same orientation (corners at 0°/120°/240°).
// Right triangle is rotated 60° from the corner-to-corner position → gap faces left.
// Center-to-center = 28px (half of side length 56px).
// SVG (116×88): 8px padding around full rotation sweep of each centroid.

window.GEAR_SVG = `
<svg width="116" height="88" viewBox="0 0 116 88" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(8,8)">
    <g class="gear-left">
      <polygon points="72,40 24,68 24,12"
               fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
    </g>
  </g>
  <g transform="translate(36,8)">
    <g class="gear-right">
      <polygon points="72,40 24,68 24,12"
               fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
    </g>
  </g>
</svg>
`;
