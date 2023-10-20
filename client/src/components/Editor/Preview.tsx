import ReactQuill from "react-quill"
import { Container, Box, useColorModeValue, Heading } from "@chakra-ui/react"
import { useRef, useState } from "react"
import useAxios from "../../Helpers/Hooks/useAxios"
import { colorCalc, Color } from "./Constants/Colors"
import { useParams } from "react-router-dom"
import { getUserDataFromLocalStorage } from "../../Helpers/Verify"
import { Note } from "../../Helpers/Types"
import "./styles.css"

type PreviewParams = {
  noteId: string
}

function Preview() {
  const editorRef = useRef<ReactQuill>(null)
  const mainRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLInputElement>(null)
  const userdata = getUserDataFromLocalStorage()
  const [noteColor, setNoteColor] = useState<Color>(colorCalc("#e8eaed"))
  const { noteId } = useParams<PreviewParams>()

  const setContents = (res: Note | null, error: string | null) => {
    if (res && !error) {
      if (mainRef.current && editorRef.current && titleRef.current) {
        const editor = editorRef.current.getEditor()
        editor.setContents(res.content)
        setNoteColor(colorCalc(res.color))
        titleRef.current.innerText = res.title
      }
    } else {
      if (mainRef.current) {
        mainRef.current.innerHTML = `<p>${error}</p>`
      }
    }
  }

  const sendRequest = useAxios<Note>({
    url: `${import.meta.env.VITE_APIURL}/api/collab/preview?noteId=${noteId}`,
    method: "get",
    headers: {
      Authorization: `Bearer ${userdata?.data.token}`,
    },
    after: setContents,
  })

  const modules = {
    toolbar: false,
  }
  return (
    <>
      <Container
        className="editor-main-container"
        maxW={"2200px"}
        ref={mainRef}
      >
        <Box
          className="tool-bar-preview"
          bg={useColorModeValue("light.50", "main.900")}
          pt={4}
          pb={2}
        >
          <Box pr={2} pl={2}>
            <Heading ref={titleRef}>Test Note</Heading>
          </Box>
        </Box>
        <ReactQuill
          ref={editorRef}
          theme={"snow"}
          readOnly={true}
          placeholder="...Loading"
          modules={modules}
          style={{
            backgroundColor: useColorModeValue(noteColor.light, noteColor.dark),
          }}
        />
      </Container>
    </>
  )
}

export default Preview
