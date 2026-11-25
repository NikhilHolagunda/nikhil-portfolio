"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const GLYPHS = "!<>-_\\/[]{}=+*^?#01ABCDEFXYZ";

/**
 * Decodes text from random glyphs, left to right. The real string is always
 * exposed to assistive tech via aria-label; the animated glyphs are hidden.
 */
export function ScrambleText({
  text,
  className,
  duration = 1100,
  delay = 0,
  trigger = "mount",
}: {
  text: string;
  className?: string;
  duration?: number;
  delay?: number;
  trigger?: "mount" | "hover";
}) {
  const [out, setOut] = useState(text);
  const raf = useRef(0);

  const run = useCallback(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    cancelAnimationFrame(raf.current);
    const start = performance.now() + delay;
    const step = (now: number) => {
      const p = Math.max(0, Math.min(1, (now - start) / duration));
      const locked = Math.floor(p * text.length);
      let s = "";
      for (let i = 0; i < text.length; i++) {
        const c = text[i];
        s += i < locked || c === " " ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      setOut(s);
      if (p < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
  }, [text, duration, delay]);

  useEffect(() => {
    if (trigger === "mount") run();
    return () => cancelAnimationFrame(raf.current);
  }, [run, trigger]);

  return (
    <span
      className={className}
      onPointerEnter={trigger === "hover" ? run : undefined}
      onFocus={trigger === "hover" ? run : undefined}
    >
      <span className="sr-only">{text}</span>
      {/* Final text reserves the width; glyphs overlay it so nothing shifts. */}
      <span aria-hidden="true" className="relative inline-block max-w-full">
        <span className="invisible">{text}</span>
        <span className="absolute inset-0">{out}</span>
      </span>
    </span>
  );
}
