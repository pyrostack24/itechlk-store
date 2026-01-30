# 📧 Email Configuration Guide (Optional)

## Current Status
- ✅ Orders are working perfectly
- ⚠️ Email confirmations are timing out (non-critical)

## Quick Fix Options

### Option 1: Use Gmail (Recommended for Testing)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password:**
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)"
   - Copy the 16-character password

3. **Update `.env` file:**
```env
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@gmail.com
EMAIL_SERVER_PASSWORD=your-16-char-app-password
EMAIL_FROM=your-email@gmail.com
```

4. **Restart dev server:**
```bash
# Stop with Ctrl+C, then:
npm run dev
```

### Option 2: Use SendGrid (Recommended for Production)

1. **Sign up:** https://sendgrid.com (Free tier: 100 emails/day)
2. **Create API Key**
3. **Update `.env`:**
```env
EMAIL_SERVER_HOST=smtp.sendgrid.net
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=apikey
EMAIL_SERVER_PASSWORD=your-sendgrid-api-key
EMAIL_FROM=noreply@yourdomain.com
```

### Option 3: Disable Email Temporarily

If you don't need emails right now, you can comment out the email sending:

**File:** `src/app/api/orders/route.ts`

Find this line (around line 140):
```typescript
await sendOrderConfirmation(
  customerInfo.email,
  order.orderNumber,
  totalAmount
)
```

Comment it out:
```typescript
// await sendOrderConfirmation(
//   customerInfo.email,
//   order.orderNumber,
//   totalAmount
// )
```

This will skip email sending and orders will complete faster.

## Testing Email Configuration

Create a test script: `test-email.js`

```javascript
const nodemailer = require('nodemailer')
require('dotenv').config()

async function testEmail() {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  })

  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: 'your-test-email@gmail.com',
      subject: 'Test Email',
      text: 'If you receive this, email is working!',
    })
    console.log('✅ Email sent successfully:', info.messageId)
  } catch (error) {
    console.error('❌ Email failed:', error)
  }
}

testEmail()
```

Run: `node test-email.js`

## Common Issues

### "Greeting never received" / ETIMEDOUT
- **Cause:** Can't connect to SMTP server
- **Fix:** Check firewall, VPN, or use different SMTP provider

### "Invalid login"
- **Cause:** Wrong credentials
- **Fix:** Double-check username/password, use app password for Gmail

### "Connection refused"
- **Cause:** Wrong port or host
- **Fix:** Verify SMTP settings with your provider

## Environment Variables Needed

```env
# Email Configuration
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@gmail.com
EMAIL_SERVER_PASSWORD=your-app-password
EMAIL_FROM=noreply@itechlk.store

# Site URL (for email links)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Remember

**Email is optional!** Your order system works perfectly without it. Users still:
- ✅ See order confirmation page
- ✅ Get order number
- ✅ Can track order in dashboard
- ✅ Receive WhatsApp notifications (if configured)

You can set up email later when you're ready for production.

---

**Priority:** Low (orders work without it)
**Impact:** User experience enhancement only
