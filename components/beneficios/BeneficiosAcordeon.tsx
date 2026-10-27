"use client";

import Image from "next/image";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { IconoPilar } from "@/components/beneficios/IconoPilar";
import { easeLux } from "@/components/motion/Reveal";
import type { Beneficio } from "@/data/beneficios";

/**
 * Beneficios en acordeón: al pasar el mouse (o tocar / enfocar) un título se despliega
 * su texto y queda abierto hasta elegir otro, y su ícono se dibuja. A la derecha, un panel fijo muestra la
 * imagen y la frase destacada del beneficio activo.
 */
export function BeneficiosAcordeon({ beneficios }: { beneficios: Beneficio[] }) {
  const [activo, setActivo] = useState(0);
  // Los íconos esperan a que la lista esté en pantalla para dibujarse
  const lista = useRef<HTMLOListElement>(null);
  const visible = useInView(lista, { once: true, amount: 0.3 });
  const b = beneficios[activo];
  const total = String(beneficios.length).padStart(2, "0");

  return (
    <div className="grid gap-12 md:grid-cols-12 md:gap-16">
      {/* ─── Acordeón ─── */}
      <ol ref={lista} className="md:col-span-6" aria-label="Beneficios">
        {beneficios.map((item, i) => {
          const abierto = i === activo;
          const id = `beneficio-${i}`;
          return (
            <li key={item.titulo} className="border-t border-line last:border-b" onMouseEnter={() => setActivo(i)}>
              <button
                type="button"
                className="group flex w-full items-baseline gap-6 py-7 text-left"
                aria-expanded={abierto}
                aria-controls={id}
                onClick={() => setActivo(i)}
                onFocus={() => setActivo(i)}
              >
                <span className={`font-display text-[11px] tracking-[0.32em] transition-colors duration-500 ${abierto ? "text-accent" : "text-muted"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`font-display text-2xl leading-tight transition-all duration-700 ease-lux md:text-4xl ${
                    abierto ? "translate-x-1 font-light text-fg" : "font-extralight text-muted group-hover:text-fg-soft"
                  }`}
                >
                  {item.titulo}
                </span>
                <span
                  className={`ml-auto shrink-0 font-display text-lg text-muted transition-transform duration-700 ease-lux ${abierto ? "rotate-45 text-accent" : ""}`}
                  aria-hidden
                >
                  +
                </span>
              </button>

              {/* Contenido desplegable (animación de alto con grid-rows) */}
              <div
                id={id}
                className="grid transition-[grid-template-rows,opacity] duration-700 ease-lux"
                style={{ gridTemplateRows: abierto ? "1fr" : "0fr", opacity: abierto ? 1 : 0 }}
              >
                <div className="overflow-hidden">
                  <div className="space-y-3 pr-4 pb-8 pl-[calc(11px+1.5rem+0.5rem)] leading-relaxed text-fg-soft">
                    {/* En mobile la imagen va dentro del desplegable */}
                    <div className="relative mb-5 aspect-[16/10] overflow-hidden md:hidden">
                      <Image src={item.imagen} alt="" fill sizes="100vw" className="object-cover" />
                    </div>
                    <div className="flex flex-col gap-5 md:flex-row-reverse md:items-start md:gap-8">
                      {/* Se monta al abrir, así el ícono se vuelve a dibujar cada vez */}
                      <div className="size-16 shrink-0 md:size-20">{abierto && visible && <IconoPilar pilar={item.icono} className="size-full" />}</div>
                      <div className="space-y-3">
                        {item.texto.map((t) => (
                          <p key={t}>{t}</p>
                        ))}
                      </div>
                    </div>
                    <span className={`mt-4 block h-px bg-accent transition-all delay-200 duration-1000 ease-lux ${abierto ? "w-16" : "w-0"}`} />
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      {/* ─── Panel fijo con imagen y frase destacada (desktop) ─── */}
      <div className="hidden md:col-span-6 md:block">
        <div className="sticky top-28">
          <div className="relative h-[calc(100svh-9rem)] max-h-[760px] min-h-[420px] overflow-hidden bg-surface">
            <AnimatePresence initial={false}>
              <motion.div
                key={b.imagen}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.1, ease: easeLux }}
              >
                <Image src={b.imagen} alt={b.titulo} fill sizes="45vw" className="object-cover" />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/10" />
            <div className="absolute inset-x-0 bottom-0 p-8 text-white">
              <p className="font-display text-[11px] tracking-[0.32em] text-white/60">
                {String(activo + 1).padStart(2, "0")} — {total}
              </p>
              <AnimatePresence mode="wait">
                <motion.p
                  key={b.destacado}
                  className="mt-4 font-display text-3xl leading-tight font-extralight lg:text-4xl"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.6, ease: easeLux }}
                >
                  {b.destacado}
                </motion.p>
              </AnimatePresence>
              {/* Indicador de posición */}
              <div className="mt-6 flex gap-1.5">
                {beneficios.map((x, i) => (
                  <span key={x.titulo} className={`h-px transition-all duration-700 ease-lux ${i === activo ? "w-10 bg-accent" : "w-4 bg-white/30"}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
