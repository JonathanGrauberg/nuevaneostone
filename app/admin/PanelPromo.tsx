"use client";

import { upload } from "@vercel/blob/client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { PromoModal } from "@/components/home/PromoPopup";
import { nombresMedios } from "@/components/promo/MediosPago";
import { PromoTarjeta } from "@/components/promo/PromoTarjeta";
import { medios, promoEjemplo, type Promo } from "@/lib/promoSchema";
import { guardarPromo } from "./acciones";

type Archivo = "imagen" | "video" | "videoCelular";
type Textos = Pick<Promo, "epigrafe" | "eyebrow" | "titulo" | "texto" | "boton" | "botonVideo">;

const camposTexto: { id: keyof Textos; etiqueta: string; largo?: boolean; ayuda?: string }[] = [
  { id: "eyebrow", etiqueta: "Volanta", ayuda: "Texto chico arriba del título." },
  { id: "titulo", etiqueta: "Título", largo: true },
  { id: "texto", etiqueta: "Texto", largo: true },
  { id: "boton", etiqueta: "Botón principal", ayuda: "Cierra el popup y deja recorrer la web." },
  { id: "botonVideo", etiqueta: "Botón del video", ayuda: "Aparece solo si hay un video cargado." },
  { id: "epigrafe", etiqueta: "Epígrafe de la foto", ayuda: "Sobre la foto, solo en escritorio. Puede quedar vacío." },
];

const estiloCampo =
  "w-full border-b border-line-strong bg-transparent pt-2 pb-3 font-display text-base font-light outline-none transition-colors focus:border-accent";

