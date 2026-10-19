import type { Metadata } from "next";
import Link from "next/link";
import { BeneficiosAcordeon } from "@/components/beneficios/BeneficiosAcordeon";
import { Reveal } from "@/components/motion/Reveal";
import { WordReveal } from "@/components/motion/WordReveal";
import { beneficios, beneficiosIntro } from "@/data/beneficios";

export const metadata: Metadata = {
  title: "Beneficios",
  description: "Entrega en tiempo y forma, atención personalizada, 5 años de garantía, experiencia de realidad virtual, marmolería propia y sustentabilidad.",
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

      <BeneficiosAcordeon beneficios={beneficios} />

      <div className="mt-24 flex flex-col items-start justify-between gap-8 border-t border-line pt-12 md:flex-row md:items-center">
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
