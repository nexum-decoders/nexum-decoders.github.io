(function () {
  // Lissajous 3:5, partial — t from 0 to 4π/5 (2 cycles of the y oscillator).
  // Ends connected with a cubic bezier whose control points match the tangent
  // vectors at both endpoints, so the closing arc flows naturally with the curve.
  const N = 400;
  const A = 30, B = 30, f1 = 3, f2 = 5;
  const cx = 58, cy = 44;
  const T_MAX = (4 * Math.PI) / 5;

  const pts = [];
  let L = 0;
  for (let i = 0; i <= N; i++) {
    const t = (i / N) * T_MAX;
    const x = cx + A * Math.sin(f1 * t + Math.PI / 2);
    const y = cy + B * Math.sin(f2 * t);
    if (i > 0) {
      const dx = x - pts[i - 1][0], dy = y - pts[i - 1][1];
      L += Math.sqrt(dx * dx + dy * dy);
    }
    pts.push([x, y]);
  }

  // Tangent at start (forward difference)
  const t0 = [pts[1][0] - pts[0][0], pts[1][1] - pts[0][1]];
  const t0m = Math.sqrt(t0[0]*t0[0] + t0[1]*t0[1]);

  // Tangent at end (backward difference)
  const tN = [pts[N][0] - pts[N-1][0], pts[N][1] - pts[N-1][1]];
  const tNm = Math.sqrt(tN[0]*tN[0] + tN[1]*tN[1]);

  // Scale control arms by half the chord length
  const chord = Math.sqrt((pts[0][0]-pts[N][0])**2 + (pts[0][1]-pts[N][1])**2);
  const k = chord * 0.5;

  // Bezier: from pts[N] → pts[0], tangent-matched at both ends
  const c1 = [pts[N][0] + k * tN[0]/tNm,  pts[N][1] + k * tN[1]/tNm];
  const c2 = [pts[0][0] - k * t0[0]/t0m,  pts[0][1] - k * t0[1]/t0m];

  // Approximate bezier arc length by sampling
  function bezPt(s, P0, P1, P2, P3) {
    const u = 1-s;
    return [u*u*u*P0[0]+3*u*u*s*P1[0]+3*u*s*s*P2[0]+s*s*s*P3[0],
            u*u*u*P0[1]+3*u*u*s*P1[1]+3*u*s*s*P2[1]+s*s*s*P3[1]];
  }
  let bezLen = 0;
  let prev = pts[N];
  for (let i = 1; i <= 50; i++) {
    const p = bezPt(i/50, pts[N], c1, c2, pts[0]);
    bezLen += Math.sqrt((p[0]-prev[0])**2 + (p[1]-prev[1])**2);
    prev = p;
  }
  L = Math.ceil(L + bezLen) + 4;

  const P0 = pts[0], PN = pts[N];
  const polyline = pts.map(p => p[0].toFixed(2) + ',' + p[1].toFixed(2)).join('L');
  const bez = `C${c1[0].toFixed(2)},${c1[1].toFixed(2)} ${c2[0].toFixed(2)},${c2[1].toFixed(2)} ${P0[0].toFixed(2)},${P0[1].toFixed(2)}`;
  const revBez = `C${c2[0].toFixed(2)},${c2[1].toFixed(2)} ${c1[0].toFixed(2)},${c1[1].toFixed(2)} ${PN[0].toFixed(2)},${PN[1].toFixed(2)}`;
  const revPoly = [...pts].reverse().slice(1).map(p => p[0].toFixed(2) + ',' + p[1].toFixed(2)).join('L');

  const fwdD = `M${polyline}${bez}`;
  const revD = `M${P0[0].toFixed(2)},${P0[1].toFixed(2)}${revBez}L${revPoly}`;

  window.ANIM_CSS = `
<style>
  .harm-fwd, .harm-rev {
    fill: none;
    stroke-linecap: round;
    stroke-dasharray: ${L};
  }
  .harm-fwd { stroke: currentColor; stroke-width: 1.5; }
  .harm-rev  { stroke: #0a0a0f;     stroke-width: 2;   }
  .anim-v2 .harm-group { color: var(--anim-color-left); }
</style>`;

  window.ANIM_SVG = `
<svg width="116" height="88" viewBox="0 0 116 88" xmlns="http://www.w3.org/2000/svg">
  <g class="harm-group">
    <path class="harm-fwd" stroke-dashoffset="${L}" d="${fwdD}"/>
    <path class="harm-rev" stroke-dashoffset="${L}" d="${revD}"/>
  </g>
</svg>`;

  const DUR = 6000, DRAW_END = 0.43, HOLD_END = 0.57;

  function eio(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  requestAnimationFrame(function loop(now) {
    const fwd = document.querySelector('.harm-fwd');
    const rev = document.querySelector('.harm-rev');
    if (!fwd) { requestAnimationFrame(loop); return; }

    const phase = (now % DUR) / DUR;
    let fO, rO;

    if (phase < DRAW_END) {
      fO = L * (1 - eio(phase / DRAW_END));
      rO = L;
    } else if (phase < HOLD_END) {
      fO = 0;
      rO = L;
    } else {
      fO = 0;
      rO = L * (1 - eio((phase - HOLD_END) / (1 - HOLD_END)));
    }

    fwd.setAttribute('stroke-dashoffset', fO);
    rev.setAttribute('stroke-dashoffset', rO);
    requestAnimationFrame(loop);
  });
})();
