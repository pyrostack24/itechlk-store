const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function makeAdmin() {
  // Get email from command line argument
  const email = process.argv[2]
  
  if (!email) {
    console.error('❌ Please provide an email address')
    console.log('\nUsage: node make-admin.js your-email@example.com')
    process.exit(1)
  }
  
  console.log(`🔍 Looking for user: ${email}`)
  
  try {
    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    })
    
    if (!user) {
      console.error(`❌ User not found: ${email}`)
      console.log('\n💡 Make sure the user has signed in at least once')
      process.exit(1)
    }
    
    // Check if already admin
    if (user.isAdmin) {
      console.log(`✅ User ${email} is already an admin!`)
      process.exit(0)
    }
    
    // Make admin
    await prisma.user.update({
      where: { email },
      data: { isAdmin: true },
    })
    
    console.log(`✅ Successfully made ${email} an admin!`)
    console.log('\n📝 User Details:')
    console.log(`   Name: ${user.name || 'Not set'}`)
    console.log(`   Email: ${user.email}`)
    console.log(`   Admin: Yes`)
    console.log('\n🎉 You can now access the admin panel at /admin')
    
  } catch (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

makeAdmin()
