import * as React from "react";

import { cn } from "@/lib/utils";
import { Reveal } from "@/components/reveal";

export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className,
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const headingId = `${id}-heading`;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn("mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-24", className)}
    >
      <Reveal className="mb-10 max-w-2xl md:mb-14">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-brand">
          {eyebrow}
        </p>
        <h2
          id={headingId}
          className="text-3xl font-bold leading-tight sm:text-4xl"
        >
          {title}
        </h2>
        {intro && (
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {intro}
          </p>
        )}
      </Reveal>
      {children}
    </section>
  );
}
