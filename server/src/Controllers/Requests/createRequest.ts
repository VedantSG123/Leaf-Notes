import asynchandler from "express-async-handler"
import { Request } from "../../Models/requestModel"
import { Response } from "express"
import { AuthRequest } from "../../Middleware/protect"
import { Note } from "../../Models/noteModel"

const createRequest = asynchandler(async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    res.status(401)
    throw new Error("Invalid token")
  }

  const { noteId, collabId } = req.body
  if (!noteId || !collabId) {
    res.status(400)
    throw new Error("Invalid Parameters")
  }

  const note = await Note.findById(noteId)
  if (!note) {
    res.status(404)
    throw new Error("cannot find the note.")
  }

  if (req.user._id.toString() !== note.author.toString()) {
    res.status(403)
    throw new Error("Only note author is allowed to add collaborators")
  }

  const exist = await Request.find({
    sender: req.user._id,
    receiver: collabId,
    note: noteId,
  })

  if (exist.length > 0) {
    res.status(405)
    throw new Error("Request already exists")
  }

  const request = await Request.create({
    sender: req.user._id,
    receiver: collabId,
    note: noteId,
  })

  if (request) {
    res.status(200).json(request)
  } else {
    res.status(500)
    throw new Error("Internal server error.")
  }
})

export default createRequest
