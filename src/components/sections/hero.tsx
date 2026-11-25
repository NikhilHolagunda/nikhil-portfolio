"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight, Download, Mail } from "lucide-react";

import { profile, experience } from "@/lib/data";
import { ScrambleText } from "@/components/fx/scramble-text";
import { Magnetic } from "@/components/fx/magnetic";
import { HeroSceneLoader } from "@/components/hero-scene-loader";
import { GitHubIcon, LinkedInIcon } from "@/components/brand-icons";

const EASE = [0.22, 1, 0.36, 1] as const;
const current = experience.find((e) => e.current);

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // Parallax: name drifts up and fades as you scroll away.
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-30%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, reduce ? 1 : 0]);

  function onMove(e: React.PointerEvent<HTMLElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    e.currentTarget.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
  }

  const fadeUp = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, ease: EASE, delay },
        };

  return (
    <section
      ref={ref}
      id="top"
      aria-label="Introduction"
      onPointerMove={onMove}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden"
      style={{ ["--mx" as string]: "70%", ["--my" as string]: "40%" }}
    >
      {/* Mouse-reactive gradient + grid floor */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 transition-[background] duration-300"
        style={{
          background:
            "radial-gradient(600px circle at var(--mx) var(--my), rgb(94 242 255 / 0.10), transparent 60%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-20 h-[45%] opacity-40 [mask-image:linear-gradient(to_top,#000,transparent)]"
        style={{
          backgroundImage:
            "linear-gradient(rgb(94 242 255 / 0.18) 1px, transparent 1px), linear-gradient(90deg, rgb(94 242 255 / 0.18) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          transform: "perspective(600px) rotateX(60deg)",
          transformOrigin: "bottom",
        }}
      />
      <HeroSceneLoader />

      <motion.div
        style={{ y, opacity: fade }}
        className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 pb-28 pt-32 sm:px-8"
      >
        <motion.p
          {...fadeUp(0.1)}
          className="mb-8 inline-flex w-fit items-center gap-3 rounded-full border border-line bg-glass px-4 py-2 font-mono text-[11px] uppercase tracking-[0.25em] text-muted backdrop-blur-md sm:text-xs"
        >
          <span className="pulse-dot size-2 rounded-full bg-cyan" aria-hidden="true" />
          {profile.role} · {profile.location}
        </motion.p>

        <h1 className="font-display font-bold uppercase leading-[0.82] tracking-[-0.055em]">
          <span
            className="glitch block whitespace-nowrap text-[clamp(3.2rem,13.8vw,12.5rem)]"
            data-text="Nikhil"
          >
            <ScrambleText text="Nikhil" duration={900} delay={150} />
          </span>
          <span className="block whitespace-nowrap text-[clamp(3.2rem,13.8vw,12.5rem)]">
            <span className="text-outline">
              <ScrambleText text="Holagunda" duration={1300} delay={300} />
            </span>
            <span className="text-cyan" aria-hidden="true">.</span>
          </span>
        </h1>

        <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-[minmax(0,34rem)_1fr] md:items-end">
          <motion.p {...fadeUp(0.5)} className="max-w-xl text-lg leading-relaxed text-muted md:text-xl">
            {profile.tagline}
          </motion.p>

          <motion.div {...fadeUp(0.65)} className="flex flex-wrap items-center gap-4 md:justify-end">
            <Magnetic>
              <a
                href={profile.resume}
                download
                className="group relative inline-flex h-14 items-center gap-3 overflow-hidden rounded-full bg-cyan px-7 font-mono text-sm font-semibold uppercase tracking-wider text-[#05060a] shadow-[0_0_40px_-8px_var(--cyan)] transition-shadow hover:shadow-[0_0_60px_-4px_var(--cyan)]"
              >
                <Download className="size-4" aria-hidden="true" />
                Download resume
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                className="group inline-flex h-14 items-center gap-3 rounded-full border border-line bg-glass px-7 font-mono text-sm font-semibold uppercase tracking-wider text-fg backdrop-blur-md transition-colors hover:border-cyan/60 hover:text-cyan"
              >
                Contact me
                <ArrowDownRight
                  className="size-4 transition-transform duration-300 group-hover:rotate-[-45deg]"
                  aria-hidden="true"
                />
              </a>
            </Magnetic>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom rail */}
      <motion.div
        {...fadeUp(0.9)}
        className="relative mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 border-t border-line px-5 py-5 font-mono text-xs uppercase tracking-[0.2em] text-dim sm:px-8"
      >
        {current && (
          <p>
            <span className="text-muted">Now</span> — {current.company}
            {current.client ? ` · Client: ${current.client}` : ""}
          </p>
        )}
        <div className="flex items-center gap-2">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile (opens in a new tab)"
            className="grid size-11 place-items-center rounded-full border border-line text-muted transition-colors hover:border-cyan/60 hover:text-cyan"
          >
            <GitHubIcon className="size-4" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile (opens in a new tab)"
            className="grid size-11 place-items-center rounded-full border border-line text-muted transition-colors hover:border-cyan/60 hover:text-cyan"
          >
            <LinkedInIcon className="size-4" />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label={`Email ${profile.email}`}
            className="grid size-11 place-items-center rounded-full border border-line text-muted transition-colors hover:border-cyan/60 hover:text-cyan"
          >
            <Mail className="size-4" aria-hidden="true" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
