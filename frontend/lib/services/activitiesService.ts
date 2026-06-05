import api from '../api'

export const activitiesService = {
  getAll: async (page = 1, limit = 20) => {
    const response = await api.get('/activities', {
      params: { page, limit },
    })
    return response.data
  },

  getRecent: async () => {
    const response = await api.get('/activities/recent')
    return response.data.data
  },
}