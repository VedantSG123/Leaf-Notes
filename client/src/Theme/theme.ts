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
    dark: {
      "50": "#f6f7f8",
      "100": "#dce1e3",
      "200": "#bec7cb",
      "300": "#9aa8ae",
      "400": "#85979e",
      "500": "#6b8088",
      "600": "#546d76",
      "700": "#3c5963",
      "800": "#2d4b57",
      "900": "#153744",
    },
    light: {
      "50": "#eafbf8",
      "100": "#c7e7e1",
      "200": "#afcbc6",
      "300": "#93aba6",
      "400": "#849995",
      "500": "#6f817d",
      "600": "#5d6c6a",
      "700": "#4b5755",
      "800": "#3f4948",
      "900": "#2e3534",
    },
    main: {
      "50": "#F1F2F4",
      "100": "#D7DCE0",
      "200": "#BDC5CC",
      "300": "#A3AFB8",
      "400": "#8998A4",
      "500": "#6F8290",
      "600": "#596873",
      "700": "#434E56",
      "800": "#2D3439",
      "900": "#161A1D",
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
        bg: mode("light.50", "main.900")(props),
      },
    }),
  },
}
//#eaf6fa
//#0e313e
export default extendTheme(theme)
