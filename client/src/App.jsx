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
  // set default lang and mode 
  const { lang, modeCard, direction } = localStorage;
  useEffect(() => {
    if (lang && direction) {
      i18n.changeLanguage(lang);
      document.body.style.direction = direction;
      document.body.classList.add(lang);
    } else {
      localStorage.lang = "en";
      localStorage.direction = "ltr";
    }
    if (!modeCard) localStorage.modeCard = "default";
  }, []);
  // set default lang and mode
  return <RouterProvider router={routes} />;
}

export default App;
