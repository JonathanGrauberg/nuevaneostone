"use client";

import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { easeLux, Reveal } from "@/components/motion/Reveal";
import { WordReveal } from "@/components/motion/WordReveal";

type Paso = { titulo: string; texto: string; video: string; poster: string };

const MQ = "(min-width: 768px)";
const subscribeMQ = (cb: () => void) => {
  const m = window.matchMedia(MQ);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};

/** Video en loop que solo se reproduce cuando `activo` (ahorra batería y CPU). */
function Clip({ src, poster, activo, className = "" }: { src: string; poster: string; activo: boolean; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (activo) v.play().catch(() => {});
    else v.pause();
  }, [activo]);
  return <video ref={ref} className={className} src={src} poster={poster} muted loop playsInline preload="metadata" aria-hidden />;
}

/**
 * "Cómo funciona": en desktop la sección queda anclada y el scroll avanza los pasos
 * (el video de la derecha cambia con un fundido). En mobile, pasos apilados.
 */
export function VrPasos({ pasos }: { pasos: Paso[] }) {
  const esDesktop = useSyncExternalStore(subscribeMQ, () => window.matchMedia(MQ).matches, () => false);
  const reducir = useReducedMotion();
  const anclado = esDesktop && !reducir;

  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [activo, setActivo] = useState(0);
  const [prog, setProg] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(pasos.length - 1, Math.floor(v * pasos.length));
    setActivo(i);
    setProg(Math.min(1, Math.max(0, v * pasos.length - i)));
  });

  const encabezado = (
    <div>
      <p className="eyebrow">Cómo funciona</p>
      <WordReveal lines={["Tres pasos,", "*cero* *sorpresas.*"]} className="mt-5 font-display text-4xl leading-tight font-extralight md:text-5xl" />
    </div>
  );

  if (!anclado) {
    return (
      <section ref={ref} id="como-funciona" className="container-x scroll-mt-20 py-24">
        {encabezado}
        <ol className="mt-12 space-y-16">
          {pasos.map((p, i) => (
            <Reveal key={p.titulo}>
              <li>
                <div className="relative aspect-[4/3] overflow-hidden bg-surface">
                  <ClipEnVista src={p.video} poster={p.poster} />
                </div>
                <p className="mt-6 font-display text-[11px] tracking-[0.3em] text-accent">0{i + 1}</p>
                <h3 className="mt-3 font-display text-2xl font-light">{p.titulo}</h3>
                <p className="mt-3 leading-relaxed text-fg-soft">{p.texto}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>
    );
  }

  return (
    <section ref={ref} id="como-funciona" className="relative" style={{ height: `${pasos.length * 90 + 40}svh` }}>
      <div className="sticky top-0 flex h-svh items-center overflow-hidden">
        <div className="container-x grid w-full items-center gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            {encabezado}
            <ol className="mt-12">
              {pasos.map((p, i) => {
                const on = i === activo;
                return (
                  <li key={p.titulo} className="relative border-t border-line py-6 last:border-b">
                    {/* Progreso del paso activo */}
                    <span className="absolute top-[-1px] left-0 h-px bg-accent" style={{ width: on ? `${prog * 100}%` : i < activo ? "100%" : "0%" }} />
                    <div className="flex items-baseline gap-5">
                      <span className={`font-display text-[11px] tracking-[0.3em] transition-colors duration-500 ${on ? "text-accent" : "text-muted"}`}>0{i + 1}</span>
                      <h3 className={`font-display text-2xl transition-all duration-700 ease-lux ${on ? "font-light text-fg" : "font-extralight text-muted"}`}>{p.titulo}</h3>
                    </div>
                    <div
                      className="grid transition-[grid-template-rows,opacity] duration-700 ease-lux"
                      style={{ gridTemplateRows: on ? "1fr" : "0fr", opacity: on ? 1 : 0 }}
                    >
                      <p className="overflow-hidden pl-[calc(11px+1.25rem+0.4rem)] leading-relaxed text-fg-soft">
                        <span className="block pt-3">{p.texto}</span>
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="md:col-span-7">
            <div className="relative aspect-[4/3] max-h-[78svh] w-full overflow-hidden bg-surface">
              {pasos.map((p, i) => (
                <motion.div
                  key={p.video}
                  className="absolute inset-0"
                  initial={false}
                  animate={{ opacity: i === activo ? 1 : 0, scale: i === activo ? 1 : 1.04 }}
                  transition={{ duration: 0.9, ease: easeLux }}
                >
                  <Clip src={p.video} poster={p.poster} activo={i === activo} className="h-full w-full object-cover" />
                </motion.div>
              ))}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <AnimatePresence mode="wait">
                <motion.p
                  key={activo}
                  className="absolute bottom-6 left-6 font-display text-[11px] tracking-[0.3em] text-white/80 uppercase"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  0{activo + 1} — 0{pasos.length}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Mobile: el video arranca cuando aparece en pantalla. */
function ClipEnVista({ src, poster }: { src: string; poster: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className="absolute inset-0">
      <Clip src={src} poster={poster} activo={visible} className="h-full w-full object-cover" />
    </div>
  );
}
