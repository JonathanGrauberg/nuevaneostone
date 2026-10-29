"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ProductCard } from "@/components/cards/ProductCard";
import { Reveal } from "@/components/motion/Reveal";
import { WordReveal } from "@/components/motion/WordReveal";

type Item = { slug: string; nombre: string; bajada: string; portada: string };

/**
 * Colecciones del home en un carrusel común, alineado al contenedor (aire a ambos lados):
 * se desliza con el dedo / trackpad, arrastrando con el mouse o con las flechas ‹ ›.
 */
export function ColeccionesScroll({ colecciones }: { colecciones: Item[] }) {
  const pistaRef = useRef<HTMLDivElement>(null);
  const [bordes, setBordes] = useState({ inicio: true, fin: false });

  useEffect(() => {
    const pista = pistaRef.current;
    if (!pista) return;
    const medir = () =>
      setBordes({ inicio: pista.scrollLeft <= 4, fin: pista.scrollLeft + pista.clientWidth >= pista.scrollWidth - 4 });
    medir();
    pista.addEventListener("scroll", medir, { passive: true });
    window.addEventListener("resize", medir);
    return () => {
      pista.removeEventListener("scroll", medir);
      window.removeEventListener("resize", medir);
    };
  }, []);

  // Arrastre con el mouse (en touch el desplazamiento es nativo). Mientras se arrastra
  // se apaga el snap; al soltar vuelve y acomoda la tarjeta más cercana.
  const arrastre = useRef<{ x: number; scroll: number; movio: boolean } | null>(null);
  const recienArrastrado = useRef(false);
  const alPresionar = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    arrastre.current = { x: e.clientX, scroll: e.currentTarget.scrollLeft, movio: false };
  };
  const alMover = (e: React.PointerEvent<HTMLDivElement>) => {
    const a = arrastre.current;
    if (!a) return;
    const dx = e.clientX - a.x;
    if (!a.movio && Math.abs(dx) > 5) {
      a.movio = true;
      e.currentTarget.setPointerCapture(e.pointerId);
      e.currentTarget.style.scrollSnapType = "none";
      e.currentTarget.style.cursor = "grabbing";
    }
    if (a.movio) e.currentTarget.scrollLeft = a.scroll - dx;
  };
  const alSoltar = (e: React.PointerEvent<HTMLDivElement>) => {
    const a = arrastre.current;
    arrastre.current = null;
    if (!a?.movio) return;
    const pista = e.currentTarget;
    pista.style.cursor = "";
    // Acomoda a la tarjeta más cercana y vuelve a activar el snap
    const ancho = (pista.firstElementChild as HTMLElement).offsetWidth + 1;
    pista.scrollTo({ left: Math.round(pista.scrollLeft / ancho) * ancho, behavior: "smooth" });
    setTimeout(() => (pista.style.scrollSnapType = ""), 500);
    // Que el arrastre no termine abriendo la colección (el click llega justo después de soltar)
    recienArrastrado.current = true;
    setTimeout(() => (recienArrastrado.current = false), 0);
  };

  const mover = (dir: 1 | -1) => {
    const pista = pistaRef.current;
    const tarjeta = pista?.firstElementChild as HTMLElement | null;
    if (!pista || !tarjeta) return;
    pista.scrollBy({ left: dir * (tarjeta.offsetWidth + 1), behavior: "smooth" });
  };

  const flecha = (dir: 1 | -1, deshabilitada: boolean) => (
    <button
      type="button"
      onClick={() => mover(dir)}
      disabled={deshabilitada}
      aria-label={dir === 1 ? "Siguiente colección" : "Colección anterior"}
      className="grid size-12 place-items-center border border-line-strong font-display text-xl font-light transition-colors hover:border-accent hover:text-accent disabled:pointer-events-none disabled:opacity-30"
    >
      {dir === 1 ? "›" : "‹"}
    </button>
  );

  return (
    <section className="relative pt-24 pb-28 md:pt-36 md:pb-40">
      <div className="container-x mb-10 flex items-end justify-between gap-6">
        <div>
          <p className="eyebrow">01 — Colecciones</p>
          <WordReveal
            lines={["Una colección para cada", "*forma* *de* *habitar.*"]}
            className="mt-6 font-display text-3xl leading-tight font-extralight md:text-5xl"
          />
        </div>
        <div className="flex shrink-0 flex-col items-end gap-5">
          <div className="flex gap-2">
            {flecha(-1, bordes.inicio)}
            {flecha(1, bordes.fin)}
          </div>
          <Link href="/colecciones" className="link-line hidden md:inline-block">
            Ver todas →
          </Link>
        </div>
      </div>
      <div className="container-x">
        <div
          ref={pistaRef}
          onPointerDown={alPresionar}
          onPointerMove={alMover}
          onPointerUp={alSoltar}
          onPointerCancel={alSoltar}
          onDragStart={(e) => e.preventDefault()}
          onClickCapture={(e) => {
            if (recienArrastrado.current) {
              e.preventDefault();
              e.stopPropagation();
            }
          }}
          className="no-scrollbar flex cursor-grab snap-x snap-mandatory gap-px overflow-x-auto select-none"
        >
          {colecciones.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.06} className="w-[80%] shrink-0 snap-start sm:w-[calc((100%-1px)/2)] md:w-[calc((100%-2px)/3)] lg:w-[calc((100%-3px)/4)]">
              <ProductCard href={`/colecciones/${c.slug}`} nombre={c.nombre} bajada={c.bajada} imagen={c.portada} indice={i} />
            </Reveal>
          ))}
        </div>
      </div>
      <div className="container-x mt-8 md:hidden">
        <Link href="/colecciones" className="link-line">
          Ver todas →
        </Link>
      </div>
    </section>
  );
}
