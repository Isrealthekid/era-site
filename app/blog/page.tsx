'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Calendar, User } from 'lucide-react'
import blogsData from '@/data/blogs.json'

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

const categoryColors: Record<string, string> = {
  Career: 'bg-blue-100 text-blue-700',
  Skills: 'bg-green-100 text-green-700',
  Engineering: 'bg-orange-100 text-orange-700',
  News: 'bg-purple-100 text-purple-700',
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-NG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function BlogPage() {
  const posts = blogsData
  const featured = posts[0]
  const rest = posts.slice(1)

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-foreground mb-4">Blog</h1>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Insights, tips, and stories to help you grow your engineering career.
          </p>
        </motion.div>

        {/* Featured Post */}
        {featured && (
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            className="mb-12"
          >
            <Link href={`/blog/${featured.slug}`} className="block group">
              <div className="grid md:grid-cols-2 gap-8 bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100">
                <div className="relative h-64 md:h-auto bg-gray-200">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-gray-400">Cover Image</span>
                  </div>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full w-fit mb-4 ${categoryColors[featured.category] || 'bg-gray-100 text-gray-700'}`}>
                    {featured.category}
                  </span>
                  <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-3 group-hover:text-green-600 transition-colors text-balance">
                    {featured.title}
                  </h2>
                  <p className="text-gray-600 mb-4 leading-relaxed">{featured.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <User className="h-4 w-4" /> {featured.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" /> {formatDate(featured.date)}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Blog Grid */}
        {rest.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {rest.map((post) => (
              <motion.div
                key={post.id}
                variants={itemVariants}
                whileHover={{ y: -4 }}
              >
                <Link href={`/blog/${post.slug}`} className="block group h-full">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 h-full flex flex-col">
                    <div className="relative h-48 bg-gray-200">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-gray-400 text-sm">Cover Image</span>
                      </div>
                      <div className="absolute top-3 left-3">
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[post.category] || 'bg-gray-100 text-gray-700'}`}>
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-bold text-lg text-foreground mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-1">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{post.author}</span>
                        <span>{formatDate(post.date)}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

        {posts.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            <p className="text-lg">No blog posts yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  )
}
