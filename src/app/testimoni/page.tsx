import type { Metadata } from 'next'
import { Star, Quote } from 'lucide-react'
import SectionHeading from '@/components/SectionHeading'
import { testimonials, stats } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Testimoni Pasien - Pengalaman Layanan Home Care Lombok',
  description:
    'Cerita dan testimoni pasien Vita Care Lombok yang telah merasakan layanan home care profesional: dokter, perawat, fisioterapi, infus, dan ambulans.',
  alternates: { canonical: '/testimoni' },
}

export default function TestimoniPage() {
  return (
    <>
      <section className="gradient-medical py-16 text-white">
        <div className="container-px">
          <span className="badge bg-white/15 text-white">Testimoni</span>
          <h1 className="mt-4 text-3xl font-extrabold sm:text-5xl">Apa Kata Pasien Kami</h1>
          <p className="mt-4 max-w-2xl text-medical-50/90">
            Kepuasan dan kesembuhan pasien adalah prioritas utama Vita Care Lombok.
          </p>
        </div>
      </section>

      <section className="border-b border-slate-100 bg-white">
        <div className="container-px grid grid-cols-2 gap-6 py-10 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-extrabold gradient-text sm:text-4xl">{s.value}</p>
              <p className="mt-1 text-sm text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container-px">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.name} className="card card-hover">
                <Quote className="h-8 w-8 text-medical-200" />
                <p className="mt-3 text-sm leading-relaxed text-slate-600">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-4 flex gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-medical-600 text-xs font-bold text-white">
                    {t.initials}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-medical-900">{t.name}</p>
                    <p className="text-xs text-slate-400">{t.location} &middot; {t.service}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
