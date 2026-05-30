import Link from 'next/link'
import type { Metadata } from 'next'
import { CheckCircle2, XCircle, ShieldCheck, ArrowLeft } from 'lucide-react'
import { getReferral } from '@/lib/store'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Verifikasi Surat Rujukan - Vita Care Lombok',
  robots: { index: false, follow: false },
}

export default async function VerifyReferralPage({
  params,
}: {
  params: Promise<{ refId: string }>
}) {
  const { refId } = await params
  const referral = getReferral(refId)

  return (
    <section className="section">
      <div className="container-px max-w-2xl">
        <Link href="/rujukan" className="inline-flex items-center gap-2 text-sm font-medium text-medical-600 hover:text-medical-700">
          <ArrowLeft className="h-4 w-4" /> Kembali ke Sistem Rujukan
        </Link>

        <div className="mt-6 card">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-7 w-7 text-medical-600" />
            <h1 className="text-xl font-bold text-medical-900">Verifikasi Surat Rujukan</h1>
          </div>

          {referral ? (
            <div className="mt-6">
              <div className="flex items-center gap-2 rounded-2xl bg-health-50 p-4 text-health-700">
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-semibold">Surat rujukan VALID &amp; terverifikasi</span>
              </div>
              <dl className="mt-6 divide-y divide-slate-100">
                <Row label="Nomor Rujukan" value={referral.refId} />
                <Row label="Nama Pasien" value={referral.patientName} />
                <Row label="Dokter Perujuk" value={referral.doctorName} />
                <Row label="Diagnosa" value={referral.diagnosis} />
                <Row label="Rumah Sakit Tujuan" value={referral.hospital} />
                <Row
                  label="Status"
                  value={referral.status === 'selesai' ? 'Selesai' : referral.status === 'diproses' ? 'Diproses' : 'Aktif'}
                />
                <Row label="Diterbitkan" value={new Date(referral.createdAt).toLocaleString('id-ID')} />
              </dl>
            </div>
          ) : (
            <div className="mt-6">
              <div className="flex items-center gap-2 rounded-2xl bg-red-50 p-4 text-red-600">
                <XCircle className="h-5 w-5" />
                <span className="font-semibold">Surat rujukan tidak ditemukan</span>
              </div>
              <p className="mt-4 text-sm text-slate-600">
                Nomor rujukan <span className="font-mono font-semibold">{refId}</span> tidak terdaftar pada sistem kami,
                atau dokumen telah kedaluwarsa. Pastikan QR code dipindai dari surat rujukan resmi Vita Care Lombok.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3">
      <dt className="text-sm text-slate-500">{label}</dt>
      <dd className="text-right text-sm font-semibold text-medical-900">{value}</dd>
    </div>
  )
}
