/* ==========================================================================
   GROUND X, research content
   --------------------------------------------------------------------------
   Every value here comes from the research team's files (Site info sheet,
   QGIS / Google Earth Engine outputs, the Mars site list). Do NOT recalculate
   or invent values. Values computed by Ground X say so in their `method`.

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
  vallesPhoto: { src: "assets/img/mars/valles-nasa.webp", caption: { en: "Valles Marineris, Viking Orbiter mosaic (NASA/JPL-Caltech/USGS, PIA00422).", ar: "فاليس مارينيريس، فسيفساء من المركبة المدارية فايكنغ (NASA/JPL-Caltech/USGS، PIA00422)." } },
  syrtisPhoto: { src: "assets/img/mars/syrtis-nasa.webp", caption: { en: "Syrtis Major Planum in false colour, THEMIS on Mars Odyssey (NASA/JPL-Caltech/ASU, PIA20984).", ar: "سهل سيرتس ميجور بألوان زائفة، جهاز THEMIS على المركبة مارس أوديسي (NASA/JPL-Caltech/ASU، PIA20984)." } },
  aoniaPhoto: { src: "assets/img/mars/aonia-nasa.webp", caption: { en: "Dune fields in Aonia Planum and Aonia Terra, THEMIS on Mars Odyssey (NASA/JPL/ASU, PIA13839).", ar: "حقول كثبان في أونيا بلانوم وأونيا تيرا، جهاز THEMIS على المركبة مارس أوديسي (NASA/JPL/ASU، PIA13839)." } },
  jezeroPhoto: { src: "assets/img/mars/jezero-nasa.webp", caption: { en: "Jezero Crater delta, Mars 2020 landing site, CTX and CRISM on MRO (NASA/JPL-Caltech/MSSS/JHU-APL, PIA23239).", ar: "دلتا فوهة جيزيرو، موقع هبوط مهمة مارس 2020، من جهازي CTX وCRISM على المركبة MRO (NASA/JPL-Caltech/MSSS/JHU-APL، PIA23239)." } },
  samailPhoto: { src: "assets/img/oman/samail-nasa.webp", caption: { en: "Samail Ophiolite, Earth's crust exposed in Oman, EO-1 ALI, 6 March 2012 (NASA Earth Observatory).", ar: "أفيوليت سمائل، قشرة الأرض مكشوفة في عُمان، القمر EO-1 بجهاز ALI، 6 مارس 2012 (مرصد الأرض التابع لناسا)." } },
  samailMap: { src: "assets/img/oman/samail-crop.webp", caption: { en: "Samail Ophiolite analysis area (similarity layer).", ar: "منطقة تحليل أفيوليت سمائل (طبقة التشابه)." } },
  sharqiyaPhoto: { src: "assets/img/oman/sharqiya-nasa.webp", caption: { en: "Al Sharqiya (Wahiba) Sands from Space Shuttle Discovery, STS-85, August 1997 (NASA JSC, STS085-501-14).", ar: "رمال الشرقية (وهيبة) من مكوك الفضاء ديسكفري، المهمة STS-85، أغسطس 1997 (مركز جونسون التابع لناسا، STS085-501-14)." } },
  viperPhoto: { src: "assets/img/rovers/viper-nasa.webp", caption: { en: "VIPER mobility platform testing in the SLOPE lab, NASA Glenn Research Center, 2019 (NASA/GRC/Bridget Caswell, GRC-2019-C-09935).", ar: "اختبار منصة حركة VIPER في مختبر SLOPE، مركز غلين للأبحاث التابع لناسا، 2019 (NASA/GRC/Bridget Caswell، GRC-2019-C-09935)." } },
  perseverancePhoto: { src: "assets/img/rovers/perseverance-nasa.webp", caption: { en: "Perseverance's selfie with the Ingenuity helicopter in Jezero Crater, 6 April 2021 (NASA/JPL-Caltech/MSSS, PIA24542).", ar: "صورة ذاتية لبرسفيرانس مع المروحية إنجينيويتي في فوهة جيزيرو، 6 أبريل 2021 (NASA/JPL-Caltech/MSSS، PIA24542)." } },
  hajarPhoto: { src: "assets/img/oman/hajar-iss053.webp", caption: { en: "Western Al Hajar Mountains from the International Space Station, 1 December 2017. The view includes Nizwa (near Wadi Ghul) and Nakhl (near Wadi Mistal). NASA JSC, ISS053-E-302321.", ar: "غرب جبال الحجر من محطة الفضاء الدولية، 1 ديسمبر 2017. يشمل المشهد نزوى (قرب وادي غول) ونخل (قرب وادي مستل). مركز جونسون التابع لناسا، ISS053-E-302321." } },
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

/* ---------- Ground X terrain statistics on a matched 463 m grid ----------
   Mars: NASA MGS MOLA global DEM (463 m/px). Oman: NASA SRTM elevation (AWS Terrain Tiles, ~35 m)
   block-averaged to the same 463 m grid so both worlds are measured the same way.
   Slope: Horn method (degrees). Roughness: TRI, mean absolute height difference to the 8 neighbours (m).
   Relief: 95th minus 5th elevation percentile (m). */
GX.DEM_STATS = {
  valles:   { box: "8–12° S, 68–76° W", area: 110080, slope_mean: 5.84, slope_p50: 3.09, slope_p90: 16.46, slope_max: 47.53, flat10: 81.91, tri_mean: 37.92, tri_p90: 106.25, elev_min: -5306, elev_mean: -1494, elev_max: 5107, relief: 9415 },
  syrtis:   { box: "7–10° N, 67–71° E", area: 41321, slope_mean: 1.10, slope_p50: 0.73, slope_p90: 1.89, slope_max: 26.46, flat10: 99.18, tri_mean: 7.08, tri_p90: 12.12, elev_min: 73, elev_mean: 1301, elev_max: 2018, relief: 1472 },
  aonia:    { box: "56–60° S, 92–100° W", area: 59234, slope_mean: 1.52, slope_p50: 0.77, slope_p90: 2.87, slope_max: 23.78, flat10: 97.30, tri_mean: 7.60, tri_p90: 14.62, elev_min: -135, elev_mean: 1598, elev_max: 2724, relief: 1185 },
  jezero:   { box: "18.00–18.85° N, 77.10–78.00° E", area: 2460, slope_mean: 2.66, slope_p50: 1.60, slope_p90: 6.34, slope_max: 22.74, flat10: 95.52, tri_mean: 17.03, tri_p90: 40.50, elev_min: -2888, elev_mean: -2332, elev_max: -1465, relief: 771 },
  wadiGhul: { box: "23.10–23.30° N, 57.12–57.32° E", area: 403, slope_mean: 14.15, slope_p50: 12.27, slope_p90: 26.51, slope_max: 47.98, flat10: 35.71, tri_mean: 102.95, tri_p90: 192.87, elev_min: 646, elev_mean: 1511, elev_max: 2931, relief: 1708 },
  sharqiya: { box: "21.60–22.20° N, 58.50–59.00° E", area: 3319, slope_mean: 1.25, slope_p50: 1.01, slope_p90: 2.66, slope_max: 4.90, flat10: 100.00, tri_mean: 12.39, tri_p90: 22.15, elev_min: 148, elev_mean: 240, elev_max: 371, relief: 164 },
  mistal:   { box: "23.15–23.40° N, 57.62–57.87° E", area: 664, slope_mean: 13.18, slope_p50: 12.44, slope_p90: 27.66, slope_max: 41.45, flat10: 45.17, tri_mean: 100.46, tri_p90: 201.74, elev_min: 278, elev_mean: 924, elev_max: 2378, relief: 1499 },
  samail:   { box: "22.85–23.10° N, 58.35–58.65° E", area: 789, slope_mean: 6.32, slope_p50: 5.49, slope_p90: 11.94, slope_max: 34.14, flat10: 82.15, tri_mean: 55.16, tri_p90: 94.75, elev_min: 319, elev_mean: 741, elev_max: 1508, relief: 706 }
};

