# Project: portfolio (Frontend Developer application)

## Stack
Plain HTML, CSS, Tailwind CSS (via CDN), vanilla JavaScript. No framework —
this is deliberate: it matches the target job's stack and doubles as proof
of real HTML/CSS/JS skill, not just a claim.

## Structure
- index.html — home page: hero, about, project cards, skills, contact
- projects/<slug>.html — one detail page per flagship project
- css/style.css — custom CSS beyond Tailwind utilities
- js/main.js — interactions (scroll animations, hover effects, etc.)

## Theme
- REVISED (cream/orange rejected — too generic/template-like). New
  direction: near-black background (`#0b0b0f`-ish, not pure #000),
  violet/fuchsia/purple glow accents, drop-shadows and soft colored
  glows on headings and borders. Distinctive, not a copy of any single
  reference — inspired by patterns across the user's own references.
- Pill-shaped tags/badges for skills and project filter categories
  (small dot + label, rounded-full), adapted to the dark palette.
- Uppercase letter-spaced eyebrow label above each section title.
- Project cards: image carousel at top, category badge (top-left),
  title, one-line description, tech-stack pills at the bottom.
- Filterable project grid: "All" + one tab per tech category
  (Laravel / Angular / HTML-CSS / Electron-React).
- Hover interactions: lift/scale with smooth transitions.
- Fully responsive: every new section must work at 400px, 768px, 1024px.

## Planned features (one-time builds, not skills — see Concept 9 vs
## "planned feature" distinction: a skill is a repeated procedure,
## these are single sections built once)

- **3D rotating cube (What I Do / Skills showcase):** pure CSS 3D
  transform, no animation library. `perspective` on the container,
  `transform-style: preserve-3d` on the cube, 4 faces each
  `absolute inset-0 backface-hidden`, positioned with
  `rotateY(0/90/180/-90deg) translateZ(<half the cube's width>)`.
  Auto-rotates via CSS `animation: rotateCubeY 24s infinite linear`,
  pauses on hover (`animation-play-state: paused`). Each face: a
  heading, a one-line description, and 2-3 tag pills. Content = the
  user's 4 core skill/service areas — [TODO: get these 4 categories
  from the user before building].
- **Smooth scroll:** Lenis (MIT-licensed, free) — small, real upgrade,
  low effort.
- **Custom cursor:** a dot + trailing ring that reacts on hover over
  links/buttons. Plain JS, no library needed.
- **Glowing/color-shifting headline text on scroll:** pure CSS
  text-shadow + a scroll listener, no GSAP needed.
- **Scroll-reveal animations:** already partially built (see js/main.js);
  extend with the dark theme's glow treatment.
- Explicitly NOT building: the multi-scene pinned cinematic sequence,
  canvas image-sequence scrubbing, or SplitText letter-by-letter
  animations from the "Afterglow" reference — that was another
  company's bespoke brand site, not a portfolio template, and would
  cost weeks the deadline doesn't allow. See chat history if revisited
  after the job deadline, purely as a learning exercise.

## Content rules
- Never mention AI tools, Claude, or an AI-assisted workflow anywhere in
  the copy. Deliberate choice for this specific job application.
- Skills to list: HTML5, CSS3, JavaScript, Laravel, PHP, Angular,
  Tailwind CSS, MySQL, Firebase, Supabase, Git & GitHub, REST API,
  Figma, Video Editing, Canva. React listed separately as "currently learning."
- Position as a Frontend Developer for this application, not a
  full-stack generalist.
- No filler phrases: "passionate," "cutting-edge," "innovative," etc.
- Always include a "Hire Me" call-to-action and a "Download CV" button.

## Person
- Name: Haya Shakil
- Experience: 2 years HTML/CSS/JS, 1 year Laravel PHP
- Database: MySQL; intermediate in Firebase and Supabase

## Code style
Concise. No unnecessary comments. Matches the surrounding code.
