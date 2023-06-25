import { extendTheme } from "@chakra-ui/react"
import { ButtonStyles as Button } from "./ButtonStyle"
import { InputStyles as Input } from "./InputStyles"
import type { StyleFunctionProps } from "@chakra-ui/styled-system"
import { mode } from "@chakra-ui/theme-tools"
const theme = {
  config: {
    initialColorMode: "dark",
    useSystemColorMode: true,
  },
  colors: {
    primary: {
      "50": "#EBF8FA",
      "100": "#C7EBF0",
      "200": "#A2DEE6",
      "300": "#7ED1DD",
      "400": "#5AC4D3",
      "500": "#36B7C9",
      "600": "#2B92A1",
      "700": "#206E79",
      "800": "#154951",
      "900": "#0B2528",
    },
    secondary: {
      "50": "#E6FFF0",
      "100": "#B9FED5",
      "200": "#8CFDBB",
      "300": "#5FFCA0",
      "400": "#32FB85",
      "500": "#04FB6B",
      "600": "#04C855",
      "700": "#039640",
      "800": "#02642B",
      "900": "#013215",
    },
    tertiary: {
      "50": "#E9F5FB",
      "100": "#C3E4F4",
      "200": "#9CD2ED",
      "300": "#75C0E6",
      "400": "#4EAEDF",
      "500": "#289DD7",
      "600": "#207DAC",
      "700": "#185E81",
      "800": "#103F56",
      "900": "#081F2B",
    },
  },
  components: {
    Button,
    Input,
  },
  fonts: {
    body: `'DM Sans', sans-serif`,
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        margin: 0,
        bg: mode("#eaf6fa", "#0e313e")(props),
      },
    }),
  },
}

export default extendTheme(theme)
