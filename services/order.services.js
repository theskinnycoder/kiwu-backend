import { Order } from '../models';

export const createMyOrder = async ({ args, customer }) =>
  await Order.create({ ...args, customer });

export const getAllMyOrders = async ({ customer }) =>
  await Order.find({ customer, isDelivered: false });

export const getMyOrderByID = async ({ id, customer }) => await Order.findOne({ id, customer });

export const updateMyOrderToPaid = async ({ id, customer, args }) =>
  await Order.findOneAndUpdate(
    { id, customer, isPaid: false },
    { isPaid: true, paidAt: Date.now(), paymentResult: args },
    { new: true },
  );

export const getToBeDeliveredOrders = async () =>
  await Order.find({ isDelivered: false, isPaid: true });

export const getToBeDeliveredOrderByID = async ({ id }) =>
  await Order.findOne({ id, isDelivered: false, isPaid: true });

export const updateOrderToDelivered = async ({ id }) =>
  await Order.findOneAndUpdate(
    { id, isDelivered: false },
    { isDelivered: true, deliveredAt: Date.now() },
    { new: true },
  );
