import asynchandler from "express-async-handler"
import { Note } from "../../Models/noteModel"
import { Request } from "../../Models/requestModel"
import { Response } from "express"
import { AuthRequest } from "../../Middleware/protect"

const removeCollaborator = asynchandler(
  async (req: AuthRequest, res: Response) => {
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
      throw new Error("Note does not exists")
    }

    if (note.author.toString() !== req.user._id.toString()) {
      res.status(403)
      throw new Error("Not authorized to perform this action")
    }

    const updatedNote = await Note.findByIdAndUpdate(
      noteId,
      { $pull: { collaborators: collabId } },
      { new: true }
    )

    if (!updatedNote) {
      throw new Error("Internal Server Error")
    }

    await Request.findOneAndDelete({
      sender: req.user._id,
      receiver: collabId,
      note: noteId,
      status: "accepted",
    })

    res.status(200)
    res.json(updatedNote.collaborators)
  }
)

export default removeCollaborator
