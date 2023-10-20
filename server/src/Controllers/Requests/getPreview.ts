import asynchandler from "express-async-handler"
import { AuthRequest } from "../../Middleware/protect"
import { Response } from "express"
import { Note } from "../../Models/noteModel"
import { Request } from "../../Models/requestModel"

const getPreview = asynchandler(async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    res.status(401)
    throw new Error("Invalid token")
  }
  const noteId = req.query.noteId
  if (!noteId) {
    res.status(404)
    throw new Error("Invalid Arguments")
  }
  const request = await Request.find({
    receiver: req.user.id,
    note: noteId,
    status: "pending",
  })
  if (!request || request.length === 0) {
    res.status(401)
    throw new Error("Unauthorised to view the note")
  }
  const note = await Note.findById(noteId)
  res.status(200).json(note)
})

export default getPreview
