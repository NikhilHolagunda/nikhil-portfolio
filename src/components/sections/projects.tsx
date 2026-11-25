"use client";

import { ArrowUpRight } from "lucide-react";

import { projects, type Project } from "@/lib/data";
import { Section } from "@/components/section";
import { Reveal } from "@/components/fx/reveal";

// Bento layout: asymmetric spans per card (lg = 6-col grid).
const LAYOUT = [
  "md:col-span-2 lg:col-span-4 lg:row-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-3",
  "lg:col-span-3",
];

/** Abstract generative artwork per card — no fake screenshots. */
function Art({ variant }: { variant: number }) {
  const common = "absolute inset-0 transition-transform duration-[1200ms] ease-out group-hover:scale-110 group-focus-within:scale-110";
  switch (variant % 5) {
    case 0:
      return (
        <svg className={common} viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <radialGradient id="g0" cx="70%" cy="30%" r="70%">
              <stop offset="0" stopColor="#5ef2ff" stopOpacity=".55" />
              <stop offset=".5" stopColor="#8b5cf6" stopOpacity=".25" />
              <stop offset="1" stopColor="#05060a" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="400" height="300" fill="url(#g0)" />
          {Array.from({ length: 14 }, (_, i) => (
            <circle key={i} cx="290" cy="80" r={18 + i * 22} fill="none" stroke="#5ef2ff" strokeOpacity={0.5 - i * 0.03} strokeWidth=".7" />
          ))}
        </svg>
      );
    case 1:
      return (
        <div
          className={common}
          aria-hidden="true"
          style={{
            background:
              "conic-gradient(from 210deg at 75% 20%, #8b5cf6, #f472b6, #5ef2ff, #8b5cf6)",
            opacity: 0.35,
            maskImage: "radial-gradient(circle at 75% 20%, #000, transparent 70%)",
            WebkitMaskImage: "radial-gradient(circle at 75% 20%, #000, transparent 70%)",
          }}
        />
      );
    case 2:
      return (
        <div
          className={common}
          aria-hidden="true"
          style={{
            backgroundImage: "radial-gradient(rgb(94 242 255 / 0.55) 1px, transparent 1.5px)",
            backgroundSize: "16px 16px",
            maskImage: "radial-gradient(ellipse at 80% 10%, #000, transparent 65%)",
            WebkitMaskImage: "radial-gradient(ellipse at 80% 10%, #000, transparent 65%)",
          }}
        />
      );
    case 3:
      return (
        <svg className={common} viewBox="0 0 600 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          {Array.from({ length: 18 }, (_, i) => (
            <path
              key={i}
              d={`M0 ${60 + i * 9} C 150 ${10 + i * 12}, 300 ${140 + i * 4}, 600 ${30 + i * 10}`}
              fill="none"
              stroke={i % 3 === 0 ? "#f472b6" : "#8b5cf6"}
              strokeOpacity={0.12 + (i % 4) * 0.06}
              strokeWidth="1"
            />
          ))}
        </svg>
      );
    default:
      return (
        <div
          className={common}
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(rgb(139 92 246 / 0.35) 1px, transparent 1px), linear-gradient(90deg, rgb(139 92 246 / 0.35) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage: "linear-gradient(135deg, transparent 30%, #000 100%)",
            WebkitMaskImage: "linear-gradient(135deg, transparent 30%, #000 100%)",
          }}
        />
      );
  }
}

function Card({ p, i }: { p: Project; i: number }) {
  const big = i === 0;
  return (
    <Reveal
      delay={i * 0.08}
      className={`group glass spotlight relative flex min-h-[19rem] flex-col overflow-hidden rounded-[1.75rem] p-6 md:p-8 ${LAYOUT[i] ?? ""}`}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--sx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--sy", `${e.clientY - r.top}px`);
      }}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[inherit]">
        <Art variant={i} />
        {/* Colour-dodge sheen that blooms on hover */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-cyan/0 via-violet/0 to-magenta/0 opacity-0 mix-blend-color-dodge transition-opacity duration-700 group-hover:from-cyan/30 group-hover:via-violet/20 group-hover:to-magenta/30 group-hover:opacity-100"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-bg via-bg/70 to-transparent" />
      </div>

      <div className="flex items-start justify-between gap-4">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-dim">
          {String(i + 1).padStart(2, "0")}
        </span>
        {p.status ? (
          <span className="rounded-full border border-magenta/40 bg-magenta/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-magenta">
            {p.status}
          </span>
        ) : (
          <ArrowUpRight
            aria-hidden="true"
            className="size-6 text-dim transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-cyan"
          />
        )}
      </div>

      <div className="mt-auto pt-16">
        <h3
          className={`font-display font-bold leading-[0.95] tracking-[-0.03em] ${
            big ? "text-4xl md:text-6xl" : "text-2xl md:text-3xl"
          }`}
        >
          {p.title}
        </h3>
        <p className={`mt-4 text-muted ${big ? "max-w-xl text-lg" : "text-[15px]"} leading-relaxed`}>
          {p.description[0]}
        </p>
        {/* Second line slides open on hover / focus for fine pointers; always visible on touch */}
        <div className="grid transition-[grid-template-rows] duration-500 [@media(hover:hover)]:grid-rows-[0fr] [@media(hover:hover)]:group-hover:grid-rows-[1fr] [@media(hover:hover)]:group-focus-within:grid-rows-[1fr]">
          <p className="overflow-hidden text-[15px] leading-relaxed text-muted">
            <span className="block pt-3">{p.description[1]}</span>
          </p>
        </div>

        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tech stack">
          {p.tech.map((t) => (
            <li key={t} className="rounded-full border border-line bg-bg/40 px-3 py-1 font-mono text-[11px] text-fg/85">
              {t}
            </li>
          ))}
        </ul>

        {p.links && (
          <div className="mt-6 flex flex-wrap gap-3">
            {p.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${p.title}: ${l.label} (opens in a new tab)`}
                className="inline-flex h-11 items-center gap-2 rounded-full border border-cyan/40 px-5 font-mono text-xs font-semibold uppercase tracking-wider text-cyan transition-colors hover:bg-cyan hover:text-bg"
              >
                {l.label}
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </a>
            ))}
          </div>
        )}
      </div>
    </Reveal>
  );
}

export function ProjectsSection() {
  return (
    <Section id="projects" index="03" label="Projects" title={<>Selected <span className="text-neon">work</span>.</>}>
      <div className="grid auto-rows-auto gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-6">
        {projects.map((p, i) => (
          <Card key={p.title} p={p} i={i} />
        ))}
      </div>
    </Section>
  );
}
