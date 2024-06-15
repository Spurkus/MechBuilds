"use client";
import { createContext, useState, useContext } from "react";

export interface GlobalThemeType {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  toggleMode: () => void;
}

export interface ChildrenProps {
  children: React.ReactNode;
}

export const GlobalThemeContext = createContext<GlobalThemeType>({
  theme: "",
  setTheme: () => {},
  toggleMode: () => {},
});

export const GlobalThemeContextProvider = ({ children }: ChildrenProps) => {
  const [theme, setTheme] = useState("dark");

  const toggleMode = () => {
    if (theme === "dark") setTheme("light");
    if (theme === "light") setTheme("dark");
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
