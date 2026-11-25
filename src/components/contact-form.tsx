"use client";

import * as React from "react";
import { CircleCheck, LoaderCircle, Send } from "lucide-react";

import { cn } from "@/lib/utils";
import { profile } from "@/lib/data";
import { Magnetic } from "@/components/fx/magnetic";

const TYPES = ["Full-time role", "Contract", "Just saying hi"] as const;

const fieldCls =
  "peer w-full rounded-2xl border border-line bg-bg/50 px-4 pb-3 pt-6 text-base text-fg outline-none transition-colors placeholder:text-transparent focus:border-cyan/70 focus:bg-bg/70 focus-visible:outline-none sm:text-sm";
const labelCls =
  "pointer-events-none absolute left-4 top-4 origin-left font-mono text-xs uppercase tracking-[0.15em] text-dim transition-all peer-focus:top-2 peer-focus:scale-90 peer-focus:text-cyan peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:scale-90";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [type, setType] = React.useState<(typeof TYPES)[number]>(TYPES[0]);
  const [status, setStatus] = React.useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") ?? ""),
          email: String(data.get("email") ?? ""),
          message: String(data.get("message") ?? ""),
          website: String(data.get("website") ?? ""),
          type,
          timestamp: new Date().toISOString(),
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="relative">
          <input id="cf-name" name="name" required autoComplete="name" placeholder="Name" className={fieldCls} />
          <label htmlFor="cf-name" className={labelCls}>
            Name
          </label>
        </div>
        <div className="relative">
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="Email"
            className={fieldCls}
          />
          <label htmlFor="cf-email" className={labelCls}>
            Email
          </label>
        </div>
      </div>

      <fieldset>
        <legend className="mb-3 font-mono text-xs uppercase tracking-[0.15em] text-dim">Reason</legend>
        <div className="flex flex-wrap gap-2">
          {TYPES.map((t) => (
            <label
              key={t}
              className={cn(
                "cursor-pointer select-none rounded-full border px-4 py-2.5 font-mono text-xs uppercase tracking-wider transition-all has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-cyan",
                type === t
                  ? "border-cyan bg-cyan text-bg shadow-[0_0_24px_-6px_var(--cyan)]"
                  : "border-line text-muted hover:border-cyan/50 hover:text-fg"
              )}
            >
              <input
                type="radio"
                name="type"
                value={t}
                checked={type === t}
                onChange={() => setType(t)}
                className="sr-only"
              />
              {t}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="relative">
        <textarea
          id="cf-message"
          name="message"
          required
          rows={5}
          placeholder="Message"
          className={cn(fieldCls, "resize-y pt-7")}
        />
        <label htmlFor="cf-message" className={labelCls}>
          Message
        </label>
      </div>

      {/* Honeypot: invisible to people and screen readers; bots fill every field. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="cf-website">Website</label>
        <input id="cf-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <Magnetic>
          <button
            type="submit"
            disabled={status === "sending"}
            className="inline-flex h-14 items-center gap-3 rounded-full bg-cyan px-8 font-mono text-sm font-semibold uppercase tracking-wider text-bg shadow-[0_0_40px_-8px_var(--cyan)] transition-shadow hover:shadow-[0_0_60px_-4px_var(--cyan)] disabled:opacity-60"
          >
            {status === "sending" ? (
              <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
            ) : (
              <Send className="size-4" aria-hidden="true" />
            )}
            {status === "sending" ? "Sending…" : "Send message"}
          </button>
        </Magnetic>
        <p role="status" aria-live="polite" className="text-sm">
          {status === "sent" && (
            <span className="inline-flex items-center gap-2 text-cyan">
              <CircleCheck className="size-4" aria-hidden="true" /> Thanks — I&apos;ll get back to you soon.
            </span>
          )}
          {status === "error" && (
            <span className="text-magenta">
              Something went wrong. Email me directly at{" "}
              <a href={`mailto:${profile.email}`} className="underline underline-offset-4">
                {profile.email}
              </a>
              .
            </span>
          )}
        </p>
      </div>
    </form>
  );
}
