/**
 * Íconos de línea de "Qué resolvemos" (maqueta de Desarrollos). Los trazos se dibujan
 * al entrar en pantalla (.sd-draw) y el punto rojo late (.sd-pulse); ver globals.css.
 */
export type IconoDesarrollo = "reloj" | "capas" | "persona" | "etapas";

const trazos: Record<IconoDesarrollo, { lineas: React.ReactNode; punto: [number, number] }> = {
  reloj: {
    lineas: (
      <>
        <circle cx="24" cy="24" r="17" pathLength={1} />
        <path d="M24 13v11l8 5" pathLength={1} />
      </>
    ),
    punto: [24, 24],
  },
  capas: {
    lineas: (
      <>
        <path d="M24 7l17 8.5L24 24 7 15.5z" pathLength={1} />
        <path d="M7 24l17 8.5L41 24" pathLength={1} />
        <path d="M7 32.5L24 41l17-8.5" pathLength={1} />
      </>
    ),
    punto: [24, 15.5],
  },
  persona: {
    lineas: (
      <>
        <circle cx="24" cy="16" r="7" pathLength={1} />
        <path d="M10 40c1.8-8 7.4-12 14-12s12.2 4 14 12" pathLength={1} />
      </>
    ),
    punto: [24, 16],
  },
  etapas: {
    lineas: (
      <>
        <path d="M6 40h10v-9h10v-9h10v-9h6" pathLength={1} />
        <path d="M6 40h36" pathLength={1} />
      </>
    ),
    punto: [42, 13],
  },
};

export function IconoResolvemos({ icono }: { icono: IconoDesarrollo }) {
  const { lineas, punto } = trazos[icono];
  return (
    <svg
      className="sd-draw size-[52px]"
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {lineas}
      <circle className="sd-pulse" cx={punto[0]} cy={punto[1]} r={1.8} fill="var(--accent)" stroke="none" />
    </svg>
  );
}
