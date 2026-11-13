/* ==========================================================================
   GROUND X — wireframe terrain (Three.js)
   Draws the real Shackleton Rim elevation grid (assets/data/terrain.js) as a
   glowing wireframe, optionally switching to the team's slope-class map draped
   over the same surface (both come from the same NASA Site04 5 m/px grid).
   Usage: GX.mountTerrain(containerEl, { interactive, camera: "hero"|"footer" })
   ========================================================================== */
(function () {
  "use strict";
  window.GX = window.GX || {};
  const T = window.THREE, DEM = window.SHACKLETON_DEM;
  if (!T || !DEM) { GX.mountTerrain = () => null; return; }

  const BG = 0x232322;
  const LOW = new T.Color(0x7d725f), MID = new T.Color(0xb3a68c), HIGH = new T.Color(0xd7ffc5);
  const canTexture = location.protocol !== "file:";

  function webgl() {
    try { const c = document.createElement("canvas"); return !!(c.getContext("webgl2") || c.getContext("webgl")); } catch (e) { return false; }
  }

  GX.mountTerrain = function (host, opts = {}) {
    if (!host || !webgl()) return null;
    const R = DEM.rows, C = DEM.cols, Z = DEM.z;
    const SIZE = 16;                               // world units across (≈ km)
    const dx = SIZE / (C - 1), dz = (SIZE * R / C) / (R - 1);
    const zMin = DEM.min, zMax = DEM.max, span = zMax - zMin;
    const EXAG = opts.exaggeration || 1.1;
    const hAt = (i, j) => ((Z[i * C + j] - zMin) / 1000) * EXAG;
    const colorAt = (i, j, out) => {
      const t = (Z[i * C + j] - zMin) / span;
      return t < 0.5 ? out.copy(LOW).lerp(MID, t / 0.5) : out.copy(MID).lerp(HIGH, (t - 0.5) / 0.5);
    };
    const X0 = -SIZE / 2, Z0 = -(dz * (R - 1)) / 2;

    const renderer = new T.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.outputEncoding = T.sRGBEncoding;
    renderer.domElement.className = "terrain__gl";
    renderer.domElement.setAttribute("aria-hidden", "true");
    host.appendChild(renderer.domElement);

    const scene = new T.Scene();
    scene.fog = opts.camera === "footer" ? new T.Fog(BG, 14, 34) : new T.Fog(BG, 7, 22);
    const camera = new T.PerspectiveCamera(opts.camera === "footer" ? 40 : 46, 1, 0.1, 100);

    const world = new T.Group();
    scene.add(world);

    /* --- wireframe: grid lines along both axes, coloured by height --- */
    const STEP = opts.step || 2;
    const pos = [], col = [], c = new T.Color();
    const push = (i, j) => { pos.push(X0 + j * dx, hAt(i, j), Z0 + i * dz); colorAt(i, j, c); col.push(c.r, c.g, c.b); };
    for (let i = 0; i < R; i += STEP) for (let j = 0; j + STEP < C; j += STEP) { push(i, j); push(i, j + STEP); }
    for (let j = 0; j < C; j += STEP) for (let i = 0; i + STEP < R; i += STEP) { push(i, j); push(i + STEP, j); }
    const lg = new T.BufferGeometry();
    lg.setAttribute("position", new T.Float32BufferAttribute(pos, 3));
    lg.setAttribute("color", new T.Float32BufferAttribute(col, 3));
    const lineMat = new T.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.5, fog: true });
    const wire = new T.LineSegments(lg, lineMat);
    world.add(wire);

    /* --- surface with the slope-class map (footer toggle) --- */
    let surface = null;
    if (opts.surface && canTexture) {
      const g = new T.PlaneGeometry(SIZE, dz * (R - 1), C - 1, R - 1);
      g.rotateX(-Math.PI / 2);
      const p = g.attributes.position;
      for (let i = 0; i < R; i++) for (let j = 0; j < C; j++) p.setY(i * C + j, hAt(i, j));
      g.computeVertexNormals();
      const tex = new T.TextureLoader().load(opts.surface);
      tex.encoding = T.sRGBEncoding; tex.anisotropy = 8;
      surface = new T.Mesh(g, new T.MeshLambertMaterial({ map: tex, transparent: true, opacity: 0 }));
      surface.visible = false;
      world.add(surface);
      const sun = new T.DirectionalLight(0xffffff, 1.6); sun.position.set(-6, 8, 4); scene.add(sun);
      scene.add(new T.AmbientLight(0xffffff, 0.45));
    }

    world.position.y = -((0 - zMin) / 1000) * EXAG * 0.35;

    /* --- camera presets --- */
    const presets = {
      hero:   { pos: new T.Vector3(0, 4.6, 9.8), look: new T.Vector3(0, 0.4, -4) },
      footer: { pos: new T.Vector3(0, 10.5, 15), look: new T.Vector3(0, -0.5, 0) }
    };
    const P = presets[opts.camera] || presets.hero;
    camera.position.copy(P.pos);

    function resize() {
      const w = Math.max(1, host.clientWidth), h = Math.max(1, host.clientHeight);
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      // keep the whole width of the terrain in view on narrow screens
      camera.zoom = Math.min(1, (w / h) / 1.6) * (opts.zoom || 1);
      camera.updateProjectionMatrix();
    }
    new ResizeObserver(resize).observe(host);
    resize();

    try { renderer.compile(scene, camera); } catch (e) {}

    /* --- interaction: drag to rotate (yaw) / tilt (pitch), with inertia + auto drift --- */
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let mx = 0, my = 0, ax = 0, ay = 0, visible = false, rise = reduced ? 1 : 0, riseTarget = reduced ? 1 : 0;
    let yaw = 0, yawVel = 0, pitch = 0, pitchTarget = 0, autoDir = 1, dragging = false, lastUser = -99;
    window.addEventListener("pointermove", (e) => {
      mx = e.clientX / window.innerWidth - 0.5;
      my = e.clientY / window.innerHeight - 0.5;
    }, { passive: true });
    new IntersectionObserver((en) => {
      visible = en[0].isIntersecting;
      if (visible) riseTarget = 1;          // terrain "grows" the first time it is seen
    }, { threshold: 0.05 }).observe(host);

    if (opts.interactive !== false) {
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
    }

    const clock = new T.Clock();
    const v = new T.Vector3(), base = P.pos.clone().sub(P.look);
    let mode = "wire", blend = 0;
    function frame() {
      requestAnimationFrame(frame);
      const dt = Math.min(clock.getDelta(), 0.05);
      if (!visible) return;
      const t = clock.elapsedTime;
      rise += (riseTarget - rise) * (reduced ? 1 : dt * 1.4);
      world.scale.y = 0.02 + 0.98 * easeOut(rise);
      ax += (mx - ax) * 0.04; ay += (my - ay) * 0.04;
      if (!dragging && !reduced) {
        yaw += yawVel; yawVel *= 0.95;                         // inertia
        if (t - lastUser > 2.5) yaw += autoDir * dt * 0.07;    // gentle auto drift in the last dragged direction
        if (t - lastUser > 6) pitchTarget += (Math.sin(t * 0.11) * 0.12 - pitchTarget) * dt * 0.3; // slow "fly-over" bob
      }
      pitch += (pitchTarget - pitch) * 0.08;
      world.rotation.y = yaw + ax * 0.25;
      v.copy(base).applyAxisAngle(AXIS_X, -pitch);              // tilt the camera around the look point
      camera.position.copy(P.look).add(v);
      camera.position.x += ax * 1.2; camera.position.y -= ay * 0.9;
      camera.lookAt(P.look);
      const target = mode === "surface" ? 1 : 0;               // cross-fade wire <-> slope surface
      blend += (target - blend) * Math.min(1, dt * 4);
      lineMat.opacity = 0.5 * (1 - blend) + 0.14 * blend;
      if (surface) { surface.visible = blend > 0.01; surface.material.opacity = blend; }
      renderer.render(scene, camera);
    }
    const AXIS_X = new T.Vector3(1, 0, 0);
    const easeOut = (x) => 1 - Math.pow(1 - x, 3);
    frame();

    return {
      setMode(m) { mode = m === "surface" && surface ? "surface" : "wire"; },
      /* direction buttons: spin left/right, tilt up/down */
      nudge(dir) {
        lastUser = clock.elapsedTime;
        if (dir === "left")  { yawVel = -0.06; autoDir = -1; }
        if (dir === "right") { yawVel = 0.06; autoDir = 1; }
        if (dir === "up")    pitchTarget = Math.min(0.55, pitchTarget + 0.18);
        if (dir === "down")  pitchTarget = Math.max(-0.45, pitchTarget - 0.18);
      },
      hasSurface: !!surface
    };
  };
})();
