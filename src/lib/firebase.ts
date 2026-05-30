import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app'
import { getDatabase, ref, onValue, set, type Database } from 'firebase/database'

// ----------------------------------------------------------------
// Firebase Realtime Database - live staff tracking
// Path convention: /tracking/{bookingId} => { lat, lng, status, etaMinutes, updatedAt }
// ----------------------------------------------------------------

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

export function getFirebaseApp(): FirebaseApp | null {
  if (!firebaseConfig.apiKey || !firebaseConfig.databaseURL) return null
  return getApps().length ? getApp() : initializeApp(firebaseConfig)
}

export function getRealtimeDb(): Database | null {
  const app = getFirebaseApp()
  if (!app) return null
  return getDatabase(app)
}

export type TrackingSnapshot = {
  lat: number
  lng: number
  status: 'mencari' | 'menuju_lokasi' | 'tiba' | 'selesai'
  etaMinutes: number
  staffName?: string
  updatedAt?: number
}

/** Subscribe to realtime location updates for a booking. Returns an unsubscribe fn. */
export function subscribeToTracking(
  bookingId: string,
  cb: (data: TrackingSnapshot | null) => void,
): () => void {
  const db = getRealtimeDb()
  if (!db) {
    cb(null)
    return () => {}
  }
  const trackingRef = ref(db, `tracking/${bookingId}`)
  const unsub = onValue(trackingRef, (snap) => cb(snap.val() as TrackingSnapshot | null))
  return unsub
}

/** Push a tracking update (used by the staff app / simulator). */
export async function pushTrackingUpdate(bookingId: string, data: TrackingSnapshot) {
  const db = getRealtimeDb()
  if (!db) return
  await set(ref(db, `tracking/${bookingId}`), { ...data, updatedAt: Date.now() })
}
