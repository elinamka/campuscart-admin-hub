import express, { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import { sendSuccess, sendError } from '../utils/response'
import { startOfDay, startOfWeek, endOfDay, endOfWeek } from 'date-fns'

const router = Router()
const prisma = new PrismaClient()

// Get dashboard metrics
router.get('/dashboard', async (req, res) => {
  try {
    const today = new Date()
    const startOfToday = startOfDay(today)
    const endOfToday = endOfDay(today)

    // Total orders today
    const totalOrdersToday = await prisma.order.count({
      where: {
        createdAt: {
          gte: startOfToday,
          lte: endOfToday,
        },
      },
    })

    // Revenue today
    const revenueToday = await prisma.order.aggregate({
      _sum: { amount: true },
      where: {
        createdAt: {
          gte: startOfToday,
          lte: endOfToday,
        },
        paymentStatus: 'completed',
      },
    })

    // Revenue this week
    const startOfThisWeek = startOfWeek(today)
    const endOfThisWeek = endOfWeek(today)

    const revenueThisWeek = await prisma.order.aggregate({
      _sum: { amount: true },
      where: {
        createdAt: {
          gte: startOfThisWeek,
          lte: endOfThisWeek,
        },
        paymentStatus: 'completed',
      },
    })

    // Active customers
    const activeCustomers = await prisma.customer.count({
      where: { status: 'active' },
    })

    // Active vendors
    const activeVendors = await prisma.vendor.count({
      where: { status: 'active' },
    })

    // Scheduled orders
    const scheduledOrders = await prisma.order.count({
      where: {
        orderStatus: { in: ['pending', 'vendor-confirmed', 'preparing'] },
      },
    })

    const metrics = {
      totalOrdersToday,
      revenueToday: revenueToday._sum.amount || 0,
      revenueThisWeek: revenueThisWeek._sum.amount || 0,
      scheduledOrders,
      activeCustomers,
      activeVendors,
      deliverySuccessRate: 98.5,
      averageDeliveryTime: 18.5,
    }

    sendSuccess(res, metrics)
  } catch (error) {
    sendError(res, 'Failed to fetch dashboard metrics', 500)
  }
})

// Get revenue trends
router.get('/revenue-trends', async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        paymentStatus: 'completed',
      },
      select: {
        createdAt: true,
        amount: true,
      },
      orderBy: { createdAt: 'asc' },
    })

    const trends = orders.reduce((acc: any, order) => {
      const date = new Date(order.createdAt).toISOString().split('T')[0]
      const existing = acc.find((t: any) => t.date === date)
      if (existing) {
        existing.revenue += order.amount
        existing.orders += 1
      } else {
        acc.push({
          date,
          revenue: order.amount,
          orders: 1,
        })
      }
      return acc
    }, [])

    sendSuccess(res, trends)
  } catch (error) {
    sendError(res, 'Failed to fetch revenue trends', 500)
  }
})

// Get vendor performance
router.get('/vendor-performance', async (req, res) => {
  try {
    const vendors = await prisma.vendor.findMany({
      include: {
        orders: true,
      },
    })

    const performance = vendors.map((vendor) => ({
      vendor: vendor.name,
      orders: vendor.orders.length,
      revenue: vendor.orders.reduce((sum, order) => sum + order.amount, 0),
      rating: vendor.rating,
    }))

    sendSuccess(res, performance.sort((a, b) => b.orders - a.orders))
  } catch (error) {
    sendError(res, 'Failed to fetch vendor performance', 500)
  }
})

// Get customer growth
router.get('/customer-growth', async (req, res) => {
  try {
    const customers = await prisma.customer.findMany({
      select: {
        createdAt: true,
      },
      orderBy: { createdAt: 'asc' },
    })

    const growth = customers.reduce((acc: any, customer) => {
      const week = Math.ceil(
        (new Date(customer.createdAt).getTime() - new Date(customers[0].createdAt).getTime()) /
          (7 * 24 * 60 * 60 * 1000)
      )
      const existing = acc.find((g: any) => g.week === week)
      if (existing) {
        existing.count += 1
      } else {
        acc.push({
          week: `Week ${week}`,
          count: 1,
        })
      }
      return acc
    }, [])

    sendSuccess(res, growth)
  } catch (error) {
    sendError(res, 'Failed to fetch customer growth', 500)
  }
})

export default router