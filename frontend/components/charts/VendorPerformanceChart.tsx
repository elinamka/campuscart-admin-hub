'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { sampleVendorPerformance } from '@/lib/sampleData'

export function VendorPerformanceChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={sampleVendorPerformance}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="vendor" angle={-45} textAnchor="end" height={80} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="orders" fill="#3B82F6" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}