'use client'

import { useState, useEffect } from 'react'
import { DashboardLayout } from '@/components/layouts/DashboardLayout'
import { vendorService } from '@/lib/services/vendorService'
import { Vendor } from '@/lib/types'
import { Search, Plus, Star, MoreVertical } from 'lucide-react'

export default function VendorsPage() {
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchVendors()
  }, [page, search])

  const fetchVendors = async () => {
    try {
      setLoading(true)
      const response = await vendorService.getAll(page, 10, search)
      setVendors(response.data)
    } catch (error) {
      console.error('Failed to fetch vendors:', error)
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
            <h1 className="text-3xl font-poppins font-bold text-dark-navy">Vendors</h1>
            <p className="text-gray-600 font-inter mt-1">Manage food vendors and partners</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary-orange text-white rounded-lg hover:bg-orange-600 transition-colors font-inter font-medium">
            <Plus size={18} />
            Add Vendor
          </button>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search vendors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-10"
          />
        </div>

        {/* Vendors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full text-center py-12 text-gray-500">Loading vendors...</div>
          ) : vendors.length === 0 ? (
            <div className="col-span-full text-center py-12 text-gray-500">No vendors found</div>
          ) : (
            vendors.map((vendor) => (
              <div key={vendor.id} className="card hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary-orange bg-opacity-10 flex items-center justify-center font-poppins font-bold text-primary-orange">
                    {vendor.name.charAt(0)}
                  </div>
                  <button className="p-2 hover:bg-light rounded-lg transition-colors">
                    <MoreVertical size={16} className="text-gray-600" />
                  </button>
                </div>

                <h3 className="text-lg font-poppins font-bold text-dark-navy mb-1">{vendor.name}</h3>
                <p className="text-sm text-gray-600 font-inter mb-4">{vendor.foodType}</p>

                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < Math.round(vendor.rating || 0) ? 'fill-warning text-warning' : 'text-gray-300'}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">({vendor.rating})</span>
                </div>

                <div className="space-y-2 mb-4 pb-4 border-b border-gray-100">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Location</span>
                    <span className="font-semibold text-dark-navy">{vendor.location}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Orders</span>
                    <span className="font-semibold text-dark-navy">{vendor.ordersCompleted}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Avg Order Value</span>
                    <span className="font-semibold text-dark-navy">₵{vendor.averageOrderValue.toFixed(2)}</span>
                  </div>
                </div>

                <span className={`inline-block text-xs px-3 py-1 rounded-full font-semibold ${
                  vendor.status === 'active'
                    ? 'bg-success bg-opacity-10 text-success'
                    : vendor.status === 'inactive'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {vendor.status.toUpperCase()}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}