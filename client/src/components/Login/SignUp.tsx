import { VStack, ButtonGroup, Button, Heading } from "@chakra-ui/react"
import { Form, Formik } from "formik"
import * as Yup from "yup"
import { ArrowBackIcon } from "@chakra-ui/icons"
import TextField from "../TextField/TextField"
import { useNavigate } from "react-router-dom"

const SignUp = () => {
  const navigate = useNavigate()
  return (
    <Formik
      initialValues={{ username: "", password: "", email: "" }}
      validationSchema={Yup.object().shape({
        username: Yup.string()
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
        <Heading>Sign Up</Heading>
        <TextField
          label="Username"
          name="username"
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
          <Button variant="secondary" size="md" type="submit">
            Create Account
          </Button>
          <Button
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
  )
}

export default SignUp
