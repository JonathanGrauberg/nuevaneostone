"use client";

import { upload } from "@vercel/blob/client";
import { useState } from "react";
import { PromoModal } from "@/components/home/PromoPopup";
import type { Promo } from "@/lib/promo";
import { guardarPromo } from "./acciones";

type Archivo = "imagen" | "imagenCelular" | "video" | "videoCelular";
const campos: { id: Archivo; etiqueta: string; ayuda: string; acepta: string; opcional?: boolean }[] = [
  { id: "imagen", etiqueta: "Imagen (escritorio)", ayuda: "JPG o PNG. Se muestra entera, sin recortes.", acepta: "image/jpeg,image/png,image/webp" },
  { id: "imagenCelular", etiqueta: "Imagen para celular", ayuda: "Opcional. Vertical; si no hay, se usa la de escritorio.", acepta: "image/jpeg,image/png,image/webp", opcional: true },
  { id: "video", etiqueta: "Video al tocar la imagen", ayuda: "Opcional. MP4 horizontal y comprimido (hasta 100 MB).", acepta: "video/mp4", opcional: true },
  { id: "videoCelular", etiqueta: "Video para celular", ayuda: "Opcional. MP4 vertical; si no hay, se usa el de escritorio.", acepta: "video/mp4", opcional: true },
];

/** Carga de la promo del inicio: imágenes y video van a Vercel Blob, la configuración se guarda al final. */
export function PanelPromo({ inicial }: { inicial: Promo | null }) {
  const [activa, setActiva] = useState(inicial?.activa ?? true);
  const [alt, setAlt] = useState(inicial?.alt ?? "Promoción Neostone");
  const [urls, setUrls] = useState<Partial<Record<Archivo, string>>>({
    imagen: inicial?.imagen,
    imagenCelular: inicial?.imagenCelular,
    video: inicial?.video,
    videoCelular: inicial?.videoCelular,
  });
  const [nuevos, setNuevos] = useState<Partial<Record<Archivo, { file: File; url: string } | null>>>({});
  const [estado, setEstado] = useState<{ texto: string; error?: boolean } | null>(null);
  const [guardando, setGuardando] = useState(false);
  const [previa, setPrevia] = useState(false);

  // Lo que se ve: el archivo recién elegido (todavía sin subir) o el ya guardado
  const ver = (id: Archivo) => {
    const n = nuevos[id];
    return n === null ? undefined : n ? n.url : urls[id];
  };

  const guardar = async () => {
    setGuardando(true);
    try {
      const final = { ...urls };
      for (const { id } of campos) {
        const n = nuevos[id];
        if (n === null) final[id] = undefined;
        if (!n) continue;
        const f = n.file;
        const nombre = `promo/${id}-${f.name.replace(/[^\w.-]+/g, "-").toLowerCase()}`;
        const subido = await upload(nombre, f, {
          access: "public",
          handleUploadUrl: "/api/admin/subir",
          multipart: f.size > 20 * 1024 * 1024,
          onUploadProgress: ({ percentage }) => setEstado({ texto: `Subiendo ${f.name}… ${Math.round(percentage)}%` }),
        });
        final[id] = subido.url;
      }
      setEstado({ texto: "Guardando…" });
      const r = await guardarPromo({ activa, alt: alt.trim() || "Promoción Neostone", ...final });
      if ("error" in r) return setEstado({ texto: r.error!, error: true });
      setUrls(final);
      setNuevos({});
      setEstado({ texto: activa ? "¡Listo! La promo se ve en el inicio en hasta un minuto." : "Guardado. La promo está apagada." });
    } catch (e) {
      setEstado({ texto: `No se pudo guardar: ${(e as Error).message}`, error: true });
    } finally {
      setGuardando(false);
    }
  };

  const borrador = ver("imagen") ? { id: "previa", alt, imagen: ver("imagen")!, imagenCelular: ver("imagenCelular"), video: ver("video") ?? ver("videoCelular"), videoCelular: ver("videoCelular") } : null;

  return (
    <div className="grid max-w-6xl gap-12">
      <label className="flex items-center gap-4">
        <input type="checkbox" checked={activa} onChange={(e) => setActiva(e.target.checked)} className="size-5 accent-[var(--accent)]" />
        <span className="font-display text-lg font-light">Mostrar la promo en el inicio</span>
      </label>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {campos.map((c) => {
          const src = ver(c.id);
          return (
            <div key={c.id} className="flex flex-col gap-3">
              <span className="eyebrow">{c.etiqueta}</span>
              <div className="grid aspect-[4/5] place-items-center overflow-hidden border border-line bg-surface">
                {src ? (
                  c.id.startsWith("video") ? (
                    <video src={src} controls muted className="h-full w-full object-contain" />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element -- vista previa local o de Vercel Blob
                    <img src={src} alt="" className="h-full w-full object-contain" />
                  )
                ) : (
                  <span className="text-sm text-muted">Sin cargar</span>
                )}
              </div>
              <p className="text-sm text-muted">{c.ayuda}</p>
              <div className="flex flex-wrap gap-4">
                <label className="link-line cursor-pointer">
                  {src ? "Cambiar" : "Elegir archivo"}
                  <input
                    type="file"
                    accept={c.acepta}
                    className="sr-only"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) setNuevos((n) => ({ ...n, [c.id]: { file: f, url: URL.createObjectURL(f) } }));
                      e.target.value = "";
                    }}
                  />
                </label>
                {c.opcional && src && (
                  <button type="button" className="link-line text-muted" onClick={() => setNuevos((n) => ({ ...n, [c.id]: null }))}>
                    Quitar
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <label className="block max-w-xl">
        <span className="eyebrow">Descripción de la imagen</span>
        <input
          value={alt}
          onChange={(e) => setAlt(e.target.value)}
          placeholder="Ej.: Promo octubre: 12 cuotas sin interés"
          className="w-full border-b border-line-strong bg-transparent pt-2 pb-3 font-display text-lg font-light outline-none focus:border-accent"
        />
        <span className="mt-2 block text-sm text-muted">Para buscadores y lectores de pantalla.</span>
      </label>

      <div className="flex flex-wrap items-center gap-6">
        <button type="button" onClick={guardar} disabled={guardando || !borrador} className="btn-outline !border-accent disabled:opacity-40">
          {guardando ? "Guardando…" : "Guardar"}
        </button>
        <button type="button" onClick={() => setPrevia(true)} disabled={!borrador} className="link-line disabled:opacity-40">
          Vista previa
        </button>
        {estado && <p className={`text-sm ${estado.error ? "text-accent" : "text-fg-soft"}`}>{estado.texto}</p>}
      </div>
      <p className="max-w-xl text-sm text-muted">
        Cada visitante ve la promo una sola vez. Al guardar cambios, vuelve a mostrarse a todos.
      </p>

      <PromoModal promo={previa ? borrador : null} onCerrar={() => setPrevia(false)} />
    </div>
  );
}
