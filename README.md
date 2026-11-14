# Ground X: Planetary Twins website

A bilingual (English / Arabic RTL) single-page site. It compares Moon and Mars sites with their Earth analogs and shows the rovers suited to each one. It is plain HTML, CSS and JS, with animation by [GSAP](https://gsap.com/) 3.13 (ScrollTrigger, SplitText and ScrollTo, loaded from jsDelivr).

## Run it
Open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 5173
```

Then visit http://localhost:5173. Add `?lang=ar` or `?lang=en` to the URL to force a language. The site remembers the last language chosen.

## Where things live
| File | What it holds |
|---|---|
| `assets/js/data.js` | **All research content**: sites, Earth analogs, criteria values, rovers, evidence images and sources. Each entry has `{ en, ar }` text. |
| `assets/js/i18n.js` | Interface wording in both languages |
| `assets/js/app.js` | Rendering, language switching and GSAP animations |
| `assets/css/style.css` | Styles (logical properties, so RTL works automatically) |
| `assets/img/` | Web images made from the `file/REEM` research files |
| `assets/data/profile.js` | Shackleton elevation profile taken from `ElevationProfile (1).xlsx` (also drives the fixed "ELEV" ruler on the left) |
| `assets/data/terrain.js` | Shackleton Rim elevation grid (Site04 DEM, averaged to 160 × 158) used for the wireframe terrain |
| `assets/js/terrain.js` | Three.js wireframe terrain (hero and footer; the footer can drape the slope-class map) |
| `assets/js/globes.js` | Three.js 3D Moon, Mars and Earth in the hero |
| `assets/img/planets/` | Globe textures by Solar System Scope (CC BY 4.0), based on NASA data |

The design takes inspiration from geospace.hr: a warm charcoal background, khaki and mint headings in Michroma, image pills inside the headline, a wireframe terrain and an altimeter-style ruler.

Interactive parts: drag a planet to spin it. Drag the terrain, or use its arrow buttons, to rotate and tilt it, and switch between Wireframe and Slope map. Drag or click the "ELEV" ruler on the left (or focus it and use the arrow keys) to travel through the page. Its section marks jump to each part. On desktop, ScrollSmoother handles smooth scrolling, and the elevation profile pins in place while a probe walks the transect.

After changing a CSS or JS file, increase the `?v=` number on its link in `index.html` so browsers load the new version.

The 3D globes and the "Slope map" views need the site to be served over http(s). Browsers block WebGL textures on `file://` pages, so in that case the site falls back to flat CSS globes. The wireframe terrain works in both cases.

## Adding research as it arrives (edit `data.js` only)
- **Second Earth twin:** replace the `null` in `analogs: [ {...haughton}, null ]` with a new analog object. Copy the Haughton object as a template.
- **Similarity / difference %:** set `comparison.similarity` and `comparison.difference` to numbers between 0 and 100. Only do this once a documented scoring method exists. While a value is `null`, the site shows "Pending".
- **Rock size, rock density, temperature:** add `rockSize`, `rockDensity` or `temperature` objects to a site's or analog's `criteria`, in the same shape as `slope`. The row becomes expandable automatically.
- **Rover:** fill `GX.ROVERS["pending-1"]` (name, specs `v` values, image) or add a new rover and list its id in `analog.rovers`.
- **Mars site:** add a site with `body: "mars"` to `GX.SITES` (see the four `marsSite({...})` entries). Each site appears automatically in the Mars tab, the site switcher above the comparison and the counts.
- **Earth analog library:** add an entry to `GX.ANALOG_LIBRARY`. Raw Google Earth Engine statistics go in `GX.GEE_STATS`, and `geeCriteria()` turns them into slope, roughness and elevation criteria.
- **Evidence images:** add to `GX.EVIDENCE` with a `group` (`moon`, `canada`, `mars` or `oman`). The filter chips count them automatically.
- **Map links:** set `reference` on a criterion to a URL.

The maps in `assets/img` were rendered straight from the team's GeoTIFFs: slope classes 0–10°, >10–20° and >20°, plus roughness in greyscale. No research values were recalculated. Every number on the site is copied from `Site info.pdf`.
