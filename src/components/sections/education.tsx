import { GraduationCap } from "lucide-react";

import { education } from "@/lib/data";
import { Section } from "@/components/section";
import { Reveal } from "@/components/fx/reveal";

export function EducationSection() {
  return (
    <Section id="education" index="05" label="Education" title={<>Always <span className="text-neon">learning</span>.</>}>
      <ol className="grid gap-4 md:grid-cols-3 md:gap-5">
        {education.map((e, i) => (
          <li key={e.school}>
            <Reveal
              delay={i * 0.1}
              className="group glass relative flex h-full flex-col overflow-hidden rounded-[1.75rem] p-7"
            >
              <div
                aria-hidden="true"
                className="absolute -right-16 -top-16 size-48 rounded-full bg-violet/25 blur-3xl transition-colors duration-700 group-hover:bg-cyan/25"
              />
              <div className="flex items-center justify-between">
                <GraduationCap className="size-6 text-cyan" aria-hidden="true" />
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-dim">{e.period}</span>
              </div>
              <h3 className="mt-10 font-display text-2xl font-bold leading-tight tracking-tight">{e.credential}</h3>
              <p className="mt-auto pt-6 text-muted">
                {e.school}
                <span className="block font-mono text-xs uppercase tracking-[0.2em] text-dim">{e.location}</span>
              </p>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
