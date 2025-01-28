'use client'

import Image from 'next/image'
import { Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { FadeIn } from './fade-in'

import userImage from '../app/assets/user.png'
import dayo from '../app/assets/Screenshot_20250128_134544_Samsung Notes.jpg'
import hamzah from '../app/assets/Screenshot_20250128_134346_Samsung Notes.jpg'
import tofunmi from '../app/assets/IMG_0812.jpeg'

interface Review {
  id: number
  name: string
  role: string
  company: string
  image: any
  content: string
  rating: number
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Engr. Mobolaji Peter",
    role: "Civil Engineer",
    company: "Castigliano Nigeria Limited",
    image: userImage,
    content: "I have learnt so much from the opportunity given to me by ERA. To mention but few, I was able to do several setting out, interpreting structural details, calculation of concrete volume and formwork etc. We also constructed 8 blocks of flats from foundation to first floor",
    rating: 5
  },
  {
    id: 2,
    name: "Adebayo Tofunmi",
    role: "Civil Engineering Intern",
    company: "LS",
    image: tofunmi,
    content: "ERA's program provided me with real-world experience and mentorship that helped me land my dream job. The support from the team was exceptional.",
    rating: 5
  },
  {
    id: 3,
    name: "Hamzah Sirajudeen Olamilekan",
    role: "Engineer",
    company: "BLACK DIAMOND ENGINEERING LIMITED",
    image: hamzah,
    content: "Era helped me with the Interpretation of structural and architectural drawing -Project management ranging from areas of Human down to resources management. -Calculation of concrete volume -Estimation of materials to be used for an activity and many more.",
    rating: 5
  },
  {
    id: 4,
    name: " Wright Dayo",
    role: "Engineer",
    company: "BLACK DIAMOND ENGINEERING LIMITED",
    image: dayo,
    content: "Durning my internship i learnt about a lot of things including Post tension slabs, slab detailing for post tension cables, time management, effective communication with team",
    rating: 5
  },
  {
    id: 5,
    name: "Dosumw Owolabi Abdul-Lateef",
    role: "Engineer",
    company: "CALEBELLA PROJECT INTEGRITAS",
    image: userImage,
    content: "I have learnt a lot from the opportunity given to me by ERA. To mention but few, I was able to do several setting out, interpreting structural details, calculation of concrete volume and formwork, usage of leveling instrument, site management e.t.c. We constructed 8 blocks of flats from foundation to first floor at Ogombo and also a 2 unit Residential duplex of head room 3.9m at royal garden estate",
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
                className="flex-none w-[380px] bg-white rounded-xl shadow-lg p-6"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <Image
                    src={review.image}
                    alt={review.name}
                    width={60}
                    height={60}
                    className="rounded-full object-contain"
                  />
                  <div>
                    <h3 className="font-semibold">{review.name}</h3>
                    <p className="text-sm text-gray-600">
                      {review.role} at
                      <br/>
                     {review.company}
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

