import { NextResponse } from 'next/server'
import { sendMail, enrollmentEmailHtml } from '@/lib/mailer'

export async function POST(req: Request) {
  const { name, email, trainingTitle } = await req.json()

  if (!name || !email || !trainingTitle) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  try {
    await sendMail({
      to: email,
      subject: `Enrollment Confirmed - ${trainingTitle}`,
      html: enrollmentEmailHtml(name, trainingTitle),
    })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Email send error:', err)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
