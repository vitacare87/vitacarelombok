import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { navLinks, services } from '@/lib/data'

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-slate-100 bg-medical-900 text-medical-50">
      <div className="container-px grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white p-1.5">
              <Image src="/logo.png" alt="Vita Care Lombok" width={40} height={40} className="h-full w-full object-contain" />
            </span>
            <span className="text-lg font-extrabold text-white">Vita Care Lombok</span>
          </div>
          <p className="mt-4 text-sm text-medical-100/80">
            Layanan Home Care profesional di Lombok &amp; Mataram. Tenaga kesehatan datang ke rumah Anda, kapan saja.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wide text-white/70">Navigasi</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {navLinks.slice(0, 6).map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-medical-100/80 transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wide text-white/70">Layanan</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/layanan#${s.slug}`} className="text-medical-100/80 transition-colors hover:text-white">
                  {s.short}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wide text-white/70">Kontak</h4>
          <ul className="mt-4 space-y-3 text-sm text-medical-100/80">
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-health-400" /> Jl. Pejanggik No.1, Mataram, Lombok, NTB</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-health-400" /> +62 819-0000-0000</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-health-400" /> halo@vitacarelombok.com</li>
            <li className="flex items-center gap-2"><Clock className="h-4 w-4 text-health-400" /> Layanan 24 Jam / 7 Hari</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-px flex flex-col items-center justify-between gap-2 py-6 text-xs text-medical-100/60 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Vita Care Lombok. Seluruh hak cipta dilindungi.</p>
          <p>Home Care Lombok &middot; Dokter Panggilan &middot; Ambulans 24 Jam</p>
        </div>
      </div>
    </footer>
  )
}
