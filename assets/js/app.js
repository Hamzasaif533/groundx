/* ==========================================================================
   GROUND X — app
   Renders all content from data.js / i18n.js and drives GSAP animations.
   ========================================================================== */
(function () {
  "use strict";

  const hasGSAP = typeof window.gsap !== "undefined";
  if (hasGSAP) gsap.registerPlugin(ScrollTrigger, SplitText, ScrollToPlugin);
  if (hasGSAP && window.ScrollSmoother) gsap.registerPlugin(ScrollSmoother);
  if (hasGSAP && window.ScrambleTextPlugin) gsap.registerPlugin(ScrambleTextPlugin);
  const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const ANIM = hasGSAP && !REDUCED;

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  /* ---------------------------------------------------------------- state */
  const state = {
    lang: document.documentElement.lang === "ar" ? "ar" : "en",
    world: "moon",
    siteId: GX.SITES[0].id,
    analog: 0,
    layer: "slope",
    roverOpen: false
  };
  let ctxCompare = null; // gsap.context for the comparison block only
  let ctx = null; // gsap.context for everything that is rebuilt on language change

  /* ---------------------------------------------------------------- i18n helpers */
  const t = (k) => (GX.STR[state.lang][k] !== undefined ? GX.STR[state.lang][k] : GX.STR.en[k] ?? k);
  const L = (o) => (o == null ? "" : typeof o === "string" ? o : o[state.lang] ?? o.en ?? "");
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  /* Numbers always use Western digits and are isolated so RTL never re-orders them. */
  const num = (v) => `<bdi class="num" dir="ltr">${esc(v)}</bdi>`;
  const fmt = (n, d = 0) => Number(n).toFixed(d); // toFixed never localises digits
  const pending = () => `<span class="tag tag--pend">${esc(t("common.pending"))}</span>`;
  const site = () => GX.SITES.find((s) => s.id === state.siteId);
  const img = (key) => GX.IMG[key];

  /* ---------------------------------------------------------------- icons */
  const ICON = {
    arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m0 0-6-6m6 6-6 6"/></svg>',
    steps: [
      '<svg viewBox="0 0 64 64" stroke="#bfb29a"><circle cx="32" cy="32" r="24"/><circle cx="24" cy="26" r="5"/><circle cx="40" cy="38" r="7"/><circle cx="38" cy="20" r="2.5"/><path d="M32 2v8M32 54v8M2 32h8M54 32h8"/></svg>',
      '<svg viewBox="0 0 64 64" stroke="#d7ffc5"><circle cx="22" cy="32" r="16"/><circle cx="46" cy="22" r="11"/><circle cx="46" cy="46" r="11"/><path d="M36 26l-2 2M36 38l-2-2" /></svg>',
      '<svg viewBox="0 0 64 64" stroke="#f5c842"><path d="M8 44a24 24 0 0 1 48 0"/><path d="M32 44l12-14"/><circle cx="32" cy="44" r="3"/><path d="M8 52h48"/></svg>',
      '<svg viewBox="0 0 64 64" stroke="#ff7a45"><rect x="14" y="22" width="34" height="14" rx="3"/><path d="M40 22V12h8M44 12v-4"/><circle cx="16" cy="46" r="6"/><circle cx="32" cy="46" r="6"/><circle cx="48" cy="46" r="6"/><path d="M16 36v4M32 36v4M48 36v4"/></svg>'
    ]
  };

  const ROVER_SVG = `
  <svg viewBox="0 0 520 320" aria-hidden="true">
    <path class="ground" d="M0 292 C 120 282, 200 300, 290 290 S 450 280, 520 292"/>
    <g class="rover-body">
      <g class="rover-mast">
        <rect x="330" y="40" width="8" height="78" rx="3" fill="#2a2e37"/>
        <rect x="306" y="22" width="58" height="26" rx="6" fill="#f4f1e8"/>
        <circle cx="322" cy="35" r="7" fill="#232322"/><circle cx="346" cy="35" r="7" fill="#232322"/>
        <circle cx="322" cy="35" r="2.5" fill="#d7ffc5"/><circle cx="346" cy="35" r="2.5" fill="#d7ffc5"/>
      </g>
      <rect x="150" y="96" width="150" height="10" rx="3" fill="#d7ffc5" opacity=".9"/>
      <rect x="110" y="112" width="250" height="78" rx="14" fill="#1a1d24" stroke="#f4f1e8" stroke-opacity=".35" stroke-width="2"/>
      <rect x="128" y="128" width="96" height="44" rx="6" fill="#232322" stroke="#bfb29a" stroke-opacity=".5"/>
      <path d="M134 160 l14-14 l12 10 l18-20 l20 24" fill="none" stroke="#bfb29a" stroke-width="2"/>
      <rect x="240" y="128" width="100" height="10" rx="3" fill="#2a2e37"/><rect x="240" y="146" width="70" height="10" rx="3" fill="#2a2e37"/>
      <text x="240" y="178" fill="#6d6f6b" font-family="JetBrains Mono, monospace" font-size="13">GX-R?</text>
      <path d="M140 190 L 108 238 L 70 254 M108 238 L150 254 M330 190 L 370 232 L 420 254 M370 232 L 330 254 M235 190 L 235 254" fill="none" stroke="#f4f1e8" stroke-opacity=".6" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
      <g class="wheels">
        ${[70, 150, 235, 330, 420].map((x) => `<g class="wheel" transform="translate(${x} 262)"><circle r="30" fill="#1b1b1a" stroke="#f4f1e8" stroke-opacity=".75" stroke-width="5"/><circle r="9" fill="#d7ffc5"/><path d="M0-30V30M-30 0H30M-21-21 21 21M21-21-21 21" stroke="#f4f1e8" stroke-opacity=".25" stroke-width="3"/></g>`).join("")}
      </g>
    </g>
  </svg>`;

  /* ================================================================ RENDER */
  /* Light markup for headings:  [[word]] -> highlighted, {moon|earth|mars} -> image pill, | -> line break (wide screens) */
  const PILL = { moon: "assets/img/planets/moon.webp", earth: "assets/img/haughton-landsat.webp", mars: "assets/img/planets/mars.webp" };
  function rich(str) {
    return esc(str)
      .replace(/\[\[(.+?)\]\]/g, '<em class="hl">$1</em>')
      .replace(/\{(moon|earth|mars)\}/g, (_, k) => `<span class="pill pill--${k}" style="background-image:url('${PILL[k]}')" aria-hidden="true"></span>`)
      .replace(/\|/g, '<br class="br-lg">');
  }
  const plain = (str) => String(str).replace(/\[\[|\]\]/g, "").replace(/\{(moon|earth|mars)\}/g, "").replace(/\|/g, " ").replace(/\s+/g, " ").trim();

  function applyStatic() {
    $$("[data-i18n]").forEach((el) => {
      const v = t(el.dataset.i18n);
      if (el.hasAttribute("data-rich")) { el.innerHTML = rich(v); el.setAttribute("aria-label", plain(v)); }
      else el.textContent = v;
    });
    $("#langToggle").setAttribute("aria-label", t("switchTo"));
    $("#lightbox [data-close]").setAttribute("aria-label", t("common.close"));
    document.title = state.lang === "ar" ? "Ground X — توائم كوكبية" : "Ground X — Planetary Twins";
  }

  function renderMarquee() {
    const words = t("marquee");
    const one = words.map((w) => `<span class="marquee__item">${esc(w)}</span>`).join("");
    $("#marquee").innerHTML = `<div style="display:flex">${one}${one}</div><div style="display:flex">${one}${one}</div>`;
  }

  /* "How it works" as a large survey-style list (big wide titles, description beside) */
  function renderSteps() {
    $("#steps").innerHTML = [1, 2, 3, 4].map((i) => `
      <li class="step">
        <span class="step__bar" aria-hidden="true"></span>
        <span class="step__n mono">0${i}</span>
        <span class="step__icon" aria-hidden="true">${ICON.steps[i - 1]}</span>
        <h3 class="step__t">${esc(t(`how.s${i}.t`))}</h3>
        <p class="step__d">${esc(t(`how.s${i}.d`))}</p>
      </li>`).join("");
  }

  /* Hero site bar (like a tab strip along the bottom of the hero) */
  function renderSitebar() {
    const s = GX.SITES[0], a = s.analogs[0];
    $("#sitebar").innerHTML = `
      <span class="sitebar__lab label">${esc(t("sitebar.label"))}:</span>
      <a href="#compare" class="sitebar__item" data-analog-link="0"><i class="globe tex-moon"></i>${esc(L(s.name))} <span class="mono">↔</span> ${esc(L(a.name))}</a>
      <a href="#compare" class="sitebar__item is-soon" data-analog-link="1"><i class="globe tex-earth"></i>${esc(t("sitebar.twin2"))} · ${esc(t("common.pending"))}</a>
      <a href="#sites" class="sitebar__item is-soon" data-world-link="mars"><i class="globe tex-mars"></i>${esc(t("sitebar.mars"))} · ${esc(t("common.inProgress"))}</a>`;
  }

  function renderSites() {
    const grid = $("#siteGrid");
    if (state.world === "mars") {
      grid.innerHTML = Array.from({ length: GX.MARS_PLACEHOLDERS }, (_, i) => `
        <div class="site-card site-card--soon">
          <div class="ring"><i class="globe tex-mars" style="animation-delay:-${i * 17}s"></i><span>R-0${i + 1}</span></div>
          <h3>${esc(t("site.marsSoon"))}</h3>
          <p>${esc(t("site.marsSoonD"))}</p>
          <span class="tag tag--warn">${esc(t("common.inProgress"))}</span>
        </div>`).join("");
      return;
    }
    grid.innerHTML = GX.SITES.filter((s) => s.body === state.world).map((s) => `
      <a class="site-card" href="#compare" data-site="${s.id}" data-cursor>
        <div class="site-card__media">
          <img src="${img(s.photo).src}" alt="${esc(L(s.name))}" loading="lazy">
          <span class="site-card__code mono">${esc(s.code)}</span>
        </div>
        <div class="site-card__body">
          <h3>${esc(L(s.name))}</h3>
          <p class="loc">${esc(L(s.location))} · ${num(s.resolution)}</p>
          <div class="tagline"><span class="tag tag--warn">${esc(t("common.preliminary"))}</span><span class="tag">${esc(L(s.dataset))}</span></div>
          <div>
            <small class="mono" style="color:var(--dim)">${esc(t("site.twins"))}</small>
            <div class="twin-slots" style="margin-top:8px">
              ${s.analogs.map((a, i) => a
                ? `<div class="twin-slot is-filled"><small>#${i + 1}</small>${esc(L(a.name))}</div>`
                : `<div class="twin-slot is-empty"><small>#${i + 1}</small>${esc(t("common.pending"))}</div>`).join("")}
            </div>
          </div>
          <span class="site-card__go">${esc(t("site.open"))}${ICON.arrow}</span>
        </div>
      </a>`).join("") + `
      <div class="site-card site-card--soon">
        <div class="ring"><i class="globe tex-moon" style="animation-delay:-23s"></i><span>M-02</span></div>
        <h3>${esc(state.lang === "ar" ? "موقع قمري جديد" : "Next lunar site")}</h3>
        <p>${esc(state.lang === "ar" ? "مواقع قمرية إضافية وتوائمها الأرضية ستُضاف مع تقدم البحث." : "Additional lunar sites and their Earth twins will be added as the research progresses.")}</p>
        <span class="tag tag--warn">${esc(t("common.inProgress"))}</span>
      </div>`;
  }

  /* ---------- compare ---------- */
  function sideValue(c, key) {
    if (!c) return `<b class="txt">${esc(t("common.pending"))}</b>`;
    if (c.headline) return `<b>${num(c.headline)}</b><small><i></i>${esc(L(c.headlineLabel))}</small>`;
    return `<b class="txt">${esc(L(c.display))}</b>`;
  }

  function sidePanel(c, worldClass, title) {
    if (!c) return `<div class="crit__side crit__side--${worldClass}"><h4><i></i>${esc(title)}</h4>${pending()}</div>`;
    const facts = c.facts ? `<ul class="facts">${c.facts.map((f) => `<li><span>${esc(L(f.k))}</span><b>${num(f.v)}</b></li>`).join("")}</ul>` : "";
    const tags = [];
    if (c.method) tags.push(`<span class="tag">${esc(t("compare.method"))}: ${esc(L(c.method))}</span>`);
    if (c.evidence) tags.push(`<span class="tag">${esc(t("compare.evidence"))}: ${esc(L(c.evidence))}</span>`);
    if ("evidence" in c && !c.evidence) tags.push(`<span class="tag tag--pend">${esc(t("compare.evidence"))}: ${esc(t("common.pending"))}</span>`);
    if ("reference" in c) tags.push(c.reference ? `<a class="tag" href="${c.reference}" target="_blank" rel="noopener">${esc(t("compare.reference"))}</a>` : `<span class="tag tag--pend">${esc(t("compare.reference"))}: ${esc(t("common.pending"))}</span>`);
    tags.push(`<span class="tag tag--warn">${esc(t("compare.status"))}: ${esc(c.note ? L(c.note) : t("common.preliminary"))}</span>`);
    const map = c.map ? `<button class="thumb" type="button" data-zoom="${c.map}" data-cursor><img src="${img(c.map).src}" alt="" loading="lazy"><span>${esc(t("compare.viewMap"))} ↗</span></button>` : "";
    return `
      <div class="crit__side crit__side--${worldClass}">
        <h4><i></i>${esc(title)}</h4>
        ${c.display ? `<p style="color:var(--text);font-weight:500">${esc(L(c.display))}</p>` : ""}
        ${c.detail ? `<p>${esc(L(c.detail))}</p>` : ""}
        ${facts}
        <div class="tagline">${tags.join("")}</div>
        ${map}
      </div>`;
  }

  function renderCompare() {
    const s = site();
    const a = s.analogs[state.analog];
    const switcher = `
      <div class="twin-switch" role="tablist">
        ${s.analogs.map((x, i) => `<button type="button" role="tab" data-analog="${i}" class="${i === state.analog ? "is-active" : ""}" aria-selected="${i === state.analog}">
          <span class="mono">${esc(t("compare.twin"))} ${i + 1}</span> · ${esc(x ? L(x.name) : t("common.pending"))}</button>`).join("")}
      </div>`;

    if (!a) {
      $("#compareRoot").innerHTML = switcher + `
        <div class="pending-twin reveal">
          <span class="tag tag--warn">${esc(t("common.inProgress"))}</span>
          <h3>${esc(L(s.name))} ↔ ${esc(t("compare.pendingTwin"))}</h3>
          <p>${esc(t("compare.pendingTwinD"))}</p>
        </div>`;
      return;
    }

    const cmp = a.comparison;
    const hasScore = typeof cmp.similarity === "number";
    const R = 80, C = 2 * Math.PI * R;
    const score = `
      <div class="score">
        <div class="score__ring">
          <svg viewBox="0 0 190 190">
            <circle class="track" cx="95" cy="95" r="${R}"/>
            ${hasScore ? `<circle class="fill" cx="95" cy="95" r="${R}" stroke-dasharray="${C}" stroke-dashoffset="${C}" data-score="${cmp.similarity}"/>` : `<circle class="dash" cx="95" cy="95" r="${R}"/>`}
          </svg>
          <div class="score__val">
            ${hasScore ? `<b class="mono" style="color:var(--earth);font-size:44px" data-count="${cmp.similarity}">0</b><small>% ${esc(t("compare.similarity"))}</small>`
                       : `<b>${esc(t("compare.scorePending"))}</b><small>${esc(t("compare.similarity"))}</small>`}
          </div>
        </div>
        <div class="score__row">
          <div>${esc(t("compare.similarity"))}<b>${hasScore ? num(cmp.similarity + "%") : esc(t("common.pending"))}</b></div>
          <div>${esc(t("compare.difference"))}<b>${typeof cmp.difference === "number" ? num(cmp.difference + "%") : esc(t("common.pending"))}</b></div>
        </div>
        ${hasScore ? "" : `<p class="score__note">${esc(t("compare.scoreNote"))}</p>`}
      </div>`;

    const card = (o, world, isSite) => `
      <article class="vs__card vs__card--${world}">
        <button class="vs__media" type="button" data-zoom="${o.photo}" data-cursor aria-label="${esc(L(o.name))}">
          <img src="${img(o.photo).src}" alt="${esc(L(o.name))}" loading="lazy">
          <span class="vs__world"><i></i>${esc(t(world === "moon" ? "hero.moon" : "hero.earth"))}</span>
        </button>
        <div class="vs__body">
          <h3>${esc(L(o.name))}</h3>
          <p class="loc">${esc(L(o.location))}${o.coords ? ` · ${num(o.coords)}` : ""}</p>
          <dl class="meta">
            ${isSite ? `<dt>${esc(t("compare.dataset"))}</dt><dd>${esc(L(o.dataset))}</dd>` : `<dt>${esc(state.lang === "ar" ? "النوع" : "Type")}</dt><dd>${esc(L(o.type))}</dd>`}
            <dt>${esc(t("compare.resolution"))}</dt><dd>${isSite ? num(o.resolution) : esc(L(o.resolution))}</dd>
            <dt>${esc(t("compare.area"))}</dt><dd>${esc(L(o.area))}</dd>
            <dt>${esc(t("compare.photoCredit"))}</dt><dd><a href="${o.photoSource}" target="_blank" rel="noopener" dir="ltr">${esc(o.photoSource.replace(/^https?:\/\//, "").slice(0, 42))}…</a></dd>
          </dl>
        </div>
      </article>`;

    const CRITS = [
      ["terrain", "crit.terrain"], ["slope", "crit.slope"], ["roughness", "crit.roughness"], ["geology", "crit.geology"],
      ["rockSize", "crit.rockSize"], ["rockDensity", "crit.rockDensity"], ["temperature", "crit.temperature"]
    ];
    const rows = CRITS.map(([key, label], i) => {
      const m = s.criteria[key], e = a.criteria[key];
      const isPending = !m && !e;
      return `
        <div class="crit ${isPending ? "crit--pending" : ""}" data-crit="${key}">
          <button class="crit__btn" type="button" ${isPending ? "disabled" : `aria-expanded="false" aria-controls="cp-${key}"`}>
            <span class="crit__name"><span class="mono">${String(i + 1).padStart(2, "0")}</span>${esc(t(label))}</span>
            <span class="crit__v crit__v--moon">${sideValue(m, key)}</span>
            <span class="crit__v crit__v--earth">${sideValue(e, key)}</span>
            <span class="crit__plus${isPending ? " crit__plus--none" : ""}" aria-hidden="true"></span>
          </button>
          ${isPending ? "" : `<div class="crit__panel" id="cp-${key}" role="region"><div class="crit__inner">
            ${sidePanel(m, "moon", L(s.name))}${sidePanel(e, "earth", L(a.name))}
          </div></div>`}
        </div>`;
    }).join("");

    const BARS = [
      ["slopeMean", "bar.slopeMean", 2, false], ["flatShare", "bar.flatShare", 2, false],
      ["roughMean", "bar.roughMean", 4, true], ["roughMax", "bar.roughMax", 4, true]
    ];
    const bars = BARS.map(([k, label, dec, prelim]) => {
      const mv = s.bars[k], ev = a.bars[k];
      const max = Math.max(mv, ev) * 1.12;
      return `
        <div class="bar">
          <div class="bar__label"><span>${esc(t(label))}</span>${prelim ? `<small>${esc(t("bar.prelim"))}</small>` : ""}</div>
          <div class="bar__rows">
            <div class="bar__row bar__row--moon"><span><i></i>${esc(L(s.name))}</span><div class="bar__track"><div class="bar__fill" data-w="${mv / max}"></div></div><b>${num(fmt(mv, k === "slopeMean" || k === "flatShare" ? 2 : dec))}</b></div>
            <div class="bar__row bar__row--earth"><span><i></i>${esc(L(a.name))}</span><div class="bar__track"><div class="bar__fill" data-w="${ev / max}"></div></div><b>${num(fmt(ev, k === "slopeMean" || k === "flatShare" ? 2 : dec))}</b></div>
          </div>
        </div>`;
    }).join("");

    const layerImg = (o, layer) => layer === "photo" ? o.photo : o.maps[layer];
    const mapFig = (o, world) => `
      <figure class="map" data-world="${world}">
        ${["photo", "slope", "roughness"].map((ly) => {
          const k = layerImg(o, ly);
          return k ? `<img src="${img(k).src}" alt="${esc(L(o.name))} — ${esc(t("layer." + ly))}" data-layer="${ly}" data-key="${k}" class="${ly === state.layer ? "is-on" : ""}" loading="lazy">` : "";
        }).join("")}
        <button type="button" data-zoom-map aria-label="${esc(t("compare.viewMap"))}" data-cursor></button>
        <figcaption><span>${esc(L(o.name))}</span><span>${esc(L(o.area))}</span></figcaption>
      </figure>`;

    $("#compareRoot").innerHTML = switcher + `
      <div class="vs">
        ${card(s, "moon", true)}
        ${score}
        ${card(a, "earth", false)}
      </div>

      <div class="crit-head">
        <h3 class="sub-h">${esc(t("compare.criteria"))}</h3>
        <div class="crit-legend"><span><i style="background:var(--moon)"></i>${esc(L(s.name))}</span><span><i style="background:var(--earth)"></i>${esc(L(a.name))}</span></div>
      </div>
      <div class="crits">${rows}</div>

      <div class="crit-head"><h3 class="sub-h">${esc(t("compare.byNumbers"))}</h3></div>
      <div class="bars">${bars}</div>

      <div class="crit-head" style="margin-bottom:0">
        <div><h3 class="sub-h">${esc(t("compare.mapsTitle"))}</h3><p class="section__lead" style="margin-top:10px;font-size:16px">${esc(t("compare.mapsLead"))}</p></div>
      </div>
      <div class="maps__tools">
        <div class="seg" role="tablist" id="layerSeg">
          ${["photo", "slope", "roughness"].map((ly) => `<button type="button" role="tab" data-layer="${ly}" class="${ly === state.layer ? "is-active" : ""}" aria-selected="${ly === state.layer}">${esc(t("layer." + ly))}</button>`).join("")}
        </div>
        <div class="legend" id="legend"></div>
      </div>
      <div class="maps">${mapFig(s, "moon")}${mapFig(a, "earth")}</div>

      <div class="crit-head"><h3 class="sub-h">${esc(t("compare.verdict"))}</h3></div>
      <div class="verdict">
        <article><h4><i></i>${esc(t("compare.similar"))}</h4><p>${esc(L(cmp.similar))}</p></article>
        <article><h4><i></i>${esc(t("compare.different"))}</h4><p>${esc(L(cmp.different))}</p></article>
        <article><h4><i></i>${esc(t("compare.conclusion"))}</h4><p>${esc(L(cmp.conclusion))}</p></article>
      </div>`;
    renderLegend();
  }

  function renderLegend() {
    const el = $("#legend"); if (!el) return;
    if (state.layer === "slope") el.innerHTML = `<span><i style="background:var(--s-flat)"></i>${num(t("legend.flat"))}</span><span><i style="background:var(--s-mid)"></i>${num(t("legend.mid"))}</span><span><i style="background:var(--s-steep)"></i>${num(t("legend.steep"))}</span>`;
    else if (state.layer === "roughness") el.innerHTML = `<span><span class="grad"></span>${esc(t("legend.rough"))}</span>`;
    else el.innerHTML = "";
  }

  /* ---------- elevation profile (scroll-driven probe walks the real transect) ---------- */
  const PROFILE = { draw: null, hoverF: null, scrollF: 0 };
  function renderProfile() {
    const P = window.SHACKLETON_PROFILE || [];
    const root = $("#profileChart");
    if (!P.length) { root.innerHTML = ""; return; }
    const W = 1000, H = 440, m = { l: 70, r: 24, t: 36, b: 56 };
    const xMax = P[P.length - 1][0];
    const yMin = -3000, yMax = 1000;
    const X = (v) => m.l + (v / xMax) * (W - m.l - m.r);
    const Y = (v) => m.t + (1 - (v - yMin) / (yMax - yMin)) * (H - m.t - m.b);
    const line = P.map((p, i) => `${i ? "L" : "M"}${X(p[0]).toFixed(1)} ${Y(p[1]).toFixed(1)}`).join(" ");
    const area = `${line} L${X(xMax).toFixed(1)} ${Y(yMin)} L${X(0)} ${Y(yMin)} Z`;
    let hi = P[0], lo = P[0];
    P.forEach((p) => { if (p[1] > hi[1]) hi = p; if (p[1] < lo[1]) lo = p; });
    const yt = [-3000, -2000, -1000, 0, 1000];
    const xt = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18];
    const unitM = state.lang === "ar" ? "م" : "m", unitK = state.lang === "ar" ? "كم" : "km";
    const tdir = state.lang === "ar" ? "rtl" : "ltr";
    const tag = (cls, color, label, value, x, y, below) => `
      <g class="pmark ${cls}" transform="translate(${x} ${y})">
        <circle r="6" fill="${color}"/><circle class="pmark__ring" r="6" fill="none" stroke="${color}"/>
        <g transform="translate(0 ${below ? 26 : -26})"><rect x="-86" y="-15" width="172" height="28" rx="14"/>
        <text direction="${tdir}" text-anchor="middle" y="4">${esc(label)} · ${fmt(value, 1)} ${unitM}</text></g>
      </g>`;

    root.innerHTML = `
      <div class="chart__top">
        <div class="readout" aria-live="off">
          <div><small>${esc(t("profile.distS"))}</small><b class="mono"><span class="ro-d">0.00</span> <i>${unitK}</i></b></div>
          <div><small>${esc(t("profile.elevS"))}</small><b class="mono"><span class="ro-e">${fmt(P[0][1], 1)}</span> <i>${unitM}</i></b></div>
        </div>
        <div class="chart__stats">
          <div style="--c:var(--earth)"><small>${esc(t("profile.high"))}</small><b>${num(fmt(hi[1], 1))} ${unitM}</b></div>
          <div style="--c:var(--mars)"><small>${esc(t("profile.low"))}</small><b>${num(fmt(lo[1], 1))} ${unitM}</b></div>
          <div style="--c:var(--moon)"><small>${esc(t("profile.relief"))}</small><b>${num(fmt(hi[1] - lo[1], 0))} ${unitM}</b></div>
        </div>
      </div>
      <div class="chart__plot">
      <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(t("profile.title"))}">
        <defs>
          <linearGradient id="pLine" gradientUnits="userSpaceOnUse" x1="0" y1="${Y(yMax)}" x2="0" y2="${Y(yMin)}">
            <stop offset="0" stop-color="#d7ffc5"/><stop offset=".45" stop-color="#bfb29a"/><stop offset="1" stop-color="#ff8a5c"/>
          </linearGradient>
          <linearGradient id="pArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#d7ffc5" stop-opacity=".28"/><stop offset=".6" stop-color="#bfb29a" stop-opacity=".08"/><stop offset="1" stop-color="#bfb29a" stop-opacity="0"/>
          </linearGradient>
          <filter id="pGlow" x="-10%" y="-30%" width="120%" height="160%"><feGaussianBlur stdDeviation="6"/></filter>
          <clipPath id="pReveal"><rect class="p-reveal" x="0" y="0" width="${m.l}" height="${H}"/></clipPath>
        </defs>
        <g class="grid">
          ${yt.map((v) => `<line x1="${m.l}" x2="${W - m.r}" y1="${Y(v)}" y2="${Y(v)}"/>`).join("")}
          ${xt.map((v) => `<line class="v" x1="${X(v)}" x2="${X(v)}" y1="${m.t}" y2="${H - m.b}"/>`).join("")}
        </g>
        <g class="axis">
          ${yt.map((v) => `<text x="${m.l - 12}" y="${Y(v) + 4}" text-anchor="end">${v}</text>`).join("")}
          ${xt.map((v) => `<text x="${X(v)}" y="${H - m.b + 22}" text-anchor="middle">${v}</text>`).join("")}
          <text class="axis-title" direction="${tdir}" x="${(W + m.l) / 2}" y="${H - 6}" text-anchor="middle">${esc(t("profile.x"))}</text>
          <text class="axis-title" direction="${tdir}" transform="translate(16 ${(H - m.b + m.t) / 2}) rotate(-90)" text-anchor="middle">${esc(t("profile.y"))}</text>
        </g>
        <path class="ghost" d="${line}"/>
        <g clip-path="url(#pReveal)">
          <path class="area" d="${area}"/>
          <path class="glow" d="${line}" filter="url(#pGlow)"/>
          <path class="line" d="${line}"/>
        </g>
        ${tag("pmark--hi", "#d7ffc5", t("profile.high"), hi[1], X(hi[0]), Y(hi[1]), false)}
        ${tag("pmark--lo", "#ff8a5c", t("profile.low"), lo[1], X(lo[0]), Y(lo[1]), false)}
        <g class="probe">
          <line class="probe__line" y1="${m.t}" y2="${H - m.b}"/>
          <circle class="probe__halo" r="16"/>
          <circle class="probe__dot" r="7"/>
        </g>
        <rect class="hit" x="${m.l}" y="${m.t}" width="${W - m.l - m.r}" height="${H - m.t - m.b}" fill="transparent"/>
      </svg>
      </div>
      <figcaption><span class="chart__hint label">↕ ${esc(t("profile.scrub"))}</span><span>${esc(t("profile.caption"))}</span></figcaption>`;

    const svg = $("svg", root), reveal = $(".p-reveal", svg), probe = $(".probe", svg);
    const roD = $(".ro-d", root), roE = $(".ro-e", root);
    const mkHi = $(".pmark--hi", svg), mkLo = $(".pmark--lo", svg);
    const elevAt = (d) => {             // linear interpolation along the supplied samples
      let i = 1; while (i < P.length - 1 && P[i][0] < d) i++;
      const a = P[i - 1], b = P[i], k = b[0] === a[0] ? 0 : (d - a[0]) / (b[0] - a[0]);
      return a[1] + (b[1] - a[1]) * Math.max(0, Math.min(1, k));
    };
    PROFILE.draw = () => {
      const f = PROFILE.hoverF != null ? PROFILE.hoverF : PROFILE.scrollF;
      const d = f * xMax, e = elevAt(d), x = X(d), y = Y(e);
      reveal.setAttribute("width", Math.max(m.l, x));
      probe.setAttribute("transform", `translate(${x.toFixed(1)} 0)`);
      $(".probe__dot", probe).setAttribute("cy", y.toFixed(1));
      $(".probe__halo", probe).setAttribute("cy", y.toFixed(1));
      roD.textContent = fmt(d, 2); roE.textContent = fmt(e, 1);
      mkHi.classList.toggle("is-on", d >= hi[0] - 0.05);
      mkLo.classList.toggle("is-on", d >= lo[0] - 0.05);
    };
    PROFILE.draw();

    const hit = $(".hit", svg);
    hit.addEventListener("pointermove", (ev) => {
      const pt = svg.createSVGPoint(); pt.x = ev.clientX; pt.y = ev.clientY;
      const p = pt.matrixTransform(svg.getScreenCTM().inverse());
      PROFILE.hoverF = Math.max(0, Math.min(1, (p.x - m.l) / (W - m.l - m.r)));
      root.classList.add("is-hover"); PROFILE.draw();
    });
    hit.addEventListener("pointerleave", () => { PROFILE.hoverF = null; root.classList.remove("is-hover"); PROFILE.draw(); });
  }

  /* ---------- rovers ---------- */
  function renderRover() {
    const s = site(), a = s.analogs.find(Boolean);
    const rv = GX.ROVERS[(a && a.rovers && a.rovers[0]) || "pending-1"];
    const sm = s.criteria.slope.facts;
    $("#roverRoot").innerHTML = `
      <div class="rover-stage">
        <button class="rover-btn" type="button" aria-expanded="${state.roverOpen}" aria-controls="roverSpecs" data-cursor>
          ${ROVER_SVG}
          <span class="rover-btn__hint">${esc(t("rovers.tap"))}</span>
        </button>
        <div class="rover-info">
          <span class="tag tag--warn">${esc(L(rv.research))}</span>
          <h3 style="margin-top:16px">${esc(t("rovers.recommended"))}: <span style="color:var(--warn)">${esc(rv.name ? L(rv.name) : t("common.pending"))}</span></h3>
          <p class="loc">${esc(t("rovers.testSite"))}: <b style="color:var(--text)">${esc(L(rv.testSite))}</b> · ${esc(L(s.name))}</p>
          <p style="color:var(--dim);font-size:14px;margin:0">${esc(t("rovers.illustration"))}</p>
          <p style="margin:26px 0 0;color:var(--muted);font-size:14px">${esc(t("rovers.context"))}</p>
          <div class="rover-context">
            <div><small>${esc(L(sm[0].k))} · ${esc(L(s.name))}</small><b>${num(s.criteria.slope.headline)}</b></div>
            <div><small>${esc(L(sm[1].k))}</small><b>${num(sm[1].v)}</b></div>
            <div><small>${esc(L(sm[2].k))}</small><b>${num(sm[2].v)}</b></div>
          </div>
        </div>
      </div>
      <div class="rover-specs" id="roverSpecs">
        <div class="rover-specs__inner">
          <ul class="facts spec-table">
            ${rv.specs.map((sp) => `<li><span>${esc(L(sp.k))}</span>${sp.v ? `<b>${num(L(sp.v))}</b>` : `<b class="pend">${esc(t("common.pending"))}</b>`}</li>`).join("")}
          </ul>
          <div class="why">
            <h4>${esc(t("rovers.why"))}</h4>
            <p>${esc(t("rovers.whyPending"))}</p>
            ${pending()}
          </div>
        </div>
      </div>`;
  }

  function renderGallery() {
    $("#gallery").innerHTML = GX.EVIDENCE.map((e, i) => `
      <button class="shot shot--${e.body}" type="button" data-ev="${i}" data-cursor>
        <span class="shot__img"><img src="${e.src}" alt="${esc(L(e.caption))}" loading="lazy"></span>
        <span class="cap"><i></i>${esc(L(e.caption))}</span>
      </button>`).join("");
  }

  function renderMethod() {
    $("#methodList").innerHTML = t("method.items").map((x) => `<li><span>${esc(x)}</span></li>`).join("");
    $("#sources").innerHTML = GX.SOURCES.map((s) => `<li>${s.url
      ? `<a href="${s.url}" target="_blank" rel="noopener">${esc(L(s.label))}</a>`
      : `<span>${esc(L(s.label))}</span>`}</li>`).join("");
  }

  /* Buttons: label rolls up on hover (duplicate line slides in) */
  function rollButtons() {
    $$(".btn > span[data-i18n]").forEach((el) => {
      const txt = el.textContent;
      el.innerHTML = `<span class="roll"><span>${esc(txt)}</span><span aria-hidden="true">${esc(txt)}</span></span>`;
    });
  }

  /* Terrain control panels (hero + footer): mode switch, direction pad, drag hint */
  const terrains = {};
  function renderTctl() {
    $$(".tctl").forEach((box) => {
      const id = box.dataset.terrain, tr = terrains[id], mode = (tr && tr.mode) || "wire";
      const canSlope = location.protocol !== "file:";
      box.innerHTML = `
        <div class="seg seg--terrain" role="tablist">
          <button type="button" role="tab" data-tmode="wire" class="${mode === "wire" ? "is-active" : ""}" aria-selected="${mode === "wire"}">${esc(t("terrain.wire"))}</button>
          ${canSlope ? `<button type="button" role="tab" data-tmode="surface" class="${mode === "surface" ? "is-active" : ""}" aria-selected="${mode === "surface"}">${esc(t("terrain.slope"))}</button>` : ""}
        </div>
        <span class="tctl__hint label">${esc(t("terrain.drag"))}</span>`;
    });
  }

  function renderAll() {
    applyStatic();
    rollButtons();
    renderTctl();
    renderMarquee(); renderSteps(); renderSitebar(); renderSites(); renderCompare();
    renderProfile(); renderRover(); renderGallery(); renderMethod();
    moveTabInk(false);
    if (window.GXRuler) window.GXRuler.layout();
  }

  /* ================================================================ INTERACTIONS (delegated, bound once) */
  function openLightbox(src, caption) {
    const dlg = $("#lightbox");
    $("img", dlg).src = src; $("img", dlg).alt = caption || "";
    $(".lightbox__cap", dlg).textContent = caption || "";
    if (!dlg.open) dlg.showModal();
    if (ANIM) gsap.fromTo(dlg, { scale: .92, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: .5, ease: "expo.out" });
  }

  /* Re-measure scroll triggers after content height changed, keeping `anchor` exactly where it is on screen.
     (A plain refresh with smooth scrolling made the page jump up and down.) */
  let settleTimer = 0;
  function settleAround(anchor) {
    clearTimeout(settleTimer);
    settleTimer = setTimeout(() => {
      if (!hasGSAP) return;
      const before = anchor.getBoundingClientRect().top;
      ScrollTrigger.refresh();
      const delta = anchor.getBoundingClientRect().top - before;
      if (Math.abs(delta) > 1) {
        if (smoother) smoother.scrollTo(smoother.scrollTop() + delta, false);
        else window.scrollTo(0, window.scrollY + delta);
      }
    }, 60);
  }

  function toggleCrit(row, open) {
    const panel = $(".crit__panel", row); if (!panel) return;
    const btn = $(".crit__btn", row);
    const willOpen = open ?? !row.classList.contains("is-open");
    row.classList.toggle("is-open", willOpen);
    btn.setAttribute("aria-expanded", willOpen);
    if (!ANIM) { panel.style.height = willOpen ? "auto" : "0"; return; }
    if (willOpen) {
      gsap.to(panel, { height: "auto", duration: .7, ease: "expo.out", overwrite: true, onComplete: () => settleAround(row) });
      gsap.from($$(".crit__side", panel), { y: 30, autoAlpha: 0, stagger: .08, duration: .7, ease: "expo.out" });
    } else {
      gsap.to(panel, { height: 0, duration: .5, ease: "expo.inOut", overwrite: true, onComplete: () => settleAround(row) });
    }
  }

  function setLayer(ly) {
    state.layer = ly;
    $$("#layerSeg button").forEach((b) => { const on = b.dataset.layer === ly; b.classList.toggle("is-active", on); b.setAttribute("aria-selected", on); });
    $$(".map").forEach((fig) => {
      $$("img", fig).forEach((im) => {
        const on = im.dataset.layer === ly;
        im.classList.toggle("is-on", on);
        if (ANIM) gsap.to(im, { opacity: on ? 1 : 0, scale: on ? 1 : 1.04, duration: .6, ease: "power2.out", overwrite: true });
        else im.style.opacity = on ? 1 : 0;
      });
    });
    renderLegend();
  }

  function toggleRover() {
    state.roverOpen = !state.roverOpen;
    const btn = $(".rover-btn"), specs = $("#roverSpecs");
    btn.setAttribute("aria-expanded", state.roverOpen);
    if (!ANIM) { specs.style.height = state.roverOpen ? "auto" : "0"; return; }
    const dir = state.lang === "ar" ? -1 : 1;
    if (state.roverOpen) {
      const tl = gsap.timeline({ onComplete: () => ScrollTrigger.refresh() });
      tl.to(".rover-body", { x: 26 * dir, duration: .5, ease: "power2.inOut" })
        .to(".wheel", { rotation: 140 * dir, transformOrigin: "50% 50%", duration: .5, ease: "power2.inOut" }, 0)
        .to(".rover-body", { x: 0, duration: .7, ease: "elastic.out(1,.6)" })
        .to(specs, { height: "auto", duration: .8, ease: "expo.out" }, .25)
        .from(".rover-specs .spec-table li, .rover-specs .why", { y: 24, autoAlpha: 0, stagger: .05, duration: .6, ease: "expo.out" }, .4);
    } else {
      gsap.to(specs, { height: 0, duration: .5, ease: "expo.inOut", onComplete: () => ScrollTrigger.refresh() });
    }
  }

  function moveTabInk(animate = true) {
    const active = $(".world-tab.is-active"), ink = $(".world-tabs__ink");
    if (!active || !ink) return;
    const p = active.parentElement.getBoundingClientRect(), r = active.getBoundingClientRect();
    const props = { x: r.left - p.left - 5, width: r.width };
    ink.style.left = "5px";
    if (hasGSAP && animate && !REDUCED) gsap.to(ink, { ...props, duration: .6, ease: "expo.out" });
    else if (hasGSAP) gsap.set(ink, props);
    else { ink.style.transform = `translateX(${props.x}px)`; ink.style.width = props.width + "px"; }
  }

  function bindOnce() {
    document.addEventListener("click", (e) => {
      const z = e.target.closest("[data-zoom]");
      if (z) { const k = img(z.dataset.zoom); openLightbox(k.src, L(k.caption)); return; }
      const zm = e.target.closest("[data-zoom-map]");
      if (zm) { const on = $("img.is-on", zm.parentElement); if (on) { const k = img(on.dataset.key); openLightbox(k.src, L(k.caption)); } return; }
      const ev = e.target.closest("[data-ev]");
      if (ev) { const it = GX.EVIDENCE[+ev.dataset.ev]; openLightbox(it.src, L(it.caption)); return; }
      const cb = e.target.closest(".crit__btn");
      if (cb && !cb.disabled) { toggleCrit(cb.closest(".crit")); return; }
      const ly = e.target.closest("#layerSeg button");
      if (ly) { setLayer(ly.dataset.layer); return; }
      const an = e.target.closest("[data-analog]");
      if (an) { state.analog = +an.dataset.analog; swapCompare(); return; }
      const al = e.target.closest("[data-analog-link]");
      if (al) { e.preventDefault(); if (state.analog !== +al.dataset.analogLink) { state.analog = +al.dataset.analogLink; renderCompare(); rebuildSoon(); } scrollToId("#compare"); return; }
      const wl = e.target.closest("[data-world-link]");
      if (wl) { e.preventDefault(); setWorld(wl.dataset.worldLink); scrollToId("#sites"); return; }
      const tm = e.target.closest("[data-tmode]");
      if (tm) { setTerrainMode(tm.closest(".tctl").dataset.terrain, tm.dataset.tmode); return; }
      const sc = e.target.closest("[data-site]");
      if (sc) { e.preventDefault(); state.siteId = sc.dataset.site; state.analog = 0; renderCompare(); rebuildSoon(); scrollToId("#compare"); return; }
      const wt = e.target.closest(".world-tab");
      if (wt) { setWorld(wt.dataset.world); return; }
      if (e.target.closest(".rover-btn")) { toggleRover(); return; }
      const a = e.target.closest('a[href^="#"]');
      if (a && a.getAttribute("href").length > 1) { e.preventDefault(); scrollToId(a.getAttribute("href")); return; }
    });

    document.addEventListener("pointermove", (e) => {
      const card = e.target.closest && e.target.closest(GLARE);
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    }, { passive: true });

    // footer X is magnetic: it leans toward the pointer and springs back
    if (ANIM) {
      const xw = $(".footer__x"), foot = $(".footer");
      const qx = gsap.quickTo(xw, "x", { duration: .9, ease: "power3" });
      const qy = gsap.quickTo(xw, "y", { duration: .9, ease: "power3" });
      const qr = gsap.quickTo(xw, "rotation", { duration: 1.1, ease: "power3" });
      const qs = gsap.quickTo(xw, "scale", { duration: .9, ease: "power3" });
      foot.addEventListener("pointermove", (e) => {
        const r = xw.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        const dx = e.clientX - cx, dy = e.clientY - cy, dist = Math.hypot(dx, dy), pull = Math.max(0, 1 - dist / 520);
        qx(Math.max(-60, Math.min(60, dx * .22 * pull)));
        qy(Math.max(-40, Math.min(40, dy * .22 * pull)));
        qr(Math.max(-25, Math.min(25, dx * .06 * pull)));
        qs(1 + pull * .12);
      });
      foot.addEventListener("pointerleave", () => { qx(0); qy(0); qr(0); qs(1); });
    }

    const dlg = $("#lightbox");
    dlg.addEventListener("click", (e) => { if (e.target === dlg || e.target.closest("[data-close]")) dlg.close(); });

    $("#langToggle").addEventListener("click", () => setLang(state.lang === "en" ? "ar" : "en"));
    window.addEventListener("resize", () => moveTabInk(false));

    // nav: background after scroll, hide on scroll down
    let last = 0;
    window.addEventListener("scroll", () => {
      const y = window.scrollY, nav = $("#nav");
      nav.classList.toggle("is-scrolled", y > 30);
      nav.classList.toggle("is-hidden", y > 400 && y > last + 4);
      if (y < last - 4) nav.classList.remove("is-hidden");
      last = y;
    }, { passive: true });

    if (ANIM && window.matchMedia("(hover: hover)").matches) {
      // custom cursor (dot + trailing ring) replaces the native pointer
      const root = document.documentElement;
      root.classList.add("has-cursor");
      const cur = $(".cursor"), ring = $(".cursor-ring");
      const dx = gsap.quickTo(cur, "x", { duration: .06, ease: "none" });
      const dy = gsap.quickTo(cur, "y", { duration: .06, ease: "none" });
      const rx = gsap.quickTo(ring, "x", { duration: .45, ease: "power3" });
      const ry = gsap.quickTo(ring, "y", { duration: .45, ease: "power3" });
      window.addEventListener("pointermove", (e) => {
        if (e.pointerType && e.pointerType !== "mouse") return;
        dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY);
        cur.style.opacity = 1; ring.style.opacity = 1;
      }, { passive: true });
      document.addEventListener("pointerover", (e) => ring.classList.toggle("is-big", !!e.target.closest("[data-cursor], a, button, .magnetic")));
      document.addEventListener("pointerdown", () => ring.classList.add("is-down"));
      document.addEventListener("pointerup", () => ring.classList.remove("is-down"));
      document.documentElement.addEventListener("mouseleave", () => { cur.style.opacity = 0; ring.style.opacity = 0; });
      // the lightbox sits in the browser's top layer (above our cursor), so use the native pointer there
      const dlgEl = $("#lightbox");
      new MutationObserver(() => root.classList.toggle("has-cursor", !dlgEl.open)).observe(dlgEl, { attributes: true, attributeFilter: ["open"] });
      // magnetic buttons
      $$(".magnetic").forEach((b) => {
        const bx = gsap.quickTo(b, "x", { duration: .5, ease: "elastic.out(1,.4)" });
        const by = gsap.quickTo(b, "y", { duration: .5, ease: "elastic.out(1,.4)" });
        b.addEventListener("pointermove", (e) => { const r = b.getBoundingClientRect(); bx((e.clientX - r.left - r.width / 2) * .3); by((e.clientY - r.top - r.height / 2) * .4); });
        b.addEventListener("pointerleave", () => { bx(0); by(0); });
      });
    }
  }

  const GLARE = ".glass, .site-card, .vs__card, .crit__side, .verdict article, .shot, .stats > div, .why, .spec-table";
  function scrollToId(id) {
    const el = $(id); if (!el) return;
    if (smoother) smoother.scrollTo(el, true, "top 70px");
    else if (hasGSAP) gsap.to(window, { scrollTo: { y: el, offsetY: 60 }, duration: REDUCED ? 0 : 1.2, ease: "expo.inOut" });
    else el.scrollIntoView();
  }

  function setWorld(w) {
    if (w === state.world) return;
    state.world = w;
    $$(".world-tab").forEach((b) => { const on = b.dataset.world === w; b.classList.toggle("is-active", on); b.setAttribute("aria-selected", on); });
    moveTabInk(true);
    const grid = $("#siteGrid");
    if (!ANIM) { renderSites(); return; }
    gsap.to(grid.children, { y: -20, autoAlpha: 0, stagger: .04, duration: .3, ease: "power2.in", onComplete: () => {
      renderSites();
      gsap.from(grid.children, { y: 40, autoAlpha: 0, stagger: .08, duration: .7, ease: "expo.out", onComplete: () => ScrollTrigger.refresh() });
    } });
  }

  function swapCompare() {
    const root = $("#compareRoot");
    if (!ANIM) { renderCompare(); return; }
    gsap.to(root, { autoAlpha: 0, y: 20, duration: .3, ease: "power2.in", onComplete: () => {
      if (ctxCompare) { ctxCompare.revert(); ctxCompare = null; }
      renderCompare(); rebuildSoon();
      gsap.to(root, { autoAlpha: 1, y: 0, duration: .6, ease: "expo.out" });
    } });
  }

  let rebuildTimer = null;
  function rebuildSoon() { clearTimeout(rebuildTimer); rebuildTimer = setTimeout(buildCompareAnims, 30); }

  /* ================================================================ LANGUAGE */
  function setLang(lang) {
    if (lang === state.lang) return;
    try { localStorage.setItem("gx-lang", lang); } catch (e) {}
    const y = window.scrollY;
    const swap = () => {
      state.lang = lang;
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
      try { const u = new URL(location.href); if (u.searchParams.has("lang")) { u.searchParams.set("lang", lang); history.replaceState(null, "", u); } } catch (e) {}
      state.roverOpen = false;
      killAnimations(); // revert SplitText etc. BEFORE new text is written
      renderAll();
      buildAnimations();
      if (smoother) smoother.scrollTop(y); else window.scrollTo(0, y);
      if (hasGSAP) ScrollTrigger.refresh();
    };
    if (!ANIM) { swap(); return; }
    gsap.timeline()
      .to("main, .footer", { autoAlpha: 0, y: 12, duration: .28, ease: "power2.in" })
      .add(swap)
      .to("main, .footer", { autoAlpha: 1, y: 0, duration: .5, ease: "expo.out", clearProps: "transform" });
  }

  /* ================================================================ ANIMATIONS */
  function countUp(el, to, dec, suffix = "") {
    const o = { v: 0 };
    return gsap.to(o, { v: to, duration: 1.6, ease: "power3.out", onUpdate: () => { el.textContent = fmt(o.v, dec) + suffix; } });
  }

  let marqueeTick = null;
  function killAnimations() {
    if (marqueeTick) { gsap.ticker.remove(marqueeTick); marqueeTick = null; }
    if (ctx) { ctx.revert(); ctx = null; }
    if (ctxCompare) { ctxCompare.revert(); ctxCompare = null; }
  }

  function buildAnimations() {
    if (!hasGSAP) { buildCompareAnims(); return; }
    if (marqueeTick) { gsap.ticker.remove(marqueeTick); marqueeTick = null; }
    if (ctx) ctx.revert();
    buildCompareAnims();
    if (!ANIM) return;
    ctx = gsap.context(() => {
      const isAr = state.lang === "ar";

      /* --- hero --- */
      const heroTitle = $(".hero__title");
      // word masks (not line masks): the inline image pills would otherwise confuse line detection
      SplitText.create(heroTitle, {
        type: "words", mask: "words", autoSplit: true,
        onSplit: (self) => gsap.from(self.words, { yPercent: 110, duration: 1.1, ease: "expo.out", stagger: .06, delay: .15 })
      });
      gsap.timeline({ delay: .2 })
        .from(".hero__lead", { y: 30, autoAlpha: 0, duration: 1, ease: "expo.out" }, .35)
        .from(".hero__cta > *", { y: 30, autoAlpha: 0, stagger: .1, duration: .9, ease: "expo.out" }, .5)
        .from(".orb--moon", { xPercent: -40, scale: .6, autoAlpha: 0, duration: 1.6, ease: "expo.out" }, 0)
        .from(".orb--mars", { yPercent: -60, scale: .4, autoAlpha: 0, duration: 1.6, ease: "expo.out" }, .15)
        .from(".orb--earth", { xPercent: 40, scale: .6, autoAlpha: 0, duration: 1.6, ease: "expo.out" }, .1)
        .from(".twins__orbit", { scale: .7, autoAlpha: 0, duration: 1.6, ease: "expo.out" }, .2)
        .from(".twins__link path", { strokeDashoffset: 400, autoAlpha: 0, duration: 1.4, ease: "power2.out" }, .6)
        .from(".twins__badge", { scale: 0, duration: .9, ease: "back.out(2)" }, .9)
        .from(".hero__title .pill", { scaleX: 0, transformOrigin: isAr ? "100% 50%" : "0% 50%", duration: 1.3, ease: "expo.inOut", stagger: .15 }, .5)
        .from(".sitebar > *", { y: 40, autoAlpha: 0, stagger: .08, duration: 1, ease: "expo.out" }, .8)
        .from(".ruler", { autoAlpha: 0, x: isAr ? 20 : -20, duration: 1, ease: "expo.out" }, 1)
        .from(".twins__hint", { y: 16, autoAlpha: 0, duration: .9, ease: "expo.out" }, 1.4)
        .from(".hero__side", { clipPath: "inset(0 0 100% 0 round 14px)", duration: 1.2, ease: "expo.inOut" }, .25);

      // techy "decode" effect on small caps labels (Latin only — Arabic letters must stay joined)
      const scramble = (el, delay = 0) => {
        if (isAr || !window.ScrambleTextPlugin || !el || !el.dataset.i18n) return;
        const txt = t(el.dataset.i18n);
        gsap.to(el, { duration: 1.2, delay, overwrite: true, scrambleText: { text: txt, chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", speed: .5, revealDelay: .2 }, onComplete: () => { el.textContent = txt; } });
      };
      $$(".kicker > span[data-i18n]").forEach((el) => ScrollTrigger.create({ trigger: el, start: "top 90%", once: true, onEnter: () => scramble(el) }));

      // image reveals: wipe up from a clip mask
      $$(".site-card__media, .shot__img").forEach((el) => gsap.from(el, { clipPath: "inset(100% 0 0 0)", duration: 1.3, ease: "expo.inOut", scrollTrigger: { trigger: el, start: "top 90%" } }));
      // kicker rule draws in
      $$(".kicker").forEach((el) => gsap.from(el, { "--kw": "0px", duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 90%" } }));
      // ambient light blobs drift slowly behind the glass
      gsap.to(".blob--a", { xPercent: 30, yPercent: 20, duration: 18, ease: "sine.inOut", repeat: -1, yoyo: true });
      gsap.to(".blob--b", { xPercent: -25, yPercent: -15, duration: 22, ease: "sine.inOut", repeat: -1, yoyo: true });
      gsap.to(".blob--c", { xPercent: 20, yPercent: -25, duration: 26, ease: "sine.inOut", repeat: -1, yoyo: true });
      // planets hint gently nudges
      gsap.to(".twins__hint-ico", { rotate: -360, duration: 6, ease: "none", repeat: -1 });

      // stats (now in "How it works") count up when they scroll into view
      gsap.from(".stats > div", { y: 40, autoAlpha: 0, stagger: .1, duration: 1, ease: "expo.out", scrollTrigger: { trigger: ".stats", start: "top 85%" } });
      $$(".stats [data-count]").forEach((el) => ScrollTrigger.create({ trigger: ".stats", start: "top 85%", once: true, onEnter: () => countUp(el, +el.dataset.count, 0) }));

      // orbs: endless "rotation" of the surface texture + gentle float
      gsap.to(".orb--moon", { y: -14, duration: 3.2, ease: "sine.inOut", repeat: -1, yoyo: true });
      gsap.to(".orb--earth", { y: 14, duration: 3.6, ease: "sine.inOut", repeat: -1, yoyo: true });
      gsap.to(".orb--mars", { y: 10, x: -6, duration: 4.2, ease: "sine.inOut", repeat: -1, yoyo: true });
      gsap.to(".twins__orbit", { rotate: 360, duration: 80, ease: "none", repeat: -1 });
      gsap.to(".twins__link path", { strokeDashoffset: -140, duration: 6, ease: "none", repeat: -1 });

      // scroll: twins drift together as you leave the hero
      ScrollTrigger.create({ trigger: ".hero", start: "top top", end: "bottom top", onUpdate: (self) => { if (window.GXGlobes) window.GXGlobes.boost(Math.min(Math.abs(self.getVelocity()) / 100, 25)); } });
      gsap.timeline({ scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1 } })
        .to(".twins", { yPercent: 18, ease: "none" }, 0)
        .to(".twins", { scale: .9, ease: "none" }, 0)
        .to(".hero__copy, .hero__side", { yPercent: -12, autoAlpha: .2, ease: "none" }, 0);

      /* --- marquee: infinite, speed reacts to scroll velocity (GSAP-style) --- */
      const track = $("#marquee");
      const loop = gsap.fromTo(track, { xPercent: isAr ? -50 : 0 }, { xPercent: isAr ? 0 : -50, duration: 40, ease: "none", repeat: -1 });
      let boostTs = 0;
      ScrollTrigger.create({
        trigger: ".marquee", start: "top bottom", end: "bottom top",
        onUpdate: (self) => {
          const v = Math.min(Math.abs(self.getVelocity()) / 500, 3);
          boostTs = Math.max(boostTs, v);
          if (window.GXGlobes) window.GXGlobes.boost(v * 3);
        }
      });
      marqueeTick = () => {                   // one smooth controller instead of a new tween per scroll event
        boostTs *= 0.93;
        const cur = loop.timeScale();
        loop.timeScale(cur + (1 + boostTs - cur) * 0.1);
      };
      gsap.ticker.add(marqueeTick);

      /* --- section titles & leads --- */
      // Titles are split into words lazily (just before they scroll into view) — splitting them all
      // up front forces many page re-layouts and made the first frame very slow.
      $$(".section__title[data-split]").forEach((el) => {
        gsap.set(el, { autoAlpha: 0 });
        ScrollTrigger.create({
          trigger: el, start: "top 92%", once: true,
          onEnter: () => ctx && ctx.add(() => {
            gsap.set(el, { autoAlpha: 1 });
            SplitText.create(el, {
              type: "lines,words", mask: "lines", linesClass: "split-line", autoSplit: true,
              onSplit: (self) => gsap.from(self.words, { yPercent: 110, duration: 1, ease: "expo.out", stagger: .05 })
            });
          })
        });
      });
      $$(".section__lead, .kicker").forEach((el) => gsap.from(el, { y: 24, autoAlpha: 0, duration: 1, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 90%" } }));

      /* --- steps: staggered rise + progress line scrubbed by scroll --- */
      $$(".step").forEach((row) => gsap.from(row.querySelectorAll(".step__n, .step__icon, .step__t, .step__d"), { y: 40, autoAlpha: 0, stagger: .07, duration: 1, ease: "expo.out", scrollTrigger: { trigger: row, start: "top 88%" } }));
      $$(".step__bar").forEach((s, i) => gsap.fromTo(s, { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: "#steps", start: `top ${75 - i * 6}%`, end: `top ${35 - i * 6}%`, scrub: 1 } }));
      $$(".step__icon svg > *").forEach((p) => { try { const len = p.getTotalLength(); gsap.fromTo(p, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 1.6, ease: "power2.out", scrollTrigger: { trigger: "#steps", start: "top 75%" } }); } catch (e) {} });

      /* --- sites --- */
      gsap.from(".world-tabs", { y: 20, autoAlpha: 0, duration: .8, ease: "expo.out", scrollTrigger: { trigger: ".world-tabs", start: "top 90%" } });
      gsap.from("#siteGrid > *", { y: 60, autoAlpha: 0, stagger: .1, duration: 1, ease: "expo.out", scrollTrigger: { trigger: "#siteGrid", start: "top 85%" } });


      /* --- elevation profile: pinned on desktop, scroll walks the probe along the transect --- */
      if ($("#profileChart svg")) {
        const wide = window.matchMedia("(min-width: 861px) and (min-height: 640px)").matches;
        const st = { f: 0 };
        gsap.to(st, {
          f: 1, ease: "none",
          onUpdate: () => { PROFILE.scrollF = st.f; if (PROFILE.draw) PROFILE.draw(); },
          scrollTrigger: wide
            ? { trigger: "#profileChart", start: "center center", end: "+=160%", pin: true, scrub: .8, anticipatePin: 1 }
            : { trigger: "#profileChart", start: "top 70%", end: "bottom 25%", scrub: .8 }
        });
        gsap.from("#profileChart .readout > div, #profileChart .chart__stats > div", { y: 24, autoAlpha: 0, stagger: .08, duration: .9, ease: "expo.out", scrollTrigger: { trigger: "#profileChart", start: "top 85%" } });
        gsap.from("#profileChart .grid line:not(.v)", { scaleX: 0, transformOrigin: "0% 50%", stagger: .06, duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: "#profileChart", start: "top 80%" } });
        gsap.from("#profileChart .ghost", { autoAlpha: 0, duration: 1.6, ease: "power2.out", scrollTrigger: { trigger: "#profileChart", start: "top 80%" } });
      }

      /* --- rover: floating idle + entrance --- */
      gsap.from(".rover-btn", { x: isAr ? 200 : -200, autoAlpha: 0, duration: 1.6, ease: "expo.out", scrollTrigger: { trigger: "#roverRoot", start: "top 80%" } });
      gsap.from(".wheel", { rotation: isAr ? 360 : -360, transformOrigin: "50% 50%", duration: 1.6, ease: "expo.out", scrollTrigger: { trigger: "#roverRoot", start: "top 80%" } });
      gsap.to(".rover-body", { y: -6, duration: 1.8, ease: "sine.inOut", repeat: -1, yoyo: true });
      gsap.to(".rover-mast", { rotation: 6, svgOrigin: "334 118", duration: 2.6, ease: "sine.inOut", repeat: -1, yoyo: true });
      gsap.from(".rover-info > *", { y: 30, autoAlpha: 0, stagger: .07, duration: .9, ease: "expo.out", scrollTrigger: { trigger: ".rover-info", start: "top 85%" } });

      /* --- gallery & method --- */
      gsap.from(".shot", { y: 60, autoAlpha: 0, stagger: .08, duration: 1, ease: "expo.out", scrollTrigger: { trigger: "#gallery", start: "top 85%" } });
      gsap.from(".method__list li, .sources li", { y: 20, autoAlpha: 0, stagger: .05, duration: .8, ease: "expo.out", scrollTrigger: { trigger: ".method__grid", start: "top 80%" } });
      const word = $(".footer__word");
      SplitText.create(word, { type: "chars", charsClass: "fchar" });
      const fchars = $$(".footer__big .fchar");
      const fx = $(".footer__x");
      fx.innerHTML = '<span class="fx">X</span>';
      gsap.timeline({ scrollTrigger: { trigger: ".footer", start: "top 92%" } })
        .from(fchars, { yPercent: 105, duration: 1.2, ease: "expo.out", stagger: { each: .06, from: "start" } })
        .from(".footer__x .fx", { yPercent: -170, rotation: -120, duration: 1.6, ease: "bounce.out" }, .45)
        .add(() => gsap.to(".footer__x .fx", { y: -10, rotation: 4, duration: 2.4, ease: "sine.inOut", repeat: -1, yoyo: true }), "+=.1");
      // scroll parallax: letters settle from slightly spread to tight
      gsap.fromTo(fchars, { y: (i) => (i % 2 ? 18 : -18) }, { y: 0, ease: "none", scrollTrigger: { trigger: ".footer", start: "top bottom", end: "bottom bottom", scrub: 1 } });
      // hover: letters near the pointer lift
      fchars.forEach((ch) => {
        ch.addEventListener("pointerenter", () => {
          ch.classList.add("is-hot");
          gsap.to(ch, { yPercent: -14, duration: .35, ease: "power3.out", overwrite: "auto" });
        });
        ch.addEventListener("pointerleave", () => {
          ch.classList.remove("is-hot");
          gsap.to(ch, { yPercent: 0, duration: .9, ease: "elastic.out(1,.35)", overwrite: "auto" });
        });
      });

      /* --- active nav link --- */
      $$(".nav__links a").forEach((a) => {
        const sec = $(a.getAttribute("href")); if (!sec) return;
        ScrollTrigger.create({ trigger: sec, start: "top 50%", end: "bottom 50%", onToggle: (self) => a.classList.toggle("is-active", self.isActive) });
      });
    });
    ScrollTrigger.refresh();
  }


  function buildCompareAnims() {
    if (!ANIM) {
      $$(".bar__fill").forEach((b) => { b.style.transform = "scaleX(" + b.dataset.w + ")"; });
      $$(".score__ring .fill").forEach((c) => c.setAttribute("stroke-dashoffset", 2 * Math.PI * 80 * (1 - c.dataset.score / 100)));
      return;
    }
    if (ctxCompare) ctxCompare.revert();
    const isAr = state.lang === "ar";
    ctxCompare = gsap.context(() => {
      if ($(".vs")) {
        gsap.from(".vs__card--moon", { x: isAr ? 80 : -80, autoAlpha: 0, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: ".vs", start: "top 80%" } });
        gsap.from(".vs__card--earth", { x: isAr ? -80 : 80, autoAlpha: 0, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: ".vs", start: "top 80%" } });
        gsap.from(".score", { scale: .8, autoAlpha: 0, duration: 1.2, ease: "expo.out", delay: .2, scrollTrigger: { trigger: ".vs", start: "top 80%" } });
        gsap.from(".vs__media", { clipPath: "inset(0 0 100% 0)", duration: 1.4, ease: "expo.inOut", stagger: .15, scrollTrigger: { trigger: ".vs", start: "top 80%" } });
        gsap.from(".map", { clipPath: "inset(50% 50% 50% 50% round 10px)", duration: 1.4, ease: "expo.inOut", stagger: .15, scrollTrigger: { trigger: ".maps", start: "top 85%" } });
        $$(".vs__media img").forEach((im) => gsap.to(im, { yPercent: 8, scale: 1.02, ease: "none", scrollTrigger: { trigger: im.parentElement, start: "top bottom", end: "bottom top", scrub: true } }));
        gsap.to(".score__ring .dash", { rotate: 360, transformOrigin: "50% 50%", duration: 14, ease: "none", repeat: -1 });
        $$(".score__ring .fill").forEach((c) => {
          const C = 2 * Math.PI * 80, s = +c.dataset.score;
          gsap.to(c, { strokeDashoffset: C * (1 - s / 100), duration: 2, ease: "power3.out", scrollTrigger: { trigger: ".score", start: "top 80%" } });
        });
        $$(".score__val [data-count]").forEach((el) => ScrollTrigger.create({ trigger: ".score", start: "top 80%", once: true, onEnter: () => countUp(el, +el.dataset.count, 0) }));

        gsap.from(".crit", { y: 30, autoAlpha: 0, stagger: .06, duration: .8, ease: "expo.out", scrollTrigger: { trigger: ".crits", start: "top 85%" } });
        $$(".bar__fill").forEach((b) => gsap.to(b, { scaleX: +b.dataset.w, duration: 1.6, ease: "expo.out", scrollTrigger: { trigger: b, start: "top 92%" } }));
        gsap.from(".map", { y: 60, autoAlpha: 0, stagger: .15, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: ".maps", start: "top 85%" } });
        gsap.from(".map img.is-on", { scale: 1.15, duration: 1.8, ease: "expo.out", scrollTrigger: { trigger: ".maps", start: "top 85%" } });
        gsap.from(".verdict article", { y: 60, autoAlpha: 0, stagger: .12, duration: 1, ease: "expo.out", scrollTrigger: { trigger: ".verdict", start: "top 85%" } });
      }
      if ($(".pending-twin")) gsap.from(".pending-twin", { y: 40, autoAlpha: 0, duration: .9, ease: "expo.out" });
    });
    ScrollTrigger.refresh();
  }

  /* ================================================================ TERRAIN + ELEVATION RULER */
  function mountTerrains() {
    if (!GX.mountTerrain) return;
    const slope = "assets/img/moon-slope.webp";
    const mount = (id, el, opts) => {
      const api = GX.mountTerrain(el, opts);
      if (!api) { $$(`.tctl[data-terrain="${id}"]`).forEach((b) => { b.hidden = true; }); return; }
      terrains[id] = { api, mode: "wire" };
    };
    // the footer terrain is only built when the visitor gets near the bottom of the page
    const ft = $(".footer__terrain");
    const io = new IntersectionObserver((en) => {
      if (!en[0].isIntersecting) return;
      io.disconnect();
      mount("footer", ft, { camera: "footer", surface: slope, zoom: 1.05 });
      if (terrains.footer && terrains.footer.api.hasSurface) restartCycle();
    }, { rootMargin: "900px 0px" });
    io.observe(ft);
  }
  /* Footer terrain alternates Wireframe <-> Slope map every 2 s.
     Clicking a button shows that mode right away and restarts the 2 s timer. */
  let cycleTimer = 0;
  function restartCycle() {
    clearInterval(cycleTimer);
    if (REDUCED) return;
    cycleTimer = setInterval(() => {
      const tr = terrains.footer; if (!tr) return;
      setTerrainMode("footer", tr.mode === "wire" ? "surface" : "wire", true);
    }, 2000);
  }
  function setTerrainMode(id, m, auto) {
    const tr = terrains[id]; if (!tr) return;
    tr.mode = m; tr.api.setMode(m);
    $$(`.tctl[data-terrain="${id}"] [data-tmode]`).forEach((b) => { const on = b.dataset.tmode === m; b.classList.toggle("is-active", on); b.setAttribute("aria-selected", on); });
    if (!auto && id === "footer") restartCycle();
  }

  /* Fixed side ruler — an interactive scrubber.
     The marker moves steadily down with page progress; the mini profile beside it is the real
     Shackleton transect, and the read-out shows the elevation at that point. Drag / click / arrow keys to travel. */
  function bindRuler() {
    const P = window.SHACKLETON_PROFILE; const el = $("#ruler");
    if (!P || !P.length || !el) return;
    const track = $(".ruler__track", el), val = $(".ruler__val", el), dist = $(".ruler__dist", el);
    const mark = $(".ruler__mark", el), fill = $(".ruler__fill", el), ticks = $(".ruler__ticks", el);
    const lo = Math.min(...P.map((p) => p[1])), hi = Math.max(...P.map((p) => p[1])), xMax = P[P.length - 1][0];
    const pts = P.map((p) => [2 + ((p[1] - lo) / (hi - lo)) * 26, (p[0] / xMax) * 200]);
    const d = pts.map((q, i) => `${i ? "L" : "M"}${q[0].toFixed(1)} ${q[1].toFixed(1)}`).join(" ");
    $(".ruler__line", el).setAttribute("d", d);
    $(".ruler__area", el).setAttribute("d", `M0 0 ${d.replace(/^M/, "L")} L0 200 Z`);
    const SECTIONS = [["#how", "nav.how"], ["#sites", "nav.sites"], ["#compare", "nav.compare"], ["#profile", "kicker.profile"], ["#rovers", "nav.rovers"], ["#evidence", "nav.evidence"], ["#method", "kicker.method"]];
    const maxScroll = () => Math.max(1, (window.ScrollTrigger ? ScrollTrigger.maxScroll(window) : document.documentElement.scrollHeight - innerHeight));
    const progress = () => smoother ? smoother.progress : Math.min(1, Math.max(0, scrollY / maxScroll()));
    const go = (f) => { const y = Math.min(1, Math.max(0, f)) * maxScroll(); if (smoother) smoother.scrollTop(y); else window.scrollTo(0, y); };
    const elevAt = (dd) => { let i = 1; while (i < P.length - 1 && P[i][0] < dd) i++; const a = P[i - 1], b = P[i]; const k = b[0] === a[0] ? 0 : (dd - a[0]) / (b[0] - a[0]); return a[1] + (b[1] - a[1]) * Math.max(0, Math.min(1, k)); };
    let last = -1;
    const update = () => {
      const f = progress();
      if (Math.abs(f - last) < 0.0005) return; last = f;
      const dd = f * xMax;
      val.textContent = `[ ${fmt(elevAt(dd), 0)} m ]`;
      dist.textContent = `${fmt(dd, 2)} km`;
      mark.style.transform = `translateY(${(f * track.clientHeight).toFixed(1)}px)`;
      fill.style.transform = `scaleY(${f.toFixed(4)})`;
      track.setAttribute("aria-valuenow", Math.round(f * 100));
    };
    const layout = () => {
      track.setAttribute("aria-label", t("ruler.aria"));
      const max = maxScroll();
      ticks.innerHTML = SECTIONS.map(([sel, key]) => {
        const sec = $(sel); if (!sec) return "";
        const top = sec.getBoundingClientRect().top + (smoother ? smoother.scrollTop() : scrollY) - 70;
        const f = Math.min(1, Math.max(0, top / max));
        return `<button type="button" class="ruler__tick" style="top:${(f * 100).toFixed(2)}%" data-goto="${sel}"><span>${esc(t(key))}</span></button>`;
      }).join("");
      last = -1; update();
    };
    // drag / click on the track
    let dragging = false;
    const fromEvent = (e) => { const r = track.getBoundingClientRect(); return (e.clientY - r.top) / r.height; };
    track.addEventListener("pointerdown", (e) => {
      if (e.target.closest(".ruler__tick")) return;
      dragging = true; el.classList.add("is-dragging"); track.setPointerCapture(e.pointerId); go(fromEvent(e));
    });
    track.addEventListener("pointermove", (e) => { if (dragging) go(fromEvent(e)); });
    const end = () => { dragging = false; el.classList.remove("is-dragging"); };
    track.addEventListener("pointerup", end); track.addEventListener("pointercancel", end);
    track.addEventListener("keydown", (e) => {
      const step = { ArrowDown: .03, ArrowUp: -.03, PageDown: .12, PageUp: -.12 }[e.key];
      if (step) { e.preventDefault(); go(progress() + step); }
      if (e.key === "Home") { e.preventDefault(); go(0); }
      if (e.key === "End") { e.preventDefault(); go(1); }
    });
    ticks.addEventListener("click", (e) => { const b = e.target.closest("[data-goto]"); if (b) scrollToId(b.dataset.goto); });
    if (hasGSAP) { gsap.ticker.add(update); ScrollTrigger.addEventListener("refresh", layout); }
    else window.addEventListener("scroll", update, { passive: true });
    window.GXRuler = { layout };
    layout();
  }

  /* ================================================================ BOOT */
  let smoother = null;
  if (ANIM && window.ScrollSmoother && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    smoother = ScrollSmoother.create({ wrapper: "#smooth-wrapper", content: "#smooth-content", smooth: 1.1, effects: true, smoothTouch: 0 });
  }
  renderAll();
  bindOnce();
  bindRuler();
  mountTerrains();
  const start = () => { buildAnimations(); moveTabInk(false); };
  // Start after globes.js has initialised WebGL (it runs right after this file), so shader compilation
  // never freezes the intro. SplitText's autoSplit re-measures lines once the web fonts finish loading.
  requestAnimationFrame(() => requestAnimationFrame(() => { start(); document.documentElement.classList.remove("gx-preload"); }));
  setTimeout(() => document.documentElement.classList.remove("gx-preload"), 4000);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { moveTabInk(false); hasGSAP && ScrollTrigger.refresh(); });
  window.addEventListener("load", () => hasGSAP && ScrollTrigger.refresh());
})();
