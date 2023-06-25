import mongoose from "mongoose"
import bcrypt from "bcrypt"

interface IUser extends mongoose.Document {
  password: string
  name: string
  email: string
  matchPassword(password: string): boolean
}

const userModel = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
)

userModel.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userModel.pre<IUser>("save", async function (next) {
  const user = this
  if (!user.isModified()) {
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(user.password, salt)
})

const User = mongoose.model("User", userModel)
export { User, IUser }
