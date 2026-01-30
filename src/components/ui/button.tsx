import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'success' | 'gradient' | 'shine'
  size?: 'sm' | 'default' | 'lg' | 'xl' | 'icon'
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', isLoading, leftIcon, rightIcon, children, disabled, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97] relative overflow-hidden group"
    
    const variants = {
      default: "bg-neutral-900 text-white hover:bg-neutral-800 shadow-sm hover:shadow-lg",
      primary: "bg-gradient-to-r from-secondary-600 to-accent-600 text-white hover:from-secondary-700 hover:to-accent-700 shadow-md hover:shadow-xl hover:shadow-secondary-500/30 hover:-translate-y-0.5",
      secondary: "bg-gradient-to-r from-accent-600 to-secondary-500 text-white hover:from-accent-700 hover:to-secondary-600 shadow-md hover:shadow-xl hover:shadow-accent-500/30 hover:-translate-y-0.5",
      outline: "border-2 border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-50 hover:border-secondary-500 hover:text-secondary-600 hover:shadow-md",
      ghost: "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900",
      destructive: "bg-error-500 text-white hover:bg-error-600 shadow-md hover:shadow-xl hover:shadow-error-500/30 hover:-translate-y-0.5",
      success: "bg-success-500 text-white hover:bg-success-600 shadow-md hover:shadow-xl hover:shadow-success-500/30 hover:-translate-y-0.5",
      gradient: "bg-gradient-to-r from-secondary-600 via-accent-600 to-secondary-500 text-white shadow-lg hover:shadow-2xl hover:shadow-secondary-500/40 hover:-translate-y-1 animate-gradient bg-[length:200%_auto]",
      shine: "bg-gradient-to-r from-secondary-600 to-accent-600 text-white shadow-lg hover:shadow-2xl relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700",
    }
    
    const sizes = {
      sm: "h-9 px-4 text-sm",
      default: "h-11 px-6 text-base",
      lg: "h-12 px-8 text-lg",
      xl: "h-14 px-10 text-lg font-semibold",
      icon: "h-11 w-11",
    }

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Loading...</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="transition-transform group-hover:scale-110">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="transition-transform group-hover:translate-x-1">{rightIcon}</span>}
          </>
        )}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button }
