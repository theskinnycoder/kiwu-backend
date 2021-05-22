import asyncHandler from "express-async-handler";
import {
  createCategory,
  getAllCategories,
  getCategoryByID,
} from "../services/category.services.js";

export const category_index = asyncHandler(async (_req, res) => {
  const allCategories = await getAllCategories();
  res.json({ data: allCategories });
});

export const category_details = asyncHandler(async (req, res) => {
  const category = await getCategoryByID({ id: req.params.id });
  if (order) res.json({ data: category });
  else {
    res.status(404);
    throw new Error("Category not found");
  }
});

// SUPER-ADMIN ONLY
export const category_post = asyncHandler(async (req, res) => {
  const newCategory = await createCategory({ name: req.body.name });
  if (newCategory) res.json({ data: newCategory });
  else throw new Error("Couldn't create the Category");
});
