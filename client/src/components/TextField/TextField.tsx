import {
  FormControl,
  Input,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react"
import { Field, useField } from "formik"

interface properties extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: string
  autoComplete: string
}

function TextField({ label, ...props }: properties) {
  const [field, meta] = useField(props)
  const isInvalid = meta.touched && !!meta.error
  return (
    <FormControl isInvalid={isInvalid}>
      <FormLabel>{label}</FormLabel>
      {/* <Input {...field} type={type} {...props} /> */}
      <Field
        as={Input}
        variant="filled"
        {...field}
        {...props}
        value={field.value || ""}
      />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  )
}

export default TextField
