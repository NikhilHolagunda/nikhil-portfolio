"use client";

import { useEffect, useRef, useState } from "react";

const INTERACTIVE = "a, button, [role='button'], label, summary, [data-cursor='hover']";

/**
 * Glowing dot + trailing orb. Only mounts on fine pointers (mouse/trackpad)
 * with motion allowed; touch devices keep the native behaviour.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const dot = useRef<HTMLDivElement>(null);
  const orb = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- enable only after client media checks
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.classList.add("has-cursor");

    let x = -100, y = -100, ox = -100, oy = -100;
    let hovering = false, down = false, visible = false;
    let raf = 0;

    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!visible) {
        visible = true;
        ox = x;
        oy = y;
        dot.current?.style.setProperty("opacity", "1");
        orb.current?.style.setProperty("opacity", "1");
      }
      const t = e.target as Element | null;
      hovering = !!t?.closest?.(INTERACTIVE);
    };
    const leave = () => {
      visible = false;
      dot.current?.style.setProperty("opacity", "0");
      orb.current?.style.setProperty("opacity", "0");
    };
    const press = () => (down = true);
    const release = () => (down = false);

    const tick = () => {
      ox += (x - ox) * 0.16;
      oy += (y - oy) * 0.16;
      const s = (hovering ? 1.9 : 1) * (down ? 0.8 : 1);
      if (dot.current) dot.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      if (orb.current) {
        orb.current.style.transform = `translate3d(${ox}px, ${oy}px, 0) translate(-50%, -50%) scale(${s})`;
        orb.current.dataset.hover = hovering ? "1" : "0";
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    window.addEventListener("pointerdown", press);
    window.addEventListener("pointerup", release);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      root.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      window.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerup", release);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={orb}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100] size-9 rounded-full border border-cyan/60 opacity-0 mix-blend-difference transition-[opacity,background-color,border-color] duration-300 data-[hover='1']:border-transparent data-[hover='1']:bg-white"
      />
      <div
        ref={dot}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[101] size-1.5 rounded-full bg-cyan opacity-0 shadow-[0_0_12px_2px_var(--cyan)]"
      />
    </>
  );
}
