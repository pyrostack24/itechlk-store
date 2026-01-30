'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Mail, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export const Newsletter: React.FC<{ className?: string }> = ({ className }) => {
  const [email, setEmail] = React.useState('')
  const [isSubmitted, setIsSubmitted] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsLoading(false)
    setIsSubmitted(true)
    setEmail('')
    
    // Reset after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  return (
    <section className={cn("py-20 bg-gradient-to-r from-primary-600 to-secondary-600 relative overflow-hidden", className)}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.3),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.3),transparent_50%)]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-sm mb-6 animate-bounce-slow">
            <Mail className="h-8 w-8 text-white" />
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Get Exclusive Deals & Updates
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and be the first to know about special offers, new products, and exclusive discounts!
          </p>

          {/* Form */}
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 h-14 px-6 rounded-xl bg-white/95 backdrop-blur-sm text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
              />
              <Button
                type="submit"
                size="lg"
                isLoading={isLoading}
                className="bg-white text-primary-600 hover:bg-neutral-50 shadow-xl hover:shadow-2xl font-semibold"
              >
                Subscribe
              </Button>
            </form>
          ) : (
            <div className="flex items-center justify-center gap-3 h-14 px-6 rounded-xl bg-white/95 backdrop-blur-sm max-w-md mx-auto animate-scale-in">
              <CheckCircle2 className="h-6 w-6 text-success-600" />
              <span className="text-neutral-900 font-medium">
                Thanks for subscribing!
              </span>
            </div>
          )}

          {/* Privacy Note */}
          <p className="text-sm text-white/70 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  )
}
