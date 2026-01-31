const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function addYouTubePremium() {
  try {
    console.log('🚀 Adding YouTube Premium to database...')

    const product = await prisma.product.upsert({
      where: { slug: 'youtube-premium' },
      update: {
        name: 'YouTube Premium',
        description: 'Ad-free YouTube with background play and downloads',
        price: 400,
        duration: 1,
        availableMonths: [1],
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Youtube_logo.png/1200px-Youtube_logo.png',
        category: 'Entertainment',
        features: [
          'Ad-free videos across YouTube',
          'Background play on mobile devices',
          'Download videos for offline viewing',
          'YouTube Music Premium included',
          'Access to YouTube Originals',
          'Picture-in-picture mode',
          'High-quality audio streaming',
          'Support your favorite creators'
        ],
        stock: 100,
        isActive: true,
        isPopular: true,
        requiresAge: false,
      },
      create: {
        name: 'YouTube Premium',
        slug: 'youtube-premium',
        description: 'Ad-free YouTube with background play and downloads',
        price: 400,
        duration: 1,
        availableMonths: [1],
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Youtube_logo.png/1200px-Youtube_logo.png',
        category: 'Entertainment',
        features: [
          'Ad-free videos across YouTube',
          'Background play on mobile devices',
          'Download videos for offline viewing',
          'YouTube Music Premium included',
          'Access to YouTube Originals',
          'Picture-in-picture mode',
          'High-quality audio streaming',
          'Support your favorite creators'
        ],
        stock: 100,
        isActive: true,
        isPopular: true,
        requiresAge: false,
      },
    })

    console.log('✅ YouTube Premium added successfully!')
    console.log('Product ID:', product.id)
    console.log('Product Name:', product.name)
    console.log('Price:', product.price, 'LKR')
    console.log('Stock:', product.stock)
  } catch (error) {
    console.error('❌ Error adding YouTube Premium:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

addYouTubePremium()
