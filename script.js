/* ============================================================
   NAZEER ELECTRONICS — script.js  (final · fixes + persistence)
   Data · SVG product art · cart/wishlist · auth · search ·
   filters · validation · GSAP animation · Three.js hero scene
   ============================================================ */
'use strict';

const $  = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
const HAS_GSAP = !!window.gsap;
if (HAS_GSAP && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   1 · ICONS (inline SVG, stroke style)
   ============================================================ */
const I = {
  cart: '<path d="M6.3 7.5h11.4l-1 11.6a2 2 0 0 1-2 1.9H9.3a2 2 0 0 1-2-1.9Z"/><path d="M9 10V6.8a3 3 0 0 1 6 0V10"/>',
  heart: '<path d="M12 20.3C7.2 16.7 3.8 13.6 3.8 10a4.6 4.6 0 0 1 8.2-2.9A4.6 4.6 0 0 1 20.2 10c0 3.6-3.4 6.7-8.2 10.3Z"/>',
  user: '<circle cx="12" cy="8.2" r="3.7"/><path d="M4.8 20.2c1.3-3.3 4-4.9 7.2-4.9s5.9 1.6 7.2 4.9"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="m20.3 20.3-4.2-4.2"/>',
  x: '<path d="m6 6 12 12M18 6 6 18"/>',
  arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
  phone: '<path d="M5 4h4l1.5 4.5L8 10a12 12 0 0 0 6 6l1.5-2.5L20 15v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2Z"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  trash: '<path d="M5 7h14M10 7V5h4v2m-8.5 0 .8 12.1a1.8 1.8 0 0 0 1.8 1.7h5.8a1.8 1.8 0 0 0 1.8-1.7L16.5 7"/>',
  check: '<path d="m5 13 4 4L19 7"/>',
  info: '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5M12 7.6v.2"/>',
  eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="3"/>',
  eyeOff: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="3"/><path d="M4.5 4.5l15 15"/>',
  gift: '<rect x="4" y="10" width="16" height="10" rx="2"/><path d="M4 10h16M12 10v10M12 10s-4 .2-4-2.6C8 5.6 12 6 12 10Zm0 0s4 .2 4-2.6C16 5.6 12 6 12 10Z"/>',
  bolt: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 2 5 13.5h5.5L10 22l8.5-11.5H13Z"/></svg>',
  star: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3.4l2.5 5.4 5.9.7-4.4 4 1.2 5.8L12 16.4 6.8 19.3l1.2-5.8-4.4-4 5.9-.7Z"/></svg>',
};
const icon = (n, cls = '') =>
  I[n].startsWith('<svg')
    ? I[n].replace('<svg', `<svg class="ic ${cls}"`)
    : `<svg class="ic ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;

/* ============================================================
   2 · SVG PRODUCT ART (hand-built, unique gradient ids each call)
   ============================================================ */
let __uid = 0;
const U = p => `nx-${p}-${++__uid}`;

function svgLaptop(o = {}) {
  const gaming = !!o.gaming;
  const W = gaming ? ['#101a33', '#1c2f5e'] : ['#8fe8ff', '#2f7fe0'];
  const g1 = U('lw'), g2 = U('ls'), g3 = U('lb'), cl = U('lc');
  let keys = '';
  for (let r = 0; r < 3; r++) for (let i = 0; i < 12; i++) {
    const x = 76 + i * 16 + (r % 2) * 2, y = 147 + r * 7.5;
    let fill = 'rgba(255,255,255,.3)';
    if (gaming) fill = ['rgba(125,244,255,.55)', 'rgba(255,255,255,.22)', 'rgba(255,122,180,.5)'][(i + r) % 3];
    keys += `<rect x="${x}" y="${y}" width="13" height="5.6" rx="1.6" fill="${fill}"/>`;
  }
  const screen = gaming
    ? `<circle cx="170" cy="76" r="30" fill="rgba(94,234,212,.22)"/><circle cx="170" cy="76" r="30" fill="none" stroke="rgba(122,244,255,.85)" stroke-width="1.5"/><rect x="84" y="112" width="172" height="3" fill="rgba(122,244,255,.6)"/><rect x="84" y="119" width="172" height="1.6" fill="rgba(255,107,157,.5)"/>`
    : `<circle cx="128" cy="64" r="30" fill="rgba(255,255,255,.3)"/><circle cx="180" cy="98" r="44" fill="rgba(255,255,255,.15)"/>`;
  return `<svg class="dev" viewBox="0 0 340 232" role="img" aria-label="Laptop">
  <defs>
    <linearGradient id="${g1}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${W[0]}"/><stop offset="1" stop-color="${W[1]}"/></linearGradient>
    <linearGradient id="${g2}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a586c"/><stop offset=".14" stop-color="#202b3a"/><stop offset="1" stop-color="#0e1622"/></linearGradient>
    <linearGradient id="${g3}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eef3f8"/><stop offset=".55" stop-color="#c3cfdd"/><stop offset="1" stop-color="#94a6b9"/></linearGradient>
    <clipPath id="${cl}"><rect x="84" y="23" width="172" height="104" rx="6"/></clipPath>
  </defs>
  <ellipse cx="170" cy="219" rx="126" ry="9" fill="rgba(8,42,72,.25)"/>
  <rect x="75" y="14" width="190" height="122" rx="10" fill="url(#${g2})"/>
  <rect x="84" y="23" width="172" height="104" rx="6" fill="url(#${g1})"/>
  <g clip-path="url(#${cl})">${screen}<path d="M84 23h62L96 127H84Z" fill="rgba(255,255,255,.15)"/></g>
  <circle cx="170" cy="18.5" r="1.5" fill="#0b1017" opacity=".85"/>
  <rect x="75" y="136" width="190" height="5" rx="2.5" fill="#1a2433"/>
  <path d="M56 141h228l18 33q2 7-7 7H45q-9 0-7-7Z" fill="url(#${g3})"/>
  <path d="M56 141h228l3 5H53Z" fill="rgba(255,255,255,.7)"/>
  ${keys}
  <rect x="140" y="170" width="60" height="7.5" rx="3" fill="rgba(255,255,255,.55)" stroke="rgba(120,140,160,.6)"/>
</svg>`;
}

function svgPhone(o = {}) {
  const pro = !!o.pro;
  const g1 = U('pw'), g2 = U('pb'), cl = U('pc');
  const stops = pro
    ? `<stop offset="0" stop-color="#ffd98a"/><stop offset=".5" stop-color="#ff6b9d"/><stop offset="1" stop-color="#7a5cff"/>`
    : `<stop offset="0" stop-color="#9be7ff"/><stop offset="1" stop-color="#3f8cff"/>`;
  const deco = pro
    ? `<circle cx="100" cy="150" r="26" fill="rgba(255,255,255,.8)"/><circle cx="100" cy="150" r="40" fill="none" stroke="rgba(255,255,255,.5)" stroke-width="2"/><circle cx="66" cy="240" r="34" fill="rgba(255,255,255,.14)"/>`
    : `<circle cx="70" cy="92" r="32" fill="rgba(255,255,255,.28)"/><circle cx="126" cy="212" r="46" fill="rgba(255,255,255,.13)"/>`;
  return `<svg class="dev" viewBox="0 0 200 330" role="img" aria-label="Smartphone">
  <defs>
    <linearGradient id="${g1}" x1="0" y1="0" x2="1" y2="1">${stops}</linearGradient>
    <linearGradient id="${g2}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a5a70"/><stop offset=".5" stop-color="#141b26"/><stop offset="1" stop-color="#2c394c"/></linearGradient>
    <clipPath id="${cl}"><rect x="49" y="17" width="102" height="286" rx="25"/></clipPath>
  </defs>
  <ellipse cx="100" cy="318" rx="60" ry="9" fill="rgba(8,42,72,.28)"/>
  <rect x="40" y="8" width="120" height="304" rx="34" fill="url(#${g2})"/>
  <rect x="43" y="11" width="114" height="298" rx="31" fill="#0c1220"/>
  <rect x="49" y="17" width="102" height="286" rx="25" fill="url(#${g1})"/>
  <g clip-path="url(#${cl})">${deco}<path d="M49 60 109 17h42L49 130Z" fill="rgba(255,255,255,.16)"/><rect x="84" y="292" width="32" height="4" rx="2" fill="rgba(255,255,255,.55)"/></g>
  <rect x="81" y="25" width="38" height="10" rx="5" fill="#0b1017"/>
  <circle cx="61" cy="30" r="1.8" fill="#0b1017"/>
  <rect x="37.6" y="92" width="3" height="16" rx="1.5" fill="#37475c"/>
  <rect x="37.6" y="114" width="3" height="16" rx="1.5" fill="#37475c"/>
  <rect x="159.4" y="96" width="3" height="30" rx="1.5" fill="#37475c"/>
</svg>`;
}

function svgHeadphones() {
  const b = U('hb'), c = U('hc');
  return `<svg class="dev" viewBox="0 0 260 250" role="img" aria-label="Headphones">
  <defs>
    <linearGradient id="${b}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#42536a"/><stop offset="1" stop-color="#18222f"/></linearGradient>
    <linearGradient id="${c}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3c4a5f"/><stop offset="1" stop-color="#141c28"/></linearGradient>
  </defs>
  <ellipse cx="130" cy="236" rx="86" ry="9" fill="rgba(8,42,72,.25)"/>
  <path d="M46 146C46 54 214 54 214 146" stroke="url(#${b})" stroke-width="24" fill="none" stroke-linecap="round"/>
  <path d="M46 146C46 62 214 62 214 146" stroke="#0d141d" stroke-width="9" fill="none" stroke-linecap="round" opacity=".85"/>
  <rect x="38" y="132" width="16" height="20" rx="6" fill="#1a2432"/>
  <rect x="206" y="132" width="16" height="20" rx="6" fill="#1a2432"/>
  <rect x="22" y="138" width="52" height="84" rx="24" fill="url(#${c})"/>
  <rect x="186" y="138" width="52" height="84" rx="24" fill="url(#${c})"/>
  <rect x="28" y="144" width="40" height="72" rx="19" fill="none" stroke="rgba(255,255,255,.22)" stroke-width="1.5"/>
  <rect x="192" y="144" width="40" height="72" rx="19" fill="none" stroke="rgba(255,255,255,.22)" stroke-width="1.5"/>
  <circle cx="48" cy="180" r="6" fill="#0c1119"/><circle cx="48" cy="180" r="9" fill="none" stroke="rgba(94,234,212,.65)" stroke-width="1.6"/>
  <circle cx="212" cy="180" r="6" fill="#0c1119"/><circle cx="212" cy="180" r="9" fill="none" stroke="rgba(94,234,212,.65)" stroke-width="1.6"/>
</svg>`;
}

function svgWatch(o = {}) {
  const strap = o.strap || '#0fb5a6';
  const s = U('ws'), c = U('wc');
  return `<svg class="dev" viewBox="0 0 200 300" role="img" aria-label="Smartwatch">
  <defs>
    <linearGradient id="${s}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#0e8f83"/><stop offset=".5" stop-color="${strap}"/><stop offset="1" stop-color="#0c7d72"/></linearGradient>
    <linearGradient id="${c}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#42536a"/><stop offset="1" stop-color="#141c28"/></linearGradient>
  </defs>
  <ellipse cx="100" cy="290" rx="52" ry="7" fill="rgba(8,42,72,.25)"/>
  <rect x="72" y="6" width="56" height="104" rx="16" fill="url(#${s})"/>
  <rect x="72" y="190" width="56" height="104" rx="16" fill="url(#${s})"/>
  <path d="M72 36h56M72 52h56M72 226h56M72 242h56" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>
  <rect x="50" y="84" width="100" height="126" rx="32" fill="url(#${c})"/>
  <rect x="58" y="92" width="84" height="110" rx="26" fill="#070c13"/>
  <text x="100" y="132" text-anchor="middle" font-family="Space Grotesk, Arial, sans-serif" font-size="27" font-weight="700" fill="#fff">10:09</text>
  <text x="100" y="148" text-anchor="middle" font-family="Manrope, Arial, sans-serif" font-size="9" font-weight="700" fill="#7fd7ff" letter-spacing="2">TUE 24</text>
  <circle cx="100" cy="178" r="17" fill="none" stroke="rgba(255,255,255,.12)" stroke-width="4"/>
  <circle cx="100" cy="178" r="17" fill="none" stroke="#f59e0b" stroke-width="4" stroke-linecap="round" stroke-dasharray="80 107" transform="rotate(-90 100 178)"/>
  <circle cx="100" cy="178" r="10" fill="none" stroke="rgba(255,255,255,.12)" stroke-width="4"/>
  <circle cx="100" cy="178" r="10" fill="none" stroke="#34d399" stroke-width="4" stroke-linecap="round" stroke-dasharray="44 63" transform="rotate(-90 100 178)"/>
  <rect x="149" y="118" width="7" height="24" rx="3.5" fill="#2c3a4d"/>
  <rect x="149" y="150" width="5" height="16" rx="2.5" fill="#22303f"/>
  <path d="M64 100 106 94v106L64 194Z" fill="rgba(255,255,255,.07)"/>
</svg>`;
}

function svgSpeaker() {
  const bd = U('sb'), msh = U('sm'), cyl = U('sc');
  return `<svg class="dev" viewBox="0 0 220 250" role="img" aria-label="Bluetooth speaker">
  <defs>
    <linearGradient id="${bd}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2b3542"/><stop offset="1" stop-color="#161d27"/></linearGradient>
    <pattern id="${msh}" width="9" height="9" patternUnits="userSpaceOnUse"><circle cx="4.5" cy="4.5" r="1.5" fill="rgba(255,255,255,.17)"/></pattern>
    <linearGradient id="${cyl}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="rgba(4,8,14,.5)"/><stop offset=".22" stop-color="rgba(4,8,14,0)"/><stop offset=".5" stop-color="rgba(255,255,255,.08)"/><stop offset=".78" stop-color="rgba(4,8,14,0)"/><stop offset="1" stop-color="rgba(4,8,14,.5)"/></linearGradient>
  </defs>
  <ellipse cx="110" cy="230" rx="78" ry="9" fill="rgba(8,42,72,.25)"/>
  <rect x="45" y="42" width="130" height="180" rx="30" fill="url(#${bd})"/>
  <rect x="45" y="42" width="130" height="180" rx="30" fill="url(#${msh})"/>
  <rect x="45" y="42" width="130" height="180" rx="30" fill="url(#${cyl})"/>
  <ellipse cx="110" cy="44" rx="65" ry="16" fill="#151b25"/>
  <ellipse cx="110" cy="43" rx="52" ry="11" fill="none" stroke="rgba(255,255,255,.14)" stroke-width="1.5"/>
  <rect x="62" y="62" width="96" height="3" rx="1.5" fill="#5eead4" opacity=".85"/>
  <circle cx="78" cy="196" r="9" fill="#0f141c" stroke="rgba(255,255,255,.3)"/>
  <circle cx="110" cy="196" r="13" fill="#0f141c" stroke="#5eead4" stroke-width="1.6"/>
  <path d="M107 191l8 5-8 5Z" fill="#5eead4"/>
  <circle cx="142" cy="196" r="9" fill="#0f141c" stroke="rgba(255,255,255,.3)"/>
</svg>`;
}

function svgEarbuds() {
  const cg = U('eg'), bg = U('eb');
  return `<svg class="dev" viewBox="0 0 250 210" role="img" aria-label="Wireless earbuds">
  <defs>
    <linearGradient id="${cg}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fdfeff"/><stop offset="1" stop-color="#c8d4e0"/></linearGradient>
    <linearGradient id="${bg}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#ccd8e4"/></linearGradient>
  </defs>
  <ellipse cx="122" cy="192" rx="100" ry="9" fill="rgba(8,42,72,.22)"/>
  <rect x="28" y="72" width="104" height="98" rx="28" fill="url(#${cg})"/>
  <line x1="30" y1="104" x2="130" y2="104" stroke="rgba(90,110,130,.4)" stroke-width="1.6"/>
  <circle cx="80" cy="90" r="2.6" fill="#34d399"/>
  <path d="M42 72h44L52 122 28 100V96Z" fill="rgba(255,255,255,.6)"/>
  <g transform="translate(172 82) rotate(14)">
    <rect x="-9" y="-4" width="20" height="48" rx="10" fill="url(#${bg})"/>
    <circle cx="1" cy="0" r="19" fill="url(#${bg})"/>
    <circle cx="-4" cy="-5" r="6" fill="rgba(255,255,255,.85)"/>
    <circle cx="9" cy="4" r="3" fill="#10161f" opacity=".65"/>
  </g>
  <g transform="translate(206 134) rotate(-12) scale(.9)">
    <rect x="-9" y="-4" width="20" height="48" rx="10" fill="url(#${bg})"/>
    <circle cx="1" cy="0" r="19" fill="url(#${bg})"/>
    <circle cx="-4" cy="-5" r="6" fill="rgba(255,255,255,.85)"/>
    <circle cx="9" cy="4" r="3" fill="#10161f" opacity=".65"/>
  </g>
</svg>`;
}

function svgTablet() {
  const g1 = U('tw'), g2 = U('tb'), cl = U('tc');
  return `<svg class="dev" viewBox="0 0 300 230" role="img" aria-label="Tablet">
  <defs>
    <linearGradient id="${g1}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#9be7ff"/><stop offset="1" stop-color="#3f6fe8"/></linearGradient>
    <linearGradient id="${g2}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a5a70"/><stop offset=".5" stop-color="#141b26"/><stop offset="1" stop-color="#2c394c"/></linearGradient>
    <clipPath id="${cl}"><rect x="33" y="25" width="234" height="170" rx="12"/></clipPath>
  </defs>
  <ellipse cx="150" cy="216" rx="118" ry="9" fill="rgba(8,42,72,.25)"/>
  <rect x="24" y="16" width="252" height="188" rx="20" fill="url(#${g2})"/>
  <rect x="33" y="25" width="234" height="170" rx="12" fill="url(#${g1})"/>
  <g clip-path="url(#${cl})">
    <circle cx="105" cy="85" r="36" fill="rgba(255,255,255,.26)"/>
    <circle cx="196" cy="150" r="52" fill="rgba(255,255,255,.13)"/>
    <path d="M33 70 120 25h50L33 150Z" fill="rgba(255,255,255,.15)"/>
  </g>
  <circle cx="150" cy="20.5" r="1.8" fill="#0b1017"/>
</svg>`;
}

function svgController() {
  const cg = U('cg');
  return `<svg class="dev" viewBox="0 0 300 190" role="img" aria-label="Game controller">
  <defs><linearGradient id="${cg}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f5f9fc"/><stop offset="1" stop-color="#c5d3e1"/></linearGradient></defs>
  <ellipse cx="150" cy="178" rx="112" ry="9" fill="rgba(8,42,72,.22)"/>
  <path d="M64 40C36 40 22 68 24 104c2 38 22 60 44 56 18-4 24-20 40-20h84c16 0 22 16 40 20 22 4 42-18 44-56 2-36-12-64-40-64-28 0-38 14-86 14-48 0-58-14-86-14Z"
        fill="url(#${cg})" stroke="rgba(110,132,156,.4)" stroke-width="1.5" stroke-linejoin="round"/>
  <path d="M86 78h12v12h12v12H98v12H86v-12H74V90h12Z" fill="#22303f" stroke="#22303f" stroke-width="3" stroke-linejoin="round"/>
  <circle cx="193" cy="81" r="8" fill="#ff6b81"/><circle cx="223" cy="81" r="8" fill="#4cc9f0"/>
  <circle cx="193" cy="111" r="8" fill="#95d5b2"/><circle cx="223" cy="111" r="8" fill="#ffd166"/>
  <circle cx="140" cy="118" r="13" fill="#22303f"/><circle cx="140" cy="118" r="7.5" fill="#3a4c61"/>
  <circle cx="176" cy="118" r="13" fill="#22303f"/><circle cx="176" cy="118" r="7.5" fill="#3a4c61"/>
  <rect x="136" y="56" width="28" height="6" rx="3" fill="#5eead4" opacity=".95"/>
</svg>`;
}

function svgAgent() {
  const sk = U('ak'), sh = U('as');
  return `<svg class="dev" viewBox="0 0 220 230" role="img" aria-label="Customer support agent">
  <defs>
    <linearGradient id="${sk}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd9b8"/><stop offset="1" stop-color="#eeb088"/></linearGradient>
    <linearGradient id="${sh}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#15466f"/><stop offset="1" stop-color="#0a2c4e"/></linearGradient>
  </defs>
  <circle cx="110" cy="112" r="96" fill="rgba(255,255,255,.4)"/>
  <circle cx="110" cy="112" r="96" fill="none" stroke="rgba(255,255,255,.7)" stroke-width="1.5"/>
  <path d="M34 226c2-58 34-78 76-78s74 20 76 78Z" fill="url(#${sh})"/>
  <path d="M96 152l14 18 14-18-8-6h-12Z" fill="#fff" opacity=".92"/>
  <rect x="98" y="126" width="24" height="28" rx="10" fill="#e5a377"/>
  <circle cx="110" cy="96" r="40" fill="url(#${sk})"/>
  <path d="M70 94c2-32 78-32 80 0-10-16-22-20-40-20s-30 4-40 20Z" fill="#26313f"/>
  <path d="M66 92C66 48 154 48 154 92" stroke="#14202e" stroke-width="9" fill="none" stroke-linecap="round"/>
  <rect x="146" y="86" width="15" height="25" rx="7.5" fill="#14202e"/>
  <rect x="59" y="86" width="15" height="25" rx="7.5" fill="#14202e"/>
  <path d="M153 110c-3 20-21 27-33 27" stroke="#14202e" stroke-width="5" fill="none" stroke-linecap="round"/>
  <circle cx="118" cy="137" r="5.5" fill="#14202e"/><circle cx="118" cy="137" r="2" fill="#5eead4"/>
  <circle cx="96" cy="99" r="4" fill="#1b2634"/><circle cx="124" cy="99" r="4" fill="#1b2634"/>
  <path d="M90 90c4-3 9-3 13 0M117 90c4-3 9-3 13 0" stroke="#1b2634" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M98 114q12 10 24 0" stroke="#b9713f" stroke-width="3.5" fill="none" stroke-linecap="round"/>
</svg>`;
}

function svgPackage() {
  const f = U('kf'), t = U('kt'), d = U('kd');
  return `<svg class="dev" viewBox="0 0 250 210" role="img" aria-label="Delivery package">
  <defs>
    <linearGradient id="${f}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e3b27a"/><stop offset="1" stop-color="#c78d4e"/></linearGradient>
    <linearGradient id="${t}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f2cb96"/><stop offset="1" stop-color="#e0ac6d"/></linearGradient>
    <linearGradient id="${d}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c89659"/><stop offset="1" stop-color="#a9783f"/></linearGradient>
  </defs>
  <ellipse cx="140" cy="192" rx="92" ry="9" fill="rgba(8,42,72,.22)"/>
  <g stroke-linecap="round"><rect x="8" y="76" width="36" height="8" rx="4" fill="rgba(255,255,255,.75)"/><rect x="0" y="96" width="24" height="8" rx="4" fill="rgba(255,255,255,.55)"/><rect x="14" y="116" width="30" height="8" rx="4" fill="rgba(255,255,255,.4)"/></g>
  <path d="M70 84l30-30h110l-30 30Z" fill="url(#${t})"/>
  <path d="M180 84l30-30v96l-30 30Z" fill="url(#${d})"/>
  <rect x="70" y="84" width="110" height="96" fill="url(#${f})"/>
  <rect x="118" y="84" width="14" height="96" fill="#f7f4ea" opacity=".92"/>
  <path d="M118 84h14l30-30h-14Z" fill="#f7f4ea" opacity=".92"/>
  <rect x="84" y="106" width="42" height="28" rx="3" fill="#fff"/>
  <path d="M90 114h30M90 121h30M90 128h18" stroke="#9db1c4" stroke-width="2.5" stroke-linecap="round"/>
</svg>`;
}

function svgTag() {
  const tg = U('tg');
  let rays = '';
  for (let i = 0; i < 10; i++) rays += `<path d="M120 10l7 28-14 0Z" fill="rgba(255,255,255,.45)" transform="rotate(${i * 36} 120 100)"/>`;
  const sp = (x, y, s, f) => `<path d="M0 -10L2.5 -2.5 10 0 2.5 2.5 0 10-2.5 2.5-10 0-2.5-2.5Z" transform="translate(${x} ${y}) scale(${s})" fill="${f}"/>`;
  return `<svg class="dev" viewBox="0 0 240 200" role="img" aria-label="Discount banner">
  <defs><linearGradient id="${tg}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff8a5c"/><stop offset="1" stop-color="#ff5470"/></linearGradient></defs>
  <g>${rays}</g>
  <g transform="rotate(-16 120 104)">
    <rect x="56" y="70" width="128" height="68" rx="18" fill="url(#${tg})"/>
    <circle cx="74" cy="104" r="7" fill="#eef7fc"/>
    <text x="128" y="116" text-anchor="middle" font-family="Space Grotesk, Arial, sans-serif" font-size="34" font-weight="700" fill="#fff">-50%</text>
  </g>
  ${sp(38, 40, 1, '#ffd166')}${sp(198, 28, .7, '#fff')}${sp(210, 152, .9, '#ffd166')}${sp(30, 156, .6, '#fff')}
</svg>`;
}

function svgGift() {
  const bx = U('gx'), ld = U('gl');
  return `<svg class="dev" viewBox="0 0 200 200" role="img" aria-label="Festival gift">
  <defs>
    <linearGradient id="${bx}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff8a5c"/><stop offset="1" stop-color="#f2542d"/></linearGradient>
    <linearGradient id="${ld}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffa26b"/><stop offset="1" stop-color="#ff6b3d"/></linearGradient>
  </defs>
  <ellipse cx="100" cy="182" rx="76" ry="8" fill="rgba(8,42,72,.22)"/>
  <rect x="40" y="88" width="120" height="88" rx="10" fill="url(#${bx})"/>
  <rect x="32" y="70" width="136" height="26" rx="8" fill="url(#${ld})"/>
  <rect x="92" y="70" width="16" height="106" fill="#ffd166"/>
  <circle cx="86" cy="60" r="14" fill="#ffd166"/><circle cx="114" cy="60" r="14" fill="#ffd166"/>
  <circle cx="100" cy="62" r="8" fill="#f0a52c"/>
  <path d="M150 34l2.5 7.5L160 44l-7.5 2.5L150 54l-2.5-7.5L140 44l7.5-2.5Z" fill="#fff" opacity=".9"/>
  <path d="M46 40l2 6 6 2-6 2-2 6-2-6-6-2 6-2Z" fill="#ffd166" opacity=".9"/>
</svg>`;
}

function svgStore() {
  const bl = U('st');
  let aw = '';
  for (let i = 0; i < 6; i++) {
    const x = 18 + i * 27.34, f = i % 2 ? '#ffffff' : '#ff7a59';
    aw += `<rect x="${x}" y="26" width="27.4" height="28" fill="${f}"/><circle cx="${x + 13.7}" cy="54" r="13.7" fill="${f}"/>`;
  }
  return `<svg class="dev" viewBox="0 0 200 150" role="img" aria-label="Nazeer Electronics store">
  <defs><linearGradient id="${bl}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6fafd"/><stop offset="1" stop-color="#d9e6f1"/></linearGradient></defs>
  <ellipse cx="100" cy="142" rx="92" ry="6" fill="rgba(8,42,72,.18)"/>
  <rect x="18" y="52" width="164" height="86" rx="8" fill="url(#${bl})" stroke="rgba(90,120,150,.3)"/>
  ${aw}
  <rect x="48" y="64" width="104" height="22" rx="8" fill="#0d3860"/>
  <text x="100" y="79.5" text-anchor="middle" font-family="Space Grotesk, Arial, sans-serif" font-size="10" font-weight="700" letter-spacing="2.5" fill="#fff">NAZEER</text>
  <rect x="34" y="96" width="54" height="38" rx="5" fill="#a8dcf4" stroke="rgba(90,120,150,.4)"/>
  <path d="M40 128 78 100" stroke="rgba(255,255,255,.75)" stroke-width="4" stroke-linecap="round"/>
  <rect x="112" y="92" width="44" height="42" rx="5" fill="#123f6b"/>
  <circle cx="147" cy="114" r="2.6" fill="#ffd166"/>
</svg>`;
}

const ART = {
  laptop: o => svgLaptop(o), gaming: () => svgLaptop({ gaming: true }),
  phone: () => svgPhone(), phonePro: () => svgPhone({ pro: true }),
  headphones: svgHeadphones, watch: svgWatch, speaker: svgSpeaker,
  earbuds: svgEarbuds, tablet: svgTablet, controller: svgController,
  agent: svgAgent, package: svgPackage, tag: svgTag, gift: svgGift, store: svgStore,
};
// Neutralized: static cartoon data-art injection disabled for realistic photorealism
// $$('[data-art]').forEach(el => { const fn = ART[el.dataset.art]; if (fn) el.innerHTML = fn(); });

/* ============================================================
   3 · DATA & STATE
   ============================================================ */
const PRODUCTS = [
  { 
    id: 1, 
    name: 'Marshall Major IV Wireless', 
    brand: 'marshall', 
    cat: 'audio', 
    tags: ['audio', 'marshall'], 
    price: 12999, 
    old: 14999, 
    discount: 13, 
    rating: 4.9, 
    art: 'headphones',
    image: 'assets/images/hero_sony_real.jpg',
    spec: '80h Wireless Playtime • Custom-tuned dynamic drivers • Wireless charging',
    badge: 'BESTSELLER'
  },
  { 
    id: 2, 
    name: 'Apple iPhone 16 Pro Max 1TB', 
    brand: 'apple', 
    cat: 'phones', 
    tags: ['phones', 'apple'], 
    price: 144900, 
    old: 159900, 
    discount: 10, 
    rating: 5.0, 
    art: 'phonePro',
    image: 'assets/images/hero_iphone_real.jpg',
    spec: 'A18 Pro Bionic AI • 6.9" 120Hz ProMotion XDR • 48MP 5x Zoom • Titanium',
    badge: '🔥 #1 BEST SELLER'
  },
  { 
    id: 3, 
    name: 'Samsung Galaxy S24 Ultra 5G', 
    brand: 'samsung', 
    cat: 'phones', 
    tags: ['phones', 'samsung'], 
    price: 119999, 
    old: 134999, 
    discount: 11, 
    rating: 4.9, 
    art: 'phone',
    image: 'assets/images/hero_s24_real.jpg',
    spec: 'Snapdragon 8 Gen 3 • 200MP Quad Zoom • Built-in S-Pen • 2600nits AMOLED',
    badge: 'TOP ANDROID'
  },
  { 
    id: 4, 
    name: 'Marshall Monitor II A.N.C.', 
    brand: 'marshall', 
    cat: 'audio', 
    tags: ['audio', 'marshall'], 
    price: 24999, 
    old: 29999, 
    discount: 17, 
    rating: 4.8, 
    art: 'headphones',
    image: 'assets/images/hero_sony_real.jpg',
    spec: 'Active Noise Cancelling • 40mm Dynamic Drivers • 30h ANC Playtime',
    badge: 'STUDIO GRADE'
  },
  { 
    id: 5, 
    name: 'Apple AirPods Max (Space Gray)', 
    brand: 'apple', 
    cat: 'audio', 
    tags: ['audio', 'apple'], 
    price: 54900, 
    old: 59900, 
    discount: 8, 
    rating: 4.9, 
    art: 'headphones',
    image: 'assets/images/real_airpods_max.jpg',
    spec: 'Apple H1 Headphone Chip • Computational Audio • Spatial Audio Tracking',
    badge: 'LUXURY AUDIO'
  },
  { 
    id: 6, 
    name: 'Sony WH-1000XM5 ANC (Silver)', 
    brand: 'sony', 
    cat: 'audio', 
    tags: ['audio', 'sony'], 
    price: 26990, 
    old: 34990, 
    discount: 23, 
    rating: 4.9, 
    art: 'headphones',
    image: 'assets/images/hero_sony_real.jpg',
    spec: 'Dual QN1+V1 ANC Processors • 30mm Carbon Drivers • 30h Battery • LDAC',
    badge: 'TOP RATED'
  },
  { 
    id: 7, 
    name: 'Bose QuietComfort Ultra', 
    brand: 'bose', 
    cat: 'audio', 
    tags: ['audio', 'bose'], 
    price: 34900, 
    old: 38900, 
    discount: 10, 
    rating: 4.8, 
    art: 'headphones',
    image: 'assets/images/hero_sony_real.jpg',
    spec: 'World-Class Noise Cancellation • CustomTune Tech • Spatial Audio',
    badge: 'IMMERSIVE'
  },
  { 
    id: 8, 
    name: 'Google Pixel 9 Pro XL 5G', 
    brand: 'google', 
    cat: 'phones', 
    tags: ['phones', 'google'], 
    price: 109999, 
    old: 124999, 
    discount: 12, 
    rating: 4.8, 
    art: 'phone',
    image: 'assets/images/hero_s24_real.jpg',
    spec: 'Google Tensor G4 • Super Actua OLED Display • Gemini AI Pro Built-in',
    badge: 'GEMINI AI'
  },
  { 
    id: 9, 
    name: 'Apple iPhone 15 Pro (128GB)', 
    brand: 'apple', 
    cat: 'phones', 
    tags: ['phones', 'apple'], 
    price: 99900, 
    old: 119900, 
    discount: 17, 
    rating: 4.9, 
    art: 'phonePro',
    image: 'assets/images/hero_iphone_real.jpg',
    spec: 'A17 Pro 3nm Chip • Titanium Band • Action Button • USB-C 10Gbps',
    badge: 'BEST DEAL'
  },
  { 
    id: 10, 
    name: 'OnePlus 12 5G (Hasselblad)', 
    brand: 'oneplus', 
    cat: 'phones', 
    tags: ['phones', 'android'], 
    price: 64999, 
    old: 69999, 
    discount: 7, 
    rating: 4.7, 
    art: 'phone',
    image: 'assets/images/hero_s24_real.jpg',
    spec: 'Snapdragon 8 Gen 3 • 4th Gen Hasselblad Camera • 100W SUPERVOOC',
    badge: 'SPEED KING'
  },
  { 
    id: 11, 
    name: 'MacBook Pro 16" M3 Max (Black)', 
    brand: 'apple', 
    cat: 'laptops', 
    tags: ['laptops', 'apple'], 
    price: 249900, 
    old: 289900, 
    discount: 14, 
    rating: 5.0, 
    art: 'laptop',
    image: 'assets/images/hero_macbook_real.jpg',
    spec: '16C CPU / 40C GPU • 64GB Unified RAM • 1TB SSD • 16.2" XDR 120Hz',
    badge: 'PRO WORKSTATION'
  },
  { 
    id: 12, 
    name: 'ASUS ROG Zephyrus G16 OLED', 
    brand: 'asus', 
    cat: 'laptops', 
    tags: ['laptops', 'gaming'], 
    price: 189990, 
    old: 219990, 
    discount: 14, 
    rating: 4.8, 
    art: 'gaming',
    image: 'assets/images/real_rog_zephyrus.jpg',
    spec: 'Intel Core Ultra 9 • RTX 4080 12GB • 16" 2.5K 240Hz OLED • CNC Aluminum',
    badge: '🔥 240Hz GAMING'
  },
  { 
    id: 13, 
    name: 'Apple Watch Ultra 2 (49mm)', 
    brand: 'apple', 
    cat: 'wearables', 
    tags: ['wearables', 'apple'], 
    price: 79900, 
    old: 89900, 
    discount: 11, 
    rating: 4.9, 
    art: 'watch',
    image: 'assets/images/hero_watch_real.jpg',
    spec: 'Aerospace Titanium • 3000 nits Sapphire OLED • Dual GPS • 100m WR100',
    badge: 'EXPEDITION'
  },
  { 
    id: 14, 
    name: 'Marshall Stanmore III Speaker', 
    brand: 'marshall', 
    cat: 'speakers', 
    tags: ['speakers', 'marshall'], 
    price: 37999, 
    old: 42999, 
    discount: 12, 
    rating: 4.8, 
    art: 'speaker',
    image: 'assets/images/hero_speaker_real.jpg',
    spec: '80W Room-Filling Stereo • Bluetooth 5.2 + RCA • Analog Brass Control Knobs',
    badge: 'HERITAGE AUDIO'
  },
  { 
    id: 15, 
    name: 'AirSound Pro ANC Earbuds', 
    brand: 'nazeer', 
    cat: 'audio', 
    tags: ['audio'], 
    price: 3999, 
    old: 6999, 
    discount: 43, 
    rating: 4.7, 
    art: 'earbuds',
    image: 'assets/images/featured_earbuds.jpg',
    spec: 'Hybrid 42dB ANC • 11mm Graphene Drivers • 38h Battery • IPX5 Waterproof',
    badge: '43% OFF'
  },
  { 
    id: 16, 
    name: 'iPad Pro 11" M4 Tandem OLED', 
    brand: 'apple', 
    cat: 'tablets', 
    tags: ['tablets'], 
    price: 99900, 
    old: 119900, 
    discount: 17, 
    rating: 4.9, 
    art: 'tablet',
    image: 'assets/images/real_ipad_tablet.jpg',
    spec: 'Apple M4 Chip • Ultra Retina XDR Tandem OLED • 5.1mm Ultra-thin • Pencil Pro',
    badge: 'NEW M4 OLED'
  }
];
const FEATURED = [2, 11, 6];
const CAT_LABEL = { laptops:'Laptops', phones:'Smartphones', audio:'Headphones', speakers:'Speakers', wearables:'Smart Watches', tablets:'Tablets', gaming:'Gaming' };

const state = { cart: new Map(), wishlist: new Set(), user: null, filter: 'all', brand: 'all', query: '' };
const byId = id => PRODUCTS.find(p => p.id === id);
const money = n => '₹' + Number(n).toLocaleString('en-IN');
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));

/* ---------- persistence (Cart, Wishlist, User, Orders) ---------- */
function saveCart()     { try { localStorage.setItem('nx-cart',     JSON.stringify([...state.cart])); }     catch (e) {} }
function saveWishlist() { try { localStorage.setItem('nx-wishlist', JSON.stringify([...state.wishlist])); } catch (e) {} }
function loadCart() {
  try {
    JSON.parse(localStorage.getItem('nx-cart') || '[]')
      .forEach(([k, v]) => { if (byId(k)) state.cart.set(k, v); });
  } catch (e) {}
}
function loadWishlist() {
  try {
    JSON.parse(localStorage.getItem('nx-wishlist') || '[]')
      .forEach(id => { if (byId(id)) state.wishlist.add(id); });
  } catch (e) {}
}

/* User authentication state */
function saveUser() {
  try {
    if (state.user) localStorage.setItem('nx-user', JSON.stringify(state.user));
    else localStorage.removeItem('nx-user');
  } catch (e) {}
}
function loadUser() {
  try {
    const raw = localStorage.getItem('nx-user');
    if (raw) state.user = JSON.parse(raw);
    else {
      // Default demo user for instant convenience
      state.user = {
        name: 'Alex Chen',
        email: 'alex.chen@example.com',
        phone: '+1 (555) 234-5678',
        address: '742 Evergreen Terrace, Jubilee Hills Road No. 36, Hyderabad, Telangana - 500033'
      };
      saveUser();
    }
  } catch (e) {}
}

/* Orders state with 5-stage live delivery tracker */
const DEFAULT_ORDERS = [
  {
    id: 'NZR-849201',
    date: 'Sep 16, 2026',
    items: [
      { id: 2, name: 'Apple iPhone 16 Pro Max 1TB', qty: 1, price: 144900, color: 'Natural Titanium' },
      { id: 6, name: 'Sony WH-1000XM5 ANC', qty: 1, price: 26990, color: 'Silver Platinum' }
    ],
    subtotal: 171890,
    shipping: 0,
    total: 171890,
    carrier: 'Nazeer Sky Express Priority Air',
    trackingNum: 'NZR-AIR-849201',
    address: {
      name: 'Alex Chen',
      phone: '+91 98765 43210',
      street: '742 Evergreen Terrace, Jubilee Hills Rd 36',
      city: 'Hyderabad',
      state: 'Telangana',
      pin: '500033'
    },
    shippingMethod: 'Standard Sky Delivery',
    paymentMethod: 'Instant UPI / Cards',
    currentStage: 2,
    statusText: 'Shipped & En Route to Delivery Hub',
    eta: 'Tomorrow by 2:00 PM'
  }
];

function getOrders() {
  try {
    const raw = localStorage.getItem('nx-orders');
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  localStorage.setItem('nx-orders', JSON.stringify(DEFAULT_ORDERS));
  return DEFAULT_ORDERS;
}
function saveOrders(orders) {
  try { localStorage.setItem('nx-orders', JSON.stringify(orders)); } catch (e) {}
}
function createOrder(order) {
  const orders = getOrders();
  orders.unshift(order);
  saveOrders(orders);
  return order;
}

/* ============================================================
   4 · RENDERING
   ============================================================ */
function starsHTML(r) {
  let h = '';
  for (let i = 1; i <= 5; i++) h += `<span class="st ${i <= Math.round(r) ? 'full' : ''}">${icon('star')}</span>`;
  return h;
}

function cardHTML(p) {
  const on = state.wishlist.has(p.id);
  const imgSrc = p.image || 'assets/images/hero_iphone_real.jpg';
  const badgeTxt = p.badge || `-${p.discount}% OFF`;
  return `<article class="p-card glass tilt" data-id="${p.id}">
    <div class="p-media">
      <span class="badge ${p.badge ? 'bestseller-badge' : ''}">${esc(badgeTxt)}</span>
      <button class="wish ${on ? 'on' : ''}" data-wish="${p.id}" aria-label="Toggle wishlist">${icon('heart')}</button>
      <div class="dev-wrap dev-real-wrap">
        <img src="${imgSrc}" alt="${esc(p.name)}" class="p-card-real-img" loading="lazy" />
      </div>
    </div>
    <div class="p-info">
      <div class="p-meta-top">
        <span class="p-cat">${CAT_LABEL[p.cat] || p.cat}</span>
        <span class="p-rating-tag"><svg class="ic" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg> ${p.rating}</span>
      </div>
      <h3 class="p-name">${esc(p.name)}</h3>
      ${p.spec ? `<p class="p-spec-highlight">${esc(p.spec)}</p>` : ''}
      <div class="p-price">
        <span class="now">${money(p.price)}</span>
        <span class="old">${money(p.old)}</span>
        <span class="p-save-chip">-${p.discount}%</span>
      </div>
      <div class="p-emi-mini">EMI from ${money(Math.round(p.price / 24))}/mo</div>
      <div class="p-actions">
        <button class="btn btn-primary btn-sm" data-add="${p.id}">${icon('cart')} Add to Cart</button>
        <button class="btn btn-ghost btn-sm" data-buy="${p.id}">⚡ Buy Now</button>
      </div>
      <button class="btn-3d-inspect" data-inspect-3d="${p.id}">
        <svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
        View Details &amp; Customizer
      </button>
    </div>
  </article>`;
}

function renderFeatured() {
  const fg = $('#featuredGrid');
  if (!fg) return;
  fg.innerHTML = FEATURED.map(id => cardHTML(byId(id)))
    .map((h, i) => i === 0 ? h.replace('p-card glass tilt', 'p-card feat-lg glass tilt') : h).join('');
}

let storeTriggers = [];
function filteredProducts() {
  let list = PRODUCTS.filter(p => p.store !== false);
  if (state.filter !== 'all') list = list.filter(p => p.cat === state.filter || (p.tags || []).includes(state.filter));
  if (state.query) {
    const q = state.query.toLowerCase();
    list = list.filter(p => (p.name + ' ' + CAT_LABEL[p.cat]).toLowerCase().includes(q));
  }
  return list;
}

function renderStore(animate = true) {
  const grid = $('#productGrid');
  if (!grid) return;
  storeTriggers.forEach(t => t.kill()); storeTriggers = [];
  const list = filteredProducts();
  const rc = $('#resultCount');
  if (rc) rc.textContent = `${list.length} product${list.length === 1 ? '' : 's'}`;
  if (!list.length) {
    grid.innerHTML = `<div class="empty glass">
      <div class="empty-icon-wrap">
        <svg class="ic-empty" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.35-4.35"/></svg>
      </div>
      <p>No matches for "${esc(state.query) || 'this filter'}" — try searching another flagship model.</p>
      <button class="f-chip" data-filter="all">Reset filters</button></div>`;
    return;
  }
  grid.innerHTML = list.map(cardHTML).join('');
  if (animate && HAS_GSAP) {
    $$('.p-card', grid).forEach((card, i) => {
      const tw = gsap.fromTo(card, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: .8, delay: i * .07, ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 94%', once: true },
        clearProps: 'transform',
      });
      storeTriggers.push(tw.scrollTrigger);
    });
  }
}

function renderBadges() {
  const cQ = [...state.cart.values()].reduce((a, b) => a + b, 0);
  const cb = $('#cartBadge'), wb = $('#wishBadge');
  cb.textContent = cQ; wb.textContent = state.wishlist.size;
  cb.classList.toggle('show', cQ > 0);
  wb.classList.toggle('show', state.wishlist.size > 0);
}
/* FIX A: clearProps so the badge hides again when count returns to 0 */
function popBadge(el) {
  if (HAS_GSAP) gsap.fromTo(el, { scale: .3 },
    { scale: 1, duration: .5, ease: 'back.out(3.5)', clearProps: 'transform' });
}

function renderCart() {
  const wrap = $('#cartItems');
  const entries = [...state.cart.entries()];
  $('#cartCountTxt').textContent = entries.length ? `(${entries.reduce((a, b) => a + b[1], 0)} items)` : '';
  if (!entries.length) {
    wrap.innerHTML = `<div class="drawer-empty">
      <div class="empty-icon-wrap">
        <svg class="ic-empty" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
      </div>
      <p>Your cart is empty.<br/>Discover authentic flagship gear.</p>
      <button class="btn btn-primary btn-sm" data-goto="#store">Browse products</button></div>`;
  } else {
    wrap.innerHTML = entries.map(([id, qty]) => {
      const p = byId(id);
      const thumb = p.image ? `<img src="${p.image}" alt="${esc(p.name)}" class="ci-real-img" />` : ART[p.art](p);
      return `<div class="cart-item">
        <div class="ci-thumb">${thumb}</div>
        <div>
          <p class="ci-name">${p.name}</p>
          <p class="ci-price">${money(p.price)} each</p>
          <div class="qty">
            <button data-qty="-" data-id="${p.id}" aria-label="Decrease">${icon('minus')}</button>
            <b>${qty}</b>
            <button data-qty="+" data-id="${p.id}" aria-label="Increase">${icon('plus')}</button>
          </div>
        </div>
        <div class="ci-right">
          <span class="ci-total">${money(p.price * qty)}</span>
          <button class="ci-remove" data-rm="${p.id}" aria-label="Remove">${icon('trash')}</button>
        </div>
      </div>`;
    }).join('');
  }
  const sub = entries.reduce((a, [id, q]) => a + byId(id).price * q, 0);
  $('#cartSub').textContent = money(sub);
  $('#cartDel').textContent = sub === 0 || sub >= 50 ? 'Free' : money(6);
  $('#cartTotal').textContent = money(sub === 0 ? 0 : sub + (sub >= 50 ? 0 : 6));
  renderBadges();
  saveCart(); /* NEW: persist cart */
}

function renderWishlist() {
  const wrap = $('#wishItems');
  const ids = [...state.wishlist];
  if (!ids.length) {
    wrap.innerHTML = `<div class="drawer-empty">
      <div class="empty-icon-wrap">
        <svg class="ic-empty" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M12 20.3C7.2 16.7 3.8 13.6 3.8 10a4.6 4.6 0 0 1 8.2-2.9A4.6 4.6 0 0 1 20.2 10c0 3.6-3.4 6.7-8.2 10.3Z"/></svg>
      </div>
      <p>Nothing saved yet.<br/>Tap the heart on any product to save it.</p>
      <button class="btn btn-primary btn-sm" data-goto="#store">Discover products</button></div>`;
    return;
  }
  wrap.innerHTML = ids.map(id => {
    const p = byId(id);
    const thumb = p.image ? `<img src="${p.image}" alt="${esc(p.name)}" class="ci-real-img" />` : `<img src="assets/images/hero_iphone_real.jpg" alt="${esc(p.name)}" class="ci-real-img" />`;
    return `<div class="cart-item">
      <div class="ci-thumb">${thumb}</div>
      <div>
        <p class="ci-name">${p.name}</p>
        <p class="ci-price">${money(p.price)}</p>
        <button class="btn btn-primary btn-sm" data-add="${p.id}" data-wl-move="${p.id}" style="margin-top:8px">${icon('cart')} Move to Cart</button>
      </div>
      <div class="ci-right"><button class="ci-remove" data-wl-rm="${p.id}" aria-label="Remove">${icon('x')}</button></div>
    </div>`;
  }).join('');
}

/* ============================================================
   5 · TOASTS
   ============================================================ */
function toast(msg, icoName = 'check', tone = '') {
  const box = $('#toasts');
  const el = document.createElement('div');
  el.className = 'toast ' + tone;
  el.innerHTML = `<span class="t-ic">${icon(icoName)}</span><p>${msg}</p>`;
  box.appendChild(el);
  if (HAS_GSAP) {
    gsap.fromTo(el, { x: 70, opacity: 0 }, { x: 0, opacity: 1, duration: .45, ease: 'back.out(1.6)' });
    gsap.to(el, { x: 70, opacity: 0, delay: 3.1, duration: .4, ease: 'power2.in', onComplete: () => el.remove() });
  } else setTimeout(() => el.remove(), 3400);
}

/* ============================================================
   6 · CART / WISHLIST ACTIONS
   ============================================================ */
function addToCart(id, openAfter = false) {
  const p = byId(id);
  state.cart.set(id, (state.cart.get(id) || 0) + 1);
  renderCart(); popBadge($('#cartBadge'));
  toast(`${esc(p.name)} added to cart`, 'cart');
  if (openAfter) openDrawer($('#cartDrawer'));
}
function changeQty(id, delta) {
  const next = (state.cart.get(id) || 0) + delta;
  if (next < 1) { state.cart.delete(id); toast('Removed from cart', 'trash'); }
  else state.cart.set(id, next);
  renderCart();
}
function toggleWish(id) {
  const p = byId(id);
  if (state.wishlist.has(id)) { state.wishlist.delete(id); toast('Removed from wishlist', 'trash'); }
  else { state.wishlist.add(id); toast(`${esc(p.name)} saved to wishlist`, 'heart', 'love'); }
  $$(`[data-wish="${id}"]`).forEach(b => b.classList.toggle('on', state.wishlist.has(id)));
  renderBadges();
  saveWishlist(); /* NEW: persist wishlist */
  if ($('#wishDrawer').classList.contains('open')) renderWishlist();
}

/* ============================================================
   7 · DRAWERS / POPOVER
   ============================================================ */
function openDrawer(d) { closeDrawers(); d.classList.add('open'); $('#backdrop').classList.add('show'); document.body.classList.add('locked'); }
function closeDrawers() {
  $$('.drawer').forEach(d => d.classList.remove('open'));
  $('#backdrop').classList.remove('show');
  document.body.classList.remove('locked');
  hidePop();
}
function showPop() {
  const pop = $('#profilePop'), btn = $('#profileBtn');
  $('#popName').textContent = state.user.name;
  $('#popMail').textContent = state.user.email;
  const r = btn.getBoundingClientRect();
  pop.style.top = (r.bottom + 12) + 'px';
  pop.style.right = Math.max(12, innerWidth - r.right) + 'px';
  pop.classList.add('show');
  if (HAS_GSAP) gsap.fromTo(pop, { y: -8, scale: .95, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: .3, ease: 'back.out(1.8)' });
}
function hidePop() { $('#profilePop').classList.remove('show'); }
function profileAction() {
  if (!state.user) {
    $('#auth').scrollIntoView({ behavior: 'smooth' });
    toast('Sign in to view your profile', 'info', 'warn');
  } else $('#profilePop').classList.contains('show') ? hidePop() : showPop();
}

/* ============================================================
   8 · FORM VALIDATION HELPERS
   ============================================================ */
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
function setErr(input, msg) {
  const f = input.closest('.field');
  f.querySelector('.f-err').textContent = msg;
  f.classList.add('bad');
  if (HAS_GSAP) gsap.fromTo(f, { x: 0 }, { keyframes: [{ x: -6 }, { x: 6 }, { x: -4 }, { x: 0 }], duration: .35 });
}
function clearErr(input) {
  const f = input.closest('.field');
  f.querySelector('.f-err').textContent = '';
  f.classList.remove('bad');
}
 $$('.field input, .field textarea').forEach(i => i.addEventListener('input', () => clearErr(i)));

/* ============================================================
   9 · AUTH
   ============================================================ */
function activateTab(name) {
  $$('.auth-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === name));
  $('#tabInk').style.transform = name === 'signup' ? 'translateX(100%)' : 'translateX(0)';
  $$('.auth-form').forEach(f => f.classList.remove('active'));
  const panel = $(name === 'signup' ? '#signupForm' : '#loginForm');
  panel.classList.add('active');
  if (HAS_GSAP) gsap.fromTo(panel, { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: .45, ease: 'power3.out' });
}
 $$('.auth-tab').forEach(t => t.addEventListener('click', () => activateTab(t.dataset.tab)));

function signIn(name, email) {
  state.user = { name, email };
  const ini = $('#userInitial');
  ini.textContent = name.charAt(0).toUpperCase();
  ini.hidden = false;
  try { localStorage.setItem('nx-user', JSON.stringify(state.user)); } catch (e) {}
  toast(`Welcome back, ${esc(name.split(' ')[0])}!`, 'user');
  setTimeout(() => $('#dashboard').scrollIntoView({ behavior: 'smooth' }), 350);
}

 $('#loginForm')?.addEventListener('submit', e => {
  e.preventDefault();
  const em = $('#loginEmail'), pw = $('#loginPassword');
  if (!em || !pw) return;
  let ok = true;
  if (!emailRe.test(em.value.trim())) { setErr(em, 'Enter a valid email address'); ok = false; }
  if (pw.value.length < 6) { setErr(pw, 'Password must be at least 6 characters'); ok = false; }
  if (!ok) return;
  const name = em.value.trim().split('@')[0].replace(/[._-]+/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  signIn(name, em.value.trim());
  e.target.reset();
});

 $('#signupForm')?.addEventListener('submit', e => {
  e.preventDefault();
  const n = $('#suName'), em = $('#suEmail'), ph = $('#suPhone'), pw = $('#suPassword'), cf = $('#suConfirm');
  if (!n || !em || !pw) return;
  let ok = true;
  if (n.value.trim().length < 3) { setErr(n, 'Please enter your full name'); ok = false; }
  if (!emailRe.test(em.value.trim())) { setErr(em, 'Enter a valid email address'); ok = false; }
  if (ph && !/^[0-9+\-\s()]{8,16}$/.test(ph.value.trim())) { setErr(ph, 'Enter a valid mobile number'); ok = false; }
  if (pw.value.length < 6) { setErr(pw, 'Password must be at least 6 characters'); ok = false; }
  if (cf && (cf.value !== pw.value || !cf.value)) { setErr(cf, 'Passwords do not match'); ok = false; }
  if (!ok) return;
  signIn(n.value.trim(), em.value.trim());
  toast('Account created — you are in!', 'check');
  e.target.reset();
});

 $$('.eye').forEach(btn => btn.addEventListener('click', () => {
  const input = document.getElementById(btn.dataset.eye);
  if (!input) return;
  const show = input.type === 'password';
  input.type = show ? 'text' : 'password';
  btn.innerHTML = icon(show ? 'eyeOff' : 'eye');
  btn.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
}));

 $('#signOutBtn')?.addEventListener('click', () => {
  state.user = null;
  const ini = $('#userInitial');
  if (ini) ini.hidden = true;
  hidePop();
  try { localStorage.removeItem('nx-user'); } catch (e) {}
  toast('Signed out. See you soon!', 'user');
});

/* ============================================================
   10 · SEARCH & FILTERS
   ============================================================ */
function setFilter(f) {
  state.filter = f;
  $$('.f-chip').forEach(c => c.classList.toggle('active', c.dataset.filter === f));
  renderStore();
}
function setQuery(q) {
  state.query = q.trim();
  if (state.query) setFilter('all');
  if ($('#searchInput')) $('#searchInput').value = q;
  if ($('#storeSearch')) $('#storeSearch').value = q;
  if ($('#clearSearch')) $('#clearSearch').hidden = !q;
  if ($('#productGrid')) renderStore();
}
['searchInput', 'storeSearch'].forEach(id => {
  const el = $('#' + id);
  if (el) {
    el.addEventListener('input', e => setQuery(e.target.value));
    el.addEventListener('keydown', e => {
      if (e.key === 'Enter') $('#store')?.scrollIntoView({ behavior: 'smooth' });
      if (e.key === 'Escape') setQuery('');
    });
  }
});
 $('#clearSearch')?.addEventListener('click', () => setQuery(''));
 $('#searchToggle')?.addEventListener('click', () => {
  const s = $('#navSearch');
  if (s) {
    s.classList.toggle('open');
    if (s.classList.contains('open') && $('#searchInput')) $('#searchInput').focus();
  }
});

/* ============================================================
   11 · GLOBAL CLICK DELEGATION
   ============================================================ */
document.addEventListener('click', e => {
  const t = e.target;
  const hit = sel => t.closest(sel);
  let el;
  /* FIX B: "Move to Cart" from wishlist also removes it from the wishlist.
     Must be checked BEFORE the plain [data-add] handler. */
  if ((el = hit('[data-wl-move]'))) {
    addToCart(+el.dataset.add);
    state.wishlist.delete(+el.dataset.wlMove);
    $$(`[data-wish="${el.dataset.wlMove}"]`).forEach(b => b.classList.remove('on'));
    renderBadges(); saveWishlist(); renderWishlist();
    return;
  }
  if ((el = hit('[data-add]')))      return addToCart(+el.dataset.add);
  if ((el = hit('[data-buy]')))      return addToCart(+el.dataset.buy, true);
  if ((el = hit('[data-wish]')))     return toggleWish(+el.dataset.wish);
  if ((el = hit('[data-cat]')))    { setFilter(el.dataset.cat); $('#store').scrollIntoView({ behavior: 'smooth' }); return; }
  if ((el = hit('[data-filter]')))   return setFilter(el.dataset.filter);
  if ((el = hit('[data-qty]')))      return changeQty(+el.dataset.id, el.dataset.qty === '+' ? 1 : -1);
  if ((el = hit('[data-rm]')))     { state.cart.delete(+el.dataset.rm); renderCart(); toast('Removed from cart', 'trash'); return; }
  if ((el = hit('[data-wl-rm]')))  { state.wishlist.delete(+el.dataset.wlRm); renderBadges(); saveWishlist(); renderWishlist();
                                       $$(`[data-wish="${el.dataset.wlRm}"]`).forEach(b => b.classList.remove('on')); return; }
  if ((el = hit('[data-goto]')))   { closeDrawers(); $(el.dataset.goto)?.scrollIntoView({ behavior: 'smooth' }); return; }
  if ((el = hit('[data-goto-auth]'))) activateTab(el.dataset.gotoAuth);
  if ((el = hit('[data-support]')))    toast(`Need help with ${el.dataset.support}? Send us a message below.`, 'phone');
  if ((el = hit('[data-quick]')))  { el.dataset.quick === 'cart' ? openDrawer($('#cartDrawer')) : profileAction(); return; }
  if (hit('[data-close-drawer]'))    return closeDrawers();
  if (hit('#cartBtn'))               { renderCart(); return openDrawer($('#cartDrawer')); }
  if (hit('#wishBtn'))             { renderWishlist(); return openDrawer($('#wishDrawer')); }
  if (hit('#profileBtn'))            return profileAction();
  if (hit('#checkoutBtn')) {
    if (!state.cart.size) return toast('Your cart is empty — add something first!', 'info', 'warn');
    state.cart.clear(); renderCart(); closeDrawers();
    return toast('Order placed! Confirmation sent to your email.', 'check');
  }
  if (hit('#addAllWish')) {
    if (!state.wishlist.size) return toast('Your wishlist is empty.', 'info', 'warn');
    state.wishlist.forEach(id => state.cart.set(id, (state.cart.get(id) || 0) + 1));
    renderCart(); popBadge($('#cartBadge')); closeDrawers();
    return toast('Wishlist moved to cart', 'cart');
  }
  if (!hit('.nav-search')) $('#navSearch').classList.remove('open');
  if (!hit('#profilePop') && !hit('#profileBtn')) hidePop();
});
 $('#backdrop')?.addEventListener('click', closeDrawers);
document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeDrawers(); $('#nav')?.classList.remove('open'); } });

/* ============================================================
   12 · CONTACT + NEWSLETTER
   ============================================================ */
 $('#contactForm')?.addEventListener('submit', e => {
  e.preventDefault();
  const n = $('#cName'), em = $('#cEmail'), ph = $('#cPhone'), m = $('#cMsg');
  if (!n || !em || !m) return;
  let ok = true;
  if (n.value.trim().length < 2) { setErr(n, 'Please tell us your name'); ok = false; }
  if (!emailRe.test(em.value.trim())) { setErr(em, 'Enter a valid email address'); ok = false; }
  if (ph && ph.value.trim() && !/^[0-9+\-\s()]{8,16}$/.test(ph.value.trim())) { setErr(ph, 'Enter a valid phone number'); ok = false; }
  if (m.value.trim().length < 10) { setErr(m, 'Message should be at least 10 characters'); ok = false; }
  if (!ok) return;
  toast(`Thanks ${esc(n.value.split(' ')[0])}! We'll reply within 2 hours.`, 'send');
  e.target.reset();
});
 $('#newsForm')?.addEventListener('submit', e => {
  e.preventDefault();
  const em = $('#newsEmail');
  if (!em || !emailRe.test(em.value.trim())) return toast('Please enter a valid email', 'info', 'warn');
  toast('Subscribed! First drop lands this Friday.', 'check');
  em.value = '';
});

