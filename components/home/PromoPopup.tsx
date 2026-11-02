"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { easeLux } from "@/components/motion/Reveal";
import { PromoTarjeta, type PromoContenido } from "@/components/promo/PromoTarjeta";

export type PromoVisible = PromoContenido & { id: string; videoCelular?: string };

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

/** El popup en sí: la tarjeta sobre el fondo desenfocado (también lo usa /admin para probarlo). */
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
          aria-label={promo.titulo}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/50 p-4 backdrop-blur-xl md:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: easeLux }}
          onClick={onCerrar}
        >
          <Contenido key={promo.id} promo={promo} onCerrar={onCerrar} />
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

/** La tarjeta; con "Ver video" pasa a reproducir el video en el mismo lugar. */
function Contenido({ promo, onCerrar }: { promo: PromoVisible; onCerrar: () => void }) {
  const [enVideo, setEnVideo] = useState(false);
  // Video vertical en celular (si se cargó); si no, el mismo de escritorio
  const video = promo.videoCelular && window.matchMedia("(max-width: 767px)").matches ? promo.videoCelular : (promo.video ?? promo.videoCelular);

  return (
    <motion.div
      className="relative w-full max-w-[1220px]"
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: easeLux, delay: 0.1 }}
      onClick={(e) => e.stopPropagation()}
    >
      {enVideo && video ? (
        <div className="relative mx-auto w-fit">
          <video src={video} autoPlay controls playsInline className="max-h-[85dvh] max-w-full bg-black" />
          <div className="absolute -top-10 right-0 left-0 flex justify-between">
            <button type="button" className="eyebrow !text-white" onClick={() => setEnVideo(false)}>
              ← Volver
            </button>
            <button type="button" className="eyebrow !text-white" onClick={onCerrar}>
              Cerrar ✕
            </button>
          </div>
        </div>
      ) : (
        <div className="max-h-[90dvh] overflow-y-auto shadow-2xl">
          <PromoTarjeta promo={promo} onCerrar={onCerrar} onVideo={video ? () => setEnVideo(true) : undefined} />
        </div>
      )}
    </motion.div>
  );
}
