import type { Metadata } from "next";
import { WordReveal } from "@/components/motion/WordReveal";
import { Reveal } from "@/components/motion/Reveal";
import { ShowroomFinder } from "@/components/showrooms/ShowroomFinder";
import { getShowroomsResumen } from "@/lib/content";

export const metadata: Metadata = {
  title: "Showrooms",
  description: "Encontrá el showroom Neostone más cercano. Presencia en Buenos Aires, Córdoba, Entre Ríos, Santa Fe, Chubut, Río Negro, Salta, San Juan y San Luis.",
};

export default function ShowroomsPage() {
  const showrooms = getShowroomsResumen();
  const provincias = new Set(showrooms.map((s) => s.provincia)).size;
  return (
    <div className="container-x pt-40 pb-28 md:pt-48">
      <div className="mb-20 grid gap-8 md:grid-cols-12">
        <p className="eyebrow md:col-span-3">Showrooms</p>
        <div className="md:col-span-9">
          <WordReveal
            as="h1"
            trigger="mount"
            lines={[`${showrooms.length} ciudades.`, "*Uno* *cerca* *tuyo.*"]}
            className="font-display text-5xl leading-[1.05] font-extralight md:text-7xl"
          />
          <Reveal delay={0.4}>
            <p className="mt-8 max-w-lg text-lg text-fg-soft">
              Vení a tocar los materiales, ver las terminaciones en persona y vivir tu proyecto en realidad virtual. Estamos en {provincias} provincias.
            </p>
          </Reveal>
        </div>
      </div>
      <ShowroomFinder showrooms={showrooms} />
    </div>
  );
}
