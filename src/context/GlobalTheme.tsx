"use client";
import { createContext, useState, useContext } from "react";

export interface GlobalThemeType {
  darkMode: true | false;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  toggleMode: () => void;
}

export interface ChildrenProps {
  children: React.ReactNode;
}

export const GlobalThemeContext = createContext<GlobalThemeType>({
  darkMode: false,
  setDarkMode: () => {},
  toggleMode: () => {},
});

export const GlobalThemeContextProvider = ({ children }: ChildrenProps) => {
  const [darkMode, setDarkMode] = useState(true);
  const dataTheme = darkMode ? "dark" : "light";

  const toggleMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <GlobalThemeContext.Provider value={{ darkMode, setDarkMode, toggleMode }}>
      <div data-theme={dataTheme}>{children}</div>
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
