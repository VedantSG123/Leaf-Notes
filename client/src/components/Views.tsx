import { Routes, Route } from "react-router-dom"
import Login from "./Login/Login"
import SignUp from "./Login/SignUp"

const Views = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="*" element={<Login />} />
      <Route path="/register" element={<SignUp />} />
    </Routes>
  )
}

export default Views
