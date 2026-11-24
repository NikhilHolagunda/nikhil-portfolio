import { ArrowUpRight, Download, Mail, MapPin, Phone } from "lucide-react";

import { profile } from "@/lib/data";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ContactForm } from "@/components/contact-form";
import { GitHubIcon, LinkedInIcon } from "@/components/brand-icons";

const channels = [
  { Icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { Icon: Phone, label: "Phone", value: profile.phone, href: profile.phoneHref },
  { Icon: LinkedInIcon, label: "LinkedIn", value: "linkedin.com/in/nikhilholagunda", href: profile.linkedin, external: true },
  { Icon: GitHubIcon, label: "GitHub", value: "github.com/NikhilHolagunda", href: profile.github, external: true },
  { Icon: MapPin, label: "Location", value: profile.location },
];

export function ContactSection() {
  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's talk"
      intro="Reach out by email, phone, or the form. I'll get back to you as soon as I can."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-12">
        <Reveal className="space-y-3">
          <ul className="space-y-3">
            {channels.map(({ Icon, label, value, href, external }) => {
              const inner = (
                <>
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {label}
                    </span>
                    <span className="block break-words font-medium">{value}</span>
                  </span>
                  {href && (
                    <ArrowUpRight
                      className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand"
                      aria-hidden
                    />
                  )}
                </>
              );
              const cls =
                "group flex items-center gap-4 rounded-2xl border bg-card p-4 shadow-sm shadow-black/5 transition-all";
              return (
                <li key={label}>
                  {href ? (
                    <a
                      href={href}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className={`${cls} hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md active:scale-[0.99] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/60`}
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className={cls}>{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>
          <Button asChild variant="outline" size="lg" className="mt-2 w-full sm:w-auto">
            <a href={profile.resume} download="Nikhil-Holagunda-Resume.pdf">
              <Download aria-hidden />
              Download resume (PDF)
            </a>
          </Button>
        </Reveal>

        <Reveal delay={0.1}>
          <Card className="p-6 sm:p-8">
            <h3 className="text-xl font-semibold">Send a message</h3>
            <ContactForm />
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}
