import express from "express"
import { login, logout, register } from "../controllers/auth.controllers.js"
import { protect } from "../middleware/auth.middleware.js"

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.post("/logout", protect, logout)

export default router
