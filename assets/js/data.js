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
  perseverancePhoto: { src: "assets/img/rovers/perseverance-nasa.webp", caption: { en: "Perseverance's selfie with the Ingenuity helicopter in Jezero Crater, 6 April 2021 (NASA/JPL-Caltech/MSSS, PIA24542).", ar: "صورة ذاتية لبرسفيرانس مع المروحية إنجينيويتي في فوهة جيزيرو، 6 أبريل 2021 (NASA/JPL-Caltech/MSSS، PIA24542)." } },
  akhdarPhoto: { src: "assets/img/oman/akhdar-s2.webp", caption: { en: "Jebel Akhdar north flank, the matched 16 km area. Sentinel-2 cloudless 2020 by EOX (CC BY 4.0, modified Copernicus Sentinel data).", ar: "السفح الشمالي للجبل الأخضر، المنطقة المطابقة بطول 16 كم. Sentinel-2 cloudless 2020 من EOX ‏(CC BY 4.0، بيانات Copernicus Sentinel معدّلة)." } },
  kawrPhoto: { src: "assets/img/oman/kawr-s2.webp", caption: { en: "Jebel Kawr canyons near Bahla, the matched 20 km area. Sentinel-2 cloudless 2020 by EOX (CC BY 4.0, modified Copernicus Sentinel data).", ar: "أخاديد جبل الكور قرب بهلاء، المنطقة المطابقة بطول 20 كم. Sentinel-2 cloudless 2020 من EOX ‏(CC BY 4.0، بيانات Copernicus Sentinel معدّلة)." } },
  batinahPhoto: { src: "assets/img/oman/batinah-s2.webp", caption: { en: "Batinah gravel plain near As Suwaiq, the matched 20 km area. Sentinel-2 cloudless 2020 by EOX (CC BY 4.0, modified Copernicus Sentinel data).", ar: "سهل الباطنة الحصوي قرب السويق، المنطقة المطابقة بطول 20 كم. Sentinel-2 cloudless 2020 من EOX ‏(CC BY 4.0، بيانات Copernicus Sentinel معدّلة)." } },
  adamPhoto: { src: "assets/img/oman/adam-s2.webp", caption: { en: "Adam basin, the matched 20 km area. Sentinel-2 cloudless 2020 by EOX (CC BY 4.0, modified Copernicus Sentinel data).", ar: "حوض أدم، المنطقة المطابقة بطول 20 كم. Sentinel-2 cloudless 2020 من EOX ‏(CC BY 4.0، بيانات Copernicus Sentinel معدّلة)." } },
  sharqiyaBox: { src: "assets/img/oman/sharqiya-box-s2.webp", caption: { en: "Al Sharqiya Sands near Al Mudhaibi, the matched 20 km area. Sentinel-2 cloudless 2020 by EOX (CC BY 4.0, modified Copernicus Sentinel data).", ar: "رمال الشرقية قرب المضيبي، المنطقة المطابقة بطول 20 كم. Sentinel-2 cloudless 2020 من EOX ‏(CC BY 4.0، بيانات Copernicus Sentinel معدّلة)." } },
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

/* ---------- Ground X terrain statistics: equal footprints on a matched grid ----------
   Every Moon/Mars site is compared with an Earth area of the SAME size, both on a 424 m grid:
   Moon: NASA Site04 LOLA DEM resampled; Mars: NASA MGS MOLA DEM (463 m) resampled; Earth: NASA SRTM (AWS Terrain Tiles) averaged.
   The Earth twins were chosen by searching Oman for the area whose terrain best matches each site.
   Slope: Horn method (degrees). Roughness: TRI, mean absolute height difference to the 8 neighbours (m).
   Relief: 95th minus 5th elevation percentile (m). */
GX.DEM_STATS = {
  shackleton: { box: "Site04 tile, 89.9° S", area: 233, slope_mean: 20.18, slope_p50: 19.31, slope_p90: 32.53, slope_max: 34.66, flat10: 21.68, tri_mean: 126.11, tri_p90: 207.87, elev_min: -2787, elev_mean: 267, elev_max: 1753, relief: 3966 },
  akhdar:     { box: "23.14–23.28° N, 57.44–57.60° E", area: 246, slope_mean: 18.04, slope_p50: 17.25, slope_p90: 30.04, slope_max: 44.76, flat10: 21.69, tri_mean: 126.81, tri_p90: 204.79, elev_min: 533, elev_mean: 1304, elev_max: 2322, relief: 1461 },
  valles:     { box: "10.93–11.26° S, 65.09–65.42° W", area: 380, slope_mean: 10.26, slope_p50: 1.53, slope_p90: 28.50, slope_max: 34.03, flat10: 61.91, tri_mean: 63.33, tri_p90: 178.48, elev_min: 1104, elev_mean: 4649, elev_max: 5346, relief: 3030 },
  kawr:       { box: "23.03–23.20° N, 56.86–57.05° E", area: 380, slope_mean: 9.72, slope_p50: 5.78, slope_p90: 25.47, slope_max: 45.04, flat10: 61.20, tri_mean: 65.33, tri_p90: 168.94, elev_min: 504, elev_mean: 1069, elev_max: 2658, relief: 1895 },
  syrtis:     { box: "11.15–11.48° N, 71.89–72.23° E", area: 389, slope_mean: 0.53, slope_p50: 0.43, slope_p90: 0.94, slope_max: 5.05, flat10: 100.00, tri_mean: 3.14, tri_p90: 5.57, elev_min: 992, elev_mean: 1085, elev_max: 1228, relief: 136 },
  batinah:    { box: "23.69–23.86° N, 57.15–57.34° E", area: 372, slope_mean: 0.49, slope_p50: 0.42, slope_p90: 0.64, slope_max: 8.23, flat10: 100.00, tri_mean: 3.06, tri_p90: 4.01, elev_min: 6, elev_mean: 81, elev_max: 283, relief: 135 },
  aonia:      { box: "52.08–52.41° S, 108.19–108.81° W", area: 380, slope_mean: 0.36, slope_p50: 0.27, slope_p90: 0.72, slope_max: 1.98, flat10: 100.00, tri_mean: 2.24, tri_p90: 4.35, elev_min: 1527, elev_mean: 1555, elev_max: 1638, relief: 70 },
  sharqiya:   { box: "22.17–22.35° N, 58.36–58.55° E", area: 380, slope_mean: 0.35, slope_p50: 0.30, slope_p90: 0.44, slope_max: 4.23, flat10: 100.00, tri_mean: 2.23, tri_p90: 2.74, elev_min: 252, elev_mean: 311, elev_max: 370, relief: 85 },
  jezero:     { box: "18.30–18.63° N, 77.33–77.68° E", area: 380, slope_mean: 1.69, slope_p50: 0.97, slope_p90: 4.05, slope_max: 15.93, flat10: 99.10, tri_mean: 9.89, tri_p90: 23.44, elev_min: -2681, elev_mean: -2525, elev_max: -2081, relief: 381 },
  adam:       { box: "22.20–22.38° N, 57.38–57.57° E", area: 372, slope_mean: 1.78, slope_p50: 0.22, slope_p90: 6.96, slope_max: 27.58, flat10: 92.95, tri_mean: 11.18, tri_p90: 46.76, elev_min: 245, elev_mean: 311, elev_max: 990, relief: 364 }
};

