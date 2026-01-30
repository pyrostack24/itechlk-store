'use client'

import * as React from "react"
import { cn } from "@/lib/utils"
import { AlertCircle, CheckCircle2 } from "lucide-react"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
  success?: boolean
  icon?: React.ReactNode
  label?: string
  helperText?: string
  errorText?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, success, icon, label, helperText, errorText, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false)

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            {label}
            {props.required && <span className="text-error-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 transition-colors">
              {icon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              "flex h-12 w-full rounded-xl border-2 bg-white px-4 py-3 text-base text-neutral-900 placeholder:text-neutral-400 transition-all duration-200",
              "focus:outline-none",
              "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-neutral-50",
              "file:border-0 file:bg-transparent file:text-sm file:font-medium",
              icon && "pl-11",
              (error || success) && "pr-11",
              error 
                ? "border-error-500 focus:border-error-500 focus:ring-4 focus:ring-error-500/10" 
                : success
                ? "border-success-500 focus:border-success-500 focus:ring-4 focus:ring-success-500/10"
                : isFocused
                ? "border-primary-500 ring-4 ring-primary-500/10"
                : "border-neutral-300 hover:border-neutral-400",
              className
            )}
            ref={ref}
            onFocus={(e) => {
              setIsFocused(true)
              props.onFocus?.(e)
            }}
            onBlur={(e) => {
              setIsFocused(false)
              props.onBlur?.(e)
            }}
            {...props}
          />
          {error && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-error-500">
              <AlertCircle className="h-5 w-5" />
            </div>
          )}
          {success && !error && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-success-500">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          )}
        </div>
        {(helperText || errorText) && (
          <p className={cn(
            "mt-2 text-sm",
            error ? "text-error-600" : "text-neutral-600"
          )}>
            {error ? errorText : helperText}
          </p>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
