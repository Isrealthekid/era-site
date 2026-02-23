import { NextResponse } from 'next/server'
import { readdir, mkdir } from 'fs/promises'
import path from 'path'

const GALLERY_DIR = path.join(process.cwd(), 'public', 'uploads', 'gallery')

export async function GET() {
  try {
    try {
      await mkdir(GALLERY_DIR, { recursive: true })
    } catch {}
    const files = await readdir(GALLERY_DIR)
    const images = files
      .filter((f) => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(f))
      .map((f) => `/uploads/gallery/${f}`)
    return NextResponse.json({ images })
  } catch {
    return NextResponse.json({ images: [] })
  }
}
