import Image from "next/image";

/** Retrato del equipo: blanco y negro que pasa a color al pasar el mouse (unifica fotos de distinto origen). */
export function StaffCard({ nombre, rol, foto }: { nombre: string; rol: string; foto?: string }) {
  return (
    <figure className="group relative aspect-[4/5] overflow-hidden bg-surface">
      {foto ? (
        <Image
          src={foto}
          alt={nombre}
          fill
          sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover object-top contrast-[1.05] grayscale transition-all duration-[1200ms] ease-lux group-hover:scale-[1.04] group-hover:grayscale-0"
        />
      ) : (
        <span className="absolute inset-0 flex items-center justify-center font-display text-4xl font-extralight text-muted">
          {nombre.charAt(0)}
        </span>
      )}
      <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
      <figcaption className="absolute inset-x-0 bottom-0 p-4 text-white">
        <p className="text-sm">{nombre}</p>
        <p className="mt-1 font-display text-[10px] tracking-[0.22em] text-white/60 uppercase">{rol}</p>
      </figcaption>
    </figure>
  );
}
