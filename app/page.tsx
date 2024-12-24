'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { FadeIn } from '@/components/fade-in'
import { CountUp } from '@/components/count-up'
import { Reviews } from '@/components/reviews'

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      {/* <section className="bg-white py-20">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <FadeIn direction="right">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Great futures are built with proper guidance
            </h1>
            <p className="text-xl text-gray-600 mb-8">
            The world's largest social fundraising platform dedicated to youth training and employment
            </p>
            <div className="space-x-4">
              <Button 
                className="bg-green-600 hover:bg-green-700 transition-transform hover:scale-105"
              >
                Explore Programs
              </Button>
              <Button 
                variant="outline"
                className="transition-transform hover:scale-105"
              >
                Partner With Us
              </Button>
            </div>
          </FadeIn>
          <FadeIn direction="left" delay={0.2}>
            <div className="relative h-[400px]">
              <Image
                src="/placeholder.svg"
                alt="Training session"
                fill
                className="rounded-lg object-cover"
              />
            </div>
          </FadeIn>
        </div>
      </section> */}

<section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-12 ">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                        Great futures are built with proper guidance
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                        The world's largest social fundraising platform dedicated to youth training and employment
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md">Start Learning</button>
                        <button className="border border-gray-300 hover:border-gray-400 px-6 py-2 rounded-md">Become a Partner</button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-green-50 rounded-2xl p-6">
                        <div className="text-3xl font-bold text-green-600 mb-2">65%</div>
                        <p className="text-gray-600">of our graduates find employment within 3 months</p>
                    </div>
                    <div className="bg-gray-900 text-white rounded-2xl p-6">
                        <div className="text-3xl font-bold mb-2">2,500+</div>
                        <p>Students trained annually across multiple programs</p>
                    </div>
                    <div className="bg-green-100 rounded-2xl p-6">
                        <div className="text-3xl font-bold text-green-600 mb-2">50+</div>
                        <p className="text-gray-600">Partner companies offering internships</p>
                    </div>
                    <div className="bg-gray-100 rounded-2xl p-6">
                        <div className="text-3xl font-bold mb-2">6 Months</div>
                        <p className="text-gray-600">Intensive training and internship program</p>
                    </div>
                </div>
            </div>
        </section>

      {/* Partners Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <FadeIn>
            <h2 className="text-3xl font-bold text-center mb-12">Our Partners</h2>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <motion.div 
                  className="flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Image
                    src="/placeholder.svg"
                    alt={`Partner ${i}`}
                    width={150}
                    height={60}
                    className="grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">
                <CountUp end={150} suffix="K+" />
              </div>
              <div className="text-gray-600">Graduates Trained</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">
                <CountUp end={180} suffix="K" />
              </div>
              <div className="text-gray-600">Success Stories</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">
                <CountUp end={90} suffix="K" />
              </div>
              <div className="text-gray-600">Partner Companies</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">
                <CountUp end={85} suffix="%" />
              </div>
              <div className="text-gray-600">Employment Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Programs */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <FadeIn>
            <h2 className="text-3xl font-bold text-center mb-12">Our Programs</h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Technical Training",
                description: "Intensive technical training in various domains",
                image: "/placeholder.svg"
              },
              {
                title: "Soft Skills Development",
                description: "Essential workplace and communication skills",
                image: "/placeholder.svg"
              },
              {
                title: "Internship Placement",
                description: "6-month internships with partner companies",
                image: "/placeholder.svg"
              }
            ].map((program, i) => (
              <FadeIn key={i} direction="up" delay={i * 0.2}>
                <motion.div 
                  className="bg-white rounded-lg overflow-hidden shadow-lg"
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Image
                    src={program.image}
                    alt={program.title}
                    width={400}
                    height={250}
                    className="w-full object-cover h-48"
                  />
                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-2">{program.title}</h3>
                    <p className="text-gray-600 mb-4">{program.description}</p>
                    <Button 
                      variant="outline" 
                      className="w-full transition-colors hover:bg-green-600 hover:text-white"
                    >
                      Learn More
                    </Button>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <Reviews />

      {/* CTA Section */}
      <section className="py-20 bg-green-600 text-white overflow-hidden">
        <FadeIn>
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Start Your Journey?
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Join our program and take the first step towards your professional career.
              </p>
              <div className="space-x-4">
                <Button 
                  className="bg-white text-green-600 hover:bg-gray-300 transition-transform hover:scale-105"
                >
                  Join as Graduate
                </Button>
                <Button 
                  variant="outline" 
                  className="text-white border-white bg-green-700 transition-transform hover:scale-105"
                >
                  Become a Partner
                </Button>
              </div>
            </motion.div>
          </div>
        </FadeIn>
      </section>
    </div>
  )
}