const MOLA = { en: "NASA MGS MOLA DEM, 463 m/px", ar: "نموذج الارتفاع MOLA من ناسا، 463 م/بكسل" };
const SRTM = { en: "NASA SRTM DEM (~35 m) resampled to 463 m", ar: "نموذج الارتفاع SRTM من ناسا (~35 م) معاد إلى 463 م" };
const GXM = (src) => ({ en: "Computed by Ground X from the " + src.en, ar: "حسبه فريق Ground X من " + src.ar });
const MATCH_NOTE = { en: "Same 463 m grid and method on both worlds, so the numbers are directly comparable.", ar: "الشبكة نفسها (463 م) والطريقة نفسها على العالمين، لذا الأرقام قابلة للمقارنة مباشرة." };
const MOLA_URL = "https://astrogeology.usgs.gov/search/map/mars_mgs_mola_dem_463m";
const SRTM_URL = "https://www.earthdata.nasa.gov/data/instruments/srtm";
const QUAL = { en: "Qualitative, from orbital and field imagery", ar: "تقييم نوعي من صور المدار والصور الميدانية" };
const f2 = (v, u = "") => Number(v).toFixed(2) + u;
const m0 = (v) => Math.round(v).toLocaleString("en-US") + " m";

/* slope, roughness and elevation criteria from a GX.DEM_STATS entry */
function demCriteria(st, src, url) {
  const method = GXM(src);
  return {
    slope: {
      headline: f2(st.slope_mean, "°"), headlineLabel: K.meanSlope,
      facts: [{ k: K.mean, v: f2(st.slope_mean, "°") }, { k: K.median, v: f2(st.slope_p50, "°") }, { k: K.p90, v: f2(st.slope_p90, "°") }, { k: K.max, v: f2(st.slope_max, "°") }, { k: { en: "Area with slope < 10°", ar: "المساحة بانحدار أقل من 10°" }, v: f2(st.flat10, "%") }],
      method, note: MATCH_NOTE, reference: url
    },
    roughness: {
      headline: f2(st.tri_mean, " m"), headlineLabel: { en: "Mean roughness (TRI)", ar: "متوسط الخشونة (TRI)" },
      facts: [{ k: K.mean, v: f2(st.tri_mean, " m") }, { k: K.p90, v: f2(st.tri_p90, " m") }],
      method, note: MATCH_NOTE, reference: url
    },
    elevation: {
      headline: m0(st.elev_mean), headlineLabel: K.meanElev,
      facts: [{ k: K.min, v: m0(st.elev_min) }, { k: K.mean, v: m0(st.elev_mean) }, { k: K.max, v: m0(st.elev_max) }, { k: { en: "Relief (5th to 95th percentile)", ar: "التضاريس (من المئين 5 إلى 95)" }, v: m0(st.relief) }],
      method, reference: url
    }
  };
}
const demBars = (st) => ({ slopeMean: st.slope_mean, flatShare: st.flat10, roughMean: st.tri_mean, relief: st.relief });

/* Ground X terrain similarity index: for each shared metric, 100 x smaller / larger, then the mean.
   Geometry only (slope and roughness, plus relief where both sides have it). */
GX.similarity = (a, b) => {
  const keys = ["slopeMean", "flatShare", "roughMean", "relief"].filter((k) => a[k] != null && b[k] != null);
  const parts = keys.map((k) => 100 * Math.min(a[k], b[k]) / Math.max(a[k], b[k]));
  return Math.round(parts.reduce((x, y) => x + y, 0) / parts.length);
};

const TEMP_OMAN = { en: "Hot desert climate: summer days above 40 °C in the lowlands, mild winters.", ar: "مناخ صحراوي حار: نهار الصيف فوق 40 °م في الأراضي المنخفضة، وشتاء معتدل." };
const OMAN_CLIMATE = "https://climateknowledgeportal.worldbank.org/country/oman/climate-data-historical";
const MARS_FACTS = "https://science.nasa.gov/mars/facts/";
const JEZERO_MET = "https://doi.org/10.1038/s41561-022-01084-0";

const omanAnalog = (o) => Object.assign({ country: { en: "Oman", ar: "عُمان" }, maps: {}, rovers: [] }, o);

const SAMAIL = omanAnalog({
  id: "samail",
  name: { en: "Samail Ophiolite", ar: "أفيوليت سمائل" },
  location: { en: "Al Hajar Mountains, Oman", ar: "جبال الحجر، عُمان" },
  coords: "23.0° N, 58.5° E",
  type: { en: "Ophiolite (exposed oceanic crust and mantle rocks)", ar: "أفيوليت (صخور قشرة محيطية ووشاح مكشوفة)" },
  photo: "samailPhoto", photoSource: "https://science.nasa.gov/earth/earth-observatory/earths-crust-exposed-in-oman-77569",
  resolution: { en: "Team satellite analysis · Ground X 463 m grid", ar: "تحليل الفريق بالأقمار الصناعية · شبكة Ground X بدقة 463 م" },
  area: { en: "Team area + 789 km² matched box", ar: "منطقة الفريق + مربع مطابق 789 كم²" },
  criteria: Object.assign(geeCriteria(GX.GEE_STATS.samail), {
    terrain: {
      display: { en: "Rugged ophiolite hills and wadis", ar: "تلال أفيوليتية وعرة وأودية" },
      detail: { en: "Dark, deeply dissected hills of mantle and crustal rock cut by gravel wadis, seen in the NASA EO-1 image.", ar: "تلال داكنة شديدة التقطع من صخور الوشاح والقشرة تقطعها أودية حصوية، كما تظهر في صورة EO-1 من ناسا." },
      evidence: { en: "NASA Earth Observatory, EO-1 ALI", ar: "مرصد الأرض التابع لناسا، EO-1 ALI" }
    },
    geology: {
      display: { en: "Ophiolite rocks of the Al Hajar Mountains", ar: "صخور الأفيوليت في سلسلة جبال الحجر" },
      detail: { en: "Mafic and ultramafic rocks and their alteration products (serpentine, carbonates) exposed in a semi-arid setting, studied as a Mars analog for minerals seen from Mars orbit (Leask et al., 2021).", ar: "صخور مافية وفوق مافية ونواتج تحولها (السربنتين والكربونات) مكشوفة في بيئة شبه جافة، تُدرس كنظير للمريخ للمعادن المرصودة من مداره (Leask وآخرون، 2021)." },
      reference: "https://doi.org/10.1029/2021EA001637"
    },
    rockSize: {
      display: { en: "Outcrops, blocks and wadi cobbles", ar: "نتوءات صخرية وكتل وحصى الأودية" },
      detail: { en: "Fractured peridotite and gabbro outcrops shed metre-size blocks; wadi floors carry gravel and cobbles.", ar: "تتكسر نتوءات البيريدوتيت والجابرو إلى كتل بحجم المتر، وتحمل قيعان الأودية الحصى والجلاميد الصغيرة." },
      method: QUAL
    },
    rockDensity: {
      display: { en: "High on slopes, moderate in wadis", ar: "عالية على المنحدرات، متوسطة في الأودية" },
      detail: { en: "Bare rock and scree cover most hillsides; flatter wadi floors are gravel-covered.", ar: "تغطي الصخور العارية والركام معظم السفوح، وتكسو الحصى قيعان الأودية الأكثر استواءً." },
      method: QUAL
    },
    temperature: { display: { en: "Hot: summer highs above 40 °C", ar: "حار: نهار الصيف فوق 40 °م" }, detail: TEMP_OMAN, reference: OMAN_CLIMATE }
  }),
  bars: demBars(GX.DEM_STATS.samail),
  rovers: ["perseverance"]
});
SAMAIL.criteria.slope.note = { en: "Team values from satellite terrain analysis. The comparison bars use the matched 463 m grid.", ar: "قيم الفريق من تحليل التضاريس بالأقمار الصناعية. أشرطة المقارنة تستخدم الشبكة المطابقة 463 م." };

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

