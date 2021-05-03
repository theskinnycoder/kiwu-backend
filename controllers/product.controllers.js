import asyncHandler from "express-async-handler"
import {
  createProduct,
  declineProductByID,
  deleteProductByID,
  getAllProducts,
  getPendingProducts,
  getProductByID,
  getProductsByAdmin,
  getProductsByCategory,
  updateProductByID
} from "../services/product.services.js"

export const products_index = asyncHandler(async (_req, res) => {
  const products = await getAllProducts()
  res.json({ data: { products } })
})

export const products_by_category = asyncHandler(async (req, res) => {
  const productsByCategory = await getProductsByCategory({
    categories: req.body.categories
  })
  res.json({ data: productsByCategory })
})

export const products_by_admin = asyncHandler(async (req, res) => {
  const productsByAdmin = await getProductsByAdmin({ admin: req.body.admin })
  res.json({ data: productsByAdmin })
})

export const product_details = asyncHandler(async (req, res) => {
  const product = await getProductByID(req.params.id)

  if (product) {
    res.json({ data: product })
  } else {
    res.status(404)
    throw new Error("Product not found")
  }
})

export const product_post = asyncHandler(async (req, res) => {
  const newProduct = await createProduct(req.body)
  if (newProduct)
    res
      .status(201)
      .json({ data: newProduct, msg: `${newProduct.name} has been added` })
  else throw new Error("Couldn't create the product")
})

export const product_put = asyncHandler(async (req, res) => {
  const updatedProduct = await updateProductByID({
    id: req.params.id,
    args: req.body
  })
  if (updatedProduct)
    res.json({
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
  res.json({ data: pendingProducts })
})

export const product_pending_details = asyncHandler(async (req, res) => {
  const pendingProduct = await getProductByID(req.params.id)
  res.json({ data: pendingProduct })
})

export const product_approve = asyncHandler(async (req, res) => {
  const approvedProduct = await approveProductByID(req.params.id)

  if (approvedProduct) {
    res.json({
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
      data: { declinedProductID: declinedProduct._id },
      msg: `${declinedProduct.admin.username}'s ${declinedProduct.name} is declined`
    })
  } else {
    res.status(404)
    throw new Error("Product not found")
  }
})
