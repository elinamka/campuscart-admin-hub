'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Package, Calendar, Users, CreditCard, Store, BarChart3, FileText, Bell, Settings, LogOut } from 'lucide-react'

export function Sidebar() {
  const pathname = usePathname()

  const menuItems = [
    { label: 'Dashboard', href: '/', icon: LayoutDashboard },
    { label: 'Orders', href: '/orders', icon: Package },
    { label: 'Schedules', href: '/schedules', icon: Calendar },
    { label: 'Customers', href: '/customers', icon: Users },
    { label: 'Payments', href: '/payments', icon: CreditCard },
    { label: 'Vendors', href: '/vendors', icon: Store },
    { label: 'Analytics', href: '/analytics', icon: BarChart3 },
    { label: 'Reports', href: '/reports', icon: FileText },
    { label: 'Notifications', href: '/notifications', icon: Bell },
    { label: 'Settings', href: '/settings', icon: Settings },
  ]

  return (
    <aside className="w-64 bg-dark-navy text-white flex flex-col h-screen overflow-y-auto">
      <div className="p-6 border-b border-dark-charcoal">
        <h1 className="text-xl font-poppins font-bold text-primary-orange">CampusCart</h1>
        <p className="text-xs text-gray-400 font-inter">Admin Hub</p>
      </div>

      <nav className="flex-1 px-3 py-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-primary-orange text-white'
                  : 'text-gray-300 hover:bg-dark-charcoal'
              }`}
            >
              <Icon size={20} />
              <span className="font-inter font-medium text-sm">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-dark-charcoal">
        <button className="w-full flex items-center gap-3 px-4 py-3 bg-error text-white rounded-lg hover:bg-red-600 transition-colors">
          <LogOut size={18} />
          <span className="font-inter font-medium text-sm">Logout</span>
        </button>
      </div>
    </aside>
  )
}