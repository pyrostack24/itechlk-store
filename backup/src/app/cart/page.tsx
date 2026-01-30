'use client'

import { useCartStore } from '@/store/cartStore'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Sparkles, Lock } from 'lucide-react'
import Link from 'next/link'
import { formatPrice } from '@/lib/utils'

export default function CartPage() {
  const { items, removeItem, updateQuantity, updateMonths, getTotalPrice } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-neutral-50">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center py-16 px-4">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-r from-primary-100 to-secondary-100 mb-6">
              <ShoppingBag className="h-12 w-12 text-primary-600" />
            </div>
            <h2 className="text-3xl font-bold text-neutral-900 mb-3">Your cart is empty</h2>
            <p className="text-neutral-600 mb-8 text-lg">Add some premium products to get started!</p>
            <Link href="/products">
              <Button variant="primary" size="lg">
                <Sparkles className="h-5 w-5 mr-2" />
                Browse Products
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Header />
      
      <main className="flex-1 py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-neutral-900 mb-2">Shopping Cart</h1>
            <p className="text-lg text-neutral-600">
              {items.reduce((sum, item) => sum + item.quantity, 0)} items in your cart
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-6">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center p-2">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={60}
                            height={60}
                            className="object-contain"
                          />
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-semibold text-neutral-900 mb-3">{item.name}</h3>
                        
                        {/* Duration Selector */}
                        <div className="mb-4">
                          <label className="text-sm font-medium text-neutral-700 mb-2 block">
                            Duration
                          </label>
                          <div className="flex items-center gap-2">
                            {[1, 2, 3].map((month) => (
                              <Button
                                key={month}
                                variant={item.months === month ? 'primary' : 'outline'}
                                size="sm"
                                onClick={() => updateMonths(item.id, month)}
                                className="min-w-[80px]"
                              >
                                {month} {month === 1 ? 'Month' : 'Months'}
                              </Button>
                            ))}
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="h-10 w-10"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                              className="w-20 text-center h-10"
                              min="1"
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-10 w-10"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>

                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.id)}
                            className="text-error-500 hover:text-error-700 hover:bg-error-50 h-10 w-10"
                          >
                            <Trash2 className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="text-right flex-shrink-0">
                        <div className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-1">
                          {formatPrice(item.price * item.quantity * item.months)}
                        </div>
                        <div className="text-sm text-neutral-500">
                          {formatPrice(item.price)} × {item.quantity} × {item.months}mo
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24 border-2 border-neutral-200 shadow-lg">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-neutral-900 mb-6">Order Summary</h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-neutral-600">
                      <span>Subtotal</span>
                      <span className="font-semibold text-neutral-900">{formatPrice(getTotalPrice())}</span>
                    </div>
                    <div className="flex justify-between text-neutral-600">
                      <span>Items</span>
                      <span className="font-semibold text-neutral-900">
                        {items.reduce((sum, item) => sum + item.quantity, 0)}
                      </span>
                    </div>
                    <div className="flex justify-between text-neutral-600">
                      <span>Delivery</span>
                      <Badge variant="success" className="text-xs">
                        5-15 minutes
                      </Badge>
                    </div>
                    
                    <div className="border-t border-neutral-200 pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-neutral-900">Total</span>
                        <span className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                          {formatPrice(getTotalPrice())}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Link href="/checkout">
                    <Button variant="primary" size="lg" className="w-full mb-3 shadow-lg hover:shadow-xl">
                      <Lock className="h-5 w-5 mr-2" />
                      Proceed to Checkout
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Button>
                  </Link>

                  <Link href="/products">
                    <Button variant="outline" size="default" className="w-full">
                      Continue Shopping
                    </Button>
                  </Link>

                  {/* Security Info */}
                  <div className="mt-6 p-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl border border-primary-200">
                    <div className="flex items-start gap-3">
                      <Lock className="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-neutral-700">
                        <p className="font-semibold mb-2">Secure Checkout</p>
                        <ul className="space-y-1 text-xs">
                          <li>• Fast delivery (5-15 minutes)</li>
                          <li>• 24/7 WhatsApp support</li>
                          <li>• Secure bank transfer</li>
                          <li>• Money-back guarantee</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
