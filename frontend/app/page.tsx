'use client'

import { DashboardLayout } from '@/components/layouts/DashboardLayout'
import { Dashboard } from '@/components/pages/Dashboard'

export default function Home() {
  return (
    <DashboardLayout>
      <Dashboard />
    </DashboardLayout>
  )
}