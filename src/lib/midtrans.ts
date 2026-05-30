// ----------------------------------------------------------------
// Midtrans Snap payment helper (server-side only)
// Requires `midtrans-client`.
// ----------------------------------------------------------------

// eslint-disable-next-line @typescript-eslint/no-var-requires
type SnapTransaction = {
  transaction_details: { order_id: string; gross_amount: number }
  customer_details?: Record<string, unknown>
  item_details?: Array<Record<string, unknown>>
}

export type CreatePaymentResult = {
  ok: boolean
  token?: string
  redirectUrl?: string
  error?: string
}

export async function createSnapTransaction(payload: SnapTransaction): Promise<CreatePaymentResult> {
  const serverKey = process.env.MIDTRANS_SERVER_KEY
  if (!serverKey) {
    return { ok: false, error: 'Midtrans belum dikonfigurasi (set MIDTRANS_SERVER_KEY).' }
  }
  try {
    // Dynamic import keeps the dependency server-only.
    const Midtrans = (await import('midtrans-client')).default as any
    const snap = new Midtrans.Snap({
      isProduction: process.env.MIDTRANS_IS_PRODUCTION === 'true',
      serverKey,
      clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY,
    })
    const transaction = await snap.createTransaction(payload)
    return { ok: true, token: transaction.token, redirectUrl: transaction.redirect_url }
  } catch (err) {
    return { ok: false, error: (err as Error).message }
  }
}