const twin = (o) => omanAnalog(o);
const WADI_GHUL = twin({
  id: "wadi-ghul",
  name: { en: "Wadi Ghul", ar: "وادي غول" },
  location: { en: "Al Hamra, Al Hajar Mountains, Oman", ar: "ولاية الحمراء، جبال الحجر، عُمان" },
  coords: "23.2° N, 57.2° E",
  type: { en: "Large, deep wadi (canyon) below Jebel Shams", ar: "وادٍ كبير وعميق (أخدود) أسفل جبل شمس" },
  photo: "hajarPhoto", photoSource: "https://eol.jsc.nasa.gov/SearchPhotos/photo.pl?mission=ISS053&roll=E&frame=302321",
  resolution: SRTM, area: { en: "403 km² box", ar: "مربع 403 كم²" },
  criteria: Object.assign(demCriteria(GX.DEM_STATS.wadiGhul, SRTM, SRTM_URL), {
    terrain: {
      display: { en: "Deep canyon cut into a mountain plateau", ar: "أخدود عميق محفور في هضبة جبلية" },
      detail: { en: "Sheer walls drop from the Jebel Shams plateau (about 3,000 m, Oman's highest summit) into the wadi, the same wall-and-floor form as Valles Marineris at a much smaller scale.", ar: "تنحدر جدران شاهقة من هضبة جبل شمس (نحو 3,000 م، أعلى قمة في عُمان) إلى قاع الوادي، بالشكل نفسه من الجدران والقاع في فاليس مارينيريس ولكن بحجم أصغر بكثير." },
      evidence: { en: "ISS astronaut photo ISS053-E-302321", ar: "صورة رواد محطة الفضاء ISS053-E-302321" }
    },
    geology: {
      display: { en: "Layered limestone and dolomite cliffs", ar: "جروف من الحجر الجيري والدولوميت المتطبق" },
      detail: { en: "The canyon exposes thick, layered carbonate rocks of the Hajar Supergroup, eroded by flash floods into steep walls and talus.", ar: "يكشف الأخدود صخورًا كربونية متطبقة سميكة من مجموعة الحجر العليا، نحتتها السيول إلى جدران شديدة الانحدار وركام." },
      method: QUAL
    },
    rockSize: { display: { en: "Boulders and talus below the walls", ar: "جلاميد وركام أسفل الجدران" }, detail: { en: "Rockfall from the walls leaves boulder-strewn slopes; the wadi floor holds gravel and cobbles.", ar: "تخلّف الانهيارات الصخرية من الجدران منحدرات مليئة بالجلاميد، ويحمل قاع الوادي الحصى والجلاميد الصغيرة." }, method: QUAL },
    rockDensity: { display: { en: "High", ar: "عالية" }, detail: { en: "Bare rock walls and talus dominate; little soil or sand.", ar: "تغلب الجدران الصخرية العارية والركام، مع القليل من التربة أو الرمل." }, method: QUAL },
    temperature: { display: { en: "Hot floor, cool plateau", ar: "قاع حار وهضبة باردة" }, detail: { en: "Hot summers on the wadi floor; the plateau above 2,000 m is much cooler and can approach freezing in winter.", ar: "صيف حار في قاع الوادي، بينما الهضبة فوق 2,000 م أبرد بكثير وقد تقترب من التجمد شتاءً." }, reference: OMAN_CLIMATE }
  }),
  bars: demBars(GX.DEM_STATS.wadiGhul),
  rovers: ["perseverance"]
});

const SHARQIYA = twin({
  id: "sharqiya",
  name: { en: "Al Sharqiya Sands", ar: "رمال الشرقية" },
  location: { en: "Ash Sharqiyah, Oman", ar: "محافظة الشرقية، عُمان" },
  coords: "21.9° N, 58.75° E",
  type: { en: "Sand sea (formerly Wahiba Sands)", ar: "بحر رمال (رمال وهيبة سابقًا)" },
  photo: "sharqiyaPhoto", photoSource: "https://eol.jsc.nasa.gov/SearchPhotos/photo.pl?mission=STS085&roll=501&frame=14",
  resolution: SRTM, area: { en: "3,319 km² box", ar: "مربع 3,319 كم²" },
  criteria: Object.assign(demCriteria(GX.DEM_STATS.sharqiya, SRTM, SRTM_URL), {
    terrain: {
      display: { en: "Sand fields and long dune ridges", ar: "حقول رمال وسلاسل كثبان طويلة" },
      detail: { en: "Long north–south dune ridges with smaller dunes between them, clearly lined up in the Space Shuttle photo.", ar: "سلاسل كثبان طويلة من الشمال إلى الجنوب تتخللها كثبان أصغر، تظهر مصطفة بوضوح في صورة مكوك الفضاء." },
      evidence: { en: "Space Shuttle photo STS085-501-14", ar: "صورة مكوك الفضاء STS085-501-14" }
    },
    geology: { display: { en: "Wind-blown sand over older dune rock", ar: "رمال تذروها الرياح فوق صخور كثبان أقدم" }, detail: { en: "Loose sand of quartz and carbonate grains sits on older, cemented dune sandstone.", ar: "رمال سائبة من حبيبات الكوارتز والكربونات فوق حجر رملي كثيبي أقدم ومتماسك." }, method: QUAL },
    rockSize: { display: { en: "Sand grains, almost no rocks", ar: "حبيبات رمل وتكاد تخلو من الصخور" }, detail: { en: "The surface is fine to medium sand; rocks appear only at the edges of the sand sea.", ar: "السطح رمل ناعم إلى متوسط، ولا تظهر الصخور إلا عند أطراف بحر الرمال." }, method: QUAL },
    rockDensity: { display: { en: "Very low", ar: "منخفضة جدًا" }, detail: { en: "Soft sand, not rocks, is the hazard: wheels can sink and slip on dune flanks.", ar: "الخطر هو الرمل الناعم لا الصخور: قد تغوص العجلات وتنزلق على جوانب الكثبان." }, method: QUAL },
    temperature: { display: { en: "Very hot summers, cool nights", ar: "صيف شديد الحرارة وليالٍ باردة" }, detail: TEMP_OMAN, reference: OMAN_CLIMATE }
  }),
  bars: demBars(GX.DEM_STATS.sharqiya),
  rovers: ["perseverance"]
});

const MISTAL = twin({
  id: "mistal-huqf",
  name: { en: "Wadi Mistal", ar: "وادي مستل" },
  location: { en: "Nakhal, Al Hajar Mountains, Oman", ar: "ولاية نخل، جبال الحجر، عُمان" },
  coords: "23.3° N, 57.75° E",
  type: { en: "Mountain basin drained by a dry wadi", ar: "حوض جبلي يصرفه وادٍ جاف" },
  photo: "hajarPhoto", photoSource: "https://eol.jsc.nasa.gov/SearchPhotos/photo.pl?mission=ISS053&roll=E&frame=302321",
  resolution: SRTM, area: { en: "664 km² box", ar: "مربع 664 كم²" },
  criteria: Object.assign(demCriteria(GX.DEM_STATS.mistal, SRTM, SRTM_URL), {
    terrain: {
      display: { en: "Dry basin and wadi channels", ar: "حوض جاف وقنوات أودية" },
      detail: { en: "A basin ringed by mountains where seasonal floods have laid down gravel fans, a small-scale version of a crater lake fed by river channels. The team's pairing also names the Huqf area; the measurements here cover Wadi Mistal.", ar: "حوض تحيط به الجبال رسّبت فيه السيول الموسمية مراوح حصوية، نسخة مصغرة من بحيرة فوهة تغذيها قنوات نهرية. يذكر اقتران الفريق منطقة حقف أيضًا، والقياسات هنا تخص وادي مستل." },
      evidence: { en: "ISS astronaut photo ISS053-E-302321", ar: "صورة رواد محطة الفضاء ISS053-E-302321" }
    },
    geology: { display: { en: "Flood gravels in a carbonate mountain basin", ar: "حصى السيول في حوض جبلي كربوني" }, detail: { en: "Water-laid gravels and fans on the floor, limestone mountains around, the same 'water shaped this' story Perseverance is reading in Jezero's delta.", ar: "حصى وفيرة ومراوح رسبتها المياه في القاع وجبال جيرية حوله، القصة نفسها «الماء شكّل هذا» التي تقرؤها المركبة برسفيرانس في دلتا جيزيرو." }, method: QUAL },
    rockSize: { display: { en: "Gravel to boulders", ar: "من الحصى إلى الجلاميد" }, detail: { en: "Rounded cobbles and boulders in the channels; finer gravel on the fans.", ar: "جلاميد وحصى مستديرة في القنوات، وحصى أنعم على المراوح." }, method: QUAL },
    rockDensity: { display: { en: "Moderate to high", ar: "متوسطة إلى عالية" }, detail: { en: "Channels are rock-filled; terraces between them are smoother.", ar: "القنوات مليئة بالصخور، والمصاطب بينها أكثر نعومة." }, method: QUAL },
    temperature: { display: { en: "Hot summers, mild winters", ar: "صيف حار وشتاء معتدل" }, detail: TEMP_OMAN, reference: OMAN_CLIMATE }
  }),
  bars: demBars(GX.DEM_STATS.mistal),
  rovers: ["perseverance"]
});

