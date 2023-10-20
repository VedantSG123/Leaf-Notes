import express from "express"
import {
  registerUser,
  authUser,
  verifyUser,
  searchUser,
  getUser,
} from "../Controllers/userControllers"
import { protect } from "../Middleware/protect"

const router = express.Router()

router.route("/").post(registerUser).get(protect, searchUser)
router.post("/login", authUser)
router.get("/verify", protect, verifyUser)
router.get("/getAccount", protect, getUser)

export default router
