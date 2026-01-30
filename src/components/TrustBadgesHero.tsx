'use client'

import { Shield, Zap, Award, Users, CheckCircle2, Star, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TrustBadge {
  icon: React.ReactNode
  text: string
  subtext?: string
  variant?: 'default' | 'success' | 'primary' | 'warning'
}

interface TrustBadgesHeroProps {
  className?: string
  variant?: 'compact' | 'detailed'
}

export default function TrustBadgesHero({ 
  className,
  variant = 'compact' 
}: TrustBadgesHeroProps) {
  const badges: TrustBadge[] = [
    {
      icon: <Users className="h-4 w-4 sm:h-5 sm:w-5" />,
      text: '1000+',
      subtext: 'Happy Customers',
      variant: 'primary'
    },
    {
      icon: <Shield className="h-4 w-4 sm:h-5 sm:w-5" />,
      text: 'Secure',
      subtext: 'Payment',
      variant: 'success'
    },
    {
      icon: <Zap className="h-4 w-4 sm:h-5 sm:w-5" />,
      text: '15 Min',
      subtext: 'Fast Delivery',
      variant: 'warning'
    },
    {
      icon: <Award className="h-4 w-4 sm:h-5 sm:w-5" />,
      text: 'Best Price',
      subtext: 'Guarantee',
      variant: 'primary'
    },
  ]

  const variantStyles = {
    default: 'bg-white/80 backdrop-blur-sm border-neutral-200',
    success: 'bg-success-50/80 backdrop-blur-sm border-success-200',
    primary: 'bg-primary-50/80 backdrop-blur-sm border-primary-200',
    warning: 'bg-warning-50/80 backdrop-blur-sm border-warning-200',
  }

  const iconStyles = {
    default: 'text-neutral-600',
    success: 'text-success-600',
    primary: 'text-primary-600',
    warning: 'text-warning-600',
  }

  if (variant === 'compact') {
    return (
      <div className={cn("flex flex-wrap items-center justify-center gap-3 sm:gap-4", className)}>
        {badges.map((badge, index) => (
          <div
            key={index}
            className={cn(
              "inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl border-2 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5",
              variantStyles[badge.variant || 'default']
            )}
          >
            <div className={cn("flex-shrink-0", iconStyles[badge.variant || 'default'])}>
              {badge.icon}
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-1.5">
              <span className="text-sm sm:text-base font-bold text-neutral-900">
                {badge.text}
              </span>
              {badge.subtext && (
                <span className="text-xs sm:text-sm text-neutral-600 font-medium">
                  {badge.subtext}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Detailed variant
  return (
    <div className={cn("grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4", className)}>
      {badges.map((badge, index) => (
        <div
          key={index}
          className={cn(
            "flex flex-col items-center text-center p-4 sm:p-6 rounded-2xl border-2 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group",
            variantStyles[badge.variant || 'default']
          )}
        >
          <div className={cn(
            "h-12 w-12 sm:h-14 sm:w-14 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform",
            badge.variant === 'success' && 'bg-success-100',
            badge.variant === 'primary' && 'bg-primary-100',
            badge.variant === 'warning' && 'bg-warning-100',
            badge.variant === 'default' && 'bg-neutral-100'
          )}>
            <div className={iconStyles[badge.variant || 'default']}>
              {badge.icon}
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-neutral-900 mb-1">
            {badge.text}
          </div>
          {badge.subtext && (
            <div className="text-xs sm:text-sm text-neutral-600 font-medium">
              {badge.subtext}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

// Additional component for verification badges
export function VerificationBadges({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center justify-center gap-3 sm:gap-4", className)}>
      {/* Verified Seller */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success-50 border-2 border-success-200 shadow-sm">
        <CheckCircle2 className="h-4 w-4 text-success-600" />
        <span className="text-sm font-semibold text-success-900">Verified Seller</span>
      </div>

      {/* Money Back Guarantee */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border-2 border-primary-200 shadow-sm">
        <Shield className="h-4 w-4 text-primary-600" />
        <span className="text-sm font-semibold text-primary-900">Money-Back Guarantee</span>
      </div>

      {/* Top Rated */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-warning-50 border-2 border-warning-200 shadow-sm">
        <Star className="h-4 w-4 text-warning-600 fill-warning-600" />
        <span className="text-sm font-semibold text-warning-900">4.9/5 Rating</span>
      </div>

      {/* Trending */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-50 border-2 border-secondary-200 shadow-sm">
        <TrendingUp className="h-4 w-4 text-secondary-600" />
        <span className="text-sm font-semibold text-secondary-900">Trending Store</span>
      </div>
    </div>
  )
}

// Payment security badges
export function PaymentSecurityBadges({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center justify-center gap-4 sm:gap-6", className)}>
      <div className="text-center">
        <div className="text-xs sm:text-sm text-neutral-600 mb-2 font-medium">We Accept</div>
        <div className="flex items-center gap-3">
          {/* Bank logos - you can replace with actual logos */}
          <div className="h-8 sm:h-10 px-3 sm:px-4 rounded-lg bg-white border-2 border-neutral-200 flex items-center justify-center shadow-sm">
            <span className="text-xs sm:text-sm font-bold text-neutral-700">Commercial Bank</span>
          </div>
          <div className="h-8 sm:h-10 px-3 sm:px-4 rounded-lg bg-white border-2 border-neutral-200 flex items-center justify-center shadow-sm">
            <span className="text-xs sm:text-sm font-bold text-neutral-700">BOC</span>
          </div>
        </div>
      </div>
      
      <div className="h-8 w-px bg-neutral-300 hidden sm:block" />
      
      <div className="flex items-center gap-2 text-success-600">
        <Shield className="h-5 w-5" />
        <span className="text-xs sm:text-sm font-semibold">Secure Payment</span>
      </div>
    </div>
  )
}
