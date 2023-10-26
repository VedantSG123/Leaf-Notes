import { DeltaStatic } from "quill"
import ReactQuill from "react-quill"
import { Socket } from "socket.io-client"
import debounce from "../debounce"

const update = debounce(
  (
    id: string,
    field: string,
    data: string | DeltaStatic,
    quillInstance: ReactQuill,
    socket: Socket
  ) => {
    if (field === "content") {
      const editor = quillInstance.getEditor()
      const content = editor.getContents()
      socket.emit("save-changes", { id: id, field: field, data: content })
    } else if (field === "color") {
      socket.emit("save-changes", { id: id, field: field, data: data })
    } else if (field === "title") {
      socket.emit("save-changes", { id: id, field: field, data: data })
    } else {
      console.log("invalid req")
    }
  },
  800
)

export default update
