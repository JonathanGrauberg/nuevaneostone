import Image from "next/image";
import Link from "next/link";
import type { ShowroomResumen } from "@/lib/content";
import { formatDistancia } from "@/lib/geo";
import { ImagenPendiente } from "@/components/ui/ImagenPendiente";

/** Tarjeta de showroom: foto con degradé, ciudad grande sobre la imagen. */
export function ShowroomCard({ s, km }: { s: ShowroomResumen; km?: number }) {
  return (
    <Link href={`/showrooms/${s.slug}`} className="group relative block aspect-[4/5] overflow-hidden bg-surface">
      {s.imagen ? (
        <Image
          src={s.imagen}
          alt={`Showroom Neostone ${s.ciudad}`}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1400ms] ease-lux group-hover:scale-[1.06]"
        />
      ) : (
        <div className="absolute inset-x-0 top-0 bottom-1/3">
          <ImagenPendiente compacto />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/10" />
      <div className="absolute top-4 left-4 flex gap-2">
        {s.casaCentral && <span className="border border-white/40 px-2 py-1 font-display text-[10px] tracking-[0.2em] text-white uppercase">Casa central</span>}
        {s.estado === "proximamente" && <span className="border border-accent px-2 py-1 font-display text-[10px] tracking-[0.2em] text-white uppercase">Próximamente</span>}
      </div>
      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
        <p className="font-display text-[10px] tracking-[0.28em] text-white/60 uppercase">
          {s.provincia}
          {km !== undefined && <span className="text-accent"> · {formatDistancia(km)}</span>}
        </p>
        <h3 className="mt-2 font-display text-2xl font-extralight">{s.ciudad}</h3>
        <p className="mt-1 text-sm text-white/65">{s.nombre}</p>
        <span className="mt-4 block h-px w-0 bg-accent transition-all duration-700 ease-lux group-hover:w-12" />
      </div>
    </Link>
  );
}
