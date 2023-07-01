import { VStack, Heading, Spinner, Image } from "@chakra-ui/react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { verify } from "../../Helpers/Verify"

function Loader() {
  const navigate = useNavigate()

  useEffect(() => {
    const verifyUser = async () => {
      const result = await verify()
      if (result) {
        navigate("/home/notes")
      } else {
        navigate("/login")
      }
    }
    verifyUser()
  }, [])

  return (
    <VStack
      w={{ base: "90%", sm: "400px" }}
      m="auto"
      justify="center"
      h="100vh"
    >
      <Image src="leaf-note.png" alt="Leaf Note brand Icon" />
      <Heading as="h1">Leaf Notes</Heading>
      <Spinner size="xl" mt="1rem" />
    </VStack>
  )
}

export default Loader
