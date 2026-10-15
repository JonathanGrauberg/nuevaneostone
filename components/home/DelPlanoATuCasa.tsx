"use client";

import Image from "next/image";
import Link from "next/link";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { WordReveal } from "@/components/motion/WordReveal";
import { calcoLondon as calco, type Trazo as TrazoCalco } from "./calcoLondon";

const MQ = "(min-width: 768px)";
const subscribeMQ = (cb: () => void) => {
  const m = window.matchMedia(MQ);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};

// Etapas del recorrido (0 → 1)
const DIBUJO_FIN = 0.58; // hasta acá se dibujan los planos
const RENDER_DESDE = 0.6; // desde acá aparece el render real
const RENDER_HASTA = 0.86;

const pasos = [
  { n: "01", t: "Diseño a medida", d: "Cada proyecto parte de tus medidas y tu forma de usar el espacio." },
  { n: "02", t: "Planos técnicos", d: "Definimos módulos, mesadas y cada detalle constructivo." },
  { n: "03", t: "Realidad virtual", d: "Antes de fabricar, la recorrés en escala real con lentes VR." },
];

const ventana = (grupo: number) => {
  const desde = 0.02 + (grupo / calco.grupos) * (DIBUJO_FIN - 0.12);
  return [desde, desde + 0.12] as const;
};

function Trazo({ p, t, linea }: { p: MotionValue<number>; t: TrazoCalco; linea: MotionValue<number> }) {
  const [desde, hasta] = ventana(t.g);
  const pathLength = useTransform(p, [desde, hasta], [0, 1]);
  return (
    <motion.path
      d={t.d}
      fill="none"
      stroke={t.acento ? "var(--accent)" : "currentColor"}
      strokeWidth={t.tenue ? 0.6 : 1.1}
      strokeLinejoin="round"
      strokeLinecap="round"
      vectorEffect="non-scaling-stroke"
      style={{ pathLength, opacity: t.tenue ? 0.4 : linea }}
    />
  );
}

function Cota({ p, x, y, texto, grupo }: { p: MotionValue<number>; x: number; y: number; texto: string; grupo: number }) {
  const [, hasta] = ventana(grupo);
  const opacity = useTransform(p, [hasta - 0.04, hasta + 0.04, RENDER_DESDE, RENDER_HASTA], [0, 1, 1, 0]);
  return (
    <motion.text x={x} y={y} fill="var(--accent)" fontSize={13} letterSpacing={2} fontFamily="var(--font-display)" style={{ opacity }}>
      {texto}
    </motion.text>
  );
}

/**
 * "Del plano a tu casa": con el scroll se dibuja el plano de una cocina —calcado
 * del render— y al completarse aparece la imagen real, que coincide línea por línea. En desktop la sección queda anclada
 * mientras se dibuja; en mobile (o con "reducir movimiento") se anima sola al verse.
 */
