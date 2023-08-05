import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Note } from "../../Helpers/Types"

interface AppNote extends Note {
  expanded: boolean
}

interface currentState {
  notesArray: AppNote[]
}

const initialState: currentState = {
  notesArray: [],
}

export const PersonalSlice = createSlice({
  name: "PersonalNotes",
  initialState: initialState,
  reducers: {
    setPersonalNotesArray: (state, action: PayloadAction<AppNote[]>) => {
      state.notesArray = action.payload
    },
    updatePersonalNoteAtIndex: (
      state,
      action: PayloadAction<{ index: number; updatedNote: AppNote }>
    ) => {
      const { index, updatedNote } = action.payload
      if (index >= 0 && index < state.notesArray.length) {
        state.notesArray[index] = updatedNote
      }
    },
  },
})

export const { setPersonalNotesArray, updatePersonalNoteAtIndex } =
  PersonalSlice.actions
export type { AppNote }
export default PersonalSlice.reducer
