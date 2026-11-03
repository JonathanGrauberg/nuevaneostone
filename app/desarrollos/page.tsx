import type { Metadata } from "next";
import Image from "next/image";
import { ProyectosMosaico } from "@/components/desarrollos/ProyectosMosaico";
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

export default function DesarrollosPage() {
  const consulta = formularios.desarrollos;

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="container-x grid items-center gap-14 pt-36 pb-20 md:grid-cols-2 md:pt-44 md:pb-24">
        <div>
          <p className="eyebrow">{d.hero.eyebrow}</p>
          <WordReveal as="h1" trigger="mount" lines={d.hero.titulo} className="mt-6 font-display text-5xl leading-[1.05] font-extralight md:text-7xl" />
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
        <div className="grid grid-cols-3 items-start gap-2">
          {d.hero.imagenes.map((src, i) => (
            <ImageReveal key={src} delay={0.2 + i * 0.12} className={`relative overflow-hidden ${["mt-[18%] aspect-[9/24]", "aspect-[9/29]", "mt-[9%] aspect-[9/24]"][i]}`}>
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
        <ProyectosMosaico lista={d.proyectos.lista} visibles={d.proyectos.visibles} />
      </section>

      {/* ─── 02 En cada unidad ─── */}
      <section className="container-x grid items-center gap-14 pb-28 md:grid-cols-12 md:pb-40">
        <div className="md:col-span-5">
          <p className="eyebrow">02 · En cada unidad</p>
          <WordReveal lines={d.unidad.titulo} className={`mt-5 ${titulo}`} />
          <Reveal>
            <p className="mt-7 max-w-sm leading-relaxed text-fg-soft">{d.unidad.bajada}</p>
          </Reveal>
        </div>
        <div className="grid grid-cols-2 items-start gap-2 md:col-span-7">
          {d.unidad.imagenes.map((src, i) => (
            <ImageReveal key={src} delay={i * 0.12} className={`relative aspect-[6/7] overflow-hidden ${i ? "mt-[14%]" : ""}`}>
              <Image src={src} alt="Cocina fabricada en serie por Neostone" fill sizes="(min-width: 768px) 30vw, 50vw" className="object-cover" />
            </ImageReveal>
          ))}
        </div>
      </section>

      {/* ─── 03 Qué resolvemos ─── */}
      <section className="bg-surface">
        <div className="container-x grid gap-14 py-24 md:grid-cols-2 md:gap-20 md:py-32">
          <div>
            <p className="eyebrow">03 · Qué resolvemos</p>
            <WordReveal lines={d.resolvemos.titulo} className={`mt-5 ${titulo}`} />
            <ImageReveal className="relative mt-10 aspect-[5/3] overflow-hidden">
              <Image src={d.resolvemos.imagen} alt="Frente de Neostone en el Parque Industrial de Crespo" fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" />
            </ImageReveal>
          </div>
          <ol className="border-t border-line">
            {d.resolvemos.puntos.map((p, i) => (
              <Reveal key={p.titulo} delay={i * 0.08}>
                <li className="flex gap-6 border-b border-line py-7">
                  <span className="pt-2 font-display text-[11px] tracking-[0.2em] text-accent">0{i + 1}</span>
                  <div>
                    <h3 className="font-display text-xl font-normal">{p.titulo}</h3>
                    <p className="mt-2 leading-relaxed text-fg-soft">{p.texto}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ─── 04 Cómo trabajamos ─── */}
      <section className="container-x py-28 md:py-36">
        <p className="eyebrow">04 · Cómo trabajamos</p>
        <WordReveal lines={d.proceso.titulo} className={`mt-5 ${titulo}`} />
        <ol className="mt-14 grid gap-x-8 gap-y-10 border-t border-line grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
          {d.proceso.pasos.map((p, i) => (
            <Reveal key={p.titulo} delay={i * 0.06}>
              <li className={`-mt-px border-t pt-6 ${i === 0 ? "border-accent" : "border-transparent"}`}>
                <span className="font-display text-[11px] tracking-[0.2em] text-muted">0{i + 1}</span>
                <h3 className="mt-3 font-display text-lg font-normal">{p.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-soft">{p.texto}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* ─── 05 Consulta ─── */}
      <section id="consulta" className="scroll-mt-16 border-t border-line md:grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div className="relative hidden md:block">
          <Image src={d.consulta.imagen} alt="" fill sizes="42vw" className="object-cover" />
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
