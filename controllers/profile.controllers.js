import asyncHandler from "express-async-handler"
import {
  deleteProfileByID,
  getProfileByID,
  updateProfileByID
} from "../services/profile.services.js"
import { COOKIE_NAME, __is_prod__ } from "../utils/constants.js"
import { encodeJWT } from "../utils/tokens.js"

export const profile_details = asyncHandler(async (req, res) => {
  const profile = await getProfileByID(req?.user._id)

  if (profile) {
    res.json({ data: { profile } })
  } else {
    res.status(404)
    throw new Error("Profile not found")
  }
})

export const profile_put = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body
  const { updatedProfile, prevPassword } = await updateProfileByID({
    id: req?.user._id,
    username,
    email,
    password
  })

  const hasPasswordChanged = prevPassword !== password

  if (updatedProfile) {
    if (hasPasswordChanged)
      res.cookie(COOKIE_NAME, await encodeJWT({ id }), {
        httpOnly: true,
        sameSite: true,
        secure: __is_prod__,
        maxAge: 364 * 24 * 60 * 60 * 1000
      })

    res.json({
      data: { updatedProfile },
      msg: `Your profile is updated${
        hasPasswordChanged ? " and the password is changed" : ""
      }`
    })
  } else {
    res.status(404)
    throw new Error("Profile not found")
  }
})

export const profile_delete = asyncHandler(async (req, res) => {
  const deletedProfile = await deleteProfileByID(req?.user.id)

  if (deletedProfile) {
    res.cookie(COOKIE_NAME, "", { maxAge: 0 })
    req.user = null
    res.json({
      data: { deletedProfile },
      msg: "Your account has been deleted"
    })
  } else {
    res.status(404)
    throw new Error("Profile not found")
  }
})