/* ---------- Earth analogs: Haughton (Moon twin) ---------- */
Object.assign(HAUGHTON.criteria, {
  elevation: {
    headline: "207 m", headlineLabel: K.meanElev,
    facts: [{ k: K.min, v: "61 m" }, { k: K.mean, v: "207 m" }, { k: K.max, v: "332 m" }, { k: { en: "Relief (5th to 95th percentile)", ar: "التضاريس (من المئين 5 إلى 95)" }, v: "175 m" }],
    method: { en: "Computed by Ground X from the team's ArcticDEM grid", ar: "حسبه فريق Ground X من شبكة ArcticDEM الخاصة بالفريق" }
  },
  rockSize: {
    display: { en: "Gravel and cobbles, scattered boulders", ar: "حصى وجلاميد صغيرة مع جلاميد متناثرة" },
    detail: { en: "Frost-shattered breccia leaves a gravel and cobble cover with scattered larger blocks, as seen in NASA's K-10 rover field photos.", ar: "يتفتت البريشيا بفعل الصقيع إلى غطاء من الحصى والجلاميد الصغيرة مع كتل أكبر متناثرة، كما تظهر صور اختبار المركبة K-10 من ناسا." },
    evidence: { en: "NASA Ames K-10 field photos, 2007", ar: "صور اختبار K-10 من مركز أميس، 2007" }, method: QUAL
  },
  rockDensity: {
    display: { en: "Moderate", ar: "متوسطة" },
    detail: { en: "Rock fragments cover most of the ground, but they are small enough for a test rover to drive over.", ar: "تغطي الشظايا الصخرية معظم الأرض، لكنها صغيرة بما يكفي لتعبرها مركبة اختبار." },
    method: QUAL
  },
  temperature: {
    display: { en: "Polar desert, about −16 °C yearly mean", ar: "صحراء قطبية، متوسط سنوي نحو −16 °م" },
    detail: { en: "Annual mean about −16 °C; short summers of roughly 2 to 8 °C, when field tests take place.", ar: "المتوسط السنوي نحو −16 °م، وصيف قصير بين 2 و8 °م تقريبًا تُجرى فيه الاختبارات الميدانية." },
    reference: "https://www.thecanadianencyclopedia.ca/en/article/devon-island"
  }
});
HAUGHTON.criteria.terrain.evidence = { en: "Team slope map and Landsat 8 image", ar: "خريطة الانحدار للفريق وصورة لاندسات 8" };
HAUGHTON.rovers = ["viper"];
HAUGHTON.comparison.similarity = GX.similarity({ slopeMean: 20.66, flatShare: 18.81, roughMean: 5.0552 }, HAUGHTON.bars);
HAUGHTON.comparison.difference = 100 - HAUGHTON.comparison.similarity;

const pairCmp = (siteKey, a, similar, different, conclusion) => {
  a.comparison = { similar, different, conclusion };
  a.comparison.similarity = GX.similarity(demBars(GX.DEM_STATS[siteKey]), a.bars);
  a.comparison.difference = 100 - a.comparison.similarity;
};
pairCmp("valles", WADI_GHUL,
  { en: "Both are canyons with steep walls cut into a high plateau, with rockfall and talus below the cliffs.", ar: "كلاهما أخدود بجدران شديدة الانحدار محفور في هضبة مرتفعة، مع انهيارات صخرية وركام أسفل الجروف." },
  { en: "Valles Marineris is about 9.4 km of relief across 110,000 km²; Wadi Ghul is about 1.7 km. Most of the Mars box is flat plateau and canyon floor (82% under 10°).", ar: "تبلغ تضاريس فاليس مارينيريس نحو 9.4 كم على مساحة 110,000 كم²، مقابل نحو 1.7 كم لوادي غول. معظم مربع المريخ هضبة وقاع مستويان (82% أقل من 10°)." },
  { en: "A good analog for canyon-wall geology and rockfall hazards, not for scale.", ar: "نظير جيد لجيولوجيا جدران الأخاديد ومخاطر الانهيارات الصخرية، لا للحجم." });
pairCmp("syrtis", SAMAIL,
  { en: "Both expose dark mafic igneous rock (basalt on Mars, ophiolite on Earth) rich in the same mineral families.", ar: "كلاهما يكشف صخورًا نارية مافية داكنة (بازلت على المريخ وأفيوليت على الأرض) غنية بعائلات المعادن نفسها." },
  { en: "Syrtis Major is a very gentle volcanic plain (99% under 10°); the Samail box is hilly, with about 8 times the roughness.", ar: "سيرتس ميجور سهل بركاني لطيف جدًا (99% أقل من 10°)، بينما مربع سمائل تلالي وخشونته نحو 8 أضعاف." },
  { en: "A strong analog for rock chemistry and minerals; a weak one for terrain shape.", ar: "نظير قوي لكيمياء الصخور والمعادن، وضعيف لشكل التضاريس." });
pairCmp("aonia", SHARQIYA,
  { en: "Both are gentle surfaces where wind-blown sand gathers into dune fields (Mars 97%, Oman 100% under 10°).", ar: "كلاهما سطح لطيف تتجمع فيه الرمال المنقولة بالرياح في حقول كثبان (المريخ 97%، عُمان 100% أقل من 10°)." },
  { en: "Aonia Terra is cratered highland with dunes in low areas; Al Sharqiya is a continuous sand sea.", ar: "أونيا تيرا مرتفعات مليئة بالفوهات مع كثبان في المناطق المنخفضة، أما رمال الشرقية فبحر رمال متصل." },
  { en: "The closest terrain match in the atlas, ideal for testing rover driving on sand.", ar: "أقرب تطابق تضاريسي في الأطلس، ومثالي لاختبار قيادة المركبات على الرمال." });
pairCmp("jezero", MISTAL,
  { en: "Both are basins where water once flowed in through channels and left sediments on the floor.", ar: "كلاهما حوض دخلته المياه يومًا عبر قنوات وتركت رواسب في قاعه." },
  { en: "Jezero's floor is smooth (96% under 10°); the Wadi Mistal box includes steep mountain walls, so it is about 6 times rougher.", ar: "قاع جيزيرو أملس (96% أقل من 10°)، بينما يشمل مربع وادي مستل جدرانًا جبلية شديدة الانحدار، لذا فهو أخشن بنحو 6 أضعاف." },
  { en: "A good analog for water-laid sediments and channels; the flat basin floor is the part to test on.", ar: "نظير جيد للرواسب المائية والقنوات، والقاع المستوي هو الجزء المناسب للاختبار." });

/* ---------- Moon & Mars sites ---------- */
const marsSite = (key, o) => Object.assign({
  body: "mars", dataset: { en: "NASA MGS MOLA DEM and NASA/JPL imagery", ar: "نموذج MOLA من ناسا وصور ناسا/JPL" },
  resolution: "463 m/px", status: "final", maps: {}, profile: false, rover: "perseverance",
  area: { en: GX.DEM_STATS[key].area.toLocaleString("en-US") + " km² box, " + GX.DEM_STATS[key].box, ar: "مربع " + GX.DEM_STATS[key].area.toLocaleString("en-US") + " كم²، " + GX.DEM_STATS[key].box },
  bars: demBars(GX.DEM_STATS[key])
}, o, { criteria: Object.assign(demCriteria(GX.DEM_STATS[key], MOLA, MOLA_URL), o.criteria) });

