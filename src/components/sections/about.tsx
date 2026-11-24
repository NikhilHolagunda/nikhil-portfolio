import { Briefcase, Mail, MapPin, Phone } from "lucide-react";

import { experience, profile } from "@/lib/data";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function About() {
  const current = experience.find((e) => e.current);
  const facts = [
    current && {
      Icon: Briefcase,
      label: "Currently",
      value: `${current.role} at ${current.company}${current.client ? ` (Client: ${current.client})` : ""}`,
    },
    { Icon: MapPin, label: "Based in", value: profile.location },
    { Icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { Icon: Phone, label: "Phone", value: profile.phone, href: profile.phoneHref },
  ].filter(Boolean) as {
    Icon: typeof Mail;
    label: string;
    value: string;
    href?: string;
  }[];

  return (
    <Section id="about" eyebrow="About" title="Building reliable platforms, end to end.">
      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
        <Reveal className="space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {profile.summary.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </Reveal>

        <Reveal delay={0.1}>
          <Card className="gap-0 p-2">
            <dl>
              {facts.map(({ Icon, label, value, href }, i) => (
                <div key={label}>
                  {i > 0 && <Separator className="mx-4 data-[orientation=horizontal]:w-auto" />}
                  <div className="flex items-start gap-4 rounded-xl p-4">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        {label}
                      </dt>
                      <dd className="mt-0.5 break-words font-medium">
                        {href ? (
                          <a
                            href={href}
                            className="rounded underline-offset-4 hover:text-brand hover:underline focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/60"
                          >
                            {value}
                          </a>
                        ) : (
                          value
                        )}
                      </dd>
                    </div>
                  </div>
                </div>
              ))}
            </dl>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}
