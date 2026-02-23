import { NextResponse } from 'next/server'
import { readFile, writeFile, mkdir } from 'fs/promises'
import path from 'path'

const TRAININGS_PATH = path.join(process.cwd(), 'data', 'trainings.json')
const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads', 'trainings')

async function ensureDir(dir: string) {
  try {
    await mkdir(dir, { recursive: true })
  } catch {}
}

export async function POST(req: Request) {
  try {
    await ensureDir(UPLOADS_DIR)
    const formData = await req.formData()

    const title = formData.get('title') as string
    const slug = formData.get('slug') as string
    const description = formData.get('description') as string
    const fullDetails = formData.get('fullDetails') as string
    const price = Number(formData.get('price'))
    const duration = formData.get('duration') as string
    const mode = formData.get('mode') as string
    const startDate = formData.get('startDate') as string
    const seats = Number(formData.get('seats')) || 30
    const instructor = formData.get('instructor') as string || ''
    const published = formData.get('published') === 'true'
    const syllabusRaw = formData.get('syllabus') as string || '[]'
    const syllabus = JSON.parse(syllabusRaw)
    const flyerImage = formData.get('flyerImage') as File | null

    let flyerPath = '/uploads/trainings/default.jpg'
    if (flyerImage && flyerImage.size > 0) {
      const bytes = await flyerImage.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const filename = `${Date.now()}-${flyerImage.name.replace(/\s+/g, '-')}`
      await writeFile(path.join(UPLOADS_DIR, filename), buffer)
      flyerPath = `/uploads/trainings/${filename}`
    }

    const trainingsRaw = await readFile(TRAININGS_PATH, 'utf-8')
    const trainings = JSON.parse(trainingsRaw)

    const newTraining = {
      id: String(trainings.length + 1),
      title,
      slug,
      description,
      fullDetails,
      price,
      currency: 'NGN',
      duration,
      mode,
      flyerImage: flyerPath,
      startDate,
      seats,
      instructor,
      syllabus,
      published,
    }

    trainings.push(newTraining)
    await writeFile(TRAININGS_PATH, JSON.stringify(trainings, null, 2))

    return NextResponse.json({ success: true, training: newTraining })
  } catch (err) {
    console.error('Training create error:', err)
    return NextResponse.json({ error: 'Failed to create training' }, { status: 500 })
  }
}
