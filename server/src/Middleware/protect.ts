import jwt from "jsonwebtoken"
import asyncHandler from "express-async-handler"
import { Request, Response, NextFunction } from "express"
import { User, IUser } from "../Models/userModel"

interface AuthRequest extends Request {
  user?: IUser
}

const protect = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    let token
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1]
        const decode: any = jwt.verify(token, process.env.JWT_SECRET as string)

        const user = await User.findOne(decode._id).select("-password")
        if (!user) {
          res.status(401)
          throw new Error("User not found")
        }

        req.user = user
        next()
      } catch (err) {
        res.status(401)
        throw new Error("Authorization token failed")
      }
    }
    if (!token) {
      res.status(401)
      throw new Error("No Authorization token")
    }
  }
)

export { protect, AuthRequest }
