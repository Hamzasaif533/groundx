/* ==========================================================================
   GROUND X — research content
   --------------------------------------------------------------------------
   Every value here comes from the research team's "Site info" sheet.
   Do NOT recalculate or invent values. Anything not yet supplied stays
   `null` (shown on the site as "Pending").

   To add content later:
   - A new Moon/Mars site      -> push an object into SITES (see shackleton)
   - A second Earth analog     -> fill the `null` slot in that site's analogs[]
   - A similarity percentage   -> set analog.comparison.similarity (0–100),
                                  ONLY once a documented scoring method exists
   - A rover                   -> add to ROVERS and list its id in analog.rovers
   ========================================================================== */

window.GX = window.GX || {};

/* Images live in assets/img. `caption` is shown in the lightbox. */
GX.IMG = {
  shackletonPhoto: {
    src: "assets/img/shackleton-lro.webp",
    caption: { en: "Shackleton crater and the lunar south pole (NASA Moon Trek, LRO imagery).", ar: "فوهة شاكلتون والقطب الجنوبي للقمر (NASA Moon Trek، صور المركبة LRO)." }
  },
  haughtonPhoto: {
    src: "assets/img/haughton-landsat.webp",
    caption: { en: "Haughton Crater, Devon Island — Landsat 8 (Wikimedia Commons).", ar: "فوهة هوتون، جزيرة ديفون — القمر الصناعي لاندسات 8 (ويكيميديا كومنز)." }
  },
  moonSlope: {
    src: "assets/img/moon-slope.webp",
    caption: { en: "Shackleton Rim (Site04) slope classes rendered from the NASA 5 m/px slope raster. Green 0–10°, yellow >10–20°, red >20°.", ar: "فئات الانحدار لحافة شاكلتون (Site04) من بيانات الانحدار لناسا بدقة 5 م/بكسل. الأخضر 0–10°، الأصفر >10–20°، الأحمر >20°." }
  },
  moonRough: {
    src: "assets/img/moon-roughness.webp",
    caption: { en: "Shackleton Rim terrain roughness (QGIS). Brighter = rougher.", ar: "خشونة التضاريس لحافة شاكلتون (QGIS). الأفتح = الأكثر خشونة." }
  },
  moonRelief: {
    src: "assets/img/moon-relief.webp",
    caption: { en: "Shaded relief of the Site04 elevation model (5 m/px).", ar: "تظليل التضاريس لنموذج الارتفاع Site04 (5 م/بكسل)." }
  },
  earthSlope: {
    src: "assets/img/earth-slope.webp",
    caption: { en: "Haughton Crater slope classes inside the 10 km analysis buffer. Green 0–10°, yellow >10–20°, red >20°.", ar: "فئات الانحدار لفوهة هوتون داخل نطاق التحليل (10 كم). الأخضر 0–10°، الأصفر >10–20°، الأحمر >20°." }
  },
  earthRough: {
    src: "assets/img/earth-roughness.webp",
    caption: { en: "Haughton Crater terrain roughness inside the 10 km buffer. Brighter = rougher.", ar: "خشونة التضاريس لفوهة هوتون داخل نطاق 10 كم. الأفتح = الأكثر خشونة." }
  }
};

