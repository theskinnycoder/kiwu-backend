import Order from "../models/Order.model.js"

export const createOrder = async ({ args, customer }) =>
  await Order.create({ ...args, customer })

export const getAllOrders = async ({ customer }) =>
  await Order.find({ customer })

export const getToBeDeliveredOrders = async () =>
  await Order.find({ isDelivered: false, isPaid: true })

export const getAllOrders = async ({ customer }) =>
  await Order.find({ customer })

export const getOrderByID = async ({ id, customer }) =>
  await Order.findOne({ id, customer })

export const updateOrderToPaid = async ({ id, customer, args }) =>
  await Order.findOneAndUpdate(
    { id, customer, isPaid: false },
    { isPaid: true, paidAt: Date.now(), paymentResult: args },
    { new: true }
  )

export const updateOrderToDelivered = async ({ id }) =>
  await Order.findOneAndUpdate(
    { id, isDelivered: false },
    { isDelivered: true, deliveredAt: Date.now() },
    { new: true }
  )
