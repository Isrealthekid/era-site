import { NextResponse } from 'next/server'
import { writeFile, readdir, unlink, mkdir } from 'fs/promises'
import path from 'path'

const GALLERY_DIR = path.join(process.cwd(), 'public', 'uploads', 'gallery')

async function ensureDir(dir: string) {
  try {
    await mkdir(dir, { recursive: true })
  } catch {}
}

export async function GET() {
  try {
    await ensureDir(GALLERY_DIR)
    const files = await readdir(GALLERY_DIR)
    const images = files
      .filter((f) => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(f))
      .map((f) => `/uploads/gallery/${f}`)
    return NextResponse.json({ images })
  } catch {
    return NextResponse.json({ images: [] })
  }
}

export async function POST(req: Request) {
  try {
    await ensureDir(GALLERY_DIR)
    const formData = await req.formData()
    const files = formData.getAll('files') as File[]

    const uploaded: string[] = []

    for (const file of files) {
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`
      const filepath = path.join(GALLERY_DIR, filename)
      await writeFile(filepath, buffer)
      uploaded.push(`/uploads/gallery/${filename}`)
    }

    return NextResponse.json({ success: true, uploaded })
  } catch (err) {
    console.error('Gallery upload error:', err)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const { filename } = await req.json()
    const filepath = path.join(GALLERY_DIR, path.basename(filename))
    await unlink(filepath)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Gallery delete error:', err)
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
  }
}
