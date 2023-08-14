import ReactQuill from "react-quill"
import { Container, Box, useColorModeValue, Input } from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"
import { DeltaStatic } from "quill"
import CustomToolbar from "./CustomToolbar"
import SecondaryToolBar from "./SecondaryToolBar"
import { colorCalc, Color } from "./Constants/Colors"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { getUserDataFromLocalStorage } from "../../Helpers/Verify"
import "./styles.css"
import "react-quill/dist/quill.snow.css"

type EditorParams = {
  noteId: string
}

function Editor() {
  const editorRef = useRef<ReactQuill>(null)
  const mainRef = useRef<HTMLDivElement>(null)
  const [noteColor, setNoteColor] = useState<Color>(colorCalc("#e8eaed"))
  const [note, setNote] = useState<DeltaStatic>()
  const Undo = () => {
    if (!editorRef.current) return
    ;(editorRef.current.getEditor() as any).history.undo()
  }

  const Redo = () => {
    if (!editorRef.current) return
    ;(editorRef.current.getEditor() as any).history.redo()
  }

  const handleColorChange = (current: Color) => {
    setNoteColor(current)
  }

  const modules = {
    toolbar: {
      container: ".leaf-tool-bar",
    },
    history: {
      delay: 2000,
      maxStack: 500,
      userOnly: true,
    },
  }
  const formats = [
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "script",
    "header",
    "blockquote",
    "code-block",
    "indent",
    "list",
    "direction",
    "align",
    "link",
    "image",
    "video",
    "formula",
  ]

  //Actual note rendering
  const { noteId } = useParams<EditorParams>()
  const [title, setTitle] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    if (!editorRef.current || !mainRef.current) return
    const userData = getUserDataFromLocalStorage()
    const NotesRequest = async () => {
      try {
        const getANote = await axios.get(
          `http://localhost:5000/api/notes/getANote?noteId=${noteId}`
        )
        setTitle(getANote.data.title)
        setNoteColor(colorCalc(getANote.data.color))
        setNote(getANote.data.content)
      } catch (err) {
        console.log(err)
      }
    }
    if (userData) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${userData.data.token}`
      NotesRequest()
    } else {
      mainRef.current.innerHTML =
        "<p>Cannot find note with given ID or user Authentication failed</p>"
    }
  }, [])

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  const handleBack = () => {
    navigate("/home/notes")
  }

  return (
    <>
      <Container
        className="editor-main-container"
        maxW={"2200px"}
        ref={mainRef}
      >
        <Box
          className="tool-bar-main"
          bg={useColorModeValue("light.50", "main.900")}
        >
          <Box pr={2} pl={2}>
            <Input
              variant={"flushed"}
              placeholder="Untitled"
              maxW={"500px"}
              value={title}
              onChange={handleTitleChange}
              fontWeight={600}
              fontSize={"1.5rem"}
            />
          </Box>
          <SecondaryToolBar
            undo={Undo}
            redo={Redo}
            back={handleBack}
            noteColor={noteColor}
            setNoteColor={handleColorChange}
          />
          <CustomToolbar />
        </Box>

        <ReactQuill
          ref={editorRef}
          modules={modules}
          formats={formats}
          theme={"snow"}
          value={note}
          style={{
            backgroundColor: useColorModeValue(noteColor.light, noteColor.dark),
          }}
        />
      </Container>
    </>
  )
}

export default Editor
