import type { CSSProperties } from "react";

export type Pilar = "entrega" | "atencion" | "garantia" | "virtual" | "integral" | "sustentabilidad";

/** Desplazamiento desde el que llega cada módulo del ícono "todo en un mismo lugar". */
const d = (dx: number, dy: number, delay?: string) => ({ "--dx": `${dx}px`, "--dy": `${dy}px`, animationDelay: delay }) as CSSProperties;

/**
 * Íconos animados de los pilares (estilos en globals.css, bloque "Íconos de los pilares").
 * Se dibujan al montarse: para repetir la animación, volver a montarlos (cambiar la key).
 */
export function IconoPilar({ pilar, className }: { pilar: Pilar; className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={`ns-icon ${className ?? ""}`} aria-hidden>
      {iconos[pilar]}
    </svg>
  );
}

const iconos: Record<Pilar, React.ReactNode> = {
  entrega: (
    <>
      <circle className="ns-s ns-d" cx="32" cy="32" r="22" pathLength={1} />
      <path className="ns-s ns-d" d="M51 32h3M32 51v3M13 32h-3" pathLength={1} style={{ animationDelay: ".6s", animationDuration: ".6s" }} />
      <path className="ns-s ns-r ns-d ns1-mark" d="M32 10v5" pathLength={1} />
      <path className="ns-s" d="M32 32l6.5 5" style={{ animation: "nsFade .6s ease .4s both" }} />
      <g className="ns-t ns1-hand">
        <path className="ns-s" d="M32 33.5V17" />
      </g>
      <circle className="ns-f" cx="32" cy="32" r="1.6" style={{ animation: "nsFade .4s ease .4s both" }} />
    </>
  ),
  atencion: (
    <>
      <path className="ns-s ns-r ns-d ns2-a" d="M28 40v-4a4 4 0 0 1 8 0v8" pathLength={1} style={{ animationDelay: "0s,2.2s" }} />
      <path className="ns-s ns-d ns2-a" d="M23 42v-6a9 9 0 0 1 18 0v4" pathLength={1} style={{ animationDelay: ".18s,2.5s" }} />
      <path className="ns-s ns-d ns2-a" d="M18 44v-8a14 14 0 0 1 28 0v6" pathLength={1} style={{ animationDelay: ".36s,2.8s" }} />
      <path className="ns-s ns-d ns2-a" d="M13 40v-4a19 19 0 0 1 38 0v1" pathLength={1} style={{ animationDelay: ".54s,3.1s" }} />
      <path className="ns-s ns-d ns2-a" d="M14.5 20.5a24 24 0 0 1 35 0" pathLength={1} style={{ animationDelay: ".72s,3.4s" }} />
      <path className="ns-s ns-d ns2-a" d="M32 50v3" pathLength={1} style={{ animationDelay: ".3s,2.65s" }} />
    </>
  ),
  garantia: (
    <>
      <path className="ns-s ns-t ns3-ripple" d="M32 10l17 6v13c0 12-7.5 20.5-17 25-9.5-4.5-17-13-17-25V16z" />
      <path className="ns-s ns-d" d="M32 10l17 6v13c0 12-7.5 20.5-17 25-9.5-4.5-17-13-17-25V16z" pathLength={1} />
      <path
        className="ns-s ns-r ns-d"
        d="M37.5 22.5H28.5L27.5 31c1.4-.9 3.2-1.4 5-1.4 3.6 0 6 2.4 6 5.7 0 3.5-2.6 6-6.2 6-2.6 0-4.6-1.2-5.6-3.1"
        pathLength={1}
        style={{ animationDelay: "1s", animationDuration: "1.1s" }}
      />
    </>
  ),
  virtual: (
    <>
      <defs>
        <clipPath id="ns4-clip">
          <path d="M32 12l17.3 10v20L32 52 14.7 42V22z" />
        </clipPath>
      </defs>
      <g clipPath="url(#ns4-clip)">
        <rect className="ns-fr ns-t ns4-fill" x="8" y="10" width="48" height="42" style={{ fillOpacity: 0.12 }} />
        <path className="ns-s ns-r ns-t ns4-scan" d="M8 10h48" />
      </g>
      <path className="ns-s ns-d" d="M32 12l17.3 10v20L32 52 14.7 42V22z" pathLength={1} />
      <path className="ns-s ns-d" d="M14.7 22L32 32l17.3-10M32 32v20" pathLength={1} style={{ animationDelay: ".5s" }} />
      <path className="ns-s ns-d" d="M32 42l17.3-10" pathLength={1} style={{ animationDelay: "1s", animationDuration: ".6s" }} />
      <path className="ns-s ns-d" d="M28.5 36v5" pathLength={1} style={{ animationDelay: "1.2s", animationDuration: ".4s" }} />
      <path className="ns-s ns-d" d="M37.5 39.5l6.5-3.75M37.5 49.5l6.5-3.75" pathLength={1} style={{ animationDelay: "1.3s", animationDuration: ".4s" }} />
    </>
  ),
  integral: (
    <>
      <rect className="ns-s ns-d" x="13" y="13" width="38" height="38" rx=".5" pathLength={1} />
      {[
        [19, 19, -9, -9, "1s"],
        [33, 19, 9, -9, "1.15s"],
        [33, 33, 9, 9, "1.3s"],
        [19, 33, -9, 9, "1.45s"],
      ].map(([x, y, dx, dy, delay]) => (
        <g key={`${x}-${y}`} className="ns-t ns5-b" style={d(dx as number, dy as number)}>
          <rect className="ns-s ns-t ns5-m" x={x} y={y} width="12" height="12" style={d(dx as number, dy as number, delay as string)} />
        </g>
      ))}
      <circle className="ns-fr ns-t ns5-dot" cx="32" cy="32" r="1.5" />
    </>
  ),
  sustentabilidad: (
    <>
      <g className="ns-t ns6-leaf">
        <path className="ns-s ns-d" d="M18 46C18 27 29.5 14 49 14c0 19.5-11.5 32-31 32z" pathLength={1} style={{ animationDuration: "1.6s" }} />
        <path className="ns-s ns-r ns-d" d="M18 46L42 20" pathLength={1} style={{ animationDelay: ".8s", animationDuration: ".9s" }} />
        <path
          className="ns-s ns-d"
          d="M25.2 38.2l-1-7.2M30 33l-.6-8.4M34.8 27.8l-.2-7.2M25.2 38.2l7.2 1M30 33l8.4.6M34.8 27.8l7.2.2"
          pathLength={1}
          style={{ animationDelay: "1.3s", animationDuration: "1s" }}
        />
      </g>
      <path className="ns-s ns-d" d="M18 46l-5 5" pathLength={1} style={{ animationDelay: ".2s", animationDuration: ".5s" }} />
    </>
  ),
};
