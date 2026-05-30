import type { Metadata } from 'next'
import DashboardTabs from '@/components/DashboardTabs'
import { CalendarClock, Pill, FlaskConical, Wallet } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Dashboard Pasien - Riwayat Medis & Pembayaran',
  description:
    'Dashboard pasien Vita Care Lombok: riwayat kunjungan, resep, hasil laboratorium, surat rujukan, surat kontrol, dan riwayat pembayaran dalam satu tempat.',
  alternates: { canonical: '/dashboard' },
}

const summary = [
  { icon: CalendarClock, label: 'Total Kunjungan', value: '12' },
  { icon: Pill, label: 'Resep Aktif', value: '1' },
  { icon: FlaskConical, label: 'Hasil Lab', value: '5' },
  { icon: Wallet, label: 'Total Pembayaran', value: 'Rp 1,2 Jt' },
]

export default function DashboardPage() {
  return (
    <>
      <section className="gradient-medical py-16 text-white">
        <div className="container-px">
          <span className="badge bg-white/15 text-white">Dashboard Pasien</span>
          <h1 className="mt-4 text-3xl font-extrabold sm:text-5xl">Selamat Datang, Pasien Vita Care</h1>
          <p className="mt-4 max-w-2xl text-medical-50/90">
            Kelola seluruh riwayat kesehatan Anda dalam satu dashboard yang aman dan terintegrasi.
          </p>
        </div>
      </section>

      <section className="border-b border-slate-100 bg-white">
        <div className="container-px grid grid-cols-2 gap-4 py-8 lg:grid-cols-4">
          {summary.map((s) => {
            const Icon = s.icon
            return (
              <div key={s.label} className="flex items-center gap-3 rounded-2xl border border-slate-100 p-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-medical-50 text-medical-600">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs text-slate-400">{s.label}</p>
                  <p className="text-lg font-bold text-medical-900">{s.value}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="section">
        <div className="container-px">
          <DashboardTabs />
          <p className="mt-8 rounded-2xl bg-medical-50 p-4 text-sm text-medical-700">
Data dashboard ditarik secara langsung dari aktivitas booking & rujukan yang Anda buat di situs ini. Hubungkan <strong>Supabase</strong> untuk penyimpanan permanen lintas perangkat.
          </p>
        </div>
      </section>
    </>
  )
}