/* ============================================================
   13 · NAV / SCROLL-TOP / COUNTDOWN / TILT
   ============================================================ */
 $('#burger')?.addEventListener('click', () => $('#nav')?.classList.toggle('open'));
 $$('#navLinks .nav-link').forEach(l => l.addEventListener('click', () => $('#nav')?.classList.remove('open')));
 $('#stb')?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
 const yrEl = $('#year'); if (yrEl) yrEl.textContent = new Date().getFullYear();

window.addEventListener('scroll', () => {
  $('#nav').classList.toggle('scrolled', scrollY > 30);
  $('#stb').classList.toggle('show', scrollY > 600);
}, { passive: true });

const cdEnd = Date.now() + ((2 * 24 + 11) * 3600 + 42 * 60 + 18) * 1000;
const p2 = n => String(n).padStart(2, '0');
setInterval(() => {
  let s = Math.max(0, Math.floor((cdEnd - Date.now()) / 1000));
  const d = Math.floor(s / 86400); s %= 86400;
  const h = Math.floor(s / 3600);  s %= 3600;
  const m = Math.floor(s / 60);
  const el = $('#cd');
  if (el) el.textContent = `${d}d : ${p2(h)}h : ${p2(m)}m : ${p2(s)}s`;
}, 1000);

function bindTilt(scope = document) {
  if (matchMedia('(hover: none)').matches) return;
  $$('.tilt', scope).forEach(card => {
    if (card._tilt) return;
    card._tilt = true;
    card.addEventListener('pointermove', ev => {
      const r = card.getBoundingClientRect();
      const px = (ev.clientX - r.left) / r.width, py = (ev.clientY - r.top) / r.height;
      card.classList.add('tilting');
      card.style.setProperty('--ry', ((px - .5) * 10).toFixed(2) + 'deg');
      card.style.setProperty('--rx', ((.5 - py) * 10).toFixed(2) + 'deg');
    });
    card.addEventListener('pointerleave', () => {
      card.classList.remove('tilting');
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
    });
  });
}

