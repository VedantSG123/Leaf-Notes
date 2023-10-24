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
  if (!req.user) {
    res.status(401)
    throw new Error("Invalid token")
  }
  const noteId = req.query.noteId
  const note = await Note.findOne({
    _id: noteId,
  })
  if (!note) {
    res.status(404)
    throw new Error("Cannot find the note with specified ID")
  }

  if (
    note.author.toString() !== req.user._id.toString() &&
    !note.collaborators.includes(req.user._id)
  ) {
    res.sendStatus(403)
    throw new Error("Not authorized to view/edit this note")
  }

  res.status(200)
  res.json(note)
})

const getSharedNotes = asynchandler(async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    res.status(401)
    throw new Error("Invalid token")
  }

  const notes = await Note.find({
    $or: [
      {
        author: req.user._id,
        isGroupNote: true,
      },
      {
        collaborators: {
          $in: [req.user._id],
        },
      },
    ],
  })

  if (!notes) {
    throw new Error("Internal server error")
  }

  res.status(200)
  res.json(notes)
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
        res.status(200).json({
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
    res.status(500).json({ message: "Internal server error." })
  }
})

const recoverFromTrash = asynchandler(
  async (req: AuthRequest, res: Response) => {
    const noteID = req.query.noteId

    try {
      const note = await Note.findOne({ _id: noteID })

      if (note) {
        const updatedNote = await Note.findByIdAndUpdate(
          noteID,
          { ...note.toObject(), isDeleted: false },
          { new: true }
        )

        if (updatedNote) {
          res.status(200).json({
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
      res.status(500).json({ message: "Internal server error." })
    }
  }
)

const getTrashNotes = asynchandler(async (req: AuthRequest, res: Response) => {
  const user = req.user?._id
  const notes: Array<INote> = await Note.find({
    author: user,
    isDeleted: true,
  }).sort({ updatedAt: -1 })
  if (notes) {
    res.status(201)
    res.json(notes)
  } else {
    res.status(400)
    throw new Error("Faild to get the notes")
  }
})

const deletePermanent = asynchandler(
  async (req: AuthRequest, res: Response) => {
    const noteID = req.query.noteId
    const deletedNote = await Note.findById(noteID)
    if (deletedNote) {
      if (deletedNote.isDeleted) {
        const deleted = await Note.findByIdAndDelete(deletedNote._id)
        if (!deleted) {
          res.status(500)
          throw new Error("Internal server error")
        } else {
          res.status(200)
          res.json({ message: `Successfully deleted:${noteID}` })
        }
      } else {
        res.status(403)
        throw new Error("Cannot delete this note")
      }
    } else {
      res.status(403)
      throw new Error("Document does not exits")
    }
  }
)

const updateANote = asynchandler(async (req: AuthRequest, res: Response) => {
  const newNote = req.body
  console.log(newNote)
  const newDoc = new Note(newNote)
  const updatedNote = await Note.findByIdAndUpdate(newDoc._id, newDoc, {
    new: true,
  })
  if (updatedNote) {
    res.status(200).json(updatedNote)
  } else {
    res.status(400)
    throw new Error("Failed to update content")
  }
})

export {
  createNote,
  getNotes,
  getANote,
  getSharedNotes,
  moveToTrash,
  recoverFromTrash,
  getTrashNotes,
  deletePermanent,
  updateANote,
}
