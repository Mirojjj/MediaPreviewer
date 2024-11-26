/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        "dimblue-white": "#F6FBFF",
        "off-white": "#10b981",
        "light-purple": "#F6F5FC",
        "dark-gray": "#1f2937",
        "primary-blue": "#3361E0",
        "light-blue": "#1677FF",
      },
      borderColor: {
        "dark-purple": "#857CE2",
        "primary-blue": "#3361E0",
        "light-blue": "#1677FF",
      },
      textColor: {
        "dark-purple": "#857CE2",
        "primary-blue": "#3361E0",
        "light-blue": "#1677FF",
        "black-shade": "#383861",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
