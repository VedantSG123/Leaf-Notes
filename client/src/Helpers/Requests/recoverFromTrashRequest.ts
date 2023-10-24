import axios from "axios"

const recoverFromTrashRequest = async (token: string, noteId: string) => {
  try {
    await axios.get(
      `${
        import.meta.env.VITE_APIURL
      }/api/notes/recoverFromTrash?noteId=${noteId}`,
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
