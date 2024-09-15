import { RouterProvider } from "react-router-dom";
import "./App.scss";
import { routes } from "./routes/routes";
import { useEffect } from "react";
import i18n from "./utils/i18n";

const chakraBreakPoints = {
  base: "0px",
  sm: "480px",
  md: "768px",
  lg: "992px",
  xl: "1280px",
  "2xl": "1536px",
};

function App() {
  // set default lang
  const { lang, modeCard } = localStorage;
  useEffect(() => {
    if (lang == "en") {
      i18n.changeLanguage("en");
      document.body.style.direction = "ltr";
      localStorage.direction = "ltr";
      localStorage.lang = "en";
      document.body.classList.add("en");
    } else if (lang == "ar") {
      i18n.changeLanguage("ar");
      document.body.style.direction = "rtl";
      localStorage.direction = "rtl";
      localStorage.lang = "ar";
      document.body.classList.add("ar");
    } else {
      localStorage.lang = "en";
    }
    if (!modeCard) localStorage.modeCard = "default";
  }, []);
  // set default lang
  return <RouterProvider router={routes} />;
}

export default App;
