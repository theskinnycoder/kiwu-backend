import asyncHandler from "express-async-handler"
import User from "../models/User.model.js"
import { COOKIE_NAME } from "../utils/constants.js"
import { decodeJWT } from "../utils/tokens.js"

// -- Private Routes' Protection Midddleware
export const protect = asyncHandler(async (req, res, next) => {
  // 1. Get the JWT Cookie
  const token = req.cookies[COOKIE_NAME]
  // 1+. Check if the JWT Cookie is set
  if (token) {
    // 2. If the JWT Cookie is set, check if the payload of the JWT is valid
    const decoded = await decodeJWT(token)

    // 2+. If valid, pass the user to the protected route through the request object
    if (decoded) req.user = await User.findById(decoded.id)
    // 2-. If not valid, raise an exception
    else throw new Error("UnAuthenticated! Please login again.")
    next()
  } else {
    // 1-. If the JWT Cookie is not set, raise an exception
    res.status(401)
    throw new Error("UnAuthenticated! Please login again.")
  }
})

// -- Admin-Only Routes' Protection Midddleware
export const isAdmin = asyncHandler((req, res, next) => {
  // 1. Check if the current logged-in User is an ADMIN
  // 1+. If YES, proceed to the controller
  if (req.user.role === "ADMIN") {
    next()
  } else {
    // 1-. If NO, throw an error
    res.status(401)
    throw new Error("UnAuthorized as an Admin")
  }
})

// -- Super-Admin-Only Routes' Protection Midddleware
export const isSuperAdmin = asyncHandler((req, res, next) => {
  // 1. Check if the current logged-in User is a SUPER-ADMIN
  // 1+. If YES, proceed to the controller
  if (req?.user.role === "SUPER-ADMIN") {
    next()
  } else {
    // 1-. If NO, throw an error
    res.status(401)
    throw new Error("UnAuthorized as a Super-Admin")
  }
})