const MARS_ROCK = (en, ar) => ({ display: en, detail: ar, method: QUAL });

GX.SITES = [
  {
    id: "shackleton", body: "moon", code: "M-01",
    name: { en: "Shackleton Rim", ar: "حافة شاكلتون" },
    location: { en: "Lunar South Pole", ar: "القطب الجنوبي للقمر" },
    coords: "89.9° S, 0° E",
    dataset: { en: "NASA Site04", ar: "ناسا Site04" },
    resolution: "5 m/px", status: "final", rover: "viper",
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
        note: { en: "Same QGIS roughness method as Haughton. Mean from the QGIS statistics report.", ar: "طريقة خشونة QGIS نفسها المستخدمة لهوتون. المتوسط من تقرير إحصاءات QGIS." },
        map: "moonRough"
      },
      elevation: {
        headline: "257 m", headlineLabel: K.meanElev,
        facts: [{ k: K.min, v: "−2,842 m" }, { k: K.mean, v: "257 m" }, { k: K.max, v: "1,803 m" }, { k: { en: "Relief (5th to 95th percentile)", ar: "التضاريس (من المئين 5 إلى 95)" }, v: "4,004 m" }],
        method: { en: "Computed by Ground X from the NASA Site04 LOLA DEM", ar: "حسبه فريق Ground X من نموذج الارتفاع LOLA (Site04) من ناسا" },
        reference: "https://pgda.gsfc.nasa.gov/products/78"
      },
      geology: {
        display: { en: "Lunar impact-related materials", ar: "مواد قمرية مرتبطة بالاصطدام" },
        detail: { en: "The study region is associated with lunar impact processes. Surface materials include regolith and fragmented rocky material from the crater's formation.", ar: "ترتبط منطقة الدراسة بعمليات الاصطدام القمرية. تشمل مواد السطح الثرى القمري (الريغوليث) ومواد صخرية مفتتة من تكوّن الفوهة." },
        reference: "https://doi.org/10.1016/j.asr.2020.05.035"
      },
      rockSize: {
        display: { en: "Fine regolith with boulders on steep walls", ar: "ثرى ناعم مع جلاميد على الجدران شديدة الانحدار" },
        detail: { en: "Orbital images show a fine-grained regolith surface, with boulders concentrated on the steep crater walls where material slides downslope.", ar: "تُظهر صور المدار سطحًا من الثرى الناعم، مع جلاميد تتركز على جدران الفوهة شديدة الانحدار حيث تنزلق المواد إلى أسفل." },
        method: QUAL, reference: "https://doi.org/10.1016/j.asr.2020.05.035"
      },
      rockDensity: {
        display: { en: "Low on the rim, higher on the walls", ar: "منخفضة على الحافة، أعلى على الجدران" },
        detail: { en: "Rocks follow slope: only 18.81% of the site is below 10°, so most of the area is steep enough to collect boulders.", ar: "تتبع الصخور الانحدار: 18.81% فقط من الموقع أقل من 10°، لذا فمعظم المنطقة شديدة الانحدار بما يكفي لتجمع الجلاميد." },
        method: QUAL
      },
      temperature: {
        display: { en: "About −50 °C on the rim, about −183 °C on the floor", ar: "نحو −50 °م على الحافة ونحو −183 °م في القاع" },
        detail: { en: "Parts of the rim are sunlit most of the time; the floor never sees the Sun and stays near 90 K (about −183 °C), cold enough to trap water ice.", ar: "أجزاء من الحافة مضاءة بالشمس معظم الوقت، أما القاع فلا يرى الشمس أبدًا ويبقى قرب 90 كلفن (نحو −183 °م)، وهو برد كافٍ لحبس جليد الماء." },
        reference: "https://en.wikipedia.org/wiki/Shackleton_(crater)"
      }
    },
    profile: true,
    analogs: [HAUGHTON],
    bars: { slopeMean: 20.66, flatShare: 18.81, roughMean: 5.0552, roughMax: 29.1604 }
  },

  marsSite("valles", {
    id: "valles-marineris", code: "R-01",
    name: { en: "Valles Marineris", ar: "فاليس مارينيريس" },
    location: { en: "Equatorial canyon system, Mars", ar: "منظومة أخاديد استوائية، المريخ" },
    coords: "10° S, 72° W",
    photo: "vallesPhoto", photoSource: "https://images.nasa.gov/details/PIA00422",
    criteria: {
      terrain: { display: { en: "Giant canyon / valley system", ar: "أخدود أو وادٍ ضخم" }, detail: { en: "More than 3,000 km long and up to about 8 km deep, the largest canyon system in the Solar System. The analysis box covers the Melas Chasma section.", ar: "يزيد طوله على 3,000 كم وعمقه يصل إلى نحو 8 كم، وهو أكبر منظومة أخاديد في المجموعة الشمسية. يغطي مربع التحليل قطاع ميلاس كازما." }, evidence: { en: "Viking Orbiter mosaic PIA00422", ar: "فسيفساء فايكنغ PIA00422" }, reference: "https://images.nasa.gov/details/PIA00422" },
      geology: { display: { en: "Layered volcanic rock and canyon sediments", ar: "صخور بركانية متطبقة ورواسب أخدودية" }, detail: { en: "The walls expose stacks of layered volcanic rock; the floor holds landslide deposits and layered sediments.", ar: "تكشف الجدران طبقات متراكمة من الصخور البركانية، ويحمل القاع رواسب انهيارات أرضية ورواسب متطبقة." }, method: QUAL, reference: "https://images.nasa.gov/details/PIA00422" },
      rockSize: MARS_ROCK({ en: "Boulders and landslide debris", ar: "جلاميد وحطام انهيارات أرضية" }, { en: "Giant landslides from the walls spread boulder-rich debris across the canyon floor.", ar: "تنشر الانهيارات الأرضية الضخمة من الجدران حطامًا غنيًا بالجلاميد على قاع الأخدود." }),
      rockDensity: MARS_ROCK({ en: "High near walls, lower on the floor", ar: "عالية قرب الجدران وأقل في القاع" }, { en: "Rock cover is highest at the foot of the walls and in landslide lobes.", ar: "يكون الغطاء الصخري أعلى عند أسفل الجدران وفي ألسنة الانهيارات." }),
      temperature: { display: { en: "Equatorial Mars: about −80 to 20 °C", ar: "المريخ الاستوائي: نحو −80 إلى 20 °م" }, detail: { en: "Near the equator, daytime ground can reach about 20 °C and nights fall below −80 °C.", ar: "قرب خط الاستواء قد تصل حرارة الأرض نهارًا إلى نحو 20 °م وتنخفض ليلًا إلى ما دون −80 °م." }, reference: MARS_FACTS }
    },
    analogs: [WADI_GHUL]
  }),
  marsSite("syrtis", {
    id: "syrtis-major", code: "R-02",
    name: { en: "Syrtis Major", ar: "سيرتس ميجور" },
    location: { en: "Volcanic plain, Mars", ar: "سهل بركاني، المريخ" },
    coords: "8.5° N, 69° E",
    photo: "syrtisPhoto", photoSource: "https://science.nasa.gov/photojournal/syrtis-major-planum-false-color-4",
    criteria: {
      terrain: { display: { en: "Broad, gently sloping volcanic plain", ar: "سهل بركاني واسع لطيف الانحدار" }, detail: { en: "A low shield volcano province with wind streaks across dark lava plains (THEMIS false colour).", ar: "إقليم براكين درعية منخفضة تعبره خطوط رياح فوق سهول حمم داكنة (THEMIS بألوان زائفة)." }, evidence: { en: "THEMIS image PIA20984", ar: "صورة THEMIS ‏PIA20984" } },
      geology: { display: { en: "Basaltic and volcanic rocks", ar: "صخور بازلتية وبركانية" }, detail: { en: "Dark basaltic lava plains. Its proposed twin in Oman: the ophiolite rocks of the Al Hajar Mountains (Samail Ophiolite), which the team has analysed.", ar: "سهول حمم بازلتية داكنة. نظيرها المقترح في عُمان: صخور الأفيوليت في جبال الحجر (أفيوليت سمائل)، التي حللها الفريق." }, reference: "https://science.nasa.gov/photojournal/syrtis-major-planum-false-color-4" },
      rockSize: MARS_ROCK({ en: "Lava blocks and dark sand", ar: "كتل حمم ورمال داكنة" }, { en: "Exposed lava surfaces with scattered blocks; dark basaltic sand collects in low spots.", ar: "أسطح حمم مكشوفة مع كتل متناثرة، وتتجمع الرمال البازلتية الداكنة في المواضع المنخفضة." }),
      rockDensity: MARS_ROCK({ en: "Low to moderate", ar: "منخفضة إلى متوسطة" }, { en: "Wind keeps much of the plain swept clean; rocks are scattered rather than packed.", ar: "تُبقي الرياح معظم السهل نظيفًا، والصخور متناثرة لا متراصة." }),
      temperature: { display: { en: "About −83 to −23 °C air", ar: "هواء نحو −83 إلى −23 °م" }, detail: { en: "Close to Jezero, where Perseverance measures air from about −83 °C before dawn to −23 °C in the afternoon.", ar: "قريب من جيزيرو حيث تقيس برسفيرانس حرارة الهواء من نحو −83 °م قبل الفجر إلى −23 °م بعد الظهر." }, reference: JEZERO_MET }
    },
    analogs: [SAMAIL]
  }),
  marsSite("aonia", {
    id: "aonia-terra", code: "R-03",
    name: { en: "Aonia Terra", ar: "أونيا تيرا" },
    location: { en: "Southern highlands, Mars", ar: "المرتفعات الجنوبية، المريخ" },
    coords: "58° S, 96° W",
    photo: "aoniaPhoto", photoSource: "https://science.nasa.gov/photojournal/dune-fields-in-aonia-planum-and-aonia-terra",
    criteria: {
      terrain: { display: { en: "Sand fields and dunes", ar: "حقول رمال وكثبان رملية" }, detail: { en: "Ancient cratered highlands where sand dunes collect in low-lying areas (THEMIS, PIA13839).", ar: "مرتفعات قديمة مليئة بالفوهات تتجمع الكثبان الرملية في مناطقها المنخفضة (THEMIS، ‏PIA13839)." }, evidence: { en: "THEMIS image PIA13839", ar: "صورة THEMIS ‏PIA13839" } },
      geology: { display: { en: "Old highland crust with dark dune sand", ar: "قشرة مرتفعات قديمة مع رمال كثبان داكنة" }, detail: { en: "Heavily cratered ancient crust; the dunes are made of dark, wind-moved sand.", ar: "قشرة قديمة كثيرة الفوهات، والكثبان مكوّنة من رمال داكنة تحركها الرياح." }, reference: "https://science.nasa.gov/photojournal/dune-fields-in-aonia-planum-and-aonia-terra" },
      rockSize: MARS_ROCK({ en: "Sand in the dune fields, rocks on crater rims", ar: "رمل في حقول الكثبان وصخور على حواف الفوهات" }, { en: "Dune fields are rock-free sand; crater rims and ejecta carry blocks.", ar: "حقول الكثبان رمل خالٍ من الصخور، بينما تحمل حواف الفوهات ومقذوفاتها كتلًا صخرية." }),
      rockDensity: MARS_ROCK({ en: "Very low on dunes", ar: "منخفضة جدًا على الكثبان" }, { en: "As at Al Sharqiya, soft sand rather than rock is the driving hazard.", ar: "كما في رمال الشرقية، الخطر على القيادة هو الرمل الناعم لا الصخور." }),
      temperature: { display: { en: "Colder than the equator, winter frost", ar: "أبرد من خط الاستواء، صقيع شتوي" }, detail: { en: "At about 58° S, winters are long and cold enough for seasonal frost; Mars averages about −65 °C.", ar: "عند نحو 58° جنوبًا يكون الشتاء طويلًا وباردًا بما يكفي لتكوّن صقيع موسمي، ومتوسط حرارة المريخ نحو −65 °م." }, reference: MARS_FACTS }
    },
    analogs: [SHARQIYA]
  }),
  marsSite("jezero", {
    id: "jezero", code: "R-04",
    name: { en: "Jezero Crater", ar: "فوهة جيزيرو" },
    location: { en: "Ancient lake crater, Mars", ar: "فوهة بحيرة قديمة، المريخ" },
    coords: "18.4° N, 77.6° E",
    photo: "jezeroPhoto", photoSource: "https://science.nasa.gov/photojournal/jezero-crater-mars-2020s-landing-site",
    criteria: {
      terrain: { display: { en: "Dry lake basin with a river delta", ar: "حوض بحيرة جاف مع دلتا نهرية" }, detail: { en: "A 45 km crater that once held a lake; a river built the fan-shaped delta on its western side. Perseverance has explored it since 2021.", ar: "فوهة قطرها 45 كم احتوت بحيرة يومًا، وبنى نهرٌ الدلتا المروحية على جانبها الغربي. تستكشفها المركبة برسفيرانس منذ 2021." }, evidence: { en: "CTX and CRISM image PIA23239", ar: "صورة CTX وCRISM ‏PIA23239" } },
      geology: { display: { en: "Delta clays and carbonates, igneous floor", ar: "طين وكربونات الدلتا وقاع ناري" }, detail: { en: "The delta holds clay and carbonate minerals laid down in water; the crater floor is volcanic rock rich in olivine.", ar: "تحتوي الدلتا على معادن طينية وكربونية ترسبت في الماء، وقاع الفوهة صخر بركاني غني بالأوليفين." }, reference: "https://science.nasa.gov/photojournal/jezero-crater-mars-2020s-landing-site" },
      rockSize: MARS_ROCK({ en: "Pebbles to boulders on the delta", ar: "من الحصى إلى الجلاميد على الدلتا" }, { en: "Perseverance's cameras show boulders on the delta front and rocky outcrops on the crater floor.", ar: "تُظهر كاميرات برسفيرانس جلاميد عند مقدمة الدلتا ونتوءات صخرية في قاع الفوهة." }),
      rockDensity: MARS_ROCK({ en: "Moderate", ar: "متوسطة" }, { en: "Rocky patches alternate with sandy, drivable ground.", ar: "تتناوب البقع الصخرية مع أرض رملية صالحة للقيادة." }),
      temperature: { display: { en: "About −83 to −23 °C air", ar: "هواء نحو −83 إلى −23 °م" }, detail: { en: "Measured by Perseverance's MEDA weather station: air from about −83 °C before dawn to −23 °C in the afternoon.", ar: "قاستها محطة الطقس MEDA على برسفيرانس: الهواء من نحو −83 °م قبل الفجر إلى −23 °م بعد الظهر." }, reference: JEZERO_MET }
    },
    analogs: [MISTAL]
  })
];

