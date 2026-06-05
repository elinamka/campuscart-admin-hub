import { Order, Customer, Vendor, DashboardMetrics } from './types'

export const sampleMetrics: DashboardMetrics = {
  totalOrdersToday: 47,
  revenueToday: 1240.50,
  revenueThisWeek: 8932.75,
  scheduledOrders: 23,
  activeCustomers: 342,
  activeVendors: 8,
  deliverySuccessRate: 98.5,
  averageDeliveryTime: 18.5,
}

export const sampleOrders: Order[] = [
  {
    id: '1',
    orderId: 'ORD-001',
    studentName: 'Kwame Mensah',
    phoneNumber: '0501234567',
    vendorName: 'Aunty Muni',
    mealOrdered: 'Jollof Rice with Chicken',
    deliveryWindow: '12:00–12:20',
    deliveryLocation: 'Engineering Block B',
    paymentStatus: 'completed',
    orderStatus: 'delivered',
    amount: 25.50,
    createdAt: new Date('2024-01-10T08:30:00'),
    updatedAt: new Date('2024-01-10T12:15:00'),
  },
]

export const sampleCustomers: Customer[] = [
  {
    id: '1',
    name: 'Kwame Mensah',
    phoneNumber: '0501234567',
    email: 'kwame.mensah@knust.edu.gh',
    hostel: 'Hall 7',
    faculty: 'Engineering',
    orderHistory: 24,
    totalSpend: 580.50,
    favoriteVendors: ['Aunty Muni', 'Campus Grill'],
    status: 'active',
  },
]

export const sampleVendors: Vendor[] = [
  {
    id: '1',
    name: 'Aunty Muni',
    phoneNumber: '0209876543',
    foodType: 'Ghanaian Traditional',
    location: 'Central Cafeteria',
    ordersCompleted: 287,
    averageOrderValue: 24.50,
    status: 'active',
  },
]

export const sampleOrderTrends = [
  { date: 'Jan 1', orders: 32, revenue: 780 },
  { date: 'Jan 2', orders: 45, revenue: 1120 },
  { date: 'Jan 3', orders: 38, revenue: 950 },
  { date: 'Jan 4', orders: 52, revenue: 1320 },
  { date: 'Jan 5', orders: 48, revenue: 1210 },
  { date: 'Jan 6', orders: 41, revenue: 1040 },
  { date: 'Jan 7', orders: 55, revenue: 1380 },
  { date: 'Jan 8', orders: 47, revenue: 1240 },
  { date: 'Jan 9', orders: 50, revenue: 1280 },
  { date: 'Jan 10', orders: 47, revenue: 1240 },
]

export const sampleCustomerGrowth = [
  { date: 'Week 1', customers: 45 },
  { date: 'Week 2', customers: 78 },
  { date: 'Week 3', customers: 102 },
  { date: 'Week 4', customers: 145 },
  { date: 'Week 5', customers: 198 },
  { date: 'Week 6', customers: 256 },
  { date: 'Week 7', customers: 312 },
  { date: 'Week 8', customers: 342 },
]

export const sampleVendorPerformance = [
  { vendor: 'Aunty Muni', orders: 287, revenue: 7030 },
  { vendor: 'Campus Grill', orders: 242, revenue: 6050 },
  { vendor: 'Royal Kitchen', orders: 215, revenue: 5590 },
  { vendor: "Mama's Food", orders: 198, revenue: 4653 },
  { vendor: 'Ice Kenkey', orders: 156, revenue: 2964 },
]

export const sampleDeliveryWindows = [
  { window: '12:00–12:20', orders: 8 },
  { window: '12:20–12:40', orders: 12 },
  { window: '12:40–13:00', orders: 14 },
  { window: '13:00–13:20', orders: 10 },
  { window: '13:20–13:40', orders: 3 },
]

export const sampleMealCategories = [
  { category: 'Jollof Rice', orders: 45 },
  { category: 'Waakye', orders: 38 },
  { category: 'Fried Rice', orders: 32 },
  { category: 'Kenkey', orders: 28 },
  { category: 'Banku', orders: 22 },
  { category: 'Grilled Meat', orders: 18 },
]

export const sampleActivities = [
  {
    id: '1',
    type: 'order-received' as const,
    title: 'New Order Received',
    description: 'Kwame Mensah placed order ORD-001',
    timestamp: new Date('2024-01-10T08:30:00'),
  },
  {
    id: '2',
    type: 'payment-received' as const,
    title: 'Payment Received',
    description: 'GHS 25.50 payment from ORD-001',
    timestamp: new Date('2024-01-10T12:15:00'),
  },
]