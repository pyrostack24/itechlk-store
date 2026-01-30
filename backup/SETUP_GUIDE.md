# 🚀 iTechLK Store - Complete Setup & Deployment Guide

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Database Setup](#database-setup)
5. [Running the Application](#running-the-application)
6. [Deployment](#deployment)
7. [Features Overview](#features-overview)

---

## Prerequisites

Before you begin, ensure you have:
- **Node.js 18+** installed
- **PostgreSQL** database (or Supabase account)
- **Google OAuth** credentials
- **Telegram Bot** token
- **Email service** (Gmail or SendGrid)

---

## Installation

### Step 1: Install Dependencies

```bash
npm install
```

This installs all required packages including:
- Next.js 14 (React framework)
- Prisma (Database ORM)
- NextAuth (Authentication)
- Tailwind CSS (Styling)
- And more...

---

## Configuration

### Step 2: Environment Variables

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Edit `.env` and fill in the following:

#### Database Configuration
```env
DATABASE_URL="postgresql://user:password@localhost:5432/itechlk_store"
```

**Using Supabase (Recommended for beginners):**
1. Go to [supabase.com](https://supabase.com)
2. Create a free account and new project
3. Go to Settings → Database
4. Copy the "Connection string" (URI format)
5. Paste it as DATABASE_URL

#### NextAuth Configuration
```env
NEXTAUTH_SECRET="generate-a-random-secret-here"
NEXTAUTH_URL="http://localhost:3000"
```

Generate a secret:
```bash
openssl rand -base64 32
```

#### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project: "iTechLK Store"
3. Enable Google+ API
4. Create OAuth 2.0 credentials:
   - Application type: Web application
   - Authorized redirect URIs:
     - `http://localhost:3000/api/auth/callback/google`
     - `https://yourdomain.com/api/auth/callback/google` (production)
5. Copy credentials:

```env
GOOGLE_CLIENT_ID="your-google-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

#### Telegram Bot Setup

1. Open Telegram and search for `@BotFather`
2. Send `/newbot` command
3. Choose name: "iTechLK Store Bot"
4. Choose username: "itechlk_store_bot"
5. Copy the token

6. Get your Chat ID:
   - Search for `@userinfobot`
   - Start the bot
   - Copy your chat ID

```env
TELEGRAM_BOT_TOKEN="1234567890:ABCdefGHIjklMNOpqrsTUVwxyz"
TELEGRAM_ADMIN_CHAT_ID="123456789"
```

#### Email Configuration

**Option A: Gmail (Easy)**

1. Enable 2-Factor Authentication in Google Account
2. Create App Password:
   - Google Account → Security → App passwords
   - Select "Mail" and "Other"
   - Copy the 16-character password

```env
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER="your-email@gmail.com"
EMAIL_SERVER_PASSWORD="your-16-char-app-password"
EMAIL_FROM="your-email@gmail.com"
```

**Option B: SendGrid (Professional)**

1. Sign up at [sendgrid.com](https://sendgrid.com)
2. Create API key
3. Configure:

```env
EMAIL_SERVER_HOST="smtp.sendgrid.net"
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER="apikey"
EMAIL_SERVER_PASSWORD="your-sendgrid-api-key"
EMAIL_FROM="noreply@itechlk.store"
```

#### Bank Details (Already configured from your files)
```env
BANK_COMMERCIAL_ACCOUNT="8028757579"
BANK_COMMERCIAL_BRANCH="MORAWAKA"
BANK_COMMERCIAL_NAME="P A INDIRA UMANGA (ANUHAS P A I U )"
BANK_BOC_ACCOUNT="72790749"
BANK_BOC_BRANCH="MORAWAKA"
BANK_BOC_NAME="P A INDIRA UMANGA (ANUHAS P A I U )"
```

#### WhatsApp
```env
WHATSAPP_NUMBER="+94742570943"
```

#### Site URL
```env
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

---

## Database Setup

### Step 3: Initialize Database

```bash
# Generate Prisma Client
npm run db:generate

# Run migrations (creates tables)
npm run db:migrate

# Seed database with products
npm run db:seed
```

This will create:
- All database tables
- 8 products (Netflix, ChatGPT, Canva, etc.)
- Admin user (admin@itechlk.store)

### View Database (Optional)
```bash
npm run db:studio
```
Opens Prisma Studio at http://localhost:5555

---

## Running the Application

### Step 4: Start Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser! 🎉

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:generate  # Generate Prisma Client
npm run db:migrate   # Run database migrations
npm run db:seed      # Seed database with data
npm run db:studio    # Open Prisma Studio
```

---

## Deployment

### Deploy to Vercel (Recommended - Free)

#### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/itechlk-store.git
git push -u origin main
```

#### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "Import Project"
4. Select your repository
5. Configure:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: .next

#### Step 3: Add Environment Variables

In Vercel dashboard, go to Settings → Environment Variables and add ALL variables from your `.env` file.

**Important:** Update these for production:
- `NEXTAUTH_URL` → Your Vercel URL
- `NEXT_PUBLIC_SITE_URL` → Your Vercel URL
- Add Vercel URL to Google OAuth redirect URIs

#### Step 4: Deploy

Click "Deploy" and wait for deployment to complete!

### Custom Domain (Optional)

1. Buy a domain (.lk recommended for Sri Lanka)
2. In Vercel: Settings → Domains
3. Add your domain
4. Update DNS records as instructed
5. Update environment variables with new domain

---

## Features Overview

### ✅ Customer Features
- Google OAuth login
- Product browsing with search & filters
- Shopping cart with duration selector (1-3 months)
- Secure checkout with bank transfer
- Payment receipt upload
- Order tracking
- Customer dashboard
  - Order history
  - Active subscriptions
  - Expiry reminders
  - Download invoices
- Email notifications
- WhatsApp support

### ✅ Admin Features
- Admin dashboard
- Real-time order notifications (Telegram)
- Order management
  - Approve/reject orders
  - View payment receipts
  - Contact customers directly
- Analytics & reports
  - Sales charts
  - Revenue tracking
  - Customer statistics
- Product management
- Customer management

### ✅ Product Features
- 8 Premium products included:
  - Picsart (LKR 500)
  - ChatGPT Plus (LKR 1,250)
  - Netflix (LKR 1,500)
  - CapCut Pro (LKR 750)
  - Photoshop (LKR 1,299)
  - Gemini Advanced (LKR 2,000)
  - Canva Pro (LKR 500)
  - Premium Adult (LKR 1,999) - with age verification

- Product ratings & reviews
- Stock availability indicator
- "Most Popular" badges
- Category filtering
- Search functionality

### ✅ Security Features
- Secure authentication
- Age verification for adult content
- Encrypted data storage
- Secure file uploads
- HTTPS required in production

---

## Testing

### Test the Complete Flow

1. **Browse Products**
   - Go to http://localhost:3000/products
   - Search and filter products

2. **Add to Cart**
   - Click "Add to Cart" on any product
   - Select duration (1-3 months)
   - View cart at /cart

3. **Sign In**
   - Click "Sign In" button
   - Sign in with Google

4. **Checkout**
   - Fill in customer information
   - View bank details
   - Upload a test receipt image

5. **Check Notifications**
   - Check your email for order confirmation
   - Check Telegram for admin notification

6. **Admin Dashboard**
   - Go to http://localhost:3000/admin
   - View orders and analytics

---

## Troubleshooting

### Common Issues

**Database Connection Error**
```bash
# Reset database
npm run db:migrate reset
npm run db:migrate
npm run db:seed
```

**Google OAuth Not Working**
- Verify redirect URI matches exactly
- Check if Google+ API is enabled
- Confirm CLIENT_ID and CLIENT_SECRET

**Telegram Bot Not Sending**
- Verify bot token is correct
- Make sure you started the bot on Telegram
- Check chat ID is correct

**Email Not Sending**
- For Gmail, use App Password (not regular password)
- Check spam folder
- Verify SMTP credentials

**Build Errors**
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

---

## Support

Need help? Contact:
- **WhatsApp:** +94 74 257 0943
- **Email:** support@itechlk.store

---

## Next Steps

1. ✅ Complete setup following this guide
2. ✅ Test all features locally
3. ✅ Deploy to Vercel
4. ✅ Configure custom domain
5. ✅ Add SSL certificate (automatic with Vercel)
6. ✅ Test in production
7. ✅ Start accepting orders!

---

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth Documentation](https://next-auth.js.org)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vercel Documentation](https://vercel.com/docs)

---

**Congratulations! Your premium e-commerce store is ready! 🎉**

Start selling premium accounts and grow your business!
