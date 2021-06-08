import { Category } from '../models';

export const getAllCategories = async () => await Category.find();

export const getCategoryByID = async ({ id }) => await Category.findById(id);

export const createCategory = async ({ name }) => await Category.create({ name });
