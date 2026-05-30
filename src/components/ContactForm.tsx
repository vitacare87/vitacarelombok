'use client'

import { useState } from 'react'
import { Send, MessageCircle, CheckCircle2, Loader2 } from 'lucide-react'
import { waLink } from '@/lib/whatsapp'

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [feedback, setFeedback] = useState('')
  const wa = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '6281900000000'

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formEl = e.currentTarget
    setStatus('loading')
    const form = new FormData(formEl)
    const payload = {
      name: form.get('name'),
      phone: form.get('phone'),
      email: form.get('email'),
      message: form.get('message'),
    }
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Gagal mengirim pesan.')
      setStatus('success')
      setFeedback(data.message)
      formEl.reset()
    } catch (err) {
      setStatus('error')
      setFeedback((err as Error).message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label">Nama</label>
          <input name="name" required className="input" placeholder="Nama Anda" />
        </div>
        <div>
          <label className="label">No. WhatsApp</label>
          <input name="phone" required className="input" placeholder="08xxxxxxxxxx" />
        </div>
      </div>
      <div>
        <label className="label">Email</label>
        <input name="email" type="email" className="input" placeholder="email@contoh.com" />
      </div>
      <div>
        <label className="label">Pesan</label>
        <textarea name="message" required rows={4} className="input" placeholder="Tuliskan pesan Anda..." />
      </div>
      <button type="submit" disabled={status === 'loading'} className="btn-primary w-full">
        {status === 'loading' ? (
          <><Loader2 className="h-4 w-4 animate-spin" /> Mengirim...</>
        ) : (
          <><Send className="h-4 w-4" /> Kirim Pesan</>
        )}
      </button>
      {status === 'success' && (
        <p className="flex items-center gap-2 rounded-2xl bg-health-50 p-3 text-sm text-health-700">
          <CheckCircle2 className="h-4 w-4" /> {feedback}
        </p>
      )}
      {status === 'error' && (
        <p className="rounded-2xl bg-red-50 p-3 text-sm text-red-600">{feedback}</p>
      )}
      <a
        href={waLink(wa, 'Halo Vita Care Lombok, saya ingin bertanya tentang layanan home care.')}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-secondary w-full"
      >
        <MessageCircle className="h-4 w-4" /> Chat via WhatsApp
      </a>
    </form>
  )
}
