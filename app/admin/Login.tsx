"use client";

import { useActionState } from "react";
import { entrar } from "./acciones";

export function Login() {
  const [error, accion, enviando] = useActionState(entrar, null);
  return (
    <form action={accion} className="flex max-w-md flex-col gap-8">
      <label className="block">
        <span className="eyebrow">Contraseña</span>
        <input
          name="clave"
          type="password"
          required
          autoFocus
          autoComplete="current-password"
          className="w-full border-b border-line-strong bg-transparent pt-2 pb-3 font-display text-lg font-light outline-none focus:border-accent"
        />
      </label>
      {error && <p className="text-sm text-accent">{error}</p>}
      <button type="submit" disabled={enviando} className="btn-outline self-start">
        {enviando ? "Entrando…" : "Entrar"}
      </button>
    </form>
  );
}
