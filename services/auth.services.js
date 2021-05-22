import User from "../models/User.model.js";

export const getUserByEmail = async email =>
  await User.findOne({ email }).select("+password");

export const createUser = async ({ username, email, password }) => {
  const newUser = new User({ username, email, password });
  return await newUser.save();
};
