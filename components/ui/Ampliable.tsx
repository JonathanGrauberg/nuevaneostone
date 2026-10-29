"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { createContext, useContext, useEffect, useState, useSyncExternalStore, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { easeLux } from "@/components/motion/Reveal";

type Foto = { src: string; alt: string };

const sinSuscripcion = () => () => {};
const AbrirFoto = createContext<(i: number) => void>(() => {});

/**
 * Grupo de fotos que se amplían al tocarlas: se abren en la misma pantalla, sobre el
 * fondo desenfocado, con flechas (o teclado) para pasar y Esc / clic afuera para cerrar.
 * Cada foto del grupo va envuelta en <Ampliable indice={i}>.
 */
export function Ampliables({ fotos, children }: { fotos: Foto[]; children: ReactNode }) {
  const [abierta, setAbierta] = useState<number | null>(null);
  // El portal se monta recién en el navegador (en el servidor no hay document.body)
  const enCliente = useSyncExternalStore(sinSuscripcion, () => true, () => false);
  const total = fotos.length;
  const pasar = (d: number) => setAbierta((i) => (i === null ? i : (i + d + total) % total));

  useEffect(() => {
    if (abierta === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAbierta(null);
      if (e.key === "ArrowRight") setAbierta((i) => (i! + 1) % total);
      if (e.key === "ArrowLeft") setAbierta((i) => (i! - 1 + total) % total);
    };
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [abierta, total]);

  const foto = abierta !== null ? fotos[abierta] : null;

  return (
    <AbrirFoto.Provider value={setAbierta}>
      {children}
      {/* En un portal: los contenedores animados (transform) romperían el position: fixed */}
      {enCliente &&
        createPortal(
          <AnimatePresence>
            {foto && (
              <motion.div
                role="dialog"
                aria-modal
                aria-label={foto.alt}
                className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-4 backdrop-blur-xl md:p-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: easeLux }}
                onClick={() => setAbierta(null)}
              >
                <motion.div
                  key={foto.src}
                  className="relative h-full w-full"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: easeLux }}
                >
                  <Image src={foto.src} alt={foto.alt} fill sizes="100vw" quality={90} className="object-contain" />
                </motion.div>

                <button type="button" className="eyebrow absolute top-5 right-5 !text-white md:top-8 md:right-8" onClick={() => setAbierta(null)}>
                  Cerrar ✕
                </button>
                {total > 1 && (
                  <>
                    {([-1, 1] as const).map((d) => (
                      <button
                        key={d}
                        type="button"
                        aria-label={d === 1 ? "Foto siguiente" : "Foto anterior"}
                        onClick={(e) => {
                          e.stopPropagation();
                          pasar(d);
                        }}
                        className={`absolute top-1/2 grid size-12 -translate-y-1/2 place-items-center border border-white/30 bg-black/30 font-display text-xl text-white transition-colors hover:border-accent ${
                          d === 1 ? "right-3 md:right-6" : "left-3 md:left-6"
                        }`}
                      >
                        {d === 1 ? "›" : "‹"}
                      </button>
                    ))}
                    <p className="eyebrow absolute bottom-5 left-1/2 -translate-x-1/2 !text-white/80 tabular-nums">
                      {abierta! + 1} / {total}
                    </p>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </AbrirFoto.Provider>
  );
}

/** Foto que abre el visor al tocarla. Ocupa todo su contenedor (que debe ser relative). */
export function Ampliable({ indice, etiqueta, children }: { indice: number; etiqueta: string; children: ReactNode }) {
  const abrir = useContext(AbrirFoto);
  return (
    <button type="button" onClick={() => abrir(indice)} aria-label={`Ampliar: ${etiqueta}`} className="absolute inset-0 block cursor-zoom-in">
      {children}
    </button>
  );
}
