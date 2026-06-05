import express, { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import { sendSuccess, sendError, sendPaginated } from '../utils/response'
import { validate, vendorSchema } from '../utils/validators'

const router = Router()
const prisma = new PrismaClient()

// Get all vendors
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10
    const skip = (page - 1) * limit
    const search = req.query.search as string

    const where = search ? {
      OR: [
        { name: { contains: search, mode: 'insensitive' as any } },
        { foodType: { contains: search, mode: 'insensitive' as any } },
        { location: { contains: search, mode: 'insensitive' as any } },
      ],
    } : {}

    const [vendors, total] = await Promise.all([
      prisma.vendor.findMany({
        where,
        skip,
        take: limit,
        include: {
          orders: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.vendor.count({ where }),
    ])

    sendPaginated(res, vendors, total, page, limit)
  } catch (error) {
    sendError(res, 'Failed to fetch vendors', 500)
  }
})

// Get single vendor
router.get('/:id', async (req, res) => {
  try {
    const vendor = await prisma.vendor.findUnique({
      where: { id: req.params.id },
      include: {
        orders: true,
      },
    })

    if (!vendor) {
      return sendError(res, 'Vendor not found', 404)
    }

    sendSuccess(res, vendor)
  } catch (error) {
    sendError(res, 'Failed to fetch vendor', 500)
  }
})

// Create vendor
router.post('/', async (req, res) => {
  try {
    const data = validate(vendorSchema, req.body)

    const vendor = await prisma.vendor.create({
      data: {
        name: data.name,
        phoneNumber: data.phoneNumber,
        foodType: data.foodType,
        location: data.location,
      },
    })

    sendSuccess(res, vendor, 'Vendor created successfully', 201)
  } catch (error: any) {
    sendError(res, error.message || 'Failed to create vendor', 400)
  }
})

// Update vendor
router.patch('/:id', async (req, res) => {
  try {
    const { name, foodType, location, notes, status } = req.body

    const vendor = await prisma.vendor.update({
      where: { id: req.params.id },
      data: {
        ...(name && { name }),
        ...(foodType && { foodType }),
        ...(location && { location }),
        ...(notes && { notes }),
        ...(status && { status }),
      },
    })

    sendSuccess(res, vendor, 'Vendor updated successfully')
  } catch (error) {
    sendError(res, 'Failed to update vendor', 500)
  }
})

// Delete vendor
router.delete('/:id', async (req, res) => {
  try {
    await prisma.vendor.delete({
      where: { id: req.params.id },
    })

    sendSuccess(res, { id: req.params.id }, 'Vendor deleted successfully')
  } catch (error) {
    sendError(res, 'Failed to delete vendor', 500)
  }
})

export default router