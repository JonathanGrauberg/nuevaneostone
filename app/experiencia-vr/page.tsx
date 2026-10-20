import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { WordReveal } from "@/components/motion/WordReveal";
import { VrHero } from "@/components/vr/VrHero";
import { VrPasos } from "@/components/vr/VrPasos";
import { VrPresentacion } from "@/components/vr/VrPresentacion";
import { site } from "@/data/site";
import { vr } from "@/data/vr";
import { getShowrooms } from "@/lib/content";

export const metadata: Metadata = {
  title: "Experiencia VR",
  description:
    "Viví tu cocina antes de tenerla: con lentes de realidad virtual recorrés tu proyecto Neostone en escala real. Primera y única en el rubro en el país.",
  openGraph: { images: [vr.pasos[2].poster] },
};

export default function ExperienciaVrPage() {
  const showrooms = getShowrooms().length;

  return (
    <>
      <VrHero sello={vr.sello} titulo={vr.titulo} bajada={vr.bajada} portal={vr.portal} persona={vr.persona} />

      <VrPasos pasos={vr.pasos} />

      <VrPresentacion {...vr.presentacion} />

      {/* ─── El equipo ─── */}
      <section className="container-x pb-28">
        <div className="mb-10 flex items-end justify-between border-b border-line pb-5">
          <p className="eyebrow">La tecnología</p>
          <p className="eyebrow hidden md:block">Equipos de última generación en cada showroom</p>
        </div>
        <div className="grid gap-px sm:grid-cols-3">
          {vr.equipo.map((e, i) => (
            <Reveal key={e.imagen} delay={i * 0.08}>
              <figure className="group relative aspect-[4/5] overflow-hidden bg-surface">
                <Image src={e.imagen} alt={e.titulo} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover transition-transform duration-[1400ms] ease-lux group-hover:scale-105" />
                <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <figcaption className="absolute bottom-5 left-5 font-display text-[11px] tracking-[0.24em] text-white uppercase">{e.titulo}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─── Reservar ─── */}
      <section id="reservar" className="scroll-mt-20 border-t border-line">
        <div className="container-x grid gap-10 py-24 md:grid-cols-12 md:items-end md:py-32">
          <div className="md:col-span-7">
            <p className="eyebrow">Reservá tu experiencia</p>
            <WordReveal
              lines={["Vení a vivirla", "*en* *el* *showroom.*"]}
              className="mt-5 font-display text-4xl leading-tight font-extralight md:text-6xl"
            />
            <p className="mt-6 max-w-md text-fg-soft">
              Disponible en nuestros showrooms de todo el país. Coordiná tu visita y llevá las medidas de tu espacio: armamos tu proyecto para que lo recorras.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:col-span-5 md:justify-end">
            <Link href="/showrooms" className="btn-outline !border-accent">
              Ver {showrooms} showrooms
            </Link>
            <a href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hola, quiero reservar la experiencia de realidad virtual.")}`} target="_blank" rel="noopener" className="btn-outline">
              Reservar por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