const MOLA = { en: "NASA MGS MOLA DEM, resampled to 424 m", ar: "نموذج الارتفاع MOLA من ناسا، معاد إلى 424 م" };
const SRTM = { en: "NASA SRTM DEM, averaged to 424 m", ar: "نموذج الارتفاع SRTM من ناسا، بمتوسط 424 م" };
const LOLA = { en: "NASA Site04 LOLA DEM, resampled to 424 m", ar: "نموذج الارتفاع LOLA ‏(Site04) من ناسا، معاد إلى 424 م" };
const GXM = (src) => ({ en: "Computed by Ground X from the " + src.en, ar: "حسبه فريق Ground X من " + src.ar });
const MATCH_NOTE = { en: "Same footprint, same 424 m grid and same method on both worlds, so the numbers compare directly.", ar: "المساحة نفسها والشبكة نفسها (424 م) والطريقة نفسها على العالمين، لذا تُقارن الأرقام مباشرة." };
const MOLA_URL = "https://astrogeology.usgs.gov/search/map/mars_mgs_mola_dem_463m";
const SRTM_URL = "https://www.earthdata.nasa.gov/data/instruments/srtm";
const QUAL = { en: "Qualitative, from orbital and field imagery", ar: "تقييم نوعي من صور المدار والصور الميدانية" };
const f2 = (v, u = "") => Number(v).toFixed(2) + u;
const m0 = (v) => Math.round(v).toLocaleString("en-US") + " m";
const RELIEF = { en: "Relief (5th to 95th percentile)", ar: "التضاريس (من المئين 5 إلى 95)" };

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
      facts: [{ k: K.min, v: m0(st.elev_min) }, { k: K.mean, v: m0(st.elev_mean) }, { k: K.max, v: m0(st.elev_max) }, { k: RELIEF, v: m0(st.relief) }],
      method, reference: url
    }
  };
}
const demBars = (st) => ({ slopeMean: st.slope_mean, flatShare: st.flat10, roughMean: st.tri_mean, relief: st.relief });
const areaText = (st) => ({ en: st.area + " km² box, " + st.box, ar: "مربع " + st.area + " كم²، " + st.box });

/* Ground X terrain similarity index: for each shared metric, 100 x smaller / larger, then the mean. */
GX.similarity = (a, b) => {
  const keys = ["slopeMean", "flatShare", "roughMean", "relief"].filter((k) => a[k] != null && b[k] != null);
  const parts = keys.map((k) => 100 * Math.min(a[k], b[k]) / Math.max(a[k], b[k]));
  return Math.round(parts.reduce((x, y) => x + y, 0) / parts.length);
};

const TEMP_OMAN = { en: "Hot desert climate: summer days above 40 °C in the lowlands, mild winters.", ar: "مناخ صحراوي حار: نهار الصيف فوق 40 °م في الأراضي المنخفضة، وشتاء معتدل." };
const OMAN_CLIMATE = "https://climateknowledgeportal.worldbank.org/country/oman/climate-data-historical";
const MARS_FACTS = "https://science.nasa.gov/mars/facts/";
const JEZERO_MET = "https://doi.org/10.1038/s41561-022-01084-0";
const EOX = "https://s2maps.eu";

const omanAnalog = (o) => Object.assign({ country: { en: "Oman", ar: "عُمان" }, maps: {}, rovers: [] }, o);
const twin = (key, o) => omanAnalog(Object.assign({ resolution: SRTM, area: areaText(GX.DEM_STATS[key]), bars: demBars(GX.DEM_STATS[key]) }, o,
  { criteria: Object.assign(demCriteria(GX.DEM_STATS[key], SRTM, SRTM_URL), o.criteria) }));
const Q = (display, detail, extra) => Object.assign({ display, detail, method: QUAL }, extra || {});

/* ---------- Earth twins (one per site, found by terrain search across Oman) ---------- */
const AKHDAR = twin("akhdar", {
  id: "akhdar", name: { en: "Jebel Akhdar, north flank", ar: "الجبل الأخضر، السفح الشمالي" },
  location: { en: "Al Awabi, Al Hajar Mountains, Oman", ar: "ولاية العوابي، جبال الحجر، عُمان" }, coords: "23.21° N, 57.52° E",
  type: { en: "Steep mountain flank cut by deep gorges", ar: "سفح جبلي شديد الانحدار تقطعه خوانق عميقة" },
  photo: "akhdarPhoto", photoSource: EOX,
  criteria: {
    terrain: { display: { en: "Steep slopes and gorges", ar: "منحدرات شديدة وخوانق" }, detail: { en: "Walls drop from the Jebel Akhdar plateau toward Wadi Bani Kharus. Its slope mix is almost identical to Shackleton's: only 21.69% of the area is under 10° (Shackleton 21.68%).", ar: "تنحدر الجدران من هضبة الجبل الأخضر نحو وادي بني خروص. توزيع انحداراته يكاد يطابق شاكلتون: 21.69% فقط من المساحة أقل من 10° (شاكلتون 21.68%)." }, evidence: { en: "Sentinel-2 view and NASA SRTM terrain", ar: "صورة Sentinel-2 وتضاريس SRTM من ناسا" } },
    geology: Q({ en: "Limestone and dolomite mountain", ar: "جبل من الحجر الجيري والدولوميت" }, { en: "Thick carbonate layers of the Jebel Akhdar dome, broken into cliffs and scree. Rock type differs from the Moon; the match is in shape and steepness.", ar: "طبقات كربونية سميكة في قبة الجبل الأخضر تتكسر إلى جروف وركام. نوع الصخر يختلف عن القمر، والتطابق في الشكل وشدة الانحدار." }),
    rockSize: Q({ en: "Boulders and scree on the slopes", ar: "جلاميد وركام على المنحدرات" }, { en: "Rockfall leaves boulder fields below the cliffs, as on Shackleton's walls.", ar: "تخلّف الانهيارات الصخرية حقول جلاميد أسفل الجروف، كما على جدران شاكلتون." }),
    rockDensity: Q({ en: "High on the walls", ar: "عالية على الجدران" }, { en: "Bare rock dominates the steep ground; soil only on terraces.", ar: "تغلب الصخور العارية على الأرض شديدة الانحدار، والتربة على المدرجات فقط." }),
    temperature: { display: { en: "Cool heights, hot valleys", ar: "مرتفعات باردة وأودية حارة" }, detail: { en: "The plateau above 2,000 m can drop near freezing in winter; the valleys below are hot in summer.", ar: "قد تقترب الهضبة فوق 2,000 م من التجمد شتاءً، بينما الأودية أسفلها حارة صيفًا." }, reference: OMAN_CLIMATE }
  }
});

const KAWR = twin("kawr", {
  id: "kawr", name: { en: "Jebel Kawr canyons", ar: "أخاديد جبل الكور" },
  location: { en: "Bahla, Ad Dakhiliyah, Oman", ar: "ولاية بهلاء، محافظة الداخلية، عُمان" }, coords: "23.11° N, 56.96° E",
  type: { en: "Limestone massif with deep canyons and cliffs", ar: "كتلة جيرية ذات أخاديد عميقة وجروف" },
  photo: "kawrPhoto", photoSource: EOX,
  criteria: {
    terrain: { display: { en: "Canyon walls above flat floors", ar: "جدران أخاديد فوق قيعان مستوية" }, detail: { en: "Cliffs rise from flat wadi floors, the same wall-and-floor mix as the Valles Marineris rim: 61.20% of the area is under 10° (Valles 61.91%).", ar: "ترتفع الجروف من قيعان أودية مستوية، بالمزيج نفسه من الجدران والقيعان في حافة فاليس مارينيريس: 61.20% من المساحة أقل من 10° (فاليس 61.91%)." }, evidence: { en: "Sentinel-2 view and NASA SRTM terrain", ar: "صورة Sentinel-2 وتضاريس SRTM من ناسا" } },
    geology: Q({ en: "Massive limestone cut by canyons", ar: "حجر جيري ضخم تقطعه الأخاديد" }, { en: "Thick limestone layers exposed in sheer canyon walls, eroded by flash floods into talus slopes.", ar: "طبقات جيرية سميكة مكشوفة في جدران أخاديد شاهقة، نحتتها السيول إلى منحدرات ركامية." }),
    rockSize: Q({ en: "Boulders below the walls", ar: "جلاميد أسفل الجدران" }, { en: "Rockfall and landslide blocks gather at the foot of the cliffs, as in Valles Marineris.", ar: "تتجمع كتل الانهيارات الصخرية والأرضية عند أسفل الجروف، كما في فاليس مارينيريس." }),
    rockDensity: Q({ en: "High near walls, low on floors", ar: "عالية قرب الجدران، منخفضة في القيعان" }, { en: "Wadi floors are gravel; the walls and their aprons are rock-covered.", ar: "قيعان الأودية حصوية، والجدران وما حولها مغطاة بالصخور." }),
    temperature: { display: { en: "Hot summers, mild winters", ar: "صيف حار وشتاء معتدل" }, detail: TEMP_OMAN, reference: OMAN_CLIMATE }
  }
});

