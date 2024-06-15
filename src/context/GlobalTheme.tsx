"use client";
import { createContext, useState, useContext } from "react";
import { saveTheme } from "../helper/CookiesFunctions";

export interface GlobalThemeType {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  toggleMode: () => void;
}

export interface ChildrenProps {
  initialTheme: string;
  children: React.ReactNode;
}

export const GlobalThemeContext = createContext<GlobalThemeType>({
  theme: "",
  setTheme: () => {},
  toggleMode: () => {},
});

export const GlobalThemeContextProvider = ({
  children,
  initialTheme,
}: ChildrenProps) => {
  const [theme, setTheme] = useState(initialTheme);

  const toggleMode = () => {
    let newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    saveTheme(newTheme);
  };

  return (
    <GlobalThemeContext.Provider value={{ theme, setTheme, toggleMode }}>
      <div data-theme={theme}>{children}</div>
    </GlobalThemeContext.Provider>
  );
};

export const useGlobalThemeContext = () => {
  const context = useContext(GlobalThemeContext);
  if (context === undefined) {
    throw new Error(
      "useGlobalThemeContext must be used within a GlobalThemeContextProvider",
    );
  }
  return context;
};
