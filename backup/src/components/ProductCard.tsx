'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Star, TrendingUp, ArrowRight, Heart } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ProductCardProps {
  name: string
  price: number
  image: string
  description: string
  category: string
  popular?: boolean
  rating?: number
  reviews?: number
  inStock?: boolean
  discount?: number
  className?: string
  href?: string
}

export const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  image,
  description,
  category,
  popular = false,
  rating = 4.8,
  reviews = 120,
  inStock = true,
  discount,
  className,
  href = '/products',
}) => {
  const [isHovered, setIsHovered] = React.useState(false)
  const [isFavorite, setIsFavorite] = React.useState(false)

  const discountedPrice = discount ? price - (price * discount) / 100 : price

  return (
    <Card
      variant="elevated"
      className={cn(
        "group relative overflow-hidden transition-all duration-500",
        isHovered && "shadow-2xl -translate-y-2",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      hover={false}
    >
      {/* Badges */}
      <div className="absolute top-2 left-2 right-2 sm:top-4 sm:left-4 sm:right-4 z-10 flex items-start justify-between">
        <div className="flex flex-col gap-1 sm:gap-2">
          {popular && (
            <Badge className="bg-neutral-900 text-white shadow-lg text-[10px] sm:text-xs px-1.5 py-0.5 sm:px-2 sm:py-1">
              <TrendingUp className="h-2 w-2 sm:h-3 sm:w-3 mr-0.5 sm:mr-1" />
              <span className="hidden sm:inline">Popular</span>
              <span className="sm:hidden">Pop</span>
            </Badge>
          )}
          {discount && (
            <Badge className="bg-error-500 text-white shadow-lg text-[10px] sm:text-xs px-1.5 py-0.5 sm:px-2 sm:py-1">
              -{discount}% OFF
            </Badge>
          )}
          {!inStock && (
            <Badge variant="secondary" className="bg-neutral-500 text-white text-[10px] sm:text-xs px-1.5 py-0.5 sm:px-2 sm:py-1">
              Out of Stock
            </Badge>
          )}
        </div>
        
        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.preventDefault()
            setIsFavorite(!isFavorite)
          }}
          className={cn(
            "h-7 w-7 sm:h-10 sm:w-10 rounded-full bg-white shadow-lg flex items-center justify-center transition-all duration-300",
            "hover:scale-110 active:scale-95",
            isFavorite ? "text-error-500" : "text-neutral-400"
          )}
        >
          <Heart className={cn("h-3 w-3 sm:h-5 sm:w-5", isFavorite && "fill-current")} />
        </button>
      </div>

      {/* Image Container */}
      <div className="relative h-32 sm:h-40 lg:h-56 bg-gradient-to-br from-neutral-50 to-neutral-100 overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className={cn(
            "object-contain p-4 sm:p-6 lg:p-8 transition-all duration-500",
            isHovered && "scale-110"
          )}
        />
      </div>

      <CardHeader className="pb-2 sm:pb-3 px-3 sm:px-6">
        {/* Category */}
        <div className="text-[9px] sm:text-xs font-medium text-neutral-600 uppercase tracking-wider mb-0.5 sm:mb-1">
          {category}
        </div>
        
        {/* Title */}
        <CardTitle className="text-xs sm:text-base lg:text-xl group-hover:text-neutral-700 transition-colors line-clamp-2">
          {name}
        </CardTitle>
        
        {/* Description */}
        <CardDescription className="line-clamp-1 sm:line-clamp-2 text-[10px] sm:text-sm hidden sm:block">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pb-2 sm:pb-3 px-3 sm:px-6">
        {/* Rating */}
        <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3">
          <div className="flex items-center gap-0.5 sm:gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-2.5 w-2.5 sm:h-4 sm:w-4",
                  i < Math.floor(rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-neutral-300"
                )}
              />
            ))}
          </div>
          <span className="text-[10px] sm:text-sm font-medium text-neutral-700">{rating}</span>
          <span className="text-[10px] sm:text-sm text-neutral-400 hidden sm:inline">({reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-1 sm:gap-2">
          {discount ? (
            <>
              <div className="text-base sm:text-2xl lg:text-3xl font-bold text-neutral-900">
                LKR {discountedPrice.toLocaleString()}
              </div>
              <div className="text-xs sm:text-lg text-neutral-400 line-through hidden sm:block">
                LKR {price.toLocaleString()}
              </div>
            </>
          ) : (
            <div className="text-base sm:text-2xl lg:text-3xl font-bold text-neutral-900">
              LKR {price.toLocaleString()}
            </div>
          )}
        </div>
        <div className="text-[10px] sm:text-sm text-neutral-500 mt-0.5 sm:mt-1">per month</div>
      </CardContent>

      <CardFooter className="pt-0 pb-2 sm:pb-6 px-3 sm:px-6">
        <Link href={href} className="w-full">
          <Button
            variant="primary"
            className="w-full group-hover:shadow-xl transition-all text-[10px] sm:text-sm h-7 sm:h-10"
            disabled={!inStock}
          >
            {inStock ? (
              <>
                <span className="hidden sm:inline">Get Started</span>
                <span className="sm:hidden">Buy</span>
                <ArrowRight className="h-2.5 w-2.5 sm:h-4 sm:w-4 ml-1 sm:ml-2 group-hover:translate-x-1 transition-transform" />
              </>
            ) : (
              'Out of Stock'
            )}
          </Button>
        </Link>
      </CardFooter>

      {/* Shine Effect on Hover */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent",
          "transition-all duration-700 pointer-events-none",
          isHovered ? "translate-x-full" : "-translate-x-full"
        )}
      />
    </Card>
  )
}
