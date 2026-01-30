/**
 * Next.js Instrumentation Hook
 * This file is automatically called when the server starts
 * Perfect for initializing server-side services like Telegram bot
 */

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Only run on Node.js runtime (server-side)
    const { setupTelegramBot } = await import('@/lib/services/telegram')
    
    // Initialize Telegram bot to listen for callback queries
    setupTelegramBot()
    
    console.log('✅ Telegram bot initialized and listening for callbacks')
  }
}
