import Product from "../models/Product.model.js"

export const getAllProducts = async () => await Product.find()

export const getProductsByCategory = async ({ categories }) =>
  await Product.find({ ...categories, approved: true })

export const getProductsByAdmin = async ({ admin }) =>
  await Product.find({ admin, approved: true })

export const getPendingProducts = async () =>
  await Product.find({ approved: false })

export const getProductByID = async id => {
  try {
    return await Product.findById(id)
  } catch (error) {
    console.log(error.message)
    return null
  }
}

export const createProduct = async args => {
  try {
    return await Product.create(args)
  } catch (error) {
    console.log(error.message)
    return null
  }
}

export const updateProductByID = async ({ id, args }) => {
  try {
    return await Product.findByIdAndUpdate(id, { args }, { new: true })
  } catch (error) {
    console.log(error.message)
    return null
  }
}

export const deleteProductByID = async ({ id }) => {
  try {
    return await Product.findByIdAndDelete(id)
  } catch (error) {
    console.log(error.message)
    return null
  }
}

export const approveProductByID = async ({ id }) => {
  try {
    return await Product.findByIdAndUpdate(
      id,
      { appproved: true },
      { new: true }
    )
  } catch (error) {
    console.log(error.message)
    return null
  }
}

export const declineProductByID = async ({ id }) => {
  try {
    return await Product.findByIdAndDelete(id)
  } catch (error) {
    console.log(error.message)
    return null
  }
}

export const countProducts = async filters =>
  await Product.countDocuments({ ...filters })
