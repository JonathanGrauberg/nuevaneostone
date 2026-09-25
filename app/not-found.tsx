import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-x flex min-h-[80svh] flex-col justify-center pt-24">
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-6 font-display text-5xl font-extralight md:text-7xl">
        Este espacio <span className="font-normal">todavía no existe.</span>
      </h1>
      <div className="mt-10 flex gap-8">
        <Link href="/" className="link-line">
          Volver al inicio →
        </Link>
        <Link href="/colecciones" className="eyebrow transition-colors hover:text-fg">
          Ver colecciones
        </Link>
      </div>
    </div>
  );
}
