import axios from "axios"

const deleteNoteRequest = async (token: string, noteId: string) => {
  try {
    await axios.delete(
      `http://localhost:5000/api/notes/deletePermanent?noteId=${noteId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  } catch (err) {
    throw err
  }
}

export { deleteNoteRequest }
