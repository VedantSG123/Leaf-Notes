import { DeltaStatic, Delta } from "quill"

interface User {
  _id: string
  password: string
  name: string
  email: string
  token: string
}

interface Note {
  _id: string
  title: string
  content: DeltaStatic
  color: string
  length: number
  isGroupNote: boolean
  isDeleted: boolean
  collaborators: Array<User["_id"]>
  author: User["_id"]
}

interface Request {
  _id: string
  sender: User["_id"]
  receiver: User["_id"]
  note: User["_id"]
  status: string
}

interface Collaborator {
  _id: string
  user: User["_id"]
  note: Note["_id"]
}

const emptyNote: Note = {
  _id: "",
  title: "",
  content: new Delta(),
  color: "",
  length: 0,
  isDeleted: false,
  isGroupNote: false,
  collaborators: [],
  author: "",
}

export type { Note, User, Request, Collaborator }
export { emptyNote }
