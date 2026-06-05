import { Order, CreateOrderDTO, UpdateOrderDTO } from './types'
import api from './api'

export const orderService = {
  getAll: async (page = 1, limit = 10) => {
    const response = await api.get('/orders', {
      params: { page, limit },
    })
    return response.data
  },

  getById: async (id: string) => {
    const response = await api.get(`/orders/${id}`)
    return response.data.data
  },

  create: async (data: CreateOrderDTO) => {
    const response = await api.post('/orders', data)
    return response.data.data
  },

  update: async (id: string, data: UpdateOrderDTO) => {
    const response = await api.patch(`/orders/${id}`, data)
    return response.data.data
  },

  delete: async (id: string) => {
    await api.delete(`/orders/${id}`)
  },

  getByCustomerId: async (customerId: string) => {
    const response = await api.get(`/orders/customer/${customerId}`)
    return response.data.data
  },
}