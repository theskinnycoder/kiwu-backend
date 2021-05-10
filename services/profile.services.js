import User from "../models/User.model.js"

export const getProfileByID = async ({ id }) => await User.findById(id)

export const updateProfileByID = async ({ id, username, email, password }) => {
  const user = await User.findById(id).select("+password")
  const prevPassword = user.password
  user.username = username
  user.email = email
  user.password = password
  return { updatedProfile: await user.save(), prevPassword }
}

export const deleteProfileByID = async ({ id }) =>
  await User.findByIdAndDelete(id)
