'use client'

import { useState, useEffect } from 'react'
import { DashboardLayout } from '@/components/layouts/DashboardLayout'
import { Search, Download } from 'lucide-react'

export default function PaymentsPage() {
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // TODO: Fetch payments from API
    setLoading(false)
  }, [])

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-poppins font-bold text-dark-navy">Payments</h1>
            <p className="text-gray-600 font-inter mt-1">Track and manage payment transactions</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-light transition-colors font-inter font-medium">
            <Download size={18} />
            Export
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card">
            <p className="text-sm text-gray-600 mb-2">Total Revenue</p>
            <h3 className="text-3xl font-poppins font-bold text-dark-navy">₵12,450.50</h3>
            <p className="text-sm text-success font-inter mt-2">+8% from last week</p>
          </div>
          <div className="card">
            <p className="text-sm text-gray-600 mb-2">Pending Payments</p>
            <h3 className="text-3xl font-poppins font-bold text-warning">₵2,340.00</h3>
            <p className="text-sm text-gray-600 font-inter mt-2">12 transactions</p>
          </div>
          <div className="card">
            <p className="text-sm text-gray-600 mb-2">Success Rate</p>
            <h3 className="text-3xl font-poppins font-bold text-success">98.5%</h3>
            <p className="text-sm text-gray-600 font-inter mt-2">245 completed</p>
          </div>
        </div>

        {/* Coming Soon */}
        <div className="card text-center py-12">
          <p className="text-gray-600 font-inter text-lg">Payments management coming soon</p>
          <p className="text-gray-500 font-inter mt-2">This section will include detailed payment tracking and reporting</p>
        </div>
      </div>
    </DashboardLayout>
  )
}