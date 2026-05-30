import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import type { Service } from '@/lib/data'

export default function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon
  return (
    <div id={service.slug} className="card card-hover scroll-mt-28 flex flex-col">
      <div className="flex items-center justify-between">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-medical-50 text-medical-600">
          <Icon className="h-7 w-7" />
        </span>
        {service.popular && <span className="badge-green">Populer</span>}
      </div>
      <h3 className="mt-5 text-lg font-bold text-medical-900">{service.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{service.description}</p>
      <ul className="mt-4 space-y-2">
        {service.features.map((f) => (
          <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
            <Check className="h-4 w-4 text-health-500" /> {f}
          </li>
        ))}
      </ul>
      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
        <span className="text-sm font-bold text-medical-700">{service.price}</span>
        <Link
          href={`/layanan?booking=${service.slug}`}
          className="inline-flex items-center gap-1 text-sm font-semibold text-health-600 hover:text-health-700"
        >
          Booking <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}
