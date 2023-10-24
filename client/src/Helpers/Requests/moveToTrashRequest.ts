import axios from "axios"

const moveToTrashRequest = async (token: string, noteId: string) => {
  try {
    await axios.get(
      `${import.meta.env.VITE_APIURL}/api/notes/moveToTrash?noteId=${noteId}`,
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
