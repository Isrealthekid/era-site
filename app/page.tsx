'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { FadeIn } from '@/components/fade-in'
import { CountUp } from '@/components/count-up'
import { Reviews } from '@/components/reviews'
import image1 from './assets/imagebg.jpg'
import partner1 from './assets/1622799749-84-calebella-integritas-projects-ltd.png'
import partner2 from './assets/blackdiamond.jpg'
import partner3 from './assets/el fad.jpeg'
import partner4 from './assets/mbs.png'
import partner5 from './assets/mw.png'
import technicalTraining from './assets/medium-shot-smiley-man-with-tablet.jpg'
import softSkills from './assets/daily-life-business-people-office.jpg'
import internship from './assets/engineer-workspace-desk-background-top-view.jpg'





export default function Home() {
  return (
    <div>
 {/* <section className=" w-full py-12 md:py-24 lg:py-32">
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
        </section>  */}

        <section className="relative w-full py-12 md:py-24 lg:py-32 overflow-hidden">
      <Image
        src={image1}
        alt="Background"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="absolute inset-0 z-0"
      />
      <div className="absolute inset-0 bg-black bg-opacity-60 z-10"></div>
      <div className="container relative z-20 mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white">
            Great futures are built with proper guidance
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            An organisation aimed at providing a platform dedicated to Graduate training and employment opportunities
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md">
              Join Us
            </button>
            <button className="border border-white hover:bg-white hover:text-gray-900 text-white px-6 py-2 rounded-md transition-colors duration-300">
              Become a Partner
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-2xl p-6">
            <div className="text-3xl font-bold text-green-400 mb-2">95%</div>
            <p className="text-gray-200">of our graduates find employment within 3 months</p>
          </div>
          <div className="bg-gray-900 bg-opacity-80 text-white rounded-2xl p-6">
            <div className="text-3xl font-bold mb-2">500+</div>
            <p>Engineers and Graduates trained annually across multiple programs</p>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-2xl p-6">
            <div className="text-3xl font-bold text-green-400 mb-2">20+</div>
            <p className="text-gray-200">Partner companies offering internships</p>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-2xl p-6">
            <div className="text-3xl font-bold text-white mb-2">6 Months</div>
            <p className="text-gray-200">Intensive training and internship program</p>
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
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {/* {[1, 2, 3, 4].map((i) => ( */}
              <FadeIn>
                <motion.div 
                  className="flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Image
                    src={partner1}
                    alt={"Partner"}
                    width={150}
                    height={60}
                    className="grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </motion.div>
              </FadeIn>

              <FadeIn>
                <motion.div 
                  className="flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Image
                    src={partner2}
                    alt={"Partner"}
                    width={150}
                    height={60}
                    className="grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </motion.div>
              </FadeIn>

              <FadeIn>
                <motion.div 
                  className="flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Image
                    src={partner3}
                    alt={"Partner"}
                    width={100}
                    height={60}
                    className="grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </motion.div>
              </FadeIn>

              <FadeIn>
                <motion.div 
                  className="flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Image
                    src={partner4}
                    alt={"Partner"}
                    width={100}
                    height={60}
                    className="grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </motion.div>
              </FadeIn>

              <FadeIn>
                <motion.div 
                  className="flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Image
                    src={partner5}
                    alt={"Partner"}
                    width={100}
                    height={60}
                    className="grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </motion.div>
              </FadeIn>
            {/* ))} */}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">
                <CountUp end={300} suffix="+" />
              </div>
              <div className="text-gray-600">Graduates Trained</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">
                <CountUp end={500} suffix="+" />
              </div>
              <div className="text-gray-600">Success Stories</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">
                <CountUp end={20} suffix="+" />
              </div>
              <div className="text-gray-600">Partner Companies</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">
                <CountUp end={95} suffix="%" />
              </div>
              <div className="text-gray-600">Employment Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Programs */}
      {/* <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <FadeIn>
            <h2 className="text-3xl font-bold text-center mb-12">Our Programs</h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Technical Training",
                description: "Intensive technical training in various domains",
                image:  "/placeholder.svg"
              },
              {
                title: "Soft Skills Development",
                description: "Essential workplace skills and communication skills",
                image: "/placeholder.svg"
              },
              {
                title: "Internship Placement",
                description: "6-month internships placement with partner companies",
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
                    src={`{program.image}`}
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
      </section> */}

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
          image: technicalTraining
        },
        {
          title: "Soft Skills Development",
          description: "Essential workplace skills and communication skills",
          image: softSkills
        },
        {
          title: "Internship Placement",
          description: "6-month internships placement with partner companies",
          image: internship
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

