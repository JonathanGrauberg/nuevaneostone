"use client";

import { useActionState, useState } from "react";
import { cambiarFecha, eliminarSucursal, entrar, guardarSucursal } from "./acciones";

const campo =
  "w-full border-b border-white/30 bg-transparent pt-2 pb-3 font-display text-lg font-light text-white outline-none transition-colors focus:border-accent [color-scheme:dark]";

export function Login() {
  const [error, accion, enviando] = useActionState(entrar, null);
  return (
    <form action={accion} className="mx-auto flex w-full max-w-sm flex-col gap-8 text-left">
      <label className="block">
        <span className="eyebrow !text-white/60">Usuario</span>
        <input name="usuario" required autoFocus autoComplete="username" autoCapitalize="none" className={campo} />
      </label>
      <label className="block">
        <span className="eyebrow !text-white/60">Contraseña</span>
        <input name="clave" type="password" required autoComplete="current-password" className={campo} />
      </label>
      {error && <p className="text-sm text-accent">{error}</p>}
      <button type="submit" disabled={enviando} className="btn-accent self-start">
        {enviando ? "Entrando…" : "Entrar"}
      </button>
    </form>
  );
}

export function EditarFecha({ fecha }: { fecha: string | null }) {
  const [estado, accion, guardando] = useActionState(cambiarFecha, null);
  return (
    <form action={accion} className="mx-auto mt-12 flex max-w-md flex-wrap items-end justify-center gap-4 border-t border-white/20 pt-10">
      <label className="block text-left">
        <span className="eyebrow !text-white/60">Cambiar fecha (lunes)</span>
        <input name="fecha" type="date" required defaultValue={fecha ?? ""} className={campo} />
      </label>
      <button type="submit" disabled={guardando} className="btn-accent">
        {guardando ? "Guardando…" : "Guardar"}
      </button>
      {estado && <p className={`w-full text-sm ${estado.error ? "text-accent" : "text-white/70"}`}>{estado.error ?? estado.ok}</p>}
    </form>
  );
}

type Sucursal = { usuario: string; nombre: string; editor: boolean };

/** Casa central: alta de sucursales, cambio de contraseña y baja. */
export function Sucursales({ lista }: { lista: Sucursal[] }) {
  const [estado, accion, guardando] = useActionState(guardarSucursal, null);
  const [elegida, setElegida] = useState<Sucursal | null>(null);

  return (
    <div className="mx-auto mt-16 max-w-3xl border-t border-white/20 pt-12 text-left">
      <p className="eyebrow !text-white/60">Sucursales con acceso ({lista.length})</p>

      <form
        key={elegida?.usuario ?? "nueva"}
        action={accion}
        className="mt-8 grid gap-6 bg-white/5 p-6 sm:grid-cols-3"
      >
        <p className="font-display text-lg sm:col-span-3">{elegida ? `Cambiar contraseña de ${elegida.usuario}` : "Dar de alta una sucursal"}</p>
        <label className="block">
          <span className="eyebrow !text-white/60">Nombre</span>
          <input name="nombre" defaultValue={elegida?.nombre} placeholder="Ej. Mármoles López" className={campo} />
        </label>
        <label className="block">
          <span className="eyebrow !text-white/60">Usuario</span>
          <input name="usuario" required defaultValue={elegida?.usuario} readOnly={!!elegida} autoCapitalize="none" autoComplete="off" placeholder="Ej. marmoleslopez.neo" className={campo} />
        </label>
        <label className="block">
          <span className="eyebrow !text-white/60">Contraseña</span>
          <input name="clave" required minLength={6} autoComplete="new-password" className={campo} />
        </label>
        <div className="flex flex-wrap items-center gap-4 sm:col-span-3">
          <button type="submit" disabled={guardando} className="btn-accent">
            {guardando ? "Guardando…" : elegida ? "Guardar contraseña" : "Dar de alta"}
          </button>
          {elegida && (
            <button type="button" onClick={() => setElegida(null)} className="text-sm text-white/70 hover:text-white">
              Cancelar
            </button>
          )}
          {estado && <p className={`text-sm ${estado.error ? "text-accent" : "text-white/70"}`}>{estado.error ?? estado.ok}</p>}
        </div>
      </form>

      <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
        {lista.map((s) => (
          <li key={s.usuario} className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-3">
            <span>
              <span className="block">{s.nombre || s.usuario}</span>
              <span className="text-sm text-white/50">{s.usuario}</span>
            </span>
            <span className="flex gap-5 text-sm">
              <button type="button" onClick={() => setElegida(s)} className="text-white/70 hover:text-white">
                Cambiar contraseña
              </button>
              {!s.editor && (
                <form action={eliminarSucursal} onSubmit={(e) => !confirm(`¿Dar de baja a ${s.nombre || s.usuario}? No va a poder entrar más.`) && e.preventDefault()}>
                  <input type="hidden" name="usuario" value={s.usuario} />
                  <button type="submit" className="text-accent hover:brightness-125">
                    Dar de baja
                  </button>
                </form>
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
