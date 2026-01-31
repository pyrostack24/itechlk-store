export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { products as staticProducts } from '@/lib/products'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { 
        slug: params.slug,
        isActive: true 
      },
      include: {
        reviews: {
          select: {
            rating: true,
            comment: true,
            user: {
              select: {
                name: true,
                image: true,
              },
            },
            createdAt: true,
          },
        },
      },
    })

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    // Calculate average rating
    const totalRating = product.reviews.reduce((sum, review) => sum + review.rating, 0)
    const averageRating = product.reviews.length > 0 
      ? totalRating / product.reviews.length 
      : 0

    // Find static product to get default rating if no reviews exist
    const staticProduct = staticProducts.find(p => p.slug === params.slug)
    const finalRating = averageRating > 0 ? averageRating : (staticProduct?.rating || 0)
    const finalReviewCount = product.reviews.length > 0 ? product.reviews.length : (staticProduct?.reviews || 0)

    const productWithRating = {
      ...product,
      rating: finalRating,
      reviewCount: finalReviewCount,
    }

    return NextResponse.json({ product: productWithRating })
  } catch (error) {
    console.error('Fetch product error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    )
  }
}
