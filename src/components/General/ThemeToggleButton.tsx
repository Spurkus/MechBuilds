"use client";
import { useGlobalThemeContext } from "@/src/context/GlobalTheme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";

// We do this because we don't have a fontawesome pro subscription :sob:
const BrightnessIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
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
    <button onClick={toggleMode} className="btn btn-circle btn-sm flex px-5 pb-10">
      <div className="mt-2.5">
        {theme === "dark" ? <BrightnessIcon /> : <FontAwesomeIcon icon={faMoon} size="xl" />}
      </div>
    </button>
  );
};

export default ThemeToggleButton;
