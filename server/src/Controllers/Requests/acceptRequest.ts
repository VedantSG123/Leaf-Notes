import asynchandler from "express-async-handler"
import { Response } from "express"
import { AuthRequest } from "../../Middleware/protect"
import { Request } from "../../Models/requestModel"
import { Note } from "../../Models/noteModel"

const acceptRequest = asynchandler(async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    res.status(401)
    throw new Error("Invalid token")
  }

  const user = req.user._id
  const { requestId } = req.body

  if (!requestId) {
    res.status(400)
    throw new Error("Cannot find request id")
  }

  const collabRequest = await Request.findById(requestId)
  if (!collabRequest) {
    res.status(404)
    throw new Error("Cannot find the request")
  }

  if (collabRequest.receiver.toString() !== user.toString()) {
    res.status(403)
    throw new Error("Not authorized to accept this request")
  }

  if (collabRequest.status === "accepted") {
    res.status(403)
    throw new Error("Request already accepted")
  }
  const updatedRequest = await Request.findByIdAndUpdate(
    requestId,
    { status: "accepted" },
    { new: true }
  )

  if (!updatedRequest) {
    throw new Error("Failed to update data")
  }

  const note = Note.findById(updatedRequest.note)
  if (!note) {
    await Request.findByIdAndDelete(requestId)
    res.status(403)
    throw new Error("Note has been deleted by the creator")
  }

  const updatedNote = await Note.findByIdAndUpdate(
    updatedRequest.note,
    {
      isGroupNote: true,
      $push: { collaborators: updatedRequest.receiver },
    },
    { new: true }
  )

  res.status(200)
  res.json({
    message: "Request accepted successfully",
    updatedRequest,
  })
})

export default acceptRequest
