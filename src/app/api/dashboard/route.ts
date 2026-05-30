import { NextResponse } from 'next/server'
import { listBookings, listReferrals } from '@/lib/store'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const formatIDR = (n: number) => 'Rp ' + n.toLocaleString('id-ID')
const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })

export async function GET() {
  const bookings = listBookings()
  const referrals = listReferrals()

  const kunjungan = bookings.map((b) => ({
    date: formatDate(b.schedule || b.createdAt),
    title: b.serviceName,
    detail: b.patientName + ' - ' + b.address,
    status: b.status === 'selesai' ? 'Selesai' : b.status === 'paid' ? 'Terjadwal' : 'Menunggu',
  }))

  const pembayaran = bookings.map((b) => ({
    date: formatDate(b.createdAt),
    title: b.serviceName,
    detail: 'Order ' + b.orderId + ' - ' + formatIDR(b.amount),
    status: b.status === 'paid' || b.status === 'selesai' ? 'Lunas' : 'Pending',
  }))

  const rujukan = referrals.map((r) => ({
    date: formatDate(r.createdAt),
    title: 'Rujukan ke ' + r.hospital,
    detail: r.diagnosis + ' - oleh ' + r.doctorName,
    status: r.status === 'selesai' ? 'Selesai' : r.status === 'diproses' ? 'Diproses' : 'Aktif',
    refId: r.refId,
  }))

  // Static seeds for record types not produced by the booking flow.
  const resep = [
    { date: '12 Mei 2026', title: 'Resep Antibiotik', detail: 'Amoxicillin 500mg - oleh dr. Bayu Pradana', status: 'Aktif' },
    { date: '28 Apr 2026', title: 'Resep Antihipertensi', detail: 'Amlodipine 10mg - kontrol rutin', status: 'Selesai' },
  ]
  const lab = [
    { date: '10 Mei 2026', title: 'Darah Lengkap', detail: 'Hb, Leukosit, Trombosit - Normal', status: 'Selesai' },
    { date: '02 Mei 2026', title: 'Gula Darah Puasa', detail: 'GDP 98 mg/dL - Normal', status: 'Selesai' },
  ]
  const kontrol = [
    { date: '20 Mei 2026', title: 'Surat Kontrol Hipertensi', detail: 'Kontrol berikutnya 20 Jun 2026', status: 'Terjadwal' },
  ]

  return NextResponse.json({ kunjungan, resep, lab, rujukan, kontrol, pembayaran })
}