/* ============================================================
   14 · INITIAL RENDER
   ============================================================ */
loadCart();      /* NEW: restore saved cart */
loadWishlist();  /* NEW: restore saved wishlist (before renders, so heart states are correct) */
renderFeatured();
renderStore(false);
renderCart();
renderBadges();
bindTilt();
try {
  const saved = JSON.parse(localStorage.getItem('nx-user') || 'null');
  if (saved) { state.user = saved; $('#userInitial').textContent = saved.name.charAt(0).toUpperCase(); $('#userInitial').hidden = false; }
} catch (e) {}

/* ============================================================
   15 · GSAP — LOADER, INTRO, REVEALS, PARALLAX
   ============================================================ */
if (HAS_GSAP) {
  const C = 2 * Math.PI * 52;
  const ring = $('#ldRing');
  ring.style.strokeDasharray = C;
  ring.style.strokeDashoffset = C;

  const pct = { v: 0 };
  gsap.to(pct, {
    v: 100, duration: REDUCED ? .3 : 1.9, ease: 'power2.inOut',
    onUpdate() {
      const v = pct.v;
      $('#ldFill').style.width = v + '%';
      $('#ldPct').textContent = Math.round(v) + '%';
      ring.style.strokeDashoffset = C * (1 - v / 100);
    },
    onComplete() {
      const tl = gsap.timeline();
      tl.to('.ld-inner', { y: -26, opacity: 0, duration: .45, ease: 'power2.in' })
        .to('#loader', { yPercent: -100, duration: .85, ease: 'power4.inOut' })
        .add(intro(), '-=.45')
        .set('#loader', { display: 'none' });
    },
  });

  function intro() {
    document.body.classList.remove('locked');
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo('#nav', { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: .8 })
      .fromTo('.hero .eyebrow', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: .6 }, '-=.5')
      .fromTo('.hero-title .wi', { yPercent: 115 }, { yPercent: 0, duration: .95, stagger: .1, ease: 'power4.out' }, '-=.45')
      .fromTo('.hero-sub', { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: .7 }, '-=.55')
      .fromTo('.hero-cta .btn', { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: .6, stagger: .12, clearProps: 'transform' }, '-=.5')
      .fromTo('.hero-stats li', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: .5, stagger: .09, clearProps: 'transform' }, '-=.45')
      .fromTo('#heroStage', { scale: .82, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.1, clearProps: 'all' }, '-=.9')
      .fromTo('.hero .chip', { scale: .5, opacity: 0 }, { scale: 1, opacity: 1, duration: .55, stagger: .12, ease: 'back.out(2)', clearProps: 'transform,opacity' }, '-=.75')
      .fromTo('.stage-hint, .scroll-cue', { opacity: 0 }, { opacity: 1, duration: .6 }, '-=.3');
    return tl;
  }

  // scroll reveals
  $$('[data-reveal]').forEach(el => {
    gsap.fromTo(el, { y: 46, opacity: 0 }, {
      y: 0, opacity: 1, duration: .95, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 86%', once: true },
      clearProps: 'transform',
    });
  });
  $$('.stagger').forEach(g => {
    gsap.fromTo(g.children, { y: 44, opacity: 0 }, {
      y: 0, opacity: 1, duration: .85, stagger: .09, ease: 'power3.out',
      scrollTrigger: { trigger: g, start: 'top 85%', once: true },
      clearProps: 'transform',
    });
  });

  // parallax on orbs
  if (!REDUCED) $$('[data-parallax]').forEach(el => {
    gsap.to(el, {
      y: +el.dataset.parallax, ease: 'none',
      scrollTrigger: { trigger: el.closest('section') || el, start: 'top bottom', end: 'bottom top', scrub: 1.2 },
    });
  });

  // active nav link
  $$('#navLinks .nav-link').forEach(link => {
    const sec = $(link.getAttribute('href'));
    if (!sec) return;
    ScrollTrigger.create({
      trigger: sec, start: 'top center', end: 'bottom center',
      onToggle: s => { if (s.isActive) { $$('#navLinks .nav-link').forEach(l => l.classList.remove('active')); link.classList.add('active'); } },
    });
  });

  // auth decoration mouse pan
  if (!REDUCED && matchMedia('(hover: hover)').matches) {
    const pans = $$('.auth-deco').map(el => ({
      x: gsap.quickTo(el, 'x', { duration: .9, ease: 'power3.out' }),
      y: gsap.quickTo(el, 'y', { duration: .9, ease: 'power3.out' }),
      k: +el.dataset.pan || 20,
    }));
    $('#auth').addEventListener('pointermove', e => {
      const nx = e.clientX / innerWidth - .5, ny = e.clientY / innerHeight - .5;
      pans.forEach(p => { p.x(nx * p.k); p.y(ny * p.k); });
    });
  }
} else {
  // graceful fallback if GSAP CDN is unavailable
  $('#loader').style.display = 'none';
  document.body.classList.remove('locked');
}

