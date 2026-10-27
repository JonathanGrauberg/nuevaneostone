import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { getColecciones, getShowrooms } from "@/lib/content";

// Se regenera solo: cada colección o showroom nuevo en /data entra al sitemap.
export default function sitemap(): MetadataRoute.Sitemap {
  const u = (p: string) => `${site.url}${p}`;
  return [
    { url: u("/"), priority: 1 },
    { url: u("/colecciones"), priority: 0.9 },
    ...getColecciones().map((c) => ({ url: u(`/colecciones/${c.slug}`), priority: 0.8 })),
    { url: u("/showrooms"), priority: 0.9 },
    ...getShowrooms().map((s) => ({ url: u(`/showrooms/${s.slug}`), priority: 0.8 })),
    { url: u("/experiencia-vr"), priority: 0.8 },
  ];
}
