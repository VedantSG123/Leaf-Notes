import asynchandler from "express-async-handler"
import { Request, Response, NextFunction } from "express"
import { AuthRequest } from "../Middleware/protect"
import { User } from "../Models/userModel"
import generateToken from "../Config/generateToken"

const registerUser = asynchandler(async (req: Request, res: Response) => {
  const { name, email, password, picture } = req.body
  if (!name || !email || !password) {
    res.status(400)
    throw new Error("Please enter all fields")
  }

  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error("User with this email already exists")
  }

  const user = await User.create({
    name,
    email,
    password,
  })
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error("Failed to create User")
  }
})

const authUser = asynchandler(async (req: Request, res: Response) => {
  const { email, password } = req.body
  if (!email || !password) {
    res.status(400)
    throw new Error("Please enter all fields")
  }
  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(200)
    throw new Error("Password Verification Failed")
  }
})

const verifyUser = asynchandler(async (req: AuthRequest, res: Response) => {
  const user = req.user
  if (user) {
    res.json(user)
  } else {
    res.status(400)
    throw new Error("User not found")
  }
})

const searchUser = asynchandler(async (req: AuthRequest, res: Response) => {
  if (req.user) {
    const searchq = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {}

    const users = await User.find({
      ...searchq,
      _id: { $ne: req.user._id },
    }).select("-password")

    res.status(200)
    res.json(users)
  } else {
    res.status(400)
    throw new Error("User not found")
  }
})

const getUser = asynchandler(async (req: AuthRequest, res: Response) => {
  const accountId = req.query.accountId
  try {
    const account = await User.findById(accountId).select("-password")
    res.status(200)
    res.json(account)
  } catch (err) {
    res.status(500)
    throw new Error("Internal Server Error")
  }
})

export { registerUser, authUser, verifyUser, searchUser, getUser }
