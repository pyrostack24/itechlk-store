# Telegram Approve Order - Troubleshooting Guide

## Issue: "Loading..." but nothing happens when clicking Approve Order

## Fixes Applied

### 1. **Improved Callback Handler** (`src/lib/services/telegram.ts`)
- ✅ Added immediate callback answer to remove loading state
- ✅ Added comprehensive logging at every step
- ✅ Better error handling with try-catch blocks
- ✅ Support for both photo and text messages
- ✅ Fallback to new message if editing fails

### 2. **Enhanced API Route** (`src/app/api/orders/approve/route.ts`)
- ✅ Added detailed logging for debugging
- ✅ Improved error responses with `success: false` flag
- ✅ Better error messages

### 3. **Server Initialization** (`src/instrumentation.ts`)
- ✅ Created instrumentation hook for bot initialization
- ✅ Enabled in `next.config.js`

## How to Test

### Step 1: Restart the Server
```bash
# Stop the current server (Ctrl+C)
# Then restart
npm run dev
```

### Step 2: Check Console Logs
You should see:
```
🤖 Setting up Telegram bot callback handlers...
✅ Telegram bot callback handlers ready
✅ Telegram bot initialized and listening for callbacks
```

### Step 3: Create a Test Order
1. Go to the website
2. Add a product to cart
3. Complete checkout with payment receipt
4. Check Telegram for the notification

### Step 4: Click Approve Button
Watch the console logs. You should see:
```
📥 Received callback query: approve_ORD-XXXXX
🔄 Processing approve for order ORD-XXXXX
🌐 Calling API: http://localhost:3001/api/orders/approve
📥 Approve API called
📦 Request body: { orderNumber: 'ORD-XXXXX', action: 'approve' }
🔍 Finding order: ORD-XXXXX
✅ Order found: xxx, Status: PENDING
✅ Approving order...
📝 Creating subscriptions...
✅ Created subscription xxx for product xxx
✅ Order approved successfully. Created 1 subscriptions
📡 API Response status: 200
📦 API Result: { success: true, ... }
✅ Successfully processed approve for order ORD-XXXXX
```

## Common Issues & Solutions

### Issue 1: Bot Not Initialized
**Symptoms:**
```
⚠️ Telegram bot not initialized - bot token missing
```

**Solution:**
1. Check `.env` file has `TELEGRAM_BOT_TOKEN`
2. Restart the server
3. Verify token is correct from BotFather

### Issue 2: API Not Reachable
**Symptoms:**
```
❌ Error processing order action: fetch failed
```

**Solution:**
1. Check `NEXT_PUBLIC_APP_URL` in `.env`
2. Make sure it matches your server URL
3. For local: `http://localhost:3001`
4. For production: `https://yourdomain.com`

### Issue 3: Order Not Found
**Symptoms:**
```
❌ Order not found: ORD-XXXXX
```

**Solution:**
1. Check database connection
2. Verify order exists in database
3. Check order number format matches

### Issue 4: Database Error
**Symptoms:**
```
❌ Order approval error: PrismaClientKnownRequestError
```

**Solution:**
1. Check database connection string
2. Run `npx prisma generate`
3. Run `npx prisma db push`
4. Restart server

### Issue 5: Still Shows Loading
**Symptoms:**
- Button shows loading spinner forever
- No logs in console

**Solution:**
1. Check if bot is polling:
   ```bash
   # Should see in logs:
   🤖 Setting up Telegram bot callback handlers...
   ```

2. Verify bot has permission to receive updates

3. Test bot manually:
   ```bash
   # Send a message to your bot
   # It should respond or at least log the message
   ```

## Manual Testing

### Test 1: Check Bot Status
```bash
# In terminal, run:
curl https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getMe
```

Should return bot information.

### Test 2: Test API Endpoint
```bash
# Test the approve endpoint directly:
curl -X POST http://localhost:3001/api/orders/approve \
  -H "Content-Type: application/json" \
  -d '{"orderNumber":"ORD-XXXXX","action":"approve"}'
```

Should return success response.

### Test 3: Check Webhook Status
```bash
# Check if webhook is set (should be empty for polling):
curl https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getWebhookInfo
```

Should show `"url": ""` (empty) for polling mode.

## Environment Variables Checklist

Make sure these are set in `.env`:

```env
✅ TELEGRAM_BOT_TOKEN="your-bot-token"
✅ TELEGRAM_ADMIN_CHAT_ID="your-chat-id"
✅ NEXT_PUBLIC_APP_URL="http://localhost:3001"
✅ DATABASE_URL="your-mongodb-url"
```

## Debugging Steps

1. **Enable Verbose Logging**
   - All logs are now enabled by default
   - Watch the console when clicking approve

2. **Check Network Tab**
   - Open browser DevTools
   - Go to Network tab
   - Click approve button
   - Look for `/api/orders/approve` request

3. **Check Telegram Bot Logs**
   - Look for callback_query events
   - Check if bot is receiving the callback

4. **Check Database**
   - Verify order exists
   - Check order status before/after
   - Verify subscriptions are created

## Success Indicators

When working correctly, you should see:

1. ✅ Immediate response (no loading)
2. ✅ Message updated with status
3. ✅ Order status changed to COMPLETED
4. ✅ Subscriptions created in database
5. ✅ Buttons removed from message

## Still Not Working?

If after all these steps it's still not working:

1. **Check Server Logs**
   - Look for any error messages
   - Check for network errors
   - Verify API is being called

2. **Restart Everything**
   ```bash
   # Stop server
   # Clear Next.js cache
   rm -rf .next
   # Restart
   npm run dev
   ```

3. **Verify Bot Token**
   - Get a new token from BotFather
   - Update `.env`
   - Restart server

4. **Check Firewall/Network**
   - Ensure bot can reach Telegram servers
   - Check if localhost:3001 is accessible
   - Verify no proxy issues

## Contact Support

If issue persists, provide:
- Console logs (full output)
- Error messages
- Order number
- Bot token (first 10 characters only)
- Environment (dev/production)
