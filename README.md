# FireNav project homepage

Project page: https://firenav-bench.github.io/FireNav/

A responsive academic website for **FireNav: Decision-Oriented Reconstruction Evidence Routing for Vision-Language Navigation in Indoor Fire Environments**.

## Preview and update

Run `python3 -m http.server 8766` in this directory and open http://localhost:8766.
GitHub Pages serves the repository root from `main`. No build step is needed.
The distribution keeps media next to `index.html`, with relative paths that work on project Pages URLs.

- Layout and copy: `index.html`
- Responsive styling: `styles.css`
- Video playback and camera views: `script.js`
- Figures: `benchmark.webp`, `method.webp`, `comparison.webp`, `results-table.webp`
- Videos: H.264 MP4 files; poster images share their names with a `.jpg` extension.
- Browser icon: supplied flame/eye logo, true RGBA transparency, PNG sizes and a multi-resolution ICO. `favicon-master-4096.png` is a 4096x4096 export from the high-resolution image cleanup.

## Content provenance

The abstract is copied verbatim from the supplied manuscript source. Sections use headings and media without introductory paragraphs.
`results-table.webp` is a lossless 6x render of the complete Table 1 from page 7 of the supplied PDF, including its original caption, all 13 methods, venues, eight metrics, and ranking styles.
The Paper button is disabled pending a public paper link. The supplied manuscript PDF is excluded from the public distribution.
The website does not provide a LaTeX source download.
The website does not independently validate experiment provenance.

All demonstrations come from the supplied Demo directory and depict simulation.
Browser encodings preserve duration, use 20 fps, H.264/yuv420p, and fast-start MP4.
The overview retains its original editorial speed and captions.
Eight demonstration videos automatically loop, muted, while visible. The three selectable comparison videos remain manual.
Automatic videos pause offscreen or in hidden tabs; native controls remain available.
Comparison videos execute independent trajectories; playback time is not a matched-state comparison.

The four authors and two affiliations follow author information supplied by the user from OpenReview submission ST0MOFcOcK. Names, order and affiliation superscripts are preserved; author and institution links use the supplied destinations.
No arXiv identifier, model URL, navigation code repository, or dataset release URL is invented.

## Design references

- https://astra-amap.github.io/omninav.github.io/
- https://internrobotics.github.io/internvla-n1.github.io/
- https://amap-cvlab.github.io/ABot-Navigation/ABot-N1/

Layout and implementation are original. The page uses a bold full paper title, white backgrounds, locally hosted Inter typography, the original abstract, and native video controls.
The main content uses 92% of the available window width. Media scale with that width, without viewport-height caps; grids reflow at 800px and 600px. Full-resolution figures open from their links.
The font license is included as `inter-OFL.txt`.
Responsive media preserve their full frames. Print styles keep figure and video-poster groups together on pages.
