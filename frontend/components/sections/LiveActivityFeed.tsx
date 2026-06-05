'use client'

import { sampleActivities } from '@/lib/sampleData'
import { ShoppingCart, DollarSign, CheckCircle, Package, Truck } from 'lucide-react'

const activityIcons: Record<string, any> = {
  'order-received': ShoppingCart,
  'payment-received': DollarSign,
  'vendor-confirmed': CheckCircle,
  'meal-collected': Package,
  'order-delivered': Truck,
}

export function LiveActivityFeed() {
  return (
    <div className="card">
      <h2 className="text-lg font-poppins font-bold text-dark-navy mb-6">Live Activity Feed</h2>
      <div className="space-y-4">
        {sampleActivities.map((activity) => {
          const IconComponent = activityIcons[activity.type]
          return (
            <div key={activity.id} className="flex gap-4 p-4 rounded-lg border border-gray-100 hover:bg-light">
              <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center">
                <IconComponent size={20} className="text-primary-orange" />
              </div>
              <div className="flex-1">
                <p className="font-inter font-semibold text-sm text-dark-navy">{activity.title}</p>
                <p className="font-inter text-sm text-gray-600 mt-1">{activity.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}