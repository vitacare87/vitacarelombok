import {
  Stethoscope,
  HeartPulse,
  Baby,
  Activity,
  Droplets,
  Ambulance,
  type LucideIcon,
} from 'lucide-react'

export type Service = {
  slug: string
  name: string
  short: string
  description: string
  price: string
  icon: LucideIcon
  features: string[]
  popular?: boolean
}

export const services: Service[] = [
  {
    slug: 'dokter',
    name: 'Booking Dokter ke Rumah',
    short: 'Dokter Panggilan',
    description:
      'Konsultasi & pemeriksaan langsung oleh dokter umum/spesialis di rumah Anda, lengkap dengan resep digital.',
    price: 'Mulai Rp 250.000',
    icon: Stethoscope,
    features: ['Dokter umum & spesialis', 'Resep digital', 'Pemeriksaan menyeluruh', 'Tersedia 24 jam'],
    popular: true,
  },
  {
    slug: 'perawat',
    name: 'Booking Perawat ke Rumah',
    short: 'Perawat Home Care',
    description:
      'Perawatan luka, perawatan pasca operasi, dan pendampingan pasien oleh perawat tersertifikasi.',
    price: 'Mulai Rp 150.000',
    icon: HeartPulse,
    features: ['Perawatan luka', 'Pasca operasi', 'Perawat tersertifikasi', 'Laporan harian'],
  },
  {
    slug: 'bidan',
    name: 'Booking Bidan ke Rumah',
    short: 'Bidan Home Care',
    description:
      'Pemeriksaan kehamilan, perawatan ibu & bayi, serta pijat laktasi oleh bidan profesional.',
    price: 'Mulai Rp 175.000',
    icon: Baby,
    features: ['Pemeriksaan kehamilan', 'Perawatan ibu & bayi', 'Pijat laktasi', 'Edukasi gizi'],
  },
  {
    slug: 'fisioterapi',
    name: 'Booking Fisioterapi',
    short: 'Fisioterapi',
    description:
      'Terapi rehabilitasi, stroke, nyeri sendi & otot oleh fisioterapis berpengalaman di rumah Anda.',
    price: 'Mulai Rp 200.000',
    icon: Activity,
    features: ['Rehabilitasi stroke', 'Terapi nyeri', 'Latihan gerak', 'Program terstruktur'],
  },
  {
    slug: 'infus',
    name: 'Booking Infus Home Care',
    short: 'Infus Home Care',
    description:
      'Pemasangan infus, vitamin & terapi cairan oleh tenaga medis dengan standar steril rumah sakit.',
    price: 'Mulai Rp 180.000',
    icon: Droplets,
    features: ['Infus vitamin', 'Terapi cairan', 'Standar steril', 'Monitoring tenaga medis'],
    popular: true,
  },
  {
    slug: 'ambulans',
    name: 'Booking Ambulans',
    short: 'Ambulans',
    description:
      'Layanan ambulans cepat dengan paramedis & peralatan gawat darurat lengkap, siaga 24 jam.',
    price: 'Mulai Rp 350.000',
    icon: Ambulance,
    features: ['Respons cepat', 'Paramedis terlatih', 'Alat gawat darurat', 'Siaga 24 jam'],
  },
]

export type Partner = {
  name: string
  type: 'Rumah Sakit' | 'Klinik' | 'Laboratorium' | 'Apotek' | 'Ambulans'
  initials: string
}

export const partners: Partner[] = [
  { name: 'RS Harapan Lombok', type: 'Rumah Sakit', initials: 'HL' },
  { name: 'RSUD Mataram', type: 'Rumah Sakit', initials: 'RM' },
  { name: 'RS Risa Sentra Medika', type: 'Rumah Sakit', initials: 'RS' },
  { name: 'RS Islam Siti Hajar Mataram', type: 'Rumah Sakit', initials: 'SH' },
  { name: 'RS Siloam Mataram', type: 'Rumah Sakit', initials: 'SL' },
  { name: 'Klinik Sehat Sasak', type: 'Klinik', initials: 'SS' },
  { name: 'Klinik Pratama Senggigi', type: 'Klinik', initials: 'PS' },
  { name: 'Klinik Gili Medika', type: 'Klinik', initials: 'GM' },
  { name: 'Lab Prodia Mataram', type: 'Laboratorium', initials: 'PM' },
  { name: 'Lab Kimia Farma', type: 'Laboratorium', initials: 'KF' },
  { name: 'Lab Bumi Gora', type: 'Laboratorium', initials: 'BG' },
  { name: 'Apotek Kimia Farma', type: 'Apotek', initials: 'AK' },
  { name: 'Apotek K24 Cakranegara', type: 'Apotek', initials: 'K24' },
  { name: 'Apotek Rinjani', type: 'Apotek', initials: 'AR' },
  { name: 'Ambulans 119 NTB', type: 'Ambulans', initials: '119' },
  { name: 'Ambulans PMI Lombok', type: 'Ambulans', initials: 'PMI' },
]

