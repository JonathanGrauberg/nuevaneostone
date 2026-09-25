"use client";

import { useEffect, useState } from "react";
import { distanciaKm, formatDistancia, type LatLng } from "@/lib/geo";
import { pedirUbicacion, permisoConcedido, useUbicacion } from "@/lib/ubicacion";

/** "Estás a 12 km" — sutil. Si no hay ubicación, ofrece calcularla con un clic. */
export function DistanceFromYou({ geo, className = "" }: { geo: LatLng; className?: string }) {
  const yo = useUbicacion();
  const [estado, setEstado] = useState<"idle" | "buscando" | "error">("idle");

  // Si el permiso ya estaba concedido, se calcula sola, sin mostrar ningún aviso.
  useEffect(() => {
    if (yo) return;
    permisoConcedido().then((ok) => {
      if (ok) pedirUbicacion().catch(() => {});
    });
  }, [yo]);

  if (yo) {
    return (
      <span className={`eyebrow inline-flex items-center gap-2 ${className}`}>
        <span className="inline-block h-px w-5 bg-accent" />
        Estás a <span className="text-fg">{formatDistancia(distanciaKm(yo, geo))}</span>
      </span>
    );
  }

  return (
    <button
      onClick={() => {
        setEstado("buscando");
        pedirUbicacion().catch(() => setEstado("error"));
      }}
      className={`eyebrow inline-flex items-center gap-2 transition-colors hover:text-fg ${className}`}
    >
      <span className="inline-block h-px w-5 bg-line-strong" />
      {estado === "buscando" ? "Calculando…" : estado === "error" ? "Ubicación no disponible" : "⌖ ¿A qué distancia estás?"}
    </button>
  );
}