const BATINAH = twin("batinah", {
  id: "batinah", name: { en: "Batinah gravel plain", ar: "سهل الباطنة الحصوي" },
  location: { en: "As Suwaiq, Al Batinah North, Oman", ar: "ولاية السويق، محافظة شمال الباطنة، عُمان" }, coords: "23.77° N, 57.25° E",
  type: { en: "Dark plain built from Samail ophiolite debris", ar: "سهل داكن مكوّن من فتات أفيوليت سمائل" },
  photo: "batinahPhoto", photoSource: EOX,
  criteria: {
    terrain: { display: { en: "Very gentle, wide plain", ar: "سهل واسع لطيف جدًا" }, detail: { en: "A broad plain sloping gently to the sea, as smooth as the Syrtis Major lava plains: mean slope 0.49° against 0.53°.", ar: "سهل عريض ينحدر بلطف نحو البحر، أملس مثل سهول حمم سيرتس ميجور: متوسط الانحدار 0.49° مقابل 0.53°." }, evidence: { en: "Sentinel-2 view and NASA SRTM terrain", ar: "صورة Sentinel-2 وتضاريس SRTM من ناسا" } },
    geology: Q({ en: "Dark mafic gravel from the ophiolite", ar: "حصى مافي داكن من الأفيوليت" }, { en: "Gravel and fans washed down from the Samail ophiolite: dark gabbro and peridotite pebbles, mafic rock like Syrtis Major's basalt.", ar: "حصى ومراوح جرفتها السيول من أفيوليت سمائل: حصى داكنة من الجابرو والبيريدوتيت، صخر مافي يشبه بازلت سيرتس ميجور." }, { reference: "https://doi.org/10.1029/2021EA001637" }),
    rockSize: Q({ en: "Pebbles and cobbles", ar: "حصى وجلاميد صغيرة" }, { en: "Wadi gravels from fist-size down to sand; few large boulders.", ar: "حصى أودية من حجم القبضة إلى الرمل، مع القليل من الجلاميد الكبيرة." }),
    rockDensity: Q({ en: "Low to moderate", ar: "منخفضة إلى متوسطة" }, { en: "A smooth gravel surface that is easy to drive on.", ar: "سطح حصوي أملس سهل القيادة." }),
    temperature: { display: { en: "Hot and humid summers", ar: "صيف حار ورطب" }, detail: TEMP_OMAN, reference: OMAN_CLIMATE }
  }
});

const SHARQIYA = twin("sharqiya", {
  id: "sharqiya", name: { en: "Al Sharqiya Sands", ar: "رمال الشرقية" },
  location: { en: "Al Mudhaibi, Ash Sharqiyah North, Oman", ar: "ولاية المضيبي، محافظة شمال الشرقية، عُمان" }, coords: "22.26° N, 58.46° E",
  type: { en: "Sand sea (formerly Wahiba Sands)", ar: "بحر رمال (رمال وهيبة سابقًا)" },
  photo: "sharqiyaPhoto", photoSource: "https://eol.jsc.nasa.gov/SearchPhotos/photo.pl?mission=STS085&roll=501&frame=14",
  criteria: {
    terrain: { display: { en: "Sand fields and long dune ridges", ar: "حقول رمال وسلاسل كثبان طويلة" }, detail: { en: "The north-western sand sheet of Al Sharqiya: smooth sand that matches the Aonia Terra plains almost exactly (mean slope 0.35° against 0.36°).", ar: "الغطاء الرملي الشمالي الغربي لرمال الشرقية: رمل أملس يطابق سهول أونيا تيرا تقريبًا (متوسط الانحدار 0.35° مقابل 0.36°)." }, evidence: { en: "Space Shuttle photo STS085-501-14", ar: "صورة مكوك الفضاء STS085-501-14" } },
    geology: Q({ en: "Wind-blown sand over older dune rock", ar: "رمال تذروها الرياح فوق صخور كثبان أقدم" }, { en: "Loose sand of quartz and carbonate grains sits on older, cemented dune sandstone.", ar: "رمال سائبة من حبيبات الكوارتز والكربونات فوق حجر رملي كثيبي أقدم ومتماسك." }),
    rockSize: Q({ en: "Sand grains, almost no rocks", ar: "حبيبات رمل وتكاد تخلو من الصخور" }, { en: "The surface is fine to medium sand; rocks appear only at the edges of the sand sea.", ar: "السطح رمل ناعم إلى متوسط، ولا تظهر الصخور إلا عند أطراف بحر الرمال." }),
    rockDensity: Q({ en: "Very low", ar: "منخفضة جدًا" }, { en: "Soft sand, not rocks, is the hazard: wheels can sink and slip on dune flanks.", ar: "الخطر هو الرمل الناعم لا الصخور: قد تغوص العجلات وتنزلق على جوانب الكثبان." }),
    temperature: { display: { en: "Very hot summers, cool nights", ar: "صيف شديد الحرارة وليالٍ باردة" }, detail: TEMP_OMAN, reference: OMAN_CLIMATE }
  }
});

const ADAM = twin("adam", {
  id: "adam", name: { en: "Adam basin", ar: "حوض أدم" },
  location: { en: "Adam, Ad Dakhiliyah, Oman", ar: "ولاية أدم، محافظة الداخلية، عُمان" }, coords: "22.29° N, 57.48° E",
  type: { en: "Wadi-fed gravel basin", ar: "حوض حصوي تغذيه الأودية" },
  photo: "adamPhoto", photoSource: EOX,
  criteria: {
    terrain: { display: { en: "Flat basin crossed by channels", ar: "حوض مستوٍ تعبره القنوات" }, detail: { en: "A low basin south of Adam where wadis from the Al Hajar Mountains spread out in braided channels, like the rivers that once fed Jezero's lake.", ar: "حوض منخفض جنوب أدم تنتشر فيه الأودية القادمة من جبال الحجر في قنوات متشعبة، مثل الأنهار التي غذّت بحيرة جيزيرو يومًا." }, evidence: { en: "Sentinel-2 view and NASA SRTM terrain", ar: "صورة Sentinel-2 وتضاريس SRTM من ناسا" } },
    geology: Q({ en: "Water-laid gravels and a carbonate ridge", ar: "حصى رسبتها المياه وسلسلة كربونية" }, { en: "Flood gravels and fans on the floor with an eroded limestone ridge, the same 'water shaped this' story Perseverance is reading in Jezero's delta.", ar: "حصى ومراوح السيول في القاع مع سلسلة جيرية متآكلة، القصة نفسها «الماء شكّل هذا» التي تقرؤها برسفيرانس في دلتا جيزيرو." }),
    rockSize: Q({ en: "Gravel to cobbles", ar: "من الحصى إلى الجلاميد الصغيرة" }, { en: "Rounded gravel in the channels, larger blocks below the ridge.", ar: "حصى مستديرة في القنوات، وكتل أكبر أسفل السلسلة." }),
    rockDensity: Q({ en: "Moderate", ar: "متوسطة" }, { en: "Gravel-covered plain with rocky patches, like Jezero's floor.", ar: "سهل مغطى بالحصى مع بقع صخرية، مثل قاع جيزيرو." }),
    temperature: { display: { en: "Hot summers, mild winters", ar: "صيف حار وشتاء معتدل" }, detail: TEMP_OMAN, reference: OMAN_CLIMATE }
  }
});

