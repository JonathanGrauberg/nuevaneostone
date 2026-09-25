"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import type { ShowroomResumen } from "@/lib/content";
import { distanciaKm, formatDistancia, normalizar } from "@/lib/geo";
import { pedirUbicacion, useUbicacion } from "@/lib/ubicacion";
import { ShowroomCard } from "@/components/cards/ShowroomCard";
import { easeLux } from "@/components/motion/Reveal";

type Props = {
  showrooms: ShowroomResumen[];
  /** "grid" = página de showrooms; "compacto" = bloque del home. */
  variante?: "grid" | "compacto";
};

export function ShowroomFinder({ showrooms, variante = "grid" }: Props) {
  const [q, setQ] = useState("");
  // Ubicación compartida con las páginas de showroom (se guarda en el navegador).
  const yo = useUbicacion();
  const [geoEstado, setGeoEstado] = useState<"idle" | "buscando" | "error">("idle");

  const resultados = useMemo(() => {
    const nq = normalizar(q);
    let lista = showrooms
      .filter((s) => !nq || normalizar(`${s.ciudad} ${s.provincia} ${s.nombre}`).includes(nq))
      .map((s) => ({ s, km: yo ? distanciaKm(yo, s.geo) : undefined }));
    if (yo) lista = lista.sort((a, b) => a.km! - b.km!);
    return lista;
  }, [q, yo, showrooms]);

  const ubicarme = () => {
    setGeoEstado("buscando");
    pedirUbicacion()
      .then(() => setGeoEstado("idle"))
      .catch(() => setGeoEstado("error"));
  };

  const buscador = (
    <div className="flex flex-col gap-4 border-b border-fg pb-3 sm:flex-row sm:items-center">
      <label className="sr-only" htmlFor={`buscar-${variante}`}>
        Buscá tu ciudad o provincia
      </label>
      <input
        id={`buscar-${variante}`}
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Buscá tu ciudad o provincia"
        className="w-full bg-transparent font-display text-lg font-light outline-none placeholder:text-muted md:text-2xl"
        autoComplete="off"
      />
      <button onClick={ubicarme} className="eyebrow shrink-0 text-left transition-colors hover:text-fg">
        {geoEstado === "buscando" ? "Ubicando…" : yo ? "✓ Ordenado por cercanía" : "⌖ Usar mi ubicación"}
      </button>
    </div>
  );

  const vacio = (
    <p className="py-10 text-fg-soft">
      No encontramos showrooms para “{q}”.{" "}
      <Link href="/presupuesto" className="underline decoration-accent underline-offset-4">
        Escribinos y te asesoramos a distancia.
      </Link>
    </p>
  );

  if (variante === "compacto") {
    const lista = q || yo ? resultados.slice(0, 5) : [];
    return (
      <div>
        {buscador}
        {geoEstado === "error" && <p className="mt-3 text-sm text-muted">No pudimos obtener tu ubicación.</p>}
        {q && lista.length === 0 ? (
          vacio
        ) : lista.length > 0 ? (
          <ul className="mt-2">
            {lista.map(({ s, km }) => (
              <li key={s.slug} className="border-b border-line">
                <Link href={`/showrooms/${s.slug}`} className="group flex items-baseline justify-between py-4">
                  <span className="font-display text-lg font-light transition-transform duration-500 ease-lux group-hover:translate-x-2">
                    {s.ciudad} <span className="text-sm text-muted">· {s.provincia}</span>
                  </span>
                  <span className="eyebrow">{km !== undefined ? formatDistancia(km) : "Ver →"}</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-5 text-sm leading-loose text-fg-soft">
            {showrooms.slice(0, 7).map((s, i) => (
              <span key={s.slug}>
                {i > 0 && " · "}
                <Link href={`/showrooms/${s.slug}`} className="transition-colors hover:text-fg">
                  {s.ciudad}
                </Link>
              </span>
            ))}
            {showrooms.length > 7 && (
              <Link href="/showrooms" className="ml-2 text-fg">
                +{showrooms.length - 7}
              </Link>
            )}
          </p>
        )}
      </div>
    );
  }

  return (
    <div>
      {buscador}
      {geoEstado === "error" && <p className="mt-3 text-sm text-muted">No pudimos obtener tu ubicación. Buscá tu ciudad arriba.</p>}
      <p className="eyebrow mt-6 mb-8">
        {resultados.length} {resultados.length === 1 ? "showroom" : "showrooms"}
      </p>
      {resultados.length === 0 ? (
        vacio
      ) : (
        <motion.ul layout className="grid gap-px sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {resultados.map(({ s, km }) => (
              <motion.li
                key={s.slug}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.6, ease: easeLux }}
              >
                <ShowroomCard s={s} km={km} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}
    </div>
  );
}
