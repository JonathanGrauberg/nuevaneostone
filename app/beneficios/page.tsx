import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { WordReveal } from "@/components/motion/WordReveal";
import { beneficios, beneficiosIntro } from "@/data/beneficios";

export const metadata: Metadata = {
  title: "Beneficios",
  description: "Atención personalizada, entrega en tiempo y forma, 5 años de garantía, experiencia de realidad virtual, marmolería propia y sustentabilidad.",
};

export default function BeneficiosPage() {
  return (
    <div className="container-x pt-40 pb-28 md:pt-48">
      <div className="mb-24 grid gap-8 md:grid-cols-12">
        <p className="eyebrow md:col-span-3">Beneficios</p>
        <div className="md:col-span-9">
          <WordReveal as="h1" trigger="mount" lines={["Más que muebles:", "*un* *respaldo.*"]} className="font-display text-5xl leading-[1.05] font-extralight md:text-7xl" />
          <Reveal delay={0.4}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-fg-soft">{beneficiosIntro}</p>
          </Reveal>
        </div>
      </div>

      <ol>
        {beneficios.map((b, i) => (
          <Reveal key={b.titulo} className="grid gap-6 border-t border-line py-12 md:grid-cols-12">
            <span className="font-display text-[11px] tracking-[0.32em] text-accent md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
            <h2 className="font-display text-2xl font-light md:col-span-4 md:text-3xl">{b.titulo}</h2>
            <div className="space-y-4 leading-relaxed text-fg-soft md:col-span-6 md:col-start-7">
              {b.texto.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </div>
          </Reveal>
        ))}
      </ol>

      <div className="mt-16 flex flex-col items-start justify-between gap-8 border-t border-line pt-12 md:flex-row md:items-center">
        <p className="font-display text-2xl font-extralight md:text-4xl">
          Conocé los beneficios <span className="font-normal">en persona.</span>
        </p>
        <Link href="/showrooms" className="btn-outline">
          Buscar showroom
        </Link>
      </div>
    </div>
  );
}
