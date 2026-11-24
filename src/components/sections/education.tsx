import { GraduationCap } from "lucide-react";

import { education } from "@/lib/data";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { Card } from "@/components/ui/card";

export function EducationSection() {
  return (
    <Section id="education" eyebrow="Education" title="Education">
      <ul className="grid gap-5 md:grid-cols-3">
        {education.map((e, i) => (
          <li key={e.school} className="flex">
            <Reveal delay={i * 0.06} className="flex w-full">
              <Card className="w-full transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                <span className="grid size-11 place-items-center rounded-xl bg-accent text-accent-foreground">
                  <GraduationCap className="size-5" aria-hidden />
                </span>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{e.period}</p>
                  <h3 className="mt-1.5 text-lg font-semibold leading-snug">{e.credential}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {e.school}
                    <br />
                    {e.location}
                  </p>
                </div>
              </Card>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
