'use client'

import { motion } from 'framer-motion'

export function FadeIn({ 
  children, 
  delay = 0,
  direction = null 
}: { 
  children: React.ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | null
}) {
  const getDirectionVariants = () => {
    switch (direction) {
      case 'up':
        return { y: 40 }
      case 'down':
        return { y: -40 }
      case 'left':
        return { x: 40 }
      case 'right':
        return { x: -40 }
      default:
        return {}
    }
  }

  return (
    <motion.div
      initial={{ 
        opacity: 0,
        ...getDirectionVariants()
      }}
      animate={{ 
        opacity: 1,
        x: 0,
        y: 0
      }}
      transition={{
        duration: 0.5,
        delay,
        ease: 'easeOut'
      }}
    >
      {children}
    </motion.div>
  )
}

