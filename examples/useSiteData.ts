// examples/useSiteData.ts
// CONTOH hook untuk Client Component -- ambil data saat runtime dari /vitacare-data.json
"use client";

import { useEffect, useState } from "react";
import type { SiteData } from "@/lib/vitacare-data";

export function useSiteData() {
  const [data, setData] = useState<SiteData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    fetch("/vitacare-data.json", { cache: "no-store" })
      .then((r) => r.json())
      .then((d: SiteData) => {
        if (alive) setData(d);
      })
      .catch(() => {})
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  return { data, loading };
}

// Pemakaian (Client Component):
//
//   "use client";
//   import { useSiteData } from "@/examples/useSiteData";
//
//   export function Services() {
//     const { data, loading } = useSiteData();
//     if (loading || !data) return null;
//     const services = data.services.filter((s) => s.active);
//     return (
//       <div className="services-grid">
//         {services.map((s) => (
//           <article key={s.id} className="service-card">
//             <div className="service-icon">{s.icon}</div>
//             <h3>{s.name}</h3>
//             <p>{s.desc}</p>
//           </article>
//         ))}
//       </div>
//     );
//   }
