import type { Metadata } from "next";
import Image from "next/image";
import { nosotros } from "@/data/home";
import { wp } from "@/lib/img";
import { EDITORES, hayCuentas, leerCuentas, leerFecha, sesionActual } from "@/lib/programacion";
import { salir } from "./acciones";
import { EditarFecha, Login, Sucursales } from "./Formularios";

export const metadata: Metadata = { title: "Programación de pedidos", robots: { index: false, follow: false } };

// "2026-11-09" → "09/11/2026"
const formatear = (iso: string) => iso.split("-").reverse().join("/");

/** Programación de fábrica para distribuidores (antes neostone.com.ar/programacion en WordPress). */
export default async function ProgramacionPage() {
  const sesion = await sesionActual();
  const fecha = sesion ? await leerFecha() : null;

  return (
    <section className="force-dark relative flex min-h-dvh items-center justify-center overflow-hidden bg-black px-5 pt-32 pb-20 text-center text-white">
      <Image src={nosotros.imagen} alt="" fill priority sizes="100vw" className="object-cover opacity-30 grayscale" />
      <div className="relative w-full max-w-4xl">
        <Image src={wp("2025/05/Logo-grande-horizontal-blanco.png")} alt="Neostone Amoblamientos" width={260} height={57} className="mx-auto h-auto w-[220px] md:w-[260px]" />

        {!(await hayCuentas()) ? (
          <p className="mt-14 text-white/80">Falta configurar las cuentas (variable PROGRAMACION_CUENTAS en Vercel).</p>
        ) : !sesion ? (
          <>
            <p className="eyebrow mt-14 mb-10 !text-white/70">Acceso distribuidores</p>
            <Login />
          </>
        ) : (
          <>
            <p className="mt-14 text-lg leading-relaxed md:text-2xl">
              Los Pedidos enviados a fabricar a través de TEOWIN y CONFIRMADOS por fábrica y totalmente abonados, están siendo programados para la
              semana cuyo inicio es el lunes:
            </p>
            <p className="mt-5 font-display text-4xl font-normal md:text-6xl">{fecha ? formatear(fecha) : "A confirmar"}</p>
            <p className="mt-14 leading-relaxed text-white/85 md:text-xl">
              (Antes de informar una fecha al cliente final, ver procedimientos de circuitos de pedidos de fábrica)
            </p>
            <p className="mt-10 md:text-xl">Muchas Gracias!</p>

            {sesion.editor && (
              <>
                <EditarFecha fecha={fecha} />
                <Sucursales
                  lista={Object.entries(await leerCuentas())
                    .map(([usuario, c]) => ({ usuario, nombre: c.nombre, editor: EDITORES.includes(usuario) }))
                    .sort((a, b) => Number(b.editor) - Number(a.editor) || (a.nombre || a.usuario).localeCompare(b.nombre || b.usuario, "es"))}
                />
              </>
            )}

            <form action={salir} className="mt-14">
              <span className="text-sm text-white/50">{sesion.nombre || sesion.usuario} · </span>
              <button type="submit" className="text-sm text-white/70 underline-offset-4 hover:text-white hover:underline">
                Salir
              </button>
            </form>
          </>
        )}
      </div>
    </section>
  );
}
