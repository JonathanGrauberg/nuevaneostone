"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { easeLux } from "@/components/motion/Reveal";
import { ImagenPendiente } from "@/components/ui/ImagenPendiente";
import type { ShowroomMapa } from "@/lib/content";
import { distanciaKm, normalizar } from "@/lib/geo";
import { formatearHorario } from "@/lib/horarios";
import { pedirUbicacion, useUbicacion } from "@/lib/ubicacion";
import { DistanceFromYou } from "./DistanceFromYou";
import { MapaIsometrico } from "./MapaIsometrico";
import { OpenNow } from "./OpenNow";

/**
 * Explorador de showrooms: ficha del local a la izquierda y Argentina isométrica
 * con pines a la derecha. El buscador y "usar mi ubicación" eligen un showroom
 * y el mapa hace zoom hasta él.
 */
export function ShowroomExplorer({ showrooms, inicial }: { showrooms: ShowroomMapa[]; inicial: string }) {
  const [sel, setSel] = useState(inicial);
  const [enfocado, setEnfocado] = useState(false);
  const [q, setQ] = useState("");
  const [abierto, setAbierto] = useState(false);
  const [geoEstado, setGeoEstado] = useState<"idle" | "buscando" | "error">("idle");
  const yo = useUbicacion();

  const elegir = (slug: string) => {
    setSel(slug);
    setEnfocado(true);
    setAbierto(false);
    setQ("");
  };

  const resultados = useMemo(() => {
    const nq = normalizar(q);
    if (!nq) return [];
    return showrooms.filter((s) => normalizar(`${s.ciudad} ${s.provincia} ${s.nombre}`).includes(nq)).slice(0, 6);
  }, [q, showrooms]);

  const ubicarme = () => {
    setGeoEstado("buscando");
    pedirUbicacion()
      .then((pos) => {
        const cerca = [...showrooms].sort((a, b) => distanciaKm(pos, a.geo) - distanciaKm(pos, b.geo))[0];
        if (cerca) elegir(cerca.slug);
        setGeoEstado("idle");
      })
      .catch(() => setGeoEstado("error"));
  };

  const idx = showrooms.findIndex((s) => s.slug === sel);
  const s = showrooms[idx] ?? showrooms[0];
  const mover = (d: number) => elegir(showrooms[(idx + d + showrooms.length) % showrooms.length].slug);

  return (
    <div className="grid border border-line md:grid-cols-12">
      {/* ─── Ficha + buscador ─── */}
      <div className="flex flex-col border-b border-line md:col-span-5 md:border-r md:border-b-0">
        {/* Buscador */}
        <div className="relative border-b border-line p-5 md:p-6">
          <div className="flex items-center gap-4">
            <label htmlFor="buscar-showroom" className="sr-only">
              Buscá tu ciudad o provincia
            </label>
            <input
              id="buscar-showroom"
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setAbierto(true);
              }}
              onKeyDown={(e) => e.key === "Enter" && resultados[0] && elegir(resultados[0].slug)}
              placeholder="Buscá tu ciudad o provincia"
              autoComplete="off"
              className="w-full bg-transparent font-display text-lg font-light outline-none placeholder:text-muted"
            />
            <button onClick={ubicarme} className="eyebrow shrink-0 transition-colors hover:text-fg" title="Elegir el showroom más cercano">
              {geoEstado === "buscando" ? "Ubicando…" : "⌖ Cerca mío"}
            </button>
          </div>
          {geoEstado === "error" && <p className="mt-2 text-xs text-muted">No pudimos obtener tu ubicación.</p>}
          <AnimatePresence>
            {abierto && q && (
              <motion.ul
                className="absolute inset-x-0 top-full z-30 border border-line bg-bg/95 backdrop-blur"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {resultados.length === 0 ? (
                  <li className="px-6 py-4 text-sm text-muted">No hay showrooms para “{q}”.</li>
                ) : (
                  resultados.map((r) => (
                    <li key={r.slug}>
                      <button onClick={() => elegir(r.slug)} className="flex w-full items-baseline justify-between px-6 py-3 text-left transition-colors hover:bg-surface">
                        <span className="font-display font-light">{r.ciudad}</span>
                        <span className="eyebrow">{r.provincia}</span>
                      </button>
                    </li>
                  ))
                )}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        {/* Ficha del showroom elegido */}
        <AnimatePresence mode="wait">
          <motion.div
            key={s.slug}
            className="flex flex-1 flex-col p-5 md:p-6"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5, ease: easeLux }}
          >
            <div className="relative aspect-[16/9] overflow-hidden bg-surface">
              {s.imagen ? (
                <Image src={s.imagen} alt={`Showroom ${s.ciudad}`} fill sizes="(min-width: 768px) 38vw, 100vw" className="object-cover" />
              ) : (
                <ImagenPendiente compacto texto="Foto próximamente" />
              )}
              {s.estado === "proximamente" && (
                <span className="absolute top-3 left-3 border border-accent bg-black/40 px-2 py-1 font-display text-[10px] tracking-[0.2em] text-white uppercase">Próximamente</span>
              )}
            </div>
            <p className="eyebrow mt-6">
              {s.provincia}
              {s.casaCentral && " · Casa central"}
            </p>
            <h2 className="mt-2 font-display text-3xl font-extralight md:text-4xl">{s.ciudad}</h2>
            <p className="mt-1 text-sm text-fg-soft">{s.nombre}</p>

            <dl className="mt-5 space-y-2 text-sm text-fg-soft">
              <div className="flex gap-3">
                <dt className="eyebrow w-20 shrink-0 pt-0.5">Dirección</dt>
                <dd>{s.direccion ?? <span className="text-muted">A confirmar</span>}</dd>
              </div>
              {s.horarios.length > 0 && (
                <div className="flex gap-3">
                  <dt className="eyebrow w-20 shrink-0 pt-0.5">Horario</dt>
                  <dd>
                    {s.horarios.map((h) => {
                      const f = formatearHorario(h);
                      return (
                        <span key={h.dias} className="block">
                          {f.dias} · {f.horas}
                        </span>
                      );
                    })}
                  </dd>
                </div>
              )}
            </dl>

            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
              {s.estado === "activo" && s.horarios.length > 0 && <OpenNow horarios={s.horarios} />}
              {yo && <DistanceFromYou geo={s.geo} />}
            </div>

            <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
              <Link href={`/showrooms/${s.slug}`} className="btn-outline !border-accent">
                Ver showroom
              </Link>
              {s.whatsapp && (
                <a href={`https://wa.me/${s.whatsapp}`} target="_blank" rel="noopener" className="btn-outline">
                  WhatsApp
                </a>
              )}
              <div className="ml-auto flex">
                <button onClick={() => mover(-1)} className="flex h-11 w-11 items-center justify-center border border-line-strong transition-colors hover:border-fg" aria-label="Showroom anterior">
                  ←
                </button>
                <button onClick={() => mover(1)} className="-ml-px flex h-11 w-11 items-center justify-center border border-line-strong transition-colors hover:border-fg" aria-label="Showroom siguiente">
                  →
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ─── Mapa ─── */}
      <div className="relative min-h-[460px] md:col-span-7 md:min-h-[600px]">
        <MapaIsometrico showrooms={showrooms} seleccionado={s.slug} enfocado={enfocado} onSeleccionar={elegir} />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
          <p className="eyebrow">
            {idx + 1} / {showrooms.length}
          </p>
          {enfocado && (
            <button onClick={() => setEnfocado(false)} className="eyebrow pointer-events-auto transition-colors hover:text-fg">
              ⤢ Ver todo el país
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
