import User from "../models/User.model.js"

export const getAllAdmins = async () => await User.find({ role: "ADMIN" })

export const getAdminByID = async id => {
  try {
    return await User.findOne({ _id: id, role: "ADMIN" })
  } catch (error) {
    console.log(error.message)
    return null
  }
}

export const updateAdminByID = async ({ id, username, email }) => {
  try {
    return await User.findOneAndUpdate(
      { _id: id, role: "ADMIN" },
      { username, email },
      { new: true }
    )
  } catch (error) {
    console.log(error.message)
    return null
  }
}

export const removeFromAdminsByID = async ({ id }) => {
  try {
    return await User.findOneAndUpdate(
      { _id: id, role: "ADMIN" },
      { role: "CUSTOMER" },
      { new: true }
    )
  } catch (error) {
    console.log(error.message)
    return null
  }
}

export const removeFromAdminsByEmail = async ({ email }) => {
  try {
    return await User.findOneAndUpdate(
      { email, role: "ADMIN" },
      { role: "CUSTOMER" },
      { new: true }
    )
  } catch (error) {
    console.log(error.message)
    return null
  }
}

export const makeAsAdminByEmail = async ({ email }) => {
  try {
    return await User.findOne({ email }, { role: "ADMIN" }, { new: true })
  } catch (error) {
    console.log(error.message)
    return null
  }
}

export const deleteAdminByID = async id => {
  try {
    return await User.findOneAndDelete({ id, role: "ADMIN" })
  } catch (error) {
    console.log(error.message)
    return null
  }
}
