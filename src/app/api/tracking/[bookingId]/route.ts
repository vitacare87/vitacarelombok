import { NextResponse } from 'next/server'
import { getLiveTracking } from '@/lib/store'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ bookingId: string }> },
) {
  const { bookingId } = await params
  const data = getLiveTracking(bookingId || 'DEMO-001')
  return NextResponse.json(data)
}
