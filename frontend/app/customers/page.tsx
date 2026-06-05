'use client'

import { useState, useEffect } from 'react'
import { DashboardLayout } from '@/components/layouts/DashboardLayout'
import { customerService } from '@/lib/services/customerService'
import { Customer } from '@/lib/types'
import { Search, Plus, MoreVertical } from 'lucide-react'

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchCustomers()
  }, [page, search])

  const fetchCustomers = async () => {
    try {
      setLoading(true)
      const response = await customerService.getAll(page, 10, search)
      setCustomers(response.data)
    } catch (error) {
      console.error('Failed to fetch customers:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-poppins font-bold text-dark-navy">Customers</h1>
            <p className="text-gray-600 font-inter mt-1">Manage customer profiles and information</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary-orange text-white rounded-lg hover:bg-orange-600 transition-colors font-inter font-medium">
            <Plus size={18} />
            Add Customer
          </button>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search customers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-10"
          />
        </div>

        {/* Customers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full text-center py-12 text-gray-500">Loading customers...</div>
          ) : customers.length === 0 ? (
            <div className="col-span-full text-center py-12 text-gray-500">No customers found</div>
          ) : (
            customers.map((customer) => (
              <div key={customer.id} className="card hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary-orange bg-opacity-10 flex items-center justify-center font-poppins font-bold text-primary-orange">
                    {customer.name.charAt(0)}
                  </div>
                  <button className="p-2 hover:bg-light rounded-lg transition-colors">
                    <MoreVertical size={16} className="text-gray-600" />
                  </button>
                </div>

                <h3 className="text-lg font-poppins font-bold text-dark-navy mb-1">{customer.name}</h3>
                <p className="text-sm text-gray-600 font-inter mb-4">{customer.faculty}</p>

                <div className="space-y-2 mb-4 pb-4 border-b border-gray-100">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Phone</span>
                    <span className="font-semibold text-dark-navy">{customer.phoneNumber}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Hostel</span>
                    <span className="font-semibold text-dark-navy">{customer.hostel}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Spend</span>
                    <span className="font-semibold text-dark-navy">₵{customer.totalSpend.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-semibold">
                    {customer.orderHistory} orders
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                    customer.status === 'active'
                      ? 'bg-success bg-opacity-10 text-success'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {customer.status.toUpperCase()}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}