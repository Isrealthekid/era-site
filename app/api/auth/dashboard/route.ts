import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { pin } = await req.json()

  if (!pin) {
    return NextResponse.json({ success: false }, { status: 400 })
  }

  const dashboardPin = process.env.DASHBOARD_PIN

  if (!dashboardPin) {
    console.error('DASHBOARD_PIN not set in environment variables')
    return NextResponse.json({ success: false, error: 'Server configuration error' }, { status: 500 })
  }

  if (pin === dashboardPin) {
    return NextResponse.json({ success: true })
  }

  return NextResponse.json({ success: false }, { status: 401 })
}
