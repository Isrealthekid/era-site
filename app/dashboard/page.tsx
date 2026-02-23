'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Camera, FileText, GraduationCap, LogOut, Trash2, Upload, Plus, X } from 'lucide-react'

// ──────── PIN AUTH ────────
function PinAuth({ onAuth }: { onAuth: () => void }) {
  const [pin, setPin] = useState<string[]>(Array(6).fill(''))
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const inputs = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (i: number, val: string) => {
    if (!/^\d*$/.test(val)) return
    const newPin = [...pin]
    newPin[i] = val.slice(-1)
    setPin(newPin)
    setError(false)

    if (val && i < 5) {
      inputs.current[i + 1]?.focus()
    }

    if (newPin.every((d) => d !== '') && newPin.join('').length === 6) {
      submitPin(newPin.join(''))
    }
  }

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !pin[i] && i > 0) {
      inputs.current[i - 1]?.focus()
    }
  }

  const submitPin = async (pinStr: string) => {
    setLoading(true)
    try {
      const res = await fetch('/api/auth/dashboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: pinStr }),
      })
      const data = await res.json()
      if (data.success) {
        sessionStorage.setItem('era_dash_auth', 'true')
        onAuth()
      } else {
        setError(true)
        setPin(Array(6).fill(''))
        inputs.current[0]?.focus()
      }
    } catch {
      setError(true)
      setPin(Array(6).fill(''))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center"
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <GraduationCap className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">ERA Dashboard</h1>
        <p className="text-gray-500 mb-8">Enter your 6-digit PIN to continue</p>

        <motion.div
          animate={error ? { x: [0, -10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="flex justify-center gap-3 mb-6"
        >
          {pin.map((digit, i) => (
            <input
              key={i}
              ref={(el) => { inputs.current[i] = el }}
              type="password"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className={`w-12 h-14 text-center text-xl font-bold border-2 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 ${
                error ? 'border-red-400 bg-red-50' : 'border-gray-200'
              }`}
              aria-label={`PIN digit ${i + 1}`}
            />
          ))}
        </motion.div>

        {error && <p className="text-red-500 text-sm mb-4">Incorrect PIN. Please try again.</p>}
        {loading && <p className="text-gray-500 text-sm">Verifying...</p>}
      </motion.div>
    </div>
  )
}

// ──────── GALLERY TAB ────────
function GalleryTab() {
  const [images, setImages] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const loadImages = useCallback(async () => {
    try {
      const res = await fetch('/api/dashboard/gallery')
      const data = await res.json()
      setImages(data.images || [])
    } catch {}
  }, [])

  useEffect(() => { loadImages() }, [loadImages])

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return
    setUploading(true)
    const formData = new FormData()
    Array.from(files).forEach((f) => formData.append('files', f))

    try {
      await fetch('/api/dashboard/gallery', { method: 'POST', body: formData })
      await loadImages()
    } catch {}
    setUploading(false)
  }

  const handleDelete = async (img: string) => {
    try {
      await fetch('/api/dashboard/gallery', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename: img }),
      })
      await loadImages()
    } catch {}
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-6">Gallery Manager</h2>

      <div
        onClick={() => fileRef.current?.click()}
        className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-green-500 transition-colors mb-6"
      >
        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
        <p className="text-gray-500">{uploading ? 'Uploading...' : 'Drop files here or click to upload'}</p>
        <input
          ref={fileRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => handleUpload(e.target.files)}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img} className="relative group rounded-lg overflow-hidden bg-gray-100 aspect-square">
            <img src={img} alt="" className="w-full h-full object-cover" />
            <button
              onClick={() => handleDelete(img)}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Delete image"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      {images.length === 0 && !uploading && (
        <p className="text-center text-gray-400 py-8">No images uploaded yet.</p>
      )}
    </div>
  )
}

// ──────── BLOG TAB ────────
function BlogTab() {
  const [form, setForm] = useState({
    title: '',
    slug: '',
    category: 'Career',
    author: 'ERA Editorial Team',
    excerpt: '',
    content: '',
    tags: '',
  })
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const generateSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

  const handleTitleChange = (val: string) => {
    setForm({ ...form, title: val, slug: generateSlug(val) })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setSuccess(false)

    const formData = new FormData()
    Object.entries(form).forEach(([k, v]) => formData.append(k, v))
    if (coverFile) formData.append('coverImage', coverFile)

    try {
      const res = await fetch('/api/dashboard/blogs', { method: 'POST', body: formData })
      if (res.ok) {
        setSuccess(true)
        setForm({ title: '', slug: '', category: 'Career', author: 'ERA Editorial Team', excerpt: '', content: '', tags: '' })
        setCoverFile(null)
      }
    } catch {}
    setSubmitting(false)
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-6">Create Blog Post</h2>
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-3 mb-4">
          Blog post published successfully!
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Title *</label>
          <Input value={form.title} onChange={(e) => handleTitleChange(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Slug *</label>
          <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Category *</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option>Career</option>
            <option>Skills</option>
            <option>Engineering</option>
            <option>News</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Author</label>
          <Input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Excerpt * (max 200 chars)</label>
          <Textarea
            value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value.slice(0, 200) })}
            maxLength={200}
            required
            className="h-20"
          />
          <p className="text-xs text-gray-400 mt-1">{form.excerpt.length}/200</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Cover Image *</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCoverFile(e.target.files?.[0] || null)}
            className="text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Content * (Markdown)</label>
          <Textarea
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            required
            className="h-48 font-mono text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Tags (comma-separated)</label>
          <Input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="career, engineering" />
        </div>
        <Button type="submit" disabled={submitting} className="bg-green-600 hover:bg-green-700 text-white">
          {submitting ? 'Publishing...' : 'Publish Post'}
        </Button>
      </form>
    </div>
  )
}

