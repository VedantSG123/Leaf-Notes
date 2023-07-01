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
import { ArrowBackIcon } from "@chakra-ui/icons"
import TextField from "../TextField/TextField"
import { useNavigate } from "react-router-dom"
import ToggleTheme from "../ToggleTheme"

const SignUp = () => {
  const navigate = useNavigate()
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  return (
    <>
      <ToggleTheme />
      <Formik
        initialValues={{ name: "", password: "", email: "" }}
        validationSchema={Yup.object().shape({
          name: Yup.string()
            .required("Username required")
            .min(6, "Username should be atleast 6 characters")
            .max(28, "Username too long"),
          email: Yup.string()
            .email("Enter a valid email")
            .required("Email Required"),
          password: Yup.string()
            .required("Password is required")
            .min(6, "Password too short!"),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "Passwords must match")
            .required("Confirm password is required"),
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
              "http://localhost:5000/api/user/",
              {
                ...values,
              },
              config
            )
            localStorage.setItem("userInfo", JSON.stringify(response))
            toast({
              title: "Sign-up Successful.",
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
                  title: "Sign-up Error.",
                  description: err.response.data.message,
                  status: "error",
                  duration: 5000,
                  isClosable: true,
                })
                setLoading(false)
              } else if (err.request) {
                toast({
                  title: "Sign-up Error.",
                  description: "No Response From the server",
                  status: "error",
                  duration: 5000,
                  isClosable: true,
                })
                setLoading(false)
              }
            } else {
              toast({
                title: "Sign-up Error.",
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
          <Heading>Sign Up</Heading>
          <TextField
            label="Username"
            name="name"
            autoComplete="off"
            placeholder="Enter your username"
          />
          <TextField
            label="Email"
            name="email"
            autoComplete="off"
            placeholder="Enter your email"
            type="email"
          />
          <TextField
            label="Password"
            name="password"
            autoComplete="off"
            placeholder="Enter your password"
            type="password"
          />
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            autoComplete="off"
            placeholder="Re-Enter the password"
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
              Create Account
            </Button>
            <Button
              isDisabled={loading}
              onClick={() => {
                navigate("/")
              }}
              variant="primary"
              size="md"
            >
              <ArrowBackIcon />
              Return
            </Button>
          </ButtonGroup>
        </VStack>
      </Formik>
    </>
  )
}

export default SignUp
