"use server";

import { redirect } from "next/navigation";
import { cerrarSesion, estaLogueado, iniciarSesion } from "@/lib/admin";
import { escribirPromo, promoSchema } from "@/lib/promo";

export async function entrar(_: string | null, form: FormData) {
  const ok = await iniciarSesion(String(form.get("clave") ?? ""));
  if (!ok) return "Contraseña incorrecta.";
  redirect("/admin");
}

export async function salir() {
  await cerrarSesion();
  redirect("/admin");
}

export async function guardarPromo(datos: unknown) {
  if (!(await estaLogueado())) return { error: "Sesión vencida: volvé a entrar al panel." };
  const promo = promoSchema.safeParse({ ...(datos as object), id: Date.now().toString(36) });
  if (!promo.success) return { error: "Falta la imagen principal." };
  await escribirPromo(promo.data);
  return { promo: promo.data };
}
