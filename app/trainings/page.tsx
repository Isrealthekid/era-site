'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Clock, Search } from 'lucide-react'
import trainingsData from '@/data/trainings.json'

const modeColors: Record<string, string> = {
  hybrid: 'bg-purple-100 text-purple-700',
  online: 'bg-green-100 text-green-700',
  physical: 'bg-orange-100 text-orange-700',
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('en-NG').format(price)
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

type FilterMode = 'all' | 'online' | 'physical' | 'hybrid'

export default function TrainingsPage() {
  const [filter, setFilter] = useState<FilterMode>('all')
  const published = trainingsData.filter((t) => t.published)
  const filtered = filter === 'all' ? published : published.filter((t) => t.mode === filter)

  const filters: { label: string; value: FilterMode }[] = [
    { label: 'All', value: 'all' },
    { label: 'Online', value: 'online' },
    { label: 'Physical', value: 'physical' },
    { label: 'Hybrid', value: 'hybrid' },
  ]

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 text-foreground">All Trainings</h1>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Browse our comprehensive training programs designed to equip engineers and graduates with industry-ready skills.
          </p>
        </motion.div>

        {/* Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-2 justify-center mb-10"
        >
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === f.value
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p className="text-lg">No trainings found for this filter.</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={filter}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((training) => (
              <motion.div
                key={training.id}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 group"
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
                  <p className="text-sm text-gray-500 mb-3 line-clamp-2">{training.description}</p>
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
          </motion.div>
        )}
      </div>
    </div>
  )
}
