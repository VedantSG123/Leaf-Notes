import { SimpleGrid, Box, Container, Button, VStack } from "@chakra-ui/react"
import { AddIcon } from "@chakra-ui/icons"
import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import QuillTile from "../QuillTile/QuillTile2"
import SubTile from "../QuillTile/SubTile"
import "./styles.css"
import { getUserDataFromLocalStorage } from "../../../Helpers/Verify"
import { getAllNotesRequest } from "../../../Helpers/Requests/getAllNotesRequest"
import { createNewNoteRequest } from "../../../Helpers/Requests/createNewNote"
import { moveToTrashRequest } from "../../../Helpers/Requests/moveToTrashRequest"
import { AppNote } from "../../../Redux/Slices/PersonalSlice"
import TileSkeleton from "../TileSkeleton/TileSkeleton"

function Personal() {
  const [renderArray, setRenderArray] = useState<AppNote[]>()
  const [userId, setUserId] = useState<string>("")
  const loaderCount = Array.from({ length: 10 }, (_, index) => index + 1)
  const ParentRef = useRef<HTMLDivElement>(null!)
  const navigate = useNavigate()
  useEffect(() => {
    const userData = getUserDataFromLocalStorage()
    if (!userData) return
    setUserId(userData?.data._id.toString())
    const getNotes = async (token: string) => {
      try {
        const notes = await getAllNotesRequest(token)
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

  const createNewNote = async () => {
    const userData = getUserDataFromLocalStorage()
    if (userData) {
      try {
        const newNote = await createNewNoteRequest(userData.data.token)
        navigate(`/home/edit/${newNote._id}`)
      } catch (err) {
        console.log(err)
      }
    } else {
      navigate("/login")
    }
  }

  const moveToTrash = async (index: number) => {
    const userData = getUserDataFromLocalStorage()
    if (renderArray) {
      if (userData && index >= 0 && index < renderArray.length) {
        try {
          await moveToTrashRequest(userData.data.token, renderArray[index]._id)
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
      <Container maxW={"2200px"} padding={0}>
        <SimpleGrid ref={ParentRef} columns={[2, 3, 4, 6, 8]} spacing="20px">
          <Box
            as={Button}
            variant={"dynamic"}
            borderRadius={0}
            height={"280px"}
            maxW={"180px"}
            onClick={createNewNote}
            key={-1}
          >
            <VStack>
              <Box>
                <AddIcon boxSize={12} />
              </Box>
              <Box mt={"10px"}>Create A Note</Box>
            </VStack>
          </Box>
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
                        moveToTrash(index)
                      }}
                      deleteNote={() => console.log("cannot delete from here")}
                      noteId={note._id}
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

export default Personal
