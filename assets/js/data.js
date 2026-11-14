/* ==========================================================================
   GROUND X, research content
   --------------------------------------------------------------------------
   Every value here comes from the research team's files (Site info sheet,
   QGIS / Google Earth Engine outputs, the Mars site list). Do NOT recalculate
   or invent values. Anything not yet supplied stays `null` ("Pending").

   To add content later:
   - A new Moon/Mars site      -> push an object into GX.SITES
   - A second Earth analog     -> fill the `null` slot in that site's analogs[]
   - A similarity percentage   -> set analog.comparison.similarity (0–100),
                                  ONLY once a documented scoring method exists
   - A rover                   -> add to GX.ROVERS and list its id in analog.rovers
   - An Earth analog card      -> add to GX.ANALOG_LIBRARY
   ========================================================================== */

window.GX = window.GX || {};

/* ---------- images (assets/img). `caption` is shown in the lightbox ---------- */
GX.IMG = {
  shackletonPhoto: { src: "assets/img/shackleton-render.webp", caption: { en: "Shackleton crater at the lunar south pole (NASA Scientific Visualization Studio).", ar: "فوهة شاكلتون عند القطب الجنوبي للقمر (استوديو ناسا للتصوير العلمي)." } },
  haughtonPhoto: { src: "assets/img/haughton-landsat.webp", caption: { en: "Haughton Crater, Devon Island, Landsat 8 (Wikimedia Commons).", ar: "فوهة هوتون، جزيرة ديفون، القمر الصناعي لاندسات 8 (ويكيميديا كومنز)." } },
  moonSlope: { src: "assets/img/moon-slope.webp", caption: { en: "Shackleton Rim (Site04) slope classes rendered from the NASA 5 m/px slope raster. Green 0–10°, yellow >10–20°, red >20°.", ar: "فئات الانحدار لحافة شاكلتون (Site04) من بيانات الانحدار لناسا بدقة 5 م/بكسل. الأخضر 0–10°، الأصفر >10–20°، الأحمر >20°." } },
  moonSlopeLayout: { src: "assets/img/moon-slope-layout.webp", caption: { en: "Team slope map: Shackleton Rim, Slope Analysis (Moon), QGIS.", ar: "خريطة الانحدار للفريق: حافة شاكلتون، تحليل الانحدار (القمر)، QGIS." } },
  moonRough: { src: "assets/img/moon-roughness.webp", caption: { en: "Shackleton Rim terrain roughness (QGIS). Brighter = rougher.", ar: "خشونة التضاريس لحافة شاكلتون (QGIS). الأفتح = الأكثر خشونة." } },
  moonRelief: { src: "assets/img/moon-relief.webp", caption: { en: "Shaded relief of the Site04 elevation model (5 m/px).", ar: "تظليل التضاريس لنموذج الارتفاع Site04 (5 م/بكسل)." } },
  earthSlope: { src: "assets/img/earth-slope.webp", caption: { en: "Haughton Crater slope classes inside the 10 km analysis buffer. Green 0–10°, yellow >10–20°, red >20°.", ar: "فئات الانحدار لفوهة هوتون داخل نطاق التحليل (10 كم). الأخضر 0–10°، الأصفر >10–20°، الأحمر >20°." } },
  earthSlopeLayout: { src: "assets/img/earth-slope-layout.webp", caption: { en: "Team slope map: Haughton Crater, Slope Analysis (Earth analog), QGIS.", ar: "خريطة الانحدار للفريق: فوهة هوتون، تحليل الانحدار (نظير أرضي)، QGIS." } },
  earthRough: { src: "assets/img/earth-roughness.webp", caption: { en: "Haughton Crater terrain roughness inside the 10 km buffer. Brighter = rougher.", ar: "خشونة التضاريس لفوهة هوتون داخل نطاق 10 كم. الأفتح = الأكثر خشونة." } },
  vallesPhoto: { src: "assets/img/mars/valles-marineris.webp", caption: { en: "Valles Marineris, NASA Mars Trek.", ar: "فاليس مارينيريس، NASA Mars Trek." } },
  syrtisPhoto: { src: "assets/img/mars/syrtis-major.webp", caption: { en: "Syrtis Major, NASA Mars Trek.", ar: "سيرتس ميجور، NASA Mars Trek." } },
  aoniaPhoto: { src: "assets/img/mars/aonia-terra.webp", caption: { en: "Aonia Terra, NASA Mars Trek.", ar: "أونيا تيرا، NASA Mars Trek." } },
  jezeroPhoto: { src: "assets/img/mars/jezero.webp", caption: { en: "Jezero Crater, NASA Mars Trek.", ar: "فوهة جيزيرو، NASA Mars Trek." } },
  samailPhoto: { src: "assets/img/oman/samail-crop.webp", caption: { en: "Samail Ophiolite analysis area (similarity layer).", ar: "منطقة تحليل أفيوليت سمائل (طبقة التشابه)." } },
  amadeePhoto: { src: "assets/img/oman/amadee-crop.webp", caption: { en: "AMADEE-18 'Kepler' station area, Dhofar: analysis view.", ar: "منطقة محطة «كبلر» لمهمة AMADEE-18، ظفار: عرض التحليل." } }
};