/* site-specific rover notes that the slope numbers alone do not capture */
GX.SITES.find((x) => x.id === "valles-marineris").roverNote = { en: "Canyon walls reach 47.5°, beyond the 30° driving limit: work the canyon floor and landslide deposits.", ar: "تصل جدران الأخدود إلى 47.5°، فوق حد القيادة 30°: يكون العمل على قاع الأخدود ورواسب الانهيارات." };
GX.SITES.find((x) => x.id === "aonia-terra").roverNote = { en: "Slopes are gentle, but dune sand can trap wheels (as it did NASA's Spirit rover): test sand driving at Al Sharqiya first.", ar: "المنحدرات لطيفة، لكن رمال الكثبان قد تعلق بها العجلات (كما حدث لمركبة Spirit من ناسا): يجب اختبار القيادة على الرمال في رمال الشرقية أولًا." };
GX.SITES.find((x) => x.id === "jezero").roverNote = { en: "Proven in practice: Perseverance has driven Jezero's floor and delta since 2021.", ar: "مثبتة عمليًا: تقود برسفيرانس على قاع جيزيرو ودلتاها منذ 2021." };
GX.SITES.find((x) => x.id === "shackleton").roverNote = { en: "VIPER's mission targets the south pole region; Haughton offers gentler ground (74.59% under 10°) for test drives.", ar: "تستهدف مهمة VIPER منطقة القطب الجنوبي، وتوفر هوتون أرضًا ألطف (74.59% أقل من 10°) لتجارب القيادة." };
GX.SITES.find((x) => x.id === "syrtis-major").roverNote = { en: "Wide, smooth lava plains suit long drives; Samail's rugged hills are the harder test.", ar: "تناسب سهول الحمم الواسعة الملساء القيادة لمسافات طويلة، وتلال سمائل الوعرة هي الاختبار الأصعب." };

