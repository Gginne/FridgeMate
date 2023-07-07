import React from "react"
import ReactDOM from "react-dom"
import App from "./components/App"
import { MantineProvider } from '@mantine/core';
import "bootstrap/dist/css/bootstrap.min.css"
import "./index.css"
import { FridgeMateTheme } from "./components/commons/Theme";

ReactDOM.render(
  <React.StrictMode>
    <MantineProvider theme={FridgeMateTheme} withGlobalStyles withNormalizeCSS>
      <App />
    </MantineProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
