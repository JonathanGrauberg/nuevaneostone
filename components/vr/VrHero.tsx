"use client";

import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { easeLux } from "@/components/motion/Reveal";
import { WordReveal } from "@/components/motion/WordReveal";

type Props = {
  sello: string;
  titulo: string[];
  bajada: string;
  portal: { video: string; poster: string };
  persona: string;
};

// Colores de la campaña "Virtual Experience": solo se usan en esta página.
const NEON = "conic-gradient(from 0deg, #22d3ee, #7c3aed, #d946ef, #22d3ee)";

/**
 * Hero "portal": la persona con lentes VR sale de un círculo donde se reproduce
 * el recorrido 3D de una cocina. Con el mouse, portal y persona se mueven en
 * capas distintas (paralaje).
 */
export function VrHero({ sello, titulo, bajada, portal, persona }: Props) {
  const reducir = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const portalX = useTransform(sx, (v) => v * -14);
  const portalY = useTransform(sy, (v) => v * -10);
  const personaX = useTransform(sx, (v) => v * 22);
  const personaY = useTransform(sy, (v) => v * 12);
  const brillo = useTransform(sx, (v) => `radial-gradient(60% 50% at ${50 + v * 20}% 55%, rgba(124,58,237,0.22), transparent 70%)`);

  const mover = (e: React.MouseEvent<HTMLElement>) => {
    if (reducir) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  };

  return (
    <section
      className="force-dark relative min-h-svh overflow-hidden"
      onMouseMove={mover}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      {/* Brillo de fondo que sigue al mouse */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{ background: brillo }}
      />

      <div className="container-x relative grid min-h-svh items-center gap-10 pt-28 pb-16 md:grid-cols-12">
        {/* ─── Texto ─── */}
        <div className="relative z-10 md:col-span-6">
          <motion.p
            className="inline-flex items-center gap-3 border border-white/15 px-3 py-2 font-display text-[10px] tracking-[0.28em] text-white/80 uppercase"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: easeLux, delay: 0.1 }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#22d3ee", boxShadow: "0 0 10px #22d3ee" }} />
            {sello}
          </motion.p>
          <p className="eyebrow mt-10">Experiencia VR</p>
          <WordReveal
            as="h1"
            trigger="mount"
            delay={0.2}
            stagger={0.08}
            lines={titulo}
            className="mt-5 font-display text-[clamp(2.6rem,4.6vw,4.6rem)] leading-[1.04] font-extralight"
          />
          <motion.p
            className="mt-8 max-w-md text-lg leading-relaxed text-fg-soft"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: easeLux, delay: 0.7 }}
          >
            {bajada}
          </motion.p>
          <motion.div
            className="mt-10 flex flex-wrap items-center gap-8"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: easeLux, delay: 0.9 }}
          >
            <a href="#reservar" className="btn-outline !border-accent">
              Reservá tu experiencia
            </a>
            <a href="#como-funciona" className="eyebrow transition-colors hover:text-fg">
              Cómo funciona ↓
            </a>
          </motion.div>
        </div>

        {/* ─── Portal + persona ─── */}
        <div className="relative md:col-span-6">
          <div className="relative mx-auto aspect-square w-[min(88vw,560px)]">
            <motion.div className="absolute inset-[6%]" style={{ x: portalX, y: portalY }}>
              {/* Anillo neón que gira */}
              <motion.div
                className="absolute -inset-[3px] rounded-full"
                style={{ background: NEON, filter: "blur(0.5px)" }}
                animate={reducir ? undefined : { rotate: 360 }}
                transition={{ duration: 14, ease: "linear", repeat: Infinity }}
              />
              <motion.div
                className="absolute -inset-6 rounded-full opacity-50 blur-2xl"
                style={{ background: NEON }}
                animate={reducir ? undefined : { rotate: -360 }}
                transition={{ duration: 22, ease: "linear", repeat: Infinity }}
              />
              {/* Recorrido 3D dentro del portal */}
              <motion.div
                className="absolute inset-0 overflow-hidden rounded-full bg-black"
                initial={{ clipPath: "circle(0% at 50% 50%)" }}
                animate={{ clipPath: "circle(50% at 50% 50%)" }}
                transition={{ duration: 1.6, ease: easeLux, delay: 0.3 }}
              >
                <video
                  className="h-full w-full scale-110 object-cover"
                  src={portal.video}
                  poster={portal.poster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-hidden
                />
                <div className="absolute inset-0" style={{ background: "radial-gradient(circle, transparent 55%, rgba(14,13,12,0.65) 100%)" }} />
              </motion.div>
            </motion.div>

            {/* Persona con lentes: sale del portal */}
            <motion.div
              className="absolute inset-x-[-4%] bottom-[-6%] h-[78%]"
              style={{ x: personaX, y: personaY }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.3, ease: easeLux, delay: 0.8 }}
            >
              <Image src={persona} alt="Persona usando lentes de realidad virtual" fill priority sizes="(min-width: 768px) 45vw, 90vw" className="object-contain object-bottom drop-shadow-[0_30px_40px_rgba(0,0,0,0.6)]" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Fundido hacia la sección siguiente */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32" style={{ background: "linear-gradient(0deg, var(--page), transparent)" }} />
    </section>
  );
}
