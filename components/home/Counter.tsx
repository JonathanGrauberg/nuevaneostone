"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef } from "react";

/** Número que cuenta desde 0 al entrar en pantalla. */
export function Counter({ to, prefix = "" }: { to: number; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const el = ref.current;
    const ctrl = animate(0, to, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => (el.textContent = prefix + Math.round(v)),
    });
    return () => ctrl.stop();
  }, [inView, to, prefix]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}0
    </span>
  );
}
