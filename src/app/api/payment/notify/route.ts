import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'

export const runtime = 'nodejs'

// Midtrans payment notification (webhook) handler.
// Configure this URL in your Midtrans dashboard: /api/payment/notify
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const orderId = body.order_id as string
    const transactionStatus = body.transaction_status as string
    const fraudStatus = body.fraud_status as string | undefined

    let status: 'pending' | 'paid' | 'failed' = 'pending'
    if (transactionStatus === 'capture' || transactionStatus === 'settlement') {
      status = fraudStatus === 'challenge' ? 'pending' : 'paid'
    } else if (['deny', 'cancel', 'expire'].includes(transactionStatus)) {
      status = 'failed'
    }

    const supabase = getSupabaseAdmin()
    if (supabase && orderId) {
      await supabase.from('bookings').update({ status }).eq('order_id', orderId)
    }

    return NextResponse.json({ ok: true, orderId, status })
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}
