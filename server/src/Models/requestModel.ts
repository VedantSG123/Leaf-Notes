import mongoose from "mongoose"
import { IUser } from "./userModel"
import { INote } from "./noteModel"

export interface ICollaboratorRequest extends mongoose.Document {
  sender: IUser["_id"]
  receiver: IUser["_id"]
  note: INote["_id"]
  status: string // pending, accepted, declined
}

const collaboratorRequestSchema = new mongoose.Schema<ICollaboratorRequest>({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  note: { type: mongoose.Schema.Types.ObjectId, ref: "Note", required: true },
  status: {
    type: String,
    enum: ["pending", "accepted", "declined"],
    default: "pending",
  },
})

const Request = mongoose.model("Request", collaboratorRequestSchema)
export { Request }