/* ============================================================
   16 · THREE.JS — HERO SCENE (draggable laptop / phone / headphones)
   ============================================================ */
(function initHero3D() {
  if (!window.THREE) return;
  const canvas = $('#hero3d'), wrapEl = $('#heroStage');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.outputEncoding = THREE.sRGBEncoding;

  const scene = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(36, 1, .1, 60);
  cam.position.set(0, 1.35, 11);
  cam.lookAt(0, .7, 0);

  scene.add(new THREE.AmbientLight(0xdfeeff, .8));
  const key = new THREE.DirectionalLight(0xffffff, 1.05); key.position.set(5, 7, 6); scene.add(key);
  const rim = new THREE.DirectionalLight(0x9fd8ff, .5);  rim.position.set(-6, 3, -5); scene.add(rim);
  const warm = new THREE.PointLight(0xffd9a8, .55, 30);  warm.position.set(6, -3, 4); scene.add(warm);

  const group = new THREE.Group(); scene.add(group);

  // ---- canvas wallpaper textures ----
  function screenTex(kind) {
    const c = document.createElement('canvas'); c.width = 512; c.height = 320;
    const x = c.getContext('2d');
    const circ = (cx, cy, r, f) => { x.fillStyle = f; x.beginPath(); x.arc(cx, cy, r, 0, 7); x.fill(); };
    if (kind === 'phone') {
      const g = x.createLinearGradient(0, 0, 0, 320);
      g.addColorStop(0, '#ffd98a'); g.addColorStop(.5, '#ff6b9d'); g.addColorStop(1, '#7a5cff');
      x.fillStyle = g; x.fillRect(0, 0, 512, 320);
      circ(256, 140, 62, 'rgba(255,255,255,.85)');
      x.strokeStyle = 'rgba(255,255,255,.45)'; x.lineWidth = 4;
      x.beginPath(); x.arc(256, 140, 96, 0, 7); x.stroke();
      circ(110, 260, 60, 'rgba(255,255,255,.14)');
    } else {
      const g = x.createLinearGradient(0, 0, 512, 320);
      g.addColorStop(0, '#7ce8ff'); g.addColorStop(.55, '#3f8cff'); g.addColorStop(1, '#2455c9');
      x.fillStyle = g; x.fillRect(0, 0, 512, 320);
      circ(140, 110, 70, 'rgba(255,255,255,.25)');
      circ(360, 230, 110, 'rgba(255,255,255,.12)');
      x.fillStyle = 'rgba(255,255,255,.28)'; x.fillRect(0, 292, 512, 28);
    }
    const t = new THREE.CanvasTexture(c); t.encoding = THREE.sRGBEncoding; return t;
  }
  function dotTexture() {
    const c = document.createElement('canvas'); c.width = c.height = 64;
    const x = c.getContext('2d');
    const g = x.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(.4, 'rgba(255,255,255,.55)'); g.addColorStop(1, 'rgba(255,255,255,0)');
    x.fillStyle = g; x.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(c);
  }
  function shadowTex() {
    const c = document.createElement('canvas'); c.width = 256; c.height = 128;
    const x = c.getContext('2d');
    const g = x.createRadialGradient(128, 64, 6, 128, 64, 120);
    g.addColorStop(0, 'rgba(8,40,72,.5)'); g.addColorStop(1, 'rgba(8,40,72,0)');
    x.fillStyle = g; x.fillRect(0, 0, 256, 128);
    return new THREE.CanvasTexture(c);
  }

  const alu  = new THREE.MeshStandardMaterial({ color: 0x2a3646, metalness: .85, roughness: .32 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x141c28, metalness: .6, roughness: .5 });

  // ---- laptop ----
  const laptop = new THREE.Group();
  laptop.add(new THREE.Mesh(new THREE.BoxGeometry(3.4, .14, 2.2), alu));
  const kb = new THREE.Mesh(new THREE.PlaneGeometry(2.9, 1.3), new THREE.MeshStandardMaterial({ color: 0x1b2431, roughness: .6 }));
  kb.rotation.x = -Math.PI / 2; kb.position.y = .074; laptop.add(kb);
  const pad = new THREE.Mesh(new THREE.PlaneGeometry(1, .48), new THREE.MeshStandardMaterial({ color: 0x2a3442, roughness: .4, metalness: .3 }));
  pad.rotation.x = -Math.PI / 2; pad.position.set(0, .076, .62); laptop.add(pad);
  const lid = new THREE.Group(); lid.position.set(0, .07, -1.1); lid.rotation.x = -.25;
  const lidSlab = new THREE.Mesh(new THREE.BoxGeometry(3.4, 2.2, .1), alu);
  lidSlab.position.y = 1.1; lid.add(lidSlab);
  const scr = new THREE.Mesh(new THREE.PlaneGeometry(3.08, 1.88), new THREE.MeshBasicMaterial({ map: screenTex('laptop') }));
  scr.position.set(0, 1.1, .056); lid.add(scr);
  const camDot = new THREE.Mesh(new THREE.CircleGeometry(.03, 12), new THREE.MeshBasicMaterial({ color: 0x0a0f16 }));
  camDot.position.set(0, 2.06, .056); lid.add(camDot);
  laptop.add(lid);

  // ---- phone (extruded rounded rect) ----
  function roundedRect(w, h, r) {
    const s = new THREE.Shape(), x = -w / 2, y = -h / 2;
    s.moveTo(x + r, y); s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r);
    s.lineTo(x + w, y + h - r); s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    s.lineTo(x + r, y + h); s.quadraticCurveTo(x, y + h, x, y + h - r);
    s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y);
    return s;
  }
  const phone = new THREE.Group();
  const pGeo = new THREE.ExtrudeGeometry(roundedRect(1.7, 3.4, .3), { depth: .16, bevelEnabled: true, bevelThickness: .03, bevelSize: .03, bevelSegments: 3, curveSegments: 12 });
  pGeo.center();
  phone.add(new THREE.Mesh(pGeo, new THREE.MeshPhysicalMaterial({ color: 0x18222f, metalness: .7, roughness: .35, clearcoat: .6 })));
  const pScr = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 3.16), new THREE.MeshBasicMaterial({ map: screenTex('phone') }));
  pScr.position.z = .135; phone.add(pScr);
  const island = new THREE.Mesh(new THREE.BoxGeometry(.4, .1, .015), dark);
  island.position.set(0, 1.32, .14); phone.add(island);

  // ---- headphones ----
  const hp = new THREE.Group();
  hp.add(new THREE.Mesh(new THREE.TorusGeometry(1.15, .14, 18, 64, Math.PI), new THREE.MeshStandardMaterial({ color: 0x1c2634, roughness: .5, metalness: .45 })));
  [-1, 1].forEach(side => {
    const cup = new THREE.Mesh(new THREE.CylinderGeometry(.55, .55, .34, 32), new THREE.MeshStandardMaterial({ color: 0x222e3e, roughness: .45, metalness: .5 }));
    cup.rotation.z = Math.PI / 2; cup.position.x = side * 1.15; hp.add(cup);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(.5, .045, 12, 40), alu);
    ring.rotation.y = Math.PI / 2; ring.position.x = side * 1.33; hp.add(ring);
    const cushion = new THREE.Mesh(new THREE.TorusGeometry(.36, .12, 12, 40), new THREE.MeshStandardMaterial({ color: 0x0d141d, roughness: .9 }));
    cushion.rotation.y = Math.PI / 2; cushion.position.x = side * .98; hp.add(cushion);
  });
  hp.rotation.z = .14;

  // ---- placement + float metadata ----
  const setU = (o, pos, rot, amp, ph, sp) => {
    o.position.set(...pos);
    o.rotation.set(...rot);
    o.userData = { y0: pos[1], amp, ph, sp, ry: rot[1], rz: rot[2] };
    group.add(o);
  };
  setU(laptop, [-1.7, .1, .2], [0, .55, 0], .14, 0, .9);
  setU(phone, [1.85, -.35, .8], [-.06, -.5, .06], .18, 1.8, 1.1);
  setU(hp, [.35, 2.1, -.7], [0, .2, .14], .2, 3.1, .8);

  // soft ground shadow
  const gShadow = new THREE.Mesh(new THREE.PlaneGeometry(8, 4.2), new THREE.MeshBasicMaterial({ map: shadowTex(), transparent: true, depthWrite: false }));
  gShadow.rotation.x = -Math.PI / 2; gShadow.position.y = -1.6; group.add(gShadow);

  // ---- particles (soft round sprites) ----
  const N = 170, pos = new Float32Array(N * 3), spd = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    pos[i * 3] = (Math.random() - .5) * 15;
    pos[i * 3 + 1] = (Math.random() - .5) * 9;
    pos[i * 3 + 2] = (Math.random() - .5) * 6 - 1;
    spd[i] = .15 + Math.random() * .35;
  }
  const pGeo2 = new THREE.BufferGeometry();
  pGeo2.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const points = new THREE.Points(pGeo2, new THREE.PointsMaterial({
    size: .16, map: dotTexture(), transparent: true, opacity: .8,
    depthWrite: false, blending: THREE.AdditiveBlending, color: 0xeaf7ff,
  }));
  scene.add(points);

  // ---- interaction: drag to rotate + mouse parallax ----
  let tRX = .04, tRY = -.1, dragging = false, lx = 0, ly = 0, mx = 0, my = 0;
  wrapEl.addEventListener('pointerdown', e => { dragging = true; lx = e.clientX; ly = e.clientY; });
  window.addEventListener('pointermove', e => {
    mx = e.clientX / innerWidth - .5; my = e.clientY / innerHeight - .5;
    if (!dragging) return;
    tRY += (e.clientX - lx) * .006;
    tRX = Math.max(-.5, Math.min(.6, tRX + (e.clientY - ly) * .004));
    lx = e.clientX; ly = e.clientY;
  });
  window.addEventListener('pointerup', () => dragging = false);

  // scroll parallax on the whole group
  const scrollY = { v: 0 };
  if (HAS_GSAP && window.ScrollTrigger && !REDUCED) {
    gsap.to(scrollY, { v: -1.25, ease: 'none', scrollTrigger: { trigger: '#home', start: 'top top', end: 'bottom top', scrub: .8 } });
  }

  // ---- resize / visibility ----
  function resize() {
    const w = wrapEl.clientWidth, h = wrapEl.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    cam.aspect = w / h;
    cam.position.z = cam.aspect < .8 ? 15 : cam.aspect < 1.15 ? 12.5 : 11;
    cam.lookAt(0, .7, 0);
    cam.updateProjectionMatrix();
  }
  new ResizeObserver(resize).observe(wrapEl);
  window.addEventListener('resize', resize);
  resize();

  let active = true;
  new IntersectionObserver(en => active = en[0].isIntersecting, { threshold: .05 }).observe(wrapEl);

  // ---- hero 3d presets & explode mode ----
  let heroPreset = 'studio';
  let heroExploded = false;

  $$('[data-hero-preset]').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('[data-hero-preset]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      heroPreset = btn.dataset.heroPreset;
      if (heroPreset === 'cyber') {
        key.color.setHex(0x00f0ff); key.intensity = 1.3;
        rim.color.setHex(0xff007f); rim.intensity = 1.1;
        warm.color.setHex(0x7000ff); warm.intensity = 1.2;
      } else if (heroPreset === 'gold') {
        key.color.setHex(0xffb703); key.intensity = 1.2;
        rim.color.setHex(0xff7a59); rim.intensity = 0.9;
        warm.color.setHex(0xffd166); warm.intensity = 1.0;
      } else {
        key.color.setHex(0xffffff); key.intensity = 1.05;
        rim.color.setHex(0x9fd8ff); rim.intensity = 0.5;
        warm.color.setHex(0xffd9a8); warm.intensity = 0.55;
      }
    });
  });

  const heroExplodeBtn = $('#heroExplodeBtn');
  if (heroExplodeBtn) {
    heroExplodeBtn.addEventListener('click', () => {
      heroExploded = !heroExploded;
      heroExplodeBtn.classList.toggle('active', heroExploded);
      gsap.to(lid.position, { y: heroExploded ? 0.6 : 0.07, z: heroExploded ? -1.6 : -1.1, duration: 0.8, ease: 'power2.out' });
      gsap.to(pScr.position, { z: heroExploded ? 0.45 : 0.135, duration: 0.8, ease: 'power2.out' });
      gsap.to(hp.position, { y: heroExploded ? 2.7 : 2.1, duration: 0.8, ease: 'power2.out' });
    });
  }

  // ---- render loop ----
  const clock = new THREE.Clock();
  (function tick() {
    requestAnimationFrame(tick);
    if (!active) return;
    const t = clock.getElapsedTime();
    if (!dragging && !REDUCED) tRY += .0016;
    group.rotation.y += (tRY + mx * .28 - group.rotation.y) * .06;
    group.rotation.x += (tRX + my * .16 - group.rotation.x) * .06;
    group.position.y = Math.sin(t * .6) * .05 + scrollY.v;
    [laptop, phone, hp].forEach(o => {
      const u = o.userData;
      o.position.y = u.y0 + Math.sin(t * u.sp + u.ph) * u.amp;
      o.rotation.y = u.ry + Math.sin(t * .5 + u.ph) * .07;
      o.rotation.z = u.rz + Math.sin(t * .7 + u.ph) * .03;
    });
    const arr = pGeo2.attributes.position.array;
    for (let i = 0; i < N; i++) {
      arr[i * 3 + 1] += spd[i] * .012;
      if (arr[i * 3 + 1] > 4.6) arr[i * 3 + 1] = -4.6;
    }
    pGeo2.attributes.position.needsUpdate = true;
    renderer.render(scene, cam);
  })();
})();

