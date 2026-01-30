'use client'

import * as React from 'react'
import { ArrowUp } from 'lucide-react'
import { cn } from '@/lib/utils'

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-6 left-6 z-50 h-12 w-12 rounded-full",
        "bg-neutral-900 text-white shadow-xl",
        "flex items-center justify-center transition-all duration-300",
        "hover:bg-neutral-800 hover:scale-110 hover:shadow-2xl active:scale-95",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"
      )}
      aria-label="Back to top"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  )
}
