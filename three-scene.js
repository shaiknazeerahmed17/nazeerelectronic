/* ==========================================================================
   HUZEFA ELECTRONICS — three-scene.js
   Full Real 3D Engine: Photorealistic multi-part procedural models,
   Exploded Hardware Deconstruct view, Wireframe/Hologram shaders,
   Studio Lighting presets, 360° Orbit controls, and Universal Modal Viewer.
   ========================================================================== */
window.HE3D = (() => {
  'use strict';

  const isMobile = () => window.innerWidth < 768;

  /* ---------------- Texture Factory (Procedural Canvas Textures) -------- */
  function canvasTex(w, h, draw, srgb = true) {
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    draw(c.getContext('2d'), w, h);
    const t = new THREE.CanvasTexture(c);
    t.anisotropy = 8;
    if (srgb) t.encoding = THREE.sRGBEncoding;
    return t;
  }

  function rr(x, px, py, w, h, r) {
    x.beginPath();
    x.moveTo(px + r, py);
    x.arcTo(px + w, py, px + w, py + h, r);
    x.arcTo(px + w, py + h, px, py + h, r);
    x.arcTo(px, py + h, px, py, r);
    x.arcTo(px, py, px + w, py, r);
    x.closePath();
  }

  function rng(seed) { let s = seed; return () => (s = (s * 16807) % 2147483647) / 2147483647; }

  /* Photorealistic Smartphone Screen: Live OLED Display */
  const phoneScreenTex = () => canvasTex(600, 1280, (x, w, h) => {
    // Deep OLED dark backdrop with cyber luminous aura
    x.fillStyle = '#060a10'; x.fillRect(0, 0, w, h);
    let g = x.createRadialGradient(w * .3, h * .3, 40, w * .3, h * .3, 700);
    g.addColorStop(0, 'rgba(116, 196, 24, 0.45)');
    g.addColorStop(0.5, 'rgba(5, 150, 105, 0.22)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    x.fillStyle = g; x.fillRect(0, 0, w, h);

    // Status bar
    x.fillStyle = 'rgba(240, 248, 255, 0.95)';
    x.font = '600 28px sans-serif';
    x.textAlign = 'left';
    x.fillText('09:41', 54, 62);
    x.fillStyle = 'rgba(240, 248, 255, 0.65)';
    for (let i = 0; i < 4; i++) x.fillRect(w - 140 + i * 14, 46 - i * 3, 8, 10 + i * 3);
    x.strokeRect(w - 74, 38, 30, 16);
    x.fillRect(w - 71, 41, 20, 10);

    // Dynamic Island pill
    x.fillStyle = '#000000';
    rr(x, w / 2 - 85, 34, 170, 36, 18);
    x.fill();
    x.strokeStyle = 'rgba(255,255,255,0.15)';
    x.lineWidth = 1.5;
    x.stroke();
    // Tiny camera & sensor inside Dynamic Island
    x.fillStyle = '#0a101d';
    x.beginPath(); x.arc(w / 2 + 45, 52, 7, 0, 7); x.fill();
    x.fillStyle = '#00e5ff';
    x.beginPath(); x.arc(w / 2 + 45, 52, 2.5, 0, 7); x.fill();

    // Large Futuristic Clock Widget
    x.textAlign = 'center';
    x.fillStyle = 'rgba(255, 255, 255, 0.98)';
    x.font = '200 138px sans-serif';
    x.fillText('09:41', w / 2, 310);
    x.font = '600 28px sans-serif';
    x.fillStyle = 'rgba(116, 196, 24, 0.95)';
    x.fillText('HUZEFA AI TITANIUM • 5G ULTRA', w / 2, 365);

    // Battery & Performance Card Widget
    x.fillStyle = 'rgba(255, 255, 255, 0.06)';
    rr(x, 48, 415, w - 96, 140, 24);
    x.fill();
    x.strokeStyle = 'rgba(116, 196, 24, 0.35)';
    x.lineWidth = 1.5;
    x.stroke();
    x.textAlign = 'left';
    x.font = '600 24px sans-serif';
    x.fillStyle = '#ffffff';
    x.fillText('A18 PRO NEURAL ENGINE', 76, 465);
    x.font = '400 20px monospace';
    x.fillStyle = 'rgba(200, 225, 245, 0.7)';
    x.fillText('CORE FREQ 4.05 GHz • 100% HEALTH', 76, 508);

    // Interactive App Grid
    const r = rng(19);
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        const px = 64 + col * 122, py = 590 + row * 126, hot = r() > .75;
        x.fillStyle = hot ? 'rgba(116, 196, 24, 0.35)' : 'rgba(255, 255, 255, 0.08)';
        rr(x, px, py, 88, 88, 22);
        x.fill();
        if (hot) {
          x.strokeStyle = 'rgba(116, 196, 24, 0.75)';
          x.lineWidth = 2;
          x.stroke();
        }
      }
    }

    // Glassmorphic Dock
    x.fillStyle = 'rgba(255, 255, 255, 0.12)';
    rr(x, 44, 1120, w - 88, 116, 38);
    x.fill();
    for (let i = 0; i < 4; i++) {
      x.fillStyle = 'rgba(255, 255, 255, 0.22)';
      rr(x, 72 + i * 124, 1138, 80, 80, 20);
      x.fill();
    }
  });

  /* Logic Board / Motherboard PCB Texture (for Exploded View) */
  const logicBoardTex = () => canvasTex(512, 1024, (x, w, h) => {
    x.fillStyle = '#081c10'; x.fillRect(0, 0, w, h);
    // Gold traces
    x.strokeStyle = 'rgba(212, 175, 55, 0.4)';
    x.lineWidth = 2;
    for (let i = 0; i < 40; i++) {
      x.beginPath();
      x.moveTo(Math.random() * w, Math.random() * h);
      x.lineTo(Math.random() * w, Math.random() * h);
      x.stroke();
    }
    // Main A18 Bionic Chip
    x.fillStyle = '#11151c';
    rr(x, w / 2 - 90, 280, 180, 180, 16);
    x.fill();
    x.strokeStyle = '#d4af37';
    x.lineWidth = 3;
    x.stroke();
    x.fillStyle = '#ffffff';
    x.font = '700 24px sans-serif';
    x.textAlign = 'center';
    x.fillText('A18 PRO', w / 2, 365);
    x.font = '500 16px monospace';
    x.fillStyle = '#74c418';
    x.fillText('3nm 6-CORE', w / 2, 400);

    // Lithium Battery Cell
    x.fillStyle = '#0d1117';
    rr(x, 40, 520, w - 80, 440, 18);
    x.fill();
    x.strokeStyle = 'rgba(255,255,255,0.15)';
    x.lineWidth = 1.5;
    x.stroke();
    x.fillStyle = 'rgba(255,255,255,0.7)';
    x.font = '600 22px sans-serif';
    x.fillText('HUZEFA HIGH-DENSITY CELL', w / 2, 720);
    x.font = '400 18px monospace';
    x.fillStyle = 'rgba(200,220,240,0.5)';
    x.fillText('4685 mAh • 4.45V • GRAPHENE', w / 2, 755);
  });

  /* Laptop Screen: Ultra-wide Studio Workspace */
  const laptopScreenTex = () => canvasTex(1200, 750, (x, w, h) => {
    x.fillStyle = '#05080e'; x.fillRect(0, 0, w, h);
    x.fillStyle = '#090e18'; x.fillRect(0, 0, w, 56);
    ['#ff5f56', '#ffbd2e', '#27c93f'].forEach((c, i) => {
      x.fillStyle = c; x.beginPath(); x.arc(36 + i * 28, 28, 7.5, 0, 7); x.fill();
    });
    // Center title
    x.fillStyle = 'rgba(255,255,255,0.6)'; x.font = '500 18px monospace'; x.textAlign = 'center';
    x.fillText('HuzefaStudio — 3D_Engine.cpp', w / 2, 34);

    // Sidebar
    x.fillStyle = 'rgba(255,255,255,0.04)'; x.fillRect(0, 56, 210, h - 56);
    for (let i = 0; i < 11; i++) {
      x.fillStyle = i === 2 ? 'rgba(116, 196, 24, 0.4)' : 'rgba(150, 180, 210, 0.15)';
      rr(x, 24, 90 + i * 46, 140, 14, 6); x.fill();
    }
    // Code lines with syntax highlighting
    x.textAlign = 'right'; x.font = '500 22px monospace';
    const C = ['#74c418', '#38bdf8', '#c084fc', '#fcd34d', '#f43f5e', '#ffffff'];
    const r = rng(42);
    for (let ln = 0; ln < 15; ln++) {
      const y = 105 + ln * 38;
      x.fillStyle = 'rgba(100, 130, 160, 0.4)'; x.fillText(String(ln + 1), 240, y);
      let cx = 270 + (ln % 5) * 44;
      const segs = 2 + Math.floor(r() * 4);
      for (let s = 0; s < segs; s++) {
        x.fillStyle = C[Math.floor(r() * C.length)];
        const wdt = 45 + r() * 160;
        rr(x, cx, y - 16, wdt, 15, 6); x.fill();
        cx += wdt + 20;
        if (cx > w - 120) break;
      }
    }
    // Bottom status bar
    x.fillStyle = '#0a101d'; x.fillRect(0, h - 38, w, 38);
    x.fillStyle = '#74c418'; x.fillRect(0, h - 38, 220, 4);
    x.fillStyle = 'rgba(255,255,255,0.7)'; x.font = '500 16px monospace'; x.textAlign = 'left';
    x.fillText('READY • 144Hz G-SYNC • METAL COMPLIANT', 24, h - 14);
  });

  /* Laptop Keyboard Deck: Precision Backlit Chiclet Deck */
  const keyboardTex = () => canvasTex(1200, 750, (x, w, h) => {
    x.fillStyle = '#090d14'; x.fillRect(0, 0, w, h);
    const kw = 64, kh = 48, gap = 11, cols = 15, rows = 5;
    const ox = (w - cols * (kw + gap)) / 2, oy = 40;
    for (let rI = 0; rI < rows; rI++) {
      for (let cI = 0; cI < cols; cI++) {
        const kx = ox + cI * (kw + gap), ky = oy + rI * (kh + gap);
        x.fillStyle = '#141a24';
        rr(x, kx, ky, kw, kh, 9); x.fill();
        // Subtle keycap glow outline
        x.strokeStyle = 'rgba(116, 196, 24, 0.15)';
        x.lineWidth = 1; x.stroke();
      }
    }
    // Spacebar
    x.fillStyle = '#141a24';
    rr(x, ox + 3 * (kw + gap), oy + rows * (kh + gap), kw * 6 + gap * 5, kh, 9);
    x.fill();
    // Glass Force Touch Trackpad
    x.strokeStyle = 'rgba(116, 196, 24, 0.4)';
    x.lineWidth = 2.5;
    rr(x, w / 2 - 200, 430, 400, 260, 30);
    x.stroke();
    x.fillStyle = 'rgba(255, 255, 255, 0.02)';
    x.fill();
  });

  /* Smartwatch Chronograph Face with Rotating Hands */
  const watchFaceTex = () => canvasTex(600, 600, (x, w, h) => {
    x.fillStyle = '#04070c'; x.fillRect(0, 0, w, h);
    // Outer dial ticks
    x.strokeStyle = 'rgba(255,255,255,0.25)'; x.lineWidth = 3;
    for (let i = 0; i < 60; i++) {
      const a = (i / 60) * Math.PI * 2;
      const len = i % 5 === 0 ? 20 : 8;
      x.lineWidth = i % 5 === 0 ? 4 : 2;
      x.strokeStyle = i % 5 === 0 ? '#74c418' : 'rgba(255,255,255,0.25)';
      x.beginPath();
      x.moveTo(300 + Math.cos(a) * (280 - len), 300 + Math.sin(a) * (280 - len));
      x.lineTo(300 + Math.cos(a) * 280, 300 + Math.sin(a) * 280);
      x.stroke();
    }
    // Activity Rings
    const arc = (rad, col, pct) => {
      x.strokeStyle = col; x.lineWidth = 18; x.lineCap = 'round';
      x.beginPath();
      x.arc(300, 300, rad, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * pct);
      x.stroke();
    };
    arc(190, '#74c418', 0.85);
    arc(155, '#38bdf8', 0.68);
    arc(120, '#f43f5e', 0.92);

    // Digital readout
    x.textAlign = 'center';
    x.fillStyle = '#ffffff';
    x.font = '800 84px sans-serif';
    x.fillText('10:09', 300, 320);
    x.font = '600 24px monospace';
    x.fillStyle = '#74c418';
    x.fillText('ALTITUDE 2450M • HR 72', 300, 365);
  });

  /* Concentric Spun-Metal Anodized Texture for Headphone Earcups */
  const spunMetalTex = () => canvasTex(512, 512, (x, w, h) => {
    x.fillStyle = '#1c222c'; x.fillRect(0, 0, w, h);
    x.lineWidth = 1.5;
    for (let r = 10; r < 250; r += 4) {
      x.strokeStyle = `rgba(255, 255, 255, ${0.03 + Math.sin(r * .1) * .02})`;
      x.beginPath(); x.arc(256, 256, r, 0, Math.PI * 2); x.stroke();
    }
    // Specular radial cone light highlight
    const g = x.createRadialGradient(256, 256, 0, 256, 256, 256);
    g.addColorStop(0, 'rgba(116, 196, 24, 0.25)');
    g.addColorStop(0.5, 'rgba(255, 255, 255, 0.08)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    x.fillStyle = g; x.fillRect(0, 0, w, h);
  });

  /* Soft round particle sprite */
  const spriteTex = () => canvasTex(64, 64, (x) => {
    const g = x.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(.35, 'rgba(116, 196, 24, 0.7)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    x.fillStyle = g; x.fillRect(0, 0, 64, 64);
  }, false);

  const floorGlowTex = () => canvasTex(256, 256, (x) => {
    const g = x.createRadialGradient(128, 128, 8, 128, 128, 128);
    g.addColorStop(0, 'rgba(116, 196, 24, 0.45)');
    g.addColorStop(0.55, 'rgba(5, 150, 105, 0.15)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    x.fillStyle = g; x.fillRect(0, 0, 256, 256);
  }, false);

  /* ---------------- Materials Library ---------------- */
  const M = {
    titanium: () => new THREE.MeshStandardMaterial({ color: 0x3d444d, metalness: 0.92, roughness: 0.24 }),
    titaniumDark: () => new THREE.MeshStandardMaterial({ color: 0x161a22, metalness: 0.88, roughness: 0.32 }),
    aluminum: () => new THREE.MeshStandardMaterial({ color: 0x7c8592, metalness: 0.85, roughness: 0.22 }),
    glossGlass: () => new THREE.MeshStandardMaterial({ color: 0x141a24, metalness: 0.5, roughness: 0.08 }),
    cameraBezel: () => new THREE.MeshStandardMaterial({ color: 0x8a929e, metalness: 0.96, roughness: 0.12 }),
    lensPupil: () => new THREE.MeshStandardMaterial({ color: 0x03060a, metalness: 0.95, roughness: 0.04 }),
    strap: () => new THREE.MeshStandardMaterial({ color: 0x1b2029, metalness: 0.35, roughness: 0.75 }),
    orangeAccent: () => new THREE.MeshStandardMaterial({ color: 0xff6600, metalness: 0.4, roughness: 0.3 }),
    accentGreen: () => new THREE.MeshStandardMaterial({ color: 0x74c418, emissive: 0x5ea812, emissiveIntensity: 0.7, metalness: 0.4, roughness: 0.3 }),
    glowDot: () => new THREE.MeshBasicMaterial({ color: 0x74c418, toneMapped: false }),
    screen: t => new THREE.MeshBasicMaterial({ map: t, toneMapped: false }),
    deck: t => new THREE.MeshStandardMaterial({ map: t, metalness: 0.3, roughness: 0.55 }),
    spunMetal: t => new THREE.MeshStandardMaterial({ map: t, metalness: 0.85, roughness: 0.28 }),
    circuit: t => new THREE.MeshStandardMaterial({ map: t, metalness: 0.6, roughness: 0.4 }),
    wireframeMat: new THREE.MeshBasicMaterial({ color: 0x74c418, wireframe: true, transparent: true, opacity: 0.82 }),
  };

  /* ---------------- Geometry Helpers ---------------- */
  function roundedRectShape(w, h, r) {
    const s = new THREE.Shape(), x = -w / 2, y = -h / 2;
    s.moveTo(x, y + r);
    s.lineTo(x, y + h - r); s.quadraticCurveTo(x, y + h, x + r, y + h);
    s.lineTo(x + w - r, y + h); s.quadraticCurveTo(x + w, y + h, x + w, y + h - r);
    s.lineTo(x + w, y + r); s.quadraticCurveTo(x + w, y, x + w - r, y);
    s.lineTo(x + r, y); s.quadraticCurveTo(x, y, x, y + r);
    return s;
  }

  function slab(w, h, d, r, mat, bevel = 0.025) {
    const g = new THREE.ExtrudeGeometry(roundedRectShape(w, h, r), {
      depth: d, bevelEnabled: true, bevelThickness: bevel, bevelSize: bevel, bevelSegments: 3, curveSegments: 16,
    });
    g.center();
    return new THREE.Mesh(g, mat);
  }

  function registerComp(mesh, name, explodeVec) {
    mesh.userData.compName = name;
    mesh.userData.origPos = mesh.position.clone();
    mesh.userData.explodeVec = explodeVec.clone();
    return mesh;
  }

  function holoRing(r, opacity, arc = Math.PI * 2) {
    const m = new THREE.Mesh(
      new THREE.TorusGeometry(r, .012, 8, 160, arc),
      new THREE.MeshBasicMaterial({ color: 0x74c418, transparent: true, opacity, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false })
    );
    return m;
  }

  function dashedCircle(r, opacity = .5) {
    const pts = [];
    for (let i = 0; i <= 128; i++) {
      const a = (i / 128) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, 0));
    }
    const line = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(pts),
      new THREE.LineDashedMaterial({ color: 0x74c418, dashSize: .18, gapSize: .12, transparent: true, opacity, toneMapped: false })
    );
    line.computeLineDistances();
    return line;
  }

  function makeParticles(count, spreadX, spreadY, spreadZ) {
    const pos = new Float32Array(count * 3), col = new Float32Array(count * 3), vel = new Float32Array(count);
    const palette = [[.45, .8, .1], [.9, 1, .9], [.1, .6, .3]];
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - .5) * spreadX;
      pos[i * 3 + 1] = (Math.random() - .5) * spreadY;
      pos[i * 3 + 2] = (Math.random() - .5) * spreadZ;
      const c = palette[Math.random() < .6 ? 0 : (Math.random() < .8 ? 1 : 2)];
      col.set(c, i * 3);
      vel[i] = .08 + Math.random() * .35;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    const mat = new THREE.PointsMaterial({
      size: .06, map: spriteTex(), transparent: true, depthWrite: false,
      blending: THREE.AdditiveBlending, vertexColors: true, opacity: .8, sizeAttenuation: true,
    });
    const pts = new THREE.Points(geo, mat);
    pts.userData.tick = (dt) => {
      const p = geo.attributes.position.array;
      for (let i = 0; i < count; i++) {
        p[i * 3 + 1] += vel[i] * dt;
        if (p[i * 3 + 1] > spreadY / 2) p[i * 3 + 1] = -spreadY / 2;
      }
      geo.attributes.position.needsUpdate = true;
    };
    return pts;
  }

  /* ---------------- Multi-Part Photorealistic Device Builders ----------- */

  // 1. Flagship Titanium Smartphone with Multi-Part Exploded Layering
  function buildPhone() {
    const root = new THREE.Group();

    // 1. Front Display Glass + Live OLED screen
    const frontGroup = new THREE.Group();
    const frontSlab = slab(1.5, 3.12, 0.04, 0.32, M.glossGlass(), 0.02);
    const screenMesh = new THREE.Mesh(new THREE.PlaneGeometry(1.42, 3.04), M.screen(phoneScreenTex()));
    screenMesh.position.z = 0.025;
    frontGroup.add(frontSlab, screenMesh);
    registerComp(frontGroup, 'display', new THREE.Vector3(0, 0, 1.4));
    root.add(frontGroup);

    // 2. Internal Motherboard / Battery Sub-Assembly
    const boardGroup = new THREE.Group();
    const boardMesh = slab(1.36, 2.96, 0.03, 0.26, M.circuit(logicBoardTex()), 0.01);
    boardGroup.add(boardMesh);
    registerComp(boardGroup, 'internals', new THREE.Vector3(0, 0, 0.5));
    root.add(boardGroup);

    // 3. Titanium Mid-Frame & Edge Chassis
    const chassisGroup = new THREE.Group();
    const frame = slab(1.54, 3.16, 0.16, 0.33, M.titanium(), 0.03);
    // Action Button, Volume Keys, Power Key
    const btnAct = slab(0.04, 0.26, 0.06, 0.015, M.accentGreen(), 0.01); btnAct.position.set(-0.8, 0.7, 0);
    const btnV1 = slab(0.04, 0.22, 0.06, 0.015, M.titanium(), 0.01); btnV1.position.set(-0.8, 0.3, 0);
    const btnV2 = slab(0.04, 0.22, 0.06, 0.015, M.titanium(), 0.01); btnV2.position.set(-0.8, -0.02, 0);
    const btnPwr = slab(0.04, 0.45, 0.06, 0.015, M.titanium(), 0.01); btnPwr.position.set(0.8, 0.4, 0);
    chassisGroup.add(frame, btnAct, btnV1, btnV2, btnPwr);
    registerComp(chassisGroup, 'chassis', new THREE.Vector3(0, 0, -0.2));
    root.add(chassisGroup);

    // 4. Rear Matte Glass Backplate
    const rearGroup = new THREE.Group();
    const rearSlab = slab(1.5, 3.12, 0.04, 0.32, M.titaniumDark(), 0.02);
    rearGroup.add(rearSlab);
    registerComp(rearGroup, 'backplate', new THREE.Vector3(0, 0, -0.8));
    root.add(rearGroup);

    // 5. Triple Sapphire Lens Camera Module
    const camGroup = new THREE.Group();
    const camPlateau = slab(0.64, 0.64, 0.06, 0.2, M.titanium(), 0.02);
    camPlateau.position.set(-0.35, 0.96, -0.12);
    camGroup.add(camPlateau);
    // 3 Triple Lenses with chrome bezels and inner pupils
    [[-0.48, 1.1], [-0.22, 1.1], [-0.35, 0.82]].forEach(([lx, ly]) => {
      const bezel = new THREE.Mesh(new THREE.CylinderGeometry(0.095, 0.095, 0.05, 24), M.cameraBezel());
      bezel.rotation.x = Math.PI / 2; bezel.position.set(lx, ly, -0.16);
      const pupil = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.065, 0.052, 20), M.lensPupil());
      pupil.rotation.x = Math.PI / 2; pupil.position.set(lx, ly, -0.165);
      const pupilGlow = new THREE.Mesh(new THREE.SphereGeometry(0.025, 12, 12), M.glowDot());
      pupilGlow.position.set(lx, ly, -0.185);
      camGroup.add(bezel, pupil, pupilGlow);
    });
    // TrueTone Dual Flash + LiDAR
    const flash = new THREE.Mesh(new THREE.CircleGeometry(0.04, 16), new THREE.MeshBasicMaterial({ color: 0xfff3d4 }));
    flash.rotation.y = Math.PI; flash.position.set(-0.18, 0.82, -0.155);
    const lidar = new THREE.Mesh(new THREE.CircleGeometry(0.035, 16), new THREE.MeshBasicMaterial({ color: 0x050505 }));
    lidar.rotation.y = Math.PI; lidar.position.set(-0.22, 0.72, -0.155);
    camGroup.add(flash, lidar);
    registerComp(camGroup, 'cameras', new THREE.Vector3(-0.4, 0.4, -1.6));
    root.add(camGroup);

    return root;
  }

  // 2. High-Fidelity Unibody Aluminum Laptop
  function buildLaptop() {
    const root = new THREE.Group();

    // 1. Lower Unibody Aluminum Chassis
    const baseGroup = new THREE.Group();
    const baseMesh = slab(3.2, 0.16, 2.15, 0.14, M.aluminum(), 0.03);
    baseMesh.position.y = -1.0;
    baseGroup.add(baseMesh);
    registerComp(baseGroup, 'base', new THREE.Vector3(0, -0.7, 0));
    root.add(baseGroup);

    // 2. Backlit Keyboard & Force Touch Trackpad Deck
    const kbGroup = new THREE.Group();
    const kbDeck = new THREE.Mesh(new THREE.PlaneGeometry(2.95, 1.95), M.deck(keyboardTex()));
    kbDeck.rotation.x = -Math.PI / 2;
    kbDeck.position.y = -0.905;
    kbGroup.add(kbDeck);
    registerComp(kbGroup, 'keyboard', new THREE.Vector3(0, 0.35, 0));
    root.add(kbGroup);

    // 3. Display Lid & Screen Assembly
    const lidGroup = new THREE.Group();
    lidGroup.position.set(0, -0.92, -1.05);
    const lidSlab = slab(3.2, 2.1, 0.08, 0.14, M.aluminum(), 0.02);
    lidSlab.position.y = 1.05;
    const screenMesh = new THREE.Mesh(new THREE.PlaneGeometry(2.98, 1.92), M.screen(laptopScreenTex()));
    screenMesh.position.set(0, 1.05, 0.052);
    // Glowing Brand Logo on outer lid
    const emblem = new THREE.Mesh(new THREE.CircleGeometry(0.1, 24), M.glowDot());
    emblem.position.set(0, 1.05, -0.052);
    emblem.rotation.y = Math.PI;
    lidSlab.add(screenMesh, emblem);
    lidGroup.add(lidSlab);
    lidGroup.rotation.x = -0.22; // natural ergonomic tilt
    registerComp(lidGroup, 'display', new THREE.Vector3(0, 0.9, -0.9));
    root.add(lidGroup);

    root.position.y = 0.5;
    return root;
  }

  // 3. Apple Watch Ultra / Flagship Smartwatch
  function buildWatch() {
    const root = new THREE.Group();

    // 1. Sapphire Screen & Raised Titanium Bezel
    const screenGroup = new THREE.Group();
    const bezel = slab(1.15, 1.35, 0.06, 0.34, M.titanium(), 0.03);
    const screenMesh = new THREE.Mesh(new THREE.PlaneGeometry(0.96, 1.16), M.screen(watchFaceTex()));
    screenMesh.position.z = 0.045;
    screenGroup.add(bezel, screenMesh);
    registerComp(screenGroup, 'screen', new THREE.Vector3(0, 0, 1.2));
    root.add(screenGroup);

    // 2. Titanium Body with Knurled Digital Crown
    const caseGroup = new THREE.Group();
    const caseMesh = slab(1.16, 1.36, 0.28, 0.34, M.titanium(), 0.04);
    // Digital Crown
    const crown = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.12, 24), M.titanium());
    crown.rotation.z = Math.PI / 2; crown.position.set(0.64, 0.3, 0);
    const crownRing = new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.015, 8, 24), M.accentGreen());
    crownRing.rotation.y = Math.PI / 2; crownRing.position.set(0.65, 0.3, 0);
    // International Orange Action Button
    const actBtn = slab(0.06, 0.44, 0.12, 0.03, M.orangeAccent(), 0.01);
    actBtn.position.set(-0.62, 0.1, 0);
    caseGroup.add(caseMesh, crown, crownRing, actBtn);
    registerComp(caseGroup, 'body', new THREE.Vector3(0, 0, 0));
    root.add(caseGroup);

    // 3. Ceramic Biometric Sensor Base
    const sensorGroup = new THREE.Group();
    const sensorBase = slab(0.96, 1.16, 0.06, 0.26, M.titaniumDark(), 0.02);
    sensorBase.position.z = -0.16;
    const diode1 = new THREE.Mesh(new THREE.CircleGeometry(0.04, 16), M.glowDot());
    diode1.rotation.y = Math.PI; diode1.position.set(-0.15, 0, -0.2);
    const diode2 = new THREE.Mesh(new THREE.CircleGeometry(0.04, 16), M.glowDot());
    diode2.rotation.y = Math.PI; diode2.position.set(0.15, 0, -0.2);
    sensorGroup.add(sensorBase, diode1, diode2);
    registerComp(sensorGroup, 'sensor', new THREE.Vector3(0, 0, -1.0));
    root.add(sensorGroup);

    // 4. Ribbed Sport Straps (Up & Down)
    const strapUpGroup = new THREE.Group();
    const sUp = slab(0.82, 1.05, 0.1, 0.3, M.strap()); sUp.position.set(0, 1.1, -0.04); sUp.rotation.x = -0.28;
    strapUpGroup.add(sUp);
    registerComp(strapUpGroup, 'strapTop', new THREE.Vector3(0, 1.2, 0));
    root.add(strapUpGroup);

    const strapDnGroup = new THREE.Group();
    const sDn = slab(0.82, 1.05, 0.1, 0.3, M.strap()); sDn.position.set(0, -1.1, 0.04); sDn.rotation.x = 0.28;
    strapDnGroup.add(sDn);
    registerComp(strapDnGroup, 'strapBottom', new THREE.Vector3(0, -1.2, 0));
    root.add(strapDnGroup);

    return root;
  }

  // 4. Flagship Studio Over-Ear Headphones (AirPods Max Style)
  function buildHeadphones() {
    const root = new THREE.Group();

    // Telescoping Headband Arch
    const bandGroup = new THREE.Group();
    const arch = new THREE.Mesh(
      new THREE.TorusGeometry(1.2, 0.05, 16, 64, Math.PI),
      M.aluminum()
    );
    arch.position.y = 0.7;
    // Breathable mesh canopy
    const canopy = new THREE.Mesh(
      new THREE.TorusGeometry(1.2, 0.14, 8, 48, Math.PI * 0.7),
      M.strap()
    );
    canopy.position.y = 0.7;
    bandGroup.add(arch, canopy);
    registerComp(bandGroup, 'headband', new THREE.Vector3(0, 0.9, 0));
    root.add(bandGroup);

    // Left & Right Aluminum Earcups + Memory Foam Cushions
    const mkCup = (side) => {
      const g = new THREE.Group();
      // Aluminum spun-metal outer cup
      const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.58, 0.28, 32), M.spunMetal(spunMetalTex()));
      cup.rotation.z = Math.PI / 2;
      cup.position.set(side * 1.25, 0.2, 0);

      // Memory foam acoustic ear cushion
      const cushion = new THREE.Mesh(new THREE.TorusGeometry(0.48, 0.12, 16, 32), M.strap());
      cushion.rotation.y = Math.PI / 2;
      cushion.position.set(side * 1.05, 0.2, 0);

      g.add(cup, cushion);
      registerComp(g, side > 0 ? 'cupRight' : 'cupLeft', new THREE.Vector3(side * 1.1, 0, 0));
      return g;
    };

    root.add(mkCup(1), mkCup(-1));
    root.position.y = 0.3;
    return root;
  }

  // 5. Futuristic Cyber Hub / Gaming Console
  function buildConsole() {
    const root = new THREE.Group();
    const towerGroup = new THREE.Group();
    const tower = slab(1.1, 3.4, 1.8, 0.22, M.titaniumDark(), 0.05);
    // Glowing Aerodynamic Fin Accents
    const finL = slab(0.04, 3.2, 1.9, 0.15, M.accentGreen(), 0.02); finL.position.set(-0.6, 0, 0);
    const finR = slab(0.04, 3.2, 1.9, 0.15, M.accentGreen(), 0.02); finR.position.set(0.6, 0, 0);
    // Optical Disc Slot
    const slot = slab(0.05, 1.4, 0.04, 0.01, M.glossGlass(), 0.01); slot.position.set(0.58, 0.4, 0.5);
    towerGroup.add(tower, finL, finR, slot);
    registerComp(towerGroup, 'core', new THREE.Vector3(0, 0.5, 0));
    root.add(towerGroup);

    // Floating Illuminated Stand Base
    const standGroup = new THREE.Group();
    const stand = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.2, 0.14, 32), M.aluminum());
    stand.position.y = -1.75;
    const standRing = holoRing(1.22, 0.6);
    standRing.rotation.x = Math.PI / 2; standRing.position.y = -1.68;
    standGroup.add(stand, standRing);
    registerComp(standGroup, 'stand', new THREE.Vector3(0, -0.8, 0));
    root.add(standGroup);

    return root;
  }

  const BUILDERS = {
    phone: buildPhone,
    laptop: buildLaptop,
    watch: buildWatch,
    buds: buildHeadphones,
    console: buildConsole,
  };

  /* ---------------- Explode & Wireframe Animation Handlers -------------- */
  function applyExplode(group, progress) {
    if (!group) return;
    group.traverse(o => {
      if (o.userData && o.userData.explodeVec && o.userData.origPos) {
        o.position.copy(o.userData.origPos).addScaledVector(o.userData.explodeVec, progress);
      }
    });
  }

  function applyWireframe(group, isWireframe) {
    if (!group) return;
    group.traverse(o => {
      if (o.isMesh) {
        if (!o.userData.origMat) o.userData.origMat = o.material;
        o.material = isWireframe ? M.wireframeMat : o.userData.origMat;
      }
    });
  }

  /* ---------------- Reflection Floor (Mirrored Clone) ------------------- */
  function mirroredClone(srcGroup, floorY, opacity) {
    const clone = srcGroup.clone(true);
    clone.traverse(o => {
      if (o.isMesh || o.isLine) {
        o.material = o.material.clone();
        o.material.transparent = true;
        o.material.opacity = opacity;
        o.material.side = THREE.DoubleSide;
        if (o.material.emissiveIntensity !== undefined) o.material.emissiveIntensity *= 0.35;
      }
    });
    const root = new THREE.Group();
    root.add(clone);
    root.scale.y = -1;
    root.position.y = 2 * floorY;
    return root;
  }

  function syncTransforms(src, dst) {
    dst.position.copy(src.position);
    dst.quaternion.copy(src.quaternion);
    dst.scale.copy(src.scale);
    for (let i = 0; i < src.children.length; i++) {
      if (dst.children[i]) syncTransforms(src.children[i], dst.children[i]);
    }
  }

  function baseRenderer(canvas) {
    const r = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
    r.setPixelRatio(Math.min(window.devicePixelRatio, isMobile() ? 1.75 : 2));
    r.outputEncoding = THREE.sRGBEncoding;
    r.toneMapping = THREE.ACESFilmicToneMapping;
    r.toneMappingExposure = 1.18;
    return r;
  }

  function addRig(scene) {
    const ambient = new THREE.AmbientLight(0x334455, 0.65); scene.add(ambient);
    const key = new THREE.DirectionalLight(0xdce7d5, 0.95); key.position.set(4, 6, 4); scene.add(key);
    const fill = new THREE.DirectionalLight(0xa5c490, 0.45); fill.position.set(-4, -2, -3); scene.add(fill);
    const p1 = new THREE.PointLight(0x74c418, 1.5, 32); scene.add(p1);
    const p2 = new THREE.PointLight(0x38bdf8, 1.2, 32); scene.add(p2);
    const rim = new THREE.PointLight(0xffffff, 0.6, 26); rim.position.set(-4, 3, -4); scene.add(rim);
    return { p1, p2, ambient, key, fill, rim };
  }

  function floorKit(scene, y, withGrid) {
    const pool = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 10),
      new THREE.MeshBasicMaterial({ map: floorGlowTex(), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0.65, toneMapped: false })
    );
    pool.rotation.x = -Math.PI / 2; pool.position.y = y + 0.01; scene.add(pool);
    let grid = null;
    if (withGrid) {
      grid = new THREE.GridHelper(24, 48, 0x74c418, 0x223024);
      grid.material.transparent = true; grid.material.opacity = 0.28;
      grid.position.y = y; scene.add(grid);
    }
    return { pool, grid };
  }

  /* ======================================================================
     HERO SCENE — Real 3D Devices in Interactive Flight Formation
     ====================================================================== */
  class HeroScene {
    constructor(canvas, hostEl) {
      this.canvas = canvas; this.host = hostEl;
      this.isLight = !document.body.classList.contains('theme-dark');
      const bgCol = this.isLight ? 0xedf1f5 : 0x05070c;
      this.renderer = baseRenderer(canvas);
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(bgCol);
      this.scene.fog = new THREE.Fog(bgCol, 11, 30);
      this.camera = new THREE.PerspectiveCamera(40, 1, 0.1, 60);
      this.baseZ = 9;
      this.camera.position.set(0, 0.9, this.baseZ);

      this.rig = addRig(this.scene);
      if (this.isLight && this.rig.ambient) {
        this.rig.ambient.color.setHex(0xdce7d5);
        this.rig.ambient.intensity = 0.95;
        if (this.rig.key) this.rig.key.intensity = 1.05;
      }
      this.yF = -1.55;

      /* Real 3D Devices in formation */
      this.root = new THREE.Group(); this.scene.add(this.root);
      this.devices = [];
      this.addDevice(buildLaptop, { x: 0, y: -0.15, z: -1.2, spin: 0.2, bob: 0.06 });
      this.addDevice(buildPhone, { x: -2.1, y: 1.45, z: 1.1, sway: 0.3, bob: 0.18, rz: 0.12 });
      this.addDevice(buildHeadphones, { x: 2.5, y: 0.15, z: 1.5, sway: 0.35, bob: 0.14 });
      this.addDevice(buildWatch, { x: 1.35, y: 2.45, z: -1.1, sway: 0.45, bob: 0.2, rx: 0.12 });

      /* Holographic telemetry rings */
      const rings = new THREE.Group(); rings.position.set(0, 0.7, -1.6);
      const r1 = holoRing(2.8, 0.5); r1.rotation.x = 0.5;
      const r2 = dashedCircle(3.2); r2.rotation.x = 0.5;
      const r3 = holoRing(2.3, 0.35, Math.PI * 1.3); r3.rotation.x = -0.7;
      this.orb = new THREE.Mesh(new THREE.SphereGeometry(0.04, 12, 12), M.glowDot());
      rings.add(r1, r2, r3, this.orb);
      rings.userData.skipRefl = true;
      this.root.add(rings);
      this.ringSets = [r1, r2, r3];

      /* Mirror reflection of the devices */
      this.refl = new THREE.Group();
      this.devices.forEach(d => {
        const c = d.w.clone(true);
        c.traverse(o => {
          if (o.isMesh) {
            o.material = o.material.clone();
            o.material.transparent = true;
            o.material.opacity = Math.min(o.material.opacity, 1) * 0.14;
            o.material.side = THREE.DoubleSide;
          }
        });
        this.refl.add(c);
      });
      this.refl.scale.y = -1;
      this.refl.position.y = 2 * this.yF;
      this.scene.add(this.refl);

      floorKit(this.scene, this.yF, false);
      this.particles = makeParticles(isMobile() ? 150 : 380, 18, 11, 14);
      this.scene.add(this.particles);

      /* Interaction state */
      this.mouse = { x: 0, y: 0 };
      this.rotDrag = 0; this.rotVel = 0; this.dragging = false; this.lastX = 0;
      this.progress = 0; this.t = 0; this.running = false; this.rafId = null;

      this.bindInput();
      this.resize();
      window.addEventListener('resize', () => this.resize());
      if (window.ResizeObserver && this.host) {
        this.ro = new ResizeObserver(() => this.resize());
        this.ro.observe(this.host);
      }
      this.clock = new THREE.Clock();
    }

    addDevice(build, opt) {
      const w = new THREE.Group();
      w.add(typeof build === 'function' ? build() : build);
      w.position.set(opt.x, opt.y, opt.z);
      this.root.add(w);
      this.devices.push({ w, opt, phase: Math.random() * 6.28 });
    }

    bindInput() {
      const el = this.host;
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect();
        this.mouse.x = ((e.clientX - r.left) / r.width) * 2 - 1;
        this.mouse.y = ((e.clientY - r.top) / r.height) * 2 - 1;
        if (this.dragging) {
          const dx = e.clientX - this.lastX;
          this.lastX = e.clientX;
          this.rotDrag += dx * 0.005;
          this.rotVel = dx * 0.005;
        }
      });
      el.addEventListener('pointerdown', e => {
        if (e.target.closest('a,button,input')) return;
        this.dragging = true; this.lastX = e.clientX; el.setPointerCapture?.(e.pointerId);
      });
      const up = () => { this.dragging = false; };
      el.addEventListener('pointerup', up);
      el.addEventListener('pointercancel', up);
      el.addEventListener('pointerleave', up);
    }

    resize() {
      const w = this.host.clientWidth, h = this.host.clientHeight;
      if (!w || !h) return;
      this.renderer.setSize(w, h, false);
      this.camera.aspect = w / h; this.camera.updateProjectionMatrix();
      const wide = w >= 1024;
      this.root.position.x = wide ? 1.9 : 0;
      this.refl.position.x = this.root.position.x;
      this.baseZ = wide ? 9 : 12.5;
    }

    setTheme(isLight) {
      this.isLight = isLight;
      const bgCol = isLight ? 0xedf1f5 : 0x05070c;
      if (this.scene.background) this.scene.background.setHex(bgCol);
      if (this.scene.fog) this.scene.fog.color.setHex(bgCol);
      if (this.rig && this.rig.ambient) {
        if (isLight) {
          this.rig.ambient.color.setHex(0xdce7d5);
          this.rig.ambient.intensity = 0.95;
          if (this.rig.key) this.rig.key.intensity = 1.05;
        } else {
          this.rig.ambient.color.setHex(0x334455);
          this.rig.ambient.intensity = 0.55;
          if (this.rig.key) this.rig.key.intensity = 0.7;
        }
      }
    }

    setRunning(v) {
      this.running = v && !document.hidden;
      if (this.running && !this.rafId) this.loop();
    }

    loop() {
      if (!this.running) { this.rafId = null; return; }
      this.rafId = requestAnimationFrame(() => this.loop());
      const dt = Math.min(this.clock.getDelta(), 0.05);
      this.tick(dt);
    }

    tick(dt) {
      this.t += dt;
      this.rotDrag += this.rotVel; this.rotVel *= 0.94;
      const targetRotY = this.rotDrag + this.mouse.x * 0.28;
      const targetRotX = this.mouse.y * 0.18;
      this.root.rotation.y += (targetRotY - this.root.rotation.y) * 0.08;
      this.root.rotation.x += (targetRotX - this.root.rotation.x) * 0.08;
      this.refl.rotation.y = this.root.rotation.y;
      this.refl.rotation.x = -this.root.rotation.x;

      // Realistic levitation bob & sway
      this.devices.forEach((d, i) => {
        const ph = this.t * 1.3 + d.phase;
        d.w.position.y = d.opt.y + Math.sin(ph) * (d.opt.bob || 0.1);
        if (d.opt.spin) d.w.rotation.y = this.t * d.opt.spin;
        if (d.opt.sway) d.w.rotation.z = (d.opt.rz || 0) + Math.sin(ph * 0.8) * d.opt.sway * 0.2;
        if (d.opt.rx) d.w.rotation.x = d.opt.rx + Math.cos(ph * 0.6) * 0.08;
      });

      // Synchronize mirror reflections
      this.devices.forEach((d, i) => {
        if (this.refl.children[i]) syncTransforms(d.w, this.refl.children[i]);
      });

      // Telemetry orbit node
      if (this.orb) {
        this.orb.position.set(Math.cos(this.t * 1.8) * 2.8, Math.sin(this.t * 1.8) * 2.8, 0);
      }
      this.ringSets.forEach((r, idx) => {
        r.rotation.z = this.t * (idx % 2 === 0 ? 0.3 : -0.25);
      });

      // Point light trajectory
      this.rig.p1.position.set(Math.cos(this.t * 0.7) * 4, 3, Math.sin(this.t * 0.7) * 4);
      this.rig.p2.position.set(Math.cos(-this.t * 0.5 + 2) * 4, 1.5, Math.sin(-this.t * 0.5 + 2) * 4);

      this.particles.userData.tick(dt);
      this.renderer.render(this.scene, this.camera);
    }
  }

  /* ======================================================================
     VIEWER SCENE — Real 3D Studio: Orbit, Zoom, Explode, Wireframe, Lighting
     ====================================================================== */
  class ViewerScene {
    constructor(canvas, hostEl) {
      this.canvas = canvas; this.host = hostEl;
      this.isLight = !document.body.classList.contains('theme-dark');
      const bgCol = this.isLight ? 0xedf1f5 : 0x04060a;
      this.renderer = baseRenderer(canvas);
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(bgCol);
      this.scene.fog = new THREE.Fog(bgCol, 8, 24);
      this.camera = new THREE.PerspectiveCamera(38, 1, 0.1, 50);
      this.target = new THREE.Vector3(0, 0.1, 0);
      this.yF = -1.15;
      this.dist = 6.6; this.dTarget = 6.6;
      this.yaw = 0.6; this.pitch = 0.18; this.yawV = 0; this.idle = 0;
      this.turntable = true;

      this.rig = addRig(this.scene);
      if (this.isLight && this.rig.ambient) {
        this.rig.ambient.color.setHex(0xdce7d5);
        this.rig.ambient.intensity = 0.95;
        if (this.rig.key) this.rig.key.intensity = 1.05;
      }

      this.prodRoot = new THREE.Group(); this.scene.add(this.prodRoot);
      this.prod = null; this.mirror = null;

      floorKit(this.scene, this.yF, true);
      const ring = holoRing(1.8, 0.5); ring.rotation.x = Math.PI / 2; ring.position.y = this.yF + 0.02;
      const dsh = dashedCircle(2.15, 0.35); dsh.rotation.x = Math.PI / 2; dsh.position.y = this.yF + 0.02;
      this.scene.add(ring, dsh);
      this.baseRing = ring;
      this.particles = makeParticles(130, 12, 8, 10); this.scene.add(this.particles);

      this.isExploded = false;
      this.explodeProgress = 0;
      this.isWireframe = false;
      this.currentLighting = 'cyber';

      this.pointers = new Map(); this.pinchD = 0;
      this.running = false; this.rafId = null; this.t = 0;
      this.bindInput();
      this.resize();
      window.addEventListener('resize', () => this.resize());
      if (window.ResizeObserver && this.host) {
        this.ro = new ResizeObserver(() => this.resize());
        this.ro.observe(this.host);
      }
      this.clock = new THREE.Clock();
    }

    bindInput() {
      const el = this.canvas;
      el.style.touchAction = 'none';
      el.addEventListener('pointerdown', e => {
        try { el.setPointerCapture(e.pointerId); } catch (_) {}
        this.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
        if (this.pointers.size === 2) {
          const [a, b] = [...this.pointers.values()];
          this.pinchD = Math.hypot(a.x - b.x, a.y - b.y);
        }
        this.idle = 0;
      });
      el.addEventListener('pointermove', e => {
        if (!this.pointers.has(e.pointerId)) return;
        const prev = this.pointers.get(e.pointerId);
        const dx = e.clientX - prev.x, dy = e.clientY - prev.y;
        this.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
        if (this.pointers.size === 1) {
          this.yaw -= dx * 0.0055; this.yawV = -dx * 0.0055;
          this.pitch = THREE.MathUtils.clamp(this.pitch + dy * 0.004, -0.2, 0.95);
        } else if (this.pointers.size === 2) {
          const [a, b] = [...this.pointers.values()];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (this.pinchD && d > 0) this.dTarget = THREE.MathUtils.clamp(this.dTarget * (this.pinchD / d), 3.2, 10.0);
          this.pinchD = d;
        }
        this.idle = 0;
      });
      const up = e => {
        try { if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId); } catch (_) {}
        this.pointers.delete(e.pointerId);
        this.pinchD = 0;
      };
      el.addEventListener('pointerup', up);
      el.addEventListener('pointercancel', up);
      window.addEventListener('pointerup', up);
      el.addEventListener('wheel', e => {
        e.preventDefault();
        this.dTarget = THREE.MathUtils.clamp(this.dTarget + e.deltaY * 0.004, 3.2, 10.0);
        this.idle = 0;
      }, { passive: false });
    }

    setProduct(key) {
      const dispose = g => g.traverse(o => {
        if (o.isMesh) {
          o.geometry.dispose();
          if (Array.isArray(o.material)) o.material.forEach(m => m.dispose());
          else if (o.material) o.material.dispose();
        }
      });
      if (this.prod) { dispose(this.prod); this.prodRoot.remove(this.prod); }
      if (this.mirror) { dispose(this.mirror); this.scene.remove(this.mirror); }

      const s = { phone: 1.05, buds: 1.15, watch: 1.25, laptop: 0.95, console: 0.9 }[key] || 1;
      const builder = BUILDERS[key] || BUILDERS.phone;
      const b = builder();
      b.scale.setScalar(s);
      this.prodRoot.add(b); this.prod = b;

      this.mirror = mirroredClone(b, 0, 0.15);
      this.mirror.position.y = this.yF * 2;
      this.mirror.scale.y = -1;
      this.scene.add(this.mirror);

      this.isExploded = false;
      this.explodeProgress = 0;
      if (this.isWireframe) applyWireframe(this.prod, true);

      if (window.gsap) {
        gsap.fromTo(b.scale, { x: s * 0.3, y: s * 0.3, z: s * 0.3 }, { x: s, y: s, z: s, duration: 0.85, ease: 'back.out(1.6)' });
        if (this.baseRing) gsap.fromTo(this.baseRing.scale, { x: 0.5, y: 1, z: 0.5 }, { x: 1, y: 1, z: 1, duration: 0.9, ease: 'elastic.out(1,0.6)' });
      }
    }

    setExploded(v) {
      this.isExploded = v;
      if (window.gsap) {
        gsap.to(this, {
          explodeProgress: v ? 1 : 0,
          duration: 0.8,
          ease: 'power3.inOut',
          onUpdate: () => {
            applyExplode(this.prod, this.explodeProgress);
            if (this.mirror && this.mirror.children[0]) applyExplode(this.mirror.children[0], this.explodeProgress);
          }
        });
      } else {
        this.explodeProgress = v ? 1 : 0;
        applyExplode(this.prod, this.explodeProgress);
      }
    }

    setWireframe(v) {
      this.isWireframe = v;
      applyWireframe(this.prod, v);
      if (this.mirror) applyWireframe(this.mirror, v);
    }

    setTurntable(v) {
      this.turntable = v;
    }

    setLightingPreset(preset) {
      this.currentLighting = preset;
      if (!this.rig) return;
      if (preset === 'cyber') {
        this.rig.p1.color.setHex(0x74c418); this.rig.p1.intensity = 1.6;
        this.rig.p2.color.setHex(0x00e5ff); this.rig.p2.intensity = 1.4;
        this.rig.key.color.setHex(0xdce7d5); this.rig.key.intensity = 0.9;
        this.rig.ambient.color.setHex(0x1a2634);
      } else if (preset === 'studio') {
        this.rig.p1.color.setHex(0xffffff); this.rig.p1.intensity = 0.9;
        this.rig.p2.color.setHex(0xe0f2fe); this.rig.p2.intensity = 0.7;
        this.rig.key.color.setHex(0xffffff); this.rig.key.intensity = 1.3;
        this.rig.ambient.color.setHex(0x475569);
      } else if (preset === 'sunset') {
        this.rig.p1.color.setHex(0xf59e0b); this.rig.p1.intensity = 1.8;
        this.rig.p2.color.setHex(0xd97706); this.rig.p2.intensity = 1.2;
        this.rig.key.color.setHex(0xfef3c7); this.rig.key.intensity = 1.2;
        this.rig.ambient.color.setHex(0x382416);
      } else if (preset === 'neutral') {
        this.rig.p1.color.setHex(0xffffff); this.rig.p1.intensity = 0.6;
        this.rig.p2.color.setHex(0xffffff); this.rig.p2.intensity = 0.6;
        this.rig.key.color.setHex(0xffffff); this.rig.key.intensity = 1.1;
        this.rig.ambient.color.setHex(0x64748b);
      }
    }

    resize() {
      const w = this.host.clientWidth, h = this.host.clientHeight;
      if (!w || !h) return;
      this.renderer.setSize(w, h, false);
      this.camera.aspect = w / h; this.camera.updateProjectionMatrix();
    }

    setTheme(isLight) {
      this.isLight = isLight;
      const bgCol = isLight ? 0xedf1f5 : 0x04060a;
      if (this.scene.background) this.scene.background.setHex(bgCol);
      if (this.scene.fog) this.scene.fog.color.setHex(bgCol);
      if (this.rig && this.rig.ambient) {
        if (isLight) {
          this.rig.ambient.color.setHex(0xdce7d5);
          this.rig.ambient.intensity = 0.95;
          if (this.rig.key) this.rig.key.intensity = 1.05;
        } else {
          this.rig.ambient.color.setHex(0x334455);
          this.rig.ambient.intensity = 0.55;
          if (this.rig.key) this.rig.key.intensity = 0.7;
        }
      }
    }

    setRunning(v) {
      this.running = v && !document.hidden;
      if (this.running && !this.rafId) this.loop();
    }

    loop() {
      if (!this.running) { this.rafId = null; return; }
      this.rafId = requestAnimationFrame(() => this.loop());
      const dt = Math.min(this.clock.getDelta(), 0.05);
      this.tick(dt);
    }

    tick(dt) {
      this.t += dt;
      this.idle += dt;
      if (this.turntable && this.idle > 1.2) this.yaw += dt * 0.38;
      this.yaw += this.yawV; this.yawV *= 0.92;
      this.dist += (this.dTarget - this.dist) * 0.08;
      this.camera.position.set(
        this.target.x + this.dist * Math.sin(this.yaw) * Math.cos(this.pitch),
        this.target.y + this.dist * Math.sin(this.pitch),
        this.target.z + this.dist * Math.cos(this.yaw) * Math.cos(this.pitch)
      );
      this.camera.lookAt(this.target);

      if (this.prod && this.mirror) syncTransforms(this.prod, this.mirror.children[0]);
      if (this.baseRing) this.baseRing.rotation.z = this.t * 0.4;
      this.particles.userData.tick(dt);
      this.renderer.render(this.scene, this.camera);
    }
  }

  /* ======================================================================
     UNIVERSAL MODAL 3D VIEWER — Instant Inspection For Any Catalog Product
     ====================================================================== */
  class ModalViewer extends ViewerScene {
    constructor(canvas, hostEl) {
      super(canvas, hostEl);
      this.dist = 5.8; this.dTarget = 5.8;
      this.yaw = 0.4; this.pitch = 0.15;
    }
  }

  return { HeroScene, ViewerScene, ModalViewer, BUILDERS, applyExplode, applyWireframe };
})();