/* ============================================================
   17 · GLOBAL 3D BACKGROUND CANVAS (interactive WebGL ambient depth)
   ============================================================ */
(function initGlobal3D() {
  const canvas = $('#bg3d');
  if (!canvas || !window.THREE) return;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  renderer.setSize(innerWidth, innerHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, 0.1, 100);
  camera.position.z = 24;

  // Floating Wireframe Polyhedrons
  const group = new THREE.Group();
  scene.add(group);

  const matWire = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.12 });
  const matGlow = new THREE.MeshBasicMaterial({ color: 0x87CEEB, wireframe: true, transparent: true, opacity: 0.18 });

  const shapes = [
    new THREE.Mesh(new THREE.IcosahedronGeometry(3.5, 1), matWire),
    new THREE.Mesh(new THREE.OctahedronGeometry(2.8, 0), matGlow),
    new THREE.Mesh(new THREE.TorusGeometry(4.2, 0.4, 12, 30), matWire),
    new THREE.Mesh(new THREE.DodecahedronGeometry(2.2, 0), matGlow),
  ];

  shapes[0].position.set(-12, 8, -4);
  shapes[1].position.set(14, -6, -6);
  shapes[2].position.set(-10, -12, -8);
  shapes[3].position.set(12, 10, -5);

  shapes.forEach(s => group.add(s));

  // Ambient Star particles
  const particleCount = 220;
  const pGeo = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 45;
    positions[i + 1] = (Math.random() - 0.5) * 45;
    positions[i + 2] = (Math.random() - 0.5) * 20 - 5;
  }
  pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const pMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.15, transparent: true, opacity: 0.55 });
  scene.add(new THREE.Points(pGeo, pMat));

  let targetX = 0, targetY = 0;
  window.addEventListener('mousemove', e => {
    targetX = (e.clientX / innerWidth - 0.5) * 2;
    targetY = (e.clientY / innerHeight - 0.5) * 2;
  });

  window.addEventListener('resize', () => {
    renderer.setSize(innerWidth, innerHeight);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
  });

  const clock = new THREE.Clock();
  (function renderBg() {
    requestAnimationFrame(renderBg);
    const t = clock.getElapsedTime();
    group.rotation.x = Math.sin(t * 0.15) * 0.2 + targetY * 0.15;
    group.rotation.y = t * 0.08 + targetX * 0.2;
    shapes.forEach((s, idx) => {
      s.rotation.x += 0.003 * (idx + 1);
      s.rotation.y += 0.004 * (idx + 1);
    });
    renderer.render(scene, camera);
  })();
})();

/* ============================================================
   18 · DYNAMIC CSS 3D CARD TILT & GLARE CALCULATOR
   ============================================================ */
(function initTilt3D() {
  if (REDUCED) return;
  document.addEventListener('mousemove', e => {
    const card = e.target.closest('.tilt');
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rx = ((y - cy) / cy) * -12;
    const ry = ((x - cx) / cx) * 12;
    card.style.transform = `perspective(1000px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateZ(8px)`;
    card.style.setProperty('--gx', `${((x / rect.width) * 100).toFixed(1)}%`);
    card.style.setProperty('--gy', `${((y / rect.height) * 100).toFixed(1)}%`);
    card.style.setProperty('--go', '1');
  });

  document.addEventListener('mouseout', e => {
    const card = e.target.closest('.tilt');
    if (!card) return;
    card.style.transform = '';
    card.style.setProperty('--go', '0');
  });
})();

/* ============================================================
   19 · INTERACTIVE 3D PRODUCT INSPECTOR MODAL ENGINE
   ============================================================ */
