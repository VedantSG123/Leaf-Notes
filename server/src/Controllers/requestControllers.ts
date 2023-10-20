import asynchandler from "express-async-handler"
import { Request, ICollaboratorRequest } from "../Models/requestModel"
import { Note, INote } from "../Models/noteModel"
import { User, IUser } from "../Models/userModel"
import { Response } from "express"
import { AuthRequest } from "../Middleware/protect"


type Collaborator = {
  request: ICollaboratorRequest
  senderDetails: {
    _id: string
    name: string
    email: string
  }
}

const createRequest = asynchandler(async (req: AuthRequest, res: Response) => {
  let user
  if (req.user) user = req.user._id
  else throw new Error("Invalid Token")
  const { noteId, collabId } = req.body

  const exist = await Request.find({
    sender: user,
    receiver: collabId,
    note: noteId,
  })

  if (exist.length > 0) {
    res.status(403)
    throw new Error("Request already sent.")
  }

  const request = await Request.create({
    sender: user,
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

const getAllRequests = asynchandler(async (req: AuthRequest, res: Response) => {
  let user
  if (req.user) user = req.user._id
  else throw new Error("Invalid Token")

  try {
    const requests = await Request.find({ receiver: user, status: "pending" })
    const result: Collaborator[] = []
    for (const request of requests) {
      const userDetails = await User.findById(request.sender).select(
        "-password"
      )
      if (userDetails) {
        result.push({
          request: request,
          senderDetails: {
            _id: userDetails._id,
            name: userDetails.name,
            email: userDetails.email,
          },
        })
      }
    }

    res.status(200)
    res.json(result)
  } catch (err) {
    res.status(500)
    res.json(`Error:Internal server error`)
  }
})

const acceptRequest = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Invalid Token" })
    }

    const user = req.user._id
    const { requestId } = req.body

    if (!requestId) {
      return res
        .status(400)
        .json({ error: "Request ID is required in the request body" })
    }

    const collabRequest = await Request.findById(requestId)
    if (!collabRequest) {
      return res.status(404).json({ error: "Request not found" })
    }

    if (user.toString() !== collabRequest.receiver.toString()) {
      return res.status(401).json({ error: "Not Authorised" })
    }

    if (collabRequest.status === "accepted") {
      return res.status(403).json({ error: "Request already accepted" })
    }
    const updatedRequest = await Request.findByIdAndUpdate(
      requestId,
      { status: "accepted" },
      { new: true }
    )
    if (!updatedRequest) {
      return res.status(404).json({ error: "Request not found" })
    }

    const note = await Note.findById(updatedRequest.note)

    if (note) {
      const updatedNote = await Note.findByIdAndUpdate(
        updatedRequest.note,
        {
          isGroupNote: true,
          $push: { collaborators: updatedRequest.receiver },
        },
        { new: true }
      )

      return res.status(200).json({
        message: "Request accepted successfully",
        updatedRequest,
      })
    } else {
      await Request.findByIdAndDelete(requestId)
      return res
        .status(404)
        .json({ error: "The Note has been deleted by the creator" })
    }
  } catch (error) {
    return res.status(500).json({ error: "An error occurred on the server" })
  }
}

const deleteRequest = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: "Invalid token" })
  }
  const requestId = req.query.requestId
  if (!requestId) {
    return res.status(403).json({ error: "Cannot find the request ID" })
  }

  try {
    const request = await Request.findById(requestId)
    if (!request) {
      return res.status(404).json({ error: "Request does not exist" })
    }

    if (request.status === "accepted") {
      return res
        .status(403)
        .json({ error: "Cannot decline already accepted request" })
    }

    if (request.receiver.toString() === req.user._id.toString()) {
      await Request.findByIdAndDelete(requestId)
      res.status(200).json({ message: "Successfully declined" })
    } else {
      return res.status(401).json({ error: "Not Authorised" })
    }
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" })
  }
}

const getAllCollaborators = async (req: AuthRequest, res: Response) => {
  const noteId = req.query.noteId
  if (!noteId) {
    return res.status(403).json({ error: "Invalid Parameters" })
  }
  if (!req.user) {
    return res.status(403).json({ error: "Invalid token" })
  }
  try {
    const note = await Note.findById(noteId)
    if (!note) {
      return res.status(404).json({ error: "Cannot find the note" })
    }
    const collaborators = note.collaborators
    const userArray = await User.find({ _id: { $in: collaborators } }).select(
      "-password"
    )
    return res.status(200).json(userArray)
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" })
  }
}

const removeCollaborator = async (req: AuthRequest, res: Response) => {
  const { noteId, collabId } = req.body
  if (!noteId || !collabId)
    return res.status(403).json({ error: "Invalid Parameters" })

  if (!req.user) {
    return res.status(403).json({ error: "Invalid token" })
  }

  try {
    const note = await Note.findById(noteId)
    if (!note) {
      return res.status(404).json({ error: "Cannot find note" })
    }

    if (note.author.toString() !== req.user._id.toString())
      return res
        .status(401)
        .json({ error: "Unauthorised to perform this action" })

    const updatedNote = await Note.findByIdAndUpdate(
      noteId,
      { $pull: { collaborators: collabId } },
      { new: true }
    )

    await Request.findOneAndDelete({
      sender: req.user._id,
      receiver: collabId,
      note: noteId,
      status: "accepted",
    })

    res.status(200).json(updatedNote?.collaborators)
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" })
  }
}

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

export {
  createRequest,
  getAllRequests,
  acceptRequest,
  deleteRequest,
  getAllCollaborators,
  removeCollaborator,
  getPreview,
}
