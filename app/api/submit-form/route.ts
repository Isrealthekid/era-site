import { NextResponse } from 'next/server'
import { initializeApp, getApps, cert } from 'firebase-admin/app'
import { getDatabase } from 'firebase-admin/database'

const firebaseConfig = {
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  }),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
}

// Initialize Firebase
if (!getApps().length) {
  initializeApp(firebaseConfig)
}

const db = getDatabase()

export async function POST(req: Request) {
  console.log('Received form submission request')
  
  try {
    const body = await req.json()
    console.log('Received form data:', body)
    
    if (!body || typeof body !== 'object') {
      throw new Error('Invalid request body')
    }

    const { formType, ...data } = body

    if (!formType || (formType !== 'contact' && formType !== 'modal')) {
      throw new Error('Invalid form type')
    }

    const collection = formType === 'contact' ? 'contactSubmissions' : 'modalSubmissions'
    const timestamp = new Date().toISOString()

    const ref = db.ref(collection)
    await ref.push({
      ...data,
      timestamp,
    })

    console.log(`Form submission successful: ${formType}`, data)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error submitting form:', error)
    return NextResponse.json({ success: false, error: 'An error occurred while submitting the form.' }, { status: 500 })
  }
}

