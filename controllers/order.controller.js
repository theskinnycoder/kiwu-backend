import asyncHandler from 'express-async-handler';
import {
  createMyOrder,
  getAllMyOrders,
  getMyOrderByID,
  getToBeDeliveredOrderByID,
  getToBeDeliveredOrders,
  updateMyOrderToPaid,
  updateOrderToDelivered,
} from '../services/order.services';

export const ordersIndex = asyncHandler(async (req, res) => {
  const allOrders = await getAllMyOrders({ customer: req?.user._id });
  res.json({ data: allOrders });
});

export const orderDetails = asyncHandler(async (req, res) => {
  const order = await getMyOrderByID({
    id: req.params.id,
    customer: req?.user._id,
  });
  if (order) res.json({ data: order });
  else {
    res.status(404);
    throw new Error('Order not found');
  }
});

export const orderPost = asyncHandler(async (req, res) => {
  const { orderItems } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No items in cart to order');
  } else {
    const createdOrder = await createMyOrder({
      args: req.body,
      customer: req?.user._id,
    });

    res.status(201).json({ data: createdOrder });
  }
});

export const orderPatchToPaid = asyncHandler(async (req, res) => {
  const updatedOrder = await updateMyOrderToPaid({
    id: req.params.id,
    customer: req?.user._id,
    args: req.body,
  });

  if (updatedOrder) res.json({ data: updatedOrder });
  else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// SUPER-ADMIN ONLY
export const ordersIndexDeliveryPending = asyncHandler(async (req, res) => {
  const orders = await getToBeDeliveredOrders();
  res.json({ data: orders });
});

// SUPER-ADMIN ONLY
export const orderDetailsDeliveryPending = asyncHandler(async (req, res) => {
  const orders = await getToBeDeliveredOrderByID({ id: req.params.id });
  res.json({ data: orders });
});

// SUPER-ADMIN ONLY
export const orderPatchToDelivered = asyncHandler(async (req, res) => {
  const updatedOrder = await updateOrderToDelivered({ id: req.params.id });

  if (updatedOrder) res.json({ data: updatedOrder });
  else {
    res.status(404);
    throw new Error('Order not found');
  }
});
