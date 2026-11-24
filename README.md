# Nikhil Portfolio

A minimal, single-page developer portfolio built with **Next.js 16**, **React 19**, **TypeScript**, **Tailwind CSS v4**, and **shadcn/ui**. Deployed on Vercel.

🌐 **Live:** https://nikhil-portfolio-plum.vercel.app

---

## What's inside

- **Sections:** Hero · About · Experience timeline · Projects · Skills · Education · Contact
- **Dark mode by default** with a light/dark toggle (`next-themes`)
- **Subtle entrance animations** (`framer-motion`), disabled for `prefers-reduced-motion`
- **Contact form** posting to a Next.js API route (email via Resend, best-effort Google Sheets log)
- **Responsive and accessible:** mobile-first layout, semantic landmarks, skip link, visible focus rings, WCAG AA colour contrast

## Tech stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| UI | React 19, Tailwind CSS v4, shadcn/ui (Radix), lucide-react |
| Motion / theming | framer-motion, next-themes |
| Fonts | Inter (body) + Space Grotesk (headings) via `next/font` |
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
│   ├── globals.css              # Theme tokens (light + dark)
│   ├── layout.tsx               # Fonts, metadata, ThemeProvider
│   └── page.tsx                 # Section composition
├── components/
│   ├── sections/                # hero, about, experience, projects, skills, education, contact
│   ├── ui/                      # shadcn/ui primitives
│   ├── site-header.tsx          # Sticky nav + mobile menu
│   └── …
└── lib/
    ├── data.ts                  # All site content (from the CV)
    └── utils.ts
```

## Deploy

Merge to `main`. Vercel builds and deploys production automatically; every PR gets a preview deployment.

## License

MIT
