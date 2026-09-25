"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ColeccionVista } from "@/lib/content";
import { easeLux, ImageReveal, Reveal } from "@/components/motion/Reveal";
import { FinishesGrid } from "./FinishesGrid";
import { LogoColeccion } from "./LogoColeccion";

const AUTOPLAY_MS = 7000;
const lineaLabel = { cocina: "Cocina", placard: "Placards y vestidores" } as const;

/**
 * Página de colecciones estilo "póster de película": el fondo, título y descripción
 * cambian según la tarjeta elegida. Rota sola hasta que el usuario elige una.
 */
export function CollectionsExplorer({ colecciones, inicial }: { colecciones: ColeccionVista[]; inicial: string }) {
  const [idx, setIdx] = useState(() => Math.max(0, colecciones.findIndex((c) => c.slug === inicial)));
  const [autoplay, setAutoplay] = useState(inicial === colecciones[0]?.slug);
  const [pausa, setPausa] = useState(false);
  const cardsRef = useRef<HTMLDivElement>(null);
  const c = colecciones[idx];
  const total = colecciones.length;

  const elegir = useCallback(
    (i: number) => {
      setIdx(i);
      setAutoplay(false);
      // Cada colección conserva su URL (SEO); se actualiza sin recargar.
      window.history.replaceState(null, "", `/colecciones/${colecciones[i].slug}`);
    },
    [colecciones],
  );

  useEffect(() => {
    if (!autoplay || pausa) return;
    const t = setTimeout(() => setIdx((i) => (i + 1) % total), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [autoplay, pausa, idx, total]);

  // Mantener visible la tarjeta activa en mobile (scroll horizontal).
  useEffect(() => {
    // Solo scroll horizontal del carrusel (scrollIntoView movería la página entera).
    const cont = cardsRef.current;
    const el = cont?.children[idx] as HTMLElement | undefined;
    if (cont && el && cont.scrollWidth > cont.clientWidth) {
      cont.scrollTo({ left: el.offsetLeft - (cont.clientWidth - el.clientWidth) / 2, behavior: "smooth" });
    }
  }, [idx]);

  return (
    <>
      {/* ─── HERO (siempre oscuro, tipo cine) ────────────── */}
      <section
        className="force-dark relative h-[74svh] max-h-[820px] min-h-[520px] overflow-hidden"
        onMouseEnter={() => setPausa(true)}
        onMouseLeave={() => setPausa(false)}
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={c.slug}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: easeLux }}
          >
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 9, ease: "linear" }}
            >
              <Image src={c.hero} alt="" fill priority sizes="100vw" quality={90} className="object-cover" />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Overlays tipo Netflix: fuerte a la izquierda y abajo */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, var(--bg) 0%, color-mix(in srgb, var(--bg) 88%, transparent) 28%, color-mix(in srgb, var(--bg) 35%, transparent) 60%, transparent 85%)",
          }}
        />
        {/* El borde inferior se funde con el fondo real de la página (claro u oscuro) */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, var(--page) 0%, transparent 38%)" }} />
        <div className="absolute inset-0 md:hidden" style={{ background: "color-mix(in srgb, var(--bg) 45%, transparent)" }} />
        <div
          className="absolute inset-x-0 top-0 h-32"
          style={{ background: "linear-gradient(180deg, color-mix(in srgb, var(--bg) 70%, transparent), transparent)" }}
        />

        <div className="container-x relative flex h-full flex-col justify-end pt-24 pb-24 md:pb-32">
          <AnimatePresence mode="wait">
            <motion.div
              key={c.slug}
              className="max-w-lg"
              initial="hidden"
              animate="shown"
              exit="out"
              variants={{ shown: { transition: { staggerChildren: 0.07 } } }}
            >
              {[
                <p key="n" className="eyebrow mb-5">
                  Colecciones <span className="mx-2 text-line-strong">/</span>
                  <span className="text-accent">
                    {String(idx + 1).padStart(2, "0")} — {String(total).padStart(2, "0")}
                  </span>
                </p>,
                <h1 key="t">
                  {c.logo ? (
                    <>
                      <span className="sr-only">{c.nombre}</span>
                      <span aria-hidden>
                        <LogoColeccion logo={c.logo} area={6200} />
                      </span>
                    </>
                  ) : (
                    <span className="font-display text-4xl font-extralight tracking-[0.14em] uppercase md:text-5xl">{c.nombre}</span>
                  )}
                </h1>,
                <p key="b" className="mt-5 font-display text-[10px] tracking-[0.28em] text-stone uppercase md:text-[11px]">
                  {lineaLabel[c.linea]} · {c.grupos.map((g) => g.nombre).join(" + ")}
                </p>,
                <p key="d" className="mt-4 line-clamp-3 max-w-md text-[15px] leading-relaxed text-fg-soft md:text-base">
                  {c.descripcion}
                </p>,
                <div key="cta" className="mt-7 flex flex-wrap items-center gap-8">
                  <a href="#terminaciones" className="link-line">
                    Ver terminaciones ↓
                  </a>
                  <Link href={`/presupuesto?coleccion=${c.slug}`} className="eyebrow transition-colors hover:text-fg">
                    Solicitar asesoramiento
                  </Link>
                </div>,
              ].map((el, i) => (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    shown: { opacity: 1, y: 0, transition: { duration: 0.9, ease: easeLux } },
                    out: { opacity: 0, y: -10, transition: { duration: 0.3, ease: "easeIn" } },
                  }}
                >
                  {el}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ─── TARJETAS montadas sobre el borde del hero ─────── */}
      <div
        className="container-x relative z-10 -mt-16 md:-mt-20"
        onMouseEnter={() => setPausa(true)}
        onMouseLeave={() => setPausa(false)}
      >
        <div
          ref={cardsRef}
          className="no-scrollbar -mx-[clamp(20px,5vw,80px)] flex snap-x gap-px overflow-x-auto px-[clamp(20px,5vw,80px)] md:mx-0 md:grid md:overflow-visible md:px-0"
          style={{ gridTemplateColumns: `repeat(${total}, minmax(0, 1fr))` }}
          role="tablist"
          aria-label="Colecciones"
        >
          {colecciones.map((col, i) => {
            const activa = i === idx;
            return (
              <button
                key={col.slug}
                role="tab"
                aria-selected={activa}
                aria-label={col.nombre}
                onClick={() => elegir(i)}
                className={`group relative aspect-[16/10] w-[46vw] shrink-0 snap-center overflow-hidden bg-[#171614] text-left transition-transform duration-700 ease-lux hover:-translate-y-1.5 md:w-auto ${
                  activa ? "-translate-y-1.5" : ""
                }`}
              >
                <Image
                  src={col.portada}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 14vw, 46vw"
                  className={`object-cover transition-all duration-1000 ease-lux group-hover:scale-105 ${
                    activa ? "brightness-90" : "brightness-50 group-hover:brightness-75"
                  }`}
                />
                <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
                {/* Logo chico abajo a la izquierda, tamaño ópticamente parejo entre colecciones */}
                {col.logo ? (
                  <span className="absolute bottom-3 left-3 opacity-80 transition-opacity duration-500 group-hover:opacity-100 md:bottom-3.5 md:left-3.5">
                    <LogoColeccion logo={col.logo} area={950} />
                  </span>
                ) : (
                  <span className="absolute right-3 bottom-3 left-3 font-display text-[9px] leading-snug tracking-[0.2em] text-white/80 uppercase md:bottom-3.5 md:left-3.5">
                    {col.nombre}
                  </span>
                )}
                {/* Marco + barra de progreso del autoplay */}
                <span
                  className={`pointer-events-none absolute inset-0 border transition-colors duration-500 ${activa ? "border-accent" : "border-white/10"}`}
                />
                {activa && (
                  <motion.span
                    key={`${col.slug}-${autoplay && !pausa}`}
                    className="absolute bottom-0 left-0 h-[2px] bg-accent"
                    initial={{ width: autoplay && !pausa ? "0%" : "100%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: autoplay && !pausa ? AUTOPLAY_MS / 1000 : 0, ease: "linear" }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── TERMINACIONES ────────────────────────────────── */}
      <section id="terminaciones" className="container-x scroll-mt-24 pt-24 pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={c.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: easeLux }}
          >
            <div className="mb-14 grid gap-6 md:grid-cols-12">
              <p className="eyebrow md:col-span-3">Terminaciones</p>
              <h2 className="font-display text-3xl font-extralight md:col-span-9 md:text-5xl">
                Los colores de <span className="font-normal">{c.nombre}</span>
              </h2>
            </div>
            <FinishesGrid grupos={c.grupos} />
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ─── RENDERS / EDITORIAL ──────────────────────────── */}
      <section className="border-t border-line py-24">
        <AnimatePresence mode="wait">
          <motion.div key={c.slug} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
            <div className="container-x grid gap-px md:grid-cols-12">
              {c.renders[0] && (
                <ImageReveal className="relative aspect-[16/10] md:col-span-8">
                  <Image src={c.renders[0].src} alt={c.renders[0].alt} fill sizes="(min-width: 768px) 66vw, 100vw" className="object-cover" />
                </ImageReveal>
              )}
              <div className="flex flex-col justify-end gap-6 py-10 md:col-span-4 md:py-0 md:pl-12">
                {c.parrafos.map((p, i) => (
                  <Reveal key={i} delay={i * 0.1}>
                    <p className="text-lg leading-relaxed font-light text-fg-soft">{p}</p>
                  </Reveal>
                ))}
              </div>
              {c.renders.slice(1).map((r, i) => (
                <ImageReveal key={r.src} delay={i * 0.1} className="relative aspect-[4/5] md:col-span-6">
                  <Image src={r.src} alt={r.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                </ImageReveal>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="container-x mt-24 flex flex-col items-start justify-between gap-8 border-t border-line pt-12 md:flex-row md:items-center">
          <p className="font-display text-2xl font-extralight md:text-4xl">
            ¿Te imaginás una <span className="font-normal">{c.nombre}</span> en tu casa?
          </p>
          <Link href={`/presupuesto?coleccion=${c.slug}`} className="btn-outline">
            Solicitar asesoramiento
          </Link>
        </div>
      </section>
    </>
  );
}
