'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ImageIcon } from 'lucide-react'

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function GalleryPage() {
  const [images, setImages] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [lightbox, setLightbox] = useState<string | null>(null)

  const loadImages = useCallback(async () => {
    try {
      const res = await fetch('/api/gallery')
      const data = await res.json()
      setImages(data.images || [])
    } catch {}
    setLoading(false)
  }, [])

  useEffect(() => { loadImages() }, [loadImages])

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-foreground mb-4">Gallery</h1>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Moments captured from our training sessions, events, and community activities.
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-16 text-gray-400">Loading gallery...</div>
        ) : images.length === 0 ? (
          <div className="text-center py-16">
            <ImageIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No images yet. Check back soon!</p>
          </div>
        ) : (
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            className="columns-2 md:columns-3 lg:columns-4 gap-4"
          >
            {images.map((img, i) => (
              <motion.div
                key={img}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className="mb-4 break-inside-avoid cursor-pointer group"
                onClick={() => setLightbox(img)}
              >
                <div className="rounded-xl overflow-hidden bg-gray-100">
                  <img
                    src={img}
                    alt={`Gallery image ${i + 1}`}
                    className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50"
              onClick={() => setLightbox(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={() => setLightbox(null)}
            >
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-6 right-6 text-white/80 hover:text-white z-50"
                aria-label="Close lightbox"
              >
                <X className="h-8 w-8" />
              </button>
              <img
                src={lightbox}
                alt="Gallery full view"
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
