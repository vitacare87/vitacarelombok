// ----------------------------------------------------------------
// In-memory data store with seed data.
// Persists for the lifetime of the running Node process — so every menu
// (booking, dashboard, rujukan, tracking, kontak) works out of the box with
// `npm run dev` and single-instance deployments, WITHOUT any external service.
// When Supabase is configured, API routes also mirror writes to Supabase for
// durable, multi-instance storage.
// ----------------------------------------------------------------

export type BookingRecord = {
  orderId: string
  service: string
  serviceName: string
  patientName: string
  phone: string
  address: string
  schedule: string
  notes?: string
  amount: number
  status: 'pending' | 'paid' | 'failed' | 'selesai'
  createdAt: string
}

export type ReferralRecord = {
  refId: string
  patientName: string
  patientPhone: string
  doctorName: string
  diagnosis: string
  hospital: string
  notes?: string
  status: 'aktif' | 'diproses' | 'selesai'
  createdAt: string
}

export type ContactRecord = {
  id: string
  name: string
  phone: string
  email?: string
  message: string
  createdAt: string
}

export type TrackingState = {
  bookingId: string
  startedAt: number
  durationMs: number
  start: { lat: number; lng: number }
  destination: { lat: number; lng: number }
  staffName: string
}

type StoreShape = {
  bookings: BookingRecord[]
  referrals: ReferralRecord[]
  contacts: ContactRecord[]
  tracking: Record<string, TrackingState>
}

function seed(): StoreShape {
  const now = Date.now()
  const iso = (offsetDays: number) => new Date(now - offsetDays * 86400000).toISOString()
  return {
    bookings: [
      { orderId: 'VC-DEMO01', service: 'dokter', serviceName: 'Booking Dokter ke Rumah', patientName: 'Ahmad Rizaldi', phone: '081900000001', address: 'Cakranegara, Mataram', schedule: iso(2), amount: 250000, status: 'selesai', createdAt: iso(2) },
      { orderId: 'VC-DEMO02', service: 'infus', serviceName: 'Booking Infus Home Care', patientName: 'Sari Wijaya', phone: '081900000002', address: 'Mataram', schedule: iso(5), amount: 180000, status: 'paid', createdAt: iso(5) },
    ],
    referrals: [
      { refId: 'RJK-DEMO001', patientName: 'Ahmad Rizaldi', patientPhone: '081900000001', doctorName: 'dr. Bayu Pradana', diagnosis: 'Hipertensi Grade II', hospital: 'RS Islam Siti Hajar Mataram', status: 'diproses', createdAt: iso(2) },
    ],
    contacts: [],
    tracking: {},
  }
}

const g = globalThis as unknown as { __vitaStore?: StoreShape }
function store(): StoreShape {
  if (!g.__vitaStore) g.__vitaStore = seed()
  return g.__vitaStore
}

// --- Bookings ---
export function addBooking(b: BookingRecord) {
  store().bookings.unshift(b)
  return b
}
export function listBookings(): BookingRecord[] {
  return store().bookings
}
export function updateBookingStatus(orderId: string, status: BookingRecord['status']) {
  const b = store().bookings.find((x) => x.orderId === orderId)
  if (b) b.status = status
  return b
}

// --- Referrals ---
export function addReferral(r: ReferralRecord) {
  store().referrals.unshift(r)
  return r
}
export function listReferrals(): ReferralRecord[] {
  return store().referrals
}
export function getReferral(refId: string): ReferralRecord | undefined {
  return store().referrals.find((r) => r.refId === refId)
}

// --- Contacts ---
export function addContact(c: ContactRecord) {
  store().contacts.unshift(c)
  return c
}
export function listContacts(): ContactRecord[] {
  return store().contacts
}

// --- Tracking (server-driven live position) ---
const PATIENT = { lat: -8.5833, lng: 116.1167 }
const START = { lat: -8.65, lng: 116.07 }

export type LiveTracking = {
  lat: number
  lng: number
  status: 'mencari' | 'menuju_lokasi' | 'tiba' | 'selesai'
  etaMinutes: number
  staffName: string
  progress: number
}

export function getLiveTracking(bookingId: string): LiveTracking {
  const s = store()
  let t = s.tracking[bookingId]
  if (!t) {
    t = {
      bookingId,
      startedAt: Date.now(),
      durationMs: 3 * 60 * 1000,
      start: START,
      destination: PATIENT,
      staffName: 'Ns. Dwi Aditya, S.Kep',
    }
    s.tracking[bookingId] = t
  }
  const elapsed = Date.now() - t.startedAt
  const progress = Math.min(elapsed / t.durationMs, 1)
  const lat = t.start.lat + (t.destination.lat - t.start.lat) * progress
  const lng = t.start.lng + (t.destination.lng - t.start.lng) * progress
  let status: LiveTracking['status'] = 'menuju_lokasi'
  if (progress < 0.05) status = 'mencari'
  else if (progress >= 1) status = 'tiba'
  const etaMinutes = Math.max(0, Math.round((t.durationMs - elapsed) / 60000))
  return { lat, lng, status, etaMinutes, staffName: t.staffName, progress }
}
