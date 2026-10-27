"use client";

import { useRef, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { WordReveal } from "@/components/motion/WordReveal";

type Props = { video: string; poster: string; titulo: string[]; puntos: string[] };

/** Video de la presentadora en marco vertical, con play propio (se reproduce con sonido al hacer clic). */
export function VrPresentacion({ video, poster, titulo, puntos }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [reproduciendo, setReproduciendo] = useState(false);

  const play = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = false;
    v.play().then(() => setReproduciendo(true)).catch(() => {});
  };

  return (
    <section className="container-x grid items-center gap-14 py-28 md:grid-cols-12 md:py-40">
      <div className="md:col-span-5 md:col-start-2">
        <p className="eyebrow">Experiencia VR</p>
        <WordReveal lines={titulo} className="mt-5 font-display text-4xl leading-tight font-extralight md:text-5xl" />
        <ul className="mt-10">
          {puntos.map((p, i) => (
            <Reveal key={p} delay={i * 0.08}>
              <li className="flex gap-5 border-t border-line py-5 text-fg-soft last:border-b">
                <span className="font-display text-[11px] tracking-[0.3em] text-accent">0{i + 1}</span>
                <span className="leading-relaxed">{p}</span>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>

      <Reveal className="md:col-span-4 md:col-start-8">
        <div className="relative mx-auto aspect-[9/16] max-h-[80svh] w-full max-w-[380px] overflow-hidden bg-surface">
          <video
            ref={ref}
            className="h-full w-full object-cover"
            src={video}
            poster={poster}
            playsInline
            preload="none"
            controls={reproduciendo}
            onEnded={() => setReproduciendo(false)}
          />
          {!reproduciendo && (
            <button
              type="button"
              onClick={play}
              className="group absolute inset-0 flex flex-col items-center justify-end gap-4 bg-gradient-to-t from-black/80 via-black/10 to-transparent pb-10 text-white"
              aria-label="Reproducir video de la experiencia VR"
            >
              <span className="flex h-16 w-16 items-center justify-center border border-white/70 transition-all duration-500 group-hover:scale-105 group-hover:border-white group-hover:bg-white group-hover:text-black">
                ▶
              </span>
              <span className="font-display text-[11px] tracking-[0.3em] uppercase">Ver video · 1:30</span>
            </button>
          )}
        </div>
      </Reveal>
    </section>
  );
}
