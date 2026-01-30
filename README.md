# 🛍️ iTech LK Store

A modern e-commerce platform for digital products and subscriptions built with Next.js 14, TypeScript, and MongoDB.

## ✨ Features

- 🔐 **Secure Authentication** - Google OAuth integration
- 🛒 **Shopping Cart** - Real-time cart management
- 💳 **Payment Processing** - Bank transfer with receipt verification
- 📱 **Telegram Integration** - Admin notifications and order management
- 📧 **Email Notifications** - Automated order confirmations
- 👨‍💼 **Admin Panel** - Product and order management
- 📊 **User Dashboard** - Order tracking and subscription management
- 🎨 **Responsive Design** - Mobile-first approach with Tailwind CSS
- 🔄 **Flexible Subscriptions** - 1, 3, 6, and 12-month options
- 💰 **Dynamic Pricing** - Automatic discounts for longer subscriptions

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: MongoDB with Prisma ORM
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **File Upload**: Cloudinary
- **Notifications**: Telegram Bot API
- **Email**: Nodemailer (Gmail SMTP)

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/pyrostack24/itechlk-store.git
cd itechlk-store

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your credentials

# Generate Prisma Client
npm run db:generate

# Push database schema
npx prisma db push

# Seed database (optional)
npm run db:seed

# Start development server
npm run dev
```

Visit http://localhost:3001

## 🔧 Environment Variables

See `.env.example` for required environment variables.

Key variables:
- `DATABASE_URL` - MongoDB connection string
- `NEXTAUTH_SECRET` - Authentication secret
- `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET` - OAuth credentials
- `TELEGRAM_BOT_TOKEN` & `TELEGRAM_ADMIN_CHAT_ID` - Bot configuration
- `CLOUDINARY_*` - Image upload credentials

## 🌐 Deployment

This project is optimized for Vercel deployment:

1. Push code to GitHub
2. Import project to Vercel
3. Configure environment variables
4. Deploy!

For detailed instructions, see deployment documentation.

## 👨‍💼 Admin Access

After first sign-in, make a user admin:

```bash
node make-admin.js user@example.com
```

## 📝 License

Private - All rights reserved

## 🔗 Links

- **Live Site**: https://itechlk.store
- **Admin Panel**: https://itechlk.store/admin

---

Built with ❤️ for iTech LK
