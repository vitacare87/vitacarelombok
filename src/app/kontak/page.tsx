import type { Metadata } from 'next'
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Kontak - Hubungi Vita Care Lombok',
  description:
    'Hubungi Vita Care Lombok untuk layanan home care, dokter panggilan, dan ambulans di Lombok & Mataram. Layanan 24 jam via telepon dan WhatsApp.',
  alternates: { canonical: '/kontak' },
}

const items = [
  { icon: MapPin, label: 'Alamat', value: 'Jl. Pejanggik No.1, Mataram, Lombok, NTB' },
  { icon: Phone, label: 'Telepon', value: '+62 819-0000-0000' },
  { icon: Mail, label: 'Email', value: 'halo@vitacarelombok.com' },
  { icon: Clock, label: 'Jam Operasional', value: 'Setiap hari, 24 jam' },
]

export default function KontakPage() {
  return (
    <>
      <section className="gradient-medical py-16 text-white">
        <div className="container-px">
          <span className="badge bg-white/15 text-white">Kontak</span>
          <h1 className="mt-4 text-3xl font-extrabold sm:text-5xl">Hubungi Kami</h1>
          <p className="mt-4 max-w-2xl text-medical-50/90">
            Punya pertanyaan atau butuh layanan? Tim Vita Care Lombok siap membantu Anda 24 jam.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-px grid gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            {items.map((it) => {
              const Icon = it.icon
              return (
                <div key={it.label} className="card flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-medical-50 text-medical-600">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="text-xs text-slate-400">{it.label}</p>
                    <p className="font-semibold text-medical-900">{it.value}</p>
                  </div>
                </div>
              )
            })}
            <div className="overflow-hidden rounded-3xl border border-slate-100 shadow-soft">
              <iframe
                title="Peta Lokasi Vita Care Lombok"
                src="https://www.google.com/maps?q=Mataram%2C%20Lombok&output=embed"
                className="h-64 w-full"
                loading="lazy"
              />
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-medical-900">Kirim Pesan</h3>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  )
}
