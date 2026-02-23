import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
})

export async function verifyMailer() {
  try {
    await transporter.verify()
    console.log('SMTP connected')
  } catch (err) {
    console.error('SMTP connection failed:', err)
  }
}

interface SendMailOptions {
  to: string
  subject: string
  html: string
}

export async function sendMail({ to, subject, html }: SendMailOptions) {
  return transporter.sendMail({
    from: process.env.SMTP_FROM,
    to,
    subject,
    html,
  })
}

export function enrollmentEmailHtml(name: string, trainingTitle: string) {
  return `
    <div style="font-family:sans-serif;max-width:600px;margin:auto">
      <div style="background:#1a1a2e;padding:32px;text-align:center">
        <h1 style="color:#fff;margin:0">ERA Academy</h1>
      </div>
      <div style="padding:32px;background:#f9f9f9">
        <h2>Enrollment Confirmed!</h2>
        <p>Hi <strong>${name}</strong>,</p>
        <p>Your enrollment for <strong>${trainingTitle}</strong> has been confirmed.
        Our team will reach out within 24 hours with onboarding details.</p>
        <p>If you have any questions, reply to this email or call us on
        <strong>08139777878</strong>.</p>
        <p style="margin-top:32px">-- The ERA Team</p>
      </div>
      <div style="background:#eee;padding:16px;text-align:center;font-size:12px;color:#666">
        ERA - 3rd Floor Oshopey Plaza, Allen Avenue, Ikeja, Lagos<br/>
        <a href="https://era.com.ng">era.com.ng</a>
      </div>
    </div>
  `
}
