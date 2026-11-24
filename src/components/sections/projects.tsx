import { ArrowUpRight } from "lucide-react";

import { projects } from "@/lib/data";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ProjectsSection() {
  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Selected work"
      intro="Side projects spanning machine learning, marketplaces, and event-driven systems."
    >
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <li key={p.title} className="flex">
            <Reveal delay={(i % 3) * 0.06} className="flex w-full">
              <Card className="group w-full transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 active:translate-y-0">
                <CardHeader>
                  <div className="flex items-start justify-between gap-3">
                    <CardTitle className="text-lg">{p.title}</CardTitle>
                    {p.status && (
                      <Badge variant="outline" className="border-amber-500/40 text-amber-700 dark:text-amber-300">
                        {p.status}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
                  {p.description.map((d) => (
                    <p key={d}>{d}</p>
                  ))}
                </CardContent>
                <CardContent>
                  <ul className="flex flex-wrap gap-1.5" aria-label={`${p.title} tech stack`}>
                    {p.tech.map((t) => (
                      <li key={t}>
                        <Badge variant="secondary">{t}</Badge>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                {p.links && (
                  <CardFooter className="pt-1">
                    {p.links.map((l) => (
                      <Button key={l.href} asChild variant="outline" size="sm">
                        <a
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${p.title}: ${l.label} (opens in a new tab)`}
                        >
                          {l.label}
                          <ArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                        </a>
                      </Button>
                    ))}
                  </CardFooter>
                )}
              </Card>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
