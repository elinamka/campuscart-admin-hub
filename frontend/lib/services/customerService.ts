import { Customer, CreateCustomerDTO, UpdateCustomerDTO } from '../types'
import api from '../api'

export const customerService = {
  getAll: async (page = 1, limit = 10, search = '') => {
    const response = await api.get('/customers', {
      params: { page, limit, search },
    })
    return response.data
  },

  getById: async (id: string) => {
    const response = await api.get(`/customers/${id}`)
    return response.data.data
  },

  create: async (data: CreateCustomerDTO) => {
    const response = await api.post('/customers', data)
    return response.data.data
  },

  update: async (id: string, data: UpdateCustomerDTO) => {
    const response = await api.patch(`/customers/${id}`, data)
    return response.data.data
  },

  delete: async (id: string) => {
    await api.delete(`/customers/${id}`)
  },
}