/* ---------- other Earth sites the team studied (shown in the analog library) ---------- */
const SAMAIL = omanAnalog({
  id: "samail", name: { en: "Samail Ophiolite", ar: "أفيوليت سمائل" },
  location: { en: "Al Hajar Mountains, Oman", ar: "جبال الحجر، عُمان" },
  type: { en: "Ophiolite (exposed oceanic crust and mantle rocks)", ar: "أفيوليت (صخور قشرة محيطية ووشاح مكشوفة)" },
  photo: "samailPhoto", photoSource: "https://science.nasa.gov/earth/earth-observatory/earths-crust-exposed-in-oman-77569",
  criteria: geeCriteria(GX.GEE_STATS.samail)
});
const AMADEE = omanAnalog({
  id: "amadee", name: { en: "AMADEE-18 'Kepler' station", ar: "محطة «كبلر» لمهمة AMADEE-18" },
  location: { en: "Dhofar desert, Oman", ar: "صحراء ظفار، عُمان" },
  type: { en: "Site of the 2018 Mars analog mission (Austrian Space Forum with the Oman Astronomical Society)", ar: "موقع مهمة محاكاة المريخ عام 2018 (المنتدى الفضائي النمساوي بالشراكة مع الجمعية الفلكية العُمانية)" },
  photo: "amadeePhoto", criteria: geeCriteria(GX.GEE_STATS.amadee)
});

/* ---------- comparisons ---------- */
const pairCmp = (siteKey, a, similar, different, conclusion) => {
  a.comparison = { similar, different, conclusion, similarity: GX.similarity(demBars(GX.DEM_STATS[siteKey]), a.bars) };
  a.comparison.difference = 100 - a.comparison.similarity;
};
pairCmp("shackleton", AKHDAR,
  { en: "Almost the same slope mix as Shackleton: 21.69% of the ground under 10°, mean slope 18.04° against 20.18°, and the same roughness (126.81 m against 126.11 m).", ar: "توزيع انحدار يكاد يطابق شاكلتون: 21.69% من الأرض أقل من 10°، ومتوسط الانحدار 18.04° مقابل 20.18°، والخشونة نفسها (126.81 م مقابل 126.11 م)." },
  { en: "Shackleton's relief is about 4.0 km, Jebel Akhdar's about 1.5 km; the rock is limestone, not lunar regolith.", ar: "تضاريس شاكلتون نحو 4.0 كم وتضاريس الجبل الأخضر نحو 1.5 كم، والصخر جيري لا ثرى قمري." },
  { en: "The best terrain match for Shackleton found in Oman: ideal for testing how a rover handles steep, rough crater-like slopes.", ar: "أفضل تطابق تضاريسي لشاكلتون وُجد في عُمان: مثالي لاختبار تعامل المركبة مع منحدرات وعرة شديدة تشبه الفوهات." });
pairCmp("valles", KAWR,
  { en: "Canyon walls above flat floors in both: 61.20% against 61.91% of the ground under 10°, roughness 65.33 m against 63.33 m.", ar: "جدران أخاديد فوق قيعان مستوية في كليهما: 61.20% مقابل 61.91% من الأرض أقل من 10°، والخشونة 65.33 م مقابل 63.33 م." },
  { en: "The Valles box drops about 3.0 km, Jebel Kawr about 1.9 km.", ar: "ينخفض مربع فاليس نحو 3.0 كم، وجبل الكور نحو 1.9 كم." },
  { en: "A strong analog for canyon terrain and rockfall hazards at the scale a rover would drive.", ar: "نظير قوي لتضاريس الأخاديد ومخاطر الانهيارات الصخرية بالحجم الذي تقود فيه المركبة." });
pairCmp("syrtis", BATINAH,
  { en: "Both are very smooth plains (100% under 10°) with the same relief (135 m against 136 m), made of dark mafic rock.", ar: "كلاهما سهل أملس جدًا (100% أقل من 10°) بالتضاريس نفسها (135 م مقابل 136 م)، ومكوّن من صخر مافي داكن." },
  { en: "Syrtis Major is solid lava; the Batinah plain is loose gravel eroded from the ophiolite.", ar: "سيرتس ميجور حمم صلبة، أما سهل الباطنة فحصى سائب منحوت من الأفيوليت." },
  { en: "A near-exact terrain twin with related rock chemistry: ideal for long-distance driving tests.", ar: "توأم تضاريسي شبه مطابق بكيمياء صخور متقاربة: مثالي لاختبارات القيادة لمسافات طويلة." });
pairCmp("aonia", SHARQIYA,
  { en: "Smooth, sandy plains on both: mean slope 0.35° against 0.36° and the same roughness (2.23 m against 2.24 m).", ar: "سهول رملية ملساء على الجانبين: متوسط الانحدار 0.35° مقابل 0.36° والخشونة نفسها (2.23 م مقابل 2.24 م)." },
  { en: "Aonia Terra is far colder and its sand is dark basalt; Al Sharqiya's sand is pale quartz and carbonate.", ar: "أونيا تيرا أبرد بكثير ورمالها بازلتية داكنة، أما رمال الشرقية ففاتحة من الكوارتز والكربونات." },
  { en: "An excellent analog for testing rover driving on sand.", ar: "نظير ممتاز لاختبار قيادة المركبات على الرمال." });
pairCmp("jezero", ADAM,
  { en: "Both are flat basins (99.10% and 92.95% under 10°) with the same relief (381 m against 364 m) and water-laid sediments.", ar: "كلاهما حوض مستوٍ (99.10% و92.95% أقل من 10°) بالتضاريس نفسها (381 م مقابل 364 م) ورواسب مائية." },
  { en: "Jezero held a standing lake; the Adam basin is shaped by flash floods.", ar: "احتوت جيزيرو بحيرة دائمة، أما حوض أدم فشكّلته السيول." },
  { en: "A strong analog for driving and sampling on a water-shaped basin floor.", ar: "نظير قوي للقيادة وأخذ العينات على قاع حوض شكّلته المياه." });

/* ---------- Moon & Mars sites ---------- */
const marsSite = (key, o) => Object.assign({
  body: "mars", dataset: { en: "NASA MGS MOLA DEM and NASA/JPL imagery", ar: "نموذج MOLA من ناسا وصور ناسا/JPL" },
  resolution: "424 m/px", status: "final", maps: {}, profile: false, rover: "perseverance",
  area: areaText(GX.DEM_STATS[key]), bars: demBars(GX.DEM_STATS[key])
}, o, { criteria: Object.assign(demCriteria(GX.DEM_STATS[key], MOLA, MOLA_URL), o.criteria) });
const MARS_ROCK = (en, ar) => ({ display: en, detail: ar, method: QUAL });

