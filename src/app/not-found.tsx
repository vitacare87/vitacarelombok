import Link from 'next/link'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <section className="section">
      <div className="container-px flex flex-col items-center text-center">
        <p className="text-7xl font-extrabold gradient-text">404</p>
        <h1 className="mt-4 text-2xl font-bold text-medical-900">Halaman Tidak Ditemukan</h1>
        <p className="mt-2 max-w-md text-slate-600">Maaf, halaman yang Anda cari tidak tersedia. Silakan kembali ke beranda.</p>
        <Link href="/" className="btn-primary mt-6">
          <Home className="h-4 w-4" /> Kembali ke Beranda
        </Link>
      </div>
    </section>
  )
}
