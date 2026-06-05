'use client'

import { useState, useEffect } from 'react'
import { DashboardLayout } from '@/components/layouts/DashboardLayout'
import { orderService } from '@/lib/services/orderService'
import { Order } from '@/lib/types'
import { Search, Plus, Filter, MoreVertical } from 'lucide-react'

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchOrders()
  }, [page])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const response = await orderService.getAll(page, 10)
      setOrders(response.data)
    } catch (error) {
      console.error('Failed to fetch orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      'vendor-confirmed': 'bg-blue-100 text-blue-800',
      preparing: 'bg-blue-100 text-blue-800',
      collected: 'bg-indigo-100 text-indigo-800',
      'on-way': 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  const getPaymentColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800',
      refunded: 'bg-orange-100 text-orange-800',
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-poppins font-bold text-dark-navy">Orders</h1>
            <p className="text-gray-600 font-inter mt-1">Manage and track all customer orders</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary-orange text-white rounded-lg hover:bg-orange-600 transition-colors font-inter font-medium">
            <Plus size={18} />
            New Order
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-light transition-colors">
            <Filter size={18} />
            <span className="font-inter text-sm">Filter</span>
          </button>
        </div>

        {/* Orders Table */}
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-light">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-dark-navy">Order ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-dark-navy">Customer</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-dark-navy">Vendor</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-dark-navy">Meal</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-dark-navy">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-dark-navy">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-dark-navy">Payment</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-dark-navy">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-dark-navy">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={9} className="px-6 py-8 text-center text-gray-500">
                      Loading orders...
                    </td>
                  </tr>
                ) : orders.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-6 py-8 text-center text-gray-500">
                      No orders found
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-100 hover:bg-light transition-colors">
                      <td className="px-6 py-4 font-mono text-sm font-semibold text-dark-navy">{order.orderId}</td>
                      <td className="px-6 py-4 text-sm text-dark-navy">{order.studentName}</td>
                      <td className="px-6 py-4 text-sm text-dark-navy">{order.vendorName}</td>
                      <td className="px-6 py-4 text-sm text-dark-navy">{order.mealOrdered}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-dark-navy">₵{order.amount.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <span className={`badge ${getStatusColor(order.orderStatus)}`}>
                          {order.orderStatus.replace('-', ' ').toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`badge ${getPaymentColor(order.paymentStatus)}`}>
                          {order.paymentStatus.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <MoreVertical size={16} className="text-gray-600" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}