import express from "express"
import {
  orders_index,
  orders_index_delivery_pending,
  order_details,
  order_details_delivery_pending,
  order_patch_to_delivered,
  order_patch_to_paid,
  order_post
} from "../controllers/order.controller.js"
import { isSuperAdmin, protect } from "../middleware/auth.middleware.js"

const router = express.Router()

router.get("/me", protect, orders_index).post(protect, order_post)
router.get("/me/:id", protect, order_details)
router.patch("/me/:id", protect, order_patch_to_paid)

// View, and mark as delivered pending products
router.get("/", protect, isSuperAdmin, orders_index_delivery_pending)
router.get("/:id", protect, isSuperAdmin, order_details_delivery_pending)
router.patch("/:id", protect, isSuperAdmin, order_patch_to_delivered)

export default router
