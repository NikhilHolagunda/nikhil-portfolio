"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Copy, Download, MapPin, Phone } from "lucide-react";

import { profile } from "@/lib/data";
import { Section } from "@/components/section";
import { Reveal } from "@/components/fx/reveal";
import { ScrambleText } from "@/components/fx/scramble-text";
import { Magnetic } from "@/components/fx/magnetic";
import { ContactForm } from "@/components/contact-form";
import { GitHubIcon, LinkedInIcon } from "@/components/brand-icons";

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — the mailto link still works */
    }
  }

  const channels = [
    { label: "Phone", value: profile.phone, href: profile.phoneHref, Icon: Phone },
    { label: "LinkedIn", value: "in/nikhilholagunda", href: profile.linkedin, Icon: LinkedInIcon, external: true },
    { label: "GitHub", value: "NikhilHolagunda", href: profile.github, Icon: GitHubIcon, external: true },
  ];

  return (
    <Section id="contact" index="06" label="Contact" title={<>Let&apos;s <span className="text-neon">talk</span>.</>}>
      {/* Giant email */}
      <Reveal className="flex flex-wrap items-center gap-4">
        <a
          href={`mailto:${profile.email}`}
          className="group inline-flex max-w-full items-center gap-3 font-display text-[clamp(1.35rem,4.6vw,4rem)] font-bold tracking-[-0.03em] transition-colors hover:text-cyan"
        >
          <ScrambleText text={profile.email} trigger="hover" duration={600} className="break-all" />
          <ArrowUpRight
            className="size-[0.8em] shrink-0 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </a>
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? "Email address copied" : "Copy email address"}
          className="grid size-11 place-items-center rounded-full border border-line text-muted transition-colors hover:border-cyan/60 hover:text-cyan"
        >
          {copied ? <Check className="size-4" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
        </button>
      </Reveal>

      <div className="mt-16 grid gap-8 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-12">
        <Reveal className="space-y-3">
          {channels.map(({ label, value, href, Icon, external }) => (
            <a
              key={label}
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              aria-label={`${label}: ${value}${external ? " (opens in a new tab)" : ""}`}
              className="group glass flex items-center gap-4 rounded-2xl p-4 transition-colors hover:border-cyan/50"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-cyan/10 text-cyan">
                <Icon className="size-[18px]" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-mono text-[11px] uppercase tracking-[0.2em] text-dim">{label}</span>
                <span className="block truncate text-fg">{value}</span>
              </span>
              <ArrowUpRight className="size-4 text-dim transition-colors group-hover:text-cyan" aria-hidden="true" />
            </a>
          ))}
          <div className="glass flex items-center gap-4 rounded-2xl p-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-cyan/10 text-cyan">
              <MapPin className="size-[18px]" aria-hidden="true" />
            </span>
            <span>
              <span className="block font-mono text-[11px] uppercase tracking-[0.2em] text-dim">Location</span>
              <span className="block text-fg">{profile.location}</span>
            </span>
          </div>
          <div className="pt-4">
            <Magnetic>
              <a
                href={profile.resume}
                download
                className="inline-flex h-12 items-center gap-3 rounded-full border border-cyan/50 px-6 font-mono text-xs font-semibold uppercase tracking-wider text-cyan transition-colors hover:bg-cyan hover:text-bg"
              >
                <Download className="size-4" aria-hidden="true" />
                Download resume
              </a>
            </Magnetic>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="glass rounded-[1.75rem] p-6 md:p-9">
          <h3 className="font-display text-2xl font-bold tracking-tight">Send a message</h3>
          <p className="mb-6 mt-2 text-muted">Goes straight to my inbox.</p>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
