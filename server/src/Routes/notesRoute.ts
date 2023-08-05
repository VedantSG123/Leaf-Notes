import express from "express"
import { protect } from "../Middleware/protect"
import {
  createNote,
  getNotes,
  getANote,
  moveToTrash,
} from "../Controllers/noteControllers"

const router = express.Router()

router.post("/createNote", protect, createNote)
router.get("/getNotes", protect, getNotes)
router.get("/getANote", protect, getANote)
router.get("/moveToTrash", protect, moveToTrash)

export default router
