import express from "express"
import { protect } from "../Middleware/protect"
import { createNote, getNotes } from "../Controllers/noteControllers"

const router = express.Router()

router.post("/createNote", protect, createNote)
router.get("/getNotes", protect, getNotes)

export default router
