'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useModal } from '@/contexts/modal-context'

export default function Blog() {
  const { openModal } = useModal()
  
  const posts = [
    {
      title: "The Impact of Professional Training on Career Growth",
      excerpt: "Discover how professional training programs can accelerate your career development and open new opportunities.",
      date: "2024-01-15",
      image: "/placeholder.svg"
    },
    {
      title: "Success Stories: From Training to Employment",
      excerpt: "Read inspiring stories of graduates who transformed their careers through our training programs.",
      date: "2024-01-10",
      image: "/placeholder.svg"
    },
    {
      title: "The Future of Work: Skills That Matter",
      excerpt: "Learn about the most in-demand skills that employers are looking for in today's rapidly evolving job market.",
      date: "2024-01-05",
      image: "/placeholder.svg"
    }
  ]

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">Blog</h1>
        <div className="grid md:grid-cols-[2fr_1fr] gap-12">
          <div className="space-y-12">
            {posts.map((post, i) => (
              <article key={i} className="grid md:grid-cols-[2fr_3fr] gap-8">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={400}
                  height={300}
                  className="rounded-lg object-cover w-full h-48 md:h-full"
                />
                <div>
                  <time className="text-sm text-gray-500">{post.date}</time>
                  <h2 className="text-2xl font-bold mt-2 mb-4">
                    <Link href="#" className="hover:text-green-600" onClick={openModal}>
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <Button 
                    variant="outline"
                    onClick={openModal}
                  >
                    Read More
                  </Button>
                </div>
              </article>
            ))}
          </div>
          <aside>
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h3 className="font-bold text-xl mb-4">Search</h3>
              <div className="flex gap-2">
                <Input placeholder="Search posts..." />
                <Button>Search</Button>
              </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-bold text-xl mb-4">Recent Posts</h3>
              <div className="space-y-4">
                {posts.map((post, i) => (
                  <Link
                    key={i}
                    href="#"
                    className="block hover:text-green-600"
                    onClick={(e) => {
                      e.preventDefault()
                      openModal()
                    }}
                  >
                    {post.title}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

