/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#333333",
        secondary: "#626262",
        border: "#F2EEF4",
        white: "#ffffff",
      },
    },
  },
  plugins: [],
};
