import type { Config } from "tailwindcss";
import type { PluginAPI } from "tailwindcss/types/config";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        clashgrotesk: ["ClashGrotesk", "sans-serif"],
        satoshi: ["Satoshi", "sans-serif"],
      },
      textShadow: {
        sm: "1px 1px 2px var(--tw-shadow-color)",
        DEFAULT: "2px 2px 4px var(--tw-shadow-color)",
        md: "3px 3px 6px var(--tw-shadow-color)",
        lg: "4px 4px 8px var(--tw-shadow-color)",
        xl: "4px 4px 16px var(--tw-shadow-color)",
      },
      colors: {
        "nav-text-contour": "var(--nav-text-contour)",
      },
    },
  },
  plugins: [
    function ({
      matchUtilities,
      theme,
    }: {
      matchUtilities: PluginAPI["matchUtilities"];
      theme: PluginAPI["theme"];
    }) {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") },
      );
    },
    require("daisyui"),
  ],
  daisyui: {
    themes: [
      {
        custom: {
          ".btn-nav-link": {
            "border-color": "transparent",
            "background-color": "transparent",
          },
          ".btn-nav-link:hover": {
            "border-color": "transparent",
            "background-color": "transparent",
          },
        },
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          "base-content": "rgb(225, 225, 225)",
        },
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          "--nav-text-contour": "rgba(28, 25, 23, 0.3)",
          "base-content": "rgb(50, 50, 50)",
        },
      },
    ],
  },
};

export default config;
