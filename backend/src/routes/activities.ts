import express, { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import { sendSuccess, sendError, sendPaginated } from '../utils/response'

const router = Router()
const prisma = new PrismaClient()

// Get all activities
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 20
    const skip = (page - 1) * limit

    const [activities, total] = await Promise.all([
      prisma.activity.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.activity.count(),
    ])

    sendPaginated(res, activities, total, page, limit)
  } catch (error) {
    sendError(res, 'Failed to fetch activities', 500)
  }
})

// Get recent activities
router.get('/recent', async (req, res) => {
  try {
    const activities = await prisma.activity.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
    })

    sendSuccess(res, activities)
  } catch (error) {
    sendError(res, 'Failed to fetch recent activities', 500)
  }
})

export default router