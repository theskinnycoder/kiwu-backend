import asyncHandler from "express-async-handler"
import { getProfileByID } from "../services/profile.services.js"
import { COOKIE_NAME } from "../utils/constants.js"
import { decodeJWT } from "../utils/tokens.js"

// -- Private Routes' Protection Midddleware
export const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies[COOKIE_NAME]
  if (token) {
    const decoded = await decodeJWT(token)

    if (decoded) req.user = await getProfileByID(decoded.id)
    else throw new Error("UnAuthenticated! Please login again.")
    next()
  } else {
    res.status(401)
    throw new Error("UnAuthenticated! Please login again.")
  }
})

// -- Admin-Only Routes' Protection Midddleware
export const isAdmin = asyncHandler((req, res, next) => {
  if (req.user.role === "ADMIN") {
    next()
  } else {
    res.status(401)
    throw new Error("UnAuthorized as an Admin")
  }
})

// -- Super-Admin-Only Routes' Protection Midddleware
export const isSuperAdmin = asyncHandler((req, res, next) => {
  if (req.user.role === "SUPER-ADMIN") {
    next()
  } else {
    res.status(401)
    throw new Error("UnAuthorized as a Super-Admin")
  }
})
