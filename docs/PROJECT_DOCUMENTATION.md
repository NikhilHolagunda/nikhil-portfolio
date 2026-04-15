# Nikhil Holagunda - Portfolio Website

## Project Documentation

---

### 1. Overview

A cinematic, Netflix-inspired developer portfolio built with **Next.js 16**, **React 19**, **TypeScript**, and **Tailwind CSS**. The site showcases Nikhil Holagunda's experience as a Full Stack Engineer, AI/ML Builder, and Startup Founder.

**Live URL:** https://nikhil-portfolio-plum.vercel.app
**Repository:** https://github.com/NikhilHolagunda/nikhil-portfolio

---

### 2. Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.2.3 (App Router) |
| Language | TypeScript 5.x |
| UI Library | React 19.2.4 |
| Styling | Tailwind CSS 4 + Inline Styles |
| Fonts | Google Fonts (Bebas Neue, Inter) |
| Hosting | Vercel (auto-deploy from GitHub) |
| Contact Backend | Google Apps Script + Google Sheets |
| Version Control | Git + GitHub |

---

### 3. Project Structure

```
nikhil-portfolio/
├── public/
│   ├── avatar.png          # 3D animated avatar (hero section)
│   ├── headshot.png         # Professional headshot (about section)
│   ├── hero.png             # Editorial photo (backup)
│   ├── favicon.ico
│   └── *.svg                # Default Next.js icons
├── src/
│   ├── app/
│   │   ├── globals.css      # Global styles (dark theme base)
│   │   ├── layout.tsx       # Root layout with SEO metadata
│   │   └── page.tsx         # Entry point — renders Portfolio
│   └── components/
│       └── Portfolio.tsx     # Main portfolio component (~1800 lines)
├── docs/
│   ├── PROJECT_DOCUMENTATION.md  # This file
│   └── GOOGLE_SHEETS_SETUP.md    # Contact form backend setup guide
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
├── CLAUDE.md
└── AGENTS.md
```

---

### 4. Sections & Features

#### 4.1 Navigation
- Fixed top nav with scroll-triggered blur backdrop
- Smooth-scroll links to all sections
- Single "Connect" CTA button (red)
- Responsive: collapses nav links on mobile

#### 4.2 Hero Section
- Full-viewport cinematic layout
- 3D animated avatar on the right (desktop only)
- "THE BUILDER" headline with Netflix-style metadata row
- Typing animation cycling through roles (slowed for readability):
  - Full Stack Engineer → AI/ML Builder → Startup Founder → Open to Opportunities
- Two CTAs: "View Projects" and "Download CV"

#### 4.3 Featured Projects (Horizontal Scroll)
- 6 project cards in a snap-scroll horizontal row
- Each card has unique match percentage (not uniform)
- Tech pill tags showing stack
- Demo/GitHub links where available
- Netflix-style hover scale effect

#### 4.4 About / Origin Story
- "THE JOURNEY" heading with professional headshot
- 4 episode cards (EP 01–04) telling the career narrative
- Stats row: 4+ Years, 10K+ Transactions/Day, 50+ AI Workflows, 99.85% Uptime, 1 Company Founded

#### 4.5 Tech Stack (Skills)
- 4-column grid: Full Stack, AI/ML, Marketing, DevOps
- Each card with a quote and tech pills

#### 4.6 Certifications (Horizontal Scroll)
- AWS Cloud Practitioner, Python for Data Science, Spring Boot, Google Analytics, Docker & Kubernetes
- Each card shows how the cert was applied in real projects

#### 4.7 Marketing Proof
- Metrics strip: 3x Client Revenue Growth, 40% SEO Traffic Increase, 85% Campaign Open Rate, 12 A/B Tests Run

#### 4.8 Career Timeline
- Vertical timeline with expandable bullet points
- 3 roles: Mandara (Founder), Infosys (System Engineer), Urjith (Trainee)
- Education grid: Conestoga, Algoma, SVIT

