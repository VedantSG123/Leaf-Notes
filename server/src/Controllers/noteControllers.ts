import asynchandler from "express-async-handler"
import { Request, Response, NextFunction } from "express"
import { AuthRequest } from "../Middleware/protect"
import { Note, INote } from "../Models/noteModel"

const createNote = asynchandler(async (req: AuthRequest, res: Response) => {
  const { title, content, length } = req.body
  if (!req.user?._id) {
    throw new Error("Invalid token")
  }
  const author = req.user?._id

  const note = await Note.create({
    title: title,
    content: content,
    author: author,
    length: length,
  })
  if (note) {
    res.status(201).json(note)
  } else {
    res.status(404)
    throw new Error("Failed to Create a Note")
  }
})

const getNotes = asynchandler(async (req: AuthRequest, res: Response) => {
  const user = req.user?._id
  const notes: Array<INote> = await Note.find({
    author: user,
    isDeleted: false,
  }).sort({ updatedAt: -1 })
  if (notes) {
    res.status(201)
    res.json(notes)
  } else {
    res.status(400)
    throw new Error("Faild to get the notes")
  }
})

const getANote = asynchandler(async (req: AuthRequest, res: Response) => {
  const user = req.user?.id
  const noteId = req.query.noteId
  const note = await Note.findOne({
    _id: noteId,
  })
  if (note) {
    res.status(201)
    res.json(note)
  } else {
    res.status(400)
    throw new Error("Failed to get the note")
  }
})

const moveToTrash = asynchandler(async (req: AuthRequest, res: Response) => {
  const noteID = req.query.noteId

  try {
    const note = await Note.findOne({ _id: noteID })

    if (note) {
      const updatedNote = await Note.findByIdAndUpdate(
        noteID,
        { ...note.toObject(), isDeleted: true },
        { new: true }
      )

      if (updatedNote) {
        console.log(updatedNote)
        res
          .status(200)
          .json({
            message: "Note moved to trash successfully.",
            note: updatedNote,
          })
      } else {
        res
          .status(400)
          .json({ message: "Note not found or could not be updated." })
      }
    } else {
      res.status(400).json({ message: "No such note exists." })
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Internal server error." })
  }
})

export { createNote, getNotes, getANote, moveToTrash }