const Modal3D = (function() {
  const modal = $('#product3dModal');
  const canvas = $('#modal3dCanvas');
  if (!modal || !canvas || !window.THREE) return null;

  let renderer, scene, camera, controls;
  let ambLight, dirLight1, dirLight2;
  let activeProduct = null;
  let currentGroup = null;
  let casingMat = null;
  let isExploded = false;
  let animParts = [];

  const COLOR_PALETTES = [
    { name: 'Concerto', hex: 0xd7d7d6, css: '#D7D7D6' },
    { name: 'Cloudy Sky', hex: 0xb7b8bb, css: '#B7B8BB' },
    { name: 'Cinereous', hex: 0xa08a81, css: '#A08A81' },
    { name: 'Alaska Gray', hex: 0x595d66, css: '#595D66' },
    { name: 'Blue Anthracite', hex: 0x272b36, css: '#272B36' },
  ];

  const PRODUCT_SPECS = {
    laptops: [
      { label: 'Processor', val: 'M3 Max / Intel i9 14th Gen' },
      { label: 'Display', val: '16" Liquid Retina 120Hz OLED' },
      { label: 'Memory', val: '32GB LPDDR5X RAM' },
      { label: 'Chassis', val: 'CNC Machined Aerospace Aluminum' }
    ],
    phones: [
      { label: 'Chipset', val: 'Bionic A17 Pro / Snapdragon 8 Gen 3' },
      { label: 'Camera', val: '200MP Triple Lens + 5x Optical Zoom' },
      { label: 'Display', val: '6.7" Super Retina XDR 120Hz' },
      { label: 'Frame', val: 'Grade 5 Titanium Armor' }
    ],
    audio: [
      { label: 'Driver', val: '40mm Custom Titanium Drivers' },
      { label: 'Noise Cancellation', val: 'Active Hybrid ANC (-45dB)' },
      { label: 'Battery Life', val: '40 Hours Playtime' },
      { label: 'Audio Codec', val: 'LDAC Lossless High-Res Audio' }
    ],
    wearables: [
      { label: 'Sensors', val: 'ECG, SpO2, Heart Rate & Sleep Tracking' },
      { label: 'Battery', val: '72 Hours Battery Saver Mode' },
      { label: 'Water Resistance', val: '50m Water Resistant (5ATM)' },
      { label: 'Screen', val: 'Always-On Sapphire Crystal AMOLED' }
    ],
    tablets: [
      { label: 'Display', val: '11" Ultra Retina XDR Tandem OLED' },
      { label: 'Processor', val: 'Apple M4 / Snapdragon 8 Elite' },
      { label: 'Stylus Support', val: 'Sub-millisecond Precision Pen' },
      { label: 'Audio', val: 'Quad Studio Spatial Speakers' }
    ],
    speakers: [
      { label: 'Output', val: '60W Peak Dynamic Spatial Sound' },
      { label: 'Bass Radiator', val: 'Dual Opposing Passive Woofers' },
      { label: 'Battery', val: '24 Hours Non-Stop Playback' },
      { label: 'Waterproof', val: 'IP67 Dust & Submersible Proof' }
    ],
    default: [
      { label: 'Warranty', val: '2-Year Official Nazeer Guarantee' },
      { label: 'Build', val: 'Premium Sealed Matte Finish' },
      { label: 'Connectivity', val: 'Bluetooth 5.3 & Ultra-Wideband' },
      { label: 'Power', val: 'Fast Charge 0-80% in 30 mins' }
    ]
  };

  function initRenderer() {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.outputEncoding = THREE.sRGBEncoding;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, 1, 0.1, 50);
    camera.position.set(0, 1.4, 5.8);

    ambLight = new THREE.AmbientLight(0xffffff, 0.9);
    dirLight1 = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight1.position.set(5, 8, 5);
    dirLight2 = new THREE.DirectionalLight(0x87CEEB, 0.6);
    dirLight2.position.set(-5, -2, -4);
    scene.add(ambLight, dirLight1, dirLight2);

    if (window.THREE.OrbitControls) {
      controls = new THREE.OrbitControls(camera, canvas);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.maxDistance = 12;
      controls.minDistance = 2.5;
    }

    const clock = new THREE.Clock();
    (function tick() {
      requestAnimationFrame(tick);
      if (controls) controls.update();
      if (currentGroup && !controls) {
        currentGroup.rotation.y += 0.005;
      }
      renderer.render(scene, camera);
    })();
  }

  function resize() {
    if (!renderer) return;
    const wrap = canvas.parentElement;
    const w = wrap.clientWidth;
    const h = wrap.clientHeight;
    if (w && h) {
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
  }
  window.addEventListener('resize', resize);

  function build3DModel(artType, colorHex) {
    if (currentGroup) scene.remove(currentGroup);
    currentGroup = new THREE.Group();
    animParts = [];
    isExploded = false;
    casingMat = new THREE.MeshStandardMaterial({ color: colorHex, metalness: 0.82, roughness: 0.22 });
    const darkMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.55, metalness: 0.3 });
    const accentMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, metalness: 0.9, roughness: 0.2 });

    if (artType === 'laptop' || artType === 'gaming') {
      // Base
      const base = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.12, 1.9), casingMat);
      currentGroup.add(base);

      const kb = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 1.1), darkMat);
      kb.rotation.x = -Math.PI / 2; kb.position.set(0, 0.065, -0.2);
      currentGroup.add(kb);

      const pad = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 0.45), darkMat);
      pad.rotation.x = -Math.PI / 2; pad.position.set(0, 0.065, 0.55);
      currentGroup.add(pad);

      const lidGroup = new THREE.Group();
      lidGroup.position.set(0, 0.06, -0.95);
      lidGroup.rotation.x = -0.3;

      const lidSlab = new THREE.Mesh(new THREE.BoxGeometry(2.8, 1.8, 0.08), casingMat);
      lidSlab.position.y = 0.9;
      lidGroup.add(lidSlab);

      const scr = new THREE.Mesh(new THREE.PlaneGeometry(2.55, 1.55), new THREE.MeshBasicMaterial({ color: 0x0284c7 }));
      scr.position.set(0, 0.9, 0.045);
      lidGroup.add(scr);

      currentGroup.add(lidGroup);
      animParts.push({ obj: lidGroup, origPos: { y: 0.06, z: -0.95 }, expPos: { y: 0.55, z: -1.5 } });
      animParts.push({ obj: kb, origPos: { y: 0.065 }, expPos: { y: 0.35 } });

    } else if (artType === 'phone' || artType === 'phonePro') {
      const pGeo = new THREE.BoxGeometry(1.4, 2.8, 0.14);
      const phoneMesh = new THREE.Mesh(pGeo, casingMat);
      currentGroup.add(phoneMesh);

      const scr = new THREE.Mesh(new THREE.PlaneGeometry(1.28, 2.64), new THREE.MeshBasicMaterial({ color: 0x020617 }));
      scr.position.z = 0.075;
      currentGroup.add(scr);

      const camBump = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.55, 0.04), darkMat);
      camBump.position.set(-0.32, 0.9, -0.08);
      currentGroup.add(camBump);

      // Camera lenses
      [0, 1, 2].forEach(i => {
        const lens = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.03, 16), accentMat);
        lens.rotation.x = Math.PI / 2;
        lens.position.set(-0.38 + (i % 2) * 0.16, 0.98 - Math.floor(i / 1.5) * 0.18, -0.11);
        currentGroup.add(lens);
      });

      animParts.push({ obj: scr, origPos: { z: 0.075 }, expPos: { z: 0.45 } });
      animParts.push({ obj: camBump, origPos: { z: -0.08 }, expPos: { z: -0.35 } });

    } else if (artType === 'tablet') {
      const tGeo = new THREE.BoxGeometry(2.3, 3.2, 0.09);
      const tabletMesh = new THREE.Mesh(tGeo, casingMat);
      currentGroup.add(tabletMesh);

      const scr = new THREE.Mesh(new THREE.PlaneGeometry(2.14, 3.02), new THREE.MeshBasicMaterial({ color: 0x030712 }));
      scr.position.z = 0.05;
      currentGroup.add(scr);

      // Stylus pencil
      const pen = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 2.2, 16), darkMat);
      pen.position.set(1.25, 0, 0);
      currentGroup.add(pen);

      animParts.push({ obj: scr, origPos: { z: 0.05 }, expPos: { z: 0.4 } });
      animParts.push({ obj: pen, origPos: { x: 1.25 }, expPos: { x: 1.8 } });

    } else if (artType === 'headphones') {
      const band = new THREE.Mesh(new THREE.TorusGeometry(1.1, 0.12, 16, 48, Math.PI), casingMat);
      currentGroup.add(band);

      [-1, 1].forEach(side => {
        const cupGroup = new THREE.Group();
        cupGroup.position.x = side * 1.1;

        const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.48, 0.3, 32), casingMat);
        cup.rotation.z = Math.PI / 2;
        cupGroup.add(cup);

        const pad = new THREE.Mesh(new THREE.TorusGeometry(0.35, 0.12, 12, 32), darkMat);
        pad.rotation.y = Math.PI / 2;
        pad.position.x = side * -0.12;
        cupGroup.add(pad);

        currentGroup.add(cupGroup);
        animParts.push({ obj: cupGroup, origPos: { x: side * 1.1 }, expPos: { x: side * 1.7 } });
      });

    } else if (artType === 'earbuds') {
      // Charging case
      const caseBase = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.75, 0.7, 32), casingMat);
      currentGroup.add(caseBase);

      const caseLid = new THREE.Mesh(new THREE.SphereGeometry(0.8, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.45), casingMat);
      caseLid.position.y = 0.35;
      currentGroup.add(caseLid);

      // Two floating wireless earbuds
      [-1, 1].forEach(side => {
        const bud = new THREE.Group();
        bud.position.set(side * 0.35, 0.6, 0);

        const head = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 16), darkMat);
        bud.add(head);

        const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.45, 16), darkMat);
        stem.position.set(0, -0.22, 0);
        bud.add(stem);

        currentGroup.add(bud);
        animParts.push({ obj: bud, origPos: { x: side * 0.35, y: 0.6 }, expPos: { x: side * 0.95, y: 1.25 } });
      });

      animParts.push({ obj: caseLid, origPos: { y: 0.35 }, expPos: { y: 1.1 } });

    } else if (artType === 'watch') {
      const caseMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 0.95, 0.24, 32), casingMat);
      caseMesh.rotation.x = Math.PI / 2;
      currentGroup.add(caseMesh);

      const dial = new THREE.Mesh(new THREE.CircleGeometry(0.82, 32), new THREE.MeshBasicMaterial({ color: 0x020617 }));
      dial.position.z = 0.13;
      currentGroup.add(dial);

      const strap = new THREE.Mesh(new THREE.BoxGeometry(0.92, 2.7, 0.08), darkMat);
      strap.position.z = -0.06;
      currentGroup.add(strap);

      const crown = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.14, 16), accentMat);
      crown.rotation.z = Math.PI / 2;
      crown.position.set(1.02, 0, 0);
      currentGroup.add(crown);

      animParts.push({ obj: dial, origPos: { z: 0.13 }, expPos: { z: 0.52 } });
      animParts.push({ obj: crown, origPos: { x: 1.02 }, expPos: { x: 1.5 } });

    } else {
      // Sleek cylindrical speaker
      const body = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.85, 2.1, 32), casingMat);
      currentGroup.add(body);

      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.86, 0.05, 16, 32), accentMat);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = 0.95;
      currentGroup.add(ring);

      const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.78, 0.78, 0.1, 32), darkMat);
      cap.position.y = 1.05;
      currentGroup.add(cap);

      animParts.push({ obj: cap, origPos: { y: 1.05 }, expPos: { y: 1.8 } });
      animParts.push({ obj: ring, origPos: { y: 0.95 }, expPos: { y: 1.4 } });
    }

    scene.add(currentGroup);
  }

  function setPreset(preset) {
    if (!ambLight || !dirLight1 || !dirLight2) return;
    if (preset === 'neon') {
      ambLight.color.setHex(0x1a0a2a); ambLight.intensity = 0.8;
      dirLight1.color.setHex(0x00f0ff); dirLight1.intensity = 1.6;
      dirLight2.color.setHex(0xff007f); dirLight2.intensity = 1.4;
    } else if (preset === 'dusk') {
      ambLight.color.setHex(0x25103a); ambLight.intensity = 0.7;
      dirLight1.color.setHex(0xff9e0b); dirLight1.intensity = 1.4;
      dirLight2.color.setHex(0x7c3aed); dirLight2.intensity = 1.1;
    } else {
      ambLight.color.setHex(0xffffff); ambLight.intensity = 0.9;
      dirLight1.color.setHex(0xffffff); dirLight1.intensity = 1.2;
      dirLight2.color.setHex(0x87ceeb); dirLight2.intensity = 0.6;
    }
  }

  function open(productId) {
    activeProduct = byId(productId);
    if (!activeProduct) return;

    if (!renderer) initRenderer();

    // Reset presets and explode state
    $$('[data-m3d-preset]').forEach(b => b.classList.remove('active'));
    const studioPresetBtn = $('[data-m3d-preset="studio"]');
    if (studioPresetBtn) studioPresetBtn.classList.add('active');
    setPreset('studio');

    isExploded = false;
    const explodeBtn = $('#m3dExplodeBtn');
    if (explodeBtn) explodeBtn.classList.remove('active');

    if (camera) camera.position.set(0, 1.4, 5.8);
    if (controls) { controls.target.set(0, 0, 0); controls.update(); }

    // Populate Sidebar
    $('#m3dTitle').textContent = activeProduct.name;
    $('#m3dPrice').textContent = money(activeProduct.price);
    $('#m3dOld').textContent = money(activeProduct.old);

    const categoryKey = activeProduct.cat;
    const specs = PRODUCT_SPECS[categoryKey] || PRODUCT_SPECS.default;
    $('#m3dSpecs').innerHTML = specs.map(s => `<li><strong>${s.label}</strong><span>${s.val}</span></li>`).join('');

    // Color Swatches
    const swatchesContainer = $('#m3dColors');
    swatchesContainer.innerHTML = COLOR_PALETTES.map((c, i) => `
      <span class="swatch ${i === 0 ? 'active' : ''}" data-hex="${c.hex}" style="background:${c.css}" title="${c.name}"></span>
    `).join('');

    $$('.swatch', swatchesContainer).forEach(sw => {
      sw.addEventListener('click', () => {
        $$('.swatch', swatchesContainer).forEach(s => s.classList.remove('active'));
        sw.classList.add('active');
        const hex = parseInt(sw.dataset.hex, 10);
        if (casingMat) casingMat.color.setHex(hex);
      });
    });

    build3DModel(activeProduct.art, COLOR_PALETTES[0].hex);

    modal.classList.add('active');
    document.body.classList.add('locked');
    setTimeout(resize, 60);
  }

  function close() {
    modal.classList.remove('active');
    document.body.classList.remove('locked');
  }

  // Event Listeners for Modal Controls
  $('#modal3dClose').addEventListener('click', close);
  $('#modal3dBackdrop').addEventListener('click', close);

  // Lighting Preset buttons
  $$('[data-m3d-preset]').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('[data-m3d-preset]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      setPreset(btn.dataset.m3dPreset);
    });
  });

  $('#m3dAddToCart').addEventListener('click', () => {
    if (activeProduct) {
      state.cart.set(activeProduct.id, (state.cart.get(activeProduct.id) || 0) + 1);
      saveCart();
      if (typeof updateBadges === 'function') updateBadges();
      if (typeof showToast === 'function') showToast(`Added ${activeProduct.name} to cart!`);
      close();
    }
  });

  const explodeBtn = $('#m3dExplodeBtn');
  if (explodeBtn) {
    explodeBtn.addEventListener('click', () => {
      isExploded = !isExploded;
      explodeBtn.classList.toggle('active', isExploded);
      animParts.forEach(p => {
        const target = isExploded ? p.expPos : p.origPos;
        gsap.to(p.obj.position, { ...target, duration: 0.7, ease: 'power2.out' });
      });
    });
  }

  return { open, close };
})();

function open3DInspector(id) {
  if (Modal3D) Modal3D.open(id);
}

document.addEventListener('click', e => {
  const btn = e.target.closest('[data-inspect-3d]');
  if (btn) {
    const id = parseInt(btn.dataset.inspect3d, 10);
    open3DInspector(id);
  }
});

/* ============================================================
   20 · MULTI-PAGE INITIALIZERS & CONTROLLERS
   ============================================================ */

