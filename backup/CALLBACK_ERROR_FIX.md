# 🔧 OAuth Callback Error - Complete Fix

## Current Issue
Getting callback error after Google sign-in even though OAuth settings are correct.

## Root Cause
The Prisma client needs to be regenerated for MongoDB, and there might be database connection issues.

---

## ✅ Step-by-Step Fix

### Step 1: Stop Your Development Server
```bash
# Press Ctrl+C to stop the server
```

### Step 2: Close VS Code or Any IDE
This is important to release file locks on the Prisma client.

### Step 3: Delete Prisma Client Cache
```bash
# On Windows (Command Prompt):
rmdir /s /q node_modules\.prisma

# Or manually delete:
# D:\itechlk.store\node_modules\.prisma
```

### Step 4: Regenerate Prisma Client
```bash
npx prisma generate
```

### Step 5: Push Schema to MongoDB
```bash
npx prisma db push
```

This will:
- Create the collections in MongoDB
- Set up the indexes
- Prepare the database for NextAuth

### Step 6: Restart Development Server
```bash
npm run dev
```

### Step 7: Test Again
1. Go to: http://localhost:3001
2. Click "Sign In"
3. Click "Sign in with Google"
4. Check the terminal/console for debug logs

---

## 🔍 Check Debug Logs

After enabling debug mode, you should see detailed logs in your terminal when you try to sign in.

Look for errors like:
- Database connection errors
- Prisma adapter errors
- MongoDB authentication errors

---

## 🚨 Alternative Solution: Use JWT Instead of Database Sessions

If the database adapter continues to cause issues, you can temporarily switch to JWT sessions:

### Update NextAuth Configuration

Edit `src/app/api/auth/[...nextauth]/route.ts`:

```typescript
import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
  // Remove adapter temporarily
  // adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.id = profile?.sub
        token.isAdmin = false // Set admin status here if needed
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        // @ts-ignore
        session.user.isAdmin = token.isAdmin || false
      }
      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt', // Use JWT instead of database
  },
  debug: true,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
```

This will:
- ✅ Bypass database adapter issues
- ✅ Use JWT tokens for sessions
- ✅ Still authenticate with Google
- ⚠️ Won't store users in database (temporary solution)

---

## 📋 Verification Checklist

- [ ] Development server stopped
- [ ] VS Code/IDE closed
- [ ] `.prisma` folder deleted from `node_modules`
- [ ] `npx prisma generate` completed successfully
- [ ] `npx prisma db push` completed successfully
- [ ] Development server restarted
- [ ] Browser cache cleared
- [ ] Tested sign-in again

---

## 🔍 Common Errors and Solutions

### Error: "EPERM: operation not permitted"
**Solution:**
1. Close all IDEs and terminals
2. Delete `node_modules\.prisma` folder
3. Run `npx prisma generate` again

### Error: "PrismaClientInitializationError"
**Solution:**
- Check MongoDB connection string in `.env`
- Verify MongoDB cluster is accessible
- Check if IP address is whitelisted in MongoDB Atlas

### Error: "Adapter error"
**Solution:**
- Switch to JWT sessions (see alternative solution above)
- Or ensure all NextAuth models are in Prisma schema

### Error: "Invalid session"
**Solution:**
- Clear browser cookies for localhost
- Try incognito/private browsing mode

---

## 🎯 Expected Behavior After Fix

1. Click "Sign in with Google"
2. Google sign-in page appears
3. Select your Google account
4. Redirected to: `http://localhost:3001/dashboard`
5. You're logged in! ✅

---

## 📞 If Still Not Working

### Check Terminal Logs
Look for these in your terminal after trying to sign in:
```
NextAuth Debug: ...
NextAuth Error: ...
```

### Check Browser Console
1. Press F12
2. Go to Console tab
3. Look for error messages

### Test MongoDB Connection
Create a test file `test-db.js`:
```javascript
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('Testing MongoDB connection...')
  const users = await prisma.user.findMany()
  console.log('✅ Connected! Users:', users.length)
}

main()
  .catch(e => console.error('❌ Error:', e))
  .finally(() => prisma.$disconnect())
```

Run: `node test-db.js`

---

## 🔄 Quick Commands Reference

```bash
# Stop server
Ctrl+C

# Delete Prisma cache
rmdir /s /q node_modules\.prisma

# Regenerate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Start server
npm run dev

# View Prisma Studio (database GUI)
npx prisma studio
```

---

**Last Updated:** ${new Date().toISOString().split('T')[0]}  
**Status:** 🔧 Requires Prisma Regeneration
