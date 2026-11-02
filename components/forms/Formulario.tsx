"use client";

import { useState } from "react";
import { consentimiento, type Formulario as Datos } from "@/data/formularios";
import { site } from "@/data/site";

/**
 * Formulario de contacto: al enviar abre WhatsApp de casa central con los datos escritos.
 * `extra` agrega líneas al mensaje (ej. el showroom o la colección desde donde llegó).
 */
export function Formulario({ datos, extra = [] }: { datos: Datos; extra?: string[] }) {
  const [enviado, setEnviado] = useState(false);

  const enviar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const lineas = datos.campos
      .map((c) => [c.etiqueta, String(f.get(c.id) ?? "").trim()] as const)
      .filter(([, v]) => v)
      .map(([k, v]) => `${k}: ${v}`);
    const texto = [datos.saludo, "", ...extra, ...lineas].join("\n");
    window.open(`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(texto)}`, "_blank", "noopener");
    setEnviado(true);
  };

  const estiloCampo =
    "w-full border-b border-line-strong bg-transparent pt-2 pb-3 font-display text-lg font-light outline-none transition-colors placeholder:text-muted focus:border-accent";

  return (
    <form onSubmit={enviar} className="grid gap-x-10 gap-y-8 md:grid-cols-2">
      {extra.length > 0 && <p className="eyebrow md:col-span-2 !text-accent">{extra.join(" · ")}</p>}
      {datos.campos.map((c) => (
        <label key={c.id} className={`block ${c.ancho ? "md:col-span-2" : ""}`}>
          <span className="eyebrow">
            {c.etiqueta}
            {c.requerido && <span className="text-accent"> *</span>}
          </span>
          {c.tipo === "textarea" ? (
            <textarea name={c.id} rows={4} required={c.requerido} className={`${estiloCampo} resize-y`} />
          ) : (
            <input name={c.id} type={c.tipo ?? "text"} required={c.requerido} autoComplete="on" className={estiloCampo} />
          )}
        </label>
      ))}
      <label className="flex items-start gap-3 text-sm leading-relaxed text-fg-soft md:col-span-2">
        <input type="checkbox" required className="mt-1 size-4 shrink-0 accent-[var(--accent)]" />
        <span>{consentimiento}</span>
      </label>
      <div className="flex flex-wrap items-center gap-6 md:col-span-2">
        <button type="submit" className="btn-outline !border-accent">
          Enviar por WhatsApp
        </button>
        <p className="text-sm text-muted">
          {enviado ? "¡Listo! Si no se abrió WhatsApp, revisá que tu navegador no lo haya bloqueado." : "Se abre WhatsApp con tus datos para enviarlos a casa central."}
        </p>
      </div>
    </form>
  );
}