// 1. Common Nav across all 6 Screen Pages
function initCommonNav() {
  loadCart();
  loadWishlist();
  loadUser();
  renderBadges();

  const path = window.location.pathname.toLowerCase();
  const page = path.includes('auth') || path.includes('account') ? 'auth' :
               path.includes('dashboard') ? 'dashboard' :
               path.includes('categories') ? 'categories' :
               path.includes('store') || path.includes('shop') ? 'store' :
               path.includes('offers') ? 'offers' :
               path.includes('orders') ? 'orders' :
               path.includes('studio') ? 'studio' :
               path.includes('checkout') ? 'checkout' : 'home';

  const navLinks = $$('#navLinks .nav-link');

  navLinks.forEach(link => {
    const href = (link.getAttribute('href') || '').toLowerCase();
    if (page === 'home' && (href === 'index.html' || href === './' || href === '#home' || href === '')) {
      link.classList.add('active');
    } else if (page === 'auth' && (href.includes('auth') || href.includes('account'))) {
      link.classList.add('active');
    } else if (page === 'dashboard' && href.includes('dashboard')) {
      link.classList.add('active');
    } else if (page === 'categories' && href.includes('categories')) {
      link.classList.add('active');
    } else if (page === 'store' && (href.includes('store') || href.includes('shop'))) {
      link.classList.add('active');
    } else if (page === 'offers' && href.includes('offers')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Support URL category filter pre-selection on store page
  if (page === 'store') {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('category');
    if (cat) {
      setTimeout(() => setFilter(cat.toLowerCase()), 100);
    }
  }

  if (state.user) {
    const ini = $('#userInitial');
    if (ini) {
      ini.textContent = (state.user.name || 'U').charAt(0).toUpperCase();
      ini.hidden = false;
    }
  }
}

// 2. Catalog Page (shop.html)
function initCatalogPage() {
  const grid = $('#catalogGrid');
  if (!grid) return;

  function renderCatalog() {
    let list = PRODUCTS;
    if (state.filter && state.filter !== 'all') {
      list = list.filter(p => p.cat === state.filter || (p.tags || []).includes(state.filter));
    }
    if (state.brand && state.brand !== 'all') {
      list = list.filter(p => p.brand === state.brand);
    }
    if (state.query) {
      const q = state.query.toLowerCase();
      list = list.filter(p => (p.name + ' ' + (p.brand || '') + ' ' + (CAT_LABEL[p.cat] || '')).toLowerCase().includes(q));
    }

    const sortVal = $('#catalogSort')?.value || 'featured';
    if (sortVal === 'price-low') list = [...list].sort((a, b) => a.price - b.price);
    else if (sortVal === 'price-high') list = [...list].sort((a, b) => b.price - a.price);
    else if (sortVal === 'rating') list = [...list].sort((a, b) => b.rating - a.rating);

    const countEl = $('#catalogCount');
    if (countEl) countEl.textContent = `${list.length} item${list.length === 1 ? '' : 's'}`;

    if (!list.length) {
      grid.innerHTML = `<div class="empty glass" style="grid-column:1/-1; text-align:center; padding:48px;">
        <p style="font-size:1.2rem; color:var(--cloudy-sky); margin-bottom:16px;">No electronic devices found matching your criteria.</p>
        <button class="btn btn-primary btn-sm" id="resetCatalogFilters">Clear Filters</button>
      </div>`;
      $('#resetCatalogFilters')?.addEventListener('click', () => {
        state.filter = 'all';
        state.brand = 'all';
        state.query = '';
        $$('.brand-pill').forEach(b => b.classList.toggle('active', b.dataset.brand === 'all'));
        $$('.f-chip').forEach(c => c.classList.toggle('active', c.dataset.filter === 'all'));
        if ($('#catalogSearchInput')) $('#catalogSearchInput').value = '';
        renderCatalog();
      });
      return;
    }

    grid.innerHTML = list.map(cardHTML).join('');
  }

  $$('.brand-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.brand-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.brand = btn.dataset.brand;
      renderCatalog();
    });
  });

  $$('.f-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.f-chip').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.filter = btn.dataset.filter;
      renderCatalog();
    });
  });

  $('#catalogSearchInput')?.addEventListener('input', e => {
    state.query = e.target.value.trim();
    renderCatalog();
  });

  $('#catalogSort')?.addEventListener('change', renderCatalog);

  renderCatalog();
}

// 3. Checkout Page (checkout.html)
function initCheckoutPage() {
  const itemsWrap = $('#checkoutItems');
  if (!itemsWrap) return;

  let selectedShippingFee = 0;
  let selectedShippingMethod = 'Standard Sky Delivery (Free)';
  let selectedPayment = 'Credit Card';

  function updateTotals() {
    let subtotal = 0;
    state.cart.forEach((qty, id) => {
      const p = byId(id);
      if (p) subtotal += p.price * qty;
    });

    const tax = Math.round(subtotal * 0.06);
    const total = subtotal + selectedShippingFee + (subtotal > 0 ? tax : 0);

    const subEl = $('#checkoutSubtotal');
    const shipEl = $('#checkoutShipping');
    const taxEl = $('#checkoutTax');
    const totEl = $('#checkoutTotal');

    if (subEl) subEl.textContent = money(subtotal);
    if (shipEl) shipEl.textContent = selectedShippingFee === 0 ? 'FREE' : money(selectedShippingFee);
    if (taxEl) taxEl.textContent = money(tax);
    if (totEl) totEl.textContent = money(total);

    return { subtotal, tax, total };
  }

  function renderCheckoutSummary() {
    if (!state.cart.size) {
      itemsWrap.innerHTML = `<p style="color:var(--cloudy-sky); padding:20px 0;">Your cart is empty. <a href="shop.html" class="link">Explore store</a></p>`;
      updateTotals();
      return;
    }

    itemsWrap.innerHTML = [...state.cart.entries()].map(([id, qty]) => {
      const p = byId(id);
      if (!p) return '';
      return `<div class="summary-item">
        <div class="summary-item-info">
          <strong>${p.name}</strong>
          <span>Qty: ${qty} · Finish: Concerto</span>
        </div>
        <strong>${money(p.price * qty)}</strong>
      </div>`;
    }).join('');

    updateTotals();
  }

  if (state.user) {
    if ($('#coName')) $('#coName').value = state.user.name || '';
    if ($('#coEmail')) $('#coEmail').value = state.user.email || '';
    if ($('#coPhone')) $('#coPhone').value = state.user.phone || '';
    if (state.user.address && $('#coStreet')) {
      const parts = state.user.address.split(',');
      if ($('#coStreet')) $('#coStreet').value = parts[0]?.trim() || '';
      if ($('#coCity')) $('#coCity').value = parts[1]?.trim() || 'Springfield';
    }
  }

  $$('.tier-option').forEach(tier => {
    tier.addEventListener('click', () => {
      $$('.tier-option').forEach(t => t.classList.remove('selected'));
      tier.classList.add('selected');
      selectedShippingFee = parseInt(tier.dataset.fee, 10) || 0;
      selectedShippingMethod = tier.querySelector('strong').textContent;
      updateTotals();
    });
  });

  $$('.pay-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      $$('.pay-pill').forEach(p => p.classList.remove('selected'));
      pill.classList.add('selected');
      selectedPayment = pill.dataset.method;
    });
  });

  $('#checkoutForm')?.addEventListener('submit', e => {
    e.preventDefault();
    if (!state.cart.size) {
      toast('Your cart is empty! Add products before placing an order.', 'info', 'warn');
      return;
    }

    const name = $('#coName')?.value.trim() || 'Customer';
    const phone = $('#coPhone')?.value.trim() || '+1 (555) 000-0000';
    const street = $('#coStreet')?.value.trim() || '100 Main St';
    const city = $('#coCity')?.value.trim() || 'Metro';
    const st = $('#coState')?.value.trim() || 'CA';
    const pin = $('#coPin')?.value.trim() || '90210';

    const { subtotal, total } = updateTotals();

    const newOrder = {
      id: 'NZ-' + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      items: [...state.cart.entries()].map(([id, qty]) => {
        const p = byId(id);
        return { id, name: p ? p.name : 'Device', qty, price: p ? p.price : 0, color: 'Concerto' };
      }),
      subtotal,
      shipping: selectedShippingFee,
      total,
      carrier: 'Sky Courier Air Priority',
      trackingNum: 'NZ-EXP-' + Math.floor(100000 + Math.random() * 900000),
      address: { name, phone, street, city, state: st, pin },
      shippingMethod: selectedShippingMethod,
      paymentMethod: selectedPayment,
      currentStage: 1, // 0: Placed, 1: Processed, 2: Shipped, 3: Out for Delivery, 4: Delivered
      statusText: 'Processing & Quality Checked',
      eta: selectedShippingFee > 0 ? 'Tomorrow by 2:00 PM' : 'In 2 business days'
    };

    createOrder(newOrder);

    if (state.user) {
      state.user.phone = phone;
      state.user.address = `${street}, ${city}, ${st} ${pin}`;
      saveUser();
    }

    state.cart.clear();
    saveCart();
    renderBadges();

    triggerCelebrationModal(newOrder);
  });

  renderCheckoutSummary();
}

// 4. Orders Page (orders.html)
function initOrdersPage() {
  const container = $('#ordersList');
  if (!container) return;

  const orders = getOrders();
  const params = new URLSearchParams(window.location.search);
  const targetId = params.get('order');

  if (!orders.length) {
    container.innerHTML = `<div class="order-card glass" style="text-align:center; padding:50px;">
      <h3>No Active Orders Found</h3>
      <p style="color:var(--cloudy-sky); margin:12px 0 24px;">You have not placed any orders yet.</p>
      <a href="shop.html" class="btn btn-primary">Start Shopping</a>
    </div>`;
    return;
  }

  const STAGES = [
    { title: 'Order Placed', time: 'Day 1 · 09:00 AM' },
    { title: 'Quality Check', time: 'Day 1 · 01:30 PM' },
    { title: 'Shipped', time: 'Day 2 · 08:00 AM' },
    { title: 'Out for Delivery', time: 'Today · 02:15 PM' },
    { title: 'Delivered', time: 'Signed & Complete' }
  ];

  container.innerHTML = orders.map(ord => {
    const curStage = ord.currentStage !== undefined ? ord.currentStage : 2;
    const progressPct = Math.min(100, Math.round((curStage / 4) * 100));

    const isDelivered = curStage >= 4;
    const badgeClass = isDelivered ? 'status-delivered' : 'status-transit';

    const stagesHTML = STAGES.map((stg, i) => {
      const isDone = i < curStage;
      const isActive = i === curStage;
      const cls = isDone ? 'completed' : isActive ? 'active' : '';
      return `<div class="timeline-stage ${cls}">
        <div class="stage-dot">
          ${isDone ? '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6 9 17l-5-5"/></svg>' : (i + 1)}
        </div>
        <span class="stage-title">${stg.title}</span>
        <span class="stage-time">${isDone || isActive ? stg.time : 'Pending'}</span>
      </div>`;
    }).join('');

    const itemsHTML = (ord.items || []).map(it => `
      <div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid rgba(215,215,214,0.08); font-size:0.9rem;">
        <span><strong>${it.qty}x</strong> ${esc(it.name)} <em style="color:var(--cloudy-sky); font-style:normal;">(${esc(it.color || 'Concerto')})</em></span>
        <strong>${money(it.price * it.qty)}</strong>
      </div>
    `).join('');

    const addr = ord.address || {};

    const isTarget = targetId && (ord.id === targetId || String(ord.id).includes(targetId));
    return `<article class="order-card glass" id="order-${ord.id}" style="${isTarget ? 'border:2px solid var(--gold-champagne); box-shadow:0 0 35px rgba(203,178,121,0.45);' : ''}">
      <div class="order-header">
        <div class="order-meta">
          <strong>Order #${ord.id}</strong>
          <span>Placed on ${ord.date} · Paid via ${esc(ord.paymentMethod || 'Apple Pay')}</span>
        </div>
        <span class="order-status-badge ${badgeClass}">
          <span style="width:8px; height:8px; border-radius:50%; background:currentColor;"></span>
          ${esc(ord.statusText || 'In Transit')}
        </span>
      </div>

      <!-- 5-Stage Delivery Timeline -->
      <div class="delivery-timeline">
        <div class="timeline-track">
          <div class="timeline-fill" style="width: ${progressPct}%;"></div>
        </div>
        <div class="timeline-stages">
          ${stagesHTML}
        </div>
      </div>

      <!-- Order Details & Delivery Card -->
      <div class="order-delivery-info">
        <div>
          <strong>Package Contents (${ord.items ? ord.items.length : 0} items)</strong>
          <div style="margin-bottom:14px;">${itemsHTML}</div>
          <div style="display:flex; justify-content:space-between; font-weight:800; color:var(--concerto); font-size:1.05rem;">
            <span>Total Paid:</span>
            <span>${money(ord.total || 0)}</span>
          </div>
        </div>

        <div>
          <strong>Shipping & Delivery Details</strong>
          <p><strong>Carrier:</strong> ${esc(ord.carrier || 'Sky Courier Air Priority')}</p>
          <p><strong>Tracking No:</strong> <code style="background:rgba(0,0,0,0.3); padding:2px 6px; border-radius:4px;">${esc(ord.trackingNum || ord.id)}</code></p>
          <p><strong>Estimated Arrival:</strong> <span style="color:var(--cinereous); font-weight:700;">${esc(ord.eta || 'Pending')}</span></p>
          <p><strong>Deliver To:</strong> ${esc(addr.name || 'Customer')}, ${esc(addr.street || '')}, ${esc(addr.city || '')} ${esc(addr.pin || '')}</p>
          <div style="margin-top:16px; display:flex; gap:10px; flex-wrap:wrap;">
            <button class="btn btn-ghost btn-sm" onclick="toast('Invoice downloaded for Order #${ord.id}', 'check')">Download Invoice</button>
            <button class="btn btn-ghost btn-sm" onclick="toast('Courier contacted. Driver is en route.', 'phone')">Contact Courier</button>
          </div>
        </div>
      </div>
    </article>`;
  }).join('');
}

// 5. Account & Profile Page (account.html)
function initAccountPage() {
  const authBox = $('#authBox');
  const profileCard = $('#profileCard');
  if (!authBox || !profileCard) return;

  function updateView() {
    loadUser();
    if (state.user) {
      authBox.hidden = true;
      profileCard.hidden = false;

      const ini = (state.user.name || 'A').charAt(0).toUpperCase();
      if ($('#accInitial')) $('#accInitial').textContent = ini;
      if ($('#accName')) $('#accName').textContent = state.user.name;
      if ($('#accEmail')) $('#accEmail').textContent = state.user.email;
      if ($('#accPhone')) $('#accPhone').textContent = state.user.phone || 'Not provided';
      if ($('#accAddress')) $('#accAddress').textContent = state.user.address || '742 Evergreen Terrace, Jubilee Hills Road No. 36, Hyderabad, Telangana - 500033';

      const orders = getOrders();
      if ($('#accOrderCount')) $('#accOrderCount').textContent = orders.length;
      if ($('#accWishCount')) $('#accWishCount').textContent = state.wishlist.size;
    } else {
      authBox.hidden = false;
      profileCard.hidden = true;
    }
  }

  $$('.auth-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      $$('.auth-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.dataset.tab;
      if ($('#signInForm')) $('#signInForm').hidden = (target !== 'signin');
      if ($('#signUpForm')) $('#signUpForm').hidden = (target !== 'signup');
    });
  });

  $('#demoLoginBtn')?.addEventListener('click', () => {
    state.user = {
      name: 'Alex Chen',
      email: 'alex.chen@example.com',
      phone: '+1 (555) 234-5678',
      address: '742 Evergreen Terrace, Jubilee Hills Road No. 36, Hyderabad, Telangana - 500033'
    };
    saveUser();
    renderBadges();
    initCommonNav();
    toast('Logged in as Alex Chen (VIP)', 'user');
    updateView();
  });

  $('#signInForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const em = $('#siEmail')?.value.trim();
    const name = em.split('@')[0].replace(/[._-]+/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    state.user = {
      name,
      email: em,
      phone: '+1 (555) 234-5678',
      address: '742 Evergreen Terrace, Jubilee Hills Road No. 36, Hyderabad, Telangana - 500033'
    };
    saveUser();
    renderBadges();
    initCommonNav();
    toast(`Welcome back, ${name}!`, 'user');
    updateView();
  });

  $('#signUpForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const name = $('#suFullName')?.value.trim() || 'New User';
    const email = $('#suNewEmail')?.value.trim();
    const phone = $('#suNewPhone')?.value.trim() || '+1 (555) 000-0000';
    state.user = { name, email, phone, address: 'Default Delivery Address' };
    saveUser();
    renderBadges();
    initCommonNav();
    toast(`Account created! Welcome, ${name}!`, 'check');
    updateView();
  });

  $('#accSignOutBtn')?.addEventListener('click', () => {
    state.user = null;
    saveUser();
    const ini = $('#userInitial');
    if (ini) ini.hidden = true;
    toast('Signed out successfully', 'user');
    updateView();
  });

  updateView();
}

