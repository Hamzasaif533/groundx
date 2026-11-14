/* ==========================================================================
   GROUND X, 3D terrain (Three.js)
   Renders a real elevation grid (Shackleton Site04 or Haughton) as a
   wireframe, as the team's slope-class map draped over the surface, or as
   shaded relief. Interaction is drag-only: hold and move to rotate / tilt.
   Usage: GX.mountTerrain(el, { dem, camera, drapes: {name: imageUrl}, relief, elevation, wire, exaggeration, zoom })
   ========================================================================== */
(function () {
  "use strict";
  window.GX = window.GX || {};
  const T = window.THREE;
  if (!T) { GX.mountTerrain = () => null; return; }

  const isLight = () => document.documentElement.dataset.theme === "light";
  const PAL = {
    dark: { bg: 0x232322, low: new T.Color(0x7d725f), mid: new T.Color(0xb3a68c), high: new T.Color(0xd7ffc5) },
    light: { bg: 0xe5dccb, low: new T.Color(0xb3a68a), mid: new T.Color(0x75664c), high: new T.Color(0x17633a) }
  };
  const pal = () => PAL[isLight() ? "light" : "dark"];
  const live = [];                                   // every mounted terrain re-themes itself on toggle
  GX.setTerrainTheme = () => live.forEach((fn) => fn());
  const canTexture = location.protocol !== "file:";
  const AXIS_X = new T.Vector3(1, 0, 0);
  const easeOut = (x) => 1 - Math.pow(1 - x, 3);

  function webgl() {
    try { const c = document.createElement("canvas"); return !!(c.getContext("webgl2") || c.getContext("webgl")); } catch (e) { return false; }
  }

  GX.mountTerrain = function (host, opts = {}) {
    const DEM = opts.dem || window.SHACKLETON_DEM;
    if (!host || !DEM || !webgl()) return null;
    const R = DEM.rows, C = DEM.cols, Z = DEM.z, SC = DEM.scale || 1;
    const val = (i, j) => { const v = Z[i * C + j]; return v == null ? null : v * SC; };
    const SIZE = 16;
    const dx = SIZE / (C - 1), dz = (SIZE * R / C) / (R - 1);
    let zMin = Infinity, zMax = -Infinity;
    for (let k = 0; k < Z.length; k++) if (Z[k] != null) { const v = Z[k] * SC; if (v < zMin) zMin = v; if (v > zMax) zMax = v; }
    const span = zMax - zMin || 1;
    const EXAG = opts.exaggeration || 1.1;
    const hAt = (i, j) => { const v = val(i, j); return v == null ? 0 : ((v - zMin) / 1000) * EXAG; };
    const colorAt = (i, j, out) => {
      const t = (val(i, j) - zMin) / span, P = pal();
      return t < 0.5 ? out.copy(P.low).lerp(P.mid, t / 0.5) : out.copy(P.mid).lerp(P.high, (t - 0.5) / 0.5);
    };
    const X0 = -SIZE / 2, Z0 = -(dz * (R - 1)) / 2;

    const renderer = new T.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.outputEncoding = T.sRGBEncoding;
    renderer.domElement.className = "terrain__gl";
    renderer.domElement.setAttribute("aria-hidden", "true");
    host.appendChild(renderer.domElement);

    const scene = new T.Scene();
    const isFooter = opts.camera === "footer";
    scene.fog = isFooter ? new T.Fog(pal().bg, 14, 34) : new T.Fog(pal().bg, 18, 40);
    const camera = new T.PerspectiveCamera(isFooter ? 40 : 38, 1, 0.1, 100);
    const world = new T.Group();
    scene.add(world);

    /* --- wireframe: grid lines coloured by height; gaps where there is no data --- */
    const STEP = opts.step || 2;
    const pos = [], col = [], ij = [], c = new T.Color();
    const push = (i, j) => { pos.push(X0 + j * dx, hAt(i, j), Z0 + i * dz); colorAt(i, j, c); col.push(c.r, c.g, c.b); ij.push(i, j); };
    const seg = (i1, j1, i2, j2) => { if (val(i1, j1) == null || val(i2, j2) == null) return; push(i1, j1); push(i2, j2); };
    for (let i = 0; i < R; i += STEP) for (let j = 0; j + STEP < C; j += STEP) seg(i, j, i, j + STEP);
    for (let j = 0; j < C; j += STEP) for (let i = 0; i + STEP < R; i += STEP) seg(i, j, i + STEP, j);
    const lg = new T.BufferGeometry();
    lg.setAttribute("position", new T.Float32BufferAttribute(pos, 3));
    lg.setAttribute("color", new T.Float32BufferAttribute(col, 3));
    const lineMat = new T.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.5, fog: true });
    const wireMesh = new T.LineSegments(lg, lineMat);
    live.push(() => {
      scene.fog.color.setHex(pal().bg);
      const ca = lg.attributes.color;
      for (let k = 0; k < ij.length / 2; k++) { colorAt(ij[2 * k], ij[2 * k + 1], c); ca.setXYZ(k, c.r, c.g, c.b); }
      ca.needsUpdate = true;
    });
    const useWire = opts.wire !== false;
    if (useWire) world.add(wireMesh);

    /* --- surface geometry (shared by the slope-map and relief modes) --- */
    const g = new T.PlaneGeometry(SIZE, dz * (R - 1), C - 1, R - 1);
    g.rotateX(-Math.PI / 2);
    const p = g.attributes.position;
    for (let i = 0; i < R; i++) for (let j = 0; j < C; j++) p.setY(i * C + j, hAt(i, j));
    if (Z.some((v) => v == null)) {           // drop triangles that touch "no data" cells
      const idx = g.index.array, keep = [];
      for (let k = 0; k < idx.length; k += 3) {
        if (Z[idx[k]] != null && Z[idx[k + 1]] != null && Z[idx[k + 2]] != null) keep.push(idx[k], idx[k + 1], idx[k + 2]);
      }
      g.setIndex(keep);
    }
    g.computeVertexNormals();
    const sun = new T.DirectionalLight(0xffffff, 1.5); sun.position.set(-6, 8, 4); scene.add(sun);
    scene.add(new T.AmbientLight(0xffffff, 0.42));

    const layers = {};
    const drapes = Object.assign({}, opts.drapes || {});
    if (opts.surface) drapes.slope = opts.surface;            // older option name
    if (canTexture) Object.entries(drapes).forEach(([name, url]) => {
      const tex = new T.TextureLoader().load(url);
      tex.encoding = T.sRGBEncoding; tex.anisotropy = 8;
      layers[name] = new T.Mesh(g, new T.MeshLambertMaterial({ map: tex, transparent: true, opacity: 0 }));
    });
    if (opts.elevation) {                                        // hypsometric colours generated from the grid itself
      const cv = document.createElement("canvas"); cv.width = C; cv.height = R;
      const cx = cv.getContext("2d"), im = cx.createImageData(C, R);
      const stops = [[0, [24, 52, 86]], [.22, [36, 104, 118]], [.45, [118, 150, 104]], [.65, [200, 170, 104]], [.85, [222, 130, 80]], [1, [248, 240, 228]]];
      for (let i = 0; i < R; i++) for (let j = 0; j < C; j++) {
        const o = (i * C + j) * 4, v = val(i, j);
        if (v == null) { im.data[o + 3] = 0; continue; }
        const tt = (v - zMin) / span; let k = 1; while (k < stops.length - 1 && stops[k][0] < tt) k++;
        const [a0, c0] = stops[k - 1], [a1, c1] = stops[k], f = (tt - a0) / (a1 - a0 || 1);
        for (let q = 0; q < 3; q++) im.data[o + q] = c0[q] + (c1[q] - c0[q]) * f;
        im.data[o + 3] = 255;
      }
      cx.putImageData(im, 0, 0);
      const tex = new T.CanvasTexture(cv); tex.encoding = T.sRGBEncoding; tex.flipY = true;
      layers.elevation = new T.Mesh(g, new T.MeshLambertMaterial({ map: tex, transparent: true, opacity: 0 }));
    }
    if (opts.relief) layers.relief = new T.Mesh(g, new T.MeshLambertMaterial({ color: 0xbdb3a0, transparent: true, opacity: 0 }));
    Object.values(layers).forEach((m) => { m.visible = false; world.add(m); });

    world.position.y = -EXAG * (span / 1000) * 0.35;

    const presets = {
      footer: { pos: new T.Vector3(0, 10.5, 15), look: new T.Vector3(0, -0.5, 0) },
      explore: { pos: new T.Vector3(0, 12.5, 19), look: new T.Vector3(0, -0.6, 0) }
    };
    const P = presets[opts.camera] || presets.explore;
    camera.position.copy(P.pos);

    function resize() {
      const w = Math.max(1, host.clientWidth), h = Math.max(1, host.clientHeight);
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.zoom = Math.min(1, (w / h) / 1.6) * (opts.zoom || 1);
      camera.updateProjectionMatrix();
    }
    new ResizeObserver(resize).observe(host);
    resize();
    try { renderer.compile(scene, camera); } catch (e) {}

    /* --- drag-only interaction: hold + move to rotate (yaw) and tilt (pitch), with inertia --- */
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let visible = false, rise = reduced ? 1 : 0, riseTarget = reduced ? 1 : 0;
    let yaw = 0, yawVel = 0, pitch = 0, pitchTarget = 0, autoDir = 1, dragging = false, lastUser = -99;
    new IntersectionObserver((en) => { visible = en[0].isIntersecting; if (visible) riseTarget = 1; }, { threshold: 0.05 }).observe(host);

    const clock = new T.Clock();
    const el = renderer.domElement;
    el.classList.add("is-draggable");
    el.setAttribute("data-cursor", "");
    let lx = 0, ly = 0;
    el.addEventListener("pointerdown", (e) => { dragging = true; lx = e.clientX; ly = e.clientY; yawVel = 0; el.setPointerCapture(e.pointerId); host.classList.add("is-dragging"); });
    el.addEventListener("pointermove", (e) => {
      if (!dragging) return;
      const dxp = e.clientX - lx, dyp = e.clientY - ly; lx = e.clientX; ly = e.clientY;
      yaw += dxp * 0.006; yawVel = dxp * 0.006;
      pitchTarget = Math.max(-0.45, Math.min(0.55, pitchTarget + dyp * 0.004));
      if (Math.abs(dxp) > 1) autoDir = dxp > 0 ? 1 : -1;
      lastUser = clock.elapsedTime;
    });
    const end = () => { dragging = false; host.classList.remove("is-dragging"); };
    el.addEventListener("pointerup", end); el.addEventListener("pointercancel", end);

    const v = new T.Vector3(), base = P.pos.clone().sub(P.look);
    let mode = opts.mode || (useWire ? "wire" : Object.keys(layers)[0]);
    const blend = { wire: mode === "wire" ? 1 : 0 };
    Object.keys(layers).forEach((m) => { blend[m] = m === mode ? 1 : 0; });
    function frame() {
      requestAnimationFrame(frame);
      const dt = Math.min(clock.getDelta(), 0.05);
      if (!visible) return;
      const t = clock.elapsedTime;
      rise += (riseTarget - rise) * (reduced ? 1 : dt * 1.4);
      world.scale.y = 0.02 + 0.98 * easeOut(rise);
      if (!dragging && !reduced) {
        yaw += yawVel; yawVel *= 0.95;
        if (t - lastUser > 2.5) yaw += autoDir * dt * 0.07;
      }
      pitch += (pitchTarget - pitch) * 0.08;
      world.rotation.y = yaw;
      v.copy(base).applyAxisAngle(AXIS_X, -pitch);
      camera.position.copy(P.look).add(v);
      camera.lookAt(P.look);
      const k = Math.min(1, dt * 4);
      Object.keys(blend).forEach((m) => { blend[m] += ((mode === m ? 1 : 0) - blend[m]) * k; });
      lineMat.opacity = useWire ? 0.5 * blend.wire + (opts.wireOverlay === false ? 0 : 0.14) * (1 - blend.wire) : 0;
      wireMesh.visible = lineMat.opacity > 0.005;
      Object.entries(layers).forEach(([m, mesh]) => { mesh.visible = blend[m] > 0.01; mesh.material.opacity = blend[m]; });
      renderer.render(scene, camera);
    }
    frame();

    return {
      setMode(m) { if (m === "surface") m = "slope"; if ((m === "wire" && useWire) || layers[m]) mode = m; },
      get mode() { return mode; },
      modes: Object.keys(layers),
      hasSurface: !!layers.slope
    };
  };
})();
