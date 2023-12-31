import axios from "axios"
import { Note } from "../Types"
import { AppNote } from "../../Redux/Slices/PersonalSlice"
const getAllNotesRequest = async (token: string) => {
  try {
    const getNotes = await axios.get(
      `${import.meta.env.VITE_APIURL}/api/notes/getNotes`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    const notes: AppNote[] = getNotes.data.map((note: Note) => ({
      ...note,
      expanded: false,
    }))
    return notes
  } catch (err) {
    throw err
  }
}

export { getAllNotesRequest }
