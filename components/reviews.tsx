'use client'

import Image from 'next/image'
import { Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { FadeIn } from './fade-in'

interface Review {
  id: number
  name: string
  role: string
  company: string
  image: string
  content: string
  rating: number
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Software Developer",
    company: "TechCorp",
    image: "/placeholder.svg",
    content: "The training program at ERA was transformative. The practical skills and industry connections I gained were invaluable to starting my career.",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    role: "Marketing Specialist",
    company: "BrandCo",
    image: "/placeholder.svg",
    content: "ERA's program provided me with real-world experience and mentorship that helped me land my dream job. The support from the team was exceptional.",
    rating: 5
  },
  {
    id: 3,
    name: "Emily Thompson",
    role: "Data Analyst",
    company: "DataTech",
    image: "/placeholder.svg",
    content: "The internship placement through ERA opened doors I never thought possible. The skills I learned during the program are still valuable in my career today.",
    rating: 5
  },
  {
    id: 4,
    name: "David Kim",
    role: "UX Designer",
    company: "DesignHub",
    image: "/placeholder.svg",
    content: "What sets ERA apart is their commitment to both technical and soft skills development. The program prepared me well for the professional world.",
    rating: 5
  },
  {
    id: 5,
    name: "Lisa Patel",
    role: "Business Analyst",
    company: "ConsultCo",
    image: "/placeholder.svg",
    content: "The networking opportunities and industry connections I made through ERA were incredible. It's more than just training - it's a career launchpad.",
    rating: 5
  }
]

export function Reviews() {
  return (
    <section className="py-16 overflow-hidden">
      <div className="container mx-auto px-4">
        <FadeIn>
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Graduates Say
          </h2>
        </FadeIn>
        
        <div className="relative">
          {/* Custom Scrollbar Styles */}
          <style jsx global>{`
            .reviews-scroll::-webkit-scrollbar {
              height: 6px;
            }
            .reviews-scroll::-webkit-scrollbar-track {
              background: #f1f1f1;
              border-radius: 3px;
            }
            .reviews-scroll::-webkit-scrollbar-thumb {
              background: #22c55e;
              border-radius: 3px;
            }
            .reviews-scroll::-webkit-scrollbar-thumb:hover {
              background: #16a34a;
            }
          `}</style>

          {/* Gradient Fade Effect */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* Scrollable Reviews */}
          <div className="reviews-scroll flex gap-6 overflow-x-auto pb-6 -mx-4 px-4">
            {reviews.map((review) => (
              <motion.div
                key={review.id}
                className="flex-none w-[350px] bg-white rounded-xl shadow-lg p-6"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <Image
                    src={review.image}
                    alt={review.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold">{review.name}</h3>
                    <p className="text-sm text-gray-600">
                      {review.role} at {review.company}
                    </p>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-600">{review.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

