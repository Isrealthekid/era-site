'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { CountUp } from '@/components/count-up'
import { Reviews } from '@/components/reviews'
import { TrainingsStrip } from '@/components/trainings-strip'
import { ArrowRight, Clock, MapPin, Users } from 'lucide-react'
import image1 from './assets/imagebg.jpg'
import partner1 from './assets/1622799749-84-calebella-integritas-projects-ltd.png'
import partner2 from './assets/blackdiamond.jpg'
import partner3 from './assets/el fad.jpeg'
import partner4 from './assets/mbs.png'
import partner5 from './assets/mw.png'
import technicalTraining from './assets/medium-shot-smiley-man-with-tablet.jpg'
import softSkills from './assets/daily-life-business-people-office.jpg'
import internship from './assets/engineer-workspace-desk-background-top-view.jpg'

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function Home() {
  return (
    <div>
      {/* Hero Section - Left/Right Split */}
      <section className="relative w-full min-h-[90vh] flex items-center overflow-hidden">
        <Image
          src={image1}
          alt="ERA Engineering background"
          fill
          priority
          className="object-cover z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40 z-10" />

        <div className="container relative z-20 mx-auto px-4 py-16 lg:py-24">
          <div className="grid lg:grid-cols-[55%_45%] gap-12 items-center">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-white text-balance leading-tight">
                Great futures are built with proper guidance
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl leading-relaxed">
                An organisation dedicated to providing a platform for graduate training and employment opportunities across Nigeria.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Button
                  asChild
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white rounded-lg px-8"
                >
                  <a href="mailto:info@era.com.ng?subject=Join ERA Program">Join Us</a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white bg-white/10 hover:bg-white/20 rounded-lg px-8"
                >
                  <a href="mailto:info@era.com.ng?subject=Partnership Inquiry">Become a Partner</a>
                </Button>
              </div>

              {/* Stat pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { icon: Users, value: '300+', label: 'Graduates' },
                  { icon: MapPin, value: '20+', label: 'Partners' },
                  { icon: Clock, value: '6 Mo', label: 'Program' },
                  { icon: ArrowRight, value: '95%', label: 'Employed' },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10"
                  >
                    <stat.icon className="h-4 w-4 text-green-400 shrink-0" />
                    <span className="text-white text-sm font-semibold">{stat.value}</span>
                    <span className="text-gray-300 text-xs hidden sm:inline">{stat.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Column - Floating stat cards */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
              className="hidden lg:block relative"
            >
              <div className="relative w-full h-[480px]">
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <Image
                    src={image1}
                    alt="ERA Training"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>

                {/* Floating glass cards */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                  className="absolute top-8 right-8 bg-white/15 backdrop-blur-lg rounded-xl px-5 py-4 border border-white/20 shadow-lg"
                >
                  <div className="text-2xl font-bold text-white">95%</div>
                  <div className="text-sm text-gray-200">Employment Rate</div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
                  className="absolute bottom-12 left-8 bg-white/15 backdrop-blur-lg rounded-xl px-5 py-4 border border-white/20 shadow-lg"
                >
                  <div className="text-2xl font-bold text-white">500+</div>
                  <div className="text-sm text-gray-200">Engineers Trained</div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                  className="absolute bottom-8 right-12 bg-green-600/90 backdrop-blur-lg rounded-xl px-5 py-4 border border-green-500/30 shadow-lg"
                >
                  <div className="text-2xl font-bold text-white">20+</div>
                  <div className="text-sm text-green-100">Partner Companies</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-16 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Our Partners</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
            {[
              { src: partner1, alt: 'Calebella Integritas' },
              { src: partner2, alt: 'Black Diamond' },
              { src: partner3, alt: 'El Fad' },
              { src: partner4, alt: 'MBS' },
              { src: partner5, alt: 'MW' },
            ].map((p, i) => (
              <motion.div
                key={i}
                className="flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  width={120}
                  height={60}
                  className="grayscale hover:grayscale-0 transition-all duration-300 object-contain"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Impact Stats - Bento Grid */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-16"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Our Impact</h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            <motion.div
              variants={itemVariants}
              className="bg-green-600 rounded-2xl p-8 text-white col-span-1 lg:row-span-2 flex flex-col justify-center"
            >
              <div className="text-5xl font-bold mb-2">
                <CountUp end={95} suffix="%" />
              </div>
              <div className="text-green-100 text-lg">Employment Rate</div>
              <p className="text-green-200/80 text-sm mt-2">of our graduates find employment within 3 months</p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-gray-900 rounded-2xl p-8 text-white col-span-1 lg:col-span-2"
            >
              <div className="text-4xl font-bold mb-2">
                <CountUp end={500} suffix="+" />
              </div>
              <div className="text-gray-300">Engineers Trained annually across multiple programs</div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-gray-100 rounded-2xl p-8 col-span-2 lg:col-span-1 lg:row-span-2 flex flex-col justify-center"
            >
              <div className="text-4xl font-bold text-green-600 mb-2">
                <CountUp end={20} suffix="+" />
              </div>
              <div className="text-gray-600 text-lg">Partner Companies</div>
              <p className="text-gray-500 text-sm mt-2">offering internships and job placements</p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-green-50 rounded-2xl p-8 col-span-1"
            >
              <div className="text-4xl font-bold text-gray-900 mb-2">6 Months</div>
              <div className="text-gray-600">Intensive Program</div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-gray-900 rounded-2xl p-8 text-white col-span-1 flex items-center justify-center"
            >
              <Link
                href="/trainings"
                className="flex items-center gap-2 text-green-400 font-semibold text-lg hover:text-green-300 transition-colors"
              >
                Join Today <ArrowRight className="h-5 w-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Programs - Bento Grid */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-16 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Our Programs</h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 md:grid-rows-2 gap-4 md:h-[500px]"
          >
            {/* Technical Training - Large Card */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="relative md:col-span-2 md:row-span-2 rounded-2xl overflow-hidden group cursor-pointer"
            >
              <Image
                src={technicalTraining}
                alt="Technical Training"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-colors group-hover:from-black/70" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="font-bold text-2xl text-white mb-2">Technical Training</h3>
                <p className="text-gray-200 mb-4 max-w-md">
                  Intensive technical training in AutoCAD, project management, structural design, and more.
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="border-white/30 text-white bg-white/10 hover:bg-white/20"
                >
                  <Link href="/trainings">
                    Explore Trainings <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>

            {/* Soft Skills - Tall Card */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="relative rounded-2xl overflow-hidden group cursor-pointer"
            >
              <Image
                src={softSkills}
                alt="Soft Skills Development"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-colors group-hover:from-black/70" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-bold text-xl text-white mb-1">Soft Skills</h3>
                <p className="text-gray-300 text-sm">Communication, teamwork, and workplace skills</p>
              </div>
            </motion.div>

            {/* Internship */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="relative rounded-2xl overflow-hidden group cursor-pointer"
            >
              <Image
                src={internship}
                alt="Internship Placement"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-colors group-hover:from-black/70" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-bold text-xl text-white mb-1">Internship Placement</h3>
                <p className="text-gray-300 text-sm">6-month placements with partner companies</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Trainings Strip */}
      <TrainingsStrip />

      {/* Reviews Section */}
      <Reviews />

      {/* CTA Section */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-20 bg-green-600 text-white overflow-hidden"
      >
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-green-100 leading-relaxed">
              Join our program and take the first step towards your professional career.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-green-600 hover:bg-gray-100 transition-transform hover:scale-105"
              >
                <a href="mailto:info@era.com.ng?subject=Join ERA Program">Join as Graduate</a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-white border-white bg-green-700 hover:bg-green-800 transition-transform hover:scale-105"
              >
                <a href="mailto:info@era.com.ng?subject=Partnership Inquiry">Become a Partner</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}
