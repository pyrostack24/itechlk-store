import * as React from 'react'
import { Shield, Lock, Zap, Award, CheckCircle2, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TrustBadge {
  icon: React.ReactNode
  title: string
  description: string
  gradient: string
}

const badges: TrustBadge[] = [
  {
    icon: <Shield className="h-6 w-6" />,
    title: 'Secure Payments',
    description: 'Bank transfer with receipt verification',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    icon: <Lock className="h-6 w-6" />,
    title: 'Data Protection',
    description: 'Your information is safe with us',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: 'Instant Delivery',
    description: 'Get accounts within 5-15 minutes',
    gradient: 'from-yellow-500 to-orange-500'
  },
  {
    icon: <Award className="h-6 w-6" />,
    title: 'Genuine Accounts',
    description: '100% authentic subscriptions',
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    icon: <CheckCircle2 className="h-6 w-6" />,
    title: 'Verified Service',
    description: 'Trusted by 1000+ customers',
    gradient: 'from-indigo-500 to-purple-500'
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: '24/7 Support',
    description: 'WhatsApp support anytime',
    gradient: 'from-rose-500 to-pink-500'
  },
]

export const TrustBadges: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn("py-12 bg-white border-y border-neutral-200", className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center group"
            >
              <div className={`h-14 w-14 rounded-xl bg-gradient-to-br ${badge.gradient} flex items-center justify-center text-white mb-3 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                {badge.icon}
              </div>
              <h3 className="text-sm font-semibold text-neutral-900 mb-1">
                {badge.title}
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                {badge.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
