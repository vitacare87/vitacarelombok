import { NextRequest, NextResponse } from 'next/server'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import QRCode from 'qrcode'
import { getSupabaseAdmin } from '@/lib/supabase'
import { addReferral } from '@/lib/store'

export const runtime = 'nodejs'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vitacarelombok.com'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { patientName, patientPhone, doctorName, diagnosis, hospital, notes } = body
    if (!patientName || !doctorName || !diagnosis || !hospital) {
      return NextResponse.json({ error: 'Data rujukan tidak lengkap.' }, { status: 400 })
    }

    const refId = 'RJK-' + Date.now().toString().slice(-8)
    const issuedAt = new Date().toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short' })
    const verifyUrl = siteUrl + '/rujukan/verify/' + refId

    // Persist referral to the in-memory store (always available; powers the
    // QR verification page out of the box).
    addReferral({
      refId,
      patientName,
      patientPhone,
      doctorName,
      diagnosis,
      hospital,
      notes,
      status: 'aktif',
      createdAt: new Date().toISOString(),
    })

    // Persist referral to Supabase (if configured).
    const supabase = getSupabaseAdmin()
    if (supabase) {
      await supabase.from('referrals').insert({
        ref_id: refId,
        patient_name: patientName,
        patient_phone: patientPhone,
        doctor_name: doctorName,
        diagnosis,
        hospital,
        notes,
        status: 'aktif',
      })
    }

    // Generate QR code (PNG data URL) for verification.
    const qrDataUrl = await QRCode.toDataURL(verifyUrl, { margin: 1, width: 240 })
    const qrBytes = Buffer.from(qrDataUrl.split(',')[1], 'base64')

    // Build the PDF.
    const pdf = await PDFDocument.create()
    const page = pdf.addPage([595, 842]) // A4
    const font = await pdf.embedFont(StandardFonts.Helvetica)
    const bold = await pdf.embedFont(StandardFonts.HelveticaBold)
    const blue = rgb(0.07, 0.35, 0.76)
    const green = rgb(0.05, 0.62, 0.4)
    const dark = rgb(0.1, 0.15, 0.25)
    const gray = rgb(0.45, 0.5, 0.58)

    // Header band
    page.drawRectangle({ x: 0, y: 792, width: 595, height: 50, color: blue })
    page.drawText('VITA CARE LOMBOK', { x: 40, y: 808, size: 18, font: bold, color: rgb(1, 1, 1) })
    page.drawText('Home Care Profesional - Lombok & Mataram', { x: 40, y: 796, size: 9, font, color: rgb(0.85, 0.92, 1) })

    page.drawText('SURAT RUJUKAN PASIEN', { x: 40, y: 750, size: 16, font: bold, color: dark })
    page.drawText('No. ' + refId, { x: 40, y: 732, size: 11, font, color: green })
    page.drawText('Diterbitkan: ' + issuedAt, { x: 40, y: 716, size: 9, font, color: gray })
    page.drawLine({ start: { x: 40, y: 706 }, end: { x: 555, y: 706 }, thickness: 1, color: rgb(0.85, 0.88, 0.93) })

    const rows: [string, string][] = [
      ['Nama Pasien', String(patientName)],
      ['No. Kontak', String(patientPhone || '-')],
      ['Dokter Perujuk', String(doctorName)],
      ['Diagnosa', String(diagnosis)],
      ['Rumah Sakit Tujuan', String(hospital)],
      ['Catatan Klinis', String(notes || '-')],
    ]
    let y = 680
    for (const [label, value] of rows) {
      page.drawText(label, { x: 40, y, size: 10, font: bold, color: blue })
      page.drawText(value.slice(0, 70), { x: 200, y, size: 10, font, color: dark })
      y -= 26
    }

    // QR code
    const qrImage = await pdf.embedPng(qrBytes)
    page.drawText('Verifikasi Keaslian:', { x: 40, y: y - 20, size: 10, font: bold, color: blue })
    page.drawImage(qrImage, { x: 40, y: y - 150, width: 120, height: 120 })
    page.drawText('Pindai QR untuk memverifikasi', { x: 40, y: y - 165, size: 8, font, color: gray })

    // Signature
    page.drawText('Hormat kami,', { x: 380, y: y - 30, size: 10, font, color: dark })
    page.drawText(String(doctorName), { x: 380, y: y - 90, size: 11, font: bold, color: dark })
    page.drawText('Dokter Home Care', { x: 380, y: y - 104, size: 9, font, color: gray })

    // Footer
    page.drawText('Dokumen ini diterbitkan secara elektronik oleh Vita Care Lombok dan sah tanpa tanda tangan basah.', {
      x: 40, y: 40, size: 8, font, color: gray,
    })

    const pdfBytes = await pdf.save()

    return new NextResponse(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="' + refId + '.pdf"',
        'X-Referral-Id': refId,
      },
    })
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}
