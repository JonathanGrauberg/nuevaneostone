import Image from "next/image";
import Link from "next/link";

type Props = {
  href: string;
  nombre: string;
  bajada?: string;
  imagen: string;
  indice?: number;
  sizes?: string;
  className?: string;
};

/** Tarjeta de colección: foto a sangre, degradé oscuro abajo, título sobre la imagen. */
export function ProductCard({ href, nombre, bajada, imagen, indice, sizes = "(min-width: 1024px) 25vw, 70vw", className = "" }: Props) {
  return (
    <Link href={href} className={`group relative block aspect-[3/4] overflow-hidden bg-surface ${className}`}>
      <Image
        src={imagen}
        alt={nombre}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-[1400ms] ease-lux group-hover:scale-[1.06]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-700 group-hover:opacity-100" />
      <div className="absolute inset-x-0 bottom-0 p-5 text-white md:p-6">
        {indice !== undefined && (
          <span className="mb-3 block font-display text-[11px] tracking-[0.32em] text-white/60">
            {String(indice + 1).padStart(2, "0")}
          </span>
        )}
        <h3 className="font-display text-lg font-light tracking-[0.2em] uppercase md:text-xl">{nombre}</h3>
        {bajada && <p className="mt-1 text-sm text-white/65">{bajada}</p>}
        <span className="mt-4 block h-px w-0 bg-accent transition-all duration-700 ease-lux group-hover:w-12" />
        <span className="mt-3 block translate-y-2 font-display text-[11px] tracking-[0.24em] uppercase opacity-0 transition-all duration-700 ease-lux group-hover:translate-y-0 group-hover:opacity-100">
          Ver colección →
        </span>
      </div>
    </Link>
  );
}
