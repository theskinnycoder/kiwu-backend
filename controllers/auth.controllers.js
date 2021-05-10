import asyncHandler from "express-async-handler"
import { createUser, getUserByEmail } from "../services/auth.services.js"
import { COOKIE_NAME, __is_prod__ } from "../utils/constants.js"
import { encodeJWT } from "../utils/tokens.js"

export const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body

  if (await getUserByEmail(email))
    throw new Error(
      "There already exists an account registered with that email. Try Again"
    )
  else {
    const newUser = await createUser({ username, email, password })
    res
      .cookie(COOKIE_NAME, await encodeJWT({ id: newUser.id }), {
        httpOnly: true,
        sameSite: true,
        secure: __is_prod__,
        maxAge: 364 * 24 * 60 * 60 * 1000
      })
      .status(201)
      .json({ data: newUser })
  }
})

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await getUserByEmail(email)

  if (user) {
    if (await user.matchPasswords(password)) {
      res
        .cookie(COOKIE_NAME, await encodeJWT({ id: user.id }), {
          httpOnly: true,
          sameSite: true,
          secure: __is_prod__,
          maxAge: 364 * 24 * 60 * 60 * 1000
        })
        .json({ data: user })
    } else throw new Error("Invalid Credentials!")
  } else {
    throw new Error("There isn't any account registered with that EmailID")
  }
})

export const logout = asyncHandler(async (req, res) => {
  if (req.cookies[COOKIE_NAME] && req.user) {
    req.user = null
    res.status(404).cookie(COOKIE_NAME, "", { maxAge: 0 })
  } else throw new Error("Already Logged Out")
})
