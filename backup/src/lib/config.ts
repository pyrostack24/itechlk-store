/**
 * Application Configuration
 * Centralized configuration for environment variables
 */

export const config = {
  // Bank Details
  bank: {
    commercial: {
      name: 'Commercial Bank',
      accountNumber: process.env.NEXT_PUBLIC_BANK_COMMERCIAL_ACCOUNT || process.env.BANK_COMMERCIAL_ACCOUNT || '8028757579',
      branch: process.env.NEXT_PUBLIC_BANK_COMMERCIAL_BRANCH || process.env.BANK_COMMERCIAL_BRANCH || 'MORAWAKA',
      accountName: process.env.NEXT_PUBLIC_BANK_COMMERCIAL_NAME || process.env.BANK_COMMERCIAL_NAME || 'P A INDIRA UMANGA (ANUHAS P A I U )',
    },
    boc: {
      name: 'Bank of Ceylon (BOC)',
      accountNumber: process.env.NEXT_PUBLIC_BANK_BOC_ACCOUNT || process.env.BANK_BOC_ACCOUNT || '72790749',
      branch: process.env.NEXT_PUBLIC_BANK_BOC_BRANCH || process.env.BANK_BOC_BRANCH || 'MORAWAKA',
      accountName: process.env.NEXT_PUBLIC_BANK_BOC_NAME || process.env.BANK_BOC_NAME || 'P A INDIRA UMANGA (ANUHAS P A I U )',
    },
  },

  // Contact Details
  contact: {
    whatsapp: process.env.WHATSAPP_NUMBER || '+94742570943',
    get whatsappLink() {
      const number = (process.env.WHATSAPP_NUMBER || '+94742570943').replace(/[^0-9]/g, '')
      return `https://wa.me/${number}`
    },
  },

  // Site Configuration
  site: {
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  },

  // Email Configuration
  email: {
    from: process.env.EMAIL_FROM || '',
  },
} as const

// Helper function to validate required environment variables
export function validateConfig() {
  const required = [
    'BANK_COMMERCIAL_ACCOUNT',
    'BANK_COMMERCIAL_BRANCH',
    'BANK_COMMERCIAL_NAME',
    'BANK_BOC_ACCOUNT',
    'BANK_BOC_BRANCH',
    'BANK_BOC_NAME',
    'WHATSAPP_NUMBER',
    'NEXT_PUBLIC_SITE_URL',
  ]

  const missing = required.filter((key) => !process.env[key])

  if (missing.length > 0) {
    console.warn(
      `⚠️  Missing environment variables: ${missing.join(', ')}\n` +
      `Please check your .env file against .env.example`
    )
  }

  return missing.length === 0
}
