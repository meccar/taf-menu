"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Language, translations, supportedLanguages } from "./translations";

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.en;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

function detectBrowserLanguage(): Language {
  if (typeof window === "undefined") return "en";

  // Get browser language
  const browserLang =
    navigator.language ||
    (typeof navigator !== "undefined" &&
      "userLanguage" in navigator &&
      (navigator as { userLanguage?: string }).userLanguage) ||
    "en";

  // Extract language code (e.g., "en-US" -> "en")
  const langCode = browserLang.split("-")[0].toLowerCase();

  if (supportedLanguages.includes(langCode as Language))
    return langCode as Language;

  const savedLang = localStorage.getItem("preferred-language");
  if (savedLang && supportedLanguages.includes(savedLang as Language))
    return savedLang as Language;

  return "en";
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    // Detect language on mount
    const detectedLang = detectBrowserLanguage();
    setLanguageState(detectedLang);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("preferred-language", lang);
    }
  };

  const value: I18nContextType = {
    language,
    setLanguage,
    t: translations[language],
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}
