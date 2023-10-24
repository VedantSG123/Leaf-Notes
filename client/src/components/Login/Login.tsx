import {
  VStack,
  ButtonGroup,
  Button,
  Heading,
  useToast,
} from "@chakra-ui/react"
import { Form, Formik } from "formik"
import { useState } from "react"
import axios, { AxiosResponse } from "axios"
import * as Yup from "yup"
import TextField from "../TextField/TextField"
import { useNavigate } from "react-router-dom"
import ToggleTheme from "../ToggleTheme"

const Login = () => {
  const navigate = useNavigate()
  const toast = useToast()
  const [loading, setLoading] = useState(false)

  return (
    <>
      <ToggleTheme />
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Enter a valid email")
            .required("Email Required"),
          password: Yup.string()
            .required("Password is required")
            .min(6, "Password too short!"),
        })}
        onSubmit={async (values, action) => {
          setLoading(true)
          const config = {
            headers: {
              "Content-Type": "application/json",
            },
          }
          try {
            const response: AxiosResponse = await axios.post(
              `${import.meta.env.VITE_APIURL}/api/user/login`,
              {
                ...values,
              },
              config
            )
            localStorage.setItem("userInfo", JSON.stringify(response))
            toast({
              title: "Login Successful.",
              status: "success",
              duration: 5000,
              isClosable: true,
            })
            setLoading(false)
            navigate("/home/notes")
          } catch (err) {
            if (axios.isAxiosError(err)) {
              if (err.response?.data.message) {
                toast({
                  title: "Login Error.",
                  description: err.response.data.message,
                  status: "error",
                  duration: 5000,
                  isClosable: true,
                })
                setLoading(false)
              } else if (err.request) {
                toast({
                  title: "Login Error.",
                  description: "No Response From the server",
                  status: "error",
                  duration: 5000,
                  isClosable: true,
                })
                setLoading(false)
              }
            } else {
              toast({
                title: "Login Error.",
                description: "Unknown Error",
                status: "error",
                duration: 5000,
                isClosable: true,
              })
              setLoading(false)
            }
          }
          action.resetForm()
        }}
      >
        <VStack
          as={Form}
          w={{ base: "90%", sm: "400px" }}
          m="auto"
          justify="center"
          h="100vh"
        >
          <Heading>Log In</Heading>
          <TextField
            label="Email"
            name="email"
            autoComplete="off"
            placeholder="Enter your registered email"
          />
          <TextField
            label="Password"
            name="password"
            autoComplete="off"
            placeholder="Enter your password"
            type="password"
          />
          <ButtonGroup mt="1rem">
            <Button
              isLoading={loading}
              loadingText="Submitting"
              variant="secondary"
              size="md"
              type="submit"
            >
              Log In
            </Button>
            <Button
              isDisabled={loading}
              variant="primary"
              size="md"
              onClick={() => {
                navigate("/register")
              }}
            >
              Create Account
            </Button>
          </ButtonGroup>
        </VStack>
      </Formik>
    </>
  )
}

export default Login
