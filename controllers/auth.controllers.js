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
    res.cookie(COOKIE_NAME, await encodeJWT({ id: newUser.id }), {
      httpOnly: true,
      sameSite: true,
      secure: __is_prod__,
      maxAge: 364 * 24 * 60 * 60 * 1000
    })
    res
      .status(201)
      .json({ data: { newUser }, msg: `Welcome aboard, ${username}` })
  }
})

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await getUserByEmail(email)

  if (user) {
    if (await user.matchPasswords(password)) {
      res.cookie(COOKIE_NAME, await encodeJWT({ id: user.id }), {
        httpOnly: true,
        sameSite: true,
        secure: __is_prod__,
        maxAge: 364 * 24 * 60 * 60 * 1000
      })
      res
        .status(201)
        .json({ data: { user }, msg: `Welcome back, ${user.username}` })
    } else throw new Error("Invalid Credentials!")
  } else {
    throw new Error("There isn't any account registered with that EmailID")
  }
})

export const logout = asyncHandler(async (req, res) => {
  if (req.cookies[COOKIE_NAME] && req.user) {
    res.cookie(COOKIE_NAME, "", { maxAge: 0 })
    req.user = null
    res.json({ msg: "Logging Out" })
  } else throw new Error("Already Logged Out")
})