// 6. 3D Studio Page (studio.html)
function initStudioPage() {
  const canvas = $('#studioCanvas');
  if (!canvas || !window.THREE) return;

  let renderer, scene, camera, controls;
  let ambLight, dirLight1, dirLight2;
  let currentGroup = null;
  let casingMat = null;
  let isExploded = false;
  let animParts = [];
  let currentArt = 'headphones';
  let currentColorHex = 0xa08a81;

  function initScene() {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputEncoding = THREE.sRGBEncoding;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(42, canvas.clientWidth / canvas.clientHeight, 0.1, 50);
    camera.position.set(0, 1.3, 6);

    ambLight = new THREE.AmbientLight(0xffffff, 0.9);
    dirLight1 = new THREE.DirectionalLight(0xd7d7d6, 1.2);
    dirLight1.position.set(5, 8, 5);
    dirLight2 = new THREE.DirectionalLight(0xa08a81, 0.75);
    dirLight2.position.set(-5, -2, -4);
    scene.add(ambLight, dirLight1, dirLight2);

    if (window.THREE.OrbitControls) {
      controls = new THREE.OrbitControls(camera, canvas);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.maxDistance = 10;
      controls.minDistance = 2.5;
    }

    function resize() {
      const w = canvas.parentElement.clientWidth;
      const h = canvas.parentElement.clientHeight;
      if (w && h) {
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      }
    }
    window.addEventListener('resize', resize);
    setTimeout(resize, 60);

    buildModel(currentArt, currentColorHex);

    (function loop() {
      requestAnimationFrame(loop);
      if (controls) controls.update();
      if (currentGroup && !controls) currentGroup.rotation.y += 0.005;
      renderer.render(scene, camera);
    })();
  }

  function buildModel(artType, colorHex) {
    if (currentGroup) scene.remove(currentGroup);
    currentGroup = new THREE.Group();
    animParts = [];
    isExploded = false;
    $('#studioExplodeBtn')?.classList.remove('active');

    casingMat = new THREE.MeshStandardMaterial({ color: colorHex, metalness: 0.82, roughness: 0.22 });
    const darkMat = new THREE.MeshStandardMaterial({ color: 0x272b36, roughness: 0.55, metalness: 0.3 });

    if (artType === 'headphones') {
      const band = new THREE.Mesh(new THREE.TorusGeometry(1.15, 0.13, 16, 48, Math.PI), casingMat);
      currentGroup.add(band);
      [-1, 1].forEach(side => {
        const cupGroup = new THREE.Group();
        cupGroup.position.x = side * 1.15;
        const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.32, 32), casingMat);
        cup.rotation.z = Math.PI / 2;
        cupGroup.add(cup);
        const pad = new THREE.Mesh(new THREE.TorusGeometry(0.36, 0.12, 12, 32), darkMat);
        pad.rotation.y = Math.PI / 2;
        pad.position.x = side * -0.12;
        cupGroup.add(pad);
        currentGroup.add(cupGroup);
        animParts.push({ obj: cupGroup, origPos: { x: side * 1.15 }, expPos: { x: side * 1.8 } });
      });
    } else if (artType === 'phone') {
      const phoneMesh = new THREE.Mesh(new THREE.BoxGeometry(1.4, 2.8, 0.14), casingMat);
      currentGroup.add(phoneMesh);
      const scr = new THREE.Mesh(new THREE.PlaneGeometry(1.28, 2.64), new THREE.MeshBasicMaterial({ color: 0x020617 }));
      scr.position.z = 0.075;
      currentGroup.add(scr);
      animParts.push({ obj: scr, origPos: { z: 0.075 }, expPos: { z: 0.45 } });
    } else if (artType === 'watch') {
      const caseMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 0.95, 0.24, 32), casingMat);
      caseMesh.rotation.x = Math.PI / 2;
      currentGroup.add(caseMesh);
      const dial = new THREE.Mesh(new THREE.CircleGeometry(0.82, 32), new THREE.MeshBasicMaterial({ color: 0x020617 }));
      dial.position.z = 0.13;
      currentGroup.add(dial);
      animParts.push({ obj: dial, origPos: { z: 0.13 }, expPos: { z: 0.55 } });
    } else {
      const body = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.85, 2.1, 32), casingMat);
      currentGroup.add(body);
      const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.78, 0.78, 0.1, 32), darkMat);
      cap.position.y = 1.05;
      currentGroup.add(cap);
      animParts.push({ obj: cap, origPos: { y: 1.05 }, expPos: { y: 1.8 } });
    }

    scene.add(currentGroup);
  }

  $$('.device-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      $$('.device-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentArt = tab.dataset.art;
      buildModel(currentArt, currentColorHex);
      if ($('#studioTitle')) $('#studioTitle').textContent = tab.textContent;
    });
  });

  $$('.palette-swatch-box').forEach(box => {
    box.addEventListener('click', () => {
      $$('.palette-swatch-box').forEach(b => b.classList.remove('active'));
      box.classList.add('active');
      currentColorHex = parseInt(box.dataset.hex, 16);
      if (casingMat) casingMat.color.setHex(currentColorHex);
      if ($('#studioFinishName')) $('#studioFinishName').textContent = box.dataset.name;
    });
  });

  $$('[data-studio-preset]').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('[data-studio-preset]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const p = btn.dataset.studioPreset;
      if (p === 'neon') {
        ambLight.color.setHex(0x1a0a2a); ambLight.intensity = 0.8;
        dirLight1.color.setHex(0x00f0ff); dirLight1.intensity = 1.6;
        dirLight2.color.setHex(0xff007f); dirLight2.intensity = 1.4;
      } else if (p === 'dusk') {
        ambLight.color.setHex(0x25103a); ambLight.intensity = 0.7;
        dirLight1.color.setHex(0xa08a81); dirLight1.intensity = 1.4;
        dirLight2.color.setHex(0x595d66); dirLight2.intensity = 1.1;
      } else {
        ambLight.color.setHex(0xffffff); ambLight.intensity = 0.9;
        dirLight1.color.setHex(0xd7d7d6); dirLight1.intensity = 1.2;
        dirLight2.color.setHex(0xa08a81); dirLight2.intensity = 0.75;
      }
    });
  });

  $('#studioExplodeBtn')?.addEventListener('click', () => {
    isExploded = !isExploded;
    $('#studioExplodeBtn').classList.toggle('active', isExploded);
    animParts.forEach(p => {
      const target = isExploded ? p.expPos : p.origPos;
      gsap.to(p.obj.position, { ...target, duration: 0.7, ease: 'power2.out' });
    });
  });

  $('#studioAddToCartBtn')?.addEventListener('click', () => {
    const prod = PRODUCTS.find(p => p.art === currentArt) || PRODUCTS[0];
    state.cart.set(prod.id, (state.cart.get(prod.id) || 0) + 1);
    saveCart();
    renderBadges();
    toast(`Added ${prod.name} with custom finish to cart!`, 'cart');
  });

  initScene();
}

// Master DOM ContentLoaded orchestrator
document.addEventListener('DOMContentLoaded', () => {
  initCommonNav();
  initCatalogPage();
  initCheckoutPage();
  initOrdersPage();
  initAccountPage();
  initStudioPage();
});


/* ============================================================
   HERO CAROUSEL, RANGE SELECTOR & BACKGROUND SYNC ENGINE
   ============================================================ */
function initHeroShowcase() {
  const stage = $('#heroShowcaseStage');
  if (!stage) return;

  const slides = $$('.hero-prod-slide', stage);
  const dots = $$('.hero-slider-dot', stage);
  const bgSlides = $$('.hero-bg-slide');
  const prevBtn = $('#heroPrevBtn');
  const nextBtn = $('#heroNextBtn');
  const curNumEl = $('#heroCurNum');
  const totalNumEl = $('#heroTotalNum');
  const statusTxt = $('#heroStatusTxt');

  if (!slides.length) return;

  const STATUSES = [
    '#1 BEST SELLER (18.4K+ SOLD)',
    'TOP RATED FLAGSHIP (5.0 ★)',
    'MASTER ACOUSTICS (6.1K+ SOLD)',
    'BEST ANDROID FLAGSHIP (5G)',
    'EXPEDITION GRADE (TITANIUM)',
    'HERITAGE STEREO ACOUSTICS'
  ];

  let currentIndex = 0;
  let timer = null;
  const INTERVAL = 3000; // Exactly 3 seconds auto-advance as requested

  if (totalNumEl) totalNumEl.textContent = String(slides.length).padStart(2, '0');

  function showSlide(index) {
    slides[currentIndex].classList.remove('active');
    if (dots[currentIndex]) {
      dots[currentIndex].classList.remove('active');
      const p = dots[currentIndex].querySelector('.dot-prog');
      if (p) p.style.width = '0%';
    }
    if (bgSlides[currentIndex]) {
      bgSlides[currentIndex].classList.remove('active');
    }

    currentIndex = (index + slides.length) % slides.length;

    slides[currentIndex].classList.add('active');
    if (dots[currentIndex]) {
      dots[currentIndex].classList.add('active');
      const activeProg = dots[currentIndex].querySelector('.dot-prog');
      if (activeProg) {
        activeProg.style.transition = 'none';
        activeProg.style.width = '0%';
        setTimeout(() => {
          activeProg.style.transition = 'width 3s linear';
          activeProg.style.width = '100%';
        }, 20);
      }
    }
    if (bgSlides[currentIndex]) {
      bgSlides[currentIndex].classList.add('active');
    }

    if (curNumEl) curNumEl.textContent = String(currentIndex + 1).padStart(2, '0');
    if (statusTxt) statusTxt.textContent = STATUSES[currentIndex] || 'FLAGSHIP HARDWARE';
  }

  function nextSlide() {
    showSlide(currentIndex + 1);
  }
  function prevSlide() {
    showSlide(currentIndex - 1);
  }

  function startTimer() {
    stopTimer();
    timer = setInterval(nextSlide, INTERVAL);
    if (dots[currentIndex]) {
      const activeProg = dots[currentIndex].querySelector('.dot-prog');
      if (activeProg) {
        activeProg.style.transition = 'width 3s linear';
        activeProg.style.width = '100%';
      }
    }
  }

  function stopTimer() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
    if (dots[currentIndex]) {
      const activeProg = dots[currentIndex].querySelector('.dot-prog');
      if (activeProg) {
        const computed = window.getComputedStyle(activeProg).width;
        activeProg.style.transition = 'none';
        activeProg.style.width = computed;
      }
    }
  }

  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); startTimer(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); startTimer(); });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.dataset.slide, 10);
      if (!isNaN(idx)) {
        showSlide(idx);
        startTimer();
      }
    });
  });

  stage.addEventListener('mouseenter', stopTimer);
  stage.addEventListener('mouseleave', startTimer);

  // BIND INTERACTIVE RANGE SELECTORS
  $$('.range-pill-btn', stage).forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const parentOptions = btn.parentElement;
      const slideIndex = parentOptions.dataset.slideIndex;
      $$('.range-pill-btn', parentOptions).forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const price = Number(btn.dataset.price);
      const oldPrice = Number(btn.dataset.old);
      const save = Number(btn.dataset.save);

      const priceEl = $(`#slidePrice-${slideIndex}`);
      const oldEl = $(`#slideOld-${slideIndex}`);
      const saveEl = $(`#slideSave-${slideIndex}`);

      if (priceEl && !isNaN(price)) {
        priceEl.textContent = money(price);
        priceEl.style.transform = 'scale(1.08)';
        setTimeout(() => priceEl.style.transform = 'scale(1)', 250);
      }
      if (oldEl && !isNaN(oldPrice)) oldEl.textContent = money(oldPrice);
      if (saveEl && !isNaN(save)) {
        const pct = Math.round((save / oldPrice) * 100);
        saveEl.textContent = `Save ${money(save)} (${pct}% Off)`;
      }

      // Live update EMI on variant change
      if (slides[slideIndex]) {
        const emiStrong = slides[slideIndex].querySelector('.hero-emi-line strong');
        if (emiStrong && !isNaN(price)) {
          emiStrong.textContent = money(Math.round(price / 24)) + '/mo';
        }
      }
    });
  });

  showSlide(0);
  startTimer();
}

/* ============================================================
   CELEBRATION RIBBON & CONFETTI POP ENGINE
   ============================================================ */
let ribbonAnimId = null;

function runRibbonConfettiBurst() {
  const canvas = $('#ribbonCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  ctx.scale(dpr, dpr);

  const colors = [
    '#637050', // Sage
    '#242422', // Charcoal
    '#cbb279', // Champagne Gold
    '#e07a5f', // Coral
    '#81b29a', // Mint Sage
    '#f2cc8f', // Warm Gold
    '#ffffff'  // Pure Sparkle
  ];

  // Particle pool for ribbons and streamers
  const particles = [];
  const count = 110;

  for (let i = 0; i < count; i++) {
    const isRibbon = i % 2 === 0;
    particles.push({
      x: window.innerWidth * (0.15 + Math.random() * 0.7),
      y: window.innerHeight * (0.85 + Math.random() * 0.15),
      vx: (Math.random() - 0.5) * 16,
      vy: -(Math.random() * 18 + 12),
      gravity: 0.38,
      w: isRibbon ? (Math.random() * 12 + 14) : (Math.random() * 8 + 6),
      h: isRibbon ? (Math.random() * 6 + 5) : (Math.random() * 14 + 10),
      color: colors[Math.floor(Math.random() * colors.length)],
      angle: Math.random() * 360,
      spin: (Math.random() - 0.5) * 12,
      isRibbon,
      alpha: 1,
      sway: Math.random() * 0.05,
      swayOffset: Math.random() * Math.PI * 2
    });
  }

  const startTime = Date.now();
  const DURATION = 4500;

  function renderFrame() {
    const elapsed = Date.now() - startTime;
    if (elapsed > DURATION) {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      cancelAnimationFrame(ribbonAnimId);
      return;
    }

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    particles.forEach(p => {
      p.x += p.vx + Math.sin(p.swayOffset) * 1.5;
      p.y += p.vy;
      p.vy += p.gravity;
      p.vx *= 0.985;
      p.angle += p.spin;
      p.swayOffset += p.sway;

      if (elapsed > DURATION - 1000) {
        p.alpha = Math.max(0, (DURATION - elapsed) / 1000);
      }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.angle * Math.PI) / 180);
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;

      if (p.isRibbon) {
        // Twisting curled ribbon look
        ctx.beginPath();
        ctx.ellipse(0, 0, p.w / 2, p.h / 2, 0, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Confetti strip
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      }
      ctx.restore();
    });

    ribbonAnimId = requestAnimationFrame(renderFrame);
  }

  if (ribbonAnimId) cancelAnimationFrame(ribbonAnimId);
  ribbonAnimId = requestAnimationFrame(renderFrame);
}

function triggerCelebrationModal(order) {
  const modal = $('#ribbonModal');
  if (!modal) return;

  const idEl = $('#popOrderId');
  const addrEl = $('#popOrderAddress');
  const hubEl = $('#popOrderHub');
  const totalEl = $('#popOrderTotal');
  const trackBtn = $('#popTrackOrderBtn');

  if (idEl) idEl.textContent = '#' + (order.id || 'NZR-' + Math.floor(100000 + Math.random() * 900000));
  
  if (addrEl && order.address) {
    const a = order.address;
    addrEl.textContent = `${a.name || 'Customer'} • ${a.street || '742 Evergreen Terrace, Jubilee Hills'}, ${a.city || 'Hyderabad'}, ${a.state || 'Telangana'} - ${a.pin || '500033'}`;
  }

  if (hubEl) {
    hubEl.textContent = `Dispatched to Nazeer Express Logistics Hub • Scheduled for ${order.shippingMethod || 'Air Express Delivery'} (ETA: ${order.eta || 'In 2 business days'})`;
  }

  if (totalEl) {
    totalEl.textContent = money(order.total || 0);
  }

  if (trackBtn) {
    trackBtn.href = `orders.html?order=${encodeURIComponent(order.id)}`;
  }

  modal.classList.add('active');
  document.body.classList.add('locked');
  runRibbonConfettiBurst();

  toast(`🎉 Congratulations! Order #${order.id} confirmed and placed!`, 'check');
}

function closeCelebrationModal() {
  const modal = $('#ribbonModal');
  if (modal) modal.classList.remove('active');
  document.body.classList.remove('locked');
  if (ribbonAnimId) cancelAnimationFrame(ribbonAnimId);
  const canvas = $('#ribbonCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

function copyCelebrationId() {
  const idEl = $('#popOrderId');
  if (!idEl) return;
  const text = idEl.textContent.replace('#', '').trim();
  navigator.clipboard?.writeText(text);
  toast(`Order ID ${text} copied to clipboard!`, 'check');
}

/* Instant Buy Now from Hero Showcase */
window.quickHeroOrder = function(productId, defaultTitle, defaultPrice) {
  const slide = document.querySelector(`.hero-prod-slide.active`);
  let finalPrice = defaultPrice;
  let finalVariant = '';

  if (slide) {
    const activeRange = slide.querySelector('.range-pill-btn.active');
    if (activeRange) {
      finalPrice = Number(activeRange.dataset.price) || defaultPrice;
      finalVariant = activeRange.dataset.variant || '';
    }
  }

  const orderId = 'NZR-' + Math.floor(200000 + Math.random() * 800000);
  const user = state.user || {
    name: 'Alex Chen',
    phone: '+91 98765 43210',
    address: '742 Evergreen Terrace, Jubilee Hills Road No. 36, Hyderabad, Telangana - 500033'
  };

  const newOrder = {
    id: orderId,
    date: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
    items: [
      { id: productId, name: `${defaultTitle} (${finalVariant})`, qty: 1, price: finalPrice, color: 'Premium Finish' }
    ],
    subtotal: finalPrice,
    shipping: 0,
    total: finalPrice,
    carrier: 'Nazeer Sky Express Priority Air',
    trackingNum: 'NZR-AIR-' + Math.floor(100000 + Math.random() * 900000),
    address: {
      name: user.name,
      phone: user.phone,
      street: '742 Evergreen Terrace, Jubilee Hills Rd 36',
      city: 'Hyderabad',
      state: 'Telangana',
      pin: '500033'
    },
    shippingMethod: 'Express Sky Air Delivery (Free)',
    paymentMethod: 'Instant UPI / Pre-Authorized',
    currentStage: 1,
    statusText: 'Processing & Quality Checked',
    eta: 'Tomorrow by 2:00 PM'
  };

  createOrder(newOrder);
  triggerCelebrationModal(newOrder);
};

window.quickHeroAdd = function(productId) {
  const p = byId(productId);
  if (!p) return;
  state.cart.set(productId, (state.cart.get(productId) || 0) + 1);
  saveCart();
  renderBadges();
  renderCart();
  toast(`Added ${p.name} to cart!`, 'cart');
};

window.closeCelebrationModal = closeCelebrationModal;
window.copyCelebrationId = copyCelebrationId;

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initHeroShowcase();
});
