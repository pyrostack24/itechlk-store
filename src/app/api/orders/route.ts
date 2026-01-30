import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { generateOrderNumber } from '@/lib/utils'
import { sendOrderConfirmation } from '@/lib/services/email'
import { sendOrderNotificationToAdmin } from '@/lib/services/telegram'

export async function POST(request: NextRequest) {
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

    const body = await request.json()
    const { items, customerInfo, paymentReceipt } = body

    // Validate input
    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'No items in order' }, { status: 400 })
    }

    if (!customerInfo?.fullName || !customerInfo?.email || !customerInfo?.whatsappNumber) {
      return NextResponse.json({ error: 'Missing customer information' }, { status: 400 })
    }

    // Calculate total
    const totalAmount = items.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity * item.months,
      0
    )

    // Get products from database to get real ObjectIDs
    const productSlugs = items.map((item: any) => {
      // Map simple IDs to slugs
      const idToSlugMap: Record<string, string> = {
        '1': 'picsart',
        '2': 'chatgpt-plus',
        '3': 'netflix',
        '4': 'capcut-pro',
        '5': 'photoshop',
        '6': 'gemini-advanced',
        '7': 'canva-pro',
        '8': 'premium-adult',
        '9': 'windows-11-pro',
        '10': 'microsoft-365',
      }
      return idToSlugMap[item.id] || item.id
    })

    console.log('🔍 Looking up products with slugs:', productSlugs)

    const dbProducts = await prisma.product.findMany({
      where: {
        slug: { in: productSlugs },
      },
    })

    console.log('📦 Found products:', dbProducts.length, 'out of', productSlugs.length)
    console.log('   Products found:', dbProducts.map(p => p.slug).join(', '))

    // Create a map of slug to product ID
    const slugToIdMap = new Map(dbProducts.map(p => [p.slug, p.id]))

    // Create order
    const order = await prisma.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        userId: user.id,
        totalAmount,
        status: 'PENDING',
        paymentMethod: 'BANK_TRANSFER',
        paymentReceipt,
        items: {
          create: items.map((item: any) => {
            const idToSlugMap: Record<string, string> = {
              '1': 'picsart',
              '2': 'chatgpt-plus',
              '3': 'netflix',
              '4': 'capcut-pro',
              '5': 'photoshop',
              '6': 'gemini-advanced',
              '7': 'canva-pro',
              '8': 'premium-adult',
              '9': 'windows-11-pro',
              '10': 'microsoft-365',
            }
            const slug = idToSlugMap[item.id] || item.id
            const productId = slugToIdMap.get(slug)
            
            if (!productId) {
              throw new Error(`Product not found for slug: ${slug}`)
            }
            
            return {
              productId,
              quantity: item.quantity,
              months: item.months,
              price: item.price,
            }
          }),
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    })

    // Update user profile if needed
    await prisma.user.update({
      where: { id: user.id },
      data: {
        name: customerInfo.fullName,
        whatsappNumber: customerInfo.whatsappNumber,
      },
    })

    // Send email confirmation
    await sendOrderConfirmation(
      customerInfo.email,
      order.orderNumber,
      totalAmount
    )

    // Send Telegram notification to admin
    await sendOrderNotificationToAdmin({
      orderNumber: order.orderNumber,
      customerName: customerInfo.fullName,
      customerEmail: customerInfo.email,
      customerWhatsApp: customerInfo.whatsappNumber,
      products: order.items.map((item) => ({
        name: item.product.name,
        quantity: item.quantity,
        months: item.months,
      })),
      totalAmount,
      paymentReceipt,
    })

    return NextResponse.json({ 
      success: true, 
      orderNumber: order.orderNumber,
      order: {
        id: order.id,
        orderNumber: order.orderNumber,
        status: order.status,
      }
    })
  } catch (error) {
    console.error('Order creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const orders = await prisma.order.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({ orders })
  } catch (error) {
    console.error('Fetch orders error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}