/* ---------- Earth analog library (every Earth site the team is working on) ---------- */
const libStats = (a) => ({ slope: a.criteria.slope.headline, rough: a.criteria.roughness.headline, elev: a.criteria.elevation.headline });
GX.ANALOG_LIBRARY = [
  { analog: HAUGHTON, twinOf: "shackleton", stats: libStats(HAUGHTON), source: { en: "QGIS", ar: "QGIS" } },
  { analog: SAMAIL, twinOf: "syrtis-major", stats: libStats(SAMAIL) },
  { analog: WADI_GHUL, twinOf: "valles-marineris", stats: libStats(WADI_GHUL), source: { en: "SRTM", ar: "SRTM" } },
  { analog: SHARQIYA, twinOf: "aonia-terra", stats: libStats(SHARQIYA), source: { en: "SRTM", ar: "SRTM" } },
  { analog: MISTAL, twinOf: "jezero", stats: libStats(MISTAL), source: { en: "SRTM", ar: "SRTM" } },
  { analog: AMADEE, twinOf: null, stats: libStats(AMADEE), tag: { en: "Mars analog mission site", ar: "موقع مهمة محاكاة للمريخ" } }
];

/* ---------- rovers (official NASA specifications) ---------- */
GX.ROVERS = {
  viper: {
    name: { en: "NASA VIPER", ar: "VIPER من ناسا" },
    full: { en: "Volatiles Investigating Polar Exploration Rover", ar: "مركبة استكشاف المواد المتطايرة القطبية" },
    image: "viperPhoto", url: "https://science.nasa.gov/mission/viper/",
    status: { en: "Built for the lunar south pole; delivery by Blue Origin's Blue Moon MK1 lander planned for 2027", ar: "صُممت للقطب الجنوبي للقمر، ومن المخطط إيصالها بمركبة الهبوط Blue Moon MK1 من Blue Origin عام 2027" },
    maxSlope: 15,
    specs: [
      { k: { en: "Mass", ar: "الكتلة" }, v: "≈ 450 kg" },
      { k: { en: "Size (L × W × H)", ar: "الأبعاد (طول × عرض × ارتفاع)" }, v: "1.7 × 1.7 × 2.5 m" },
      { k: { en: "Wheels", ar: "العجلات" }, v: { en: "4, independently steered, 50 cm", ar: "أربع عجلات بتوجيه مستقل، قطرها 50 سم" } },
      { k: { en: "Slope capability", ar: "القدرة على صعود المنحدرات" }, v: { en: "15° (NASA mobility tests)", ar: "15° (اختبارات ناسا للحركة)" } },
      { k: { en: "Obstacle capability", ar: "القدرة على تجاوز العوائق" }, v: { en: "Active suspension lifts each wheel to climb out of soft soil", ar: "تعليق نشط يرفع كل عجلة للخروج من التربة الرخوة" } },
      { k: { en: "Top speed", ar: "السرعة القصوى" }, v: "20 cm/s" },
      { k: { en: "Power", ar: "الطاقة" }, v: { en: "Solar panels and batteries", ar: "ألواح شمسية وبطاريات" } }
    ]
  },
  perseverance: {
    name: { en: "NASA Perseverance", ar: "برسفيرانس من ناسا" },
    full: { en: "Mars 2020 rover", ar: "مركبة مهمة مارس 2020" },
    image: "perseverancePhoto", url: "https://science.nasa.gov/mission/mars-2020-perseverance/rover-components/",
    status: { en: "Operating in Jezero Crater since February 2021", ar: "تعمل في فوهة جيزيرو منذ فبراير 2021" },
    maxSlope: 30,
    specs: [
      { k: { en: "Mass", ar: "الكتلة" }, v: "1,025 kg" },
      { k: { en: "Size (L × W × H)", ar: "الأبعاد (طول × عرض × ارتفاع)" }, v: "3 × 2.7 × 2.2 m" },
      { k: { en: "Wheels", ar: "العجلات" }, v: { en: "6 aluminium wheels, 52.5 cm, rocker-bogie", ar: "ست عجلات ألومنيوم قطرها 52.5 سم، بتعليق روكر-بوجي" } },
      { k: { en: "Slope capability", ar: "القدرة على صعود المنحدرات" }, v: { en: "Survives 45° tilt; drivers avoid > 30°", ar: "تتحمل ميلًا 45°، ويتجنب السائقون ما فوق 30°" } },
      { k: { en: "Obstacle capability", ar: "القدرة على تجاوز العوائق" }, v: { en: "Rocks up to 40 cm", ar: "صخور حتى 40 سم" } },
      { k: { en: "Top speed", ar: "السرعة القصوى" }, v: "152 m/h" },
      { k: { en: "Power", ar: "الطاقة" }, v: { en: "MMRTG nuclear generator, ≈ 110 W", ar: "مولد نووي MMRTG، نحو 110 واط" } }
    ]
  }
};

