import axios from "axios"

const deleteNoteRequest = async (token: string, noteId: string) => {
  try {
    await axios.delete(
      `${
        import.meta.env.VITE_APIURL
      }/api/notes/deletePermanent?noteId=${noteId}`,
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