/* ---------- shared label helpers ---------- */
const K = {
  mean: { en: "Mean", ar: "المتوسط" },
  median: { en: "Median (P50)", ar: "الوسيط (P50)" },
  p90: { en: "90th percentile", ar: "المئين 90" },
  max: { en: "Maximum", ar: "الأقصى" },
  min: { en: "Minimum", ar: "الأدنى" },
  sd: { en: "Standard deviation", ar: "الانحراف المعياري" },
  meanSlope: { en: "Mean slope", ar: "متوسط الانحدار" },
  meanRough: { en: "Mean roughness", ar: "متوسط الخشونة" },
  meanElev: { en: "Mean elevation", ar: "متوسط الارتفاع" }
};
const GEE = { en: "Satellite terrain analysis", ar: "تحليل التضاريس من بيانات الأقمار الصناعية" };
const GEE_NOTE = { en: "Values from the team's terrain analysis.", ar: "القيم من تحليل الفريق للتضاريس." };
const TRI_NOTE = { en: "Roughness here is TRI in metres, not directly comparable with the QGIS roughness used for Shackleton and Haughton.", ar: "الخشونة هنا مؤشر TRI بالمتر، غير قابلة للمقارنة المباشرة مع خشونة QGIS المستخدمة لشاكلتون وهوتون." };

/* Builds the three criteria blocks from a raw Earth Engine statistics object (values shown to 2 decimals). */
function geeCriteria(s) {
  const f = (v, u = "") => Number(v).toFixed(2) + u;
  return {
    slope: {
      headline: f(s.slope_mean, "°"), headlineLabel: K.meanSlope,
      facts: [{ k: K.mean, v: f(s.slope_mean, "°") }, { k: K.median, v: f(s.slope_p50, "°") }, { k: K.p90, v: f(s.slope_p90, "°") }, { k: K.max, v: f(s.slope_max, "°") }, { k: K.sd, v: f(s.slope_stdDev, "°") }],
      method: GEE, note: GEE_NOTE
    },
    roughness: {
      headline: f(s.rough_mean, " m"), headlineLabel: { en: "Mean roughness (TRI)", ar: "متوسط الخشونة (TRI)" },
      facts: [{ k: K.mean, v: f(s.rough_mean, " m") }, { k: K.median, v: f(s.rough_p50, " m") }, { k: K.p90, v: f(s.rough_p90, " m") }, { k: K.max, v: f(s.rough_max, " m") }],
      method: GEE, note: TRI_NOTE
    },
    elevation: {
      headline: f(s.elev_mean, " m"), headlineLabel: K.meanElev,
      facts: [{ k: K.min, v: f(s.elev_min, " m") }, { k: K.mean, v: f(s.elev_mean, " m") }, { k: K.p90, v: f(s.elev_p90, " m") }, { k: K.max, v: f(s.elev_max, " m") }],
      method: GEE, note: GEE_NOTE
    }
  };
}

/* ---------- Earth Engine statistics supplied for the Oman sites (raw) ---------- */
GX.GEE_STATS = {
  samail: { elev_max: 586, elev_mean: 426.6505893509731, elev_min: 327, elev_p50: 418.5078001630603, elev_p90: 490.45581609666186, elev_stdDev: 42.15780014914312, rough_max: 48.49200331675985, rough_mean: 11.930251291269526, rough_min: 0.3402720816207332, rough_p50: 11.37003839009447, rough_p90: 23.36856153354865, rough_stdDev: 8.350691317796215, slope_max: 54.119564056396484, slope_mean: 14.054676222743485, slope_min: 0, slope_p50: 11.902993089552776, slope_p90: 31.11420326223117, slope_stdDev: 11.454088259726225 },
  amadee: { elev_max: 263, elev_mean: 233.56032706321304, elev_min: 209, elev_p50: 233.00000000000017, elev_p90: 244.00000000000003, elev_stdDev: 7.806525918436016, rough_max: 9.812528434899656, rough_mean: 1.4618210207759945, rough_min: 0.4414960745439752, rough_p50: 1.3440028512388318, rough_p90: 2.2182937225145816, rough_stdDev: 0.5870903583196502, slope_max: 29.51834487915039, slope_mean: 2.1107555612957762, slope_min: 0, slope_p50: 1.9544351247065677, slope_p90: 3.9042753870431413, slope_stdDev: 1.38876316421184 }
};

