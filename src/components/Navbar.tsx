'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu, X, Phone } from 'lucide-react'
import { navLinks } from '@/lib/data'

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? 'bg-white/90 shadow-soft backdrop-blur-md' : 'bg-white/70 backdrop-blur'
      }`}
    >
      <nav className="container-px flex h-16 items-center justify-between lg:h-20">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/logo.png"
            alt="Vita Care Lombok"
            width={44}
            height={44}
            priority
            className="h-11 w-11 object-contain"
          />
          <span className="text-lg font-extrabold tracking-tight text-medical-900">
            Vita Care <span className="text-health-600">Lombok</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 xl:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                  active ? 'bg-medical-50 text-medical-700' : 'text-slate-600 hover:bg-slate-50 hover:text-medical-700'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </div>

        <div className="hidden items-center gap-3 xl:flex">
          <Link href="/layanan" className="btn-primary">
            <Phone className="h-4 w-4" /> Booking Sekarang
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-medical-700 xl:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-slate-100 bg-white xl:hidden">
          <div className="container-px flex flex-col gap-1 py-4">
            {navLinks.map((link) => {
              const active = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-xl px-4 py-3 text-sm font-medium ${
                    active ? 'bg-medical-50 text-medical-700' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
            <Link href="/layanan" className="btn-primary mt-2">
              <Phone className="h-4 w-4" /> Booking Sekarang
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
