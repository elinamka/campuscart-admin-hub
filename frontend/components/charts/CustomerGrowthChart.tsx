'use client'

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { sampleCustomerGrowth } from '@/lib/sampleData'

export function CustomerGrowthChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={sampleCustomerGrowth}>
        <defs>
          <linearGradient id="colorCustomers" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="customers" stroke="#22C55E" fill="url(#colorCustomers)" />
      </AreaChart>
    </ResponsiveContainer>
  )
}