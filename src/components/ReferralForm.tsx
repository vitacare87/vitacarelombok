'use client'

import { useState } from 'react'
import { Loader2, FileDown, QrCode, MessageCircle, CheckCircle2 } from 'lucide-react'
import { partners } from '@/lib/data'

const hospitals = partners.filter((p) => p.type === 'Rumah Sakit')

export default function ReferralForm() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ refId: string; pdfUrl: string } | null>(null)
  const [error, setError] = useState('')
  const [notifying, setNotifying] = useState(false)
  const [notified, setNotified] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')
    setResult(null)
    const form = new FormData(e.currentTarget)
    const payload = {
      patientName: String(form.get('patientName') || ''),
      patientPhone: String(form.get('patientPhone') || ''),
      doctorName: String(form.get('doctorName') || ''),
      diagnosis: String(form.get('diagnosis') || ''),
      hospital: String(form.get('hospital') || ''),
      notes: String(form.get('notes') || ''),
    }
    try {
      const res = await fetch('/api/rujukan/pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error || 'Gagal membuat surat rujukan')
      }
      const refId = res.headers.get('X-Referral-Id') || 'RJK-UNKNOWN'
      const blob = await res.blob()
      const pdfUrl = URL.createObjectURL(blob)
      setResult({ refId, pdfUrl })
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  async function notifyWhatsApp() {
    if (!result) return
    setNotifying(true)
    try {
      await fetch('/api/whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Surat rujukan Anda (No. ${result.refId}) telah diterbitkan oleh Vita Care Lombok.`,
        }),
      })
      setNotified(true)
    } finally {
      setNotifying(false)
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <form onSubmit={handleSubmit} className="card space-y-4">
        <h3 className="text-lg font-bold text-medical-900">Buat Surat Rujukan</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label">Nama Pasien</label>
            <input name="patientName" required className="input" placeholder="Nama pasien" />
          </div>
          <div>
            <label className="label">No. WhatsApp Pasien</label>
            <input name="patientPhone" required className="input" placeholder="08xxxxxxxxxx" />
          </div>
        </div>
        <div>
          <label className="label">Dokter Home Care</label>
          <input name="doctorName" required className="input" placeholder="dr. Nama Dokter" />
        </div>
        <div>
          <label className="label">Diagnosa</label>
          <input name="diagnosis" required className="input" placeholder="Diagnosa medis" />
        </div>
        <div>
          <label className="label">Rumah Sakit Tujuan</label>
          <select name="hospital" className="input" required>
            {hospitals.map((h) => (
              <option key={h.name} value={h.name}>{h.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">Catatan Klinis</label>
          <textarea name="notes" rows={3} className="input" placeholder="Anamnesis / catatan tambahan" />
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Membuat...</> : <><FileDown className="h-4 w-4" /> Generate Surat Rujukan PDF</>}
        </button>
        {error && <p className="rounded-2xl bg-red-50 p-3 text-sm text-red-600">{error}</p>}
      </form>

      <div className="card flex flex-col">
        <h3 className="text-lg font-bold text-medical-900">Hasil Rujukan</h3>
        {!result ? (
          <div className="flex flex-1 flex-col items-center justify-center py-10 text-center text-slate-400">
            <QrCode className="h-12 w-12" />
            <p className="mt-3 text-sm">Surat rujukan & QR code verifikasi akan muncul di sini setelah dibuat.</p>
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            <div className="flex items-center gap-2 rounded-2xl bg-health-50 p-3 text-sm text-health-700">
              <CheckCircle2 className="h-4 w-4" /> Surat rujukan berhasil dibuat
            </div>
            <div className="rounded-2xl border border-slate-100 p-4">
              <p className="text-xs text-slate-400">Nomor Rujukan</p>
              <p className="text-lg font-bold text-medical-900">{result.refId}</p>
              <span className="badge-green mt-2">Status: Aktif</span>
            </div>
            <a href={result.pdfUrl} download={`${result.refId}.pdf`} className="btn-primary w-full">
              <FileDown className="h-4 w-4" /> Unduh Surat Rujukan (PDF)
            </a>
            <button onClick={notifyWhatsApp} disabled={notifying || notified} className="btn-secondary w-full">
              {notified ? <><CheckCircle2 className="h-4 w-4" /> Notifikasi Terkirim</> : notifying ? <><Loader2 className="h-4 w-4 animate-spin" /> Mengirim...</> : <><MessageCircle className="h-4 w-4" /> Kirim Notifikasi WhatsApp</>}
            </button>
            <p className="text-center text-xs text-slate-400">QR Code verifikasi tertanam di dalam dokumen PDF.</p>
          </div>
        )}
      </div>
    </div>
  )
}
