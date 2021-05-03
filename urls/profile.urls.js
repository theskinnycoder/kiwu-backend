import express from "express"
import {
  profile_delete,
  profile_details,
  profile_put
} from "../controllers/profile.controllers.js"
import { protect } from "../middleware/auth.middleware.js"

const router = express.Router()

router
  .route("/")
  .get(protect, profile_details)
  .put(protect, profile_put)
  .delete(protect, profile_delete)

export default router
