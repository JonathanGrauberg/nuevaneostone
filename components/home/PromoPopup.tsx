"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { easeLux } from "@/components/motion/Reveal";

export type PromoVisible = { id: string; alt: string; imagen: string; imagenCelular?: string; video?: string; videoCelular?: string };

const VISTA = "neostone-promo-vista";
const sinSuscripcion = () => () => {};

/**
 * Popup de promoción del inicio (se carga desde /admin). Aparece una sola vez por
 * promo: queda anotada en localStorage y vuelve a salir recién cuando se carga otra.
 */
export function PromoPopup() {
  const [promo, setPromo] = useState<PromoVisible | null>(null);

  useEffect(() => {
    let cancelado = false;
    const t = setTimeout(async () => {
      try {
        const p: PromoVisible | null = await fetch("/api/promo").then((r) => r.json());
        if (!p || cancelado) return;
        let vista: string | null = null;
        try {
          vista = localStorage.getItem(VISTA);
        } catch {}
        if (vista !== p.id) setPromo(p);
      } catch {}
    }, 1200);
    return () => {
      cancelado = true;
      clearTimeout(t);
    };
  }, []);

  const cerrar = () => {
    try {
      if (promo) localStorage.setItem(VISTA, promo.id);
    } catch {}
    setPromo(null);
  };

  return <PromoModal promo={promo} onCerrar={cerrar} />;
}

/** El popup en sí (también lo usa /admin para la vista previa). */
export function PromoModal({ promo, onCerrar }: { promo: PromoVisible | null; onCerrar: () => void }) {
  // El portal se monta recién en el navegador (en el servidor no hay document.body)
  const montado = useSyncExternalStore(sinSuscripcion, () => true, () => false);

  useEffect(() => {
    if (!promo) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onCerrar();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [promo, onCerrar]);

  if (!montado) return null;
  return createPortal(
    <AnimatePresence>
      {promo && (
        <motion.div
          role="dialog"
          aria-modal
          aria-label={promo.alt}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 p-4 backdrop-blur-xl md:p-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: easeLux }}
          onClick={onCerrar}
        >
          <Contenido key={promo.id} promo={promo} />
          <button type="button" className="eyebrow absolute top-5 right-5 !text-white md:top-8 md:right-8" onClick={onCerrar}>
            Cerrar ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

/** Imagen de la promo; al tocarla (si tiene video) pasa a reproducir el video. */
function Contenido({ promo }: { promo: PromoVisible }) {
  const [enVideo, setEnVideo] = useState(false);
  // Video vertical en celular (si se cargó); si no, el mismo de escritorio
  const video = promo.videoCelular && window.matchMedia("(max-width: 767px)").matches ? promo.videoCelular : promo.video;
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: easeLux, delay: 0.1 }}
      onClick={(e) => e.stopPropagation()}
    >
      {enVideo && video ? (
        <video src={video} autoPlay controls playsInline className="max-h-[85dvh] max-w-full bg-black" />
      ) : (
        <button
          type="button"
          onClick={() => video && setEnVideo(true)}
          className={`block ${video ? "cursor-pointer" : "cursor-default"}`}
          aria-label={video ? `${promo.alt} — ver video` : promo.alt}
        >
          <picture>
            {promo.imagenCelular && <source media="(max-width: 767px)" srcSet={promo.imagenCelular} />}
            <img src={promo.imagen} alt={promo.alt} className="max-h-[85dvh] w-auto max-w-full" />
          </picture>
          {video && (
            <span className="eyebrow absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 px-4 py-2 !text-white backdrop-blur-md">▶ Ver video</span>
          )}
        </button>
      )}
    </motion.div>
  );
}
