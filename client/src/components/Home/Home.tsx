import { verify } from "../../Helpers/Verify"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import AppBar from "../AppBar/AppBar"

function Home() {
  const navigate = useNavigate()
  useEffect(() => {
    const verifyUser = async () => {
      const result = await verify()
      if (!result) {
        navigate("/login")
      }
    }
    verifyUser()
  }, [])
  return (
    <>
      <AppBar />
      <Outlet />
    </>
  )
}

export default Home
