/* ==========================================================================
   GROUND X — 3D globes for the hero (Three.js)
   Each sphere follows the size/position of its .orb element, so layout and
   GSAP animations (entrance, float, scroll) stay in CSS/app.js.
   Drag a planet to spin it (with inertia); it keeps slowly rotating on its own.
   Falls back to the CSS globes when WebGL or http(s) is unavailable
   (browsers block WebGL textures on file:// pages).
   Textures: Solar System Scope (CC BY 4.0), based on NASA data.
   ========================================================================== */
(function () {
  "use strict";
  const host = document.querySelector(".twins");
  if (!host || !window.THREE || location.protocol === "file:") return;
  const T = window.THREE;

  try {
    const test = document.createElement("canvas");
    if (!(test.getContext("webgl2") || test.getContext("webgl"))) return;
  } catch (e) { return; }

  const canvas = document.createElement("canvas");
  canvas.className = "twins__gl";
  canvas.setAttribute("aria-hidden", "true");
  host.prepend(canvas);

  const renderer = new T.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.outputEncoding = T.sRGBEncoding;

  const scene = new T.Scene();
  const camera = new T.OrthographicCamera(0, 1, 0, -1, -5000, 5000);

  // Neutral sunlight from the upper-left front -> soft terminator on the right. No coloured atmosphere.
  const sun = new T.DirectionalLight(0xffffff, 1.9);
  sun.position.set(-1.1, 0.7, 1.0);
  scene.add(sun);
  scene.add(new T.AmbientLight(0xffffff, 0.1));

  const manager = new T.LoadingManager();
  manager.onLoad = () => host.classList.add("is-3d");
  const loader = new T.TextureLoader(manager);
  const base = "assets/img/planets/";
  const tex = (name) => {
    const t = loader.load(base + name);
    t.encoding = T.sRGBEncoding;
    t.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
    return t;
  };
  const lin = (name) => { const t = loader.load(base + name); t.anisotropy = 4; return t; };

  // Thin atmosphere: a faint limb glow (front) plus a soft halo just outside the disc (back faces).
  function haze(color, strength, scale, power, back) {
    // view direction is +Z (orthographic camera). Front: brightens toward the limb.
    // Back (halo just outside the disc): strongest at the planet's edge, fading to 0 at the halo's outer edge.
    const reach = Math.sqrt(1 - 1 / (scale * scale));
    const m = new T.Mesh(new T.SphereGeometry(scale, 48, 36), new T.ShaderMaterial({
      uniforms: { c: { value: new T.Color(color) }, s: { value: strength }, p: { value: power }, r: { value: reach }, o: { value: 1 } },
      vertexShader: "varying vec3 vN; void main(){ vN = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",
      fragmentShader: back
        ? "uniform vec3 c; uniform float s; uniform float p; uniform float r; uniform float o; varying vec3 vN; void main(){ float t = clamp(-vN.z / r, 0.0, 1.0); gl_FragColor = vec4(c, pow(t, p) * s * o); }"
        : "uniform vec3 c; uniform float s; uniform float p; uniform float r; uniform float o; varying vec3 vN; void main(){ float f = pow(1.0 - clamp(vN.z, 0.0, 1.0), p) * s; gl_FragColor = vec4(c, f * o); }",
      transparent: true, depthWrite: false, blending: T.AdditiveBlending, side: back ? T.BackSide : T.FrontSide
    }));
    m.userData.haze = true;
    return m;
  }

  const geo = new T.SphereGeometry(1, 72, 54);
  const BODIES = [
    { sel: ".orb--moon", spin: 0.045, tilt: 0.12, start: 2.2, build: () => {
      const map = tex("moon.webp");
      return [new T.Mesh(geo, new T.MeshLambertMaterial({ map, bumpMap: map, bumpScale: 0.035, transparent: true }))];   // the Moon has no air
    } },
    { sel: ".orb--mars", spin: 0.07, tilt: 0.44, start: 4.0, build: () => {
      const map = tex("mars.webp");
      return [new T.Mesh(geo, new T.MeshLambertMaterial({ map, bumpMap: map, bumpScale: 0.03, transparent: true })),
        haze(0xf2b48a, 0.22, 1.004, 3.5, false), haze(0xe9a27a, 0.28, 1.03, 2.2, true)];
    } },
    { sel: ".orb--earth", spin: 0.06, tilt: 0.41, start: 4.4, build: () => {
      const earth = new T.Mesh(geo, new T.MeshLambertMaterial({ map: tex("earth.webp"), transparent: true, color: 0xe8e8e0 }));
      const clouds = new T.Mesh(new T.SphereGeometry(1.01, 64, 48), new T.MeshLambertMaterial({ color: 0xffffff, alphaMap: lin("clouds.webp"), transparent: true, opacity: 0.85, depthWrite: false }));
      clouds.userData.clouds = true;
      return [earth, clouds, haze(0xcfe2ff, 0.3, 1.012, 3.2, false), haze(0xb7d2ff, 0.38, 1.045, 2.2, true)];
    } }
  ];

  const bodies = BODIES.map((b) => {
    const el = host.querySelector(b.sel);
    if (!el) return null;
    const group = new T.Group();   // position + scale from the DOM box
    const drag = new T.Group();    // user rotation (drag) + pointer parallax
    const spinner = new T.Group(); // axial tilt + self rotation
    spinner.rotation.z = b.tilt;
    const parts = b.build();
    parts.forEach((p) => { if (p.userData.haze) { drag.add(p); return; } p.rotation.y = b.start; spinner.add(p); });
    drag.add(spinner); group.add(drag); scene.add(group);
    const s = { ...b, el, group, drag, spinner, parts, vx: 0, vy: 0, rx: 0, ry: 0, dragging: false };
    bindDrag(s);
    return s;
  }).filter(Boolean);

  /* ---------------- drag to spin ---------------- */
  let anyDrag = false;
  function bindDrag(b) {
    const el = b.el;
    el.classList.add("is-draggable");
    el.setAttribute("data-cursor", "");
    let lx = 0, ly = 0, lt = 0;
    el.addEventListener("pointerdown", (e) => {
      b.dragging = anyDrag = true; lx = e.clientX; ly = e.clientY; lt = performance.now();
      b.vx = b.vy = 0;
      el.setPointerCapture(e.pointerId);
      el.classList.add("is-dragging");
    });
    el.addEventListener("pointermove", (e) => {
      if (!b.dragging) return;
      const now = performance.now(), dt = Math.max(16, now - lt);
      const dx = e.clientX - lx, dy = e.clientY - ly;
      const k = 3 / Math.max(80, el.getBoundingClientRect().width); // ~1 turn per 2 widths
      b.ry += dx * k; b.rx = Math.max(-1.1, Math.min(1.1, b.rx + dy * k));
      b.vx = (dy * k) / dt * 16; b.vy = (dx * k) / dt * 16;
      lx = e.clientX; ly = e.clientY; lt = now;
    });
    const end = () => { b.dragging = false; anyDrag = bodies.some((o) => o.dragging); el.classList.remove("is-dragging"); };
    el.addEventListener("pointerup", end);
    el.addEventListener("pointercancel", end);
  }

  /* ---------------- sizing ---------------- */
  let rect = canvas.getBoundingClientRect();
  function resize() {
    rect = canvas.getBoundingClientRect();
    const W = Math.max(1, rect.width), H = Math.max(1, rect.height);
    renderer.setSize(W, H, false);
    camera.left = 0; camera.right = W; camera.top = 0; camera.bottom = -H;
    camera.updateProjectionMatrix();
  }
  new ResizeObserver(resize).observe(canvas);
  resize();

  /* ---------------- pointer parallax + scroll boost ---------------- */
  let tx = 0, ty = 0, cx = 0, cy = 0, boost = 0;
  window.addEventListener("pointermove", (e) => {
    if (anyDrag) return;
    tx = (e.clientX / window.innerWidth - 0.5) * 0.5;
    ty = (e.clientY / window.innerHeight - 0.5) * 0.3;
  }, { passive: true });
  window.GXGlobes = { boost: (v) => { boost = Math.max(boost, v); } };

  let visible = true;
  new IntersectionObserver((en) => { visible = en[0].isIntersecting; }, { threshold: 0 }).observe(host);

  // compile all shaders now (before the intro animation starts) instead of on the first frame
  try { renderer.compile(scene, camera); } catch (e) {}

  /* ---------------- loop ---------------- */
  const clock = new T.Clock();
  function frame() {
    requestAnimationFrame(frame);
    const dt = Math.min(clock.getDelta(), 0.05);
    if (!visible) return;
    rect = canvas.getBoundingClientRect();
    cx += (tx - cx) * 0.05; cy += (ty - cy) * 0.05;
    boost *= 0.94;
    bodies.forEach((b) => {
      const r = b.el.getBoundingClientRect();
      const op = parseFloat(getComputedStyle(b.el).opacity) || 0;
      b.group.visible = op > 0.01 && r.width > 2;
      if (!b.group.visible) return;
      b.group.position.set(r.left - rect.left + r.width / 2, -(r.top - rect.top + r.height / 2), 0);
      b.group.scale.setScalar(r.width / 2);
      if (!b.dragging) {                       // inertia after release, tilt eases back
        b.ry += b.vy; b.rx += b.vx;
        b.vx *= 0.94; b.vy *= 0.95;
        b.rx += (0 - b.rx) * 0.01;
      }
      b.drag.rotation.set(b.rx + cy, b.ry + cx, 0);
      b.spinner.children.forEach((m) => {
        m.rotation.y += dt * b.spin * (1 + boost) * (m.userData.clouds ? 1.25 : 1);
      });
      b.parts.forEach((p) => {
        if (p.userData.haze) p.material.uniforms.o.value = op;
        else p.material.opacity = op * (p.userData.clouds ? 0.85 : 1);
      });
    });
    renderer.render(scene, camera);
  }
  frame();
})();
