import express from "express"
import {
  admins_index,
  admin_delete,
  admin_details,
  admin_patch,
  admin_put
} from "../controllers/admin.controllers.js"
import { isSuperAdmin, protect } from "../middleware/auth.middleware.js"

const router = express.Router()

router.route("/").get(admins_index).patch(protect, isSuperAdmin, admin_patch)

router
  .route("/:id")
  .get(admin_details)
  .put(protect, isSuperAdmin, admin_put)
  .patch(protect, isSuperAdmin, admin_patch)
  .delete(protect, isSuperAdmin, admin_delete)

export default router
