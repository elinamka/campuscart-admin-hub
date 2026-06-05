export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'manager' | 'staff'
}

export type OrderStatus = 'pending' | 'vendor-confirmed' | 'preparing' | 'collected' | 'on-way' | 'delivered' | 'cancelled'
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded'

export interface Order {
  id: string
  orderId: string
  studentName: string
  phoneNumber: string
  vendorName: string
  mealOrdered: string
  deliveryWindow: string
  deliveryLocation: string
  paymentStatus: PaymentStatus
  orderStatus: OrderStatus
  amount: number
  createdAt: Date
  updatedAt: Date
}

export interface Customer {
  id: string
  name: string
  phoneNumber: string
  email: string
  hostel: string
  faculty: string
  orderHistory: number
  totalSpend: number
  favoriteVendors: string[]
  status: 'active' | 'inactive'
}

export interface Vendor {
  id: string
  name: string
  phoneNumber: string
  foodType: string
  location: string
  ordersCompleted: number
  averageOrderValue: number
  status: 'active' | 'inactive' | 'archived'
}

export interface DashboardMetrics {
  totalOrdersToday: number
  revenueToday: number
  revenueThisWeek: number
  scheduledOrders: number
  activeCustomers: number
  activeVendors: number
  deliverySuccessRate: number
  averageDeliveryTime: number
}