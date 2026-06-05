import express, { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import { sendSuccess, sendError, sendPaginated } from '../utils/response'
import { validate, customerSchema } from '../utils/validators'

const router = Router()
const prisma = new PrismaClient()

// Get all customers
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10
    const skip = (page - 1) * limit
    const search = req.query.search as string

    const where = search ? {
      OR: [
        { name: { contains: search, mode: 'insensitive' as any } },
        { email: { contains: search, mode: 'insensitive' as any } },
        { phoneNumber: { contains: search, mode: 'insensitive' as any } },
      ],
    } : {}

    const [customers, total] = await Promise.all([
      prisma.customer.findMany({
        where,
        skip,
        take: limit,
        include: {
          orders: true,
          payments: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.customer.count({ where }),
    ])

    sendPaginated(res, customers, total, page, limit)
  } catch (error) {
    sendError(res, 'Failed to fetch customers', 500)
  }
})

// Get single customer
router.get('/:id', async (req, res) => {
  try {
    const customer = await prisma.customer.findUnique({
      where: { id: req.params.id },
      include: {
        orders: true,
        payments: true,
      },
    })

    if (!customer) {
      return sendError(res, 'Customer not found', 404)
    }

    sendSuccess(res, customer)
  } catch (error) {
    sendError(res, 'Failed to fetch customer', 500)
  }
})

// Create customer
router.post('/', async (req, res) => {
  try {
    const data = validate(customerSchema, req.body)

    const customer = await prisma.customer.create({
      data: {
        name: data.name,
        phoneNumber: data.phoneNumber,
        email: data.email,
        hostel: data.hostel,
        faculty: data.faculty,
      },
    })

    sendSuccess(res, customer, 'Customer created successfully', 201)
  } catch (error: any) {
    sendError(res, error.message || 'Failed to create customer', 400)
  }
})

// Update customer
router.patch('/:id', async (req, res) => {
  try {
    const { name, email, hostel, faculty, favoriteVendors, notes, status } = req.body

    const customer = await prisma.customer.update({
      where: { id: req.params.id },
      data: {
        ...(name && { name }),
        ...(email && { email }),
        ...(hostel && { hostel }),
        ...(faculty && { faculty }),
        ...(favoriteVendors && { favoriteVendors }),
        ...(notes && { notes }),
        ...(status && { status }),
      },
    })

    sendSuccess(res, customer, 'Customer updated successfully')
  } catch (error) {
    sendError(res, 'Failed to update customer', 500)
  }
})

// Delete customer
router.delete('/:id', async (req, res) => {
  try {
    await prisma.customer.delete({
      where: { id: req.params.id },
    })

    sendSuccess(res, { id: req.params.id }, 'Customer deleted successfully')
  } catch (error) {
    sendError(res, 'Failed to delete customer', 500)
  }
})

export default router