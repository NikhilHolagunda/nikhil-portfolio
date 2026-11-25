import { MaskReveal, WipeLine } from "@/components/fx/reveal";

/** Shared section shell: wipe line, mono index, oversized masked heading. */
export function Section({
  id,
  index,
  label,
  title,
  children,
  className,
}: {
  id: string;
  index: string;
  label: string;
  title: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`relative mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 md:py-36 ${className ?? ""}`}
    >
      <WipeLine className="mb-10" />
      <p className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-dim">
        <span className="text-cyan">{index}</span>
        <span aria-hidden="true" className="h-px w-8 bg-dim/50" />
        {label}
      </p>
      <h2
        id={`${id}-title`}
        className="font-display text-[clamp(2.6rem,8vw,6.5rem)] font-bold leading-[0.92] tracking-[-0.04em]"
      >
        <MaskReveal>{title}</MaskReveal>
      </h2>
      <div className="mt-14 md:mt-20">{children}</div>
    </section>
  );
}
