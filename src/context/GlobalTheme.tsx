"use client";
import { createContext, useState, useContext } from "react";
import { saveTheme } from "@/src/helper/cookiesFunctions";

export interface GlobalThemeType {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  toggleMode: () => void;
}

export interface GlobalThemeProps {
  initialTheme: string;
  children: React.ReactNode;
}

export const GlobalThemeContext = createContext<GlobalThemeType | null>(null);

export const GlobalThemeContextProvider = ({ children, initialTheme }: GlobalThemeProps) => {
  const [theme, setTheme] = useState(initialTheme);

  const toggleMode = () => {
    let newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    saveTheme(newTheme);
  };

  return (
    <GlobalThemeContext.Provider value={{ theme, setTheme, toggleMode }}>
      <html lang="en" data-theme={theme}>
        <head>
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID}`}
            data-nscript="lazyOnload"
            crossOrigin="anonymous"
          />
          <meta name="google-adsense-account" content={process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID} />
        </head>
        <body className="flex min-h-screen flex-col">{children}</body>
      </html>
    </GlobalThemeContext.Provider>
  );
};

export const useGlobalThemeContext = () => {
  const context = useContext(GlobalThemeContext);
  if (!context) throw new Error("useGlobalThemeContext must be used within a GlobalThemeContextProvider");

  return context;
};