GX.SITES = [
  {
    id: "shackleton",
    body: "moon",
    code: "M-01",
    name: { en: "Shackleton Rim", ar: "حافة شاكلتون" },
    location: { en: "Lunar South Pole", ar: "القطب الجنوبي للقمر" },
    dataset: { en: "NASA Site04", ar: "ناسا Site04" },
    resolution: "5 m/px",
    status: "preliminary",
    photo: "shackletonPhoto",
    photoSource: "https://svs.gsfc.nasa.gov/4716",
    area: { en: "Site04 tile ≈ 16 × 16 km", ar: "مربع Site04 ≈ 16 × 16 كم" },
    maps: { slope: "moonSlope", roughness: "moonRough", relief: "moonRelief" },
    criteria: {
      terrain: {
        display: { en: "Impact crater rim — irregular terrain", ar: "حافة فوهة صدمية — تضاريس غير منتظمة" },
        detail: { en: "Shackleton Rim contains impact-related lunar landforms, steep crater slopes, and areas of uneven relief.", ar: "تضم حافة شاكلتون أشكالًا أرضية قمرية ناتجة عن الاصطدام، ومنحدرات فوهة شديدة، ومناطق ذات تضاريس غير مستوية." },
        evidence: { en: "NASA Site04 elevation dataset", ar: "بيانات الارتفاع Site04 من ناسا" },
        map: "moonRelief"
      },
      slope: {
        headline: "20.66°",
        headlineLabel: { en: "Mean slope", ar: "متوسط الانحدار" },
        facts: [
          { k: { en: "Mean slope", ar: "متوسط الانحدار" }, v: "20.6641°" },
          { k: { en: "Maximum recorded slope", ar: "أقصى انحدار مسجّل" }, v: "69.6472°" },
          { k: { en: "Area with slope < 10°", ar: "المساحة بانحدار أقل من 10°" }, v: "18.81%" }
        ],
        method: { en: "NASA slope raster analysed in QGIS", ar: "تحليل بيانات الانحدار من ناسا باستخدام QGIS" },
        map: "moonSlope"
      },
      roughness: {
        headline: "1.06",
        headlineLabel: { en: "Mean roughness", ar: "متوسط الخشونة" },
        facts: [
          { k: { en: "Mean", ar: "المتوسط" }, v: "1.0552" },
          { k: { en: "Maximum recorded value", ar: "أقصى قيمة مسجّلة" }, v: "29.1604" }
        ],
        method: { en: "QGIS terrain roughness analysis", ar: "تحليل خشونة التضاريس باستخدام QGIS" },
        note: { en: "Preliminary; units and comparability to be verified.", ar: "أولي؛ الوحدات وقابلية المقارنة قيد التحقق." },
        map: "moonRough"
      },
      geology: {
        display: { en: "Lunar impact-related materials", ar: "مواد قمرية مرتبطة بالاصطدام" },
        detail: { en: "The study region is associated with lunar impact processes. Surface materials may include regolith and fragmented rocky material. Detailed local material properties require further scientific verification.", ar: "ترتبط منطقة الدراسة بعمليات الاصطدام القمرية. قد تشمل مواد السطح الثرى القمري (الريغوليث) ومواد صخرية مفتتة. تتطلب الخصائص التفصيلية للمواد المحلية مزيدًا من التحقق العلمي." },
        reference: null
      }
    },
    profile: true,
    analogs: [
      {
        id: "haughton",
        name: { en: "Haughton Crater", ar: "فوهة هوتون" },
        location: { en: "Devon Island, Nunavut, Canada", ar: "جزيرة ديفون، نونافوت، كندا" },
        type: { en: "Terrestrial impact crater", ar: "فوهة صدمية أرضية" },
        resolution: { en: "DEM 2 m → processed 5 m", ar: "نموذج ارتفاع 2 م ← معالج إلى 5 م" },
        coords: "75.37° N, 89.68° W",
        photo: "haughtonPhoto",
        photoSource: "https://commons.wikimedia.org/wiki/File:Haughton_Crater_-Landsat_8(48010457521).png",
        area: { en: "10 km analysis buffer", ar: "نطاق تحليل 10 كم" },
        maps: { slope: "earthSlope", roughness: "earthRough" },
        criteria: {
          terrain: {
            display: { en: "Impact crater — eroded Arctic terrain", ar: "فوهة صدمية — تضاريس قطبية متآكلة" },
            detail: { en: "Haughton is a terrestrial impact crater with irregular landforms modified by erosion and weathering. The analysed area includes comparatively gentle terrain.", ar: "هوتون فوهة صدمية أرضية ذات أشكال أرضية غير منتظمة عدّلتها عوامل التعرية والتجوية. تشمل المنطقة المحللة تضاريس لطيفة نسبيًا." },
            evidence: null,
            map: "earthSlope"
          },
          slope: {
            headline: "8.25°",
            headlineLabel: { en: "Mean slope", ar: "متوسط الانحدار" },
            facts: [
              { k: { en: "Mean slope", ar: "متوسط الانحدار" }, v: "≈ 8.25°" },
              { k: { en: "Area with slope < 10°", ar: "المساحة بانحدار أقل من 10°" }, v: "≈ 74.59%" }
            ],
            method: { en: "DEM-based slope analysis in QGIS", ar: "تحليل الانحدار من نموذج الارتفاع باستخدام QGIS" },
            note: { en: "Numerical results require confirmation.", ar: "النتائج الرقمية تتطلب التأكيد." },
            map: "earthSlope"
          },
          roughness: {
            headline: "1.90",
            headlineLabel: { en: "Mean roughness", ar: "متوسط الخشونة" },
            facts: [
              { k: { en: "Mean", ar: "المتوسط" }, v: "1.9040" },
              { k: { en: "Maximum recorded value", ar: "أقصى قيمة مسجّلة" }, v: "33.1709" }
            ],
            method: { en: "QGIS roughness analysis using processed DEM", ar: "تحليل الخشونة في QGIS باستخدام نموذج الارتفاع المعالج" },
            note: { en: "Preliminary; calculation comparability requires verification.", ar: "أولي؛ قابلية مقارنة الحساب تتطلب التحقق." },
            map: "earthRough"
          },
          geology: {
            display: { en: "Impact-modified sedimentary rocks", ar: "صخور رسوبية معدّلة بالاصطدام" },
            detail: { en: "Haughton contains sedimentary bedrock and geological materials affected by impact processes, erosion, and Arctic environmental conditions.", ar: "تحتوي هوتون على صخور أساس رسوبية ومواد جيولوجية تأثرت بعمليات الاصطدام والتعرية والظروف البيئية القطبية." },
            reference: null
          }
        },
        /* Numbers the comparison bars use — copied from the criteria above. */
        bars: { slopeMean: 8.25, flatShare: 74.59, roughMean: 1.904, roughMax: 33.1709 },
        comparison: {
          similarity: null, // pending — needs a documented scoring method
          difference: null,
          similar: { en: "Both locations feature impact-related landforms.", ar: "يتميز الموقعان بأشكال أرضية ناتجة عن الاصطدام." },
          different: { en: "Shackleton has a higher average slope and a smaller proportion of low-slope terrain within the analysed areas.", ar: "تمتلك شاكلتون متوسط انحدار أعلى ونسبة أقل من التضاريس منخفضة الانحدار ضمن المناطق المحللة." },
          conclusion: { en: "Haughton is a potential partial Earth analog of the selected Shackleton region. Full analog suitability remains unverified.", ar: "تُعد هوتون نظيرًا أرضيًا جزئيًا محتملًا لمنطقة شاكلتون المختارة. ولا تزال ملاءمتها كنظير كامل غير مؤكدة." }
        },
        rovers: ["pending-1"]
      },
      null // Earth analog #2 — awaiting research
    ],
    bars: { slopeMean: 20.66, flatShare: 18.81, roughMean: 1.0552, roughMax: 29.1604 }
  }
];

