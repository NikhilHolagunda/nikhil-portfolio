"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";

import { profile, experience, education } from "@/lib/data";
import { Section } from "@/components/section";
import { Reveal } from "@/components/fx/reveal";

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.4, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {children}&nbsp;
    </motion.span>
  );
}

/** Statement that lights up word by word as you scroll through it. */
function ScrollStatement({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = text.split(" ");

  if (reduce) {
    return <p className="font-display text-[clamp(1.6rem,3.6vw,3rem)] font-medium leading-[1.15] tracking-[-0.02em]">{text}</p>;
  }

  return (
    <p
      ref={ref}
      className="font-display text-[clamp(1.6rem,3.6vw,3rem)] font-medium leading-[1.15] tracking-[-0.02em]"
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
            {w}
          </Word>
        ))}
      </span>
    </p>
  );
}

export function About() {
  const current = experience.find((e) => e.current);
  const facts = [
    { k: "Based in", v: profile.location },
    { k: "Currently", v: current ? `${current.role} @ ${current.company}` : profile.role },
    { k: "Focus", v: "Digital banking & enterprise platforms" },
    { k: "Education", v: education[0].school },
  ];

  return (
    <Section id="about" index="01" label="About" title={<>Engineer of <span className="text-neon">reliable</span> systems.</>}>
      <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-20">
        <div className="space-y-10">
          <ScrollStatement text={profile.summary[0]} />
          <Reveal className="grid gap-6 text-lg leading-relaxed text-muted md:grid-cols-2">
            <p>{profile.summary[1]}</p>
            <p>{profile.summary[2]}</p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="space-y-6">
          <div className="group relative mx-auto aspect-[4/5] w-full max-w-xs overflow-hidden rounded-[2rem] border border-line lg:max-w-none">
            <Image
              src={profile.headshot}
              alt={`Portrait of ${profile.name}`}
              fill
              sizes="(min-width: 1024px) 22rem, 20rem"
              className="object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
            />
            {/* Holographic tint */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-tr from-violet/50 via-transparent to-cyan/40 mix-blend-color transition-opacity duration-700 group-hover:opacity-0"
            />
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bg/90 to-transparent" />
            <p className="absolute bottom-4 left-4 font-mono text-[11px] uppercase tracking-[0.25em] text-fg/80">
              {profile.initials} / {profile.location}
            </p>
          </div>

          <dl className="glass divide-y divide-line rounded-3xl px-5">
            {facts.map((f) => (
              <div key={f.k} className="flex items-baseline justify-between gap-4 py-4">
                <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-dim">{f.k}</dt>
                <dd className="text-right text-sm text-fg">{f.v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
