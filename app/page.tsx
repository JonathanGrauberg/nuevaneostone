import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/cards/ProductCard";
import { Counter } from "@/components/home/Counter";
import { HomeHero } from "@/components/home/HomeHero";
import { ImageReveal, Reveal } from "@/components/motion/Reveal";
import { WordReveal } from "@/components/motion/WordReveal";
import { ShowroomFinder } from "@/components/showrooms/ShowroomFinder";
import { heroSlides, nosotros } from "@/data/home";
import { site } from "@/data/site";
import { getColecciones, getShowroomsResumen } from "@/lib/content";

const destacados = [
  { titulo: "Garantía de 5 años", texto: "Somos fabricantes: supervisamos cada proceso y respaldamos cada mueble por escrito." },
  { titulo: "Todo en un lugar", texto: "Marmolería premium propia para mesadas: menos proveedores, menos demoras." },
  { titulo: "Entrega en tiempo", texto: "Plazos confiables y acompañamiento desde el diseño hasta la colocación en obra." },
];

export default function Home() {
  const colecciones = getColecciones();
  const showrooms = getShowroomsResumen();

  return (
    <>
      <HomeHero slides={heroSlides} />

      {/* ─── 01 NOSOTROS ──────────────────────────────────── */}
      <section className="container-x grid gap-12 py-28 md:grid-cols-12 md:py-40">
        <ImageReveal className="relative aspect-[4/5] md:col-span-5">
          <Image src={nosotros.imagen} alt="Planta Neostone en el Parque Industrial de Crespo" fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
        </ImageReveal>
        <div className="flex flex-col justify-center md:col-span-6 md:col-start-7">
          <Reveal>
            <p className="eyebrow">01 — Nosotros</p>
          </Reveal>
          <WordReveal
            lines={[nosotros.titulo[0], nosotros.titulo[1].split(" ").map((w) => `*${w}*`).join(" ")]}
            className="mt-6 font-display text-3xl leading-tight font-extralight md:text-5xl"
            stagger={0.04}
          />
          {nosotros.texto.map((p, i) => (
            <Reveal key={i} delay={0.1 + i * 0.1}>
              <p className="mt-6 max-w-lg leading-relaxed text-fg-soft">{p}</p>
            </Reveal>
          ))}
          <Reveal delay={0.3} className="mt-12 grid grid-cols-3">
            {[
              { n: site.cifras.anios, p: "+", l: "Años" },
              { n: site.cifras.garantia, p: "", l: "Años de garantía" },
              { n: showrooms.length, p: "", l: "Showrooms" },
            ].map((c) => (
              <div key={c.l} className="border-t border-line pt-4">
                <p className="font-display text-4xl font-extralight md:text-5xl">
                  <Counter to={c.n} prefix={c.p} />
                </p>
                <p className="eyebrow mt-2">{c.l}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ─── 02 COLECCIONES ───────────────────────────────── */}
      <section className="pb-28 md:pb-40">
        <div className="container-x mb-10 flex items-end justify-between">
          <div>
            <p className="eyebrow">02 — Colecciones</p>
            <WordReveal lines={["Una colección para cada", "*forma* *de* *habitar.*"]} className="mt-6 font-display text-3xl leading-tight font-extralight md:text-5xl" />
          </div>
          <Link href="/colecciones" className="link-line hidden md:inline-flex">
            Ver todas →
          </Link>
        </div>
        <div className="no-scrollbar flex snap-x gap-px overflow-x-auto px-[clamp(20px,5vw,80px)]">
          {colecciones.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.06} className="w-[70vw] shrink-0 snap-start sm:w-[42vw] lg:w-[23vw]">
              <ProductCard href={`/colecciones/${c.slug}`} nombre={c.nombre} bajada={c.bajada} imagen={c.portada} indice={i} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─── 03 EXPERIENCIA VR ────────────────────────────── */}
      <section className="relative h-[80svh] min-h-[520px] overflow-hidden">
        <Image src={colecciones.find((c) => c.slug === "london")?.renders[0]?.src ?? heroSlides[0]} alt="" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, var(--bg) 15%, color-mix(in srgb, var(--bg) 40%, transparent) 60%, transparent)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, var(--bg), transparent 30%, transparent 70%, var(--bg))" }} />
        <div className="container-x relative flex h-full flex-col justify-center">
          <p className="eyebrow">03 — Experiencia VR</p>
          <WordReveal lines={["Viví tu cocina", "*antes* *de* *que* *exista.*"]} className="mt-6 max-w-xl font-display text-4xl leading-tight font-extralight md:text-6xl" />
          <Reveal delay={0.3}>
            <p className="mt-6 max-w-md text-fg-soft">
              Con lentes de realidad virtual recorrés tu proyecto en escala real: abrís cajones, mirás texturas y confirmás cada detalle antes de fabricarlo.
            </p>
            <Link href="/experiencia-vr" className="group mt-10 inline-flex items-center gap-4 font-display text-[11px] tracking-[0.24em] uppercase">
              <span className="flex h-12 w-12 items-center justify-center border border-fg transition-colors duration-500 group-hover:bg-fg group-hover:text-bg">▶</span>
              Explorar en 360°
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ─── 04 POR QUÉ NEOSTONE ──────────────────────────── */}
      <section className="container-x py-28 md:py-40">
        <div className="mb-14 flex items-end justify-between">
          <p className="eyebrow">04 — Por qué Neostone</p>
          <Link href="/beneficios" className="link-line">
            Beneficios →
          </Link>
        </div>
        <div className="grid md:grid-cols-3">
          {destacados.map((d, i) => (
            <Reveal key={d.titulo} delay={i * 0.1} className="border-t border-line py-8 md:border-t-0 md:border-l md:px-10 md:first:border-l-0 md:first:pl-0">
              <p className="font-display text-[11px] tracking-[0.32em] text-accent">0{i + 1}</p>
              <h3 className="mt-5 font-display text-2xl font-light">{d.titulo}</h3>
              <p className="mt-4 leading-relaxed text-fg-soft">{d.texto}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─── 05 SHOWROOMS ─────────────────────────────────── */}
      <section className="border-t border-line">
        <div className="container-x grid gap-12 py-28 md:grid-cols-12 md:py-36">
          <div className="md:col-span-5">
            <p className="eyebrow">05 — Showrooms</p>
            <WordReveal lines={[`${showrooms.length} ciudades.`, "*Uno* *cerca* *tuyo.*"]} className="mt-6 font-display text-4xl leading-tight font-extralight md:text-5xl" />
          </div>
          <div className="md:col-span-6 md:col-start-7 md:pt-4">
            <ShowroomFinder showrooms={showrooms} variante="compacto" />
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────── */}
      <section className="border-t border-line">
        <div className="container-x flex flex-col items-start justify-between gap-10 py-24 md:flex-row md:items-center">
          <WordReveal lines={["Empecemos", "*tu* *proyecto.*"]} className="font-display text-4xl leading-tight font-extralight md:text-6xl" />
          <Link href="/presupuesto" className="btn-outline !border-accent">
            Solicitar presupuesto
          </Link>
        </div>
      </section>
    </>
  );
}
