# Nikhil Portfolio

A Netflix-inspired personal portfolio built with **Next.js 16**, **React 19**, **TypeScript**, and **Tailwind CSS v4**. Deployed on Vercel.

🌐 **Live:** https://nikhil-portfolio-plum.vercel.app

---

## What's inside

- **Hero + About** sections with a 3D avatar and professional photos
- **Skills grid** covering Data Engineering, Full-Stack, ML, and DevOps
- **Projects showcase** with links to every repo and live demo
- **Contact form** wired to Google Sheets via a Next.js API route
- **Responsive** down to mobile (360px), with dark mode by default

## Tech stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| UI | React 19, Tailwind CSS v4 |
| Contact backend | Next.js API route → Google Sheets API (OAuth refresh-token flow) |
| Hosting | Vercel |

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

The contact form writes to a Google Sheet. Create a `.env.local` with:

```
GOOGLE_CLIENT_ID=your-oauth-client-id
GOOGLE_CLIENT_SECRET=your-oauth-client-secret
GOOGLE_REFRESH_TOKEN=your-refresh-token
```

Without these, `/api/contact` will 500 but the rest of the site renders fine.

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
│   ├── api/contact/route.ts    # Google Sheets integration
│   ├── layout.tsx
│   └── page.tsx
└── components/
    └── Portfolio.tsx            # Main portfolio component (single-page)
public/                          # Images, avatars, hero assets
```

## Deploy

Push to `master` — Vercel picks up the change and redeploys automatically.

## License

MIT
