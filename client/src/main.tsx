import React from "react"
import ReactDOM from "react-dom/client"
import { ChakraProvider } from "@chakra-ui/react"
import { ColorModeScript } from "@chakra-ui/react"
import { BrowserRouter } from "react-router-dom"
import App from "./App.tsx"
import theme from "./Theme/theme.ts"
import "@fontsource/dm-sans/400.css"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
)
