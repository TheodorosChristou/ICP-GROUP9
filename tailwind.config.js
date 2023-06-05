const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: "#1C64F2",
        "light-gray": "#E5E7EB",
        "very-light-gray": "#F9FAFB",
      },
      backgroundImage: {
        'pokemon-team': "url('/img/pokemon-team.png')",
        'pokemon-team2': "url('/img/pokemon-team7.png')",
      },
    },
  },
  plugins: [],
};
