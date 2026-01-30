import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Fetch statistics
    const [totalOrders, activeSubscriptions, totalSpent] = await Promise.all([
      prisma.order.count({
        where: { userId: user.id },
      }),
      prisma.subscription.count({
        where: { 
          userId: user.id,
          isActive: true,
          endDate: { gte: new Date() },
        },
      }),
      prisma.order.aggregate({
        where: { 
          userId: user.id,
          status: { in: ['COMPLETED', 'PROCESSING'] },
        },
        _sum: {
          totalAmount: true,
        },
      }),
    ])

    return NextResponse.json({
      stats: {
        totalOrders,
        activeSubscriptions,
        totalSpent: totalSpent._sum.totalAmount || 0,
        loyaltyPoints: user.loyaltyPoints,
      },
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    )
  }
}
