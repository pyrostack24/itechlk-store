import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

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

    const productWithRating = {
      ...product,
      rating: averageRating,
      reviewCount: product.reviews.length,
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
