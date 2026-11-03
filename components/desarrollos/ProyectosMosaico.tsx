"use client";

import Image from "next/image";
import { useState } from "react";
import { Reveal } from "@/components/motion/Reveal";

type Proyecto = { nombre: string; lugar: string; imagen: string };

/** Grilla de proyectos con nombre y ciudad; "Ver todos" muestra el resto. */
export function ProyectosMosaico({ lista, visibles }: { lista: Proyecto[]; visibles: number }) {
  const [todos, setTodos] = useState(false);
  const mostrados = todos ? lista : lista.slice(0, visibles);

  return (
    <>
      <div className="mt-14 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
        {mostrados.map((p, i) => (
          <Reveal key={p.imagen} delay={(i % 4) * 0.06}>
            <figure className="group relative aspect-[4/5] overflow-hidden bg-surface">
              <Image
                src={p.imagen}
                alt={`${p.nombre}, ${p.lugar}`}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                className="object-cover transition-transform duration-[1400ms] ease-lux group-hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-4 pt-12 pb-4 md:px-5 md:pb-5">
                <span className="block font-display text-sm font-normal text-white md:text-base">{p.nombre}</span>
                <span className="mt-1 block font-display text-[10px] tracking-[0.24em] text-white/70 uppercase">{p.lugar}</span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
      {!todos && lista.length > visibles && (
        <div className="mt-10 flex justify-center">
          <button type="button" onClick={() => setTodos(true)} className="btn-outline">
            Ver los {lista.length} proyectos
          </button>
        </div>
      )}
    </>
  );
}
