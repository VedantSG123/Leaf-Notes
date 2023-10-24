import asynchandler from "express-async-handler"
import { Response } from "express"
import { AuthRequest } from "../../Middleware/protect"
import { Note } from "../../Models/noteModel"
import { User } from "../../Models/userModel"

const getAllCollaborators = asynchandler(
  async (req: AuthRequest, res: Response) => {
    if (!req.user) {
      res.status(401)
      throw new Error("Invalid token")
    }

    if (!req.query.noteId) {
      res.status(400)
      throw new Error("Invalid Parameters")
    }

    const note = await Note.findById(req.query.noteId)
    if (!note) {
      res.status(404)
      throw new Error("Note does not exists")
    }

    const collaborators = note.collaborators
    const userArray = await User.find({ _id: { $in: collaborators } }).select(
      "-password"
    )
    const author = await User.findById(note.author).select("-password")
    if (!author) {
      throw new Error("Internal Server error")
    }
    userArray.push(author)
    res.status(200).json(userArray)
  }
)

export default getAllCollaborators
