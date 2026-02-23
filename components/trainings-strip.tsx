'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Clock } from 'lucide-react'
import trainingsData from '@/data/trainings.json'

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const modeColors: Record<string, string> = {
  hybrid: 'bg-purple-100 text-purple-700',
  online: 'bg-green-100 text-green-700',
  physical: 'bg-orange-100 text-orange-700',
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('en-NG').format(price)
}

export function TrainingsStrip() {
  const published = trainingsData.filter((t) => t.published)

  if (published.length === 0) return null

  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="py-16"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-foreground">Upcoming Trainings</h2>
          <Link
            href="/trainings"
            className="hidden sm:flex items-center gap-1 text-green-600 font-medium hover:text-green-700 transition-colors"
          >
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Horizontal scroll on mobile, grid on desktop */}
        <div className="flex lg:grid lg:grid-cols-3 gap-6 overflow-x-auto pb-4 -mx-4 px-4 lg:mx-0 lg:px-0 lg:overflow-visible">
          {published.map((training, i) => (
            <motion.div
              key={training.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              whileHover={{ y: -4 }}
              className="flex-none w-[320px] lg:w-auto bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 group"
            >
              <div className="relative h-48">
                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Training Flyer</span>
                </div>
                <div className="absolute top-3 left-3">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full uppercase ${modeColors[training.mode] || 'bg-gray-100 text-gray-700'}`}>
                    {training.mode}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg text-foreground mb-2 line-clamp-2">{training.title}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <Clock className="h-4 w-4" />
                  <span>{training.duration}</span>
                </div>
                <div className="text-xl font-bold text-green-600 mb-4">
                  &#x20A6;{formatPrice(training.price)}
                </div>
                <Button
                  asChild
                  variant="outline"
                  className="w-full group-hover:bg-green-600 group-hover:text-white group-hover:border-green-600 transition-colors"
                >
                  <Link href={`/trainings/${training.id}`}>
                    View Details <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Button asChild className="bg-green-600 hover:bg-green-700 text-white">
            <Link href="/trainings">View More Trainings</Link>
          </Button>
        </div>
      </div>
    </motion.section>
  )
}