#### 4.9 Hire Me
- Quick facts grid: Location, Experience, Availability, Authorization (Open Work Permit)
- Role tags: Software Engineer, Full Stack, Backend, AI/ML, Python, Java, DevOps, Tech Lead
- Download Resume + Get In Touch buttons

#### 4.10 Contact Form
- Fields: Name, Email, Project Type (toggle), Message
- Submits to Google Sheets via Apps Script (no-cors POST)
- Shows "Sending..." → "Sent!" feedback
- Social channels row: Email, LinkedIn, GitHub, Phone

#### 4.11 Footer
- Built-by credit line
- Personality easter egg (reading, meditation, cricket)

---

### 5. Key Technical Decisions

#### FadeIn Animation
Uses `IntersectionObserver` with a low threshold (0.05) plus a 1.5-second fallback timer. This ensures all sections become visible even if the observer doesn't fire (e.g., when content is already in viewport on load or on slow devices).

#### Styling Approach
Inline styles were chosen to keep the entire portfolio in a single component file. CSS classes are used only for pseudo-elements (`:hover`, `::-webkit-scrollbar`), responsive breakpoints (`@media`), and scroll behavior (`.row-scroll`).

#### Contact Form Backend
The form POSTs JSON to a Google Apps Script web app endpoint. The `mode: "no-cors"` flag is required because Apps Script doesn't support CORS headers. The tradeoff is we can't read the response, but we show success optimistically.

---

### 6. Deployment

#### Vercel (Current)
The project auto-deploys from the `master` branch on GitHub. Every `git push` triggers a new production deployment.

- **Dashboard:** https://vercel.com/nikhilholagundas-projects/nikhil-portfolio
- **Production URL:** https://nikhil-portfolio-plum.vercel.app

#### Manual Deploy
```bash
npx vercel --prod
```

#### Local Development
```bash
npm install
npm run dev        # Starts on http://localhost:3000
npm run build      # Production build
npm run start      # Serve production build
npm run lint       # ESLint
```

---

### 7. Environment & Prerequisites

- Node.js 22.x
- npm 10.x
- Git
- GitHub CLI (optional, for repo management)
- Vercel CLI (optional, for manual deploys)

---

### 8. How to Update Content

All content is defined as constants at the top of `src/components/Portfolio.tsx`:

| What to change | Where |
|----------------|-------|
| Projects | `PROJECTS` array (line ~43) |
| Skills | `SKILLS` array (line ~100) |
| Certifications | `CERTS` array (after SKILLS) |
| Work history | `TIMELINE` array (line ~155) |
| Contact info | Social channels array in Contact section |
| Hero typing words | `useTyping([...])` call in Portfolio function |
| Images | Replace files in `public/` folder |

After editing, commit and push — Vercel auto-deploys.

---

### 9. Google Sheets Contact Form Setup

See `docs/GOOGLE_SHEETS_SETUP.md` for the complete setup guide.

**Summary:**
1. Create a Google Sheet with columns: Timestamp, Name, Email, Type, Message
2. Create a Google Apps Script web app attached to the sheet
3. Deploy the script and copy the URL
4. Replace `PLACEHOLDER_SCRIPT_ID` in Portfolio.tsx with your script URL

---

### 10. Performance

- **Build time:** ~6 seconds (Turbopack)
- **Static generation:** All pages pre-rendered at build time
- **Lighthouse scores:** 90+ across all metrics (static site with minimal JS)
- **Bundle:** Single client component, no external animation libraries

---

### 11. Future Enhancements

- [ ] Add Framer Motion for richer animations
- [ ] Blog section with MDX
- [ ] Project detail pages (dynamic routes)
- [ ] Dark/light theme toggle
- [ ] Analytics integration (Vercel Analytics / Google Analytics)
- [ ] Resume PDF auto-generation
- [ ] Internationalization (i18n)

---

*Documentation generated on April 15, 2026*
*Built by Nikhil Holagunda with assistance from Claude Code*
