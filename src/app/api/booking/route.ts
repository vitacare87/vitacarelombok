import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'
import { createSnapTransaction } from '@/lib/midtrans'
import { services } from '@/lib/data'
import { addBooking } from '@/lib/store'

export const runtime = 'nodejs'

function priceFor(slug: string): number {
  const map: Record<string, number> = {
    dokter: 250000,
    perawat: 150000,
    bidan: 175000,
    fisioterapi: 200000,
    infus: 180000,
    ambulans: 350000,
  }
  return map[slug] ?? 150000
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { service, name, phone, address, schedule, notes } = body
    if (!service || !name || !phone || !address) {
      return NextResponse.json({ error: 'Data booking tidak lengkap.' }, { status: 400 })
    }

    const svc = services.find((s) => s.slug === service)
    const amount = priceFor(service)
    const orderId = 'VC-' + Date.now().toString(36).toUpperCase()

    // 1) Persist booking to the in-memory store (works out of the box).
    addBooking({
      orderId,
      service,
      serviceName: svc?.name || service,
      patientName: name,
      phone,
      address,
      schedule: schedule || new Date().toISOString(),
      notes,
      amount,
      status: 'pending',
      createdAt: new Date().toISOString(),
    })

    // 2) Persist booking to Supabase (if configured).
    const supabase = getSupabaseAdmin()
    if (supabase) {
      await supabase.from('bookings').insert({
        order_id: orderId,
        service,
        patient_name: name,
        phone,
        address,
        schedule,
        notes,
        amount,
        status: 'pending',
      })
    }

    // 2) Create Midtrans payment (if configured).
    const payment = await createSnapTransaction({
      transaction_details: { order_id: orderId, gross_amount: amount },
      customer_details: { first_name: name, phone },
      item_details: [{ id: service, price: amount, quantity: 1, name: svc?.name || service }],
    })

    return NextResponse.json({
      ok: true,
      orderId,
      amount,
      payment: payment.ok ? { token: payment.token, redirectUrl: payment.redirectUrl } : null,
      message: payment.ok
        ? 'Booking dibuat. Mengarahkan ke pembayaran...'
        : 'Booking berhasil dikirim! Tim kami akan menghubungi Anda untuk konfirmasi pembayaran.',
    })
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}
