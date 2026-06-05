// Order Types
export type OrderStatus = 'pending' | 'vendor-confirmed' | 'preparing' | 'collected' | 'on-way' | 'delivered' | 'cancelled'
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded'
export type PaymentMethod = 'mobile-money' | 'paystack'

export interface CreateOrderDTO {
  customerId: string
  vendorId: string
  mealOrdered: string
  deliveryWindow: string
  deliveryLocation: string
  amount: number
}

export interface UpdateOrderDTO {
  orderStatus?: OrderStatus
  paymentStatus?: PaymentStatus
  notes?: string
}

// Customer Types
export interface CreateCustomerDTO {
  name: string
  phoneNumber: string
  email: string
  hostel: string
  faculty: string
}

export interface UpdateCustomerDTO {
  name?: string
  email?: string
  hostel?: string
  faculty?: string
  favoriteVendors?: string[]
  notes?: string
  status?: 'active' | 'inactive'
}

// Vendor Types
export interface CreateVendorDTO {
  name: string
  phoneNumber: string
  foodType: string
  location: string
}

export interface UpdateVendorDTO {
  name?: string
  foodType?: string
  location?: string
  notes?: string
  status?: 'active' | 'inactive' | 'archived'
}

// Payment Types
export interface CreatePaymentDTO {
  orderId: string
  method: PaymentMethod
  reference?: string
}

// Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  pages: number
}