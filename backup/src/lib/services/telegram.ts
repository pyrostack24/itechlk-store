import TelegramBot from 'node-telegram-bot-api'

let bot: TelegramBot | null = null

if (process.env.TELEGRAM_BOT_TOKEN) {
  bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { 
    polling: true
  })
}

interface OrderNotification {
  orderNumber: string
  customerName: string
  customerEmail: string
  customerWhatsApp: string
  products: Array<{ name: string; quantity: number; months: number }>
  totalAmount: number
  paymentReceipt?: string
}

export async function sendOrderNotificationToAdmin(data: OrderNotification) {
  if (!bot || !process.env.TELEGRAM_ADMIN_CHAT_ID) {
    console.warn('Telegram bot not configured')
    return { success: false }
  }

  const productsText = data.products
    .map((p) => `  • ${p.name} x${p.quantity} (${p.months} month${p.months > 1 ? 's' : ''})`)
    .join('\n')

  const message = `
🔔 *NEW ORDER RECEIVED*

📋 *Order Details:*
Order Number: \`${data.orderNumber}\`
Total Amount: *LKR ${data.totalAmount.toFixed(2)}*

👤 *Customer Information:*
Name: ${data.customerName}
Email: ${data.customerEmail}
WhatsApp: [Contact Customer](https://wa.me/${data.customerWhatsApp.replace(/[^0-9]/g, '')})

🛍️ *Products:*
${productsText}

${data.paymentReceipt ? '📎 Payment receipt attached below' : '⏳ Waiting for payment receipt'}

*Action Required:* Verify payment and approve order
  `

  try {
    const keyboard = {
      inline_keyboard: [
        [
          { text: '✅ Approve Order', callback_data: `approve_${data.orderNumber}` },
          { text: '❌ Reject Order', callback_data: `reject_${data.orderNumber}` },
        ],
        [
          { text: '💬 Contact Customer', url: `https://wa.me/${data.customerWhatsApp.replace(/[^0-9]/g, '')}` },
        ],
      ],
    }

    // If payment receipt exists, send it with the message as caption
    if (data.paymentReceipt && data.paymentReceipt.startsWith('http')) {
      await bot.sendPhoto(process.env.TELEGRAM_ADMIN_CHAT_ID, data.paymentReceipt, {
        caption: message,
        parse_mode: 'Markdown',
        reply_markup: keyboard,
      })
    } else {
      // If no receipt, send text message only
      await bot.sendMessage(process.env.TELEGRAM_ADMIN_CHAT_ID, message, {
        parse_mode: 'Markdown',
        reply_markup: keyboard,
      })
    }

    return { success: true }
  } catch (error) {
    console.error('Telegram notification error:', error)
    return { success: false, error }
  }
}

export async function sendOrderApprovalNotification(
  orderNumber: string,
  status: 'approved' | 'rejected'
) {
  if (!bot || !process.env.TELEGRAM_ADMIN_CHAT_ID) {
    return { success: false }
  }

  const message =
    status === 'approved'
      ? `✅ Order ${orderNumber} has been approved and customer notified.`
      : `❌ Order ${orderNumber} has been rejected.`

  try {
    await bot.sendMessage(process.env.TELEGRAM_ADMIN_CHAT_ID, message)
    return { success: true }
  } catch (error) {
    console.error('Telegram notification error:', error)
    return { success: false, error }
  }
}

// Setup callback query handler for admin actions
export function setupTelegramBot() {
  if (!bot) {
    console.warn('⚠️ Telegram bot not initialized - bot token missing')
    return
  }

  console.log('🤖 Setting up Telegram bot callback handlers...')

  bot.on('callback_query', async (query) => {
    console.log('📥 Received callback query:', query.data)
    
    const data = query.data
    if (!data) {
      console.warn('⚠️ No data in callback query')
      return
    }

    const [action, orderNumber] = data.split('_')
    console.log(`🔄 Processing ${action} for order ${orderNumber}`)

    if (action === 'approve' || action === 'reject') {
      try {
        // Answer callback query immediately to remove loading state
        await bot?.answerCallbackQuery(query.id, {
          text: `Processing ${action}...`,
        })

        // Call API to update order status and create subscriptions
        const apiUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001'
        console.log(`🌐 Calling API: ${apiUrl}/api/orders/approve`)
        
        const response = await fetch(`${apiUrl}/api/orders/approve`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            orderNumber,
            action,
          }),
        })

        console.log(`📡 API Response status: ${response.status}`)
        const result = await response.json()
        console.log('📦 API Result:', result)

        if (result.success) {
          // Send success notification
          const statusEmoji = action === 'approve' ? '✅' : '❌'
          const statusText = action === 'approve' ? 'APPROVED' : 'REJECTED'
          const successMessage = action === 'approve' 
            ? `✅ Order ${orderNumber} approved! Subscriptions created.`
            : `❌ Order ${orderNumber} rejected.`

          // Try to edit the message
          try {
            if (query.message?.caption) {
              // If message has caption (photo message)
              await bot?.editMessageCaption(
                `${query.message.caption}\n\n${statusEmoji} *Status: ${statusText}*`,
                {
                  chat_id: query.message.chat.id,
                  message_id: query.message.message_id,
                  parse_mode: 'Markdown',
                  reply_markup: { inline_keyboard: [] },
                }
              )
            } else if (query.message?.text) {
              // If message has text (text message)
              await bot?.editMessageText(
                `${query.message.text}\n\n${statusEmoji} *Status: ${statusText}*`,
                {
                  chat_id: query.message.chat.id,
                  message_id: query.message.message_id,
                  parse_mode: 'Markdown',
                  reply_markup: { inline_keyboard: [] },
                }
              )
            }
          } catch (editError) {
            console.error('⚠️ Could not edit message:', editError)
            // If editing fails, send a new message
            await bot?.sendMessage(query.message?.chat.id || process.env.TELEGRAM_ADMIN_CHAT_ID!, successMessage)
          }

          console.log(`✅ Successfully processed ${action} for order ${orderNumber}`)
        } else {
          console.error('❌ API returned error:', result.error)
          await bot?.sendMessage(
            query.message?.chat.id || process.env.TELEGRAM_ADMIN_CHAT_ID!,
            `❌ Failed to ${action} order ${orderNumber}: ${result.error || 'Unknown error'}`
          )
        }
      } catch (error) {
        console.error('❌ Error processing order action:', error)
        await bot?.sendMessage(
          query.message?.chat.id || process.env.TELEGRAM_ADMIN_CHAT_ID!,
          `❌ Error processing order ${orderNumber}: ${error instanceof Error ? error.message : 'Unknown error'}`
        )
      }
    }
  })

  console.log('✅ Telegram bot callback handlers ready')
}
