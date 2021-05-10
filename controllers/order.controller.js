import asyncHandler from "express-async-handler"
import {
  createOrder,
  getAllOrders,
  getOrderByID,
  getToBeDeliveredOrders,
  updateOrderToDelivered,
  updateOrderToPaid
} from "../services/order.services.js"

export const order_post = asyncHandler(async (req, res) => {
  const { orderItems } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error("No items in cart to order")
  } else {
    const createdOrder = await createOrder({
      args: req.body,
      customer: req?.user._id
    })

    res.status(201).json({ data: createdOrder })
  }
})

export const order_details = asyncHandler(async (req, res) => {
  const order = await getOrderByID({
    id: req.params.id,
    customer: req?.user._id
  })
  if (order) res.json({ data: order })
  else {
    res.status(404)
    throw new Error("Order not found")
  }
})

export const order_patch_to_paid = asyncHandler(async (req, res) => {
  const updatedOrder = await updateOrderToPaid({
    id: req.params.id,
    customer: req?.user._id,
    args: req.body
  })

  if (updatedOrder) res.json({ data: updatedOrder })
  else {
    res.status(404)
    throw new Error("Order not found")
  }
})

export const order_patch_to_delivered = asyncHandler(async (req, res) => {
  const updatedOrder = await updateOrderToDelivered({ id: req.params.id })

  if (updatedOrder) res.json({ data: updatedOrder })
  else {
    res.status(404)
    throw new Error("Order not found")
  }
})

export const orders_index = asyncHandler(async (req, res) => {
  const orders = await getAllOrders({ customer: req?.user._id })
  res.json({ data: orders })
})

export const orders_index_pending_delivered = asyncHandler(async (req, res) => {
  const orders = await getToBeDeliveredOrders()
  res.json({ data: orders })
})
