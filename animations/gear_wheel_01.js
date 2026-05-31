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

window.GEAR_SVG = `
<svg width="170" height="96" viewBox="0 0 170 96" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <path id="tooth-v2" d="M -6.5,-31 L -6.5,-41 Q -6.5,-43 -4.5,-43 L 4.5,-43 Q 6.5,-43 6.5,-41 L 6.5,-31"
          fill="#0a0a0f" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
  </defs>
  <g transform="translate(8,8)">
    <g class="gear-left">
      <circle cx="40" cy="40" r="28" fill="#0a0a0f" stroke="currentColor" stroke-width="1.8"/>
      <use href="#tooth-v2" transform="rotate(  0,40,40) translate(40,40)"/>
      <use href="#tooth-v2" transform="rotate( 45,40,40) translate(40,40)"/>
      <use href="#tooth-v2" transform="rotate( 90,40,40) translate(40,40)"/>
      <use href="#tooth-v2" transform="rotate(135,40,40) translate(40,40)"/>
      <use href="#tooth-v2" transform="rotate(180,40,40) translate(40,40)"/>
      <use href="#tooth-v2" transform="rotate(225,40,40) translate(40,40)"/>
      <use href="#tooth-v2" transform="rotate(270,40,40) translate(40,40)"/>
      <use href="#tooth-v2" transform="rotate(315,40,40) translate(40,40)"/>
      <circle cx="40" cy="40" r="19" fill="#0a0a0f" stroke="currentColor" stroke-width="1.8"/>
      <circle cx="40" cy="40" r="7"  fill="#0a0a0f" stroke="currentColor" stroke-width="1.8"/>
      <circle cx="40" cy="40" r="3"  fill="currentColor"/>
    </g>
  </g>
  <g transform="translate(82,8)">
    <g class="gear-right">
      <circle cx="40" cy="40" r="28" fill="#0a0a0f" stroke="currentColor" stroke-width="1.8"/>
      <use href="#tooth-v2" transform="rotate( 22.5,40,40) translate(40,40)"/>
      <use href="#tooth-v2" transform="rotate( 67.5,40,40) translate(40,40)"/>
      <use href="#tooth-v2" transform="rotate(112.5,40,40) translate(40,40)"/>
      <use href="#tooth-v2" transform="rotate(157.5,40,40) translate(40,40)"/>
      <use href="#tooth-v2" transform="rotate(202.5,40,40) translate(40,40)"/>
      <use href="#tooth-v2" transform="rotate(247.5,40,40) translate(40,40)"/>
      <use href="#tooth-v2" transform="rotate(292.5,40,40) translate(40,40)"/>
      <use href="#tooth-v2" transform="rotate(337.5,40,40) translate(40,40)"/>
      <circle cx="40" cy="40" r="19" fill="#0a0a0f" stroke="currentColor" stroke-width="1.8"/>
      <circle cx="40" cy="40" r="7"  fill="#0a0a0f" stroke="currentColor" stroke-width="1.8"/>
      <circle cx="40" cy="40" r="3"  fill="currentColor"/>
    </g>
  </g>
</svg>
`;
