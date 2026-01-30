const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function verifyProducts() {
  console.log('🔍 Verifying products in database...\n')

  try {
    // Get all products
    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        price: true,
        isActive: true,
      },
    })

    console.log(`📊 Total products found: ${products.length}\n`)

    if (products.length === 0) {
      console.log('❌ No products found in database!')
      console.log('   Please run: node prisma/seed.js')
    } else {
      console.log('✅ Products in database:')
      products.forEach((product, index) => {
        console.log(`   ${index + 1}. ${product.name}`)
        console.log(`      - Slug: ${product.slug}`)
        console.log(`      - Price: ${product.price}`)
        console.log(`      - Active: ${product.isActive}`)
        console.log(`      - ID: ${product.id}`)
        console.log('')
      })
    }

    // Test specific slug lookup (the one failing)
    console.log('🔍 Testing specific slug lookup: "picsart"')
    const picsart = await prisma.product.findUnique({
      where: { slug: 'picsart' },
    })

    if (picsart) {
      console.log('✅ Found picsart:', picsart.name)
    } else {
      console.log('❌ Could not find picsart by slug')
    }

    // Test the exact query used in the order route
    console.log('\n🔍 Testing bulk slug lookup (as used in order route)...')
    const testSlugs = ['picsart', 'chatgpt-plus', 'netflix']
    const foundProducts = await prisma.product.findMany({
      where: {
        slug: { in: testSlugs },
      },
    })

    console.log(`   Searched for: ${testSlugs.join(', ')}`)
    console.log(`   Found: ${foundProducts.length} products`)
    foundProducts.forEach(p => {
      console.log(`   - ${p.slug}: ${p.name}`)
    })

  } catch (error) {
    console.error('❌ Error verifying products:', error)
  } finally {
    await prisma.$disconnect()
  }
}

verifyProducts()
