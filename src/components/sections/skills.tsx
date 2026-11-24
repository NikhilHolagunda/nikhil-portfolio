import { skills } from "@/lib/data";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export function SkillsSection() {
  return (
    <Section id="skills" eyebrow="Skills" title="Toolkit">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((s, i) => (
          <Reveal key={s.group} delay={(i % 3) * 0.05} className="flex">
            <Card className="w-full gap-4 transition-colors duration-300 hover:border-primary/30">
              <h3 className="text-base font-semibold">{s.group}</h3>
              <ul className="flex flex-wrap gap-1.5" aria-label={s.group}>
                {s.items.map((item) => (
                  <li key={item}>
                    <Badge variant="secondary" className="px-3 py-1 text-[13px]">
                      {item}
                    </Badge>
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
