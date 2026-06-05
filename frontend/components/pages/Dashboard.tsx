'use client'

import { TrendingUp, Package, Clock, Users, Store, Percent, DollarSign, ShoppingCart } from 'lucide-react'
import { KPICard } from '@/components/ui/KPICard'
import { OrderChart } from '@/components/charts/OrderChart'
import { RevenueChart } from '@/components/charts/RevenueChart'
import { CustomerGrowthChart } from '@/components/charts/CustomerGrowthChart'
import { VendorPerformanceChart } from '@/components/charts/VendorPerformanceChart'
import { DeliveryWindowChart } from '@/components/charts/DeliveryWindowChart'
import { MealCategoriesChart } from '@/components/charts/MealCategoriesChart'
import { LiveActivityFeed } from '@/components/sections/LiveActivityFeed'
import { sampleMetrics } from '@/lib/sampleData'

export function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-poppins font-bold text-dark-navy mb-2">Dashboard</h1>
        <p className="text-gray-600 font-inter">Welcome to CampusCart Admin Hub. Here's your operations overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Total Orders Today" value={sampleMetrics.totalOrdersToday} icon={ShoppingCart} growth={12} />
        <KPICard title="Revenue Today" value={sampleMetrics.revenueToday} icon={DollarSign} currency growth={8} variant="success" />
        <KPICard title="Revenue This Week" value={sampleMetrics.revenueThisWeek} icon={TrendingUp} currency growth={15} variant="success" />
        <KPICard title="Scheduled Orders" value={sampleMetrics.scheduledOrders} icon={Clock} growth={5} variant="info" />
        <KPICard title="Active Customers" value={sampleMetrics.activeCustomers} icon={Users} growth={22} variant="success" />
        <KPICard title="Active Vendors" value={sampleMetrics.activeVendors} icon={Store} growth={0} />
        <KPICard title="Delivery Success Rate" value={sampleMetrics.deliverySuccessRate} icon={Percent} unit="%" growth={2} variant="success" />
        <KPICard title="Avg Delivery Time" value={sampleMetrics.averageDeliveryTime} icon={Package} unit=" min" growth={-1} variant="warning" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-lg font-poppins font-bold text-dark-navy mb-6">Orders Overview</h2>
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
          <h2 className="text-lg font-poppins font-bold text-dark-navy mb-6">Top Vendors</h2>
          <VendorPerformanceChart />
        </div>
        <div className="card">
          <h2 className="text-lg font-poppins font-bold text-dark-navy mb-6">Delivery Windows</h2>
          <DeliveryWindowChart />
        </div>
        <div className="card">
          <h2 className="text-lg font-poppins font-bold text-dark-navy mb-6">Top Meal Categories</h2>
          <MealCategoriesChart />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <LiveActivityFeed />
        </div>
        <div className="card">
          <h2 className="text-lg font-poppins font-bold text-dark-navy mb-6">Quick Stats</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-gray-100">
              <span className="font-inter text-sm text-gray-600">Avg Order Value</span>
              <span className="font-poppins font-bold">₵26.40</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-gray-100">
              <span className="font-inter text-sm text-gray-600">Orders per Hour</span>
              <span className="font-poppins font-bold">4.7</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-gray-100">
              <span className="font-inter text-sm text-gray-600">Peak Hours</span>
              <span className="font-poppins font-bold">12:00-13:00</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-inter text-sm text-gray-600">Return Customers</span>
              <span className="font-poppins font-bold">67%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}