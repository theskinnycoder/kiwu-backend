import Product from "../models/Product.model.js";

export const getAllProducts = async keywords =>
  await Product.find({ approved: true, ...keywords });

export const getPendingProducts = async () =>
  await Product.find({ approved: false });

export const getProductByID = async ({ id }) => await Product.findById(id);

export const createProduct = async ({ args, admin }) =>
  await Product.create({ ...args, admin });

export const updateProductByID = async ({ id, args, admin }) =>
  await Product.findOneAndUpdate(
    { id, admin },
    { args, approved: false },
    { new: true },
  );

export const deleteProductByID = async ({ id, admin }) =>
  await Product.findOneAndDelete({ id, admin });

export const approveProductByID = async ({ id }) =>
  await Product.findOneAndUpdate(
    { id, approved: false },
    { appproved: true },
    { new: true },
  );

export const declineProductByID = async ({ id }) =>
  await Product.findOneAndDelete({ id, approved: false });

export const countProducts = async filters =>
  await Product.countDocuments({ ...filters });