/* ---------- Earth analogs ---------- */
const HAUGHTON = {
  id: "haughton", country: { en: "Canada", ar: "كندا" },
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
      display: { en: "Impact crater, eroded Arctic terrain", ar: "فوهة صدمية، تضاريس قطبية متآكلة" },
      detail: { en: "Haughton is a terrestrial impact crater with irregular landforms modified by erosion and weathering. The analysed area includes comparatively gentle terrain.", ar: "هوتون فوهة صدمية أرضية ذات أشكال أرضية غير منتظمة عدّلتها عوامل التعرية والتجوية. تشمل المنطقة المحللة تضاريس لطيفة نسبيًا." },
      evidence: null, map: "earthSlope"
    },
    slope: {
      headline: "8.25°", headlineLabel: K.meanSlope,
      facts: [{ k: K.meanSlope, v: "≈ 8.25°" }, { k: { en: "Area with slope < 10°", ar: "المساحة بانحدار أقل من 10°" }, v: "≈ 74.59%" }],
      method: { en: "DEM-based slope analysis in QGIS", ar: "تحليل الانحدار من نموذج الارتفاع باستخدام QGIS" },
      note: { en: "Numerical results require confirmation.", ar: "النتائج الرقمية تتطلب التأكيد." },
      map: "earthSlopeLayout"
    },
    roughness: {
      headline: "1.90", headlineLabel: K.meanRough,
      facts: [{ k: K.mean, v: "1.9040" }, { k: { en: "Maximum recorded value", ar: "أقصى قيمة مسجّلة" }, v: "33.1709" }],
      method: { en: "QGIS roughness analysis using processed DEM", ar: "تحليل الخشونة في QGIS باستخدام نموذج الارتفاع المعالج" },
      note: { en: "Calculation comparability requires verification.", ar: "قابلية مقارنة الحساب تتطلب التحقق." },
      map: "earthRough"
    },
    geology: {
      display: { en: "Impact-modified sedimentary rocks", ar: "صخور رسوبية معدّلة بالاصطدام" },
      detail: { en: "Haughton contains sedimentary bedrock and geological materials affected by impact processes, erosion, and Arctic environmental conditions.", ar: "تحتوي هوتون على صخور أساس رسوبية ومواد جيولوجية تأثرت بعمليات الاصطدام والتعرية والظروف البيئية القطبية." },
      reference: null
    }
  },
  bars: { slopeMean: 8.25, flatShare: 74.59, roughMean: 1.904, roughMax: 33.1709 },
  comparison: {
    similarity: null, difference: null, // pending, needs a documented scoring method
    similar: { en: "Both locations feature impact-related landforms.", ar: "يتميز الموقعان بأشكال أرضية ناتجة عن الاصطدام." },
    different: { en: "Shackleton has a higher average slope and a smaller proportion of low-slope terrain within the analysed areas.", ar: "تمتلك شاكلتون متوسط انحدار أعلى ونسبة أقل من التضاريس منخفضة الانحدار ضمن المناطق المحللة." },
    conclusion: { en: "Haughton is a potential partial Earth analog of the selected Shackleton region. Full analog suitability remains unverified.", ar: "تُعد هوتون نظيرًا أرضيًا جزئيًا محتملًا لمنطقة شاكلتون المختارة. ولا تزال ملاءمتها كنظير كامل غير مؤكدة." }
  },
  rovers: ["pending-1"]
};

const PAIRING_NOTE = { en: "Pairing from the team's Mars site review; detailed analysis to follow.", ar: "اقتران من مراجعة الفريق لمواقع المريخ؛ التحليل التفصيلي لاحقًا." };
const omanAnalog = (o) => Object.assign({ country: { en: "Oman", ar: "عُمان" }, coords: null, resolution: null, area: null, maps: {}, bars: null, photoSource: null, rovers: [] }, o);

