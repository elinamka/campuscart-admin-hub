# Settings routes - placeholder
import express, { Router } from 'express'
const router = Router()

router.get('/', (req, res) => {
  res.json({
    success: true,
    data: {
      businessName: 'CampusCart',
      email: 'admin@campuscart.com',
      phone: '+233XXXXXXXXX',
      location: 'KNUST Campus',
      timezone: 'GMT+0',
      currency: 'GHS',
    },
  })
})

export default router