GX.SITES = [
  {
    id: "shackleton", body: "moon", code: "M-01",
    name: { en: "Shackleton Rim", ar: "حافة شاكلتون" },
    location: { en: "Lunar South Pole", ar: "القطب الجنوبي للقمر" },
    coords: "89.67° S, 129.78° E",
    dataset: { en: "NASA Site04", ar: "ناسا Site04" },
    resolution: "5 m/px", status: "final", rover: "sev",
    photo: "shackletonPhoto", photoSource: "https://svs.gsfc.nasa.gov/4716",
    area: { en: "Site04 tile ≈ 16 × 16 km", ar: "مربع Site04 ≈ 16 × 16 كم" },
    maps: { slope: "moonSlope", roughness: "moonRough", relief: "moonRelief" },
    criteria: {
      terrain: {
        display: { en: "Impact crater rim, irregular terrain", ar: "حافة فوهة صدمية، تضاريس غير منتظمة" },
        detail: { en: "Shackleton Rim contains impact-related lunar landforms, steep crater slopes, and areas of uneven relief. The crater is 21 km wide and 4.2 km deep, and two of NASA's 13 Artemis III candidate landing regions, Peak Near Shackleton and Connecting Ridge, sit on its rim: a candidate area for a permanent Moon base.", ar: "تضم حافة شاكلتون أشكالًا أرضية قمرية ناتجة عن الاصطدام، ومنحدرات فوهة شديدة، ومناطق ذات تضاريس غير مستوية. يبلغ عرض الفوهة 21 كم وعمقها 4.2 كم، وتقع على حافتها منطقتان من مناطق الهبوط الثلاث عشرة المرشحة لمهمة Artemis III من ناسا، هما Peak Near Shackleton وConnecting Ridge: منطقة مرشحة لقاعدة قمرية دائمة." },
        evidence: { en: "NASA Site04 elevation dataset", ar: "بيانات الارتفاع Site04 من ناسا" },
        reference: "https://www.nasa.gov/news-release/nasa-identifies-candidate-regions-for-landing-next-americans-on-moon/",
        map: "moonRelief"
      },
      slope: {
        headline: "20.66°", headlineLabel: K.meanSlope,
        facts: [{ k: K.meanSlope, v: "20.6641°" }, { k: { en: "Maximum recorded slope", ar: "أقصى انحدار مسجّل" }, v: "69.6472°" }, { k: { en: "Area with slope < 10°", ar: "المساحة بانحدار أقل من 10°" }, v: "18.81%" }, { k: { en: "On the matched 424 m grid", ar: "على الشبكة المطابقة 424 م" }, v: "20.18° · 21.68%" }],
        method: { en: "NASA slope raster analysed in QGIS (5 m)", ar: "تحليل بيانات الانحدار من ناسا باستخدام QGIS ‏(5 م)" },
        map: "moonSlopeLayout"
      },
      roughness: {
        headline: "5.06", headlineLabel: K.meanRough,
        facts: [{ k: K.mean, v: "5.0552" }, { k: { en: "Maximum recorded value", ar: "أقصى قيمة مسجّلة" }, v: "29.1604" }, { k: K.sd, v: "2.7205" }, { k: { en: "TRI on the matched 424 m grid", ar: "TRI على الشبكة المطابقة 424 م" }, v: "126.11 m" }],
        evidence: { en: "QGIS statistics report (Shackleton_Roughness)", ar: "تقرير إحصاءات QGIS (Shackleton_Roughness)" },
        method: { en: "QGIS terrain roughness analysis (5 m)", ar: "تحليل خشونة التضاريس باستخدام QGIS ‏(5 م)" },
        map: "moonRough"
      },
      elevation: Object.assign(demCriteria(GX.DEM_STATS.shackleton, LOLA, "https://pgda.gsfc.nasa.gov/products/78").elevation),
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
        detail: { en: "Sunlit rim sites are estimated at about −50 °C; the floor never sees the Sun and stays below about 90 K (about −183 °C), cold enough to trap water ice (Haruyama et al., 2008, Science).", ar: "تُقدَّر حرارة مواقع الحافة المضاءة بنحو −50 °م، أما القاع فلا يرى الشمس أبدًا ويبقى دون نحو 90 كلفن (نحو −183 °م)، وهو برد كافٍ لحبس جليد الماء (Haruyama وآخرون، 2008، Science)." },
        reference: "https://doi.org/10.1126/science.1164020"
      }
    },
    profile: true,
    analogs: [AKHDAR],
    bars: demBars(GX.DEM_STATS.shackleton)
  },

  marsSite("valles", {
    id: "valles-marineris", code: "R-01", rover: "curiosity",
    name: { en: "Valles Marineris", ar: "فاليس مارينيريس" },
    location: { en: "Equatorial canyon system, Mars", ar: "منظومة أخاديد استوائية، المريخ" },
    coords: "11.1° S, 65.3° W",
    photo: "vallesPhoto", photoSource: "https://images.nasa.gov/details/PIA00422",
    criteria: {
      terrain: { display: { en: "Giant canyon / valley system", ar: "أخدود أو وادٍ ضخم" }, detail: { en: "About 3,870 km long and up to 9.3 km deep (NASA). The comparison uses a 20 km box on the canyon edge, the scale a rover would explore.", ar: "طوله نحو 3,870 كم وعمقه يصل إلى 9.3 كم (ناسا). تستخدم المقارنة مربعًا بطول 20 كم على حافة الأخدود، وهو الحجم الذي تستكشفه المركبة." }, evidence: { en: "Viking Orbiter mosaic PIA00422", ar: "فسيفساء فايكنغ PIA00422" }, reference: MARS_FACTS },
      geology: { display: { en: "Layered volcanic rock and canyon sediments", ar: "صخور بركانية متطبقة ورواسب أخدودية" }, detail: { en: "The walls expose stacks of layered volcanic rock; the floor holds landslide deposits and layered sediments.", ar: "تكشف الجدران طبقات متراكمة من الصخور البركانية، ويحمل القاع رواسب انهيارات أرضية ورواسب متطبقة." }, method: QUAL, reference: "https://images.nasa.gov/details/PIA00422" },
      rockSize: MARS_ROCK({ en: "Boulders and landslide debris", ar: "جلاميد وحطام انهيارات أرضية" }, { en: "Giant landslides from the walls spread boulder-rich debris across the canyon floor.", ar: "تنشر الانهيارات الأرضية الضخمة من الجدران حطامًا غنيًا بالجلاميد على قاع الأخدود." }),
      rockDensity: MARS_ROCK({ en: "High near walls, lower on the floor", ar: "عالية قرب الجدران وأقل في القاع" }, { en: "Rock cover is highest at the foot of the walls and in landslide lobes.", ar: "يكون الغطاء الصخري أعلى عند أسفل الجدران وفي ألسنة الانهيارات." }),
      temperature: { display: { en: "Up to about 20 °C by day, far below freezing at night", ar: "حتى نحو 20 °م نهارًا، وأقل بكثير من التجمد ليلًا" }, detail: { en: "NASA: Mars can reach about 20 °C near the equator at midday and drop to about −153 °C; nights at the equator fall far below freezing.", ar: "ناسا: قد تصل حرارة المريخ إلى نحو 20 °م قرب خط الاستواء ظهرًا وتنخفض إلى نحو −153 °م، وليالي خط الاستواء أقل بكثير من التجمد." }, reference: MARS_FACTS }
    },
    analogs: [KAWR]
  }),
  marsSite("syrtis", {
    id: "syrtis-major", code: "R-02",
    name: { en: "Syrtis Major", ar: "سيرتس ميجور" },
    location: { en: "Volcanic plain, Mars", ar: "سهل بركاني، المريخ" },
    coords: "11.3° N, 72.1° E",
    photo: "syrtisPhoto", photoSource: "https://science.nasa.gov/photojournal/syrtis-major-planum-false-color-4",
    criteria: {
      terrain: { display: { en: "Broad, gently sloping volcanic plain", ar: "سهل بركاني واسع لطيف الانحدار" }, detail: { en: "A low shield volcano province with wind streaks across dark lava plains (THEMIS false colour).", ar: "إقليم براكين درعية منخفضة تعبره خطوط رياح فوق سهول حمم داكنة (THEMIS بألوان زائفة)." }, evidence: { en: "THEMIS image PIA20984", ar: "صورة THEMIS ‏PIA20984" } },
      geology: { display: { en: "Basaltic and volcanic rocks", ar: "صخور بازلتية وبركانية" }, detail: { en: "Dark basaltic lava plains, rich in the same mafic minerals found in Oman's ophiolite.", ar: "سهول حمم بازلتية داكنة، غنية بالمعادن المافية نفسها الموجودة في أفيوليت عُمان." }, reference: "https://science.nasa.gov/photojournal/syrtis-major-planum-false-color-4" },
      rockSize: MARS_ROCK({ en: "Lava blocks and dark sand", ar: "كتل حمم ورمال داكنة" }, { en: "Exposed lava surfaces with scattered blocks; dark basaltic sand collects in low spots.", ar: "أسطح حمم مكشوفة مع كتل متناثرة، وتتجمع الرمال البازلتية الداكنة في المواضع المنخفضة." }),
      rockDensity: MARS_ROCK({ en: "Low to moderate", ar: "منخفضة إلى متوسطة" }, { en: "Wind keeps much of the plain swept clean; rocks are scattered rather than packed.", ar: "تُبقي الرياح معظم السهل نظيفًا، والصخور متناثرة لا متراصة." }),
      temperature: { display: { en: "About −83 to −23 °C air", ar: "هواء نحو −83 إلى −23 °م" }, detail: { en: "Close to Jezero, where Perseverance measures air from about −83 °C before dawn to −23 °C in the afternoon.", ar: "قريب من جيزيرو حيث تقيس برسفيرانس حرارة الهواء من نحو −83 °م قبل الفجر إلى −23 °م بعد الظهر." }, reference: JEZERO_MET }
    },
    analogs: [BATINAH]
  }),
  marsSite("aonia", {
    id: "aonia-terra", code: "R-03",
    name: { en: "Aonia Terra", ar: "أونيا تيرا" },
    location: { en: "Southern highlands, Mars", ar: "المرتفعات الجنوبية، المريخ" },
    coords: "52.2° S, 108.5° W",
    photo: "aoniaPhoto", photoSource: "https://science.nasa.gov/photojournal/dune-fields-in-aonia-planum-and-aonia-terra",
    criteria: {
      terrain: { display: { en: "Sand fields and dunes", ar: "حقول رمال وكثبان رملية" }, detail: { en: "Ancient cratered highlands where sand collects in low-lying plains (THEMIS, PIA13839).", ar: "مرتفعات قديمة مليئة بالفوهات تتجمع الرمال في سهولها المنخفضة (THEMIS، ‏PIA13839)." }, evidence: { en: "THEMIS image PIA13839", ar: "صورة THEMIS ‏PIA13839" } },
      geology: { display: { en: "Old highland crust with dark dune sand", ar: "قشرة مرتفعات قديمة مع رمال كثبان داكنة" }, detail: { en: "Heavily cratered ancient crust; the dunes are made of dark, wind-moved sand.", ar: "قشرة قديمة كثيرة الفوهات، والكثبان مكوّنة من رمال داكنة تحركها الرياح." }, reference: "https://science.nasa.gov/photojournal/dune-fields-in-aonia-planum-and-aonia-terra" },
      rockSize: MARS_ROCK({ en: "Sand in the dune fields, rocks on crater rims", ar: "رمل في حقول الكثبان وصخور على حواف الفوهات" }, { en: "Dune fields are rock-free sand; crater rims and ejecta carry blocks.", ar: "حقول الكثبان رمل خالٍ من الصخور، بينما تحمل حواف الفوهات ومقذوفاتها كتلًا صخرية." }),
      rockDensity: MARS_ROCK({ en: "Very low on dunes", ar: "منخفضة جدًا على الكثبان" }, { en: "As at Al Sharqiya, soft sand rather than rock is the driving hazard.", ar: "كما في رمال الشرقية، الخطر على القيادة هو الرمل الناعم لا الصخور." }),
      temperature: { display: { en: "Colder than the equator, winter frost", ar: "أبرد من خط الاستواء، صقيع شتوي" }, detail: { en: "At about 52° S, winters are long and cold enough for seasonal frost; NASA gives Mars a range from about 20 °C down to about −153 °C.", ar: "عند نحو 52° جنوبًا يكون الشتاء طويلًا وباردًا بما يكفي لتكوّن صقيع موسمي، وتذكر ناسا أن حرارة المريخ تتراوح من نحو 20 °م إلى نحو −153 °م." }, reference: MARS_FACTS }
    },
    analogs: [SHARQIYA]
  }),
  marsSite("jezero", {
    id: "jezero", code: "R-04",
    name: { en: "Jezero Crater", ar: "فوهة جيزيرو" },
    location: { en: "Ancient lake crater, Mars", ar: "فوهة بحيرة قديمة، المريخ" },
    coords: "18.4° N, 77.5° E",
    photo: "jezeroPhoto", photoSource: "https://science.nasa.gov/photojournal/jezero-crater-mars-2020s-landing-site",
    criteria: {
      terrain: { display: { en: "Dry lake basin with a river delta", ar: "حوض بحيرة جاف مع دلتا نهرية" }, detail: { en: "A 45 km crater that once held a lake; a river built the fan-shaped delta on its western side. Perseverance has explored it since 2021.", ar: "فوهة قطرها 45 كم احتوت بحيرة يومًا، وبنى نهرٌ الدلتا المروحية على جانبها الغربي. تستكشفها المركبة برسفيرانس منذ 2021." }, evidence: { en: "CTX and CRISM image PIA23239", ar: "صورة CTX وCRISM ‏PIA23239" } },
      geology: { display: { en: "Delta clays and carbonates, igneous floor", ar: "طين وكربونات الدلتا وقاع ناري" }, detail: { en: "The delta holds clay and carbonate minerals laid down in water; the crater floor is volcanic rock rich in olivine.", ar: "تحتوي الدلتا على معادن طينية وكربونية ترسبت في الماء، وقاع الفوهة صخر بركاني غني بالأوليفين." }, reference: "https://science.nasa.gov/photojournal/jezero-crater-mars-2020s-landing-site" },
      rockSize: MARS_ROCK({ en: "Pebbles to boulders on the delta", ar: "من الحصى إلى الجلاميد على الدلتا" }, { en: "Perseverance's cameras show boulders on the delta front and rocky outcrops on the crater floor.", ar: "تُظهر كاميرات برسفيرانس جلاميد عند مقدمة الدلتا ونتوءات صخرية في قاع الفوهة." }),
      rockDensity: MARS_ROCK({ en: "Moderate", ar: "متوسطة" }, { en: "Rocky patches alternate with sandy, drivable ground.", ar: "تتناوب البقع الصخرية مع أرض رملية صالحة للقيادة." }),
      temperature: { display: { en: "About −83 to −23 °C air", ar: "هواء نحو −83 إلى −23 °م" }, detail: { en: "Measured by Perseverance's MEDA weather station: air from about −83 °C before dawn to −23 °C in the afternoon.", ar: "قاستها محطة الطقس MEDA على برسفيرانس: الهواء من نحو −83 °م قبل الفجر إلى −23 °م بعد الظهر." }, reference: JEZERO_MET }
    },
    analogs: [ADAM]
  })
];