const SAMAIL = omanAnalog({
  id: "samail",
  name: { en: "Samail Ophiolite", ar: "أفيوليت سمائل" },
  location: { en: "Al Hajar Mountains, Oman", ar: "جبال الحجر، عُمان" },
  type: { en: "Ophiolite (exposed oceanic crust and mantle rocks)", ar: "أفيوليت (صخور قشرة محيطية ووشاح مكشوفة)" },
  photo: "samailPhoto",
  resolution: { en: "Satellite analysis area", ar: "منطقة تحليل من الأقمار الصناعية" },
  criteria: Object.assign(geeCriteria(GX.GEE_STATS.samail), {
    geology: {
      display: { en: "Ophiolite rocks of the Al Hajar Mountains", ar: "صخور الأفيوليت في سلسلة جبال الحجر" },
      detail: { en: "Mafic and ultramafic rocks and their alteration products (serpentine, carbonates) exposed in a semi-arid setting, studied as a Mars analog for minerals seen from Mars orbit (Leask et al., 2021).", ar: "صخور مافية وفوق مافية ونواتج تحولها (السربنتين والكربونات) مكشوفة في بيئة شبه جافة، تُدرس كنظير للمريخ للمعادن المرصودة من مداره (Leask وآخرون، 2021)." },
      reference: "https://doi.org/10.1029/2021EA001637"
    }
  }),
  comparison: { similarity: null, difference: null, similar: null, different: null, conclusion: PAIRING_NOTE }
});

const AMADEE = omanAnalog({
  id: "amadee",
  name: { en: "AMADEE-18 'Kepler' station", ar: "محطة «كبلر» لمهمة AMADEE-18" },
  location: { en: "Dhofar desert, Oman", ar: "صحراء ظفار، عُمان" },
  type: { en: "Site of the 2018 Mars analog mission (Austrian Space Forum with the Oman Astronomical Society)", ar: "موقع مهمة محاكاة المريخ عام 2018 (المنتدى الفضائي النمساوي بالشراكة مع الجمعية الفلكية العُمانية)" },
  photo: "amadeePhoto",
  criteria: Object.assign(geeCriteria(GX.GEE_STATS.amadee), {
    terrain: {
      display: { en: "Flat, open desert plain", ar: "سهل صحراوي مفتوح ومنبسط" },
      detail: { en: "Used in February 2018 for a simulated human–robotic Mars mission with analog astronauts in spacesuit simulators.", ar: "استُخدم في فبراير 2018 لمحاكاة مهمة بشرية روبوتية إلى المريخ مع روّاد تناظريين يرتدون محاكيات بدلات فضائية." },
      reference: "https://oewf.org/en/amadee-18/"
    }
  })
});

const named = (id, name, location, type, terrain) => omanAnalog({ id, name, location, type, photo: null, criteria: { terrain: { display: terrain } }, comparison: { similarity: null, difference: null, similar: null, different: null, conclusion: PAIRING_NOTE } });
const WADI_GHUL = named("wadi-ghul", { en: "Wadi Ghul", ar: "وادي غول" }, { en: "Al Hamra, Oman", ar: "ولاية الحمراء، عُمان" }, { en: "Large, deep wadi", ar: "وادٍ كبير وعميق" }, { en: "Large wadi / canyon", ar: "وادٍ كبير / أخدود" });
const SHARQIYA = named("sharqiya", { en: "Al Sharqiya Sands", ar: "رمال الشرقية" }, { en: "Ash Sharqiyah, Oman", ar: "محافظة الشرقية، عُمان" }, { en: "Sand sea", ar: "بحر رمال" }, { en: "Sand fields and dunes", ar: "حقول رمال وكثبان رملية" });
const MISTAL = named("mistal-huqf", { en: "Wadi Mistal & the Huqf area", ar: "وادي مستل ومنطقة حقف" }, { en: "Oman", ar: "عُمان" }, { en: "Dry wadi and basin", ar: "وادٍ وحوض جافان" }, { en: "Dry lake / basin setting", ar: "بيئة بحيرة / حوض جاف" });

/* ---------- Moon & Mars sites ---------- */
const marsSite = (o) => Object.assign({
  body: "mars", dataset: { en: "NASA Mars Trek imagery", ar: "صور NASA Mars Trek" }, resolution: null, status: "preliminary",
  photoSource: "https://trek.nasa.gov/mars/", area: null, maps: {}, bars: null, profile: false
}, o);

