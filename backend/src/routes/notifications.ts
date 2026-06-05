# Notification routes - placeholder
import express, { Router } from 'express'
const router = Router()

router.get('/', (req, res) => {
  res.json({
    success: true,
    data: [
      {
        id: '1',
        title: 'New Order',
        message: 'Kwame Mensah placed order ORD-001',
        type: 'order',
        read: false,
        createdAt: new Date(),
      },
      {
        id: '2',
        title: 'Payment Received',
        message: 'Payment of ₵25.50 received',
        type: 'payment',
        read: false,
        createdAt: new Date(),
      },
    ],
  })
})

export default router