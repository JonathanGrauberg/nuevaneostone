"use client";

import Image from "next/image";
import { useState } from "react";
import { Reveal } from "@/components/motion/Reveal";

/** Grilla de fotos de proyectos (sin nombres, a pedido de la empresa); "Ver todos" muestra el resto. */
export function ProyectosMosaico({ lista, visibles }: { lista: string[]; visibles: number }) {
  const [todos, setTodos] = useState(false);
  const mostrados = todos ? lista : lista.slice(0, visibles);

  return (
    <>
      <div className="mt-14 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
        {mostrados.map((src, i) => (
          <Reveal key={src} delay={(i % 4) * 0.06}>
            <figure className="group relative aspect-[4/5] overflow-hidden bg-surface">
              <Image
                src={src}
                alt="Desarrollo equipado por Neostone"
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                className="object-cover transition-transform duration-[1400ms] ease-lux group-hover:scale-105"
              />
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
