import express from "express";
import {
  category_details,
  category_index,
  category_post,
} from "../controllers/category.controller.js";
import { isSuperAdmin, protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router
  .route("/")
  .get(category_index)
  .post(protect, isSuperAdmin, category_post);
router.get("/:id", category_details);

export default router;
