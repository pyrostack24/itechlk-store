'use client'

import * as React from 'react'
import { MessageCircle, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { config } from '@/lib/config'
import { usePathname } from 'next/navigation'

export const WhatsAppFAB: React.FC = () => {
  const [isVisible, setIsVisible] = React.useState(false)
  const [showTooltip, setShowTooltip] = React.useState(false)
  const pathname = usePathname()

  // Hide on admin pages
  const isAdminPage = pathname?.startsWith('/admin')

  React.useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Show tooltip after 3 seconds
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true)
      setTimeout(() => setShowTooltip(false), 5000)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  // Don't render on admin pages
  if (isAdminPage) return null

  return (
    <>
      {/* WhatsApp FAB */}
      <a
        href={config.contact.whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full bg-[#25D366] text-white shadow-2xl",
          "flex items-center justify-center transition-all duration-300",
          "hover:scale-110 hover:shadow-[0_0_40px_rgba(37,211,102,0.6)] active:scale-95",
          "animate-bounce-slow",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"
        )}
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle className="h-8 w-8" />
        
        {/* Pulse Ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-75" />
      </a>

      {/* Tooltip */}
      {showTooltip && isVisible && (
        <div className="fixed bottom-24 right-6 z-50 animate-fade-in-up">
          <div className="relative bg-white rounded-2xl shadow-2xl p-4 max-w-xs">
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-neutral-900 text-white flex items-center justify-center hover:bg-neutral-700 transition-colors"
            >
              <X className="h-3 w-3" />
            </button>
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0">
                <MessageCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-1">
                  Need Help?
                </h4>
                <p className="text-sm text-neutral-600">
                  Chat with us on WhatsApp for instant support!
                </p>
              </div>
            </div>
            {/* Arrow */}
            <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white transform rotate-45" />
          </div>
        </div>
      )}
    </>
  )
}
