import { defineStyleConfig } from "@chakra-ui/react"
import { mode } from "@chakra-ui/theme-tools"
export const ButtonStyles = defineStyleConfig({
  // Styles for the base style
  baseStyle: {
    borderRadius: "100px",
  },
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
    primary: (props) => ({
      bg: "primary.500",
      _hover: {
        bg: mode("primary.600", "primary.400")(props),
      },
    }),
    secondary: (props) => ({
      bg: "secondary.600",
      _hover: {
        bg: mode("secondary.700", "secondary.500")(props),
      },
    }),
    dynamic: (props) => ({
      bg: mode("secondary.100", "primary.700")(props),
      _hover: {
        bg: mode("secondary.200", "primary.600")(props),
      },
    }),
  },
  // The default `size` or `variant` values
  defaultProps: {},
})