// ──────── TRAINING TAB ────────
function TrainingTab() {
  const [form, setForm] = useState({
    title: '',
    slug: '',
    description: '',
    fullDetails: '',
    price: '',
    duration: '',
    mode: 'hybrid',
    startDate: '',
    seats: '30',
    instructor: '',
    published: true,
  })
  const [syllabus, setSyllabus] = useState<string[]>([''])
  const [flyerFile, setFlyerFile] = useState<File | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const generateSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

  const handleTitleChange = (val: string) => {
    setForm({ ...form, title: val, slug: generateSlug(val) })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setSuccess(false)

    const formData = new FormData()
    Object.entries(form).forEach(([k, v]) => formData.append(k, String(v)))
    formData.set('syllabus', JSON.stringify(syllabus.filter(Boolean)))
    if (flyerFile) formData.append('flyerImage', flyerFile)

    try {
      const res = await fetch('/api/dashboard/trainings', { method: 'POST', body: formData })
      if (res.ok) {
        setSuccess(true)
        setForm({ title: '', slug: '', description: '', fullDetails: '', price: '', duration: '', mode: 'hybrid', startDate: '', seats: '30', instructor: '', published: true })
        setSyllabus([''])
        setFlyerFile(null)
      }
    } catch {}
    setSubmitting(false)
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-6">Create Training</h2>
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-3 mb-4">
          Training saved successfully!
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Training Title *</label>
            <Input value={form.title} onChange={(e) => handleTitleChange(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Slug *</label>
            <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Short Description *</label>
          <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required className="h-20" />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Full Details *</label>
          <Textarea value={form.fullDetails} onChange={(e) => setForm({ ...form, fullDetails: e.target.value })} required className="h-32" />
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Price (NGN) *</label>
            <Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Duration *</label>
            <Input value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} placeholder="4 Weeks" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Mode *</label>
            <select
              value={form.mode}
              onChange={(e) => setForm({ ...form, mode: e.target.value })}
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="online">Online</option>
              <option value="physical">Physical</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Start Date *</label>
            <Input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Seats</label>
            <Input type="number" value={form.seats} onChange={(e) => setForm({ ...form, seats: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Instructor</label>
            <Input value={form.instructor} onChange={(e) => setForm({ ...form, instructor: e.target.value })} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Training Flyer *</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFlyerFile(e.target.files?.[0] || null)}
            className="text-sm"
            required
          />
        </div>

        {/* Syllabus */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Syllabus Items</label>
          <div className="space-y-2">
            {syllabus.map((item, i) => (
              <div key={i} className="flex gap-2">
                <Input
                  value={item}
                  onChange={(e) => {
                    const updated = [...syllabus]
                    updated[i] = e.target.value
                    setSyllabus(updated)
                  }}
                  placeholder={`Week ${i + 1}: Topic`}
                />
                {syllabus.length > 1 && (
                  <button
                    type="button"
                    onClick={() => setSyllabus(syllabus.filter((_, idx) => idx !== i))}
                    className="text-red-500 hover:text-red-700"
                    aria-label="Remove syllabus item"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => setSyllabus([...syllabus, ''])}
              className="text-sm text-green-600 hover:text-green-700 flex items-center gap-1"
            >
              <Plus className="h-4 w-4" /> Add Item
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="published"
            checked={form.published}
            onChange={(e) => setForm({ ...form, published: e.target.checked })}
            className="rounded"
          />
          <label htmlFor="published" className="text-sm text-foreground">Publish immediately</label>
        </div>

        <Button type="submit" disabled={submitting} className="bg-green-600 hover:bg-green-700 text-white">
          {submitting ? 'Saving...' : 'Save Training'}
        </Button>
      </form>
    </div>
  )
}

// ──────── MAIN DASHBOARD ────────
type Tab = 'gallery' | 'blog' | 'trainings'

export default function DashboardPage() {
  const [authed, setAuthed] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>('gallery')

  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('era_dash_auth') === 'true') {
      setAuthed(true)
    }
  }, [])

  const handleLogout = () => {
    sessionStorage.removeItem('era_dash_auth')
    setAuthed(false)
  }

  if (!authed) {
    return <PinAuth onAuth={() => setAuthed(true)} />
  }

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: 'gallery', label: 'Gallery', icon: <Camera className="h-5 w-5" /> },
    { key: 'blog', label: 'Blog Posts', icon: <FileText className="h-5 w-5" /> },
    { key: 'trainings', label: 'Trainings', icon: <GraduationCap className="h-5 w-5" /> },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shrink-0">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-foreground">ERA Dashboard</h1>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left ${
                activeTab === tab.key
                  ? 'bg-green-50 text-green-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'gallery' && <GalleryTab />}
            {activeTab === 'blog' && <BlogTab />}
            {activeTab === 'trainings' && <TrainingTab />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}
