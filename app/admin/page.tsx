import type { Metadata } from "next";
import { estaLogueado } from "@/lib/admin";
import { hayAlmacenamiento, leerPromo } from "@/lib/promo";
import { salir } from "./acciones";
import { Login } from "./Login";
import { PanelPromo } from "./PanelPromo";

export const metadata: Metadata = { title: "Admin", robots: { index: false, follow: false } };

export default async function AdminPage() {
  const logueado = await estaLogueado();

  return (
    <section className="container-x pt-36 pb-28 md:pt-44">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow">Panel</p>
          <h1 className="mt-6 font-display text-4xl font-extralight md:text-5xl">Promo del inicio</h1>
        </div>
        {logueado && (
          <form action={salir}>
            <button type="submit" className="link-line">
              Salir
            </button>
          </form>
        )}
      </div>

      <div className="mt-14 border-t border-line pt-14">
        {!process.env.ADMIN_PASSWORD ? (
          <p className="max-w-xl text-fg-soft">Falta configurar la variable ADMIN_PASSWORD en Vercel para habilitar el panel.</p>
        ) : !logueado ? (
          <Login />
        ) : !hayAlmacenamiento() ? (
          <p className="max-w-xl text-fg-soft">
            Falta conectar el almacenamiento: en Vercel, Storage → Create → Blob, conectarlo a este proyecto y volver a desplegar.
          </p>
        ) : (
          <PanelPromo inicial={await leerPromo()} />
        )}
      </div>
    </section>
  );
}
