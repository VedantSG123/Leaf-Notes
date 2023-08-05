import ReactQuill from "react-quill"
import { useRef } from "react"
import { Note } from "../../../Helpers/Types"
import { colorCalc } from "../../Editor/Constants/Colors"
import { useColorModeValue } from "@chakra-ui/react"
import "react-quill/dist/quill.snow.css"
import "./styles.css"

interface properties {
  note: Note
}

function QuillTile({ note }: properties) {
  const editorRef = useRef<ReactQuill>(null)
  const modules = {
    toolbar: false,
  }

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ReactQuill
        ref={editorRef}
        theme={"snow"}
        modules={modules}
        className="quill-tile"
        style={{
          backgroundColor: useColorModeValue(
            colorCalc(note.color).light,
            colorCalc(note.color).dark
          ),
        }}
        value={note.content}
      />
    </div>
  )
}

export default QuillTile
