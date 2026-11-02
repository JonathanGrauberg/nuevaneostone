import "server-only";
import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

/**
 * Acceso al panel /admin: una sola contraseña (variable de entorno ADMIN_PASSWORD).
 * Al entrar se guarda una cookie firmada con esa contraseña; si se cambia la
 * contraseña en Vercel, todas las sesiones abiertas dejan de valer.
 */
const COOKIE = "neostone-admin";

const firma = (clave: string) => createHmac("sha256", clave).update("neostone-admin").digest("hex");
const iguales = (a: string, b: string) => {
  const [x, y] = [a, b].map((s) => createHash("sha256").update(s).digest());
  return timingSafeEqual(x, y);
};

export async function estaLogueado() {
  const clave = process.env.ADMIN_PASSWORD;
  const valor = (await cookies()).get(COOKIE)?.value;
  return !!clave && !!valor && iguales(valor, firma(clave));
}

/** Devuelve false si la contraseña no coincide (o si no hay ADMIN_PASSWORD configurada). */
export async function iniciarSesion(intento: string) {
  const clave = process.env.ADMIN_PASSWORD;
  if (!clave || !iguales(intento, clave)) return false;
  (await cookies()).set(COOKIE, firma(clave), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return true;
}

export async function cerrarSesion() {
  (await cookies()).delete(COOKIE);
}
