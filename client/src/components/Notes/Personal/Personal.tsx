import { SimpleGrid, Box, Container, Button, VStack } from "@chakra-ui/react"
import { AddIcon } from "@chakra-ui/icons"
import { useEffect, useRef } from "react"
import axios from "axios"
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks"
import { setPersonalNotesArray } from "../../../Redux/Slices/PersonalSlice"
import { getUserDataFromLocalStorage } from "../../../Helpers/Verify"
import { Note } from "../../../Helpers/Types"
import QuillTile from "../QuillTile/QuillTile"

function Personal() {
  const globalNotes = useAppSelector((state) => state.PersonalNotes.notesArray)
  const dispatch = useAppDispatch()
  const ParentRef = useRef<HTMLDivElement>(null!)

  useEffect(() => {
    const userData = getUserDataFromLocalStorage()
    const NotesRequest = async () => {
      try {
        const getNotes = await axios.get(
          "http://localhost:5000/api/notes/getNotes"
        )
        dispatch(
          setPersonalNotesArray(
            getNotes.data.map((note: Note) => ({
              ...note,
              expanded: false,
            }))
          )
        )
      } catch (err) {
        ParentRef.current.innerHTML = "Failed to get Notes"
      }
    }
    if (userData) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${userData.data.token}`
      NotesRequest()
    } else {
      ParentRef.current.innerHTML = "Please Login again"
    }
  }, [])

  return (
    <>
      <Container maxW={"2200px"} padding={0}>
        <SimpleGrid ref={ParentRef} minChildWidth="150px" spacing="20px">
          <Box
            as={Button}
            variant={"dynamic"}
            borderRadius={0}
            height={"200px"}
          >
            <VStack>
              <Box>
                <AddIcon boxSize={12} />
              </Box>
              <Box mt={"10px"}>Create A Note</Box>
            </VStack>
          </Box>
          {globalNotes.map((note, index) => {
            return (
              <Box height={"200px"} sx={{ overflow: "hidden" }} key={index}>
                <QuillTile note={note} />
              </Box>
            )
          })}
        </SimpleGrid>
      </Container>
    </>
  )
}

export default Personal
