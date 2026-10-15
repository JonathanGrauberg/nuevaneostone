# Cómo editar el contenido

Todo el contenido editable vive en `data/`. No hace falta tocar componentes ni páginas.
Después de editar: `git push` → Vercel publica solo. Si algo está mal cargado, **el deploy
falla y avisa qué línea corregir**; el sitio en vivo nunca se rompe.

## Colores / terminaciones — `data/terminaciones.ts`

| Quiero…                           | Hago…                                                            |
| --------------------------------- | ---------------------------------------------------------------- |
| Agregar un color                  | Copiar una línea del mismo material y cambiar `id`, `nombre`, `imagen` |
| Ocultarlo (sin borrarlo)          | Agregar `activo: false`                                          |
| Marcarlo como nuevo               | `nuevo: true` (opcional `nuevoHasta: "2026-12-31"`)               |
| Que sea solo de cocina o placard  | `lineas: ["cocina"]` o `lineas: ["placard"]`                     |

El color aparece **solo** en todas las colecciones que usan ese material.
Para sacarlo de una colección puntual: en `data/colecciones.ts`, `excluir: ["id-del-color"]`.

## Showrooms — `data/showrooms.ts`

| Quiero…            | Hago…                                                                   |
| ------------------ | ----------------------------------------------------------------------- |
| Agregar uno        | Copiar un bloque completo y cambiar los datos. El `slug` es la URL (`/showrooms/slug`) |
| Cerrarlo           | `estado: "cerrado"` (su URL redirige al listado, no da error)          |
| Anunciarlo         | `estado: "proximamente"`                                               |
| Cambiar staff      | Editar la lista `staff` (`nombre`, `rol`, `foto`)                      |
| Cambiar horarios   | `horarios: [{ dias: "lun-vie", tramos: ["9:00-13:00", "16:00-20:00"] }]` |

Días válidos: `lun-vie`, `lun-sab`, `lun-dom`, `sab`, `dom`. El cartel "Abierto ahora" se calcula solo.
Coordenadas (`geo`): se usan para "showroom más cercano" y "otros cerca". Se copian de Google Maps
(clic derecho sobre el local → las dos cifras).

## Colecciones — `data/colecciones.ts`

El orden del array es el orden en el sitio. `hero` = imagen horizontal del fondo; `portada` = vertical para la tarjeta.

## Imágenes

Las imágenes se recortan solas en cada formato: se suben tal cual, sin pasar por Canva.
(Por ahora se sirven desde el WordPress anterior; ver `lib/img.ts`.)

## Sección "Del plano a tu casa" (home)

El plano que se dibuja con el scroll está **calcado del render** `Cocina-London-Camara-2`
(`components/home/calcoLondon.ts`), por eso coincide línea por línea al fundirse con la foto.
Si se quiere usar otro render, hay que volver a calcar las líneas sobre la nueva imagen;
cambiar solo la foto haría que el plano deje de coincidir.
