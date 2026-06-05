'use client'

import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts'
import { sampleDeliveryWindows } from '@/lib/sampleData'

const COLORS = ['#EA580C', '#F59E0B', '#3B82F6', '#22C55E', '#8B5CF6']

export function DeliveryWindowChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={sampleDeliveryWindows}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ window, orders }) => `${window}: ${orders}`}
          outerRadius={80}
          dataKey="orders"
        >
          {sampleDeliveryWindows.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `${value} orders`} />
        <Legend layout="vertical" verticalAlign="middle" align="right" />
      </PieChart>
    </ResponsiveContainer>
  )
}