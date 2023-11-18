import React from "react"
import { createRoot } from 'react-dom/client';

import "./index.css"

import App from "./components/App"
import { MantineProvider } from '@mantine/core';
import { FridgeMateTheme } from "./components/commons/Theme";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <MantineProvider theme={FridgeMateTheme} withGlobalStyles withNormalizeCSS>
      <App />
    </MantineProvider>
  </React.StrictMode>
)
