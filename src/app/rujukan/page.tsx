import type { Metadata } from 'next'
import ReferralForm from '@/components/ReferralForm'
import SectionHeading from '@/components/SectionHeading'
import { FileText, QrCode, Activity, MessageCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Sistem Rujukan Terintegrasi - Rujukan Rumah Sakit Lombok',
  description:
    'Sistem rujukan rumah sakit Lombok terintegrasi: dari dokter home care, diagnosa, hingga rumah sakit partner. Surat rujukan PDF, QR code verifikasi, status & notifikasi WhatsApp.',
  alternates: { canonical: '/rujukan' },
}

const flow = ['Pasien', 'Dokter Home Care', 'Diagnosa', 'Rujukan', 'Rumah Sakit Partner']
const features = [
  { icon: FileText, title: 'Generate Surat Rujukan PDF', desc: 'Dokumen resmi otomatis, siap unduh & cetak.' },
  { icon: QrCode, title: 'QR Code Verification', desc: 'Verifikasi keaslian rujukan oleh rumah sakit partner.' },
  { icon: Activity, title: 'Status Rujukan', desc: 'Pantau status rujukan dari diterbitkan hingga diterima.' },
  { icon: MessageCircle, title: 'Notifikasi WhatsApp', desc: 'Pemberitahuan otomatis ke pasien & faskes tujuan.' },
]

export default function RujukanPage() {
  return (
    <>
      <section className="gradient-medical py-16 text-white">
        <div className="container-px">
          <span className="badge bg-white/15 text-white">Sistem Rujukan</span>
          <h1 className="mt-4 text-3xl font-extrabold sm:text-5xl">Sistem Rujukan Terintegrasi</h1>
          <p className="mt-4 max-w-2xl text-medical-50/90">
            Alur rujukan yang mulus dari rumah pasien hingga rumah sakit partner, lengkap dengan dokumen digital.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-px">
          <SectionHeading title="Alur Rujukan" subtitle="Lima tahap terintegrasi dalam satu sistem." />
          <div className="mt-10 flex flex-col items-stretch gap-3 lg:flex-row lg:items-center lg:justify-between">
            {flow.map((node, i, arr) => (
              <div key={node} className="flex flex-1 items-center gap-3 lg:flex-col lg:text-center">
                <div className="flex flex-1 items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-soft lg:w-full lg:flex-col">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full gradient-medical text-sm font-bold text-white">{i + 1}</span>
                  <span className="text-sm font-semibold text-medical-900">{node}</span>
                </div>
                {i < arr.length - 1 && <span className="hidden text-medical-300 lg:block">&rarr;</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-slate-50/60">
        <div className="container-px">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => {
              const Icon = f.icon
              return (
                <div key={f.title} className="card card-hover">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-medical-50 text-medical-600">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 font-bold text-medical-900">{f.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{f.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-px">
          <SectionHeading title="Buat & Verifikasi Rujukan" subtitle="Terbitkan surat rujukan PDF dengan QR code verifikasi secara instan." />
          <div className="mt-10">
            <ReferralForm />
          </div>
        </div>
      </section>
    </>
  )
}
