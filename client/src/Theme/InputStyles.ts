import { defineStyleConfig } from "@chakra-ui/react"
import { mode } from "@chakra-ui/theme-tools"

export const InputStyles = defineStyleConfig({
  baseStyle: {},
  // Styles for the size variations
  sizes: {
    sm: {
      fontSize: "sm",
    },
    md: {
      fontsize: "sm",
    },
    lg: {
      fontSize: "lg",
    },
  },
  // Styles for the visual style variations
  variants: {
    filled: (props) => ({
      field: {
        border: "2px solid",
        borderRadius: "100px",
        borderColor: mode("gray.300", "#fff")(props),
      },
    }),
  },
  // The default `size` or `variant` values
  defaultProps: {},
})
