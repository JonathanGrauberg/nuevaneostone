# Neostone Amoblamientos — sitio web

Sitio de [Neostone Amoblamientos](https://neostone.com.ar) (Crespo, Entre Ríos): cocinas, placards,
vestidores, mesadas y baños, con showrooms en todo el país.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Motion · Zod · Vercel.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # valida /data y genera el sitio estático
```

## Estructura

```
app/          páginas (home, /colecciones/[slug], /showrooms/[slug], /beneficios)
components/   componentes reutilizables (cards, motion, layout, colecciones, showrooms)
data/         CONTENIDO EDITABLE: colecciones, terminaciones, showrooms, textos
lib/          validación de datos (zod), horarios, geolocalización
docs/         guía de edición de contenido
```

## Editar contenido

Todo el contenido vive en `data/` — ver **[docs/COMO-EDITAR.md](docs/COMO-EDITAR.md)**.
Si un dato está mal cargado, el build falla indicando archivo y campo, así nunca se publica un sitio roto.

## Pendiente

- Formularios (presupuesto, distribuidores, post venta) con Prisma + PostgreSQL
- Página Experiencia VR con visor 360°
- Migrar imágenes desde neostone.com.ar a `/public`
