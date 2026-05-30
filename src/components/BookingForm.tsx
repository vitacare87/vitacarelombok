'use client'

import { useState } from 'react'
import { Loader2, CheckCircle2, CreditCard } from 'lucide-react'
import { services } from '@/lib/data'

export default function BookingForm({ defaultService }: { defaultService?: string }) {
  const [service, setService] = useState(defaultService || services[0].slug)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setMessage('')
    const form = new FormData(e.currentTarget)
    const payload = {
      service,
      name: String(form.get('name') || ''),
      phone: String(form.get('phone') || ''),
      address: String(form.get('address') || ''),
      schedule: String(form.get('schedule') || ''),
      notes: String(form.get('notes') || ''),
    }
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Gagal memproses booking')
      // If Midtrans returns a redirect URL, send the user to payment.
      if (data.payment?.redirectUrl) {
        window.location.href = data.payment.redirectUrl
        return
      }
      setStatus('success')
      setMessage(data.message || 'Booking berhasil dikirim! Tim kami akan menghubungi Anda.')
    } catch (err) {
      setStatus('error')
      setMessage((err as Error).message)
    }
  }

  const selected = services.find((s) => s.slug === service)

  return (
    <form onSubmit={handleSubmit} className="card space-y-4">
      <div>
        <label className="label">Pilih Layanan</label>
        <select className="input" value={service} onChange={(e) => setService(e.target.value)}>
          {services.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.name} — {s.price}
            </option>
          ))}
        </select>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label">Nama Lengkap</label>
          <input name="name" required className="input" placeholder="Nama pasien" />
        </div>
        <div>
          <label className="label">No. WhatsApp</label>
          <input name="phone" required className="input" placeholder="08xxxxxxxxxx" />
        </div>
      </div>
      <div>
        <label className="label">Alamat Lengkap</label>
        <input name="address" required className="input" placeholder="Alamat tujuan kunjungan" />
      </div>
      <div>
        <label className="label">Jadwal Kunjungan</label>
        <input name="schedule" type="datetime-local" required className="input" />
      </div>
      <div>
        <label className="label">Catatan (opsional)</label>
        <textarea name="notes" rows={3} className="input" placeholder="Keluhan / kebutuhan khusus" />
      </div>

      {selected && (
        <div className="flex items-center justify-between rounded-2xl bg-medical-50 p-4 text-sm">
          <span className="text-medical-700">Estimasi biaya</span>
          <span className="font-bold text-medical-900">{selected.price}</span>
        </div>
      )}

      <button type="submit" disabled={status === 'loading'} className="btn-primary w-full">
        {status === 'loading' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Memproses...
          </>
        ) : (
          <>
            <CreditCard className="h-4 w-4" /> Booking &amp; Bayar
          </>
        )}
      </button>

      {status === 'success' && (
        <p className="flex items-center gap-2 rounded-2xl bg-health-50 p-3 text-sm text-health-700">
          <CheckCircle2 className="h-4 w-4" /> {message}
        </p>
      )}
      {status === 'error' && (
        <p className="rounded-2xl bg-red-50 p-3 text-sm text-red-600">{message}</p>
      )}
    </form>
  )
}
