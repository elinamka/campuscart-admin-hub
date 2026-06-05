import Joi from 'joi'
import { CreateOrderDTO, CreateCustomerDTO, CreateVendorDTO, CreatePaymentDTO } from '../types'

export const orderSchema = Joi.object({
  customerId: Joi.string().required(),
  vendorId: Joi.string().required(),
  mealOrdered: Joi.string().required(),
  deliveryWindow: Joi.string().required(),
  deliveryLocation: Joi.string().required(),
  amount: Joi.number().positive().required(),
})

export const customerSchema = Joi.object({
  name: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  email: Joi.string().email().required(),
  hostel: Joi.string().required(),
  faculty: Joi.string().required(),
})

export const vendorSchema = Joi.object({
  name: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  foodType: Joi.string().required(),
  location: Joi.string().required(),
})

export const paymentSchema = Joi.object({
  orderId: Joi.string().required(),
  method: Joi.string().valid('mobile-money', 'paystack').required(),
  reference: Joi.string().optional(),
})

export const validate = (schema: Joi.ObjectSchema, data: any) => {
  const { error, value } = schema.validate(data, { abortEarly: false })
  if (error) {
    throw error
  }
  return value
}