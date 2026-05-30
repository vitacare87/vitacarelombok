import { NextRequest, NextResponse } from 'next/server'
import { sendWhatsAppMessage } from '@/lib/whatsapp'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  try {
    const { to, message } = await req.json()
    if (!message) {
      return NextResponse.json({ error: 'Pesan kosong.' }, { status: 400 })
    }
    const target = to || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''
    const result = await sendWhatsAppMessage(target, message)
    // Even if the WhatsApp API isn't configured, return ok so the UX flows.
    return NextResponse.json({ ok: true, delivered: result.ok, info: result.error })
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}
