// 'use client'

// import { motion, AnimatePresence } from 'framer-motion'
// import { X } from 'lucide-react'
// import { Button } from "@/components/ui/button"
// import { useModal } from '@/contexts/modal-context'

// export function ComingSoonModal() {
//   const { isOpen, closeModal } = useModal()

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           {/* Backdrop */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={closeModal}
//             className="fixed inset-0 bg-black/50 z-50"
//           />

//           {/* Modal */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95, y: 20 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.95, y: 20 }}
//             transition={{ type: "spring", duration: 0.5 }}
//             className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
//           >
//             <div className="bg-white rounded-lg shadow-xl overflow-hidden">
//               {/* Close Button */}
//               <button
//                 onClick={closeModal}
//                 className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition-colors"
//               >
//                 <X className="w-5 h-5" />
//               </button>

//               {/* Content */}
//               <div className="p-6 pt-12 text-center">
//                 <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
//                   <svg
//                     className="w-8 h-8 text-green-600"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M12 6v6m0 0v6m0-6h6m-6 0H6"
//                     />
//                   </svg>
//                 </div>
//                 <h3 className="text-2xl font-bold mb-4">Coming Soon!</h3>
//                 <p className="text-gray-600 mb-8">
//                   We're working hard to bring you something amazing. 
//                   Stay tuned for updates!
//                 </p>
//                 <div className="flex justify-center gap-4">
//                   <Button
//                     onClick={closeModal}
//                     className="bg-green-600 hover:bg-green-700"
//                   >
//                     Got it
//                   </Button>
//                   <Button
//                     variant="outline"
//                     onClick={closeModal}
//                   >
//                     Remind me later
//                   </Button>
//                 </div>
//               </div>

//               {/* Newsletter Signup */}
//               <div className="bg-gray-50 p-6 border-t">
//                 <p className="text-sm text-gray-600 text-center mb-4">
//                   Want to be notified when we launch?
//                 </p>
//                 <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
//                   <input
//                     type="email"
//                     placeholder="Enter your email"
//                     className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
//                   />
//                   <Button type="submit" className="bg-green-600 hover:bg-green-700">
//                     Notify me
//                   </Button>
//                 </form>
//               </div>
//             </div>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   )
// }

'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useModal } from '@/contexts/modal-context'
// import { useToast } from "@/components/ui/use-toast"
import { useToast } from "@/hooks/use-toast"


export function ComingSoonModal() {
  const { isOpen, closeModal } = useModal()
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, formType: 'modal' }),
      })

      if (response.ok) {
        toast({
          title: "Success!",
          description: "You've been added to our notification list.",
        })
        setEmail('')
      } else {
        throw new Error('Failed to submit form')
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem submitting your email. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
          >
            <div className="bg-white rounded-lg shadow-xl overflow-hidden w-full max-w-md max-h-[90vh] flex flex-col">
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Content */}
              <div className="p-6 pt-12 text-center overflow-y-auto flex-grow">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">Coming Soon!</h3>
                <p className="text-gray-600 mb-8">
                  We're working hard to bring you something amazing. 
                  Stay tuned for updates!
                </p>
                <div className="flex justify-center gap-4">
                  <Button
                    onClick={closeModal}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Got it
                  </Button>
                  <Button
                    variant="outline"
                    onClick={closeModal}
                  >
                    Remind me later
                  </Button>
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-gray-50 p-6 border-t">
                <p className="text-sm text-gray-600 text-center mb-4">
                  Want to be notified when we launch?
                </p>
                <form className="flex gap-2" onSubmit={handleSubmit}>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                    aria-label="Email for notifications"
                  />
                  <Button 
                    type="submit" 
                    className="bg-green-600 hover:bg-green-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Notify me'}
                  </Button>
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

