import type { Metadata } from "next";
import Image from "next/image";
import { IconoResolvemos } from "@/components/desarrollos/IconoResolvemos";
import { Formulario } from "@/components/forms/Formulario";
import { ImageReveal, Reveal } from "@/components/motion/Reveal";
import { WordReveal } from "@/components/motion/WordReveal";
import { desarrollos as d } from "@/data/desarrollos";
import { formularios } from "@/data/formularios";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Desarrollos",
  description: d.hero.bajada,
  openGraph: { images: [d.hero.imagenes[1]] },
};

/** Texto con palabras entre *asteriscos* en peso medio (como WordReveal, sin animación). */
function Resaltado({ texto }: { texto: string }) {
  return texto.split(" ").map((w, i) => (
    <span key={i} className={w.startsWith("*") ? "font-normal" : undefined}>
      {i > 0 && " "}
      {w.replaceAll("*", "")}
    </span>
  ));
}

const titulo = "font-display text-4xl leading-[1.1] font-extralight md:text-5xl";

// Mosaico de 6 fotos: alta, ancha, alta / panorámica / dos medias (en celular, 2 columnas)
const mosaico = [
  "row-span-2",
  "col-span-2 row-span-2",
  "row-span-2",
  "col-span-2 md:col-span-4 md:row-span-2",
  "col-span-2 row-span-2",
  "col-span-2 row-span-2",
];

