import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import ar from "../assets/Lang/ar.json";
import en from "../assets/Lang/en.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    ar: {
      translation: ar,
    },
  },
  lng: localStorage.getItem("lang") || "en", // Default language
  fallbackLng: localStorage.getItem("lang") || "en",
  interpolation: {
    escapeValue: false, // React already escapes values
  },
});

export default i18n;
