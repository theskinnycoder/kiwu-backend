import { User } from '../models';

export const getAllDesigners = async () => await User.find({ role: 'DESIGNER' });

export const getDesignerByID = async ({ id }) => await User.findOne({ _id: id, role: 'DESIGNER' });

export const updateDesignerByID = async ({ id, username, email }) =>
  await User.findOneAndUpdate({ _id: id, role: 'DESIGNER' }, { username, email }, { new: true });

export const removeFromDesignersByID = async ({ id }) =>
  await User.findOneAndUpdate({ _id: id, role: 'DESIGNER' }, { role: 'CUSTOMER' }, { new: true });

export const removeFromDesignersByEmail = async ({ email }) =>
  await User.findOneAndUpdate({ email, role: 'DESIGNER' }, { role: 'CUSTOMER' }, { new: true });

export const makeAsDesignerByEmail = async ({ email }) =>
  User.findOne({ email }, { role: 'DESIGNER' }, { new: true });

export const deleteDesignerByID = async ({ id }) =>
  await User.findOneAndDelete({ id, role: 'DESIGNER' });
