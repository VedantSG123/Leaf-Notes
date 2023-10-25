import ReactQuill from "react-quill"
import { Container, Box, useColorModeValue, Input } from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"
import { DeltaStatic, Sources } from "quill"
import { io, Socket } from "socket.io-client"
import "./styles.css"
import "react-quill/dist/quill.snow.css"
import CustomToolbar from "./CustomToolbar"
import SecondaryToolBar from "./SecondaryToolBar"
import { colorCalc, Color } from "./Constants/Colors"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { getUserDataFromLocalStorage } from "../../Helpers/Verify"
import update from "../../Helpers/Requests/updateNoteData"

type EditorParams = {
  noteId: string
}

function Editor() {
  const editorRef = useRef<ReactQuill>(null)
  const mainRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLInputElement>(null)
  const { noteId } = useParams<EditorParams>()
  const [loaded, setLoaded] = useState(false)
  const [disable, setDisable] = useState(true)
  const [noteColor, setNoteColor] = useState<Color>(colorCalc("#e8eaed"))
  const [socket, setSocket] = useState<Socket>()
  const [owner, setOwner] = useState(false)
  const userData = getUserDataFromLocalStorage()
  const navigate = useNavigate()

  //editor configuration
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

  //handle buttons
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
    if (socket && editorRef.current && noteId) {
      update(noteId, "color", current.light, editorRef.current, socket)
    }
  }

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (socket && editorRef.current && noteId && titleRef.current) {
      update(noteId, "title", event.target.value, editorRef.current, socket)
    }
  }

  const handleBack = () => {
    navigate("/home/notes")
  }

  //Effects
  //Fetch Note and set
  useEffect(() => {
    const NotesRequest = async () => {
      if (editorRef.current && mainRef.current && titleRef.current) {
        try {
          const getANote = await axios.get(
            `${import.meta.env.VITE_APIURL}/api/notes/getANote?noteId=${noteId}`
          )
          titleRef.current.value = getANote.data.title
          setNoteColor(colorCalc(getANote.data.color))
          const editor = editorRef.current.getEditor()
          editor.setContents(getANote.data.content)
          setOwner(getANote.data.author.toString() === userData?.data._id)
          setLoaded(true)
        } catch (err) {
          console.log(err)
        }
      }
    }
    if (editorRef.current && mainRef.current && titleRef.current) {
      if (userData) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${userData.data.token}`
        NotesRequest()
      } else {
        mainRef.current.innerHTML =
          "<p>Cannot find note with given ID or user Authentication failed</p>"
      }
    }
  }, [])

  //socket connection
  useEffect(() => {
    const s = io(`${import.meta.env.VITE_APIURL}`)
    setSocket(s)
    return () => {
      s.disconnect()
    }
  }, [])

  //connet to a room
  useEffect(() => {
    if (editorRef.current && socket) {
      socket.once("connected-room", (id: string) => {
        console.log(`Connected with ID:${id}`)
        setDisable(false)
      })
      socket.emit("connect-room", noteId)
    }
  }, [socket, noteId])

  //listen to changes and update (for every user)
  useEffect(() => {
    if (socket && editorRef.current && loaded) {
      const editor = editorRef.current.getEditor()
      socket.on("receive-changes", (delta: DeltaStatic) => {
        editor.updateContents(delta, "api")
      })
    }
  }, [socket, loaded])

  const handleEditorChange = (
    _value: string,
    delta: DeltaStatic,
    source: Sources
  ) => {
    if (socket && editorRef.current && source === "user" && noteId) {
      socket.emit("send-changes", delta)
      update(noteId, "content", "", editorRef.current, socket)
    }
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
              ref={titleRef}
              variant={"flushed"}
              placeholder="Untitled"
              maxW={"500px"}
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
            noteId={noteId as string}
            isOwner={owner}
            title={titleRef.current?.value as string}
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
          onChange={handleEditorChange}
          readOnly={disable}
        />
      </Container>
    </>
  )
}

export default Editor