GX.SITES = [
  {
    id: "shackleton", body: "moon", code: "M-01",
    name: { en: "Shackleton Rim", ar: "حافة شاكلتون" },
    location: { en: "Lunar South Pole", ar: "القطب الجنوبي للقمر" },
    dataset: { en: "NASA Site04", ar: "ناسا Site04" },
    resolution: "5 m/px", status: "preliminary",
    photo: "shackletonPhoto", photoSource: "https://svs.gsfc.nasa.gov/4716",
    area: { en: "Site04 tile ≈ 16 × 16 km", ar: "مربع Site04 ≈ 16 × 16 كم" },
    maps: { slope: "moonSlope", roughness: "moonRough", relief: "moonRelief" },
    criteria: {
      terrain: {
        display: { en: "Impact crater rim, irregular terrain", ar: "حافة فوهة صدمية، تضاريس غير منتظمة" },
        detail: { en: "Shackleton Rim contains impact-related lunar landforms, steep crater slopes, and areas of uneven relief.", ar: "تضم حافة شاكلتون أشكالًا أرضية قمرية ناتجة عن الاصطدام، ومنحدرات فوهة شديدة، ومناطق ذات تضاريس غير مستوية." },
        evidence: { en: "NASA Site04 elevation dataset", ar: "بيانات الارتفاع Site04 من ناسا" },
        map: "moonRelief"
      },
      slope: {
        headline: "20.66°", headlineLabel: K.meanSlope,
        facts: [{ k: K.meanSlope, v: "20.6641°" }, { k: { en: "Maximum recorded slope", ar: "أقصى انحدار مسجّل" }, v: "69.6472°" }, { k: { en: "Area with slope < 10°", ar: "المساحة بانحدار أقل من 10°" }, v: "18.81%" }],
        method: { en: "NASA slope raster analysed in QGIS", ar: "تحليل بيانات الانحدار من ناسا باستخدام QGIS" },
        map: "moonSlopeLayout"
      },
      roughness: {
        headline: "5.06", headlineLabel: K.meanRough,
        facts: [{ k: K.mean, v: "5.0552" }, { k: { en: "Maximum recorded value", ar: "أقصى قيمة مسجّلة" }, v: "29.1604" }, { k: K.sd, v: "2.7205" }],
        evidence: { en: "QGIS statistics report (Shackleton_Roughness)", ar: "تقرير إحصاءات QGIS (Shackleton_Roughness)" },
        method: { en: "QGIS terrain roughness analysis", ar: "تحليل خشونة التضاريس باستخدام QGIS" },
        note: { en: "Units and comparability to be verified. Mean taken from the QGIS statistics report (corrects 1.0552 in the Site info sheet).", ar: "الوحدات وقابلية المقارنة قيد التحقق. المتوسط مأخوذ من تقرير إحصاءات QGIS (تصحيحًا للقيمة 1.0552 في ورقة معلومات الموقع)." },
        map: "moonRough"
      },
      geology: {
        display: { en: "Lunar impact-related materials", ar: "مواد قمرية مرتبطة بالاصطدام" },
        detail: { en: "The study region is associated with lunar impact processes. Surface materials may include regolith and fragmented rocky material. Detailed local material properties require further scientific verification.", ar: "ترتبط منطقة الدراسة بعمليات الاصطدام القمرية. قد تشمل مواد السطح الثرى القمري (الريغوليث) ومواد صخرية مفتتة. تتطلب الخصائص التفصيلية للمواد المحلية مزيدًا من التحقق العلمي." },
        reference: null
      }
    },
    profile: true,
    analogs: [HAUGHTON, null],
    bars: { slopeMean: 20.66, flatShare: 18.81, roughMean: 5.0552, roughMax: 29.1604 }
  },

  marsSite({
    id: "valles-marineris", code: "R-01",
    name: { en: "Valles Marineris", ar: "فاليس مارينيريس" },
    location: { en: "Equatorial canyon system, Mars", ar: "منظومة أخاديد استوائية، المريخ" },
    photo: "vallesPhoto",
    criteria: { terrain: { display: { en: "Giant canyon / valley system", ar: "أخدود أو وادٍ ضخم" }, detail: { en: "A huge canyon system. Its proposed twin in Oman: the large wadis, for example Wadi Ghul in Al Hamra.", ar: "منظومة أخاديد ضخمة. نظيرها المقترح في عُمان: الأودية الكبيرة، مثل وادي غول في ولاية الحمراء." }, note: PAIRING_NOTE } },
    analogs: [WADI_GHUL, null]
  }),
  marsSite({
    id: "syrtis-major", code: "R-02",
    name: { en: "Syrtis Major", ar: "سيرتس ميجور" },
    location: { en: "Volcanic plain, Mars", ar: "سهل بركاني، المريخ" },
    photo: "syrtisPhoto",
    criteria: { geology: { display: { en: "Basaltic and volcanic rocks", ar: "صخور بازلتية وبركانية" }, detail: { en: "Dark basaltic, volcanic terrain. Its proposed twin in Oman: the ophiolite rocks of the Al Hajar Mountains (Samail Ophiolite), which the team has analysed.", ar: "تضاريس بازلتية بركانية داكنة. نظيرها المقترح في عُمان: صخور الأفيوليت في جبال الحجر (أفيوليت سمائل)، التي حللها الفريق." }, note: PAIRING_NOTE } },
    analogs: [SAMAIL, null]
  }),
  marsSite({
    id: "aonia-terra", code: "R-03",
    name: { en: "Aonia Terra", ar: "أونيا تيرا" },
    location: { en: "Southern highlands, Mars", ar: "المرتفعات الجنوبية، المريخ" },
    photo: "aoniaPhoto",
    criteria: { terrain: { display: { en: "Sand fields and dunes", ar: "حقول رمال وكثبان رملية" }, detail: { en: "Sand fields and dune terrain. Its proposed twin in Oman: Al Sharqiya Sands.", ar: "حقول رمال وتضاريس كثبان. نظيرها المقترح في عُمان: رمال الشرقية." }, note: PAIRING_NOTE } },
    analogs: [SHARQIYA, null]
  }),
  marsSite({
    id: "jezero", code: "R-04",
    name: { en: "Jezero Crater", ar: "فوهة جيزيرو" },
    location: { en: "Ancient lake crater, Mars", ar: "فوهة بحيرة قديمة، المريخ" },
    photo: "jezeroPhoto",
    criteria: { terrain: { display: { en: "Dry lake basin", ar: "بحيرة مائية جافة" }, detail: { en: "A dried-up lake basin. Its proposed twin in Oman: Wadi Mistal and the Huqf area.", ar: "حوض بحيرة جاف. نظيرها المقترح في عُمان: وادي مستل ومنطقة حقف." }, note: PAIRING_NOTE } },
    analogs: [MISTAL, null]
  })
];