/* Mars sites — research not started yet; shown as "in progress" slots. */
GX.MARS_PLACEHOLDERS = 2;

GX.ROVERS = {
  "pending-1": {
    name: null,
    testSite: { en: "Haughton Crater", ar: "فوهة هوتون" },
    research: { en: "Vehicle research — in progress", ar: "بحث المركبات — قيد الإعداد" },
    image: null,
    specs: [
      { k: { en: "Vehicle name", ar: "اسم المركبة" }, v: null },
      { k: { en: "Maximum operating slope", ar: "أقصى انحدار تشغيلي" }, v: null },
      { k: { en: "Ground clearance", ar: "الخلوص الأرضي" }, v: null },
      { k: { en: "Obstacle capability", ar: "القدرة على تجاوز العوائق" }, v: null },
      { k: { en: "Terrain suitability", ar: "ملاءمة التضاريس" }, v: null },
      { k: { en: "Compatibility assessment", ar: "تقييم التوافق" }, v: null },
      { k: { en: "Official specifications", ar: "المواصفات الرسمية" }, v: null }
    ]
  }
};

GX.EVIDENCE = [
  { src: "assets/img/moon-qgis-slope.webp", body: "moon", caption: { en: "QGIS: Shackleton slope classes (Site04).", ar: "QGIS: فئات انحدار شاكلتون (Site04)." } },
  { src: "assets/img/moon-trek-slope.webp", body: "moon", caption: { en: "Moon Trek: LRO LOLA colour slope, Site04 Shackleton Rim.", ar: "Moon Trek: خريطة الانحدار الملونة LRO LOLA لموقع Site04 حافة شاكلتون." } },
  { src: "assets/img/moon-trek-dem.webp", body: "moon", caption: { en: "Moon Trek: LRO LOLA DEM (5 m/px) and the elevation-profile transect.", ar: "Moon Trek: نموذج الارتفاع LRO LOLA (5 م/بكسل) ومسار مقطع الارتفاع." } },
  { src: "assets/img/lunar-map-units.webp", body: "moon", caption: { en: "Reference: lunar geologic map units and symbols.", ar: "مرجع: وحدات ورموز الخريطة الجيولوجية للقمر." } },
  { src: "assets/img/earth-arcticdem.webp", body: "earth", caption: { en: "ArcticDEM Explorer: 2 m mosaic tile over Haughton (75.37° N, 89.68° W).", ar: "ArcticDEM Explorer: مربع فسيفسائي بدقة 2 م فوق هوتون (75.37° ش، 89.68° غ)." } },
  { src: "assets/img/earth-qgis-buffer.webp", body: "earth", caption: { en: "QGIS: 10 km analysis buffer around the Haughton centre.", ar: "QGIS: نطاق تحليل 10 كم حول مركز هوتون." } }
];

