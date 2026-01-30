'use client'

import * as React from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { config } from '@/lib/config'

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: 'How long does delivery take?',
    answer: 'After payment verification, you will receive your account details within 5-15 minutes via WhatsApp. Our team works 24/7 to ensure fast delivery.',
  },
  {
    question: 'Are the accounts genuine?',
    answer: 'Yes! All our accounts are 100% genuine and legally obtained. We guarantee authentic premium subscriptions that work perfectly.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We currently accept bank transfers to our local Sri Lankan bank accounts. After ordering, you will receive our bank details to complete the payment.',
  },
  {
    question: 'Can I get a refund?',
    answer: 'Yes, we offer refunds if there are any issues with your account within the first 24 hours. Please contact our support team for assistance.',
  },
  {
    question: 'How do I renew my subscription?',
    answer: 'You will receive a reminder 3 days before your subscription expires. Simply place a new order through our website to renew.',
  },
  {
    question: 'Is customer support available?',
    answer: 'Yes! We provide 24/7 WhatsApp support. You can reach us anytime at +94 74 257 0943 for any questions or issues.',
  },
]

export const FAQ: React.FC<{ className?: string }> = ({ className }) => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0)

  return (
    <section className={cn("py-20 lg:py-32 bg-white", className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-200 mb-4">
            <HelpCircle className="h-4 w-4 text-primary-600" />
            <span className="text-sm font-semibold text-primary-700">FAQ</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Everything you need to know about our service
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-2 border-neutral-200 rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary-300 hover:shadow-lg"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-neutral-50 transition-colors"
              >
                <span className="text-lg font-semibold text-neutral-900 pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 text-neutral-700 flex-shrink-0 transition-transform duration-300",
                    openIndex === index && "rotate-180"
                  )}
                />
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-300",
                  openIndex === index ? "max-h-96" : "max-h-0"
                )}
              >
                <div className="p-6 pt-0 text-neutral-600 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <p className="text-neutral-600 mb-4">
            Still have questions?
          </p>
          <a
            href={config.contact.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-neutral-900 font-semibold hover:text-neutral-700 transition-colors"
          >
            Contact us on WhatsApp
            <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
          </a>
        </div>
      </div>
    </section>
  )
}
