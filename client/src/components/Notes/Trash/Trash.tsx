import { SimpleGrid, Box, Container, Button, Icon } from "@chakra-ui/react"
import { ArrowBackIcon } from "@chakra-ui/icons"
import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./styles.css"
import QuillTile from "../QuillTile/QuillTile2"
import SubTile from "../QuillTile/SubTile"
import { getUserDataFromLocalStorage } from "../../../Helpers/Verify"
import { getTrashNotesRequest } from "../../../Helpers/Requests/getTrashNotes"
import { recoverFromTrashRequest } from "../../../Helpers/Requests/recoverFromTrashRequest"
import { AppNote } from "../../../Redux/Slices/PersonalSlice"

function Trash() {
  const [renderArray, setRenderArray] = useState<AppNote[]>([])
  const ParentRef = useRef<HTMLDivElement>(null!)
  const navigate = useNavigate()
  useEffect(() => {
    const userData = getUserDataFromLocalStorage()
    const getNotes = async (token: string) => {
      try {
        const notes = await getTrashNotesRequest(token)
        setRenderArray(notes)
      } catch (err) {
        console.log(err)
      }
    }
    if (userData) {
      getNotes(userData.data.token)
    } else {
      navigate("/login")
    }
  }, [renderArray])

  const recover = async (index: number) => {
    const userData = getUserDataFromLocalStorage()
    if (userData && index >= 0 && index < renderArray.length) {
      try {
        await recoverFromTrashRequest(
          userData.data.token,
          renderArray[index]._id
        )
        setRenderArray((prevState) => {
          return prevState.filter((_, ind) => ind !== index)
        })
      } catch (err) {
        console.log(err)
      }
    }
  }

  return (
    <>
      <Container maxW={"2200px"} padding={4}>
        <Box>
          <Button
            variant={"secondary"}
            leftIcon={<Icon as={ArrowBackIcon} />}
            onClick={() => navigate("/home/notes")}
          >
            Back To Notes
          </Button>
        </Box>
        <SimpleGrid
          mt={6}
          ref={ParentRef}
          columns={[2, 3, 4, 6, 8]}
          spacing="20px"
        >
          {renderArray.map((note, index) => {
            return (
              <Box key={index} height={"280px"} maxW={"180px"}>
                <Link to={`/home/edit/${note._id}`}>
                  <Box
                    height={"200px"}
                    sx={{ overflow: "hidden" }}
                    maxW={"180px"}
                    width={"100%"}
                    as={Button}
                    borderRadius={0}
                    padding={0}
                  >
                    <QuillTile key={index} note={note} />
                  </Box>
                </Link>
                <SubTile
                  title={note.title}
                  isGroup={note.isGroupNote}
                  isDeleted={note.isDeleted}
                  trash={() => {
                    recover(index)
                  }}
                />
              </Box>
            )
          })}
        </SimpleGrid>
      </Container>
    </>
  )
}

export default Trash
