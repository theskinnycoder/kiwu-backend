import express from "express"
import {
  orders_index,
  orders_index_pending_delivered,
  order_details,
  order_patch_to_delivered,
  order_patch_to_paid,
  order_post
} from "../controllers/order.controller.js"
import { isSuperAdmin, protect } from "../middleware/auth.middleware.js"

const router = express.Router()

router
  .route("/")
  .post(protect, order_post)
  .get(protect, isSuperAdmin, orders_index_pending_delivered)

router.get("/me", protect, orders_index)
router.get("/me/:id", protect, order_details)
router.patch("/me/:id/pay", protect, order_patch_to_paid)
router.patch("/me/:id/deliver", protect, isSuperAdmin, order_patch_to_delivered)

export default router
