import asynchandler from "express-async-handler"
import { Response } from "express"
import { AuthRequest } from "../../Middleware/protect"
import { Request, ICollaboratorRequest } from "../../Models/requestModel"
import { User } from "../../Models/userModel"


type Collaborator = {
  request: ICollaboratorRequest
  senderDetails: {
    _id: string
    name: string
    email: string
  }
}

const getAllRequest = asynchandler(async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    res.status(401)
    throw new Error("Invalid token")
  }
  const user = req.user._id

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
})

export default getAllRequest