export function DelPlanoATuCasa() {
  const esDesktop = useSyncExternalStore(subscribeMQ, () => window.matchMedia(MQ).matches, () => false);
  const reducir = useReducedMotion();
  const anclado = esDesktop && !reducir;

  const seccionRef = useRef<HTMLElement>(null);
  const figuraRef = useRef<HTMLDivElement>(null);
  const enVista = useInView(figuraRef, { once: true, margin: "-20% 0px" });

  // Un único valor de progreso (0 → 1) que alimenta todo el dibujo.
  const p = useMotionValue(0);
  const { scrollYProgress } = useScroll({ target: seccionRef, offset: ["start start", "end end"] });
  const suave = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  useEffect(() => {
    if (!anclado) return;
    p.set(suave.get());
    return suave.on("change", (v) => p.set(v));
  }, [anclado, suave, p]);

  useEffect(() => {
    if (anclado || !enVista) return;
    const ctrl = animate(p, 1, { duration: reducir ? 0.01 : 5, ease: [0.45, 0, 0.25, 1] });
    return () => ctrl.stop();
  }, [anclado, enVista, reducir, p]);

  // Las líneas siguen visibles sobre la foto un momento (se ve que coinciden) y después se esfuman.
  const linea = useTransform(p, [RENDER_DESDE, RENDER_HASTA, 1], [1, 0.75, 0.12]);
  const renderOpacidad = useTransform(p, [RENDER_DESDE, RENDER_HASTA], [0, 1]);
  // Zoom leve aplicado a plano + foto juntos, para que nunca se desalineen.
  const escala = useTransform(p, [0, 1], [0.97, 1]);

  const [paso, setPaso] = useState(0);
  useMotionValueEvent(p, "change", (v) => setPaso(v < 0.3 ? 0 : v < RENDER_DESDE ? 1 : 2));

  const texto = (
    <div className="md:col-span-4">
      <p className="eyebrow">03 — Experiencia VR</p>
      <WordReveal
        lines={["Viví tu cocina", "*antes* *de* *que* *exista.*"]}
        className="mt-6 font-display text-4xl leading-tight font-extralight md:text-5xl"
      />
      <ol className="mt-10">
        {pasos.map((s, i) => {
          const activo = i === paso;
          return (
            <li key={s.n} className="border-t border-line py-4 last:border-b">
              <div className="flex items-baseline gap-4">
                <span className={`font-display text-[11px] tracking-[0.3em] transition-colors duration-500 ${activo ? "text-accent" : "text-muted"}`}>{s.n}</span>
                <span className={`font-display text-lg font-light transition-colors duration-500 ${activo ? "text-fg" : "text-muted"}`}>{s.t}</span>
              </div>
              <div
                className="grid transition-[grid-template-rows,opacity] duration-700 ease-lux"
                style={{ gridTemplateRows: activo ? "1fr" : "0fr", opacity: activo ? 1 : 0 }}
              >
                <p className="overflow-hidden pl-9 text-sm leading-relaxed text-fg-soft">
                  <span className="block pt-2">{s.d}</span>
                </p>
              </div>
            </li>
          );
        })}
      </ol>
      <Link href="/experiencia-vr" className="group mt-10 inline-flex items-center gap-4 font-display text-[11px] tracking-[0.24em] uppercase">
        <span className="flex h-12 w-12 items-center justify-center border border-fg transition-colors duration-500 group-hover:bg-fg group-hover:text-bg">
          ▶
        </span>
        Explorar en 360°
      </Link>
    </div>
  );

  const figura = (
    <div ref={figuraRef} className="relative md:col-span-8">
      <motion.div className="relative w-full" style={{ aspectRatio: `${calco.ancho} / ${calco.alto}`, scale: escala }}>
        {/* Render real: aparece cuando el plano está completo. Misma proporción que el calco. */}
        <motion.div
          className="absolute inset-0"
          style={{
            opacity: renderOpacidad,
            maskImage: "radial-gradient(ellipse 75% 75% at 50% 50%, #000 60%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 75% 75% at 50% 50%, #000 60%, transparent 100%)",
          }}
        >
          <Image src={calco.imagen} alt="Cocina Neostone London terminada" fill sizes="(min-width: 768px) 60vw, 100vw" className="object-cover" />
        </motion.div>
        {/* Plano calcado del render */}
        <svg
          viewBox={`0 0 ${calco.ancho} ${calco.alto}`}
          className="absolute inset-0 h-full w-full text-fg"
          role="img"
          aria-label="Plano de una cocina con isla que se convierte en la foto de la cocina terminada"
        >
          {calco.trazos.map((t, i) => (
            <Trazo key={i} p={p} t={t} linea={linea} />
          ))}
          {calco.etiquetas.map((e, i) => (
            <Cota key={i} p={p} x={e.x} y={e.y} texto={e.texto} grupo={e.g} />
          ))}
        </svg>
      </motion.div>
    </div>
  );

  return (
    <section
      ref={seccionRef}
      // Margen superior: separa esta sección del carrusel de colecciones.
      className="relative md:mt-40"
      // En desktop, la altura extra es el recorrido de scroll durante el cual se dibuja el plano.
      style={anclado ? { height: "280svh" } : undefined}
    >
      {anclado ? (
        <div className="sticky top-0 flex h-svh items-center overflow-hidden">
          <div className="container-x grid items-center gap-12 md:grid-cols-12">
            {texto}
            {figura}
          </div>
        </div>
      ) : (
        <div className="container-x grid gap-12 py-24">
          {texto}
          {figura}
        </div>
      )}
    </section>
  );
}
