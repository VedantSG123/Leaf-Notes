import express from "express"
import {
  registerUser,
  authUser,
  verifyUser,
} from "../Controllers/userControllers"
import { protect } from "../Middleware/protect"

const router = express.Router()

router.route("/").post(registerUser)
router.post("/login", authUser)
router.get("/verify", protect, verifyUser)

export default router
