import { Response } from 'express'
import { ApiResponse } from '../types'

export const sendSuccess = <T>(
  res: Response,
  data: T,
  message: string = 'Success',
  statusCode: number = 200
) => {
  res.status(statusCode).json({
    success: true,
    data,
    message,
  } as ApiResponse<T>)
}

export const sendError = (
  res: Response,
  error: string,
  statusCode: number = 500
) => {
  res.status(statusCode).json({
    success: false,
    error,
  })
}

export const sendPaginated = <T>(
  res: Response,
  data: T[],
  total: number,
  page: number,
  limit: number,
  statusCode: number = 200
) => {
  res.status(statusCode).json({
    success: true,
    data,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    },
  })
}