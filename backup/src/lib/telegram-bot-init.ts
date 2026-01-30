/**
 * Telegram Bot Initialization
 * This file sets up the Telegram bot to handle callback queries
 * Run this separately or import in your server startup
 */

import { setupTelegramBot } from '@/lib/services/telegram'

// Initialize the bot
setupTelegramBot()

console.log('✅ Telegram bot initialized and listening for callbacks')

export {}
