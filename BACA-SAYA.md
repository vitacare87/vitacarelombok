# Paket Halaman Profesional — Vita Care Lombok

Paket ini melengkapi kekurangan situs Anda agar tampil profesional dan siap deploy.
Semua halaman memakai desain konsisten (tema medis teal/emerald) dan responsif.

## Isi paket

| File | Fungsi |
|------|--------|
| `tentang.html` | Halaman Tentang Kami (visi, misi, nilai, legalitas, kontak) |
| `kebijakan-privasi.html` | Kebijakan Privasi sesuai UU PDP No. 27/2022 |
| `syarat-ketentuan.html` | Syarat & Ketentuan layanan |
| `disclaimer.html` | Disclaimer Medis & Panduan Darurat (termasuk banner 119/112) |
| `styles.css` | Gaya bersama untuk keempat halaman |
| `seo-schema-untuk-beranda.html` | Snippet SEO + JSON-LD untuk ditempel ke <head> beranda |
| `BACA-SAYA.md` | Panduan ini |

## Cara deploy ke Netlify

**Opsi A — Tambahkan ke proyek yang sudah ada (disarankan):**
1. Salin `styles.css` dan keempat file `.html` ke folder publik situs Anda (mis. `public/` atau root).
2. Tambahkan tautan ke halaman ini di menu/footer beranda Anda, mis:
   `<a href="/tentang.html">Tentang Kami</a>`, `/kebijakan-privasi.html`, `/syarat-ketentuan.html`, `/disclaimer.html`.
3. Tempel isi `seo-schema-untuk-beranda.html` ke dalam `<head>` beranda Anda.
4. Commit & deploy seperti biasa.

**Opsi B — Uji cepat:** seret-lepas folder ini ke dasbor Netlify (drag & drop) untuk pratinjau.

## WAJIB dilengkapi (ganti semua placeholder bertanda [ ... ])

Hal-hal berikut hanya Anda yang tahu — cari teks dalam tanda kurung siku dan ganti:
- **Nama badan hukum** (PT/CV), **NIB**, dan **nomor izin operasional Dinkes**
- **Dokter penanggung jawab** + nomor STR/SIP
- **Alamat kantor**, **nomor WhatsApp/telepon**, **email** resmi
- **Kebijakan pembatalan & refund** yang sebenarnya
- **Forum penyelesaian sengketa** (mis. PN Mataram)
- **Gambar preview** (og:image) dan **logo** untuk SEO

## Catatan penting lain (dari hasil evaluasi)

1. **Bug testimoni**: di beranda, nama “Ibu Sari Wijaya” tertulis dengan huruf Sirilik (Сари). Perbaiki menjadi huruf Latin biasa.
2. **Klaim kemitraan faskes** (RS Siloam, RSUD Mataram, Prodia, dll.): pastikan ada perjanjian resmi sebelum mencantumkan logo/nama.
3. **Statistik** (15.000+ pasien, 4.9/5): sertakan dasar/periode data atau sesuaikan agar tidak menyesatkan.
