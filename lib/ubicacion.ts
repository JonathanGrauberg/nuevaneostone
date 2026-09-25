"use client";

import { useSyncExternalStore } from "react";
import type { LatLng } from "./geo";

/**
 * Ubicación del visitante, guardada en su navegador por 12 h para no pedir
 * permiso en cada página. Nunca sale del navegador.
 */
const KEY = "neostone:ubicacion";
const EVENTO = "neostone:ubicacion";
const VIGENCIA_MS = 12 * 60 * 60 * 1000;

let cacheRaw: string | null = null;
let cacheValor: LatLng | null = null;

function leer(): LatLng | null {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(KEY);
  } catch {}
  if (raw !== cacheRaw) {
    cacheRaw = raw;
    cacheValor = null;
    try {
      const v = raw ? (JSON.parse(raw) as LatLng & { t: number }) : null;
      if (v && Date.now() - v.t < VIGENCIA_MS) cacheValor = { lat: v.lat, lng: v.lng };
    } catch {}
  }
  return cacheValor;
}

function suscribir(cb: () => void) {
  window.addEventListener("storage", cb);
  window.addEventListener(EVENTO, cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener(EVENTO, cb);
  };
}

export function guardarUbicacion(p: LatLng) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ ...p, t: Date.now() }));
  } catch {}
  window.dispatchEvent(new Event(EVENTO));
}

/** Pide la ubicación al navegador (muestra el aviso de permiso si hace falta) y la guarda. */
export function pedirUbicacion(): Promise<LatLng> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) return reject(new Error("sin geolocalización"));
    navigator.geolocation.getCurrentPosition(
      (p) => {
        const pos = { lat: p.coords.latitude, lng: p.coords.longitude };
        guardarUbicacion(pos);
        resolve(pos);
      },
      reject,
      { timeout: 10000, maximumAge: 10 * 60 * 1000 },
    );
  });
}

/** true si el visitante ya concedió el permiso (se puede pedir sin mostrar aviso). */
export async function permisoConcedido() {
  try {
    const r = await navigator.permissions.query({ name: "geolocation" });
    return r.state === "granted";
  } catch {
    return false;
  }
}

export function useUbicacion() {
  return useSyncExternalStore(suscribir, leer, () => null);
}
