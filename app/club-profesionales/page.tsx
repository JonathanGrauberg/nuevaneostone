import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { WordReveal } from "@/components/motion/WordReveal";
import { club } from "@/data/club";
import { site } from "@/data/site";

// Página preparada pero sin publicar (ver data/club.ts): fuera del menú y del sitemap, sin indexar.
export const metadata: Metadata = {
  title: "Club de Profesionales",
  description: club.bajada,
  robots: club.publicado ? undefined : { index: false, follow: false },
};

export default function ClubProfesionalesPage() {
  return (
    <>
      {!club.publicado && (
        <p className="fixed bottom-5 left-5 z-50 border border-accent bg-bg/90 px-4 py-2 font-display text-[10px] tracking-[0.28em] text-accent uppercase backdrop-blur">
          Borrador · no publicado
        </p>
      )}

      <section className="container-x pt-40 pb-24 md:pt-48 md:pb-32">
        <div className="grid gap-8 md:grid-cols-12">
          <p className="eyebrow md:col-span-3">Club de Profesionales</p>
          <div className="md:col-span-9">
            <WordReveal as="h1" trigger="mount" lines={club.titulo} className="font-display text-5xl leading-[1.05] font-extralight md:text-7xl" />
            <Reveal delay={0.4}>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-fg-soft">{club.bajada}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="container-x pb-28 md:pb-36">
        <div className="grid border-t border-line md:grid-cols-2">
          {club.beneficios.map((b, i) => (
            <Reveal key={b.titulo} delay={(i % 2) * 0.1} className="border-b border-line py-10 md:px-10 md:odd:border-r md:odd:pl-0">
              <p className="font-display text-[11px] tracking-[0.32em] text-accent">0{i + 1}</p>
              <h2 className="mt-5 font-display text-2xl font-light">{b.titulo}</h2>
              <p className="mt-4 max-w-md leading-relaxed text-fg-soft">{b.texto}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-line">
        <div className="container-x grid gap-12 py-24 md:grid-cols-12 md:items-end md:py-32">
          <div className="md:col-span-6">
            <p className="eyebrow">Cómo sumarte</p>
            <WordReveal lines={["Proyectemos", "*juntos.*"]} className="mt-5 font-display text-4xl leading-tight font-extralight md:text-6xl" />
          </div>
          <div className="md:col-span-6">
            <ol>
              {club.pasos.map((p, i) => (
                <li key={p} className="flex gap-5 border-t border-line py-5 text-fg-soft last:border-b">
                  <span className="font-display text-[11px] tracking-[0.3em] text-accent">0{i + 1}</span>
                  <span>{p}</span>
                </li>
              ))}
            </ol>
            <a
              href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(club.contactoTexto)}`}
              target="_blank"
              rel="noopener"
              className="btn-outline mt-10 !border-accent"
            >
              Quiero sumarme
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
