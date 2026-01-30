'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Users, Mail, Calendar, Shield, Search, ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface Customer {
  id: string
  name: string | null
  email: string
  image: string | null
  isAdmin: boolean
  createdAt: string
  _count: {
    orders: number
    subscriptions: number
  }
}

export default function CustomersPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  useEffect(() => {
    fetchCustomers()
  }, [])

  const fetchCustomers = async () => {
    try {
      const response = await fetch('/api/admin/customers')
      if (response.ok) {
        const data = await response.json()
        setCustomers(data.customers)
      }
    } catch (error) {
      console.error('Error fetching customers:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredCustomers = customers.filter(customer => 
    customer.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-neutral-600">Loading customers...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Header />
      
      <main className="flex-1 py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <Link href="/admin">
                <Button variant="ghost" size="sm" className="hover:bg-neutral-100">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900">Customers</h1>
                <p className="text-neutral-600 mt-1">Manage and view all registered customers</p>
              </div>
            </div>
          </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-600">Total Customers</p>
                  <p className="text-3xl font-bold text-neutral-900 mt-1">{customers.length}</p>
                </div>
                <div className="h-12 w-12 rounded-xl bg-primary-100 flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-600">Active Subscriptions</p>
                  <p className="text-3xl font-bold text-neutral-900 mt-1">
                    {customers.reduce((sum, c) => sum + c._count.subscriptions, 0)}
                  </p>
                </div>
                <div className="h-12 w-12 rounded-xl bg-success-100 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-success-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-600">Total Orders</p>
                  <p className="text-3xl font-bold text-neutral-900 mt-1">
                    {customers.reduce((sum, c) => sum + c._count.orders, 0)}
                  </p>
                </div>
                <div className="h-12 w-12 rounded-xl bg-secondary-100 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-secondary-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search customers by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
              />
            </div>
          </CardContent>
        </Card>

        {/* Customers List */}
        <Card>
          <CardHeader>
            <CardTitle>All Customers ({filteredCustomers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredCustomers.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
                  <p className="text-neutral-600">No customers found</p>
                </div>
              ) : (
                filteredCustomers.map((customer) => (
                  <div
                    key={customer.id}
                    className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg hover:border-primary-300 hover:bg-primary-50/50 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      {customer.image ? (
                        <Image
                          src={customer.image}
                          alt={customer.name || 'User'}
                          width={48}
                          height={48}
                          className="rounded-full"
                        />
                      ) : (
                        <div className="h-12 w-12 rounded-full bg-gradient-to-r from-primary-600 to-secondary-600 flex items-center justify-center">
                          <span className="text-white font-semibold text-lg">
                            {customer.name?.charAt(0) || customer.email.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-neutral-900">{customer.name || 'No Name'}</p>
                          {customer.isAdmin && (
                            <Badge variant="primary" className="text-xs">
                              <Shield className="h-3 w-3 mr-1" />
                              Admin
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-neutral-600 mt-1">
                          <Mail className="h-3 w-3" />
                          {customer.email}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-4 text-sm">
                        <div>
                          <p className="text-neutral-600">Orders</p>
                          <p className="font-semibold text-neutral-900">{customer._count.orders}</p>
                        </div>
                        <div>
                          <p className="text-neutral-600">Subscriptions</p>
                          <p className="font-semibold text-neutral-900">{customer._count.subscriptions}</p>
                        </div>
                        <div>
                          <p className="text-neutral-600">Joined</p>
                          <p className="font-semibold text-neutral-900">
                            {new Date(customer.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
