'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      message: formData.get('message') as string,
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        toast.success("Your message has been sent successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
        ;(event.target as HTMLFormElement).reset()
      } else {
        throw new Error(result.error || 'Failed to submit')
      }
    } catch {
      toast.error("There was a problem sending your message. Please email us directly at info@era.com.ng", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <Input name="name" placeholder="Full Name" required aria-label="Full Name" />
          <Input name="email" type="email" placeholder="Email Address" required aria-label="Email Address" />
        </div>
        <Input name="phone" type="tel" placeholder="Phone Number" aria-label="Phone Number" />
        <Textarea name="message" placeholder="Your Message" className="h-32" required aria-label="Your Message" />
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
          <Button
            asChild
            variant="outline"
          >
            <a href="mailto:info@era.com.ng">Email Us Directly</a>
          </Button>
        </div>
      </form>
      <ToastContainer />
    </>
  )
}
