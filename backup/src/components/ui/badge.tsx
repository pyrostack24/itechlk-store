import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'outline' | 'neutral' | 'gradient' | 'glow'
  size?: 'sm' | 'md' | 'lg'
  pulse?: boolean
}

function Badge({ className, variant = 'default', size = 'md', pulse = false, ...props }: BadgeProps) {
  const variants = {
    default: "bg-neutral-100 text-neutral-700 border-neutral-200",
    primary: "bg-primary-100 text-primary-700 border-primary-200",
    secondary: "bg-secondary-100 text-secondary-700 border-secondary-200",
    success: "bg-success-100 text-success-700 border-success-200",
    warning: "bg-warning-100 text-warning-700 border-warning-200",
    error: "bg-error-100 text-error-700 border-error-200",
    outline: "bg-white text-neutral-700 border-neutral-300",
    neutral: "bg-neutral-900 text-white border-neutral-900",
    gradient: "bg-gradient-to-r from-primary-600 to-secondary-600 text-white border-0 shadow-md",
    glow: "bg-primary-600 text-white border-0 shadow-lg shadow-primary-500/50",
  }

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-xs",
    lg: "px-3 py-1.5 text-sm",
  }

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full border font-medium transition-all duration-300",
        variants[variant],
        sizes[size],
        pulse && "animate-pulse-subtle",
        className
      )}
      {...props}
    />
  )
}

export { Badge }
