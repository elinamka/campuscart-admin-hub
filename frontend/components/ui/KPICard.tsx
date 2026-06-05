import { LucideIcon } from 'lucide-react'

interface KPICardProps {
  title: string
  value: string | number
  icon: LucideIcon
  growth?: number
  currency?: boolean
  unit?: string
  variant?: 'default' | 'success' | 'warning' | 'error'
}

export function KPICard({
  title,
  value,
  icon: Icon,
  growth,
  currency = false,
  unit = '',
  variant = 'default',
}: KPICardProps) {
  const variantColors = {
    default: 'text-primary-orange',
    success: 'text-success',
    warning: 'text-warning',
    error: 'text-error',
  }

  return (
    <div className="card hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-inter text-gray-600 mb-2">{title}</p>
          <h3 className="text-3xl font-poppins font-bold text-dark-navy">
            {currency && '₵'}{value}{unit && <span className="text-lg text-gray-500">{unit}</span>}
          </h3>
          {growth !== undefined && (
            <p className={`text-sm font-inter mt-2 ${growth >= 0 ? 'text-success' : 'text-error'}`}>
              {growth >= 0 ? '+' : ''}{growth}% from last week
            </p>
          )}
        </div>
        <div className="p-3 rounded-lg bg-opacity-10 bg-gray-200">
          <Icon size={24} className={variantColors[variant]} />
        </div>
      </div>
    </div>
  )
}