export type Testimonial = {
  name: string
  location: string
  service: string
  rating: number
  quote: string
  initials: string
}

export const testimonials: Testimonial[] = [
  {
    name: 'Ibu Sари Wijaya',
    location: 'Mataram',
    service: 'Infus Home Care',
    rating: 5,
    quote:
      'Pelayanannya sangat profesional. Perawat datang tepat waktu dan ramah. Tidak perlu antri di rumah sakit lagi.',
    initials: 'SW',
  },
  {
    name: 'Bapak Ahmad Rizaldi',
    location: 'Cakranegara',
    service: 'Dokter Panggilan',
    rating: 5,
    quote:
      'Orang tua saya yang sulit bergerak bisa diperiksa dokter di rumah. Sistem rujukannya juga sangat membantu.',
    initials: 'AR',
  },
  {
    name: 'Ibu Lalu Ningsih',
    location: 'Senggigi',
    service: 'Fisioterapi',
    rating: 5,
    quote:
      'Terapi pasca stroke ayah saya jadi rutin tanpa harus repot ke klinik. Fisioterapisnya sabar dan kompeten.',
    initials: 'LN',
  },
  {
    name: 'Bapak Gede Suparta',
    location: 'Lombok Barat',
    service: 'Ambulans',
    rating: 5,
    quote:
      'Ambulans datang cepat saat darurat. Fitur tracking realtime bikin keluarga tenang menunggu.',
    initials: 'GS',
  },
  {
    name: 'Ibu Dewi Anjani',
    location: 'Praya',
    service: 'Bidan Home Care',
    rating: 5,
    quote:
      'Bidan profesional untuk perawatan bayi baru lahir. Sangat membantu ibu baru seperti saya.',
    initials: 'DA',
  },
  {
    name: 'Bapak Hendra Kusuma',
    location: 'Mataram',
    service: 'Perawat Home Care',
    rating: 5,
    quote:
      'Perawatan luka diabetes ibu saya tertangani dengan baik. Laporan hariannya transparan via dashboard.',
    initials: 'HK',
  },
]

export const stats = [
  { value: '15.000+', label: 'Pasien Terlayani' },
  { value: '120+', label: 'Tenaga Kesehatan' },
  { value: '25+', label: 'Faskes Partner' },
  { value: '4.9/5', label: 'Rating Kepuasan' },
]

export const navLinks = [
  { href: '/', label: 'Beranda' },
  { href: '/layanan', label: 'Layanan' },
  { href: '/tracking', label: 'Tracking Petugas' },
  { href: '/partner', label: 'Partner Kami' },
  { href: '/rujukan', label: 'Sistem Rujukan' },
  { href: '/dashboard', label: 'Dashboard Pasien' },
  { href: '/testimoni', label: 'Testimoni' },
  { href: '/tentang', label: 'Tentang Kami' },
  { href: '/kontak', label: 'Kontak' },
]

export const SEO_KEYWORDS = [
  'Home Care Lombok',
  'Dokter Panggilan Lombok',
  'Perawat Home Care Lombok',
  'Infus Home Care Mataram',
  'Ambulans Lombok',
  'Rujukan Rumah Sakit Lombok',
  'Terapi Komplementer',
  'Sirkumsisi',
  'Bidan Home Care Lombok',
  'Fisioterapi Lombok',
]

export type TeamMember = {
  name: string
  role: string
  photo: string
  desc: string
}

export const team: TeamMember[] = [
  {
    name: 'Ns. Dwi Aditya, S.Kep',
    role: 'Perawat Home Care',
    photo: '/team/dwi-aditya.jpeg',
    desc: 'Perawat tersertifikasi untuk perawatan luka, pasca operasi, dan pendampingan pasien di rumah.',
  },
  {
    name: 'Ns. Azis Paradi, S.Kep',
    role: 'Perawat Home Care',
    photo: '/team/azis-paradi.jpeg',
    desc: 'Berpengalaman dalam perawatan pasien kronis dan terapi infus di rumah.',
  },
  {
    name: 'Ns. Rijal Hambali, S.Kep',
    role: 'Perawat Home Care',
    photo: '/team/rijal-hambali.jpeg',
    desc: 'Fokus pada perawatan geriatri, edukasi keluarga, dan pemantauan kesehatan rutin.',
  },
]
