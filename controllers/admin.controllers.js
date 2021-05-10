import asyncHandler from "express-async-handler"
import {
  deleteAdminByID,
  getAdminByID,
  getAllAdmins,
  makeAsAdminByEmail,
  removeFromAdminsByEmail,
  removeFromAdminsByID,
  updateAdminByID
} from "../services/admin.services.js"

export const admins_index = asyncHandler(async (_req, res) => {
  const admins = await getAllAdmins()
  res.json({ data: admins })
})

export const admin_details = asyncHandler(async (req, res) => {
  const admin = await getAdminByID(req.params.id)

  if (admin) {
    res.json({ data: admin })
  } else {
    res.status(404)
    throw new Error("There is no Admin with this ID")
  }
})

export const admin_put = asyncHandler(async (req, res) => {
  const { username, email } = req.body

  const updatedAdmin = await updateAdminByID({
    id: req.params.id,
    username,
    email
  })

  if (updatedAdmin) {
    res.json({ data: updatedAdmin })
  } else {
    res.status(404)
    throw new Error("There is no Admin with this ID")
  }
})

export const admin_patch = asyncHandler(async (req, res) => {
  let updatedAdmin
  if (req.body.email)
    updatedAdmin = await removeFromAdminsByEmail({ email: req.body.email })
  else updatedAdmin = await removeFromAdminsByID({ id: req.params.id })

  if (updatedAdmin) {
    res.json({ data: updatedAdmin })
  } else {
    res.status(404)
    throw new Error("There is no Admin with this ID")
  }
})

export const admin_delete = asyncHandler(async (req, res) => {
  const deletedAdmin = await deleteAdminByID(req.params.id)

  if (deletedAdmin) {
    req.user = null
    res.cookie(COOKIE_NAME, "", { maxAge: 0 }).json({ data: deletedAdmin.id })
  } else {
    res.status(404)
    throw new Error("There is no Admin with this ID")
  }
})

export const make_admin = asyncHandler(async (req, res) => {
  const newAdmin = await makeAsAdminByEmail({ email: req.body.email })

  if (newAdmin) res.json({ data: newAdmin })
  else {
    res.status(404)
    throw new Error("Couldn't make this User as an Admin")
  }
})
