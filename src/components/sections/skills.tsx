import {
  Activity,
  BrainCircuit,
  Cloud,
  CodeXml,
  Database,
  FlaskConical,
  MonitorSmartphone,
  Server,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

import { skills } from "@/lib/data";
import { Section } from "@/components/section";
import { Reveal } from "@/components/fx/reveal";

const ICONS: LucideIcon[] = [
  CodeXml,
  MonitorSmartphone,
  Server,
  Database,
  Cloud,
  Activity,
  ShieldCheck,
  FlaskConical,
  BrainCircuit,
];

type Chip = { label: string; Icon: LucideIcon };

const all: Chip[] = skills.flatMap((g, gi) => g.items.map((label) => ({ label, Icon: ICONS[gi] ?? CodeXml })));
const half = Math.ceil(all.length / 2);
const rows = [all.slice(0, half), all.slice(half)];

function Row({ chips, reverse, speed }: { chips: Chip[]; reverse?: boolean; speed: string }) {
  const track = (hidden?: boolean) => (
    <ul className="marquee-track" aria-hidden={hidden || undefined}>
      {chips.map(({ label, Icon }) => (
        <li
          key={label}
          className="glass flex shrink-0 items-center gap-3 rounded-2xl px-5 py-3.5 font-mono text-sm text-fg/90"
        >
          <Icon className="size-4 text-cyan" aria-hidden="true" />
          {label}
        </li>
      ))}
    </ul>
  );
  return (
    <div
      className="marquee"
      data-reverse={reverse || undefined}
      style={{ ["--marquee-speed" as string]: speed }}
      aria-hidden="true"
    >
      {track()}
      {track(true)}
    </div>
  );
}

export function SkillsSection() {
  return (
    <Section id="skills" index="04" label="Skills" title={<>The <span className="text-neon">toolkit</span>.</>}>
      {/* Decorative marquee — the accessible, grouped list follows below */}
      <div className="-mx-5 space-y-4 sm:-mx-8">
        <Row chips={rows[0]} speed="70s" />
        <Row chips={rows[1]} reverse speed="80s" />
      </div>

      <div className="mt-16 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((g, gi) => {
          const Icon = ICONS[gi] ?? CodeXml;
          return (
            <Reveal key={g.group} delay={(gi % 3) * 0.06} className="border-t border-line pt-5">
              <h3 className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-cyan">
                <Icon className="size-4" aria-hidden="true" />
                {g.group}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-2 text-[15px] text-muted">
                {g.items.map((s, si) => (
                  <li key={s}>
                    {s}
                    {si < g.items.length - 1 && <span aria-hidden="true" className="ml-3 text-dim">/</span>}
                  </li>
                ))}
              </ul>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
