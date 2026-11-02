import { Formulario } from "@/components/forms/Formulario";
import { Reveal } from "@/components/motion/Reveal";
import { WordReveal } from "@/components/motion/WordReveal";
import type { Formulario as Datos } from "@/data/formularios";
import { site } from "@/data/site";

/** Página de formulario: título a la izquierda, campos a la derecha y contacto directo debajo. */
export function PaginaFormulario({ datos, extra }: { datos: Datos; extra?: string[] }) {
  return (
    <section className="container-x pt-40 pb-28 md:pt-48 md:pb-36">
      <div className="grid gap-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="eyebrow">{datos.eyebrow}</p>
          <WordReveal as="h1" trigger="mount" lines={datos.titulo} className="mt-6 font-display text-5xl leading-[1.05] font-extralight md:text-6xl" />
          <Reveal delay={0.3}>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-fg-soft">{datos.bajada}</p>
            <div className="mt-10 space-y-2 border-t border-line pt-6 text-fg-soft">
              <p className="eyebrow mb-3">O escribinos directo</p>
              {site.telefonos.map((t) => (
                <a key={t.numero} href={`tel:${t.numero}`} className="block transition-colors hover:text-fg">
                  {t.texto}
                </a>
              ))}
              <a href={`mailto:${site.email}`} className="block transition-colors hover:text-fg">
                {site.email}
              </a>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.2} className="md:col-span-6 md:col-start-7 md:pt-4">
          <Formulario datos={datos} extra={extra} />
        </Reveal>
      </div>
    </section>
  );
}
