<div align="center">

# 🌍 GROUND X

### Every world has a twin on Earth.

**A bilingual (English / العربية) interactive atlas that pairs landing sites on the Moon and Mars with geologically similar places on Earth.** It compares each pair criterion by criterion using real elevation data, and shows the rovers suited to that ground.

[**🚀 Open the live site**](https://hamzasaif533.github.io/groundx/) · [العربية](https://hamzasaif533.github.io/groundx/?lang=ar) · [Light mode](https://hamzasaif533.github.io/groundx/?theme=light)

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![GSAP](https://img.shields.io/badge/GSAP_3.13-0AE448?style=flat-square&logo=greensock&logoColor=black)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=flat-square&logo=threedotjs&logoColor=white)
![Bilingual](https://img.shields.io/badge/EN_%7C_AR-RTL_ready-bfb29a?style=flat-square)
![No build step](https://img.shields.io/badge/build-none_needed-d7ffc5?style=flat-square)

<br>

<img src="docs/screenshots/hero-dark.jpg" alt="Ground X home screen: 3D Moon, Mars and Earth beside the headline Every world has a twin on Earth" width="100%">

</div>

---

## ✨ What it does

Space agencies test rovers, spacesuits and procedures in places on Earth that behave like the Moon or Mars. These are called **planetary analogs**. Ground X makes that idea visible:

1. **Pick a site** on the Moon or Mars.
2. **Meet its Earth twin.** Each site is paired with the most similar place on Earth.
3. **Compare them criterion by criterion:** terrain, slope, roughness, elevation, geology, rock size and density, and temperature, each with its values, method and evidence.
4. **See a terrain similarity index** (0 to 100) calculated from slope, flat-ground share, roughness and relief.
5. **Explore the real terrain in 3D** and walk along the elevation profile.
6. **Match the rover:** three NASA rovers (Space Exploration Vehicle, Curiosity, Perseverance) shown as real 3D models from NASA, with official specifications and a slope-based fit check.

> **Data honesty is a core rule.** Team numbers are shown exactly as supplied. Numbers computed by Ground X (Mars from NASA MOLA, Oman from NASA SRTM, both on a matched 463 m grid) say so in their method, and every value links to its source.

---

## 🛰️ Sites in the atlas

| | Site | Earth twin (found by terrain search) | Similarity | Rover |
|:-:|---|---|:-:|---|
| 🌕 | **Shackleton Rim**, lunar south pole | **Jebel Akhdar, north flank**, Al Awabi, Oman | 81% | NASA Space Exploration Vehicle |
| 🔴 | **Valles Marineris** | **Jebel Kawr canyons**, Bahla, Oman | 88% | NASA Curiosity |
| 🔴 | **Syrtis Major** | **Batinah gravel plain**, As Suwaiq, Oman | 97% | NASA Perseverance |
| 🔴 | **Aonia Terra** | **Al Sharqiya Sands**, Al Mudhaibi, Oman | 95% | NASA Perseverance |
| 🔴 | **Jezero Crater** | **Adam basin**, Ad Dakhiliyah, Oman | 93% | NASA Perseverance |

**How the twins were found:** for every site, Ground X searched the whole of Oman (NASA SRTM elevation) for the area of the *same size* whose slope, flat-ground share, roughness and relief best match the site (NASA MOLA for Mars, NASA LOLA for the Moon), all on the same 424 m grid. Each candidate was then checked against Sentinel-2 imagery so the twin is also the right kind of ground (canyons for Valles, sand for Aonia, mafic gravel for Syrtis, a wadi-fed basin for Jezero).

Also in the analog library: the team's **Haughton Crater** study (Canada, a NASA rover test site), the **Samail Ophiolite** and the **AMADEE-18 "Kepler" station** in Dhofar.

---

## 🖼️ A tour of the site

<table>
<tr>
<td width="50%"><img src="docs/screenshots/compare.jpg" alt="Side-by-side comparison of Shackleton Rim and Haughton Crater"></td>
<td width="50%"><img src="docs/screenshots/criteria.jpg" alt="Expanded slope criterion with values, method and evidence map"></td>
</tr>
<tr>
<td><b>Side by side.</b> Pick any site to see it next to its Earth twin, with the terrain similarity index.</td>
<td><b>Criterion by criterion.</b> Open a row to see the values, the method, the team's status note and the map behind it.</td>
</tr>
<tr>
<td><img src="docs/screenshots/explore.jpg" alt="Haughton Crater in 3D with Sentinel-2 satellite imagery draped over the terrain"></td>
<td><img src="docs/screenshots/explore-slope.jpg" alt="Shackleton Rim in 3D with the team's slope classes draped over the terrain"></td>
</tr>
<tr>
<td><b>Explore in 3D.</b> Real elevation models you can hold and spin. Haughton shows Sentinel-2 satellite imagery reprojected onto the DEM grid.</td>
<td><b>Switch layers:</b> Satellite · Slope map · Roughness · Elevation · Wireframe. Each one is the team's own aligned raster.</td>
</tr>
<tr>
<td><img src="docs/screenshots/profile.jpg" alt="Elevation profile across Shackleton with a probe walking the transect"></td>
<td><img src="docs/screenshots/analogs.jpg" alt="Earth analog library cards for Haughton, Samail and AMADEE-18"></td>
</tr>
<tr>
<td><b>Walk down into Shackleton.</b> Scroll and a probe travels along a real 19.8 km LRO LOLA transect, showing distance and elevation live.</td>
<td><b>Earth analog library.</b> Every Earth twin in one place, with what it stands in for and its measured terrain values.</td>
</tr>
<tr>
<td><img src="docs/screenshots/evidence.jpg" alt="Evidence gallery with filters for Moon, Canada, Mars and Oman"></td>
<td><img src="docs/screenshots/footer.jpg" alt="Footer with the GROUNDX wordmark over a 3D wireframe of Shackleton"></td>
</tr>
<tr>
<td><b>Show your working.</b> QGIS maps, NASA Moon Trek and Mars Trek views, ArcticDEM checks, filterable by place.</td>
<td><b>The footer terrain</b> cycles through wireframe, slope, roughness and elevation on the real Shackleton grid.</td>
</tr>
</table>

---

## 🌗 Two languages, two themes, any screen

<table>
<tr>
<td width="50%"><img src="docs/screenshots/hero-ar.jpg" alt="Arabic right-to-left version of the home screen"></td>
<td width="50%"><img src="docs/screenshots/hero-light.jpg" alt="Light theme of the home screen"></td>
</tr>
<tr>
<td align="center"><b>Full Arabic, right to left.</b> Every string exists in both languages; Western digits throughout.</td>
<td align="center"><b>Light mode</b> in warm paper tones, with a circular reveal when you switch.</td>
</tr>
</table>

<p align="center">
  <img src="docs/screenshots/mobile.jpg" alt="Mobile layout, English" width="260">
  &nbsp;&nbsp;&nbsp;
  <img src="docs/screenshots/mobile-ar-light.jpg" alt="Mobile layout, Arabic light theme" width="260">
</p>

---

## 🧭 How a comparison is built

```mermaid
flowchart LR
    A["🌕 Moon / 🔴 Mars site<br/>NASA DEM · Moon Trek · Mars Trek"] --> C["Terrain analysis<br/>QGIS · satellite statistics"]
    B["🌍 Earth twin<br/>DEM · satellite imagery"] --> C
    C --> D["Criteria<br/>slope · roughness · elevation · geology"]
    D --> E["Side-by-side comparison<br/>values · method · status · evidence"]
    E --> F["🚙 Rover match<br/>(in progress)"]
```

---

## 🎛️ Interaction highlights

- **3D planets.** The Moon shows its near side, Mars the Valles Marineris and Tharsis region, and Earth the Atlantic. Drag any planet to spin it.
- **3D terrain explorer:** hold and drag to rotate and tilt, with five draped layers and a labelled vertical exaggeration.
- **Scroll-driven elevation profile** that pins on desktop while a probe walks the transect.
- **Side rail:** a quiet measuring-scale progress bar; click anywhere to glide to that point.
- **GSAP motion throughout:** split-text headlines, image reveals, a magnetic footer wordmark, sliding selectors and an infinite marquee. All of it respects *prefers-reduced-motion*.
- **Shareable deep links:** `?lang=ar`, `?theme=light`, `?at=compare` (jump to any section id).

---

## 🗂️ Project structure

```
index.html                 page shell (sections, nav, ruler, lightbox)
assets/
  css/style.css            design system, dark + light themes, RTL via logical properties
  js/data.js               ★ all research content: sites, twins, criteria, evidence, sources
  js/i18n.js               interface text in English and Arabic
  js/app.js                rendering, language/theme switching, GSAP animation
  js/terrain.js            Three.js terrain engine (wireframe + draped layers)
  js/globes.js             Three.js Moon, Mars and Earth in the hero
  data/terrain.js          Shackleton Site04 elevation grid (160 × 158)
  data/haughton-dem.js     Haughton elevation grid (160 × 160)
  data/profile.js          Shackleton elevation transect (LRO LOLA)
  img/                     web-ready maps, photos, team screenshots, planet textures
docs/screenshots/          images used in this README
```

---

## 🚀 Run it locally

No build step and no dependencies. It's plain HTML, CSS and JS; GSAP and Three.js load from a CDN.

```bash
git clone https://github.com/Hamzasaif533/groundx.git
cd groundx
python -m http.server 5173
```

Then open **http://localhost:5173**. Serve the folder rather than double-clicking `index.html`, because browsers block WebGL textures on `file://` pages. Opened as a file, the 3D globes fall back to flat versions.

---

## ✏️ Adding research as it arrives

Everything lives in **`assets/js/data.js`**, written in both languages as `{ en, ar }`:

| To add… | Do this |
|---|---|
| A Moon or Mars site | Push an object into `GX.SITES` (copy a `marsSite({...})` entry). It appears in the tabs, the site switcher and the counts automatically. |
| Terrain statistics for a new place | Add an entry to `GX.DEM_STATS`; `demCriteria()` turns it into slope, roughness and elevation criteria. |
| Terrain statistics | Put raw values in `GX.GEE_STATS`; `geeCriteria()` turns them into slope, roughness and elevation criteria. |
| An Earth analog card | Add to `GX.ANALOG_LIBRARY`. |
| Evidence images | Add to `GX.EVIDENCE` with a `group` (`moon`, `canada`, `mars`, `oman`). |
| The similarity % | Computed automatically by `GX.similarity()` from the two sides' `bars`. |
| A rover | Add it to `GX.ROVERS` and set `rover` on the site. |

After editing a CSS or JS file, increase the `?v=` number on its link in `index.html` so browsers load the new version.

---

## 📚 Data & credits

| Source | Used for |
|---|---|
| [NASA PGDA, Site04](https://pgda.gsfc.nasa.gov/products/78) · LRO LOLA | Shackleton elevation, slope and roughness |
| [NASA SVS](https://svs.gsfc.nasa.gov/4716) | Shackleton imagery |
| [NASA Mars Trek](https://trek.nasa.gov/mars/) | Team views of the Mars sites |
| [NASA/JPL Photojournal](https://science.nasa.gov/photojournal/) · PIA00422, PIA23239, PIA20984, PIA13839 | Valles Marineris, Jezero, Syrtis Major and Aonia Terra photos |
| [NASA Earth Observatory](https://science.nasa.gov/earth/earth-observatory/earths-crust-exposed-in-oman-77569) (EO-1 ALI, 2012) | Samail Ophiolite photo |
| [NASA JSC astronaut photography](https://eol.jsc.nasa.gov/) · STS085-501-14, ISS053-E-302321 | Al Sharqiya Sands and Al Hajar Mountains photos |
| [NASA MGS MOLA DEM, 463 m](https://astrogeology.usgs.gov/search/map/mars_mgs_mola_dem_463m) · [NASA SRTM](https://www.earthdata.nasa.gov/data/instruments/srtm) | Matched slope, roughness and elevation for Mars sites and Oman twins |
| [NASA 3D Resources](https://github.com/nasa/NASA-3D-Resources) · [Curiosity 3D model](https://science.nasa.gov/resource/curiosity-rover-3d-model/) | Rover 3D models (compressed for the web) |
| [SEV fact sheet](https://www.nasa.gov/wp-content/uploads/2015/08/464826main_sev_factsheet_508.pdf) · [Curiosity](https://science.nasa.gov/mission/msl-curiosity/) · [Perseverance](https://science.nasa.gov/mission/mars-2020-perseverance/rover-components/) | Rover specifications |
| [NASA Ames, K-10 rover at Haughton](https://images.nasa.gov/details/ARC-2007-ACD07-0170-001) (2007) | Rover field-test evidence |
| [Landsat 8 (Wikimedia Commons)](https://commons.wikimedia.org/wiki/File:Haughton_Crater_-Landsat_8(48010457521).png) | Haughton photo |
| [ArcticDEM mosaic v4.1, 2 m](https://www.pgc.umn.edu/data/arcticdem/) (Polar Geospatial Center) | Haughton elevation model and site checks |
| [Sentinel-2 cloudless 2016 by EOX](https://s2maps.eu) (CC BY 4.0, modified Copernicus Sentinel data) | Haughton 3D satellite layer |
| [Solar System Scope](https://www.solarsystemscope.com/textures/) (CC BY 4.0) | 3D planet textures |
| Gawronska et al. (2020), *Advances in Space Research* 66 | Lunar south pole geology |
| Leask et al. (2021), *Earth and Space Science* 8 | Samail Ophiolite as a Mars analog |
| [Austrian Space Forum, AMADEE-18](https://oewf.org/en/amadee-18/) · EPSC 2018 abstracts | Dhofar Mars analog mission |

---

## 🤖 Use of Super Intelligence (SI)

Built for the **2026 NASA Space Apps Challenge**: *Identify Earth Locations that Analog the Permanent Moon Base Locations and Mars*.

The website code, the Oman terrain search and parts of the text, the demo video and the slides were produced with SI assistance (Claude by Anthropic) under the team's direction. The research idea, the site pairings and the team's QGIS and satellite analyses are the team's own. All data comes from the NASA and partner sources listed above.

**Earth's limits:** no Earth twin reproduces lower gravity, the lunar vacuum, the thin Martian atmosphere or space radiation; the twins are analogs for terrain, surface and operations.

Built with [GSAP](https://gsap.com/) and [Three.js](https://threejs.org/). Typography: Michroma, Readex Pro, Barlow Condensed, JetBrains Mono (Google Fonts).

<div align="center">
<br>

**GROUND X** · comparing other worlds with their Earth twins

</div>
