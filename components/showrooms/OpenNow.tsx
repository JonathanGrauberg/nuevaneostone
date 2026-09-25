"use client";

import { useSyncExternalStore } from "react";
import { estaAbierto } from "@/lib/horarios";
import type { Showroom } from "@/lib/schemas";

const noop = () => () => {};

/** "Abierto ahora / Cerrado ahora". Se calcula en el navegador (la página es estática). */
export function OpenNow({ horarios }: { horarios: Showroom["horarios"] }) {
  const abierto = useSyncExternalStore(noop, () => estaAbierto(horarios), () => null);
  if (abierto === null) return <span className="eyebrow">&nbsp;</span>;
  return (
    <span className={`eyebrow inline-flex items-center gap-2 ${abierto ? "!text-accent" : ""}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${abierto ? "animate-pulse bg-accent" : "bg-muted"}`} />
      {abierto ? "Abierto ahora" : "Cerrado ahora"}
    </span>
  );
}
