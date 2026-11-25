"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion, useScroll, useSpring } from "framer-motion";

import { experience, type Experience } from "@/lib/data";
import { Section } from "@/components/section";

const EASE = [0.22, 1, 0.36, 1] as const;

function Item({ job, i }: { job: Experience; i: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduce = useReducedMotion();
  const on = inView || reduce;

  return (
    <li ref={ref} className="relative grid gap-6 pl-10 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-12 md:pl-16">
      {/* Node on the rail */}
      <span
        aria-hidden="true"
        className={`absolute left-[7px] top-2 size-[18px] rounded-full border-2 transition-all duration-700 md:left-[15px] ${
          on ? "border-cyan bg-cyan/20 shadow-[0_0_24px_4px_rgb(94_242_255/0.45)]" : "border-line bg-bg"
        }`}
      />

      <motion.div
        initial={reduce ? false : { opacity: 0, x: -20 }}
        animate={on ? { opacity: 1, x: 0 } : undefined}
        transition={{ duration: 0.8, ease: EASE }}
        className="md:pt-1"
      >
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan">{job.period}</p>
        <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-dim">{job.location}</p>
        <p aria-hidden="true" className="text-outline mt-4 hidden font-display text-7xl font-bold md:block">
          {String(i + 1).padStart(2, "0")}
        </p>
      </motion.div>

      <motion.article
        initial={reduce ? false : { opacity: 0, y: 40, clipPath: "inset(0 0 100% 0 round 1.5rem)" }}
        animate={on ? { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0 round 1.5rem)" } : undefined}
        transition={{ duration: 1, ease: EASE, delay: 0.1 }}
        className="glass spotlight rounded-3xl p-6 md:p-9"
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          e.currentTarget.style.setProperty("--sx", `${e.clientX - r.left}px`);
          e.currentTarget.style.setProperty("--sy", `${e.clientY - r.top}px`);
        }}
      >
        <header className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-3xl font-bold tracking-tight md:text-4xl">{job.company}</h3>
            <p className="mt-1 text-muted">
              {job.role}
              {job.client && <span className="text-fg"> · Client: {job.client}</span>}
            </p>
          </div>
          {job.current && (
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan/40 bg-cyan/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-cyan">
              <span className="pulse-dot size-1.5 rounded-full bg-cyan" aria-hidden="true" />
              Current
            </span>
          )}
        </header>
        <ul className="mt-6 space-y-3">
          {job.highlights.map((h) => (
            <li key={h} className="flex gap-3 text-[15px] leading-relaxed text-muted">
              <span aria-hidden="true" className="mt-[0.6em] h-px w-3 shrink-0 bg-cyan" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </motion.article>
    </li>
  );
}

export function ExperienceSection() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <Section id="experience" index="02" label="Experience" title={<>Where I&apos;ve <span className="text-neon">shipped</span>.</>}>
      <ol ref={ref} className="relative space-y-16 md:space-y-24">
        {/* Rail + scroll-driven neon fill */}
        <span aria-hidden="true" className="absolute bottom-0 left-4 top-2 w-px bg-line md:left-6" />
        <motion.span
          aria-hidden="true"
          style={{ scaleY }}
          className="absolute bottom-0 left-4 top-2 w-px origin-top bg-gradient-to-b from-cyan via-violet to-magenta shadow-[0_0_12px_var(--cyan)] md:left-6"
        />
        {experience.map((job, i) => (
          <Item key={job.company} job={job} i={i} />
        ))}
      </ol>
    </Section>
  );
}