/* site-specific rover notes */
const note = (id, en, ar) => { GX.SITES.find((x) => x.id === id).roverNote = { en, ar }; };
note("shackleton", "The SEV's pivoting wheels allow crab-style driving on steep terrain; Jebel Akhdar's slopes are the place to rehearse it.", "تسمح عجلات SEV المحورية بالقيادة الجانبية على التضاريس الشديدة، ومنحدرات الجبل الأخضر هي المكان المناسب للتدرب على ذلك.");
note("valles-marineris", "Curiosity has spent years climbing the layered slopes of Mount Sharp, the closest rover experience to Valles Marineris' canyon walls.", "قضت كيوريوسيتي سنوات تصعد منحدرات جبل شارب المتطبقة، وهي أقرب تجربة لمركبة إلى جدران أخاديد فاليس مارينيريس.");
note("syrtis-major", "Wide, smooth plains suit long drives; the Batinah plain is the place to test range and navigation.", "تناسب السهول الواسعة الملساء القيادة لمسافات طويلة، وسهل الباطنة هو المكان المناسب لاختبار المدى والملاحة.");
note("aonia-terra", "Slopes are gentle, but dune sand can trap wheels (as it did NASA's Spirit rover): test sand driving at Al Sharqiya first.", "المنحدرات لطيفة، لكن رمال الكثبان قد تعلق بها العجلات (كما حدث لمركبة Spirit من ناسا): يجب اختبار القيادة على الرمال في رمال الشرقية أولًا.");
note("jezero", "Proven in practice: Perseverance has driven Jezero's floor and delta since 2021.", "مثبتة عمليًا: تقود برسفيرانس على قاع جيزيرو ودلتاها منذ 2021.");

