import { listadoConClaves, sesionActual } from "@/lib/programacion";

/**
 * Listado de usuarios y contraseñas de /programacion, solo para casa central.
 *   ?formato=excel → .csv que abre directo en Excel
 *   ?formato=pdf   → página lista para imprimir / "Guardar como PDF"
 */
export async function GET(request: Request) {
  const sesion = await sesionActual();
  if (!sesion?.editor) return new Response("Sin permiso", { status: 403 });

  const filas = await listadoConClaves();
  const sinClave = "(no disponible: volver a cargarla)";
  const hoy = new Date().toLocaleDateString("es-AR", { timeZone: "America/Argentina/Buenos_Aires" });
  const sinCache = { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" };

  if (new URL(request.url).searchParams.get("formato") === "excel") {
    // Separador ";" y BOM: así Excel en español lo abre en columnas y con acentos
    const celda = (v: string) => `"${v.replace(/"/g, '""')}"`;
    const csv = [["Sucursal", "Usuario", "Contraseña"], ...filas.map((f) => [f.nombre, f.usuario, f.clave ?? sinClave])]
      .map((fila) => fila.map(celda).join(";"))
      .join("\r\n");
    return new Response(`﻿${csv}\r\n`, {
      headers: {
        ...sinCache,
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="usuarios-programacion-${hoy.replace(/\//g, "-")}.csv"`,
      },
    });
  }

  const esc = (v: string) => v.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);
  const html = `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex"><title>Usuarios programación · Neostone · ${hoy}</title>
<style>
  body{font-family:Arial,Helvetica,sans-serif;color:#111;margin:32px}
  h1{font-size:18px;margin:0 0 4px} p{font-size:12px;color:#555;margin:0 0 20px}
  table{border-collapse:collapse;width:100%;font-size:12px}
  th,td{border:1px solid #ccc;padding:6px 8px;text-align:left} th{background:#f2f2f2}
  td.clave{font-family:Consolas,monospace} .falta{color:#b00;font-family:Arial,sans-serif}
  .acciones{margin-bottom:20px} button{font-size:13px;padding:6px 14px;cursor:pointer}
  @media print{.acciones{display:none} body{margin:0}}
</style></head><body>
<div class="acciones"><button onclick="print()">Imprimir / Guardar como PDF</button></div>
<h1>Neostone · Acceso a programación</h1>
<p>neostone.com.ar/programacion · Listado al ${hoy} · ${filas.length} usuarios · Confidencial</p>
<table><thead><tr><th>Sucursal</th><th>Usuario</th><th>Contraseña</th></tr></thead><tbody>
${filas
  .map(
    (f) =>
      `<tr><td>${esc(f.nombre || "—")}</td><td>${esc(f.usuario)}</td>${
        f.clave === null ? `<td class="falta">${sinClave}</td>` : `<td class="clave">${esc(f.clave)}</td>`
      }</tr>`,
  )
  .join("\n")}
</tbody></table>
<script>addEventListener("load",()=>setTimeout(print,300))</script>
</body></html>`;
  return new Response(html, { headers: { ...sinCache, "Content-Type": "text/html; charset=utf-8" } });
}
