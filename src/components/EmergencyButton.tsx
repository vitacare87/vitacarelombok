'use client'

import { useState } from 'react'
import { Phone, Ambulance, X, MessageCircle } from 'lucide-react'
import { waLink } from '@/lib/whatsapp'

export default function EmergencyButton() {
  const [open, setOpen] = useState(false)
  const phone = process.env.NEXT_PUBLIC_EMERGENCY_PHONE || '+6281900000000'
  const wa = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '6281900000000'

  return (
    <>
      {/* Floating Emergency button - always visible on mobile & desktop */}
      <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3">
        {open && (
          <div className="w-64 animate-fade-up rounded-3xl border border-slate-100 bg-white p-4 shadow-card">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-emergency">Darurat 24 Jam</p>
              <button onClick={() => setOpen(false)} aria-label="Tutup">
                <X className="h-4 w-4 text-slate-400" />
              </button>
            </div>
            <p className="mt-1 text-xs text-slate-500">Butuh bantuan medis segera? Hubungi kami sekarang.</p>
            <div className="mt-3 flex flex-col gap-2">
              <a href={`tel:${phone}`} className="btn bg-emergency text-white hover:bg-emergency-dark">
                <Phone className="h-4 w-4" /> Telepon Darurat
              </a>
              <a
                href={waLink(wa, 'Halo Vita Care, saya butuh bantuan medis darurat.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </div>
          </div>
        )}

        <button
          onClick={() => setOpen((v) => !v)}
          className="relative flex h-16 w-16 items-center justify-center rounded-full bg-emergency text-white shadow-card transition-transform hover:scale-105"
          aria-label="Tombol darurat 24 jam"
        >
          <span className="absolute inset-0 animate-pulse-ring rounded-full bg-emergency" />
          <Ambulance className="relative h-7 w-7" />
        </button>
        <span className="rounded-full bg-emergency px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-soft">
          Emergency 24 Jam
        </span>
      </div>
    </>
  )
}