/* ---------- Earth analog library ---------- */
const libStats = (a) => ({ slope: a.criteria.slope.headline, rough: a.criteria.roughness.headline, elev: a.criteria.elevation && a.criteria.elevation.headline });
const TEAM = { en: "Team analysis", ar: "تحليل الفريق" };
GX.ANALOG_LIBRARY = [
  { analog: AKHDAR, twinOf: "shackleton", stats: libStats(AKHDAR), source: { en: "SRTM", ar: "SRTM" } },
  { analog: KAWR, twinOf: "valles-marineris", stats: libStats(KAWR), source: { en: "SRTM", ar: "SRTM" } },
  { analog: BATINAH, twinOf: "syrtis-major", stats: libStats(BATINAH), source: { en: "SRTM", ar: "SRTM" } },
  { analog: SHARQIYA, twinOf: "aonia-terra", stats: libStats(SHARQIYA), source: { en: "SRTM", ar: "SRTM" } },
  { analog: ADAM, twinOf: "jezero", stats: libStats(ADAM), source: { en: "SRTM", ar: "SRTM" } },
  { analog: HAUGHTON, twinOf: null, stats: libStats(HAUGHTON), source: { en: "QGIS", ar: "QGIS" }, tag: { en: "Team analysis · NASA rover test site", ar: "تحليل الفريق · موقع اختبار مركبات ناسا" } },
  { analog: SAMAIL, twinOf: null, stats: libStats(SAMAIL), tag: TEAM },
  { analog: AMADEE, twinOf: null, stats: libStats(AMADEE), tag: { en: "Mars analog mission site", ar: "موقع مهمة محاكاة للمريخ" } }
];

