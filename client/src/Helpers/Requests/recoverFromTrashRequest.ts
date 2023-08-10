import axios from "axios"

const recoverFromTrashRequest = async (token: string, noteId: string) => {
  try {
    await axios.get(
      `http://localhost:5000/api/notes/recoverFromTrash?noteId=${noteId}`,
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

export { recoverFromTrashRequest }