/** Carga de la promo del inicio: a la izquierda los datos, a la derecha la vista previa en vivo. */
export function PanelPromo({ inicial }: { inicial: Promo | null }) {
  const base = inicial ?? { ...promoEjemplo, id: "", imagen: "" };
  const [activa, setActiva] = useState(base.activa);
  const [textos, setTextos] = useState<Textos>({
    epigrafe: base.epigrafe,
    eyebrow: base.eyebrow,
    titulo: base.titulo,
    texto: base.texto,
    boton: base.boton,
    botonVideo: base.botonVideo,
  });
  const [mediosElegidos, setMedios] = useState<Promo["medios"]>(base.medios);
  const [urls, setUrls] = useState<Partial<Record<Archivo, string>>>({ imagen: base.imagen || undefined, video: base.video, videoCelular: base.videoCelular });
  const [nuevos, setNuevos] = useState<Partial<Record<Archivo, { file: File; url: string } | null>>>({});
  const [estado, setEstado] = useState<{ texto: string; error?: boolean } | null>(null);
  const [guardando, setGuardando] = useState(false);
  const [probando, setProbando] = useState(false);
  const [vista, setVista] = useState<"escritorio" | "celular">("escritorio");

  // Lo que se ve: el archivo recién elegido (todavía sin subir) o el ya guardado
  const ver = (id: Archivo) => {
    const n = nuevos[id];
    return n === null ? undefined : n ? n.url : urls[id];
  };
  const elegir = (id: Archivo, file: File | null) => setNuevos((n) => ({ ...n, [id]: file ? { file, url: URL.createObjectURL(file) } : null }));

  const guardar = async () => {
    setGuardando(true);
    try {
      const final = { ...urls };
      for (const id of ["imagen", "video", "videoCelular"] as const) {
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
      const r = await guardarPromo({ activa, ...textos, medios: mediosElegidos, ...final });
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

  const borrador = {
    id: "previa",
    ...textos,
    medios: mediosElegidos,
    imagen: ver("imagen") ?? "",
    video: ver("video"),
    videoCelular: ver("videoCelular"),
  };
  const hayVideo = !!(borrador.video || borrador.videoCelular);

  return (
    <div className="grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      {/* ─── Datos ─── */}
      <div className="flex flex-col gap-10">
        <label className="flex items-center gap-4">
          <input type="checkbox" checked={activa} onChange={(e) => setActiva(e.target.checked)} className="size-5 accent-[var(--accent)]" />
          <span className="font-display text-lg font-light">Mostrar la promo en el inicio</span>
        </label>

        <Zona etiqueta="Foto" ayuda="JPG o PNG horizontal. En celular se recorta arriba del texto." acepta="image/jpeg,image/png,image/webp" src={ver("imagen")} onElegir={(f) => elegir("imagen", f)}>
          {(src) => (
            // eslint-disable-next-line @next/next/no-img-element -- vista previa local o de Vercel Blob
            <img src={src} alt="" className="h-full w-full object-cover" />
          )}
        </Zona>

        {camposTexto.map((c) => (
          <label key={c.id} className="block">
            <span className="eyebrow">{c.etiqueta}</span>
            {c.largo ? (
              <textarea rows={c.id === "texto" ? 4 : 2} value={textos[c.id]} onChange={(e) => setTextos((t) => ({ ...t, [c.id]: e.target.value }))} className={`${estiloCampo} resize-y`} />
            ) : (
              <input value={textos[c.id]} onChange={(e) => setTextos((t) => ({ ...t, [c.id]: e.target.value }))} className={estiloCampo} />
            )}
            {c.ayuda && <span className="mt-2 block text-sm text-muted">{c.ayuda}</span>}
          </label>
        ))}

        <fieldset>
          <legend className="eyebrow">Medios de pago</legend>
          <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
            {medios.map((m) => (
              <label key={m} className="flex items-center gap-3 text-sm text-fg-soft">
                <input
                  type="checkbox"
                  checked={mediosElegidos.includes(m)}
                  onChange={(e) => setMedios((ms) => (e.target.checked ? medios.filter((x) => x === m || ms.includes(x)) : ms.filter((x) => x !== m)))}
                  className="size-4 accent-[var(--accent)]"
                />
                {nombresMedios[m]}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="grid gap-8 sm:grid-cols-2">
          {(
            [
              ["video", "Video (escritorio)", "MP4 horizontal, hasta 100 MB."],
              ["videoCelular", "Video (celular)", "MP4 vertical. Si no hay, se usa el otro."],
            ] as const
          ).map(([id, etiqueta, ayuda]) => (
            <Zona key={id} etiqueta={etiqueta} ayuda={ayuda} acepta="video/mp4" src={ver(id)} onElegir={(f) => elegir(id, f)} quitable>
              {(src) => <video src={src} muted className="h-full w-full bg-black object-contain" />}
            </Zona>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-6 border-t border-line pt-10">
          <button type="button" onClick={guardar} disabled={guardando || !borrador.imagen} className="btn-outline !border-accent disabled:opacity-40">
            {guardando ? "Guardando…" : "Guardar"}
          </button>
          <button type="button" onClick={() => setProbando(true)} disabled={!borrador.imagen} className="link-line disabled:opacity-40">
            Probar el popup
          </button>
          {estado && <p className={`text-sm ${estado.error ? "text-accent" : "text-fg-soft"}`}>{estado.texto}</p>}
        </div>
        <p className="text-sm text-muted">Cada visitante ve la promo una sola vez. Al guardar cambios, vuelve a mostrarse a todos.</p>
      </div>

      {/* ─── Vista previa ─── */}
      <div className="lg:sticky lg:top-28 lg:self-start">
        <div className="mb-5 flex items-center justify-between">
          <span className="eyebrow">Vista previa</span>
          <div className="flex gap-5">
            {(["escritorio", "celular"] as const).map((v) => (
              <button key={v} type="button" onClick={() => setVista(v)} className={`eyebrow transition-colors ${vista === v ? "!text-fg" : "hover:!text-fg"}`}>
                {v === "escritorio" ? "Escritorio" : "Celular"}
                {vista === v && <span className="mt-1 block h-px bg-accent" />}
              </button>
            ))}
          </div>
        </div>
        <div className="border border-line bg-[#3a3835] p-4 md:p-8">
          <Escalado ancho={vista === "escritorio" ? 1220 : 375}>
            <PromoTarjeta promo={borrador} onCerrar={() => {}} onVideo={hayVideo ? () => {} : undefined} />
          </Escalado>
        </div>
      </div>

      <PromoModal promo={probando ? borrador : null} onCerrar={() => setProbando(false)} />
    </div>
  );
}

/** Muestra el contenido a su ancho real (ej. 1220 px) achicado para que entre en la columna y en la pantalla. */
function Escalado({ ancho, children }: { ancho: number; children: ReactNode }) {
  const caja = useRef<HTMLDivElement>(null);
  const contenido = useRef<HTMLDivElement>(null);
  const [medidas, setMedidas] = useState({ escala: 1, alto: 0 });

  useEffect(() => {
    const medir = () => {
      if (!caja.current || !contenido.current) return;
      const alto = contenido.current.offsetHeight;
      const escala = Math.min(1, caja.current.clientWidth / ancho, (window.innerHeight * 0.68) / alto);
      setMedidas({ escala, alto: alto * escala });
    };
    const ro = new ResizeObserver(medir);
    if (caja.current) ro.observe(caja.current);
    if (contenido.current) ro.observe(contenido.current);
    return () => ro.disconnect();
  }, [ancho]);

  return (
    <div ref={caja} style={{ height: medidas.alto || undefined }} className="relative overflow-hidden">
      <div
        ref={contenido}
        style={{ width: ancho, transform: `scale(${medidas.escala})`, left: `calc(50% - ${(ancho * medidas.escala) / 2}px)` }}
        className="pointer-events-none absolute top-0 origin-top-left"
      >
        {children}
      </div>
    </div>
  );
}

/** Zona para soltar un archivo (o tocar para elegirlo), con su vista previa. */
function Zona({
  etiqueta,
  ayuda,
  acepta,
  src,
  onElegir,
  quitable,
  children,
}: {
  etiqueta: string;
  ayuda: string;
  acepta: string;
  src?: string;
  onElegir: (f: File | null) => void;
  quitable?: boolean;
  children: (src: string) => ReactNode;
}) {
  const [encima, setEncima] = useState(false);
  const tipos = acepta.split(",");

  return (
    <div className="flex flex-col gap-3">
      <span className="eyebrow">{etiqueta}</span>
      <label
        onDragOver={(e) => {
          e.preventDefault();
          setEncima(true);
        }}
        onDragLeave={() => setEncima(false)}
        onDrop={(e) => {
          e.preventDefault();
          setEncima(false);
          const f = e.dataTransfer.files[0];
          if (f && tipos.includes(f.type)) onElegir(f);
        }}
        className={`group relative grid aspect-video cursor-pointer place-items-center overflow-hidden border border-dashed transition-colors ${
          encima ? "border-accent bg-accent/10" : "border-line-strong bg-surface hover:border-fg"
        }`}
      >
        {src ? children(src) : null}
        <span
          className={`absolute inset-0 grid place-items-center px-4 text-center text-sm transition-opacity ${
            src ? "bg-black/60 text-white opacity-0 group-hover:opacity-100" : "text-muted"
          } ${encima ? "opacity-100" : ""}`}
        >
          {src ? "Soltá o tocá para cambiar" : "Arrastrá el archivo acá o tocá para elegirlo"}
        </span>
        <input
          type="file"
          accept={acepta}
          className="sr-only"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onElegir(f);
            e.target.value = "";
          }}
        />
      </label>
      <div className="flex items-start justify-between gap-4">
        <p className="text-sm text-muted">{ayuda}</p>
        {quitable && src && (
          <button type="button" className="link-line shrink-0 text-sm text-muted" onClick={() => onElegir(null)}>
            Quitar
          </button>
        )}
      </div>
    </div>
  );
}
