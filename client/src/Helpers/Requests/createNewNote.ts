import axios from "axios"
const createNewNoteRequest = async (token: string) => {
  try {
    const newNote = await axios.post(
      "http://localhost:5000/api/notes/createNote",
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
