import api from '../api'

export const analyticsService = {
  getDashboardMetrics: async () => {
    const response = await api.get('/analytics/dashboard')
    return response.data.data
  },

  getRevenueTrends: async () => {
    const response = await api.get('/analytics/revenue-trends')
    return response.data.data
  },

  getVendorPerformance: async () => {
    const response = await api.get('/analytics/vendor-performance')
    return response.data.data
  },

  getCustomerGrowth: async () => {
    const response = await api.get('/analytics/customer-growth')
    return response.data.data
  },
}