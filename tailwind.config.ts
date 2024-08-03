import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lit: "#83f52c"
      },
      spacing: {
        segmentWidth: "3.125rem",
        segmentHeight: ".625rem",
      }
    },
  },
  plugins: [],
  safelist: [
    {
      pattern: /top-+/
    },
    {
      pattern: /left-+/
    },
    { pattern: /rotate-+/ }
  ]
};
export default config;
