import type { Metadata } from 'next'
import ServiceCard from '@/components/ServiceCard'
import SectionHeading from '@/components/SectionHeading'
import BookingForm from '@/components/BookingForm'
import { services } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Layanan Home Care - Dokter, Perawat, Bidan, Infus & Ambulans',
  description:
    'Booking layanan home care di Lombok: dokter panggilan, perawat, bidan, fisioterapi, infus home care Mataram, dan ambulans. Tenaga medis profesional ke rumah Anda.',
  alternates: { canonical: '/layanan' },
}

export default function LayananPage({
  searchParams,
}: {
  searchParams: { booking?: string }
}) {
  const defaultService = searchParams?.booking
  return (
    <>
      <section className="gradient-medical py-16 text-white">
        <div className="container-px">
          <span className="badge bg-white/15 text-white">Layanan Kami</span>
          <h1 className="mt-4 text-3xl font-extrabold sm:text-5xl">Layanan Home Care Profesional</h1>
          <p className="mt-4 max-w-2xl text-medical-50/90">
            Pilih layanan kesehatan yang Anda butuhkan. Semua ditangani tenaga medis tersertifikasi dan siaga 24 jam.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-px grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <SectionHeading center={false} title="Daftar Layanan" subtitle="Booking dokter, perawat, bidan, fisioterapi, infus, hingga ambulans." />
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {services.map((s) => (
                <ServiceCard key={s.slug} service={s} />
              ))}
            </div>
          </div>
          <div className="lg:sticky lg:top-24 lg:self-start">
            <h3 className="mb-4 text-xl font-bold text-medical-900">Form Booking</h3>
            <BookingForm defaultService={defaultService} />
          </div>
        </div>
      </section>
    </>
  )
}
