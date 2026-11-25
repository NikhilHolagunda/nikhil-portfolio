import { profile } from "@/lib/data";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-16 sm:px-8">
        <p
          aria-hidden="true"
          className="text-outline select-none font-display text-[clamp(3rem,16vw,15rem)] font-bold uppercase leading-[0.8] tracking-[-0.06em] opacity-40"
        >
          Holagunda
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs uppercase tracking-[0.2em] text-dim">
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <p>Built with Next.js · three.js · Framer Motion</p>
          <a href="#top" className="text-muted transition-colors hover:text-cyan">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
