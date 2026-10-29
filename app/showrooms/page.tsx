import type { Metadata } from "next";
import Image from "next/image";
import { WordReveal } from "@/components/motion/WordReveal";
import { Reveal } from "@/components/motion/Reveal";
import { ShowroomExplorer } from "@/components/showrooms/ShowroomExplorer";
import { ShowroomFinder } from "@/components/showrooms/ShowroomFinder";
import { getShowroomsMapa, getShowroomsResumen } from "@/lib/content";

// La descripción se arma con las provincias reales de data/showrooms.ts.
export function generateMetadata(): Metadata {
  const provincias = [...new Set(getShowroomsResumen().map((s) => s.provincia))].sort((a, b) => a.localeCompare(b, "es"));
  return {
    title: "Showrooms",
    description: `Encontrá el showroom Neostone más cercano. Presencia en ${provincias.slice(0, -1).join(", ")} y ${provincias.at(-1)}.`,
  };
}

export default function ShowroomsPage() {
  const showrooms = getShowroomsResumen();
  // Las cifras cuentan solo los abiertos (los "próximamente" se listan pero no suman)
  const abiertos = showrooms.filter((s) => s.estado === "activo");
  const provincias = new Set(abiertos.map((s) => s.provincia)).size;
  return (
    <>
      {/* ─── Portada: paisaje de la Patagonia ─── */}
      <section className="force-dark relative h-[78svh] min-h-[540px] overflow-hidden">
        <Image src="/images/showrooms/portada-patagonia.jpg" alt="Paisaje de Bariloche, Patagonia argentina" fill priority sizes="100vw" quality={90} className="object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, color-mix(in srgb, var(--bg) 80%, transparent) 0%, color-mix(in srgb, var(--bg) 35%, transparent) 55%, transparent 85%)" }} />
        <div className="absolute inset-x-0 top-0 h-40" style={{ background: "linear-gradient(180deg, color-mix(in srgb, var(--bg) 70%, transparent), transparent)" }} />
        {/* Oscuro detrás del texto (siempre legible) + fundido corto al color de la página */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, color-mix(in srgb, var(--bg) 75%, transparent) 0%, transparent 55%)" }} />
        <div className="fundido-pagina absolute inset-0" />
        <div className="container-x relative flex h-full flex-col justify-end pb-28 md:pb-32">
          <p className="eyebrow">Showrooms</p>
          <WordReveal
            as="h1"
            trigger="mount"
            lines={[`${abiertos.length} ciudades.`, "*Uno* *cerca* *tuyo.*"]}
            className="mt-5 font-display text-5xl leading-[1.05] font-extralight md:text-7xl"
          />
          <Reveal delay={0.4}>
            <p className="mt-6 max-w-lg text-lg text-fg-soft">
              Vení a tocar los materiales, ver las terminaciones en persona y vivir tu proyecto en realidad virtual. Estamos en {provincias} provincias.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="container-x pt-10 pb-28">
        <div id="mapa" className="scroll-mt-24" />
        <ShowroomExplorer showrooms={getShowroomsMapa()} inicial="crespo" />

        <div className="mt-28 mb-10 flex items-end justify-between border-b border-line pb-5">
          <p className="eyebrow">Todos los showrooms</p>
          <p className="eyebrow hidden md:block">Ordenados por cercanía si compartís tu ubicación</p>
        </div>
        <ShowroomFinder showrooms={showrooms} buscador={false} />
      </div>
    </>
  );
}
