import { Routes, Route } from "react-router-dom"
import Loader from "./Loader/Loader"
import Login from "./Login/Login"
import SignUp from "./Login/SignUp"
import Home from "./Home/Home"
import Notes from "./Notes/Notes"
import Editor from "./Editor/Editor"

const Views = () => {
  return (
    <Routes>
      <Route path="/" element={<Loader />} />
      <Route path="*" element={<Loader />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/home" element={<Home />}>
        <Route path="notes" element={<Notes />}></Route>
        <Route path="edit/:noteId" element={<Editor />} />
        <Route path="editor" element={<Editor />} />
      </Route>
    </Routes>
  )
}

export default Views
