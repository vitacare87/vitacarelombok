# 🏥 Vita Care Lombok

Website **Home Care profesional** untuk Lombok & Mataram — dibangun dengan **Next.js 15 + TypeScript + Tailwind CSS + Supabase**, siap deploy ke **Vercel** maupun **Netlify**.

Desain premium setara startup kesehatan nasional (Halodoc / Alodokter), mobile-first, dengan palet **Biru Medis · Putih · Hijau Kesehatan**.

---

## ✨ Fitur

| Halaman | Deskripsi |
|---|---|
| **Beranda** | Hero, statistik, ringkasan layanan, alur kerja, highlight rujukan, partner & testimoni |
| **Layanan** | Booking dokter, perawat, bidan, fisioterapi, infus, ambulans + form booking |
| **Tracking Petugas** | Peta **Google Maps** + lokasi pasien & petugas, ETA, status realtime (**Firebase**) |
| **Partner Kami** | Rumah sakit, klinik, laboratorium, apotek & ambulans partner |
| **Sistem Rujukan** | Alur Pasien → Dokter → Diagnosa → Rujukan → RS Partner, **PDF + QR + status + WhatsApp** |
| **Dashboard Pasien** | Riwayat kunjungan, resep, hasil lab, surat rujukan, surat kontrol, pembayaran |
| **Testimoni** | Ulasan pasien |
| **Tentang Kami** | Visi, misi, nilai |
| **Kontak** | Form kontak, peta, WhatsApp |

**Tombol Emergency 24 Jam** mengambang di semua halaman (mobile & desktop).

### Integrasi
- 🗺️ **Google Maps API** — peta tracking petugas
- 💬 **WhatsApp Cloud API** — notifikasi rujukan & click-to-chat
- 💳 **Midtrans** — pembayaran booking (Snap)
- 🗄️ **Supabase** — database (bookings, referrals, dll.)
- 🔥 **Firebase Realtime Database** — lokasi petugas realtime

### SEO
Metadata lengkap (Open Graph, Twitter, JSON-LD `MedicalBusiness`), `sitemap.ts`, `robots.txt`, dan optimasi kata kunci:
`Home Care Lombok`, `Dokter Panggilan Lombok`, `Perawat Home Care Lombok`, `Infus Home Care Mataram`, `Ambulans Lombok`, `Rujukan Rumah Sakit Lombok`, `Terapi Komplementer`, `Sirkumsisi`.

---

## 🚀 Menjalankan Secara Lokal

```bash
# 1. Install dependencies
npm install

# 2. Salin environment variables
cp .env.example .env.local
# lalu isi key Anda (lihat bagian di bawah)

# 3. Jalankan dev server
npm run dev
# buka http://localhost:3000
```

> Tanpa kredensial pun website tetap berjalan: peta tracking menampilkan **simulasi**, booking & rujukan tetap berfungsi dengan fallback yang aman.

---

## 🔑 Environment Variables

Lihat `.env.example` untuk daftar lengkap:

| Variabel | Untuk |
|---|---|
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Google Maps (tracking) |
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` / `SUPABASE_SERVICE_ROLE_KEY` | Supabase |
| `NEXT_PUBLIC_FIREBASE_*` | Firebase Realtime DB |
| `MIDTRANS_SERVER_KEY` / `NEXT_PUBLIC_MIDTRANS_CLIENT_KEY` | Midtrans |
| `WHATSAPP_*` | WhatsApp Cloud API |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` / `NEXT_PUBLIC_EMERGENCY_PHONE` | Tombol darurat & chat |

---

## 🗄️ Skema Supabase (saran)

```sql
create table bookings (
  id uuid primary key default gen_random_uuid(),
  order_id text unique,
  service text,
  patient_name text,
  phone text,
  address text,
  schedule timestamptz,
  notes text,
  amount int,
  status text default 'pending',
  created_at timestamptz default now()
);

create table referrals (
  id uuid primary key default gen_random_uuid(),
  ref_id text unique,
  patient_name text,
  patient_phone text,
  doctor_name text,
  diagnosis text,
  hospital text,
  notes text,
  status text default 'aktif',
  created_at timestamptz default now()
);
```

### Firebase tracking path
```
/tracking/{bookingId} = { lat, lng, status, etaMinutes, staffName, updatedAt }
```

---

## ☁️ Deploy

### Vercel
1. Push repo ke GitHub.
2. Import di [vercel.com](https://vercel.com) → framework otomatis terdeteksi (`vercel.json` disertakan).
3. Tambahkan environment variables di **Settings → Environment Variables**.
4. Deploy.

### Netlify
1. Push repo ke GitHub.
2. Import di Netlify (`netlify.toml` + plugin `@netlify/plugin-nextjs` disertakan).
3. Tambahkan environment variables di **Site settings → Environment**.
4. Deploy.

---

## 🧱 Struktur Proyek

```
src/
├─ app/
│  ├─ layout.tsx           # Root layout + SEO + JSON-LD
│  ├─ page.tsx             # Beranda
│  ├─ layanan/             # Layanan + booking
│  ├─ tracking/            # Tracking petugas (Google Maps + Firebase)
│  ├─ partner/             # Partner kami
│  ├─ rujukan/             # Sistem rujukan (PDF + QR + WA)
│  ├─ dashboard/           # Dashboard pasien
│  ├─ testimoni/ tentang/ kontak/
│  ├─ sitemap.ts
│  └─ api/
│     ├─ booking/route.ts        # Booking + Midtrans + Supabase
│     ├─ rujukan/pdf/route.ts    # Generate PDF + QR (pdf-lib + qrcode)
│     ├─ whatsapp/route.ts       # Notifikasi WhatsApp
│     └─ payment/notify/route.ts # Webhook Midtrans
├─ components/             # Navbar, Footer, EmergencyButton, dll.
└─ lib/                    # supabase, firebase, midtrans, whatsapp, data
```

---

© Vita Care Lombok. Dibuat dengan ❤️ untuk masyarakat Lombok.
