import axios from "axios"
const createNewNoteRequest = async (token: string) => {
  try {
    const newNote = await axios.post(
      `${import.meta.env.VITE_APIURL}/api/notes/createNote`,
      {
        title: "",
        content: {
          ops: [
            {
              insert: "\n",
            },
          ],
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return newNote.data
  } catch (err) {
    throw err
  }
}

export { createNewNoteRequest }
