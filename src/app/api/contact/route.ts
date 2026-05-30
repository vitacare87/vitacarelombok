import { NextRequest, NextResponse } from 'next/server'
import { addContact } from '@/lib/store'
import { getSupabaseAdmin } from '@/lib/supabase'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  try {
    const { name, phone, email, message } = await req.json()
    if (!name || !phone || !message) {
      return NextResponse.json({ error: 'Nama, WhatsApp, dan pesan wajib diisi.' }, { status: 400 })
    }

    const record = {
      id: 'MSG-' + Date.now().toString(36).toUpperCase(),
      name: String(name),
      phone: String(phone),
      email: email ? String(email) : undefined,
      message: String(message),
      createdAt: new Date().toISOString(),
    }
    addContact(record)

    const supabase = getSupabaseAdmin()
    if (supabase) {
      await supabase.from('contacts').insert({ name, phone, email, message })
    }

    return NextResponse.json({
      ok: true,
      id: record.id,
      message: 'Pesan Anda telah kami terima. Tim Vita Care akan segera menghubungi Anda.',
    })
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}
