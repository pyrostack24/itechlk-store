const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// Import products from the static file
const products = [
  {
    name: 'Picsart',
    slug: 'picsart',
    price: 500,
    image: 'https://assets.stickpng.com/images/66b0a5ebaa33d8cd18e10c54.png',
    category: 'Design',
    description: 'Professional photo editing with AI-powered tools',
    features: [
      'AI Photo Editor with smart enhancements',
      'One-click background remover',
      '1000+ premium templates',
      'Advanced filters and effects',
    ],
    stock: 50,
    isPopular: false,
    requiresAge: false,
  },
  {
    name: 'ChatGPT Plus',
    slug: 'chatgpt-plus',
    price: 1250,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/1024px-ChatGPT_logo.svg.png',
    category: 'AI',
    description: 'Advanced AI assistant with GPT-4 access',
    features: [
      'GPT-4 access for advanced reasoning',
      'Faster response times',
      'Priority access during peak hours',
      'DALL-E 3 image generation',
    ],
    stock: 100,
    isPopular: true,
    requiresAge: false,
  },
  {
    name: 'Netflix',
    slug: 'netflix',
    price: 1500,
    image: 'https://images.ctfassets.net/y2ske730sjqp/1aONibCke6niZhgPxuiilC/2c401b05a07288746ddf3bd3943fbc76/BrandAssets_Logos_01-Wordmark.jpg',
    category: 'Entertainment',
    description: 'Unlimited movies and TV shows streaming',
    features: [
      '4K Ultra HD streaming quality',
      'Watch on multiple devices simultaneously',
      'Download content for offline viewing',
      'No advertisements',
    ],
    stock: 75,
    isPopular: true,
    requiresAge: false,
  },
  {
    name: 'CapCut Pro',
    slug: 'capcut-pro',
    price: 750,
    image: 'https://cdn.prod.website-files.com/64ea57571d50b02423c4505d/64fb219ade937671b42e011e_capcut%20logo%20png.png',
    category: 'Video',
    description: 'Professional video editing made simple',
    features: [
      'Professional video editing tools',
      'No watermark on exports',
      '1000+ premium templates',
      'AI-powered auto-captions',
    ],
    stock: 60,
    isPopular: false,
    requiresAge: false,
  },
  {
    name: 'Photoshop',
    slug: 'photoshop',
    price: 1299,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Adobe_Photoshop_CC_icon.svg/1200px-Adobe_Photoshop_CC_icon.svg.png',
    category: 'Design',
    description: 'Industry-standard photo editing software',
    features: [
      'Advanced photo editing and retouching',
      'AI-powered Neural Filters',
      'Content-Aware Fill and Remove',
      'Professional color grading',
    ],
    stock: 40,
    isPopular: false,
    requiresAge: false,
  },
  {
    name: 'Gemini Advanced',
    slug: 'gemini-advanced',
    price: 2000,
    image: 'https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg',
    category: 'AI',
    description: 'Google\'s most capable AI assistant',
    features: [
      'Access to Gemini Ultra 1.0',
      'Extended context window (1M tokens)',
      'Multimodal capabilities (text, image, code)',
      'Priority access and faster responses',
    ],
    stock: 30,
    isPopular: false,
    requiresAge: false,
  },
  {
    name: 'Canva Pro',
    slug: 'canva-pro',
    price: 500,
    image: 'https://static.canva.com/web/images/12487a1e0770d29351bd4ce4f87ec8fe.svg',
    category: 'Design',
    description: 'Design anything with ease',
    features: [
      '100+ million premium stock photos, videos, and graphics',
      'Brand Kit with custom fonts and colors',
      'Magic Resize for instant format changes',
      'Background Remover tool',
    ],
    stock: 80,
    isPopular: true,
    requiresAge: false,
  },
  {
    name: 'Pornhub Premium',
    slug: 'premium-adult',
    price: 1999,
    image: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Pornhub-logo.svg',
    category: 'Adult',
    description: 'Pornhub Premium subscription access',
    features: [
      'HD and Full HD streaming',
      'Ad-free experience',
      'Exclusive premium content',
      'Multiple device support',
    ],
    stock: 25,
    isPopular: false,
    requiresAge: true,
  },
  {
    name: 'Windows 11 Pro',
    slug: 'windows-11-pro',
    price: 1200,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Windows_11_logo.svg/2048px-Windows_11_logo.svg.png',
    category: 'Software',
    description: 'Lifetime Windows 11 Pro license',
    features: [
      'Lifetime license activation',
      'BitLocker device encryption',
      'Remote Desktop functionality',
      'Hyper-V virtualization',
    ],
    stock: 100,
    isPopular: true,
    requiresAge: false,
  },
  {
    name: 'Microsoft 365',
    slug: 'microsoft-365',
    price: 1000,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png',
    category: 'Software',
    description: 'Lifetime Microsoft 365 subscription',
    features: [
      'Lifetime subscription access',
      'Word, Excel, PowerPoint, Outlook',
      'OneNote, Publisher, Access',
      '1TB OneDrive cloud storage',
    ],
    stock: 150,
    isPopular: true,
    requiresAge: false,
  },
]

async function syncProducts() {
  console.log('🔄 Starting product sync to database...\n')
  
  let successCount = 0
  let errorCount = 0
  
  for (const product of products) {
    try {
      const result = await prisma.product.upsert({
        where: { slug: product.slug },
        update: {
          name: product.name,
          description: product.description,
          price: product.price,
          duration: 1, // Default 1 month
          image: product.image,
          category: product.category,
          features: product.features,
          stock: product.stock,
          isActive: true,
          isPopular: product.isPopular,
          requiresAge: product.requiresAge,
        },
        create: {
          name: product.name,
          slug: product.slug,
          description: product.description,
          price: product.price,
          duration: 1,
          image: product.image,
          category: product.category,
          features: product.features,
          stock: product.stock,
          isActive: true,
          isPopular: product.isPopular,
          requiresAge: product.requiresAge,
        },
      })
      
      console.log(`✅ Synced: ${product.name} (${product.slug})`)
      successCount++
    } catch (error) {
      console.error(`❌ Error syncing ${product.name}:`, error.message)
      errorCount++
    }
  }
  
  console.log('\n📊 Sync Summary:')
  console.log(`   ✅ Success: ${successCount}`)
  console.log(`   ❌ Errors: ${errorCount}`)
  console.log(`   📦 Total: ${products.length}`)
  
  if (successCount === products.length) {
    console.log('\n🎉 All products synced successfully!')
  }
  
  await prisma.$disconnect()
}

syncProducts()
  .catch((error) => {
    console.error('❌ Fatal error:', error)
    process.exit(1)
  })