/* Rover fit for a site, written from the numbers (site slope vs the rover's slope limit). */
GX.roverFit = (s, rv) => {
  const st = s.bars, lim = rv.maxSlope;
  const mean = st.slopeMean, flat = st.flatShare;
  const good = mean <= lim / 3, ok = mean <= lim;
  const level = good ? { en: "Good fit", ar: "ملاءمة جيدة" } : ok ? { en: "Fit with route planning", ar: "ملاءمة مع تخطيط المسار" } : { en: "Partial fit", ar: "ملاءمة جزئية" };
  const en = `Mean slope ${mean.toFixed(2)}° against a ${lim}° limit; ${flat.toFixed(1)}% of the area is under 10°. ` +
    (good ? "Most of the ground is well inside the rover's limits." : ok ? "Drivable, but steeper patches must be routed around." : "The mean slope is above the tested limit, so traverses must follow the gentler patches of the rim.");
  const ar = `متوسط الانحدار ${mean.toFixed(2)}° مقابل حد ${lim}°، و${flat.toFixed(1)}% من المنطقة أقل من 10°. ` +
    (good ? "معظم الأرض ضمن حدود المركبة بفارق كبير." : ok ? "صالحة للقيادة، لكن يجب الالتفاف حول البقع الأشد انحدارًا." : "متوسط الانحدار أعلى من الحد المختبَر، لذا يجب أن تتبع المسارات البقع الألطف من الحافة.");
  return { level, text: { en, ar } };
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
  { src: "assets/img/haughton/k10-haughton-1.webp", group: "canada", caption: { en: "NASA Ames K-10 rover field test at Haughton Crater, Haughton-Mars Project, 2007 (NASA/Matt Deans, ARC-2007-ACD07-0170-001).", ar: "اختبار ميداني للمركبة K-10 من مركز أميس التابع لناسا في فوهة هوتون، مشروع هوتون-المريخ، 2007 (NASA/Matt Deans، ARC-2007-ACD07-0170-001)." } },
  { src: "assets/img/haughton/k10-haughton-2.webp", group: "canada", caption: { en: "NASA K-10 rover surveying terrain at Haughton Crater, 2007 (NASA/Matt Deans, ARC-2007-ACD07-0170-002).", ar: "المركبة K-10 التابعة لناسا تمسح التضاريس في فوهة هوتون، 2007 (NASA/Matt Deans، ARC-2007-ACD07-0170-002)." } },
  { src: "assets/img/earth-qgis-buffer.webp", group: "canada", caption: { en: "QGIS: 10 km analysis buffer around the Haughton centre.", ar: "QGIS: نطاق تحليل 10 كم حول مركز هوتون." } },
  { src: "assets/img/mars/valles-nasa.webp", group: "mars", caption: "vallesPhoto" },
  { src: "assets/img/mars/jezero-nasa.webp", group: "mars", caption: "jezeroPhoto" },
  { src: "assets/img/mars/syrtis-nasa.webp", group: "mars", caption: "syrtisPhoto" },
  { src: "assets/img/mars/aonia-nasa.webp", group: "mars", caption: "aoniaPhoto" },
  { src: "assets/img/mars/valles-marineris.webp", group: "mars", caption: { en: "Team view: Valles Marineris in NASA Mars Trek.", ar: "عرض الفريق: فاليس مارينيريس في NASA Mars Trek." } },
  { src: "assets/img/mars/syrtis-major.webp", group: "mars", caption: { en: "Team view: Syrtis Major in NASA Mars Trek.", ar: "عرض الفريق: سيرتس ميجور في NASA Mars Trek." } },
  { src: "assets/img/mars/aonia-terra.webp", group: "mars", caption: { en: "Team view: Aonia Terra in NASA Mars Trek.", ar: "عرض الفريق: أونيا تيرا في NASA Mars Trek." } },
  { src: "assets/img/mars/jezero.webp", group: "mars", caption: { en: "Team view: Jezero Crater in NASA Mars Trek.", ar: "عرض الفريق: فوهة جيزيرو في NASA Mars Trek." } },
  { src: "assets/img/oman/samail-nasa.webp", group: "oman", caption: "samailPhoto" },
  { src: "assets/img/oman/sharqiya-nasa.webp", group: "oman", caption: "sharqiyaPhoto" },
  { src: "assets/img/oman/hajar-iss053.webp", group: "oman", caption: "hajarPhoto" },
  { src: "assets/img/oman/samail-crop.webp", group: "oman", caption: "samailMap" },
  { src: "assets/img/oman/samail-gee.webp", group: "oman", caption: { en: "Samail analysis: slope, roughness (TRI), mafic index and similarity layers.", ar: "تحليل سمائل: طبقات الانحدار والخشونة (TRI) والمؤشر المافي والتشابه." } },
  { src: "assets/img/oman/amadee-gee.webp", group: "oman", caption: { en: "AMADEE-18 area: candidate zones and similarity export.", ar: "منطقة AMADEE-18: المناطق المرشحة وتصدير طبقة التشابه." } }
];

GX.EVIDENCE.forEach((e) => { if (typeof e.caption === "string") e.caption = GX.IMG[e.caption].caption; });

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
  { label: { en: "Haughton elevation model: ArcticDEM mosaic v4.1, 2 m, tile 29_29_2_2 (Polar Geospatial Center, NSF/NGA)", ar: "نموذج ارتفاع هوتون: فسيفساء ArcticDEM الإصدار 4.1، بدقة 2 م، المربع 29_29_2_2 (مركز البيانات الجغرافية القطبية، NSF/NGA)" }, url: "https://www.pgc.umn.edu/data/arcticdem/" },
  { label: { en: "NASA/JPL Photojournal: Valles Marineris (PIA00422), Jezero Crater (PIA23239), Syrtis Major Planum (PIA20984), Aonia Terra dunes (PIA13839)", ar: "أرشيف صور ناسا/JPL: فاليس مارينيريس (PIA00422)، فوهة جيزيرو (PIA23239)، سهل سيرتس ميجور (PIA20984)، كثبان أونيا تيرا (PIA13839)" }, url: "https://science.nasa.gov/photojournal/" },
  { label: { en: "NASA Earth Observatory: Earth's Crust Exposed in Oman (EO-1 ALI, 2012)", ar: "مرصد الأرض التابع لناسا: قشرة الأرض مكشوفة في عُمان (EO-1 ALI، 2012)" }, url: "https://science.nasa.gov/earth/earth-observatory/earths-crust-exposed-in-oman-77569" },
  { label: { en: "NASA Image and Video Library: VIPER mobility testing (GRC-2019-C-09935) and Perseverance selfie (PIA24542)", ar: "مكتبة ناسا للصور والفيديو: اختبار حركة VIPER ‏(GRC-2019-C-09935) وصورة برسفيرانس الذاتية (PIA24542)" }, url: "https://images.nasa.gov/details/GRC-2019-C-09935" },
  { label: { en: "NASA JSC Gateway to Astronaut Photography of Earth: STS085-501-14 (Wahiba Sands) and ISS053-E-302321 (Al Hajar Mountains)", ar: "بوابة ناسا لصور رواد الفضاء للأرض (مركز جونسون): STS085-501-14 (رمال وهيبة) وISS053-E-302321 (جبال الحجر)" }, url: "https://eol.jsc.nasa.gov/" },
  { label: { en: "NASA MGS MOLA global DEM, 463 m/px (USGS Astrogeology), Mars slope, roughness and elevation", ar: "نموذج الارتفاع العالمي MOLA من ناسا، 463 م/بكسل (USGS Astrogeology)، لانحدار المريخ وخشونته وارتفاعه" }, url: "https://astrogeology.usgs.gov/search/map/mars_mgs_mola_dem_463m" },
  { label: { en: "NASA Shuttle Radar Topography Mission (SRTM) via AWS Terrain Tiles, Oman slope, roughness and elevation", ar: "مهمة ناسا للمسح الراداري للتضاريس (SRTM) عبر AWS Terrain Tiles، لانحدار عُمان وخشونتها وارتفاعها" }, url: "https://www.earthdata.nasa.gov/data/instruments/srtm" },
  { label: { en: "NASA VIPER mission page", ar: "صفحة مهمة VIPER من ناسا" }, url: "https://science.nasa.gov/mission/viper/" },
  { label: { en: "NASA Mars 2020 Perseverance rover components and specifications", ar: "مكونات ومواصفات المركبة برسفيرانس (مارس 2020) من ناسا" }, url: "https://science.nasa.gov/mission/mars-2020-perseverance/rover-components/" },
  { label: { en: "Rodriguez-Manfredi et al. (2023) The diverse meteorology of Jezero crater over the first 250 sols of Perseverance on Mars. Nature Geoscience 16", ar: "Rodriguez-Manfredi وآخرون (2023): تنوع الأرصاد الجوية في فوهة جيزيرو خلال أول 250 يومًا مريخيًا لبرسفيرانس. مجلة Nature Geoscience، المجلد 16" }, url: "https://doi.org/10.1038/s41561-022-01084-0" },
  { label: { en: "NASA Mars facts (temperature)", ar: "حقائق ناسا عن المريخ (درجة الحرارة)" }, url: "https://science.nasa.gov/mars/facts/" },
  { label: { en: "Shackleton crater temperatures (Wikipedia summary of LRO results)", ar: "درجات حرارة فوهة شاكلتون (ملخص ويكيبيديا لنتائج LRO)" }, url: "https://en.wikipedia.org/wiki/Shackleton_(crater)" },
  { label: { en: "Devon Island climate, The Canadian Encyclopedia", ar: "مناخ جزيرة ديفون، الموسوعة الكندية" }, url: "https://www.thecanadianencyclopedia.ca/en/article/devon-island" },
  { label: { en: "Oman climate, World Bank Climate Change Knowledge Portal", ar: "مناخ عُمان، بوابة البنك الدولي لمعرفة تغير المناخ" }, url: "https://climateknowledgeportal.worldbank.org/country/oman/climate-data-historical" },
  { label: { en: "NASA Image and Video Library: K-10 rover at Haughton Crater, Haughton-Mars Project 2007 (NASA Ames)", ar: "مكتبة ناسا للصور والفيديو: المركبة K-10 في فوهة هوتون، مشروع هوتون-المريخ 2007 (مركز أميس)" }, url: "https://images.nasa.gov/details/ARC-2007-ACD07-0170-001" }
];