/* ---------- Earth analog library (every Earth site the team is working on) ---------- */
GX.ANALOG_LIBRARY = [
  { analog: HAUGHTON, twinOf: "shackleton", stats: { slope: "8.25°", rough: "1.90", elev: null }, source: { en: "QGIS", ar: "QGIS" } },
  { analog: SAMAIL, twinOf: "syrtis-major", stats: { slope: SAMAIL.criteria.slope.headline, rough: SAMAIL.criteria.roughness.headline, elev: SAMAIL.criteria.elevation.headline } },
  { analog: AMADEE, twinOf: null, stats: { slope: AMADEE.criteria.slope.headline, rough: AMADEE.criteria.roughness.headline, elev: AMADEE.criteria.elevation.headline }, tag: { en: "Mars analog mission site", ar: "موقع مهمة محاكاة للمريخ" } },
  { analog: WADI_GHUL, twinOf: "valles-marineris", stats: null },
  { analog: SHARQIYA, twinOf: "aonia-terra", stats: null },
  { analog: MISTAL, twinOf: "jezero", stats: null }
];

GX.ROVERS = {
  "pending-1": {
    name: null,
    testSite: { en: "Haughton Crater", ar: "فوهة هوتون" },
    research: { en: "Vehicle research, in progress", ar: "بحث المركبات، قيد الإعداد" },
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

/* ---------- evidence gallery, grouped (filter chips use `group`) ---------- */
GX.EVIDENCE_GROUPS = [
  { id: "moon", label: { en: "Moon · Shackleton", ar: "القمر · شاكلتون" } },
  { id: "canada", label: { en: "Canada · Haughton", ar: "كندا · هوتون" } },
  { id: "mars", label: { en: "Mars", ar: "المريخ" } },
  { id: "oman", label: { en: "Oman", ar: "عُمان" } }
];
GX.EVIDENCE = [
  { src: "assets/img/moon-slope-layout.webp", group: "moon", caption: { en: "Team map: Shackleton Rim, Slope Analysis (Moon).", ar: "خريطة الفريق: حافة شاكلتون، تحليل الانحدار (القمر)." } },
  { src: "assets/img/shackleton-render-2.webp", group: "moon", caption: { en: "Shackleton crater, oblique view of the rim and floor.", ar: "فوهة شاكلتون، منظر مائل للحافة والقاع." } },
  { src: "assets/img/moon-qgis-stats.webp", group: "moon", caption: { en: "QGIS statistics: Site04 slope raster (mean 20.66°, max 69.65°).", ar: "إحصاءات QGIS: بيانات انحدار Site04 (المتوسط 20.66°، الأقصى 69.65°)." } },
  { src: "assets/img/moon-qgis-histogram.webp", group: "moon", caption: { en: "QGIS: slope histogram of the Site04 raster.", ar: "QGIS: المدرج التكراري لانحدار Site04." } },
  { src: "assets/img/moon-qgis-info.webp", group: "moon", caption: { en: "QGIS: Site04 slope raster metadata (5 m/px, 3200 × 3247 px).", ar: "QGIS: البيانات الوصفية لانحدار Site04 (5 م/بكسل، 3200 × 3247 بكسل)." } },
  { src: "assets/img/moon-trek-profile.webp", group: "moon", caption: { en: "Moon Trek: elevation profile across Shackleton (LRO LOLA DEMs).", ar: "Moon Trek: مقطع الارتفاع عبر شاكلتون (نماذج LRO LOLA)." } },
  { src: "assets/img/moon-qgis-slope.webp", group: "moon", caption: { en: "QGIS: Shackleton slope classes (Site04).", ar: "QGIS: فئات انحدار شاكلتون (Site04)." } },
  { src: "assets/img/moon-trek-slope.webp", group: "moon", caption: { en: "Moon Trek: LRO LOLA colour slope, Site04 Shackleton Rim.", ar: "Moon Trek: خريطة الانحدار الملونة LRO LOLA لموقع Site04 حافة شاكلتون." } },
  { src: "assets/img/moon-trek-dem.webp", group: "moon", caption: { en: "Moon Trek: LRO LOLA DEM (5 m/px) and the elevation-profile transect.", ar: "Moon Trek: نموذج الارتفاع LRO LOLA (5 م/بكسل) ومسار مقطع الارتفاع." } },
  { src: "assets/img/lunar-map-units.webp", group: "moon", caption: { en: "Reference: lunar geologic map units and symbols.", ar: "مرجع: وحدات ورموز الخريطة الجيولوجية للقمر." } },
  { src: "assets/img/earth-slope-layout.webp", group: "canada", caption: { en: "Team map: Haughton Crater, Slope Analysis (Earth analog).", ar: "خريطة الفريق: فوهة هوتون، تحليل الانحدار (نظير أرضي)." } },
  { src: "assets/img/haughton-relief.webp", group: "canada", caption: { en: "Haughton Crater shaded relief.", ar: "تظليل تضاريس فوهة هوتون." } },
  { src: "assets/img/earth-arcticdem.webp", group: "canada", caption: { en: "ArcticDEM Explorer: 2 m mosaic tile over Haughton (75.37° N, 89.68° W).", ar: "ArcticDEM Explorer: مربع فسيفسائي بدقة 2 م فوق هوتون (75.37° ش، 89.68° غ)." } },
  { src: "assets/img/earth-arcticdem-2.webp", group: "canada", caption: { en: "ArcticDEM Explorer: point elevation check at the Haughton centre.", ar: "ArcticDEM Explorer: التحقق من الارتفاع عند مركز هوتون." } },
  { src: "assets/img/earth-qgis-buffer.webp", group: "canada", caption: { en: "QGIS: 10 km analysis buffer around the Haughton centre.", ar: "QGIS: نطاق تحليل 10 كم حول مركز هوتون." } },
  { src: "assets/img/mars/valles-marineris.webp", group: "mars", caption: { en: "Valles Marineris, NASA Mars Trek.", ar: "فاليس مارينيريس، NASA Mars Trek." } },
  { src: "assets/img/mars/syrtis-major.webp", group: "mars", caption: { en: "Syrtis Major, NASA Mars Trek.", ar: "سيرتس ميجور، NASA Mars Trek." } },
  { src: "assets/img/mars/aonia-terra.webp", group: "mars", caption: { en: "Aonia Terra, NASA Mars Trek.", ar: "أونيا تيرا، NASA Mars Trek." } },
  { src: "assets/img/mars/jezero.webp", group: "mars", caption: { en: "Jezero Crater, NASA Mars Trek.", ar: "فوهة جيزيرو، NASA Mars Trek." } },
  { src: "assets/img/oman/samail-gee.webp", group: "oman", caption: { en: "Samail analysis: slope, roughness (TRI), mafic index and similarity layers.", ar: "تحليل سمائل: طبقات الانحدار والخشونة (TRI) والمؤشر المافي والتشابه." } },
  { src: "assets/img/oman/amadee-gee.webp", group: "oman", caption: { en: "AMADEE-18 area: candidate zones and similarity export.", ar: "منطقة AMADEE-18: المناطق المرشحة وتصدير طبقة التشابه." } }
];

GX.SOURCES = [
  { label: { en: "NASA PGDA, Site04 high-resolution lunar south pole topography", ar: "ناسا PGDA، تضاريس عالية الدقة للقطب الجنوبي للقمر (Site04)" }, url: "https://pgda.gsfc.nasa.gov/products/78" },
  { label: { en: "NASA SVS, Shackleton crater imagery", ar: "ناسا SVS، صور فوهة شاكلتون" }, url: "https://svs.gsfc.nasa.gov/4716" },
  { label: { en: "Landsat 8 image of Haughton Crater (Wikimedia Commons)", ar: "صورة لاندسات 8 لفوهة هوتون (ويكيميديا كومنز)" }, url: "https://commons.wikimedia.org/wiki/File:Haughton_Crater_-Landsat_8(48010457521).png" },
  { label: { en: "ArcticDEM Explorer (Polar Geospatial Center), used for Haughton site checks", ar: "مستكشف ArcticDEM (مركز البيانات الجغرافية القطبية)، استُخدم للتحقق من موقع هوتون" }, url: "https://www.pgc.umn.edu/data/arcticdem/" },
  { label: { en: "Gawronska et al. (2020) Geologic context and potential EVA targets at the lunar south pole. Advances in Space Research 66, 1247–1264", ar: "Gawronska وآخرون (2020): السياق الجيولوجي وأهداف السير الفضائي المحتملة في القطب الجنوبي للقمر. مجلة Advances in Space Research، المجلد 66، الصفحات 1247–1264" }, url: "https://doi.org/10.1016/j.asr.2020.05.035" },
  { label: { en: "NASA Mars Trek, Mars site imagery", ar: "NASA Mars Trek، صور مواقع المريخ" }, url: "https://trek.nasa.gov/mars/" },
  { label: { en: "Leask et al. (2021) Tracing carbonate formation, serpentinization, and biological materials … in a Mars analog system, Samail Ophiolite, Oman. Earth and Space Science 8, e2021EA001637", ar: "Leask وآخرون (2021): تتبع تكوّن الكربونات والسربنتة والمواد الحيوية … في نظام نظير للمريخ، أفيوليت سمائل، عُمان. مجلة Earth and Space Science، المجلد 8" }, url: "https://doi.org/10.1029/2021EA001637" },
  { label: { en: "Austrian Space Forum, AMADEE-18 Mars analog mission, Dhofar, Oman (Mission Report V1.2, 2018)", ar: "المنتدى الفضائي النمساوي، مهمة AMADEE-18 لمحاكاة المريخ، ظفار، عُمان (تقرير المهمة، 2018)" }, url: "https://oewf.org/en/amadee-18/" },
  { label: { en: "Frigeri et al. (2018) The ScanMars radar onboard AMADEE-18 analog mission to Mars. EPSC2018-300", ar: "Frigeri وآخرون (2018): رادار ScanMars على متن مهمة AMADEE-18. EPSC2018-300" }, url: "https://meetingorganizer.copernicus.org/EPSC2018/EPSC2018-300-1.pdf" },
  { label: { en: "Sejkora, Sams & Groemer (2018) Geodata workflow for the AMADEE-18 Mars analog mission. EPSC2018-442", ar: "Sejkora وSams وGroemer (2018): سير عمل البيانات الجغرافية لمهمة AMADEE-18. EPSC2018-442" }, url: "https://meetingorganizer.copernicus.org/EPSC2018/EPSC2018-442.pdf" },
  { label: { en: "Sentinel-2 cloudless 2016 by EOX IT Services (CC BY 4.0), contains modified Copernicus Sentinel data, Haughton satellite layer", ar: "Sentinel-2 cloudless 2016 من EOX ‏(CC BY 4.0)، يتضمن بيانات Copernicus Sentinel معدّلة، طبقة القمر الصناعي لهوتون" }, url: "https://s2maps.eu" },
  { label: { en: "3D globe textures: Solar System Scope (CC BY 4.0), based on NASA data", ar: "خامات الكرات ثلاثية الأبعاد: Solar System Scope ‏(CC BY 4.0)، مبنية على بيانات ناسا" }, url: "https://www.solarsystemscope.com/textures/" },
  { label: { en: "Earth DEM original source, pending verification", ar: "المصدر الأصلي لنموذج ارتفاع الأرض، قيد التحقق" }, url: null }
];
