import mongoose from "mongoose"
import { IUser } from "./userModel"
import { INote } from "./noteModel"

interface ICollaborator extends mongoose.Document{
  user:IUser['_id']
  note:INote['_id']
}

const collaboratorModel = new mongoose.Schema<ICollaborator>(
  {
    user:{ type:mongoose.Schema.Types.ObjectId, ref:"User"},
    note:{ type:mongoose.Schema.Types.ObjectId, ref:"Note" }
  }
)

const Collaborator = mongoose.model("Collaborator", collaboratorModel)
export { Collaborator }