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
  },
})

export const { setPersonalNotesArray } = PersonalSlice.actions
export default PersonalSlice.reducer
