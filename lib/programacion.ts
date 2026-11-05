import "server-only";
import { createHash, createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { del, list, put } from "@vercel/blob";
import { cookies } from "next/headers";
import { z } from "zod";

/**
 * /programacion: semana de fabricación de los pedidos, para distribuidores.
 *
 * Cuentas: se guardan en Vercel Blob con la contraseña cifrada (scrypt) y casa central
 * las administra desde la página. La primera vez se cargan de la variable de entorno
 * PROGRAMACION_CUENTAS (JSON { "usuario": { "clave": "...", "nombre": "..." } }); desde el
 * primer cambio hecho en la página, manda lo guardado en Blob.
 * Los usuarios de EDITORES pueden cambiar la fecha y las cuentas.
 */
export const EDITORES = ["neostone"];
const COOKIE = "neostone-programacion";
const P_FECHA = "programacion/fecha";
const P_CUENTAS = "programacion/cuentas";

type Cuenta = { nombre: string; sal: string; hash: string };
type Cuentas = Record<string, Cuenta>;

const cifrar = (clave: string, sal: string) => scryptSync(clave, sal, 32).toString("hex");
const normalizar = (usuario: string) => usuario.trim().toLowerCase();
const iguales = (a: string, b: string) => {
  const [x, y] = [a, b].map((s) => createHash("sha256").update(s).digest());
  return timingSafeEqual(x, y);
};

async function leerJson(prefijo: string) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return null;
  const { blobs } = await list({ prefix: prefijo });
  const ultimo = blobs.sort((a, b) => +b.uploadedAt - +a.uploadedAt)[0];
  if (!ultimo) return null;
  return fetch(ultimo.url, { cache: "no-store" }).then((r) => r.json());
}

async function escribirJson(prefijo: string, datos: unknown) {
  const { blobs } = await list({ prefix: prefijo });
  // Archivo nuevo en cada guardado (sufijo al azar, imposible de adivinar) y se borran los anteriores
  await put(`${prefijo}.json`, JSON.stringify(datos), { access: "public", addRandomSuffix: true, contentType: "application/json" });
  if (blobs.length) await del(blobs.map((b) => b.url));
}

/** Cuentas iniciales desde la variable de entorno. Sal fija por usuario, para que no cambie entre pedidos. */
function cuentasIniciales(): Cuentas {
  try {
    const crudo = z.record(z.string(), z.object({ clave: z.string().min(1), nombre: z.string().default("") })).parse(JSON.parse(process.env.PROGRAMACION_CUENTAS ?? ""));
    return Object.fromEntries(
      Object.entries(crudo).map(([u, c]) => {
        const sal = createHash("sha256").update(`programacion:${normalizar(u)}`).digest("hex").slice(0, 32);
        return [normalizar(u), { nombre: c.nombre, sal, hash: cifrar(c.clave, sal) }];
      }),
    );
  } catch {
    return {};
  }
}

export async function leerCuentas(): Promise<Cuentas> {
  try {
    const guardadas = await leerJson(P_CUENTAS);
    if (guardadas) return guardadas as Cuentas;
  } catch {}
  return cuentasIniciales();
}

export const hayCuentas = async () => Object.keys(await leerCuentas()).length > 0;

// Firma de la sesión con el hash de la cuenta: si se cambia la contraseña o se borra la cuenta, deja de valer
const firma = (usuario: string, cuenta: Cuenta) => createHmac("sha256", cuenta.hash).update(`programacion:${usuario}`).digest("hex");

export type Sesion = { usuario: string; nombre: string; editor: boolean };

export async function sesionActual(): Promise<Sesion | null> {
  const [usuario, sello] = (await cookies()).get(COOKIE)?.value?.split("|") ?? [];
  if (!usuario || !sello) return null;
  const cuenta = (await leerCuentas())[usuario];
  if (!cuenta || !iguales(sello, firma(usuario, cuenta))) return null;
  return { usuario, nombre: cuenta.nombre, editor: EDITORES.includes(usuario) };
}

/** Devuelve false si el usuario no existe o la contraseña no coincide. El usuario no distingue mayúsculas. */
export async function iniciarSesion(usuarioIngresado: string, clave: string) {
  const usuario = normalizar(usuarioIngresado);
  const cuenta = (await leerCuentas())[usuario];
  if (!cuenta || !iguales(cifrar(clave, cuenta.sal), cuenta.hash)) return false;
  (await cookies()).set(COOKIE, `${usuario}|${firma(usuario, cuenta)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/programacion",
    maxAge: 60 * 60 * 24 * 30,
  });
  return true;
}

export async function cerrarSesion() {
  (await cookies()).delete({ name: COOKIE, path: "/programacion" });
}

/** Alta o cambio de contraseña (si el usuario ya existe, se reemplaza su clave y nombre). */
export async function guardarCuenta(usuarioIngresado: string, nombre: string, clave: string) {
  const usuario = normalizar(usuarioIngresado);
  const cuentas = await leerCuentas();
  const sal = randomBytes(16).toString("hex");
  cuentas[usuario] = { nombre: nombre.trim() || cuentas[usuario]?.nombre || "", sal, hash: cifrar(clave, sal) };
  await escribirJson(P_CUENTAS, cuentas);
  return usuario;
}

export async function borrarCuenta(usuario: string) {
  const cuentas = await leerCuentas();
  delete cuentas[usuario];
  await escribirJson(P_CUENTAS, cuentas);
}

/** Fecha guardada (AAAA-MM-DD) o null si todavía no se cargó ninguna. */
export async function leerFecha(): Promise<string | null> {
  try {
    const datos = await leerJson(P_FECHA);
    return typeof datos?.fecha === "string" ? datos.fecha : null;
  } catch {
    return null;
  }
}

export async function guardarFecha(fecha: string, usuario: string) {
  await escribirJson(P_FECHA, { fecha, usuario, cambiada: new Date().toISOString() });
}
