/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        skin: {
          pink: "#f327f2",
          softDark: "#171b26",
          white: "#fcfcfc",
        },
        darkBg: "#040b28",
        darkText: "#151515",
        dashboard: {
          "dark-purple": "#2c254a",
          "light-purple": "#3b3363",
          pink: "#c83ba1",
          softLight: "#cccccc",
        },
      },
    },
  },
  plugins: [
    // plugin(function ({ addBase, theme }) {
    //   addBase({
    //     body: {
    //       fontFamily: "BwGradual, sans-serif",
    //       fontWeight: "400",
    //       fontSize: "16px",
    //       lineHeight: "22px",
    //     },
    //   });
    // }),
  ],
};
