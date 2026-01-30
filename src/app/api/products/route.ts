export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')

    const where: any = {
      isActive: true,
    }

    if (category && category !== 'all') {
      where.category = category
    }

    if (search) {
      where.name = {
        contains: search,
        mode: 'insensitive',
      }
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        reviews: {
          select: {
            rating: true,
          },
        },
      },
      orderBy: [
        { isPopular: 'desc' },
        { name: 'asc' },
      ],
    })

    // Calculate average rating for each product
    const productsWithRatings = products.map((product) => {
      const totalRating = product.reviews.reduce((sum, review) => sum + review.rating, 0)
      const averageRating = product.reviews.length > 0 
        ? totalRating / product.reviews.length 
        : 0

      return {
        ...product,
        rating: averageRating,
        reviewCount: product.reviews.length,
        reviews: undefined, // Remove reviews array from response
      }
    })

    return NextResponse.json({ products: productsWithRatings })
  } catch (error) {
    console.error('Fetch products error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}
