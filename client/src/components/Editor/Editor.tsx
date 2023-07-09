import ReactQuill from "react-quill"
import { Container, Box, useColorModeValue, Input } from "@chakra-ui/react"
import { useRef, useState } from "react"
import CustomToolbar from "./CustomToolbar"
import SecondaryToolBar from "./SecondaryToolBar"
import { colorCalc, Color } from "./Constants/Colors"
import "./styles.css"
import "react-quill/dist/quill.snow.css"

function Editor() {
  const editorRef = useRef<ReactQuill>(null)
  const [noteColor, setNoteColor] = useState<Color>(colorCalc("#e8eaed"))
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

  return (
    <>
      <Container className="editor-main-container" maxW={"2200px"}>
        <Box
          className="tool-bar-main"
          bg={useColorModeValue("light.50", "dark.900")}
        >
          <Box pr={2} pl={2}>
            <Input variant={"flushed"} placeholder="Untitled" maxW={"500px"} />
          </Box>
          <SecondaryToolBar
            undo={Undo}
            redo={Redo}
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
          style={{
            backgroundColor: useColorModeValue(noteColor.light, noteColor.dark),
          }}
        />
      </Container>
    </>
  )
}

export default Editor
