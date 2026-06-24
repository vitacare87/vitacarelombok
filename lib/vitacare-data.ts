// lib/vitacare-data.ts
// Helper untuk membaca data situs (diekspor dari panel admin: /admin.html).
// File data ada di: public/vitacare-data.json
//
// Pakai getSiteData() di Server Component (App Router) atau getStaticProps (Pages Router).
// Untuk Client Component, gunакan fetch("/vitacare-data.json") -> lihat examples/useSiteData.ts

import fs from "node:fs";
import path from "node:path";

export type Service = {
  id: string;
  icon: string;
  name: string;
  desc: string;
  price: string;
  category: string;
  popular: boolean;
  active: boolean;
};

export type NavItem = {
  id: string;
  label: string;
  url: string;
  active: boolean;
};

export type CoveragePoint = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  radius: number;
  desc: string;
  tourist: boolean;
  active: boolean;
};

export type SiteData = {
  _meta?: { app: string; version: number; exportedAt: string };
  site: { name: string; tagline: string; whatsapp: string };
  services: Service[];
  nav: NavItem[];
  legalNav: NavItem[];
  coverage: CoveragePoint[];
};

/** Baca data situs dari public/vitacare-data.json (server-side only). */
export function getSiteData(): SiteData {
  const file = path.join(process.cwd(), "public", "vitacare-data.json");
  const raw = fs.readFileSync(file, "utf8");
  return JSON.parse(raw) as SiteData;
}

/** Filter helper -- hanya tampilkan item yang aktif. */
export const activeServices = (d: SiteData) =>
  (d.services || []).filter((s) => s.active);
export const activeNav = (d: SiteData) =>
  (d.nav || []).filter((n) => n.active !== false);
export const activeLegalNav = (d: SiteData) =>
  (d.legalNav || []).filter((n) => n.active !== false);
export const activeCoverage = (d: SiteData) =>
  (d.coverage || []).filter((c) => c.active !== false);
