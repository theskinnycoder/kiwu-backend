import asyncHandler from "express-async-handler"
import {
  createProduct,
  declineProductByID,
  deleteProductByID,
  getAllProducts,
  getPendingProducts,
  getProductByID,
  updateProductByID
} from "../services/product.services.js"

export const products_index = asyncHandler(async (req, res) => {
  let products = []

  const keywords = req.query.keyword
    ? {
        categories: { $regex: req.query.keyword },
        admin: { $regex: req.query.keyword }
      }
    : {}

  products = await getAllProducts({ keywords })
  res.json({ success: true, data: { products } })
})

export const product_details = asyncHandler(async (req, res) => {
  const product = await getProductByID(req.params.id)

  if (product) {
    res.json({ success: true, data: product })
  } else {
    res.status(404)
    throw new Error("Product not found")
  }
})

export const product_post = asyncHandler(async (req, res) => {
  const newProduct = await createProduct(req.body)
  if (newProduct)
    res.status(201).json({
      success: true,
      data: newProduct,
      msg: `${newProduct.name} has been added`
    })
  else throw new Error("Couldn't create the product")
})

export const product_put = asyncHandler(async (req, res) => {
  const updatedProduct = await updateProductByID({
    id: req.params.id,
    args: req.body
  })
  if (updatedProduct)
    res.json({
      success: true,
      data: updatedProduct,
      msg: `${updatedProduct.name}'s details are updated`
    })
  else {
    res.status(404)
    throw new Error("Product not found")
  }
})

export const product_delete = asyncHandler(async (req, res) => {
  const deletedProduct = await deleteProductByID(req.params.id)

  if (deletedProduct) {
    res.json({
      success: true,
      data: { deleteProductID: deletedProduct.id },
      msg: `${deletedProduct.name} is now deleted`
    })
  } else {
    res.status(404)
    throw new Error("Product not found")
  }
})

export const products_pending_index = asyncHandler(async (_req, res) => {
  const pendingProducts = await getPendingProducts()
  res.json({ success: true, data: pendingProducts })
})

export const product_pending_details = asyncHandler(async (req, res) => {
  const pendingProduct = await getProductByID(req.params.id)
  res.json({ success: true, data: pendingProduct })
})

export const product_approve = asyncHandler(async (req, res) => {
  const approvedProduct = await approveProductByID(req.params.id)

  if (approvedProduct) {
    res.json({
      success: true,
      data: { approvedProduct },
      msg: `${approvedProduct.admin.username}'s ${approvedProduct.name} is now approved`
    })
  } else {
    res.status(404)
    throw new Error("Product not found")
  }
})

export const product_decline = asyncHandler(async (req, res) => {
  const declinedProduct = await declineProductByID(req.params.id)

  if (declinedProduct) {
    res.json({
      success: true,
      data: { declinedProductID: declinedProduct._id },
      msg: `${declinedProduct.admin.username}'s ${declinedProduct.name} is declined`
    })
  } else {
    res.status(404)
    throw new Error("Product not found")
  }
})
