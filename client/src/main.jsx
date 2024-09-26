import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { GlarusProvider } from "./Context/Glarus_Context.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import { createTheme, ThemeProvider } from "@mui/material";
import { I18nextProvider } from "react-i18next";
import i18n from "./utils/i18n.js";

const { direction } = localStorage;

const theme = createTheme({
  typography: {
    fontSize: 14,
  },
  direction: direction == "rtl" ? "rtl" : "ltr",
});

createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <ChakraProvider>
      <I18nextProvider i18n={i18n}>
        <GlarusProvider>
          <App />
        </GlarusProvider>
      </I18nextProvider>
    </ChakraProvider>
  </ThemeProvider>
);
