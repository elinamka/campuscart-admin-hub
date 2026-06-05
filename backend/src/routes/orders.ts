import express, { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'
import { sendSuccess, sendError, sendPaginated } from '../utils/response'
import { validate, orderSchema } from '../utils/validators'

const router = Router()
const prisma = new PrismaClient()

// Get all orders with pagination
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10
    const skip = (page - 1) * limit

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        skip,
        take: limit,
        include: {
          customer: true,
          vendor: true,
          payment: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.order.count(),
    ])

    sendPaginated(res, orders, total, page, limit)
  } catch (error) {
    sendError(res, 'Failed to fetch orders', 500)
  }
})

// Get single order
router.get('/:id', async (req, res) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: req.params.id },
      include: {
        customer: true,
        vendor: true,
        payment: true,
      },
    })

    if (!order) {
      return sendError(res, 'Order not found', 404)
    }

    sendSuccess(res, order)
  } catch (error) {
    sendError(res, 'Failed to fetch order', 500)
  }
})

// Create order
router.post('/', async (req, res) => {
  try {
    const data = validate(orderSchema, req.body)

    const order = await prisma.order.create({
      data: {
        orderId: `ORD-${uuidv4().slice(0, 8).toUpperCase()}`,
        customerId: data.customerId,
        vendorId: data.vendorId,
        mealOrdered: data.mealOrdered,
        deliveryWindow: data.deliveryWindow,
        deliveryLocation: data.deliveryLocation,
        amount: data.amount,
      },
      include: {
        customer: true,
        vendor: true,
      },
    })

    // Log activity
    await prisma.activity.create({
      data: {
        type: 'order-received',
        title: 'New Order Received',
        description: `${order.customer.name} placed order ${order.orderId}`,
        relatedData: { orderId: order.id, customerId: data.customerId },
      },
    })

    sendSuccess(res, order, 'Order created successfully', 201)
  } catch (error: any) {
    sendError(res, error.message || 'Failed to create order', 400)
  }
})

// Update order
router.patch('/:id', async (req, res) => {
  try {
    const { orderStatus, paymentStatus, notes } = req.body

    const order = await prisma.order.update({
      where: { id: req.params.id },
      data: {
        ...(orderStatus && { orderStatus }),
        ...(paymentStatus && { paymentStatus }),
        ...(notes && { notes }),
      },
      include: {
        customer: true,
        vendor: true,
        payment: true,
      },
    })

    sendSuccess(res, order, 'Order updated successfully')
  } catch (error) {
    sendError(res, 'Failed to update order', 500)
  }
})

// Delete order
router.delete('/:id', async (req, res) => {
  try {
    await prisma.order.delete({
      where: { id: req.params.id },
    })

    sendSuccess(res, { id: req.params.id }, 'Order deleted successfully')
  } catch (error) {
    sendError(res, 'Failed to delete order', 500)
  }
})

// Get orders by customer
router.get('/customer/:customerId', async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: { customerId: req.params.customerId },
      include: {
        customer: true,
        vendor: true,
        payment: true,
      },
      orderBy: { createdAt: 'desc' },
    })

    sendSuccess(res, orders)
  } catch (error) {
    sendError(res, 'Failed to fetch customer orders', 500)
  }
})

export default router