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
  })
  if (notes) {
    res.status(201)
    res.json(notes)
  } else {
    res.status(400)
    throw new Error("Faild to get the notes")
  }
})

export { createNote, getNotes }
