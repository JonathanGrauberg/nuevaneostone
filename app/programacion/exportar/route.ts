import { nosotros } from "@/data/home";
import { wp } from "@/lib/img";
import { listadoConClaves, sesionActual } from "@/lib/programacion";

/**
 * Listado de usuarios y contraseñas de /programacion, solo para casa central.
 *   ?formato=excel → .csv que abre directo en Excel
 *   ?formato=pdf   → página lista para imprimir / "Guardar como PDF"
 *   &central=1     → incluye a casa central en el listado (por defecto no figura)
 *   ?formato=invitacion&usuario=x → tarjeta de bienvenida para mandarle a esa sucursal
 */
export async function GET(request: Request) {
  const sesion = await sesionActual();
  if (!sesion?.editor) return new Response("Sin permiso", { status: 403 });

  const params = new URL(request.url).searchParams;
  const todas = await listadoConClaves();
  // Casa central solo figura en el listado si se pide (?central=1); por defecto se comparte sin ella
  const filas = params.get("central") === "1" ? todas : todas.filter((f) => !f.editor);
  const sinClave = "(no disponible: volver a cargarla)";
  const hoy = new Date().toLocaleDateString("es-AR", { timeZone: "America/Argentina/Buenos_Aires" });
  const sinCache = { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" };

  if (params.get("formato") === "excel") {
    // Separador ";" y BOM: así Excel en español lo abre en columnas y con acentos
    const celda = (v: string) => `"${v.replace(/"/g, '""')}"`;
    const csv = [["Sucursal", "Usuario", "Contraseña"], ...filas.map((f) => [f.nombre, f.usuario, f.clave ?? sinClave])]
      .map((fila) => fila.map(celda).join(";"))
      .join("\r\n");
    return new Response(`\uFEFF${csv}\r\n`, {
      headers: {
        ...sinCache,
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="usuarios-programacion-${hoy.replace(/\//g, "-")}.csv"`,
      },
    });
  }

  const esc = (v: string) => v.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);
  const logo = new URL(wp("2025/05/Logo-grande-horizontal-blanco.png"), request.url).toString();
  const fuentes = `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&family=Roboto+Mono:wght@500&display=swap" rel="stylesheet">`;
  const imprimir = `<script>addEventListener("load",()=>document.fonts.ready.then(()=>setTimeout(print,400)))</script>`;

  if (params.get("formato") === "invitacion") {
    const f = todas.find((x) => x.usuario === (params.get("usuario") ?? "").toLowerCase());
    if (!f) return new Response("No existe ese usuario", { status: 404 });
    if (f.clave === null)
      return new Response(`La contraseña de ${f.usuario} no se puede recuperar. Volvé a cargarla con "Cambiar contraseña" y generá la invitación de nuevo.`, {
        status: 409,
        headers: { ...sinCache, "Content-Type": "text/plain; charset=utf-8" },
      });
    const fondo = new URL(nosotros.imagen, request.url).toString();
    const tarjeta = `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex"><title>Invitación programación · ${esc(f.nombre || f.usuario)} · Neostone</title>
${fuentes}
<style>
  @page{size:210mm 130mm;margin:0}
  *{box-sizing:border-box;-webkit-print-color-adjust:exact;print-color-adjust:exact}
  body{margin:0;background:#e9e9e9;font-family:Montserrat,Arial,sans-serif;color:#fff;display:flex;min-height:100vh;align-items:center;justify-content:center;padding:24px}
  .tarjeta{position:relative;width:210mm;height:130mm;background:#0b0b0b;overflow:hidden;box-shadow:0 10px 40px rgba(0,0,0,.25);display:grid;grid-template-columns:1.05fr 1fr}
  .tarjeta::before{content:"";position:absolute;inset:0;background:url("${fondo}") center/cover;filter:grayscale(1);opacity:.22}
  .tarjeta::after{content:"";position:absolute;inset:0;background:linear-gradient(100deg,#0b0b0b 30%,rgba(11,11,11,.55))}
  .tarjeta>*{position:relative;z-index:1}
  .izq{padding:30mm 8mm 22mm 13mm;display:flex;flex-direction:column;justify-content:center}
  .logo{position:absolute;left:13mm;top:12mm;width:46mm;z-index:1}
  .eyebrow{margin:0;font-size:8px;letter-spacing:.32em;text-transform:uppercase;color:#DE0A0A;font-weight:600}
  h1{font-weight:300;font-size:23px;line-height:1.15;margin:3.5mm 0 0;letter-spacing:-.01em}
  h1 b{font-weight:600;display:block}
  .texto{font-size:10px;line-height:1.7;color:rgba(255,255,255,.72);margin:5mm 0 0;max-width:80mm}
  .der{padding:30mm 13mm 22mm 6mm;display:flex;flex-direction:column;justify-content:center;gap:4.5mm}
  .dato{border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.04);padding:3.6mm 4.5mm}
  .dato span{display:block;font-size:7.5px;letter-spacing:.28em;text-transform:uppercase;color:rgba(255,255,255,.5);margin-bottom:1.6mm}
  .dato b{font-family:"Roboto Mono",Consolas,monospace;font-weight:500;font-size:15px;letter-spacing:.02em;word-break:break-all}
  .dato.web{border-color:#DE0A0A;background:rgba(222,10,10,.12)}
  .dato.web b{font-family:Montserrat,Arial,sans-serif;font-size:13px;font-weight:600}
  .pie{position:absolute;left:13mm;right:13mm;bottom:6mm;display:flex;justify-content:space-between;font-size:7px;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.38)}
  .linea{position:absolute;left:0;top:0;bottom:0;width:2mm;background:#DE0A0A}
  .acciones{position:fixed;top:16px;right:16px}
  .acciones button{font:500 12px Montserrat,Arial,sans-serif;letter-spacing:.12em;text-transform:uppercase;background:#DE0A0A;color:#fff;border:0;padding:12px 18px;cursor:pointer}
  @media print{body{background:none;padding:0;min-height:0;display:block}.tarjeta{box-shadow:none}.acciones{display:none}}
</style></head><body>
<div class="acciones"><button onclick="print()">Imprimir / Guardar PDF</button></div>
<main class="tarjeta">
  <div class="linea"></div>
  <img class="logo" src="${logo}" alt="Neostone Amoblamientos">
  <div class="izq">
    <p class="eyebrow">Acceso exclusivo para la red Neostone</p>
    <h1>${f.nombre ? `${esc(f.nombre)},` : "Hola,"}<b>ya tenés acceso a la programación de pedidos.</b></h1>
    <p class="texto">Desde casa central habilitamos tu usuario para que consultes en todo momento la semana en que se programan los pedidos confirmados y abonados.</p>
  </div>
  <div class="der">
    <div class="dato web"><span>Ingresá en</span><b>neostone.com.ar/programacion</b></div>
    <div class="dato"><span>Usuario</span><b>${esc(f.usuario)}</b></div>
    <div class="dato"><span>Contraseña</span><b>${esc(f.clave)}</b></div>
  </div>
  <div class="pie"><span>Datos personales · No compartir</span><span>Neostone S.A. · Crespo, Entre Ríos</span></div>
</main>
</body></html>`;
    return new Response(tarjeta, { headers: { ...sinCache, "Content-Type": "text/html; charset=utf-8" } });
  }

  const html = `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex"><title>Usuarios programación · Neostone · ${hoy}</title>
${fuentes}
<style>
  @page{size:A4;margin:16mm 14mm}
  *{box-sizing:border-box;-webkit-print-color-adjust:exact;print-color-adjust:exact}
  body{margin:0;background:#e9e9e9;font-family:Montserrat,Arial,sans-serif;color:#1a1a1a}
  .hoja{max-width:820px;margin:32px auto;background:#fff;padding:48px 52px;box-shadow:0 2px 24px rgba(0,0,0,.08)}
  header{display:flex;justify-content:space-between;align-items:flex-end;gap:24px;padding-bottom:22px;border-bottom:2px solid #DE0A0A}
  header img{height:34px;filter:invert(1)}
  .fecha{text-align:right;font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:#777;line-height:1.7}
  .fecha b{display:block;font-size:13px;letter-spacing:.05em;color:#1a1a1a;font-weight:500}
  h1{font-weight:300;font-size:26px;margin:30px 0 6px;letter-spacing:-.01em}
  h1 b{font-weight:600}
  .bajada{font-size:12px;color:#666;margin:0 0 26px;line-height:1.6}
  .bajada a{color:#DE0A0A;text-decoration:none;font-weight:500}
  table{border-collapse:collapse;width:100%;font-size:12px}
  thead th{font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:#888;font-weight:500;text-align:left;padding:0 12px 10px;border-bottom:1px solid #ddd}
  tbody td{padding:11px 12px;border-bottom:1px solid #eee;vertical-align:middle}
  tbody tr:nth-child(even) td{background:#fafafa}
  tr{break-inside:avoid}
  .n{color:#bbb;font-size:10px;width:28px}
  .suc{font-weight:500}
  .usr,.clave{font-family:"Roboto Mono",Consolas,monospace;font-size:12px}
  .clave span{background:#f3f3f3;border-radius:4px;padding:3px 8px}
  .central td{background:#fff5f5!important}
  .tag{display:inline-block;margin-left:8px;font-size:8px;letter-spacing:.15em;text-transform:uppercase;color:#DE0A0A;border:1px solid #DE0A0A;border-radius:3px;padding:2px 5px;vertical-align:middle}
  .falta{font-size:10px;color:#b00}
  footer{display:flex;justify-content:space-between;gap:24px;margin-top:30px;padding-top:16px;border-top:1px solid #eee;font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:#999}
  footer b{color:#DE0A0A;font-weight:600}
  .acciones{position:fixed;top:16px;right:16px}
  .acciones button{font:500 12px Montserrat,Arial,sans-serif;letter-spacing:.12em;text-transform:uppercase;background:#DE0A0A;color:#fff;border:0;padding:12px 18px;cursor:pointer}
  @media (max-width:700px){.hoja{margin:0;padding:28px 18px}.acciones{position:static;padding:12px}}
  @media print{body{background:#fff}.hoja{margin:0;padding:0;box-shadow:none;max-width:none}.acciones{display:none}}
</style></head><body>
<div class="acciones"><button onclick="print()">Guardar como PDF</button></div>
<main class="hoja">
<header>
  <img src="${logo}" alt="Neostone Amoblamientos">
  <div class="fecha">Listado al<b>${hoy}</b></div>
</header>
<h1>Acceso a <b>programación de pedidos</b></h1>
<p class="bajada">Usuarios y contraseñas de cada sucursal para ingresar en <a href="https://neostone.com.ar/programacion">neostone.com.ar/programacion</a>. ${filas.length} usuarios.</p>
<table><thead><tr><th>#</th><th>Sucursal</th><th>Usuario</th><th>Contraseña</th></tr></thead><tbody>
${filas
  .map(
    (f, i) =>
      `<tr${f.editor ? ' class="central"' : ""}><td class="n">${String(i + 1).padStart(2, "0")}</td><td class="suc">${esc(f.nombre || "—")}${
        f.editor ? '<span class="tag">Casa central</span>' : ""
      }</td><td class="usr">${esc(f.usuario)}</td>${
        f.clave === null ? `<td class="falta">${sinClave}</td>` : `<td class="clave"><span>${esc(f.clave)}</span></td>`
      }</tr>`,
  )
  .join("")}
</tbody></table>
<footer><span><b>Confidencial</b> · No compartir fuera de la red Neostone</span><span>Neostone S.A. · Crespo, Entre Ríos</span></footer>
</main>
${imprimir}
</body></html>`;
  return new Response(html, { headers: { ...sinCache, "Content-Type": "text/html; charset=utf-8" } });
}
