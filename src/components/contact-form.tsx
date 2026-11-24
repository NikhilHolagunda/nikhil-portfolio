"use client";

import * as React from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";

import { cn } from "@/lib/utils";
import { profile } from "@/lib/data";
import { Button } from "@/components/ui/button";

const TYPES = ["Full-time role", "Contract", "Just saying hi"] as const;

const fieldCls =
  "w-full rounded-xl border border-input bg-background px-4 py-3 text-base text-foreground shadow-xs transition-colors placeholder:text-muted-foreground/80 focus-visible:border-primary focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40 sm:text-sm";

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
    <form onSubmit={onSubmit} className="mt-6 space-y-5" noValidate={false}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="cf-name" className="text-sm font-medium">
            Name
          </label>
          <input id="cf-name" name="name" required autoComplete="name" className={fieldCls} placeholder="Jane Doe" />
        </div>
        <div className="space-y-2">
          <label htmlFor="cf-email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={fieldCls}
            placeholder="jane@company.com"
          />
        </div>
      </div>

      <fieldset className="space-y-2">
        <legend className="mb-2 text-sm font-medium">Reason</legend>
        <div className="flex flex-wrap gap-2">
          {TYPES.map((t) => (
            <label
              key={t}
              className={cn(
                "cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-all select-none active:scale-[0.97] has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-ring/60",
                type === t
                  ? "border-primary bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:border-primary/40 hover:text-foreground"
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

      <div className="space-y-2">
        <label htmlFor="cf-message" className="text-sm font-medium">
          Message
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={5}
          className={cn(fieldCls, "resize-y")}
          placeholder="Tell me a bit about the role or project…"
        />
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={status === "sending"}>
        {status === "sending" ? (
          <>
            <Loader2 className="animate-spin" aria-hidden /> Sending…
          </>
        ) : (
          <>
            <Send aria-hidden /> Send message
          </>
        )}
      </Button>

      <p role="status" aria-live="polite" className="min-h-5 text-sm">
        {status === "sent" && (
          <span className="inline-flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
            <CheckCircle2 className="size-4" aria-hidden /> Thanks! Your message was sent.
          </span>
        )}
        {status === "error" && (
          <span className="text-destructive">
            Something went wrong. Please email me directly at{" "}
            <a className="underline underline-offset-4" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            .
          </span>
        )}
      </p>
    </form>
  );
}
