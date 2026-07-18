/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Inter'", "sans-serif"],
      },
      colors: {
        bone: {
          DEFAULT: "#FAF6F0",
          50: "#FEFDFB",
          100: "#F5EEE3",
          200: "#EDE2D0",
        },
      },
    },
  },
  plugins: [],
};
