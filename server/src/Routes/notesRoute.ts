import express from "express"
import { protect } from "../Middleware/protect"
import {
  createNote,
  getNotes,
  getANote,
  moveToTrash,
  recoverFromTrash,
  getTrashNotes,
  deletePermanent,
} from "../Controllers/noteControllers"

const router = express.Router()

router.post("/createNote", protect, createNote)
router.get("/getNotes", protect, getNotes)
router.get("/getANote", protect, getANote)
router.get("/moveToTrash", protect, moveToTrash)
router.get("/recoverFromTrash", protect, recoverFromTrash)
router.get("/getTrashNotes", protect, getTrashNotes)
router.delete("/deletePermanent", protect, deletePermanent)

export default router
