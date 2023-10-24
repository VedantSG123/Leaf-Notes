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
import { deleteNoteRequest } from "../../../Helpers/Requests/deleteNoteRequest"
import { AppNote } from "../../../Redux/Slices/PersonalSlice"
import TileSkeleton from "../TileSkeleton/TileSkeleton"

function Trash() {
  const [renderArray, setRenderArray] = useState<AppNote[]>()
  const [userId, setUserId] = useState("")
  const loaderCount = Array.from({ length: 10 }, (_, index) => index + 1)
  const ParentRef = useRef<HTMLDivElement>(null!)
  const navigate = useNavigate()
  useEffect(() => {
    const userData = getUserDataFromLocalStorage()
    setUserId(userData?.data._id as string)
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
    if (renderArray) {
      if (userData && index >= 0 && index < renderArray.length) {
        try {
          await recoverFromTrashRequest(
            userData.data.token,
            renderArray[index]._id
          )

          setRenderArray((prevState) => {
            if (prevState) {
              return prevState.filter((_, ind) => ind !== index)
            } else {
              return prevState
            }
          })
        } catch (err) {
          console.log(err)
        }
      }
    }
  }

  const deleteNote = async (index: number) => {
    const userData = getUserDataFromLocalStorage()
    if (renderArray) {
      if (userData && index >= 0 && index < renderArray.length) {
        try {
          await deleteNoteRequest(userData.data.token, renderArray[index]._id)
          setRenderArray((prevState) => {
            if (prevState) {
              return prevState.filter((_, ind) => ind !== index)
            } else {
              return prevState
            }
          })
        } catch (err) {
          console.log(err)
        }
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
          {renderArray
            ? renderArray.map((note, index) => {
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
                      noteId={note._id}
                      deleteNote={() => deleteNote(index)}
                      author={note.author}
                      userId={userId}
                    />
                  </Box>
                )
              })
            : loaderCount.map((loaderNo) => {
                return <TileSkeleton key={loaderNo} />
              })}
        </SimpleGrid>
      </Container>
    </>
  )
}

export default Trash
