import Link from 'next/link'
import {
  ShieldCheck,
  Clock,
  MapPin,
  Star,
  ArrowRight,
  Stethoscope,
  CheckCircle2,
  PhoneCall,
  Sparkles,
} from 'lucide-react'
import ServiceCard from '@/components/ServiceCard'
import SectionHeading from '@/components/SectionHeading'
import { services, stats, testimonials, partners } from '@/lib/data'

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden gradient-medical text-white">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="container-px relative grid items-center gap-12 py-20 lg:grid-cols-2 lg:py-28">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold backdrop-blur">
              <Sparkles className="h-4 w-4" /> Home Care #1 di Lombok
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Layanan Kesehatan <span className="text-health-300">Profesional</span> Langsung ke Rumah Anda
            </h1>
            <p className="mt-6 max-w-xl text-base text-medical-50/90 sm:text-lg">
              Dokter, perawat, bidan, fisioterapi, infus, hingga ambulans di Lombok &amp; Mataram. Cepat, terpercaya, dan siaga 24 jam.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/layanan" className="btn bg-white text-medical-700 hover:bg-medical-50">
                <PhoneCall className="h-4 w-4" /> Booking Sekarang
              </Link>
              <Link href="/tracking" className="btn border border-white/40 bg-white/10 text-white hover:bg-white/20">
                Lacak Petugas <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-medical-50/90">
              <span className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-health-300" /> Tenaga Tersertifikasi</span>
              <span className="flex items-center gap-2"><Clock className="h-5 w-5 text-health-300" /> Respons Cepat 24 Jam</span>
              <span className="flex items-center gap-2"><MapPin className="h-5 w-5 text-health-300" /> Jangkauan Se-Lombok</span>
            </div>
          </div>

          <div className="animate-fade-up">
            <div className="rounded-4xl border border-white/20 bg-white/10 p-6 shadow-card backdrop-blur">
              <div className="rounded-3xl bg-white p-6 text-slate-700">
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-medical-50 text-medical-600">
                    <Stethoscope className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-medical-900">Booking Cepat</p>
                    <p className="text-xs text-slate-500">Pilih layanan, isi data, petugas berangkat.</p>
                  </div>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  {services.slice(0, 6).map((s) => {
                    const Icon = s.icon
                    return (
                      <Link
                        key={s.slug}
                        href={`/layanan?booking=${s.slug}`}
                        className="flex items-center gap-2 rounded-2xl border border-slate-100 p-3 text-xs font-medium text-slate-700 transition-colors hover:border-medical-200 hover:bg-medical-50"
                      >
                        <Icon className="h-5 w-5 text-medical-600" /> {s.short}
                      </Link>
                    )
                  })}
                </div>
                <div className="mt-5 flex items-center justify-between rounded-2xl bg-health-50 p-4">
                  <div>
                    <p className="text-xs text-health-700">Rating Kepuasan</p>
                    <p className="text-lg font-bold text-health-700">4.9 / 5.0</p>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
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

      {/* SERVICES */}
      <section className="section bg-slate-50/60">
        <div className="container-px">
          <SectionHeading
            eyebrow="Layanan Kami"
            title="Pilihan Layanan Home Care Lengkap"
            subtitle="Semua kebutuhan kesehatan keluarga Anda dalam satu platform, ditangani tenaga medis profesional."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section">
        <div className="container-px">
          <SectionHeading eyebrow="Cara Kerja" title="Mudah dalam 4 Langkah" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { t: 'Pilih Layanan', d: 'Tentukan layanan home care yang Anda butuhkan.' },
              { t: 'Isi Data & Lokasi', d: 'Masukkan alamat dan jadwal kunjungan.' },
              { t: 'Pembayaran Aman', d: 'Bayar mudah lewat Midtrans (transfer, e-wallet, QRIS).' },
              { t: 'Petugas Datang', d: 'Pantau lokasi petugas secara realtime hingga tiba.' },
            ].map((step, i) => (
              <div key={step.t} className="card">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-medical-600 text-sm font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-4 font-bold text-medical-900">{step.t}</h3>
                <p className="mt-2 text-sm text-slate-600">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REFERRAL HIGHLIGHT */}
      <section className="section bg-slate-50/60">
        <div className="container-px grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              center={false}
              eyebrow="Sistem Rujukan Terintegrasi"
              title="Dari Rumah ke Rumah Sakit Partner, Tanpa Ribet"
              subtitle="Diagnosa oleh dokter home care langsung terhubung ke rumah sakit partner dengan surat rujukan digital."
            />
            <ul className="mt-6 space-y-3">
              {['Generate Surat Rujukan PDF', 'Verifikasi QR Code', 'Status Rujukan Realtime', 'Notifikasi WhatsApp'].map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm font-medium text-slate-700">
                  <CheckCircle2 className="h-5 w-5 text-health-500" /> {f}
                </li>
              ))}
            </ul>
            <Link href="/rujukan" className="btn-primary mt-8">
              Pelajari Sistem Rujukan <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="card">
            <div className="flex flex-col gap-3">
              {['Pasien', 'Dokter Home Care', 'Diagnosa', 'Rujukan', 'Rumah Sakit Partner'].map((node, i, arr) => (
                <div key={node}>
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-medical-50 text-xs font-bold text-medical-700">
                      {i + 1}
                    </span>
                    <span className="text-sm font-semibold text-medical-900">{node}</span>
                  </div>
                  {i < arr.length - 1 && <div className="ml-7 h-4 w-0.5 bg-medical-100" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PARTNERS STRIP */}
      <section className="section">
        <div className="container-px">
          <SectionHeading eyebrow="Partner Kami" title="Didukung Faskes Terpercaya di Lombok" />
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {partners.slice(0, 10).map((p) => (
              <div key={p.name} className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-soft">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-medical-50 text-xs font-extrabold text-medical-700">
                  {p.initials}
                </span>
                <div className="text-left">
                  <p className="text-sm font-semibold text-medical-900">{p.name}</p>
                  <p className="text-xs text-slate-400">{p.type}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/partner" className="btn-outline">Lihat Semua Partner <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section bg-slate-50/60">
        <div className="container-px">
          <SectionHeading eyebrow="Testimoni" title="Dipercaya Ribuan Keluarga" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.slice(0, 3).map((t) => (
              <div key={t.name} className="card">
                <div className="flex gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-5 flex items-center gap-3">
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

      {/* CTA */}
      <section className="section">
        <div className="container-px">
          <div className="relative overflow-hidden rounded-4xl gradient-medical px-8 py-14 text-center text-white">
            <div className="absolute inset-0 grid-pattern opacity-40" />
            <div className="relative">
              <h2 className="text-3xl font-extrabold sm:text-4xl">Butuh Bantuan Medis Sekarang?</h2>
              <p className="mx-auto mt-4 max-w-xl text-medical-50/90">
                Tim Vita Care Lombok siaga 24 jam untuk Anda dan keluarga.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link href="/layanan" className="btn bg-white text-medical-700 hover:bg-medical-50">Booking Layanan</Link>
                <Link href="/kontak" className="btn border border-white/40 bg-white/10 text-white hover:bg-white/20">Hubungi Kami</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
