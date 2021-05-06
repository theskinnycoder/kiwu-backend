import express from "express"
import {
  products_index,
  products_pending_index,
  product_approve,
  product_decline,
  product_delete,
  product_details,
  product_pending_details,
  product_post,
  product_put
} from "../controllers/product.controllers.js"
import {
  isAdmin,
  isSuperAdmin,
  protect
} from "../middleware/auth.middleware.js"

const router = express.Router()

router.route("/").get(products_index).post(protect, isAdmin, product_post)

router
  .route("/:id")
  .get(product_details)
  .put(protect, isAdmin, product_put)
  .delete(protect, isAdmin, product_delete)

// View, approve & decline pending products
router.get("/pending", protect, isSuperAdmin, products_pending_index)
router.get("/pending/:id", protect, isSuperAdmin, product_pending_details)
router.post("/pending/:id/approve", protect, isSuperAdmin, product_approve)
router.post("/pending/:id/decline", protect, isSuperAdmin, product_decline)

export default router
