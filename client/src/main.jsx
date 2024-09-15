import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { GlarusProvider } from "./Context/Glarus_Context.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import { I18nextProvider } from "react-i18next";
import i18n from "./utils/i18n.js";

createRoot(document.getElementById("root")).render(
  <ChakraProvider>
    <I18nextProvider i18n={i18n}>
      <GlarusProvider>
        <App />
      </GlarusProvider>
    </I18nextProvider>
  </ChakraProvider>
);
