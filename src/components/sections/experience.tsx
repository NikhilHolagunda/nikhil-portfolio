import { experience } from "@/lib/data";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export function ExperienceSection() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Where I've worked"
      intro="Digital banking, payments, and enterprise cloud platforms across Canada and India."
    >
      <ol className="relative space-y-6 md:space-y-8">
        {/* timeline rail */}
        <span
          aria-hidden
          className="absolute bottom-2 left-[11px] top-2 w-px bg-gradient-to-b from-primary/60 via-border to-transparent md:left-[171px]"
        />
        {experience.map((job, i) => (
          <li
            key={`${job.company}-${job.period}`}
            className="relative grid gap-3 pl-10 md:grid-cols-[140px_1fr] md:gap-16 md:pl-0"
          >
            {/* timeline dot */}
            <span
              aria-hidden
              className="absolute left-1 top-7 grid size-[15px] place-items-center rounded-full border-2 border-primary bg-background md:left-[164px]"
            >
              {job.current && <span className="size-1.5 rounded-full bg-primary" />}
            </span>

            <Reveal delay={0.05} className="md:pt-6 md:text-right">
              <p className="text-sm font-medium text-muted-foreground">{job.period}</p>
              <p className="text-sm text-muted-foreground">{job.location}</p>
            </Reveal>

            <Reveal delay={0.05 + i * 0.03}>
              <Card className="transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-semibold sm:text-xl">{job.role}</h3>
                    <p className="mt-0.5 font-medium text-brand">
                      {job.company}
                      {job.client && (
                        <span className="font-normal text-muted-foreground">
                          {" "}
                          · Client: {job.client}
                        </span>
                      )}
                    </p>
                  </div>
                  {job.current && <Badge variant="accent">Current</Badge>}
                </div>
                <ul className="space-y-2.5 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                  {job.highlights.map((h) => (
                    <li key={h} className="flex gap-3">
                      <span
                        aria-hidden
                        className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-primary/70"
                      />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
