'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { sampleOrderTrends } from '@/lib/sampleData'

export function OrderChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={sampleOrderTrends}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="orders" stroke="#EA580C" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  )
}