import { VStack, ButtonGroup, Button, Heading } from "@chakra-ui/react"
import { Form, Formik } from "formik"
import * as Yup from "yup"
import TextField from "../TextField/TextField"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const navigate = useNavigate()
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={Yup.object({
        username: Yup.string()
          .required("Username required")
          .min(6, "Username should be atleast 6 characters")
          .max(28, "Username too long"),
        password: Yup.string()
          .required("Password is required")
          .min(6, "Password too short!"),
      })}
      onSubmit={(values, action) => {
        alert(JSON.stringify(values, null, 2))
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
          label="Username"
          name="username"
          autoComplete="off"
          placeholder="Enter your username"
        />
        <TextField
          label="Password"
          name="password"
          autoComplete="off"
          placeholder="Enter your password"
          type="password"
        />
        <ButtonGroup mt="1rem">
          <Button variant="secondary" size="md" type="submit">
            Log In
          </Button>
          <Button
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
  )
}

export default Login