GX.SOURCES = [
  { label: { en: "NASA PGDA — Site04 high-resolution lunar south pole topography", ar: "ناسا PGDA — تضاريس عالية الدقة للقطب الجنوبي للقمر (Site04)" }, url: "https://pgda.gsfc.nasa.gov/products/78" },
  { label: { en: "NASA SVS — Shackleton crater imagery", ar: "ناسا SVS — صور فوهة شاكلتون" }, url: "https://svs.gsfc.nasa.gov/4716" },
  { label: { en: "Landsat 8 image of Haughton Crater (Wikimedia Commons)", ar: "صورة لاندسات 8 لفوهة هوتون (ويكيميديا كومنز)" }, url: "https://commons.wikimedia.org/wiki/File:Haughton_Crater_-Landsat_8(48010457521).png" },
  { label: { en: "Gawronska et al. (2020) Geologic context and potential EVA targets at the lunar south pole. Advances in Space Research 66, 1247–1264", ar: "Gawronska وآخرون (2020): السياق الجيولوجي وأهداف السير الفضائي المحتملة في القطب الجنوبي للقمر. مجلة Advances in Space Research، المجلد 66، الصفحات 1247–1264" }, url: "https://doi.org/10.1016/j.asr.2020.05.035" },
  { label: { en: "3D globe textures: Solar System Scope (CC BY 4.0), based on NASA data", ar: "خامات الكرات ثلاثية الأبعاد: Solar System Scope ‏(CC BY 4.0)، مبنية على بيانات ناسا" }, url: "https://www.solarsystemscope.com/textures/" },
  { label: { en: "Earth DEM original source — pending verification", ar: "المصدر الأصلي لنموذج ارتفاع الأرض — قيد التحقق" }, url: null }
];
