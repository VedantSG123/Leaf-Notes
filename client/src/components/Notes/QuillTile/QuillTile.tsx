import Quill from "quill"
import { useColorMode } from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"
import { Note } from "../../../Helpers/Types"
import "quill/dist/quill.snow.css"
import "./styles.css"

interface properties {
  note: Note
}

function QuillTile({ note }: properties) {
  const quillRef = useRef<HTMLDivElement>(null!)
  const [quill, setQuill] = useState<Quill>()
  const { colorMode } = useColorMode()

  //instantiate quill
  useEffect(() => {
    if (!quillRef.current) return
    const editor = document.createElement("div")
    quillRef.current.append(editor)
    const q = new Quill(editor, {
      theme: "snow",
      placeholder: "Write Something...",
    })
    editor.style.border = "none"
    const toolbar = q.getModule("toolbar")
    toolbar.container.style.display = "none"
    q.disable()
    if (note.content) q.setContents(note.content as any)
    setQuill(q)
    return () => {
      if (quillRef.current) {
        while (quillRef.current.firstChild) {
          quillRef.current.removeChild(quillRef.current.firstChild)
        }
      }
    }
  }, [])

  return (
    <>
      <div
        ref={quillRef}
        id="quill-editor"
        style={{
          backgroundColor: note.color,
          width: "100%",
          height: "100%",
          color: colorMode === "dark" ? "black" : "black",
          boxSizing: "border-box",
          cursor: "pointer",
          overflow: "hidden",
        }}
      ></div>
    </>
  )
}

export default QuillTile
