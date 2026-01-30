import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  console.log('📥 Approve API called')
  
  try {
    const body = await request.json()
    console.log('📦 Request body:', body)
    
    const { orderNumber, action } = body

    if (!orderNumber || !action) {
      console.error('❌ Missing orderNumber or action')
      return NextResponse.json(
        { success: false, error: 'Missing orderNumber or action' },
        { status: 400 }
      )
    }

    console.log(`🔍 Finding order: ${orderNumber}`)
    
    // Find the order
    const order = await prisma.order.findUnique({
      where: { orderNumber },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        user: true,
      },
    })

    if (!order) {
      console.error(`❌ Order not found: ${orderNumber}`)
      return NextResponse.json(
        { success: false, error: 'Order not found' }, 
        { status: 404 }
      )
    }

    console.log(`✅ Order found: ${order.id}, Status: ${order.status}`)

    if (action === 'approve') {
      console.log('✅ Approving order...')
      
      // Update order status to COMPLETED
      await prisma.order.update({
        where: { orderNumber },
        data: {
          status: 'COMPLETED',
          verifiedAt: new Date(),
        },
      })

      console.log('📝 Creating subscriptions...')
      
      // Create subscriptions for each item
      const subscriptions = []
      for (const item of order.items) {
        const startDate = new Date()
        const endDate = new Date()
        endDate.setMonth(endDate.getMonth() + item.months)

        const subscription = await prisma.subscription.create({
          data: {
            userId: order.userId,
            productId: item.productId,
            orderId: order.id,
            startDate,
            endDate,
            isActive: true,
          },
        })
        subscriptions.push(subscription)
        console.log(`✅ Created subscription ${subscription.id} for product ${item.productId}`)
      }

      console.log(`✅ Order approved successfully. Created ${subscriptions.length} subscriptions`)

      return NextResponse.json({
        success: true,
        message: 'Order approved and subscriptions created',
        order: {
          orderNumber: order.orderNumber,
          status: 'COMPLETED',
        },
        subscriptions: subscriptions.length,
      })
    } else if (action === 'reject') {
      console.log('❌ Rejecting order...')
      
      // Update order status to CANCELLED
      await prisma.order.update({
        where: { orderNumber },
        data: {
          status: 'CANCELLED',
        },
      })

      console.log('✅ Order rejected successfully')

      return NextResponse.json({
        success: true,
        message: 'Order rejected',
        order: {
          orderNumber: order.orderNumber,
          status: 'CANCELLED',
        },
      })
    }

    console.error(`❌ Invalid action: ${action}`)
    return NextResponse.json(
      { success: false, error: 'Invalid action' }, 
      { status: 400 }
    )
  } catch (error) {
    console.error('❌ Order approval error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to process order' 
      },
      { status: 500 }
    )
  }
}
