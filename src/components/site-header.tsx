"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";

import { navItems, profile } from "@/lib/data";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[120] rounded-full bg-cyan px-4 py-2 font-mono text-sm text-bg focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>

      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-[calc(env(safe-area-inset-top,0px)+0.75rem)]">
        <motion.div
          initial={reduce ? false : { y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
          className={cn(
            "flex w-full items-center justify-between gap-4 rounded-full border transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            scrolled
              ? "max-w-3xl border-line bg-bg/60 py-2 pl-5 pr-2 shadow-[0_8px_40px_-12px_rgb(0_0_0/0.8)] backdrop-blur-xl"
              : "max-w-7xl border-transparent bg-transparent px-3 py-3 sm:px-5"
          )}
        >
          <a
            href="#top"
            className="group flex items-center gap-2 font-mono text-sm font-semibold tracking-wider"
          >
            <span aria-hidden="true" className="grid size-8 place-items-center rounded-lg border border-cyan/50 bg-cyan/10 text-cyan transition-shadow group-hover:shadow-[0_0_20px_var(--cyan)]">
              {profile.initials}
            </span>
            <span className={cn("sr-only sm:not-sr-only", scrolled && "lg:sr-only")}>
              {profile.name.toUpperCase()}
            </span>
            <span className="sr-only">, back to top</span>
          </a>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {navItems.map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    aria-current={active === id ? "true" : undefined}
                    className={cn(
                      "relative isolate block rounded-full px-3.5 py-2 font-mono text-xs uppercase tracking-wider transition-colors",
                      active === id ? "text-bg" : "text-muted hover:text-fg"
                    )}
                  >
                    {active === id && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-cyan"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="grid size-11 place-items-center rounded-full border border-line bg-bg/40 backdrop-blur-md md:hidden"
          >
            <Menu className="size-5" aria-hidden="true" />
          </button>
        </motion.div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: reduce ? 0 : 0.6, ease: EASE }}
            className="fixed inset-0 z-[110] flex flex-col bg-bg/95 px-6 pb-10 pt-[calc(env(safe-area-inset-top,0px)+1.25rem)] backdrop-blur-2xl md:hidden"
          >
            <div className="flex justify-end">
              <button
                type="button"
                autoFocus
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid size-11 place-items-center rounded-full border border-line"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>
            <nav aria-label="Mobile" className="mt-10 flex-1">
              <ul className="space-y-2">
                {navItems.map(({ id, label }, i) => (
                  <motion.li
                    key={id}
                    initial={reduce ? false : { opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.15 + i * 0.05 }}
                  >
                    <a
                      href={`#${id}`}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline gap-4 py-2 font-display text-5xl font-bold tracking-tight transition-colors hover:text-cyan"
                    >
                      <span className="font-mono text-xs text-cyan">0{i + 1}</span>
                      {label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-dim">{profile.email}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
