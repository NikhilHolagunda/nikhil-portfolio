import Image from "next/image";
import { ArrowRight, Download, Mail, MapPin } from "lucide-react";

import { profile } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/reveal";
import { GitHubIcon, LinkedInIcon } from "@/components/brand-icons";

const socials = [
  { label: "GitHub profile", href: profile.github, Icon: GitHubIcon },
  { label: "LinkedIn profile", href: profile.linkedin, Icon: LinkedInIcon },
  { label: `Email ${profile.email}`, href: `mailto:${profile.email}`, Icon: Mail },
];

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden"
    >
      {/* soft accent glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 -z-10 flex justify-center blur-3xl"
      >
        <div className="aspect-[1.6] w-[48rem] max-w-[140vw] rounded-full bg-gradient-to-tr from-primary/25 via-primary/10 to-transparent opacity-70 dark:opacity-60" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-16 sm:px-8 md:grid-cols-[1fr_auto] md:pb-28 md:pt-28">
        <div>
          <Reveal>
            <Badge variant="accent" className="mb-6 gap-1.5 px-3 py-1 text-sm">
              <MapPin className="size-3.5" aria-hidden />
              {profile.location}
            </Badge>
          </Reveal>

          <Reveal delay={0.05}>
            <h1
              id="hero-heading"
              className="text-4xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl"
            >
              {profile.name}
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-4 font-heading text-xl font-medium text-brand sm:text-2xl">
              {profile.role}
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {profile.tagline}
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <a href={profile.resume} download="Nikhil-Holagunda-Resume.pdf">
                  <Download aria-hidden />
                  Download resume
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="#contact">
                  Contact me
                  <ArrowRight aria-hidden />
                </a>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <ul className="mt-8 flex items-center gap-2" aria-label="Social links">
              {socials.map(({ label, href, Icon }) => (
                <li key={href}>
                  <Button asChild variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                    <a
                      href={href}
                      aria-label={label}
                      title={label}
                      {...(href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      <Icon className="size-5" />
                    </a>
                  </Button>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="order-first mx-auto md:order-none">
          <div className="relative size-40 sm:size-52 md:size-72">
            <div
              aria-hidden
              className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-primary/40 to-primary/0 blur-2xl"
            />
            <div className="relative size-full overflow-hidden rounded-[2rem] border bg-card shadow-xl shadow-black/10 ring-1 ring-white/5">
              <Image
                src={profile.headshot}
                alt={`Portrait of ${profile.name}`}
                fill
                priority
                sizes="(min-width: 768px) 288px, (min-width: 640px) 208px, 160px"
                className="object-cover object-top"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
