import express, { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'
import { sendSuccess, sendError, sendPaginated } from '../utils/response'
import { validate, paymentSchema } from '../utils/validators'

const router = Router()
const prisma = new PrismaClient()

// Get all payments
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10
    const skip = (page - 1) * limit

    const [payments, total] = await Promise.all([
      prisma.payment.findMany({
        skip,
        take: limit,
        include: {
          order: true,
          customer: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.payment.count(),
    ])

    sendPaginated(res, payments, total, page, limit)
  } catch (error) {
    sendError(res, 'Failed to fetch payments', 500)
  }
})

// Get single payment
router.get('/:id', async (req, res) => {
  try {
    const payment = await prisma.payment.findUnique({
      where: { id: req.params.id },
      include: {
        order: true,
        customer: true,
      },
    })

    if (!payment) {
      return sendError(res, 'Payment not found', 404)
    }

    sendSuccess(res, payment)
  } catch (error) {
    sendError(res, 'Failed to fetch payment', 500)
  }
})

// Create payment
router.post('/', async (req, res) => {
  try {
    const data = validate(paymentSchema, req.body)

    const order = await prisma.order.findUnique({
      where: { id: data.orderId },
    })

    if (!order) {
      return sendError(res, 'Order not found', 404)
    }

    const payment = await prisma.payment.create({
      data: {
        transactionId: `TXN-${uuidv4().slice(0, 8).toUpperCase()}`,
        orderId: data.orderId,
        customerId: order.customerId,
        amount: order.amount,
        method: data.method,
        reference: data.reference,
        status: 'completed',
      },
      include: {
        order: true,
        customer: true,
      },
    })

    // Update order payment status
    await prisma.order.update({
      where: { id: data.orderId },
      data: { paymentStatus: 'completed' },
    })

    // Log activity
    await prisma.activity.create({
      data: {
        type: 'payment-received',
        title: 'Payment Received',
        description: `Payment of ₵${payment.amount} received for order ${order.orderId}`,
        relatedData: { paymentId: payment.id, orderId: data.orderId },
      },
    })

    sendSuccess(res, payment, 'Payment created successfully', 201)
  } catch (error: any) {
    sendError(res, error.message || 'Failed to create payment', 400)
  }
})

// Update payment
router.patch('/:id', async (req, res) => {
  try {
    const { status, notes } = req.body

    const payment = await prisma.payment.update({
      where: { id: req.params.id },
      data: {
        ...(status && { status }),
        ...(notes && { notes }),
      },
      include: {
        order: true,
        customer: true,
      },
    })

    sendSuccess(res, payment, 'Payment updated successfully')
  } catch (error) {
    sendError(res, 'Failed to update payment', 500)
  }
})

export default router