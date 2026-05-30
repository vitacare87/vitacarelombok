'use client'

import { useEffect, useMemo, useState } from 'react'
import { GoogleMap, useJsApiLoader, MarkerF, PolylineF } from '@react-google-maps/api'
import { Clock, Navigation, User, Stethoscope } from 'lucide-react'
import { subscribeToTracking, type TrackingSnapshot } from '@/lib/firebase'

// Default center: Mataram, Lombok
const PATIENT = { lat: -8.5833, lng: 116.1167 }

const STATUS_LABEL: Record<TrackingSnapshot['status'], string> = {
  mencari: 'Mencari petugas terdekat',
  menuju_lokasi: 'Petugas dalam perjalanan',
  tiba: 'Petugas telah tiba',
  selesai: 'Kunjungan selesai',
}

const containerStyle = { width: '100%', height: '100%' }
const routeOptions = { strokeColor: '#1259c3', strokeWeight: 4, strokeOpacity: 0.8 }

export default function TrackingMap({ bookingId = 'DEMO-001' }: { bookingId?: string }) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
  })

  const [snap, setSnap] = useState<TrackingSnapshot | null>(null)

  // Live tracking from the server API — genuinely moving, works out of the box
  // without any external service.
  useEffect(() => {
    let alive = true
    const poll = async () => {
      try {
        const res = await fetch('/api/tracking/' + bookingId, { cache: 'no-store' })
        if (!res.ok) return
        const data = await res.json()
        if (alive) {
          setSnap({
            lat: data.lat,
            lng: data.lng,
            status: data.status,
            etaMinutes: data.etaMinutes,
            staffName: data.staffName,
          })
        }
      } catch {
        // ignore transient errors
      }
    }
    poll()
    const id = setInterval(poll, 3000)
    return () => {
      alive = false
      clearInterval(id)
    }
  }, [bookingId])

  // Firebase realtime overrides the API feed when configured.
  useEffect(() => {
    const unsub = subscribeToTracking(bookingId, (data) => {
      if (data) setSnap(data)
    })
    return () => unsub()
  }, [bookingId])

  const staff = useMemo(
    () => (snap ? { lat: snap.lat, lng: snap.lng } : { lat: -8.65, lng: 116.07 }),
    [snap],
  )

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
      <div className="h-[460px] overflow-hidden rounded-3xl border border-slate-100 shadow-soft">
        {!apiKey ? (
          <div className="flex h-full flex-col items-center justify-center bg-slate-50 p-8 text-center">
            <Navigation className="h-10 w-10 text-medical-400" />
            <p className="mt-4 font-semibold text-medical-900">Peta Tracking</p>
            <p className="mt-2 max-w-sm text-sm text-slate-500">
              Tambahkan NEXT_PUBLIC_GOOGLE_MAPS_API_KEY pada .env.local untuk menampilkan peta. Data lokasi &amp; status di samping tetap berjalan realtime.
            </p>
          </div>
        ) : isLoaded ? (
          <GoogleMap mapContainerStyle={containerStyle} center={staff} zoom={13}>
            <MarkerF position={PATIENT} label="Pasien" />
            <MarkerF position={staff} label="Petugas" />
            <PolylineF path={[staff, PATIENT]} options={routeOptions} />
          </GoogleMap>
        ) : (
          <div className="flex h-full items-center justify-center bg-slate-50 text-sm text-slate-500">
            Memuat peta...
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="card">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Status Perjalanan</p>
          <p className="mt-2 flex items-center gap-2 text-lg font-bold text-medical-900">
            <span className="flex h-3 w-3 animate-pulse rounded-full bg-health-500" />
            {snap ? STATUS_LABEL[snap.status] : 'Menghubungkan...'}
          </p>
        </div>
        <div className="card">
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-medical-600" />
            <div>
              <p className="text-xs text-slate-400">Estimasi Kedatangan</p>
              <p className="text-lg font-bold text-medical-900">
                {snap ? (snap.status === 'tiba' ? 'Telah tiba' : snap.etaMinutes + ' menit') : '-'}
              </p>
            </div>
          </div>
        </div>
        <div className="card space-y-3">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-medical-50 text-medical-600">
              <Stethoscope className="h-4 w-4" />
            </span>
            <div>
              <p className="text-xs text-slate-400">Tenaga Kesehatan</p>
              <p className="text-sm font-semibold text-medical-900">{snap?.staffName || 'Petugas Vita Care'}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-health-50 text-health-600">
              <User className="h-4 w-4" />
            </span>
            <div>
              <p className="text-xs text-slate-400">Lokasi Pasien</p>
              <p className="text-sm font-semibold text-medical-900">Mataram, Lombok</p>
            </div>
          </div>
        </div>
        <p className="px-2 text-xs text-slate-400">
          Kode Booking: <span className="font-semibold text-slate-600">{bookingId}</span>
        </p>
      </div>
    </div>
  )
}
