'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { sampleMealCategories } from '@/lib/sampleData'

export function MealCategoriesChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={sampleMealCategories} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis dataKey="category" type="category" />
        <Tooltip formatter={(value) => `${value} orders`} />
        <Bar dataKey="orders" fill="#22C55E" radius={[0, 8, 8, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}