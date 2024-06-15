"use client";
import { useGlobalThemeContext } from "../context/GlobalTheme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";

// We do this because we don't have a fontawesome pro subscription :sob:
const BrightnessIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-sun"
  >
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
);

const ThemeToggleButton = () => {
  const { theme, toggleMode } = useGlobalThemeContext();

  return (
    <button onClick={toggleMode} className="btn btn-circle flex">
      {theme === "dark" ? (
        <BrightnessIcon />
      ) : (
        <FontAwesomeIcon icon={faMoon} className="h-5 w-5" />
      )}
    </button>
  );
};

export default ThemeToggleButton;
