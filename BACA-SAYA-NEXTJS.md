# Integrasi Vita Care Lombok ke Project Next.js

Situs Anda di Netlify adalah aplikasi **Next.js** (deploy dari Git). Paket ini
menaruh panel admin + data sebagai **aset statis** di folder `public/`, lalu
halaman React Anda membaca datanya. Tidak ada yang akan merusak build Next.js.

## Isi paket

```
public/
  admin.html                  -> panel admin, langsung jalan di /admin.html
  vitacare-data.json          -> sumber data (layanan, nav, menu legal, peta)
  assets/
    vitacare-dynamic.js        -> (opsional) hanya untuk halaman HTML statis
lib/
  vitacare-data.ts            -> helper baca data di Server Component
examples/
  HomePage.server.tsx         -> contoh Server Component (App Router)
  useSiteData.ts              -> contoh hook Client Component
```

## Langkah pasang (5 menit)

1. **Salin folder `public/`** ke root project Next.js Anda (gabungkan dengan
   `public/` yang sudah ada). Setelah deploy, panel admin bisa diakses di:
   `https://vitacarelombok.netlify.app/admin.html`

2. **Salin `lib/vitacare-data.ts`** ke folder `lib/` project Anda.
   (Pastikan alias `@/` mengarah ke root project -- default di Next.js.)

3. **Pakai datanya di halaman Anda.** Dua pilihan:

   - **Server Component (disarankan, App Router):** lihat
     `examples/HomePage.server.tsx`. Data dibaca saat build dari
     `public/vitacare-data.json`:
     ```tsx
     import { getSiteData, activeServices } from "@/lib/vitacare-data";
     const data = getSiteData();
     const services = activeServices(data);
     ```

   - **Client Component:** lihat `examples/useSiteData.ts`, ambil data via
     `fetch("/vitacare-data.json")`.

4. **Commit & push** ke Git -> Netlify build ulang otomatis.

## Alur update konten

1. Buka `/admin.html` -> edit Layanan / Menu Navigasi / Menu Legal / Titik Peta.
2. Klik **Ekspor JSON** -> dapat file `vitacare-data.json` baru.
3. **Ganti** `public/vitacare-data.json` di repo dengan file hasil ekspor.
4. Commit & push -> situs Next.js otomatis menampilkan data terbaru.

> Catatan: panel admin menyimpan editan di localStorage browser. Yang dipakai
> situs adalah file `vitacare-data.json` di repo, jadi **wajib Ekspor lalu
> commit** agar perubahan tampil di situs publik.

## Penting soal route

- `admin.html`, `vitacare-data.json`, dan `assets/` AMAN di `public/` karena
  disajikan apa adanya dan tidak bentrok dengan route Next.js.
- JANGAN menaruh `index.html` / `tentang.html` / dll. (HTML statis lama) ke
  dalam project Next.js -- itu akan bentrok dengan halaman React Anda. Gunakan
  data dari `vitacare-data.json` di komponen Next.js (lihat contoh).
- `assets/vitacare-dynamic.js` hanya berguna untuk halaman HTML murni; di
  Next.js tidak perlu dipakai (pakai pola React di `examples/`).

## Soal build yang gagal kemarin

Log Anda menunjukkan build Next.js **berhasil dikompilasi** ("Compiled
successfully", "Generating static pages (18/18)"). Kegagalan terjadi karena
build **dibatalkan** di langkah terakhir -- kemungkinan gangguan di sisi
Netlify (ada pesan "Deploy logs are currently unavailable"). Coba **Clear cache
and deploy site** lagi; menambahkan file di paket ini tidak memengaruhi error
tersebut.
