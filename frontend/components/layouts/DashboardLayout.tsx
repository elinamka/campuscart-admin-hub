'use client'

import { ReactNode } from 'react'
import { Sidebar } from '@/components/navigation/Sidebar'
import { TopNav } from '@/components/navigation/TopNav'

export function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-light">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav />
        <main className="flex-1 overflow-auto">
          <div className="p-8">{children}</div>
        </main>
      </div>
    </div>
  )
}