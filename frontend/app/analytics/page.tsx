'use client'

import { useState, useEffect } from 'react'
import { DashboardLayout } from '@/components/layouts/DashboardLayout'
import { analyticsService } from '@/lib/services/analyticsService'
import { OrderChart } from '@/components/charts/OrderChart'
import { RevenueChart } from '@/components/charts/RevenueChart'
import { CustomerGrowthChart } from '@/components/charts/CustomerGrowthChart'
import { VendorPerformanceChart } from '@/components/charts/VendorPerformanceChart'
import { TrendingUp } from 'lucide-react'

export default function AnalyticsPage() {
  const [metrics, setMetrics] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMetrics()
  }, [])

  const fetchMetrics = async () => {
    try {
      setLoading(true)
      const data = await analyticsService.getDashboardMetrics()
      setMetrics(data)
    } catch (error) {
      console.error('Failed to fetch analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-poppins font-bold text-dark-navy mb-2">Analytics</h1>
          <p className="text-gray-600 font-inter">In-depth business intelligence and insights</p>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <h2 className="text-lg font-poppins font-bold text-dark-navy mb-6">Orders Trend</h2>
            <OrderChart />
          </div>
          <div className="card">
            <h2 className="text-lg font-poppins font-bold text-dark-navy mb-6">Revenue Trend</h2>
            <RevenueChart />
          </div>
          <div className="card">
            <h2 className="text-lg font-poppins font-bold text-dark-navy mb-6">Customer Growth</h2>
            <CustomerGrowthChart />
          </div>
          <div className="card">
            <h2 className="text-lg font-poppins font-bold text-dark-navy mb-6">Vendor Performance</h2>
            <VendorPerformanceChart />
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-2">Average Order Value</p>
                <h3 className="text-3xl font-poppins font-bold text-dark-navy">₵26.40</h3>
              </div>
              <div className="p-3 rounded-lg bg-orange-50">
                <TrendingUp size={24} className="text-primary-orange" />
              </div>
            </div>
            <p className="text-sm text-success font-inter mt-4">+5% increase from last month</p>
          </div>

          <div className="card">
            <div>
              <p className="text-sm text-gray-600 mb-2">Customer Lifetime Value</p>
              <h3 className="text-3xl font-poppins font-bold text-dark-navy">₵568.50</h3>
            </div>
            <p className="text-sm text-gray-600 font-inter mt-4">Average per customer</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}