import Image from "next/image";

type Logo = { src: string; ancho: number; alto: number };

/**
 * Logo de colección con tamaño "ópticamente parejo": en vez de igualar alto o ancho
 * (que hace ver enormes a los logos alargados y diminutos a los compactos), todos
 * ocupan la misma superficie. `area` = px² que ocupa cada logo.
 */
export function LogoColeccion({ logo, area, className = "" }: { logo: Logo; area: number; className?: string }) {
  const ratio = logo.ancho / logo.alto;
  const ancho = Math.round(Math.sqrt(area * ratio));
  const alto = Math.round(ancho / ratio);
  return (
    <Image
      src={logo.src}
      alt=""
      width={ancho}
      height={alto}
      unoptimized
      className={`logo-coleccion block max-w-none ${className}`}
      style={{ width: ancho, height: alto }}
    />
  );
}
