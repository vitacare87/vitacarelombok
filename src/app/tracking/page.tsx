import type { Metadata } from 'next'
import TrackingMap from '@/components/TrackingMap'

export const metadata: Metadata = {
  title: 'Tracking Petugas Realtime - Lacak Tenaga Kesehatan',
  description:
    'Lacak lokasi tenaga kesehatan Vita Care Lombok secara realtime dengan Google Maps. Lihat estimasi kedatangan dan status perjalanan petugas.',
  alternates: { canonical: '/tracking' },
}

export default function TrackingPage() {
  return (
    <>
      <section className="gradient-medical py-16 text-white">
        <div className="container-px">
          <span className="badge bg-white/15 text-white">Tracking Petugas</span>
          <h1 className="mt-4 text-3xl font-extrabold sm:text-5xl">Lacak Petugas Secara Realtime</h1>
          <p className="mt-4 max-w-2xl text-medical-50/90">
            Pantau lokasi tenaga kesehatan, estimasi waktu kedatangan, dan status perjalanan langsung dari peta.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-px">
          <TrackingMap bookingId="DEMO-001" />
          <p className="mt-8 rounded-2xl bg-medical-50 p-4 text-sm text-medical-700">
Posisi petugas, status, dan estimasi waktu diperbarui otomatis secara realtime setiap beberapa detik melalui API tracking bawaan. Tambahkan <strong>Google Maps API</strong> untuk peta visual dan <strong>Firebase Realtime Database</strong> untuk umpan lokasi dari aplikasi petugas.
          </p>
        </div>
      </section>
    </>
  )
}
