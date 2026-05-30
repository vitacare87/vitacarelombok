'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Pill,
  FlaskConical,
  FileText,
  ClipboardList,
  CreditCard,
  Stethoscope,
  Download,
  ShieldCheck,
  Loader2,
  type LucideIcon,
} from 'lucide-react'

type Row = { date: string; title: string; detail: string; status: string; refId?: string }
type TabKey = 'kunjungan' | 'resep' | 'lab' | 'rujukan' | 'kontrol' | 'pembayaran'
type DashboardData = Record<TabKey, Row[]>

const tabs: { key: TabKey; label: string; icon: LucideIcon }[] = [
  { key: 'kunjungan', label: 'Riwayat Kunjungan', icon: Stethoscope },
  { key: 'resep', label: 'Riwayat Resep', icon: Pill },
  { key: 'lab', label: 'Hasil Laboratorium', icon: FlaskConical },
  { key: 'rujukan', label: 'Surat Rujukan', icon: FileText },
  { key: 'kontrol', label: 'Surat Kontrol', icon: ClipboardList },
  { key: 'pembayaran', label: 'Riwayat Pembayaran', icon: CreditCard },
]

const EMPTY: DashboardData = { kunjungan: [], resep: [], lab: [], rujukan: [], kontrol: [], pembayaran: [] }

export default function DashboardTabs() {
  const [active, setActive] = useState<TabKey>('kunjungan')
  const [data, setData] = useState<DashboardData>(EMPTY)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let alive = true
    fetch('/api/dashboard', { cache: 'no-store' })
      .then((r) => r.json())
      .then((d: DashboardData) => {
        if (alive) {
          setData(d)
          setLoading(false)
        }
      })
      .catch(() => setLoading(false))
    return () => {
      alive = false
    }
  }, [])

  const rows = data[active] || []

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
      <aside className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
        {tabs.map((t) => {
          const Icon = t.icon
          const on = active === t.key
          return (
            <button
              key={t.key}
              onClick={() => setActive(t.key)}
              className={`flex shrink-0 items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-colors ${
                on ? 'bg-medical-600 text-white' : 'text-slate-600 hover:bg-medical-50 hover:text-medical-700'
              }`}
            >
              <Icon className="h-5 w-5" /> {t.label}
            </button>
          )
        })}
      </aside>

      <div className="space-y-4">
        {loading ? (
          <div className="flex items-center justify-center gap-2 rounded-2xl border border-slate-100 py-16 text-sm text-slate-500">
            <Loader2 className="h-4 w-4 animate-spin" /> Memuat data...
          </div>
        ) : rows.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 py-16 text-center text-sm text-slate-400">
            Belum ada data pada kategori ini.
          </div>
        ) : (
          rows.map((r, i) => (
            <div key={r.title + i} className="card flex items-center justify-between gap-4">
              <div>
                <p className="text-xs text-slate-400">{r.date}</p>
                <p className="mt-1 font-bold text-medical-900">{r.title}</p>
                <p className="text-sm text-slate-600">{r.detail}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="badge-green">{r.status}</span>
                {r.refId ? (
                  <Link
                    href={`/rujukan/verify/${r.refId}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-medical-600 hover:text-medical-700"
                  >
                    <ShieldCheck className="h-3.5 w-3.5" /> Verifikasi
                  </Link>
                ) : (
                  <button className="inline-flex items-center gap-1 text-xs font-semibold text-medical-600 hover:text-medical-700">
                    <Download className="h-3.5 w-3.5" /> Unduh
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
