import axios from "axios"

const moveToTrashRequest = async (token: string, noteId: string) => {
  try {
    await axios.get(
      `http://localhost:5000/api/notes/moveToTrash?noteId=${noteId}`,
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

export { moveToTrashRequest }
