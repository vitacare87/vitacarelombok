import type { MetadataRoute } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vitacarelombok.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/layanan', '/tracking', '/partner', '/rujukan', '/dashboard', '/testimoni', '/tentang', '/kontak']
  const now = new Date()
  return routes.map((route) => ({
    url: siteUrl + route,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.7,
  }))
}
