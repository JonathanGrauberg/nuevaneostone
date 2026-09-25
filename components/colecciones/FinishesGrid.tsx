"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import type { GrupoTerminaciones, TerminacionVista } from "@/lib/content";
import { easeLux } from "@/components/motion/Reveal";

/** Grilla de muestras de terminaciones agrupadas por material, con lightbox. */
export function FinishesGrid({ grupos }: { grupos: GrupoTerminaciones[] }) {
  const [abierta, setAbierta] = useState<TerminacionVista | null>(null);

  useEffect(() => {
    if (!abierta) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setAbierta(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [abierta]);

  return (
    <div className="space-y-16">
      {grupos.map((g) => (
        <div key={g.material}>
          <div className="mb-6 flex items-baseline justify-between border-b border-line pb-4">
            <h3 className="font-display text-xl font-light tracking-[0.12em] uppercase">{g.nombre}</h3>
            <span className="eyebrow">{g.items.length} opciones</span>
          </div>
          <ul className="grid grid-cols-3 gap-px sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
            {g.items.map((t, i) => (
              <motion.li
                key={t.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: easeLux, delay: (i % 8) * 0.04 }}
              >
                <button
                  onClick={() => setAbierta(t)}
                  className="group relative block aspect-square w-full overflow-hidden bg-surface text-left"
                  aria-label={`Ver ${t.nombre}`}
                >
                  <Image
                    src={t.imagen}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 12vw, (min-width: 768px) 16vw, 33vw"
                    className="object-cover transition-transform duration-1000 ease-lux group-hover:scale-110"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
                  <span className="absolute inset-x-0 bottom-0 p-2.5 font-display text-[10px] tracking-[0.16em] text-white uppercase md:text-[11px]">
                    {t.nombre}
                  </span>
                  {t.esNueva && (
                    <span className="absolute top-2 left-2 border border-accent bg-black/40 px-1.5 py-0.5 font-display text-[9px] tracking-[0.2em] text-white">
                      NEW
                    </span>
                  )}
                </button>
              </motion.li>
            ))}
          </ul>
        </div>
      ))}

      <AnimatePresence>
        {abierta && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-6 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setAbierta(null)}
            role="dialog"
            aria-modal
            aria-label={abierta.nombre}
          >
            <motion.figure
              className="w-full max-w-md"
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.6, ease: easeLux }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-square w-full">
                <Image src={abierta.imagen} alt={abierta.nombre} fill sizes="448px" className="object-cover" />
              </div>
              <figcaption className="mt-4 flex items-baseline justify-between text-white">
                <span className="font-display text-lg font-light tracking-[0.18em] uppercase">{abierta.nombre}</span>
                <button onClick={() => setAbierta(null)} className="eyebrow !text-white/70 hover:!text-white">
                  Cerrar ✕
                </button>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
