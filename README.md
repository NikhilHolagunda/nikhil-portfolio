# Nikhil Portfolio

A dark, neon-glass, single-page developer portfolio built with **Next.js 16**, **React 19**, **TypeScript**, **Tailwind CSS v4**, **react-three-fiber**, **Framer Motion** and **Lenis**. Deployed on Vercel.

🌐 **Live:** https://nikhil-portfolio-plum.vercel.app

---

## What's inside

- **Sections:** Hero · About · Experience timeline · Projects (bento grid) · Skills (marquee) · Education · Contact
- **3D hero:** an iridescent liquid-chrome blob inside a wireframe cage plus a particle field (`@react-three/fiber` + `drei`). It is lazy-loaded with `next/dynamic` (`ssr: false`) on the visitor's first interaction, so it never blocks first paint. Mobile, reduced-motion and no-WebGL visitors get a static gradient orb instead.
- **Kinetic type:** the name decodes from scrambled glyphs, with an occasional RGB-split glitch. A mouse-reactive spotlight and a perspective grid sit behind it.
- **Motion:** Lenis smooth scroll; magnetic CTAs; mask-reveal headings and neon wipe lines; scroll-lit About statement; a scroll-filled experience rail with `useInView` reveals; a morphing sticky nav; a custom cursor (fine pointers only). All of it is disabled or simplified for `prefers-reduced-motion`.
- **Contact form** posting to a Next.js API route (email via Resend, best-effort Google Sheets log)
- **Accessible:** semantic landmarks, skip link, visible focus rings, labelled icon buttons, and AA contrast. Decorative layers (marquee, art, cursor) are `aria-hidden`, and real text is always present for screen readers.

## Tech stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| UI | React 19, Tailwind CSS v4, lucide-react |
| 3D | three.js, @react-three/fiber, @react-three/drei |
| Motion | framer-motion, lenis |
| Fonts | Space Grotesk (display), Inter (body), JetBrains Mono (labels) via `next/font` |
| Contact backend | Next.js API route → Resend + Google Sheets API |
| Hosting | Vercel |

## Editing content

All copy lives in **`src/lib/data.ts`** and mirrors the CV. Update the CV first, then
mirror the change there. The downloadable resume is `public/Nikhil-Holagunda-Resume.pdf`.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

Create a `.env.local` with:

```
RESEND_API_KEY=your-resend-key
GOOGLE_CLIENT_ID=your-oauth-client-id
GOOGLE_CLIENT_SECRET=your-oauth-client-secret
GOOGLE_REFRESH_TOKEN=your-refresh-token
```

Without `RESEND_API_KEY`, `/api/contact` returns 500 but the rest of the site renders fine.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start Next.js dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Project structure

```
src/
├── app/
│   ├── api/contact/route.ts     # Contact form handler
│   ├── globals.css              # Design tokens, aurora, grain, glass, marquee, glitch
│   ├── layout.tsx               # Fonts, metadata, background layers, Lenis, cursor
│   └── page.tsx                 # Section composition
├── components/
│   ├── sections/                # hero, about, experience, projects, skills, education, contact
│   ├── fx/                      # cursor, magnetic, scramble-text, reveal, smooth-scroll
│   ├── hero-scene.tsx           # react-three-fiber scene (client-only chunk)
│   ├── hero-scene-loader.tsx    # Lazy-loads the scene; static fallback orb
│   ├── site-header.tsx          # Morphing sticky nav + mobile menu
│   └── …
└── lib/
    ├── data.ts                  # All site content (from the CV)
    └── utils.ts
```

## Deploy

Merge to `main`. Vercel builds and deploys production automatically; every PR gets a preview deployment.

## License

MIT
