import { Routes, Route } from "react-router-dom"
import Loader from "./Loader/Loader"
import Login from "./Login/Login"
import SignUp from "./Login/SignUp"
import Home from "./Home/Home"
import Notes from "./Notes/Notes"
import Editor from "./Editor/Editor"
import Trash from "./Notes/Trash/Trash"
import Preview from "./Editor/Preview"

const Views = () => {
  return (
    <Routes>
      <Route path="/" element={<Loader />} />
      <Route path="*" element={<Loader />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/home" element={<Home />}>
        <Route path="notes" element={<Notes />}></Route>
        <Route path="trash" element={<Trash />} />
        <Route path="edit/:noteId" element={<Editor />} />
        <Route path="editor" element={<Editor />} />
      </Route>
      <Route path="/preview/:noteId" element={<Preview />}></Route>
    </Routes>
  )
}

export default Views
