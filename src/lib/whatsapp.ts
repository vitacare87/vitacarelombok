// ----------------------------------------------------------------
// WhatsApp Cloud API helper (server-side only)
// Used for referral / booking notifications.
// ----------------------------------------------------------------

export type WhatsAppResult = { ok: boolean; id?: string; error?: string }

export async function sendWhatsAppMessage(to: string, message: string): Promise<WhatsAppResult> {
  const url = process.env.WHATSAPP_API_URL
  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID
  const token = process.env.WHATSAPP_ACCESS_TOKEN

  if (!url || !phoneId || !token) {
    return { ok: false, error: 'WhatsApp API belum dikonfigurasi (cek environment variables).' }
  }

  try {
    const res = await fetch(url + '/' + phoneId + '/messages', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: to.replace(/[^0-9]/g, ''),
        type: 'text',
        text: { body: message },
      }),
    })
    const data = await res.json()
    if (!res.ok) return { ok: false, error: JSON.stringify(data) }
    return { ok: true, id: data?.messages?.[0]?.id }
  } catch (err) {
    return { ok: false, error: (err as Error).message }
  }
}

/** Build a click-to-chat wa.me link (works without API for the public site). */
export function waLink(numberE164: string, text: string): string {
  const num = numberE164.replace(/[^0-9]/g, '')
  return 'https://wa.me/' + num + '?text=' + encodeURIComponent(text)
}
