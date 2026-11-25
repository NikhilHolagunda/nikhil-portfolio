"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// three.js + r3f live in their own chunk and never render on the server.
const HeroScene = dynamic(() => import("./hero-scene"), { ssr: false });

/**
 * Static neon orb always renders (it is the mobile / reduced-motion /
 * no-WebGL experience and the loading fallback). On capable desktops the
 * 3D scene is fetched on first interaction, then fades in over the orb.
 */
export function HeroSceneLoader() {
  const [load, setLoad] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const webgl = (() => {
      try {
        return !!document.createElement("canvas").getContext("webgl2");
      } catch {
        return false;
      }
    })();
    if (!desktop || reduced || !webgl) return;

    // Fetch the 3D chunk on the first sign of a human (pointer, scroll,
    // key) so it never competes with first paint or hydration; fall back to
    // a long timer for visitors who just sit and look.
    const events = ["pointermove", "pointerdown", "wheel", "keydown", "touchstart"] as const;
    let done = false;
    const go = () => {
      if (done) return;
      done = true;
      cleanup();
      setLoad(true);
    };
    const timer = window.setTimeout(go, 9000);
    const cleanup = () => {
      window.clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, go));
    };
    events.forEach((e) => window.addEventListener(e, go, { once: true, passive: true }));
    return cleanup;
  }, []);

  useEffect(() => {
    if (!load) return;
    const t = window.setTimeout(() => setShown(true), 250);
    return () => window.clearTimeout(t);
  }, [load]);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      {/* Static fallback orb */}
      <div
        className={`absolute right-[-20%] top-[12%] aspect-square w-[85vw] max-w-[720px] rounded-full transition-opacity duration-[1500ms] md:right-[-4%] md:top-[8%] md:w-[52vw] ${
          shown ? "opacity-30" : "opacity-100"
        }`}
        style={{
          background:
            "radial-gradient(circle at 35% 30%, rgb(94 242 255 / 0.55), transparent 42%), radial-gradient(circle at 70% 65%, rgb(139 92 246 / 0.6), transparent 50%), radial-gradient(circle at 50% 50%, rgb(244 114 182 / 0.25), transparent 65%)",
          filter: "blur(40px)",
        }}
      />
      {load && (
        <div className={`absolute inset-0 transition-opacity duration-[1500ms] ${shown ? "opacity-100" : "opacity-0"}`}>
          <HeroScene />
        </div>
      )}
    </div>
  );
}
