import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

export type Language = 'en' | 'vi';

/** A piece of copy that exists in both site languages. */
export interface Localized {
  en: string;
  vi: string;
}

interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  /** Pick the current-language string from a Localized value. */
  t: (value: Localized) => string;
}

const STORAGE_KEY = 'zafkiel-portfolio-lang';

const LanguageContext = createContext<LanguageContextValue | null>(null);

const readStoredLanguage = (): Language => {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === 'en' || saved === 'vi') return saved;
  } catch {
    // Storage can be unavailable (private mode); fall back to English.
  }
  return 'en';
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(readStoredLanguage);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Language) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Ignore storage failures; the choice still applies for this visit.
    }
  }, []);

  const t = useCallback((value: Localized) => value[lang], [lang]);

  return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>;
};

export const useLang = (): LanguageContextValue => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used inside <LanguageProvider>');
  return ctx;
};
