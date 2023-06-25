import jwt from "jsonwebtoken"
import { Types } from "mongoose"


const generateToken = (id:Types.ObjectId) => {
  const jwtSecret = process.env.JWT_SECRET ?? ''
  return jwt.sign({id}, jwtSecret, {
    expiresIn:"30d"
  })
}

export default generateToken