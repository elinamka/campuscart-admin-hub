'use client'

import { DashboardLayout } from '@/components/layouts/DashboardLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function SchedulesPage() {
  const deliveryWindows = [
    { window: '12:00–12:20', capacity: 15, scheduled: 8, status: 'available' },
    { window: '12:20–12:40', capacity: 15, scheduled: 12, status: 'available' },
    { window: '12:40–13:00', capacity: 15, scheduled: 14, status: 'full' },
    { window: '13:00–13:20', capacity: 15, scheduled: 10, status: 'available' },
    { window: '13:20–13:40', capacity: 15, scheduled: 3, status: 'available' },
    { window: '13:40–14:00', capacity: 15, scheduled: 0, status: 'available' },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-success bg-opacity-10 text-success'
      case 'full':
        return 'bg-warning bg-opacity-10 text-warning'
      default:
        return 'bg-error bg-opacity-10 text-error'
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-poppins font-bold text-dark-navy mb-2">Delivery Schedules</h1>
          <p className="text-gray-600 font-inter">Manage delivery time windows and capacity</p>
        </div>

        {/* Daily Schedule */}
        <div className="card">
          <h2 className="text-lg font-poppins font-bold text-dark-navy mb-6">Today's Delivery Windows</h2>

          <div className="space-y-4">
            {deliveryWindows.map((item) => (
              <div key={item.window} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:border-gray-200 transition-colors">
                <div className="flex-1">
                  <p className="font-poppins font-semibold text-dark-navy">{item.window}</p>
                  <p className="text-sm text-gray-600 font-inter mt-1">
                    {item.scheduled} of {item.capacity} slots scheduled
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="flex-1 mx-8">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-orange h-2 rounded-full transition-all"
                      style={{ width: `${(item.scheduled / item.capacity) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <span className={`badge ${getStatusColor(item.status)}`}>
                  {item.status.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly View */}
        <div className="card">
          <h2 className="text-lg font-poppins font-bold text-dark-navy mb-6">Weekly Overview</h2>
          <p className="text-gray-600 font-inter">Weekly schedule view coming soon</p>
        </div>
      </div>
    </DashboardLayout>
  )
}