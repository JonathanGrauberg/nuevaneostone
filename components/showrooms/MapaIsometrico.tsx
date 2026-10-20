"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { easeLux } from "@/components/motion/Reveal";
import type { ShowroomMapa } from "@/lib/content";
import { MAPA, proyectar, provinciasMapa } from "./mapaArgentina";

// Inclinación isométrica del plano (los pines la compensan para quedar de frente)
const ROT_X = 55;
const ROT_Z = -20;
const CAPAS = 10; // grosor del "bloque" del mapa
const ZOOM = 2;

type Props = {
  showrooms: ShowroomMapa[];
  seleccionado: string | null;
  enfocado: boolean; // true = zoom sobre el seleccionado
  onSeleccionar: (slug: string) => void;
};

/**
 * Argentina en perspectiva isométrica con pines tipo gota (foto del showroom adentro).
 * El plano usa coordenadas reales (lat/lng → mapa) y hace zoom suave al showroom elegido.
 */
export function MapaIsometrico({ showrooms, seleccionado, enfocado, onSeleccionar }: Props) {
  const uid = useId().replace(/:/g, "");
  const [hover, setHover] = useState<string | null>(null);

  // Tamaño del plano: se adapta al espacio disponible (880px de alto en desktop amplio)
  const raiz = useRef<HTMLDivElement>(null);
  const [k, setK] = useState(1);
  useEffect(() => {
    const el = raiz.current;
    if (!el) return;
    const medir = () => setK(Math.min(1, el.clientHeight / 690, el.clientWidth / 600));
    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const H = 880 * k;
  const W = (MAPA.ancho / MAPA.alto) * H;

  const puntos = useMemo(
    () =>
      showrooms.map((s) => {
        const p = proyectar(s.geo.lat, s.geo.lng);
        return { s, x: (p.x / MAPA.ancho) * W, y: (p.y / MAPA.alto) * H };
      }),
    [showrooms, W, H],
  );

  const sel = puntos.find((p) => p.s.slug === seleccionado);
  const provSel = sel?.s.provincia;
  const provConShowroom = useMemo(() => new Set(showrooms.map((s) => s.provincia)), [showrooms]);

  const escala = enfocado && sel ? ZOOM : 1;
  const escalaPin = Math.pow(escala, -0.55);
  const camara = enfocado && sel ? { x: W / 2 - sel.x * ZOOM, y: H / 2 - sel.y * ZOOM, scale: ZOOM } : { x: 0, y: 0, scale: 1 };

  return (
    <div ref={raiz} className="absolute inset-0 overflow-hidden" style={{ perspective: "2600px" }}>
      {/* Definición única del contorno (las capas de grosor la reutilizan) */}
      <svg width="0" height="0" className="absolute" aria-hidden>
        <defs>
          <g id={`arg-${uid}`}>
            {provinciasMapa.map((p) => (
              <path key={p.nombre} d={p.d} />
            ))}
          </g>
        </defs>
      </svg>

      <div
        className="absolute top-1/2 left-1/2"
        style={{
          width: W,
          height: H,
          transformStyle: "preserve-3d",
          transform: `translate(-50%, -50%) rotateX(${ROT_X}deg) rotateZ(${ROT_Z}deg)`,
        }}
      >
        <motion.div
          className="absolute inset-0 origin-top-left"
          style={{ transformStyle: "preserve-3d" }}
          animate={camara}
          transition={{ duration: 1.2, ease: easeLux }}
        >
          {/* Grosor: capas apiladas hacia abajo */}
          {Array.from({ length: CAPAS }, (_, i) => (
            <svg
              key={i}
              viewBox={`0 0 ${MAPA.ancho} ${MAPA.alto}`}
              className="absolute inset-0 h-full w-full"
              style={{ transform: `translateZ(${-(i + 1) * 1.6}px)` }}
              aria-hidden
            >
              <use href={`#arg-${uid}`} fill={i === CAPAS - 1 ? "rgba(0,0,0,0.55)" : "var(--surface)"} stroke="none" />
            </svg>
          ))}

          {/* Superficie con provincias */}
          <svg viewBox={`0 0 ${MAPA.ancho} ${MAPA.alto}`} className="absolute inset-0 h-full w-full" role="img" aria-label="Mapa de Argentina con los showrooms Neostone">
            {provinciasMapa.map((p) => {
              const activa = p.nombre === provSel;
              const conShowroom = provConShowroom.has(p.nombre as ShowroomMapa["provincia"]);
              return (
                <path
                  key={p.nombre}
                  d={p.d}
                  fill={activa ? "color-mix(in srgb, var(--accent) 22%, var(--bg))" : conShowroom ? "color-mix(in srgb, var(--fg) 9%, var(--bg))" : "color-mix(in srgb, var(--fg) 4%, var(--bg))"}
                  stroke={activa ? "var(--accent)" : "var(--line-strong)"}
                  strokeWidth={activa ? 1.4 : 0.6}
                  vectorEffect="non-scaling-stroke"
                  style={{ transition: "fill 0.6s, stroke 0.6s" }}
                />
              );
            })}
          </svg>

          {/* Pines */}
          {puntos.map(({ s, x, y }) => {
            const esSel = s.slug === seleccionado;
            const esHover = s.slug === hover;
            const tam = esSel ? 54 : 26;
            return (
              <div key={s.slug} className="absolute" style={{ left: x, top: y, transformStyle: "preserve-3d", zIndex: esSel ? 20 : esHover ? 10 : 1 }}>
                {/* Marca en el "piso" */}
                <span
                  className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full ${esSel ? "animate-ping bg-accent/40" : ""}`}
                  style={{ width: 14 / escala, height: 14 / escala }}
                />
                <span className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent" style={{ width: 5 / escala, height: 5 / escala }} />
                {/* Pin parado, de frente (compensa la inclinación y el zoom) */}
                <button
                  type="button"
                  onClick={() => onSeleccionar(s.slug)}
                  onMouseEnter={() => setHover(s.slug)}
                  onMouseLeave={() => setHover(null)}
                  aria-label={`${s.ciudad}, ${s.provincia}`}
                  className="absolute bottom-0 left-0 block origin-bottom"
                  style={{
                    transform: `rotateZ(${-ROT_Z}deg) rotateX(${-ROT_X}deg) scale(${escalaPin})`,
                    transformOrigin: "0 0",
                  }}
                >
                  <span
                    className="absolute bottom-0 left-0 block -translate-x-1/2 transition-all duration-500 ease-lux"
                    style={{ width: tam, height: tam + tam * 0.35 }}
                  >
                    {/* Gota */}
                    <span
                      className={`absolute inset-x-0 top-0 block overflow-hidden border-2 shadow-[0_8px_18px_rgba(0,0,0,0.5)] transition-colors duration-500 ${
                        esSel ? "border-accent" : "border-white/90"
                      }`}
                      style={{ width: tam, height: tam, borderRadius: "50% 50% 50% 0", transform: "rotate(-45deg)", background: "var(--surface)" }}
                    >
                      {s.imagen ? (
                        <span className="absolute inset-[-20%] block" style={{ transform: "rotate(45deg)" }}>
                          <Image src={s.imagen} alt="" fill sizes="80px" className="object-cover" />
                        </span>
                      ) : (
                        <span className="absolute inset-0 flex items-center justify-center" style={{ transform: "rotate(45deg)" }}>
                          <span className="h-2 w-2 rounded-full bg-accent" />
                        </span>
                      )}
                    </span>
                  </span>
                  {/* Nombre al pasar el mouse / seleccionado */}
                  {(esHover || esSel) && (
                    <span
                      className="absolute left-0 -translate-x-1/2 whitespace-nowrap border border-line-strong bg-bg/90 px-2 py-1 font-display text-[10px] tracking-[0.2em] text-fg uppercase backdrop-blur"
                      style={{ bottom: tam + tam * 0.35 + 8 }}
                    >
                      {s.ciudad}
                    </span>
                  )}
                </button>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
