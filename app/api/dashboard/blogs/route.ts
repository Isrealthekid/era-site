import { NextResponse } from 'next/server'
import { readFile, writeFile, mkdir } from 'fs/promises'
import path from 'path'

const BLOGS_PATH = path.join(process.cwd(), 'data', 'blogs.json')
const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads', 'blogs')

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
    const category = formData.get('category') as string
    const author = formData.get('author') as string || 'ERA Editorial Team'
    const excerpt = formData.get('excerpt') as string
    const content = formData.get('content') as string
    const tags = (formData.get('tags') as string || '').split(',').map(t => t.trim()).filter(Boolean)
    const coverImage = formData.get('coverImage') as File | null

    let coverPath = '/uploads/blogs/default.jpg'
    if (coverImage && coverImage.size > 0) {
      const bytes = await coverImage.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const filename = `${Date.now()}-${coverImage.name.replace(/\s+/g, '-')}`
      await writeFile(path.join(UPLOADS_DIR, filename), buffer)
      coverPath = `/uploads/blogs/${filename}`
    }

    const blogsRaw = await readFile(BLOGS_PATH, 'utf-8')
    const blogs = JSON.parse(blogsRaw)

    const newBlog = {
      id: String(blogs.length + 1),
      slug,
      title,
      excerpt,
      content,
      author,
      date: new Date().toISOString().split('T')[0],
      category,
      coverImage: coverPath,
      tags,
    }

    blogs.push(newBlog)
    await writeFile(BLOGS_PATH, JSON.stringify(blogs, null, 2))

    return NextResponse.json({ success: true, blog: newBlog })
  } catch (err) {
    console.error('Blog create error:', err)
    return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 })
  }
}
