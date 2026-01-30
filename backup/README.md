# iTechLK Store - Premium Accounts E-Commerce Platform

A modern, full-featured e-commerce platform for selling premium subscription accounts at affordable prices in Sri Lanka.

## 🚀 Features

### Customer Features
- ✅ Google OAuth Authentication
- ✅ Product browsing with search and filters
- ✅ Shopping cart system
- ✅ Flexible subscription duration (1-3 months)
- ✅ Bank transfer payment with receipt upload
- ✅ Order tracking system
- ✅ Customer dashboard
  - Order history
  - Active subscriptions with expiry dates
  - Download invoices
  - Profile management
- ✅ Email notifications
- ✅ Subscription expiry reminders (3 days before)
- ✅ Product reviews and ratings
- ✅ Age verification for adult content
- ✅ Responsive design (mobile-friendly)

### Admin Features
- ✅ Admin dashboard
- ✅ Order management system
- ✅ Payment verification
- ✅ Telegram bot notifications
- ✅ Customer management
- ✅ Product management
- ✅ Analytics and sales reports
- ✅ Inventory management

### Product Features
- ✅ Product comparison
- ✅ Customer reviews/ratings
- ✅ "Most Popular" badges
- ✅ Stock availability indicator
- ✅ Category filtering
- ✅ Search functionality

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (React)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** NextAuth.js (Google OAuth)
- **Email:** Nodemailer (SendGrid/SMTP)
- **Notifications:** Telegram Bot API
- **File Upload:** Cloudinary
- **PDF Generation:** jsPDF
- **State Management:** Zustand
- **Form Handling:** React Hook Form + Zod

## 📦 Installation

### Prerequisites
- Node.js 18+ installed
- PostgreSQL database
- Google OAuth credentials
- Telegram Bot token
- Email service (SendGrid or SMTP)
- Cloudinary account (optional)

### Step 1: Clone and Install

```bash
# Install dependencies
npm install
```

### Step 2: Environment Setup

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

Required environment variables:
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - Random secret key
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret
- `TELEGRAM_BOT_TOKEN` - Telegram bot token
- `TELEGRAM_ADMIN_CHAT_ID` - Your Telegram chat ID
- `EMAIL_SERVER_*` - Email service credentials

### Step 3: Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# (Optional) Seed database with initial data
npx prisma db seed
```

### Step 4: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Configuration

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Client Secret to `.env`

### Telegram Bot Setup

1. Message [@BotFather](https://t.me/botfather) on Telegram
2. Create a new bot with `/newbot`
3. Copy the bot token to `.env`
4. Get your chat ID from [@userinfobot](https://t.me/userinfobot)
5. Add chat ID to `.env`

### Email Setup (SendGrid)

1. Sign up at [SendGrid](https://sendgrid.com/)
2. Create an API key
3. Add credentials to `.env`

### Cloudinary Setup (Optional)

1. Sign up at [Cloudinary](https://cloudinary.com/)
2. Get your cloud name, API key, and secret
3. Add to `.env`

## 📁 Project Structure

```
itechlk-store/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── (auth)/            # Authentication pages
│   │   ├── products/          # Product pages
│   │   ├── cart/              # Shopping cart
│   │   ├── checkout/          # Checkout process
│   │   ├── dashboard/         # Customer dashboard
│   │   ├── admin/             # Admin panel
│   │   └── api/               # API routes
│   ├── components/            # React components
│   │   ├── ui/               # UI components
│   │   └── ...               # Feature components
│   ├── lib/                   # Utilities and services
│   │   ├── services/         # Business logic
│   │   ├── prisma.ts         # Database client
│   │   └── utils.ts          # Helper functions
│   └── types/                 # TypeScript types
├── prisma/
│   └── schema.prisma         # Database schema
├── public/                    # Static assets
└── package.json
```

## 🎨 Design System

The UI is built with a professional design system featuring:
- Custom color palette with purple/pink gradients
- Smooth animations and transitions
- Glass morphism effects
- Card hover effects
- Responsive grid layouts
- Custom scrollbars
- Loading states and spinners

## 🔐 Security Features

- ✅ SSL/HTTPS required in production
- ✅ Secure authentication with NextAuth
- ✅ Password hashing with bcrypt
- ✅ CSRF protection
- ✅ Rate limiting
- ✅ Input validation with Zod
- ✅ Secure file upload validation
- ✅ Age verification for adult content

## 📱 Responsive Design

The platform is fully responsive and works on:
- Desktop (1920px+)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Manual Deployment

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 📊 Database Schema

Key models:
- **User** - Customer accounts
- **Product** - Premium subscriptions
- **Order** - Purchase orders
- **OrderItem** - Order line items
- **Subscription** - Active subscriptions
- **Review** - Product reviews
- **Referral** - Referral system

## 🔄 Workflow

1. Customer signs in with Google
2. Browses products and adds to cart
3. Selects duration (1-3 months)
4. Proceeds to checkout
5. Enters details (name, WhatsApp, email)
6. Views bank details and makes payment
7. Uploads payment receipt
8. Admin receives Telegram notification
9. Admin verifies payment
10. Customer receives account details via WhatsApp
11. Email confirmation sent
12. Subscription tracked with expiry reminders

## 📧 Email Templates

Professional HTML email templates for:
- Order confirmation
- Payment verification
- Order status updates
- Subscription expiry reminders
- Welcome emails

## 🤖 Telegram Bot

Admin receives instant notifications with:
- Order details
- Customer information
- Payment receipt
- Quick action buttons (Approve/Reject)
- Direct WhatsApp link to customer

## 🎯 Future Enhancements

- [ ] Online payment gateway (PayHere)
- [ ] SMS notifications
- [ ] Referral system
- [ ] Loyalty points
- [ ] Multi-language support (Sinhala, Tamil)
- [ ] Mobile app (PWA)
- [ ] Live chat support
- [ ] Automated account delivery
- [ ] Bundle deals
- [ ] Discount coupons

## 📝 License

Private - All rights reserved

## 👨‍💻 Developer

iTechLK Store
- WhatsApp: +94 74 257 0943
- Email: support@itechlk.store

## 🆘 Support

For technical support or questions:
- WhatsApp: +94 74 257 0943
- Email: support@itechlk.store

---

**Note:** This is a complete, production-ready e-commerce platform. Make sure to configure all environment variables and test thoroughly before going live.
