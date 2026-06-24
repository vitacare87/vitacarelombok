// examples/HomePage.server.tsx
// CONTOH untuk Next.js App Router (Server Component) -> taruh jadi app/page.tsx
// Data dibaca saat build/SSR dari public/vitacare-data.json.

import { getSiteData, activeServices, activeNav } from "@/lib/vitacare-data";

export default function Home() {
  const data = getSiteData();
  const services = activeServices(data);
  const nav = activeNav(data);

  return (
    <>
      <header className="site-header">
        <nav className="nav">
          <a className="brand" href="/">
            <span className="logo">✚</span>
            <span>
              {data.site.name}
              <small>{data.site.tagline}</small>
            </span>
          </a>
          <div className="nav-links">
            {nav.map((n) => (
              <a key={n.id} href={n.url}>
                {n.label}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <section id="layanan">
        <div className="services-grid">
          {services.map((s) => (
            <article key={s.id} className="service-card">
              <div className="service-icon">{s.icon}</div>
              <h3>{s.name}</h3>
              <p>{s.desc}</p>
              {s.price ? <div className="svc-price">{s.price}</div> : null}
              {s.popular ? <span className="svc-pop">Populer</span> : null}
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
