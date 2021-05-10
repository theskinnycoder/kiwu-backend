import User from "../models/User.model.js"

export const getAllAdmins = async () => await User.find({ role: "ADMIN" })

export const getAdminByID = async id =>
  await User.findOne({ _id: id, role: "ADMIN" })

export const updateAdminByID = async ({ id, username, email }) =>
  await User.findOneAndUpdate(
    { _id: id, role: "ADMIN" },
    { username, email },
    { new: true }
  )

export const removeFromAdminsByID = async ({ id }) =>
  await User.findOneAndUpdate(
    { _id: id, role: "ADMIN" },
    { role: "CUSTOMER" },
    { new: true }
  )

export const removeFromAdminsByEmail = async ({ email }) =>
  await User.findOneAndUpdate(
    { email, role: "ADMIN" },
    { role: "CUSTOMER" },
    { new: true }
  )

export const makeAsAdminByEmail = async ({ email }) =>
  User.findOne({ email }, { role: "ADMIN" }, { new: true })

export const deleteAdminByID = async id =>
  await User.findOneAndDelete({ id, role: "ADMIN" })
