"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { borrarCuenta, cerrarSesion, EDITORES, guardarCuenta, guardarFecha, iniciarSesion, leerCuentas, sesionActual } from "@/lib/programacion";

type Estado = { ok?: string; error?: string } | null;

export async function entrar(_: string | null, form: FormData) {
  const ok = await iniciarSesion(String(form.get("usuario") ?? ""), String(form.get("clave") ?? ""));
  if (!ok) return "Usuario o contraseña incorrectos.";
  redirect("/programacion");
}

export async function salir() {
  await cerrarSesion();
  redirect("/programacion");
}

const sinPermiso = { error: "Tu usuario no tiene permiso para hacer cambios." };

export async function cambiarFecha(_: Estado, form: FormData): Promise<Estado> {
  const sesion = await sesionActual();
  if (!sesion?.editor) return sinPermiso;
  const fecha = String(form.get("fecha") ?? "");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)) return { error: "Elegí una fecha." };
  // La programación es por semana: la fecha tiene que ser un lunes
  if (new Date(`${fecha}T12:00:00`).getDay() !== 1) return { error: "La fecha tiene que ser un lunes." };
  await guardarFecha(fecha, sesion.usuario);
  revalidatePath("/programacion");
  return { ok: "Fecha actualizada." };
}

/** Alta de sucursal nueva, o cambio de contraseña si el usuario ya existe. */
export async function guardarSucursal(_: Estado, form: FormData): Promise<Estado> {
  if (!(await sesionActual())?.editor) return sinPermiso;
  const usuario = String(form.get("usuario") ?? "").trim();
  const nombre = String(form.get("nombre") ?? "");
  const clave = String(form.get("clave") ?? "");
  if (!/^[\w.-]{3,40}$/.test(usuario)) return { error: "El usuario debe tener entre 3 y 40 letras, números, puntos o guiones, sin espacios." };
  if (clave.length < 6) return { error: "La contraseña debe tener al menos 6 caracteres." };
  const existia = usuario.toLowerCase() in (await leerCuentas());
  await guardarCuenta(usuario, nombre, clave);
  revalidatePath("/programacion");
  return { ok: existia ? `Contraseña de ${usuario} actualizada.` : `Sucursal ${usuario} dada de alta.` };
}

export async function eliminarSucursal(form: FormData) {
  const usuario = String(form.get("usuario") ?? "");
  if (!(await sesionActual())?.editor || EDITORES.includes(usuario)) return;
  await borrarCuenta(usuario);
  revalidatePath("/programacion");
}
