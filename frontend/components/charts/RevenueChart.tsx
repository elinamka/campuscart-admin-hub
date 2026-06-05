'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { sampleOrderTrends } from '@/lib/sampleData'

export function RevenueChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={sampleOrderTrends}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip formatter={(value) => `₵${value}`} />
        <Legend />
        <Bar dataKey="revenue" fill="#F59E0B" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}