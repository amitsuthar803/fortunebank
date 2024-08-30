/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#000000",
        light: "#EAECDF",
        primary: "#c6ef4e",
        secondary: "#f6f7f7",
        primarylight: "#6E842B",
        gray: "#CDCEC9",
        primaryborder: "#99BC39",
        btn: "#E6E6DC",
      },
      fontFamily: {
        fortune: "clash display",
      },
    },
  },
  plugins: [],
};
