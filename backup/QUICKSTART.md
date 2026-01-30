# ⚡ Quick Start Guide - iTechLK Store

Get your store running in 5 minutes!

## 🚀 Quick Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment
```bash
cp .env.example .env
```

Edit `.env` with your credentials (see SETUP_GUIDE.md for details)

### 3. Setup Database
```bash
npm run db:generate
npm run db:migrate
npm run db:seed
```

### 4. Run Development Server
```bash
npm run dev
```

Open http://localhost:3000 🎉

---

## 📝 Minimum Required Configuration

Edit `.env` file:

```env
# Database (use Supabase for free)
DATABASE_URL="your-postgresql-url"

# NextAuth
NEXTAUTH_SECRET="run: openssl rand -base64 32"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth (from Google Cloud Console)
GOOGLE_CLIENT_ID="your-client-id"
GOOGLE_CLIENT_SECRET="your-client-secret"

# Telegram Bot (from @BotFather)
TELEGRAM_BOT_TOKEN="your-bot-token"
TELEGRAM_ADMIN_CHAT_ID="your-chat-id"

# Email (Gmail or SendGrid)
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER="your-email@gmail.com"
EMAIL_SERVER_PASSWORD="your-app-password"
EMAIL_FROM="your-email@gmail.com"
```

---

## 🎯 What's Included

✅ **8 Premium Products** pre-configured
✅ **Customer Dashboard** with order tracking
✅ **Admin Dashboard** with analytics
✅ **Email Notifications** for orders
✅ **Telegram Notifications** for admin
✅ **Shopping Cart** with duration selector
✅ **Bank Transfer Payment** system
✅ **Receipt Upload** functionality
✅ **Google OAuth** authentication
✅ **Responsive Design** (mobile-friendly)

---

## 📱 Test the Application

1. **Browse Products:** http://localhost:3000/products
2. **Add to Cart:** Select products and duration
3. **Sign In:** Use Google OAuth
4. **Checkout:** Fill details and upload receipt
5. **Admin Panel:** http://localhost:3000/admin

---

## 🔧 Useful Commands

```bash
npm run dev          # Start development
npm run build        # Build for production
npm run db:studio    # View database
npm run db:seed      # Reset products
```

---

## 📚 Full Documentation

For detailed setup instructions, see:
- **SETUP_GUIDE.md** - Complete setup guide
- **README.md** - Project overview

---

## 🆘 Need Help?

- WhatsApp: +94 74 257 0943
- Email: support@itechlk.store

---

**Ready to launch your store? Follow SETUP_GUIDE.md for production deployment!**
