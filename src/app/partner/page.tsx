import type { Metadata } from 'next'
import SectionHeading from '@/components/SectionHeading'
import { partners, type Partner } from '@/lib/data'
import { Building2, Stethoscope, FlaskConical, Pill, Ambulance } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Partner Kami - Rumah Sakit, Klinik, Lab, Apotek & Ambulans',
  description:
    'Jaringan partner Vita Care Lombok: rumah sakit, klinik, laboratorium, apotek, dan ambulans partner di Lombok & Mataram untuk sistem rujukan terintegrasi.',
  alternates: { canonical: '/partner' },
}

const groups: { type: Partner['type']; icon: typeof Building2; color: string }[] = [
  { type: 'Rumah Sakit', icon: Building2, color: 'text-medical-600 bg-medical-50' },
  { type: 'Klinik', icon: Stethoscope, color: 'text-health-600 bg-health-50' },
  { type: 'Laboratorium', icon: FlaskConical, color: 'text-purple-600 bg-purple-50' },
  { type: 'Apotek', icon: Pill, color: 'text-amber-600 bg-amber-50' },
  { type: 'Ambulans', icon: Ambulance, color: 'text-emergency bg-red-50' },
]

export default function PartnerPage() {
  return (
    <>
      <section className="gradient-medical py-16 text-white">
        <div className="container-px">
          <span className="badge bg-white/15 text-white">Partner Kami</span>
          <h1 className="mt-4 text-3xl font-extrabold sm:text-5xl">Jaringan Faskes Partner</h1>
          <p className="mt-4 max-w-2xl text-medical-50/90">
            Kami bermitra dengan rumah sakit, klinik, laboratorium, apotek, dan layanan ambulans terpercaya di Lombok.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-px space-y-14">
          {groups.map((g) => {
            const list = partners.filter((p) => p.type === g.type)
            const Icon = g.icon
            return (
              <div key={g.type}>
                <div className="flex items-center gap-3">
                  <span className={`flex h-11 w-11 items-center justify-center rounded-2xl ${g.color}`}>
                    <Icon className="h-6 w-6" />
                  </span>
                  <h2 className="text-xl font-bold text-medical-900">{g.type} Partner</h2>
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {list.map((p) => (
                    <div key={p.name} className="card card-hover flex items-center gap-4">
                      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl gradient-medical text-sm font-extrabold text-white">
                        {p.initials}
                      </span>
                      <div>
                        <p className="text-sm font-bold text-medical-900">{p.name}</p>
                        <p className="text-xs text-slate-400">{p.type}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}