/* ---------- rovers: official NASA specifications and NASA 3D models ---------- */
GX.ROVERS = {
  sev: {
    name: { en: "NASA Space Exploration Vehicle", ar: "مركبة استكشاف الفضاء من ناسا" }, short: "SEV",
    full: { en: "Crewed pressurized rover for the Moon and Mars", ar: "مركبة مأهولة مضغوطة للقمر والمريخ" },
    model: "assets/models/sev.glb", world: "moon", url: "https://www.nasa.gov/wp-content/uploads/2015/08/464826main_sev_factsheet_508.pdf",
    status: { en: "NASA surface concept, field-tested on Earth (Desert RATS)", ar: "تصميم ناسا السطحي، اختُبر ميدانيًا على الأرض (Desert RATS)" },
    maxSlope: null,
    specs: [
      { k: { en: "Mass", ar: "الكتلة" }, v: "≈ 3,000 kg" },
      { k: { en: "Size (L × H)", ar: "الأبعاد (طول × ارتفاع)" }, v: "4.5 × 3 m" },
      { k: { en: "Crew", ar: "الطاقم" }, v: { en: "2 (4 in an emergency)", ar: "2 (4 في الطوارئ)" } },
      { k: { en: "Wheels", ar: "العجلات" }, v: { en: "Pivot 360° for crab-style driving, 99 cm", ar: "تدور 360° للقيادة الجانبية، 99 سم" } },
      { k: { en: "Top speed", ar: "السرعة القصوى" }, v: "≈ 10 km/h" },
      { k: { en: "Range (two SEVs)", ar: "المدى (مركبتان)" }, v: { en: "More than 200 km", ar: "أكثر من 200 كم" } },
      { k: { en: "Shelter", ar: "الحماية" }, v: { en: "Radiation safe haven for up to 72 h", ar: "ملجأ من الإشعاع حتى 72 ساعة" } }
    ]
  },
  curiosity: {
    name: { en: "NASA Curiosity", ar: "كيوريوسيتي من ناسا" }, short: "Curiosity",
    full: { en: "Mars Science Laboratory rover", ar: "مركبة مختبر علوم المريخ" },
    model: "assets/models/curiosity.glb", world: "mars", url: "https://science.nasa.gov/mission/msl-curiosity/",
    status: { en: "Exploring Gale Crater since August 2012", ar: "تستكشف فوهة غيل منذ أغسطس 2012" },
    maxSlope: null,
    specs: [
      { k: { en: "Mass", ar: "الكتلة" }, v: "899 kg" },
      { k: { en: "Size (L × W × H)", ar: "الأبعاد (طول × عرض × ارتفاع)" }, v: "3 × 2.7 × 2.1 m" },
      { k: { en: "Wheels", ar: "العجلات" }, v: { en: "6 aluminium wheels, 50 cm, rocker-bogie", ar: "ست عجلات ألومنيوم قطرها 50 سم، بتعليق روكر-بوجي" } },
      { k: { en: "Slope capability", ar: "القدرة على صعود المنحدرات" }, v: { en: "Rocker-bogie; tilted to 31° climbing Mount Sharp (2020)", ar: "روكر-بوجي، ومالت حتى 31° أثناء صعود جبل شارب (2020)" } },
      { k: { en: "Obstacle capability", ar: "القدرة على تجاوز العوائق" }, v: { en: "Rocks up to 75 cm", ar: "صخور حتى 75 سم" } },
      { k: { en: "Top speed", ar: "السرعة القصوى" }, v: "4 cm/s" },
      { k: { en: "Power", ar: "الطاقة" }, v: { en: "MMRTG nuclear generator", ar: "مولد نووي MMRTG" } }
    ]
  },
  perseverance: {
    name: { en: "NASA Perseverance", ar: "برسفيرانس من ناسا" }, short: "Perseverance",
    full: { en: "Mars 2020 rover", ar: "مركبة مهمة مارس 2020" },
    model: "assets/models/perseverance.glb", world: "mars", url: "https://science.nasa.gov/mission/mars-2020-perseverance/rover-components/",
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
  const st = s.bars, lim = rv.maxSlope, mean = st.slopeMean, flat = st.flatShare;
  if (lim == null) return {
    level: { en: "Fit with route planning", ar: "ملاءمة مع تخطيط المسار" },
    text: { en: `Mean slope ${mean.toFixed(2)}°; ${flat.toFixed(2)}% of the area is under 10°. NASA does not publish a single slope limit for ${rv.short}, so drives follow the gentler ground.`, ar: `متوسط الانحدار ${mean.toFixed(2)}°، و${flat.toFixed(2)}% من المنطقة أقل من 10°. لا تنشر ناسا حدًا واحدًا للانحدار لمركبة ${rv.short}، لذا تتبع القيادة الأرض الألطف.` }
  };
  const good = mean <= lim / 3, ok = mean <= lim;
  const level = good ? { en: "Good fit", ar: "ملاءمة جيدة" } : ok ? { en: "Fit with route planning", ar: "ملاءمة مع تخطيط المسار" } : { en: "Partial fit", ar: "ملاءمة جزئية" };
  const en = `Mean slope ${mean.toFixed(2)}° against a ${lim}° limit; ${flat.toFixed(2)}% of the area is under 10°. ` + (good ? "Most of the ground is well inside the rover's limits." : ok ? "Drivable, but steeper patches must be routed around." : "The mean slope is above the limit, so traverses must follow the gentler patches.");
  const ar = `متوسط الانحدار ${mean.toFixed(2)}° مقابل حد ${lim}°، و${flat.toFixed(2)}% من المنطقة أقل من 10°. ` + (good ? "معظم الأرض ضمن حدود المركبة بفارق كبير." : ok ? "صالحة للقيادة، لكن يجب الالتفاف حول البقع الأشد انحدارًا." : "متوسط الانحدار أعلى من الحد، لذا يجب أن تتبع المسارات البقع الألطف.");
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
  { src: "assets/img/oman/akhdar-s2.webp", group: "oman", caption: "akhdarPhoto" },
  { src: "assets/img/oman/kawr-s2.webp", group: "oman", caption: "kawrPhoto" },
  { src: "assets/img/oman/batinah-s2.webp", group: "oman", caption: "batinahPhoto" },
  { src: "assets/img/oman/sharqiya-box-s2.webp", group: "oman", caption: "sharqiyaBox" },
  { src: "assets/img/oman/adam-s2.webp", group: "oman", caption: "adamPhoto" },
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
  { label: { en: "NASA 3D Resources: Mars 2020 Perseverance and Space Exploration Vehicle models", ar: "موارد ناسا ثلاثية الأبعاد: نموذجا برسفيرانس ومركبة استكشاف الفضاء" }, url: "https://github.com/nasa/NASA-3D-Resources" },
  { label: { en: "NASA Science: Curiosity rover 3D model (NASA/JPL-Caltech)", ar: "ناسا للعلوم: نموذج ثلاثي الأبعاد للمركبة كيوريوسيتي (NASA/JPL-Caltech)" }, url: "https://science.nasa.gov/resource/curiosity-rover-3d-model/" },
  { label: { en: "NASA Facts: Space Exploration Vehicle Concept (FS-2011-08-045-JSC)", ar: "حقائق ناسا: تصميم مركبة استكشاف الفضاء (FS-2011-08-045-JSC)" }, url: "https://www.nasa.gov/wp-content/uploads/2015/08/464826main_sev_factsheet_508.pdf" },
  { label: { en: "NASA Mars Science Laboratory (Curiosity) mission page", ar: "صفحة مهمة مختبر علوم المريخ (كيوريوسيتي) من ناسا" }, url: "https://science.nasa.gov/mission/msl-curiosity/" },
  { label: { en: "Sentinel-2 cloudless 2020 by EOX (CC BY 4.0), views of the matched Oman areas", ar: "Sentinel-2 cloudless 2020 من EOX ‏(CC BY 4.0)، صور المناطق المطابقة في عُمان" }, url: "https://s2maps.eu" },
  { label: { en: "NASA JSC Gateway to Astronaut Photography of Earth: STS085-501-14 (Wahiba Sands) and ISS053-E-302321 (Al Hajar Mountains)", ar: "بوابة ناسا لصور رواد الفضاء للأرض (مركز جونسون): STS085-501-14 (رمال وهيبة) وISS053-E-302321 (جبال الحجر)" }, url: "https://eol.jsc.nasa.gov/" },
  { label: { en: "NASA MGS MOLA global DEM, 463 m/px (USGS Astrogeology), Mars slope, roughness and elevation", ar: "نموذج الارتفاع العالمي MOLA من ناسا، 463 م/بكسل (USGS Astrogeology)، لانحدار المريخ وخشونته وارتفاعه" }, url: "https://astrogeology.usgs.gov/search/map/mars_mgs_mola_dem_463m" },
  { label: { en: "NASA Shuttle Radar Topography Mission (SRTM) via AWS Terrain Tiles, used to search Oman for the best-matching twin areas", ar: "مهمة ناسا للمسح الراداري للتضاريس (SRTM) عبر AWS Terrain Tiles، لانحدار عُمان وخشونتها وارتفاعها" }, url: "https://www.earthdata.nasa.gov/data/instruments/srtm" },
  { label: { en: "NASA Mars 2020 Perseverance rover components and specifications", ar: "مكونات ومواصفات المركبة برسفيرانس (مارس 2020) من ناسا" }, url: "https://science.nasa.gov/mission/mars-2020-perseverance/rover-components/" },
  { label: { en: "Rodriguez-Manfredi et al. (2023) The diverse meteorology of Jezero crater over the first 250 sols of Perseverance on Mars. Nature Geoscience 16", ar: "Rodriguez-Manfredi وآخرون (2023): تنوع الأرصاد الجوية في فوهة جيزيرو خلال أول 250 يومًا مريخيًا لبرسفيرانس. مجلة Nature Geoscience، المجلد 16" }, url: "https://doi.org/10.1038/s41561-022-01084-0" },
  { label: { en: "NASA Mars facts (temperature)", ar: "حقائق ناسا عن المريخ (درجة الحرارة)" }, url: "https://science.nasa.gov/mars/facts/" },
  { label: { en: "Haruyama et al. (2008) Lack of exposed ice inside lunar south pole Shackleton crater. Science 322, 938–939", ar: "Haruyama وآخرون (2008): غياب الجليد المكشوف داخل فوهة شاكلتون في القطب الجنوبي للقمر. مجلة Science، المجلد 322" }, url: "https://doi.org/10.1126/science.1164020" },
  { label: { en: "NASA: candidate regions for the Artemis III landing near the lunar South Pole (2022)", ar: "ناسا: المناطق المرشحة لهبوط Artemis III قرب القطب الجنوبي للقمر (2022)" }, url: "https://www.nasa.gov/news-release/nasa-identifies-candidate-regions-for-landing-next-americans-on-moon/" },
  { label: { en: "JPL: Curiosity takes a selfie before its record climb (2020)", ar: "JPL: كيوريوسيتي تلتقط صورة ذاتية قبل صعودها القياسي (2020)" }, url: "https://www.jpl.nasa.gov/news/nasas-curiosity-mars-rover-takes-a-new-selfie-before-record-climb/" },
  { label: { en: "Devon Island climate, The Canadian Encyclopedia", ar: "مناخ جزيرة ديفون، الموسوعة الكندية" }, url: "https://www.thecanadianencyclopedia.ca/en/article/devon-island" },
  { label: { en: "Oman climate, World Bank Climate Change Knowledge Portal", ar: "مناخ عُمان، بوابة البنك الدولي لمعرفة تغير المناخ" }, url: "https://climateknowledgeportal.worldbank.org/country/oman/climate-data-historical" },
  { label: { en: "NASA Image and Video Library: K-10 rover at Haughton Crater, Haughton-Mars Project 2007 (NASA Ames)", ar: "مكتبة ناسا للصور والفيديو: المركبة K-10 في فوهة هوتون، مشروع هوتون-المريخ 2007 (مركز أميس)" }, url: "https://images.nasa.gov/details/ARC-2007-ACD07-0170-001" }
];
