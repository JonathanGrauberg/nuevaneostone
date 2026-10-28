"use client";

import { useInView } from "motion/react";
import { useRef, useState } from "react";
import { IconoPilar } from "@/components/beneficios/IconoPilar";
import type { Beneficio } from "@/data/beneficios";

/**
 * Beneficios en lista: número, título y texto, con el ícono animado del pilar a la derecha.
 * Cada ícono se dibuja al entrar en pantalla y se vuelve a dibujar al pasar el mouse por la fila.
 */
export function BeneficiosLista({ beneficios }: { beneficios: Beneficio[] }) {
  return (
    <ol className="border-t border-line" aria-label="Beneficios">
      {beneficios.map((b, i) => (
        <Fila key={b.titulo} b={b} n={i + 1} />
      ))}
    </ol>
  );
}

function Fila({ b, n }: { b: Beneficio; n: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const visible = useInView(ref, { once: true, amount: 0.4 });
  // Al cambiar la key el ícono se vuelve a montar y se redibuja (como mucho cada 3 s)
  const [vuelta, setVuelta] = useState(0);
  const ultima = useRef(0);

  return (
    <li
      ref={ref}
      className="group grid grid-cols-1 gap-6 border-b border-line py-10 md:grid-cols-[48px_minmax(0,1fr)_200px] md:items-center md:gap-10 md:py-12"
      onMouseEnter={() => {
        if (Date.now() - ultima.current > 3000) {
          ultima.current = Date.now();
          setVuelta((v) => v + 1);
        }
      }}
    >
      <span className="font-display text-[13px] tracking-[0.3em] text-muted transition-colors duration-500 group-hover:text-accent md:self-start md:pt-3">
        {String(n).padStart(2, "0")}
      </span>
      <div className="grid min-w-0 gap-4">
        <h3 className="font-display text-3xl leading-tight font-extralight md:text-[44px]">{b.titulo}</h3>
        <div className="max-w-[60ch] space-y-3 leading-relaxed text-fg-soft">
          {b.texto.map((t) => (
            <p key={t}>{t}</p>
          ))}
        </div>
      </div>
      <div className="-order-1 grid aspect-square w-40 place-items-center border border-line bg-surface md:order-none md:w-[200px]">
        {visible && <IconoPilar key={vuelta} pilar={b.icono} className="w-[58%]" />}
      </div>
    </li>
  );
}
