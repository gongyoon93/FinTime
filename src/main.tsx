import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { GlobalStyle } from "./styled/GlobalStyle.tsx";
import { ThemeProvider } from "styled-components";
import { style } from "./styled/style.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={style}>
        <App />
        <GlobalStyle />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
