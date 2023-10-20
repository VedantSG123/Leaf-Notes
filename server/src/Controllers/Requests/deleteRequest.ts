import asynchandler from "express-async-handler"
import { Request } from "../../Models/requestModel"
import { Response } from "express"
import { AuthRequest } from "../../Middleware/protect"

const deleteRequest = asynchandler(async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    res.status(401)
    throw new Error("Invalid token")
  }

  if (!req.query.requestId) {
    res.status(400)
    throw new Error("Invalid Params")
  }

  const request = await Request.findById(req.query.requestId)
  if (!request) {
    res.status(404)
    throw new Error("Cannot find the request")
  }

  if (request.receiver.toString() !== req.user._id.toString()) {
    res.status(403)
    throw new Error("Not authorized to reject this request")
  }

  if (request.status === "accepted") {
    res.status(403)
    throw new Error("Cannot reject the request which has been already accepted")
  }

  await Request.findByIdAndDelete(req.query.requestId)
  res.status(200).json("Request rejected successfully")
})

export default deleteRequest
