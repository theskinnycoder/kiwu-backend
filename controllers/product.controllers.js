import asyncHandler from "express-async-handler";
import {
  createProduct,
  declineProductByID,
  deleteProductByID,
  getAllProducts,
  getPendingProducts,
  getProductByID,
  updateProductByID,
} from "../services/product.services.js";

export const products_index = asyncHandler(async (req, res) => {
  let products = [];

  const keywords = req.query.keyword
    ? {
        categories: { $regex: req.query.keyword },
        admin: { $regex: req.query.keyword },
      }
    : {};

  products = await getAllProducts(keywords);
  res.json({ data: products });
});

export const product_details = asyncHandler(async (req, res) => {
  const product = await getProductByID({ id: req.params.id });

  if (product) {
    res.json({ data: product });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export const product_post = asyncHandler(async (req, res) => {
  const newProduct = await createProduct({
    args: req.body,
    admin: req?.user._id,
  });
  if (newProduct) res.status(201).json({ data: newProduct });
  else throw new Error("Couldn't create the product");
});

export const product_put = asyncHandler(async (req, res) => {
  const updatedProduct = await updateProductByID({
    id: req.params.id,
    args: req.body,
    admin: req?.user._id,
  });
  if (updatedProduct) res.json({ data: updatedProduct });
  else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export const product_delete = asyncHandler(async (req, res) => {
  const deletedProduct = await deleteProductByID({
    id: req.params.id,
    admin: req?.user._id,
  });

  if (deletedProduct) {
    res.json({ data: deletedProduct._id });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// SUPER-ADMIN ONLY
export const products_pending_index = asyncHandler(async (_req, res) => {
  const pendingProducts = await getPendingProducts();
  res.json({ data: pendingProducts });
});

// SUPER-ADMIN ONLY
export const product_pending_details = asyncHandler(async (req, res) => {
  const pendingProduct = await getProductByID({ id: req.params.id });
  res.json({ data: pendingProduct });
});

// SUPER-ADMIN ONLY
export const product_approve = asyncHandler(async (req, res) => {
  const approvedProduct = await approveProductByID({ id: req.params.id });

  if (approvedProduct) {
    res.json({ data: approvedProduct });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// SUPER-ADMIN ONLY
export const product_decline = asyncHandler(async (req, res) => {
  const declinedProduct = await declineProductByID({ id: req.params.id });

  if (declinedProduct) {
    res.json({ data: declinedProduct._id });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
