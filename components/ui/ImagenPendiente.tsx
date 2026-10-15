/**
 * Lugar reservado para una foto que todavía no se cargó. Ocupa el contenedor
 * (que debe ser `relative` con tamaño definido) y se ve como parte del diseño.
 * alinear="esquina" deja la leyenda abajo a la derecha (para fondos de hero con texto encima).
 */
export function ImagenPendiente({
  texto = "Imagen próximamente",
  compacto = false,
  alinear = "centro",
}: {
  texto?: string;
  compacto?: boolean;
  alinear?: "centro" | "esquina";
}) {
  return (
    <div
      className={`absolute inset-0 flex bg-surface ${
        alinear === "centro" ? "items-center justify-center" : "items-end justify-end p-8 pb-16 md:p-14 md:pb-16"
      }`}
      style={{
        backgroundImage: "repeating-linear-gradient(135deg, var(--line) 0px, var(--line) 1px, transparent 1px, transparent 14px)",
      }}
    >
      <div className={`relative z-10 flex flex-col items-center bg-surface text-center ${compacto ? "gap-1.5 px-3 py-2" : "gap-3 px-6 py-4"}`}>
        <span className={`block h-px bg-accent ${compacto ? "w-4" : "w-8"}`} />
        <span className={`eyebrow ${compacto ? "!text-[9px]" : ""}`}>{texto}</span>
      </div>
    </div>
  );
}
