"use client";

import Link from "next/link";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ProductCard } from "@/components/cards/ProductCard";
import { Reveal } from "@/components/motion/Reveal";
import { WordReveal } from "@/components/motion/WordReveal";

type Item = { slug: string; nombre: string; bajada: string; portada: string };

const MQ = "(min-width: 768px)";
const subscribeMQ = (cb: () => void) => {
  const m = window.matchMedia(MQ);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};

/**
 * Colecciones del home con scroll horizontal anclado: al llegar a la sección,
 * el scroll vertical desplaza las tarjetas hacia la izquierda hasta la última.
 * En mobile o con "reducir movimiento" queda un carrusel normal deslizable.
 */
export function ColeccionesScroll({ colecciones }: { colecciones: Item[] }) {
  const esDesktop = useSyncExternalStore(subscribeMQ, () => window.matchMedia(MQ).matches, () => false);
  const reducir = useReducedMotion();
  const anclado = esDesktop && !reducir;

  const seccionRef = useRef<HTMLElement>(null);
  const pistaRef = useRef<HTMLDivElement>(null);
  const [recorrido, setRecorrido] = useState(0);

  // Cuánto hay que desplazar la pista para que la última tarjeta quede entera a la vista.
  useEffect(() => {
    if (!anclado || !pistaRef.current) return;
    const pista = pistaRef.current;
    const medir = () => setRecorrido(Math.max(0, pista.scrollWidth - window.innerWidth));
    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(pista);
    window.addEventListener("resize", medir);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", medir);
    };
  }, [anclado]);

  const { scrollYProgress } = useScroll({ target: seccionRef, offset: ["start start", "end end"] });
  const progreso = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.35 });
  const x = useTransform(progreso, [0, 1], [0, -recorrido]);
  // La página no queda bloqueada del todo: el bloque sube apenas (5% de la pantalla) mientras avanza.
  const deriva = useTransform(progreso, [0, 1], ["2.5vh", "-2.5vh"]);
  // Degradé en los bordes (efecto rueda): del lado donde todavía hay tarjetas por ver.
  const mascara = useTransform(progreso, (v) => {
    const izq = Math.min(v * 60, 9);
    const der = Math.min((1 - v) * 60, 9);
    return `linear-gradient(90deg, transparent 0%, #000 ${izq}%, #000 ${100 - der}%, transparent 100%)`;
  });
  const [actual, setActual] = useState(1);
  useMotionValueEvent(progreso, "change", (v) => setActual(Math.min(colecciones.length, Math.floor(v * colecciones.length) + 1)));

  const encabezado = (
    <div className="container-x mb-10 flex items-end justify-between gap-6">
      <div>
        <p className="eyebrow">02 — Colecciones</p>
        <WordReveal
          lines={["Una colección para cada", "*forma* *de* *habitar.*"]}
          className="mt-6 font-display text-3xl leading-tight font-extralight md:text-5xl"
        />
      </div>
      <div className="hidden shrink-0 flex-col items-end gap-5 md:flex">
        {anclado && (
          <div className="flex items-center gap-4">
            <span className="eyebrow tabular-nums">
              <span className="text-fg">{String(actual).padStart(2, "0")}</span> — {String(colecciones.length).padStart(2, "0")}
            </span>
            <span className="relative block h-px w-32 bg-line-strong">
              <motion.span className="absolute inset-y-0 left-0 origin-left bg-accent" style={{ width: "100%", scaleX: progreso }} />
            </span>
          </div>
        )}
        <Link href="/colecciones" className="link-line">
          Ver todas →
        </Link>
      </div>
    </div>
  );

  const tarjetas = colecciones.map((c, i) => (
    <Reveal
      key={c.slug}
      delay={anclado ? 0 : i * 0.06}
      className={anclado ? "w-[min(21vw,40svh)] shrink-0" : "w-[70vw] shrink-0 snap-start sm:w-[42vw]"}
    >
      <ProductCard href={`/colecciones/${c.slug}`} nombre={c.nombre} bajada={c.bajada} imagen={c.portada} indice={i} />
    </Reveal>
  ));

  // Siempre la misma <section> (con ref) para que useScroll quede enganchado desde el primer render;
  // solo cambia el modo: anclado (desktop) o carrusel deslizable (mobile / reducir movimiento).
  return (
    <section
      ref={seccionRef}
      className={anclado ? "relative" : "relative pb-28 md:pb-40"}
      // La altura extra de la sección es el "camino" que recorre el scroll horizontal.
      style={anclado ? { height: `calc(100svh + ${recorrido}px)` } : undefined}
    >
      {anclado ? (
        <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden pt-16">
          <motion.div style={{ y: deriva }}>
            {encabezado}
            <motion.div style={{ maskImage: mascara, WebkitMaskImage: mascara }}>
              <motion.div ref={pistaRef} style={{ x }} className="flex w-max gap-px px-[clamp(20px,5vw,80px)]">
                {tarjetas}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      ) : (
        <>
          {encabezado}
          <div className="no-scrollbar flex snap-x gap-px overflow-x-auto px-[clamp(20px,5vw,80px)]">{tarjetas}</div>
        </>
      )}
    </section>
  );
}