export default function DesarrollosPage() {
  const consulta = formularios.desarrollos;

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="container-x grid items-center gap-14 pt-36 pb-20 md:grid-cols-2 md:pt-44 md:pb-24">
        <div>
          <p className="eyebrow">{d.hero.eyebrow}</p>
          <WordReveal as="h1" trigger="mount" lines={d.hero.titulo} className="mt-6 font-display text-[40px] leading-[1.05] font-extralight sm:text-5xl md:text-[64px] xl:text-7xl" />
          <Reveal delay={0.4}>
            <span className="mt-9 block h-px w-14 bg-accent" />
            <p className="mt-8 max-w-md text-lg leading-relaxed text-fg-soft">{d.hero.bajada}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href="#consulta" className="btn-accent">
                Consultá por tu proyecto
              </a>
              <a href="#proyectos" className="btn-outline">
                Ver proyectos
              </a>
            </div>
          </Reveal>
        </div>
        {/* Tres torres escalonadas */}
        <div className="grid h-[420px] grid-cols-3 gap-2 md:h-[600px]">
          {d.hero.imagenes.map((src, i) => (
            <ImageReveal key={src} delay={0.2 + i * 0.12} className={`relative overflow-hidden ${["mt-[22%]", "", "my-[11%]"][i]}`}>
              <Image src={src} alt="" fill priority sizes="(min-width: 768px) 16vw, 33vw" className="object-cover" />
            </ImageReveal>
          ))}
        </div>
      </section>

      {/* ─── Cifras ─── */}
      <section className="border-y border-line">
        <div className="container-x grid divide-line sm:grid-cols-3 sm:divide-x">
          {d.cifras.map((c, i) => (
            <Reveal key={c.detalle} delay={i * 0.08} className={`py-10 sm:px-10 sm:first:pl-0 ${i > 0 ? "border-t border-line sm:border-t-0" : ""}`}>
              <p className="font-display text-4xl font-extralight">
                <Resaltado texto={c.valor} />
              </p>
              <p className="eyebrow mt-3">{c.detalle}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─── 01 Proyectos ─── */}
      <section id="proyectos" className="container-x scroll-mt-20 py-28 md:py-36">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="eyebrow">01 · Proyectos</p>
            <WordReveal lines={d.proyectos.titulo} className={`mt-5 ${titulo}`} />
          </div>
          <Reveal className="max-w-sm leading-relaxed text-fg-soft md:col-span-4 md:col-start-9">{d.proyectos.bajada}</Reveal>
        </div>
        <div className="mt-14 grid grid-flow-dense auto-rows-[200px] grid-cols-2 gap-2 md:auto-rows-[300px] md:grid-cols-4 md:gap-3">
          {d.proyectos.fotos.map((src, i) => (
            <ImageReveal key={src} delay={(i % 3) * 0.08} className={`group relative overflow-hidden bg-surface ${mosaico[i]}`}>
              <Image
                src={src}
                alt="Desarrollo equipado por Neostone"
                fill
                sizes={i === 3 ? "100vw" : "(min-width: 768px) 50vw, 100vw"}
                className="object-cover transition-transform duration-[1200ms] ease-lux group-hover:scale-[1.04]"
              />
            </ImageReveal>
          ))}
        </div>
      </section>

      {/* ─── 02 Qué resolvemos ─── */}
      <section className="border-y border-line bg-surface">
        <div className="container-x py-24 md:py-32">
          <p className="eyebrow mb-16">02 · Qué resolvemos</p>
          <div className="sd-stagger grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {d.resolvemos.map((p, i) => (
              <div key={p.titulo} className="sd-up group flex flex-col">
                <IconoResolvemos icono={p.icono} />
                <span className="sd-grow mt-9 block h-0.5 bg-accent transition-[filter] group-hover:brightness-125" />
                <span className="mt-5 font-display text-[13px] tracking-[0.2em] text-accent">0{i + 1}</span>
                <h3 className="mt-3 font-display text-[22px] leading-snug font-normal">{p.titulo}</h3>
                <p className="mt-3 leading-relaxed text-fg-soft">{p.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 03 Procedimiento de trabajo ─── */}
      <section className="container-x py-28 md:py-36">
        <p className="eyebrow mb-16">03 · Procedimiento de trabajo</p>
        {/* Línea que se completa en rojo a medida que se baja */}
        <div className="relative h-px bg-line-strong">
          <span className="sd-grow absolute inset-x-0 -top-px h-[3px] bg-accent" />
        </div>
        <ol className="sd-stagger grid grid-cols-2 gap-x-5 sm:grid-cols-4 lg:grid-cols-7">
          {d.procedimiento.map((p, i) => (
            <li key={p.titulo} className="sd-up pt-7 pb-2">
              <p className="font-display text-xs tracking-[0.24em] text-accent">0{i + 1}</p>
              <h3 className="mt-3.5 font-display text-[19px] leading-snug font-normal">{p.titulo}</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-fg-soft">{p.texto}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ─── 04 Consulta ─── */}
      <section id="consulta" className="scroll-mt-16 border-t border-line md:grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div className="relative hidden bg-black md:block">
          <Image src={d.consulta.imagen} alt="" fill sizes="42vw" className="object-cover opacity-60" />
        </div>
        <div className="container-x py-24 md:px-16 md:py-28 lg:px-24">
          <p className="eyebrow">{consulta.eyebrow}</p>
          <WordReveal lines={consulta.titulo} className={`mt-5 ${titulo}`} />
          <p className="mt-5 mb-12 max-w-lg leading-relaxed text-fg-soft">{consulta.bajada}</p>
          <Formulario datos={consulta} />
        </div>
      </section>

      {/* ─── Cierre ─── */}
      <section className="container-x border-t border-line py-28 text-center md:py-36">
        <WordReveal lines={d.cierre} className="mx-auto font-display text-3xl leading-tight font-extralight md:text-5xl" />
        <Reveal delay={0.2} className="mt-10 flex justify-center gap-3">
          <a href="#consulta" className="btn-accent">
            Consultá por tu proyecto
          </a>
          <a href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hola Neostone, quiero consultar por un desarrollo.")}`} target="_blank" rel="noopener" className="btn-outline hidden sm:inline-block">
            Escribinos por WhatsApp
          </a>
        </Reveal>
      </section>
    </>
  );
}
