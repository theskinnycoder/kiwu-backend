import User from "../models/User.model.js"

export const getProfileByID = async id => {
  try {
    return await User.findById(id)
  } catch (error) {
    console.log(error.message)
    return null
  }
}

export const updateProfileByID = async ({ id, username, email, password }) => {
  try {
    const user = await User.findById(id).select("+password")
    const prevPassword = user.password
    user.username = username
    user.email = email
    user.password = password
    return { updatedProfile: await user.save(), prevPassword }
  } catch (error) {
    console.log(error.message)
    return { updateProfile: null, prevPassword: "" }
  }
}

export const deleteProfileByID = async id => {
  try {
    return await User.findByIdAndDelete(id)
  } catch (error) {
    console.log(error.message)
    return null
  }
}
