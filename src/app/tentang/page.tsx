import type { Metadata } from 'next'
import Image from 'next/image'
import SectionHeading from '@/components/SectionHeading'
import { team } from '@/lib/data'
import { ShieldCheck, HeartHandshake, Target, Eye, Award, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Tentang Kami - Vita Care Lombok',
  description:
    'Mengenal Vita Care Lombok, penyedia layanan home care profesional di Lombok & Mataram dengan tenaga kesehatan tersertifikasi dan layanan 24 jam.',
  alternates: { canonical: '/tentang' },
}

const values = [
  { icon: ShieldCheck, title: 'Profesional', desc: 'Tenaga medis tersertifikasi dengan standar pelayanan rumah sakit.' },
  { icon: HeartHandshake, title: 'Empati', desc: 'Pelayanan yang ramah, manusiawi, dan berpusat pada pasien.' },
  { icon: Award, title: 'Terpercaya', desc: 'Didukung jaringan faskes partner terbaik di Lombok.' },
]

export default function TentangPage() {
  return (
    <>
      <section className="gradient-medical py-16 text-white">
        <div className="container-px">
          <span className="badge bg-white/15 text-white">Tentang Kami</span>
          <h1 className="mt-4 text-3xl font-extrabold sm:text-5xl">Menghadirkan Kesehatan ke Setiap Rumah</h1>
          <p className="mt-4 max-w-2xl text-medical-50/90">
            Vita Care Lombok berkomitmen menyediakan layanan home care berkualitas tinggi yang mudah diakses seluruh masyarakat Lombok.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-px grid gap-10 lg:grid-cols-2">
          <div className="card">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-medical-50 text-medical-600"><Target className="h-6 w-6" /></span>
            <h2 className="mt-4 text-xl font-bold text-medical-900">Misi Kami</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Memberikan akses layanan kesehatan profesional langsung ke rumah masyarakat Lombok dengan cepat, aman, dan terjangkau, didukung teknologi digital terkini.
            </p>
          </div>
          <div className="card">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-health-50 text-health-600"><Eye className="h-6 w-6" /></span>
            <h2 className="mt-4 text-xl font-bold text-medical-900">Visi Kami</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Menjadi platform home care nomor satu di Nusa Tenggara Barat yang menghubungkan pasien, tenaga kesehatan, dan fasilitas kesehatan dalam satu ekosistem terintegrasi.
            </p>
          </div>
        </div>
      </section>

      <section className="section bg-slate-50/60">
        <div className="container-px">
          <SectionHeading eyebrow="Nilai Kami" title="Yang Kami Junjung" />
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {values.map((v) => {
              const Icon = v.icon
              return (
                <div key={v.title} className="card card-hover text-center">
                  <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl gradient-medical text-white"><Icon className="h-7 w-7" /></span>
                  <h3 className="mt-4 font-bold text-medical-900">{v.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{v.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-px">
          <SectionHeading
            eyebrow="Tim Kami"
            title="Tenaga Kesehatan Profesional"
            subtitle="Perawat tersertifikasi yang siap memberikan pelayanan terbaik langsung di rumah Anda."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((m) => (
              <div key={m.name} className="card card-hover text-center">
                <div className="mx-auto h-28 w-28 overflow-hidden rounded-full ring-4 ring-medical-50">
                  <Image src={m.photo} alt={m.name} width={112} height={112} className="h-full w-full object-cover" />
                </div>
                <h3 className="mt-4 font-bold text-medical-900">{m.name}</h3>
                <p className="text-sm font-medium text-health-600">{m.role}</p>
                <p className="mt-2 text-sm text-slate-600">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-slate-50/60">
        <div className="container-px">
          <div className="rounded-4xl bg-medical-900 px-8 py-12 text-center text-white">
            <Users className="mx-auto h-10 w-10 text-health-400" />
            <h2 className="mt-4 text-2xl font-bold sm:text-3xl">120+ Tenaga Kesehatan Siap Melayani</h2>
            <p className="mx-auto mt-3 max-w-xl text-medical-100/80">
              Dokter, perawat, bidan, dan fisioterapis profesional yang siap hadir untuk Anda dan keluarga.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
