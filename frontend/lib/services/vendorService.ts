import { Vendor, CreateVendorDTO, UpdateVendorDTO } from '../types'
import api from '../api'

export const vendorService = {
  getAll: async (page = 1, limit = 10, search = '') => {
    const response = await api.get('/vendors', {
      params: { page, limit, search },
    })
    return response.data
  },

  getById: async (id: string) => {
    const response = await api.get(`/vendors/${id}`)
    return response.data.data
  },

  create: async (data: CreateVendorDTO) => {
    const response = await api.post('/vendors', data)
    return response.data.data
  },

  update: async (id: string, data: UpdateVendorDTO) => {
    const response = await api.patch(`/vendors/${id}`, data)
    return response.data.data
  },

  delete: async (id: string) => {
    await api.delete(`/vendors/${id}`)
  },
}