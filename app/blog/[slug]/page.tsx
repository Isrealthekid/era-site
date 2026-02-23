'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import blogsData from '@/data/blogs.json'

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

export default function BlogPostPage() {
  const params = useParams()
  const slug = params?.slug as string
  const post = blogsData.find((p) => p.slug === slug)

  if (!post) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">Post not found</h1>
        <Button asChild>
          <Link href="/blog">Back to Blog</Link>
        </Button>
      </div>
    )
  }

  const relatedPosts = blogsData.filter(
    (p) => p.category === post.category && p.slug !== post.slug
  )

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          {/* Back */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>

          {/* Cover */}
          <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden bg-gray-200 mb-8">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-gray-400">Cover Image</span>
            </div>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[post.category] || 'bg-gray-100 text-gray-700'}`}>
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-sm text-gray-500">
              <Calendar className="h-4 w-4" /> {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1 text-sm text-gray-500">
              <User className="h-4 w-4" /> {post.author}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance leading-tight">
            {post.title}
          </h1>

          {/* Content */}
          <div className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-gray-600 prose-a:text-green-600 prose-strong:text-foreground mb-12">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-12 pt-6 border-t">
              <Tag className="h-4 w-4 text-gray-400" />
              {post.tags.map((tag) => (
                <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Author Card */}
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 mb-12">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="font-bold text-foreground">{post.author}</div>
                <div className="text-sm text-gray-500">ERA Editorial Team</div>
              </div>
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Related Posts</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {relatedPosts.map((rp) => (
                  <Link key={rp.id} href={`/blog/${rp.slug}`} className="block group">
                    <div className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${categoryColors[rp.category] || 'bg-gray-100 text-gray-700'}`}>
                        {rp.category}
                      </span>
                      <h3 className="font-bold text-foreground mt-2 mb-1 group-hover:text-green-600 transition-colors">
                        {rp.title}
                      </h3>
                      <p className="text-sm text-gray-500">{formatDate(rp.date)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </motion.article>
      </div>
    </div>
  )
}
