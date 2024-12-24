'use client'

import { useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export function CountUp({ 
  end, 
  duration = 2,
  suffix = ''
}: { 
  end: number
  duration?: number
  suffix?: string
}) {
  const [count, setCount] = useState(0)
  const controls = useAnimation()
  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView) {
      let startTime: number
      let animationFrame: number

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = timestamp - startTime

        const percentage = Math.min(progress / (duration * 1000), 1)
        setCount(Math.floor(end * percentage))

        if (progress < duration * 1000) {
          animationFrame = requestAnimationFrame(animate)
        }
      }

      animationFrame = requestAnimationFrame(animate)
      return () => cancelAnimationFrame(animationFrame)
    }
  }, [inView, end, duration])

  return (
    <motion.div ref={ref} className="font-bold">
      {count}{suffix}
    </motion.div>
  )
}

