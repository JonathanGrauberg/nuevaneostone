import Image from "next/image";
import Link from "next/link";
import { BeneficiosLista } from "@/components/beneficios/BeneficiosLista";
import { ColeccionesScroll } from "@/components/home/ColeccionesScroll";
import { Counter } from "@/components/home/Counter";
import { DelPlanoATuCasa } from "@/components/home/DelPlanoATuCasa";
import { HomeHero } from "@/components/home/HomeHero";
import { ImageReveal, Reveal } from "@/components/motion/Reveal";
import { WordReveal } from "@/components/motion/WordReveal";
import { ShowroomFinder } from "@/components/showrooms/ShowroomFinder";
import { beneficios } from "@/data/beneficios";
import { nosotros } from "@/data/home";
import { site } from "@/data/site";
import { getColecciones, getShowroomsResumen } from "@/lib/content";

export default function Home() {
  const colecciones = getColecciones();
  const showrooms = getShowroomsResumen();
  // Las cifras cuentan solo los abiertos (los "próximamente" se listan pero no suman)
  const abiertos = showrooms.filter((s) => s.estado === "activo").length;

  return (
    <>
      <HomeHero slides={colecciones.filter((c) => c.linea === "cocina").slice(0, 5).map((c) => c.hero)} />

      {/* ─── 01 COLECCIONES (carrusel con flechas) ────────── */}
      <ColeccionesScroll colecciones={colecciones.map(({ slug, nombre, bajada, portada }) => ({ slug, nombre, bajada, portada }))} />

      {/* ─── 02 EXPERIENCIA VR: del plano a tu casa ──────── */}
      <DelPlanoATuCasa />

      {/* ─── 03 NOSOTROS ──────────────────────────────────── */}
      {/* Foto del frente a sangre, con degradé hacia el texto (derecha) y contadores debajo */}
      <section className="container-x pt-24 pb-12 md:pt-36 md:pb-20">
        <div className="relative overflow-hidden bg-surface">
          <ImageReveal className="relative aspect-[4/3] md:absolute md:inset-y-0 md:left-0 md:aspect-auto md:w-[62%]">
            <Image
              src={nosotros.imagen}
              alt="Frente de la planta Neostone en el Parque Industrial de Crespo"
              fill
              sizes="(min-width: 768px) 60vw, 100vw"
              className="object-cover object-[38%_50%]"
            />
          </ImageReveal>
          {/* Degradé: en desktop de izquierda (foto) a derecha (texto); en mobile, de la foto hacia abajo */}
          <div
            className="pointer-events-none absolute inset-0 hidden md:block"
            style={{
              background:
                "linear-gradient(90deg, color-mix(in srgb, var(--bg) 15%, transparent) 0%, color-mix(in srgb, var(--bg) 35%, transparent) 30%, color-mix(in srgb, var(--bg) 85%, transparent) 50%, var(--bg) 60%)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 aspect-[4/3] md:hidden"
            style={{ background: "linear-gradient(0deg, var(--bg) 0%, transparent 45%)" }}
          />

          <div className="relative grid md:min-h-[600px] md:grid-cols-12">
            <div className="flex flex-col justify-center px-6 pb-12 md:col-span-6 md:col-start-7 md:py-20 md:pr-14 md:pl-0">
              <Reveal>
                <p className="eyebrow">03 — Nosotros</p>
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
              <Reveal delay={0.3}>
                <p className="mt-8 flex items-center gap-3 border-t border-line pt-6 font-display text-[11px] tracking-[0.24em] text-fg-soft uppercase">
                  <span className="h-1.5 w-1.5 shrink-0 bg-accent" aria-hidden />
                  {nosotros.planta}
                </p>
              </Reveal>
            </div>
          </div>

          {/* Contadores */}
          <Reveal className="relative grid grid-cols-3 border-t border-line bg-bg px-6 py-8 md:px-14 md:py-10">
            {[
              { n: site.cifras.anios, p: "+", l: "Años de experiencia" },
              { n: site.cifras.garantia, p: "", l: "Años de garantía" },
              { n: abiertos, p: "", l: "Showrooms en el país" },
            ].map((c) => (
              <div key={c.l}>
                <p className="font-display text-4xl font-extralight md:text-6xl">
                  <Counter to={c.n} prefix={c.p} />
                </p>
                <p className="eyebrow mt-3 leading-relaxed">{c.l}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ─── 04 BENEFICIOS NEOSTONE ─────────────────────── */}
      <section id="beneficios" className="container-x scroll-mt-20 py-28 md:py-40">
        <p className="eyebrow mb-12">04 — Beneficios Neostone</p>
        <BeneficiosLista beneficios={beneficios} />
      </section>

      {/* ─── 05 SHOWROOMS ─────────────────────────────────── */}
      <section className="border-t border-line">
        <div className="container-x grid gap-12 py-28 md:grid-cols-12 md:py-36">
          <div className="md:col-span-5">
            <p className="eyebrow">05 — Showrooms</p>
            <WordReveal lines={[`${abiertos} ciudades.`, "*Uno* *cerca* *tuyo.*"]} className="mt-6 font-display text-4xl leading-tight font-extralight md:text-5xl" />
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
