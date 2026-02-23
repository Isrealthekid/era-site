'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Calendar, Clock, MapPin, Users, User, BookOpen, X, Mail } from 'lucide-react'
import trainingsData from '@/data/trainings.json'

const modeColors: Record<string, string> = {
  hybrid: 'bg-purple-100 text-purple-700',
  online: 'bg-green-100 text-green-700',
  physical: 'bg-orange-100 text-orange-700',
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('en-NG').format(price)
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-NG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function TrainingDetailPage() {
  const params = useParams()
  const id = params?.id as string
  const training = trainingsData.find((t) => t.id === id)

  const [showModal, setShowModal] = useState(false)
  const [enrollForm, setEnrollForm] = useState({ name: '', email: '', phone: '' })
  const [enrollStatus, setEnrollStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  if (!training) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">Training not found</h1>
        <Button asChild>
          <Link href="/trainings">Back to Trainings</Link>
        </Button>
      </div>
    )
  }

  const handleEnroll = async (e: React.FormEvent) => {
    e.preventDefault()
    setEnrollStatus('sending')

    try {
      const res = await fetch('/api/send-enrollment-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: enrollForm.name,
          email: enrollForm.email,
          trainingTitle: training.title,
        }),
      })

      if (res.ok) {
        setEnrollStatus('success')
      } else {
        setEnrollStatus('error')
      }
    } catch {
      setEnrollStatus('error')
    }
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Back link */}
          <Link
            href="/trainings"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Trainings
          </Link>

          <div className="grid lg:grid-cols-[45%_55%] gap-10">
            {/* Left: Image + Meta */}
            <div>
              <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-gray-200 mb-6">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-gray-400">Training Flyer</span>
                </div>
                <div className="absolute top-4 left-4">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full uppercase ${modeColors[training.mode] || 'bg-gray-100 text-gray-700'}`}>
                    {training.mode}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-600">
                  <User className="h-5 w-5 text-green-600 shrink-0" />
                  <div>
                    <div className="text-xs text-gray-400">Instructor</div>
                    <div className="font-medium text-foreground">{training.instructor}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Calendar className="h-5 w-5 text-green-600 shrink-0" />
                  <div>
                    <div className="text-xs text-gray-400">Start Date</div>
                    <div className="font-medium text-foreground">{formatDate(training.startDate)}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Clock className="h-5 w-5 text-green-600 shrink-0" />
                  <div>
                    <div className="text-xs text-gray-400">Duration</div>
                    <div className="font-medium text-foreground">{training.duration}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Users className="h-5 w-5 text-green-600 shrink-0" />
                  <div>
                    <div className="text-xs text-gray-400">Available Seats</div>
                    <div className="font-medium text-foreground">{training.seats}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <MapPin className="h-5 w-5 text-green-600 shrink-0" />
                  <div>
                    <div className="text-xs text-gray-400">Mode</div>
                    <div className="font-medium text-foreground capitalize">{training.mode}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Details */}
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">{training.title}</h1>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">{training.fullDetails}</p>

              {/* Syllabus */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-green-600" /> Syllabus
                </h2>
                <ul className="space-y-3">
                  {training.syllabus.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <span className="flex-none w-7 h-7 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-bold">
                        {i + 1}
                      </span>
                      <span className="text-foreground">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Price + CTA */}
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="text-3xl font-bold text-green-600 mb-4">
                  &#x20A6;{formatPrice(training.price)}
                  <span className="text-sm font-normal text-gray-500 ml-2">{training.currency}</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={() => setShowModal(true)}
                    className="bg-green-600 hover:bg-green-700 text-white flex-1"
                    size="lg"
                  >
                    Enroll Now
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="flex-1"
                  >
                    <a href={`mailto:info@era.com.ng?subject=Training Enrollment: ${training.title}&body=I'd like to enroll in ${training.title}. Please send me more details.`}>
                      <Mail className="mr-2 h-4 w-4" /> Enroll via Email
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Enrollment Modal */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setShowModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between p-6 border-b">
                  <h3 className="text-xl font-bold text-foreground">Enroll: {training.title}</h3>
                  <button onClick={() => setShowModal(false)} aria-label="Close">
                    <X className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                  </button>
                </div>

                {enrollStatus === 'success' ? (
                  <div className="p-6 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-bold text-foreground mb-2">Enrollment Confirmed!</h4>
                    <p className="text-gray-600 mb-4">Check your email for confirmation details.</p>
                    <Button onClick={() => setShowModal(false)} className="bg-green-600 hover:bg-green-700 text-white">
                      Done
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleEnroll} className="p-6 space-y-4">
                    <div>
                      <label htmlFor="enroll-name" className="block text-sm font-medium text-foreground mb-1">Full Name</label>
                      <Input
                        id="enroll-name"
                        required
                        value={enrollForm.name}
                        onChange={(e) => setEnrollForm({ ...enrollForm, name: e.target.value })}
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="enroll-email" className="block text-sm font-medium text-foreground mb-1">Email</label>
                      <Input
                        id="enroll-email"
                        type="email"
                        required
                        value={enrollForm.email}
                        onChange={(e) => setEnrollForm({ ...enrollForm, email: e.target.value })}
                        placeholder="Enter your email"
                      />
                    </div>
                    <div>
                      <label htmlFor="enroll-phone" className="block text-sm font-medium text-foreground mb-1">Phone</label>
                      <Input
                        id="enroll-phone"
                        type="tel"
                        value={enrollForm.phone}
                        onChange={(e) => setEnrollForm({ ...enrollForm, phone: e.target.value })}
                        placeholder="Enter your phone number"
                      />
                    </div>

                    {enrollStatus === 'error' && (
                      <p className="text-red-600 text-sm">Failed to send. Please try the email option instead.</p>
                    )}

                    <Button
                      type="submit"
                      disabled={enrollStatus === 'sending'}
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                      size="lg"
                    >
                      {enrollStatus === 'sending' ? 'Submitting...' : `Enroll - ₦${formatPrice(training.price)}`}
                    </Button>

                    <p className="text-xs text-gray-500 text-center">
                      Payment integration coming soon. Your enrollment request will be confirmed via email.
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
