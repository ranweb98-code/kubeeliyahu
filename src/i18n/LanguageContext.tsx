import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { he } from "./he";
import { en } from "./en";

export type Language = "he" | "en";

type Translations = typeof he;

interface LanguageContextType {
  lang: Language;
  t: Translations;
  setLang: (lang: Language) => void;
  dir: "rtl" | "ltr";
}

const translations: Record<Language, Translations> = { he, en };

const LanguageContext = createContext<LanguageContextType>({
  lang: "he",
  t: he,
  setLang: () => {},
  dir: "rtl",
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem("lang");
    return saved === "en" ? "en" : "he";
  });

  const setLang = useCallback((l: Language) => {
    setLangState(l);
    localStorage.setItem("lang", l);
    document.documentElement.dir = l === "he" ? "rtl" : "ltr";
    document.documentElement.lang = l;
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, t: translations[lang], setLang, dir: lang === "he" ? "rtl" : "ltr" }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
