import User from "../models/User.model.js"

export const getUserByEmail = async email => {
  try {
    return await User.findOne({ email }).select("+password")
  } catch (error) {
    console.log(error.message)
    return null
  }
}

export const createUser = async ({ username, email, password }) => {
  try {
    return await User.create({ username, email, password })
  } catch (error) {
    console.log(error.message)
    return null
  }
}