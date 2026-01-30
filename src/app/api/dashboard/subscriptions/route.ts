export const dynamic = 'force-dynamic'
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

    // Fetch user's subscriptions
    const subscriptions = await prisma.subscription.findMany({
      where: { 
        userId: user.id,
        isActive: true,
      },
      include: {
        product: true,
      },
      orderBy: { endDate: 'asc' },
    })

    // Calculate days left for each subscription
    const now = new Date()
    const transformedSubscriptions = subscriptions.map((sub) => {
      const daysLeft = Math.ceil(
        (sub.endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
      )
      
      return {
        id: sub.id,
        product: sub.product.name,
        productImage: sub.product.image,
        startDate: sub.startDate,
        endDate: sub.endDate,
        isActive: sub.isActive && daysLeft > 0,
        daysLeft: Math.max(0, daysLeft),
        accountDetails: sub.accountDetails,
      }
    })

    return NextResponse.json({ subscriptions: transformedSubscriptions })
  } catch (error) {
    console.error('Error fetching subscriptions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch subscriptions' },
      { status: 500 }
    )
  }
}
