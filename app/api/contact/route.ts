import { NextResponse } from 'next/server'
import { sendMail } from '@/lib/mailer'

export async function POST(req: Request) {
  const { name, email, phone, message } = await req.json()

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  try {
    await sendMail({
      to: 'info@era.com.ng',
      subject: `New Contact Message from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    })

    await sendMail({
      to: email,
      subject: 'We received your message -- ERA Academy',
      html: `
        <p>Hi ${name},</p>
        <p>Thanks for reaching out to ERA. We'll get back to you within 1 business day.</p>
        <p>-- The ERA Team</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact email error:', err)
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}
