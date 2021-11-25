const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    colors: {
      // Build your palette here
      transparent: "transparent",
      current: "currentColor",
      bgray: colors.coolGray,
      gray: colors.gray,
      violet: colors.violet,
      blue: colors.sky,
      purple: colors.purple,
      black: colors.black,
      white: colors.white,
    },
    extend: {
      //TODO learn more about theme()
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.gray.900"),
            "h1,h2,h3,h4,h5,h6,p,div,td,th,li,ul": {
              color: theme("colors.gray.900"),
            },
            a: {
              color: theme("colors.blue.600"),
            },
            code: {
              color: theme("colors.violet.600"),
            },
            strong: {
              color: theme("colors.violet.900"),
            },
            input: {
              color: theme("colors.violet.900"),
            },
          },
        },
        dark: {
          css: {
            color: theme("colors.gray.100"),
            "h1,h2,h3,h4,h5,h6,p,div,td,th,li,ul": {
              color: theme("colors.gray.100"),
              a: {
                color: theme("colors.blue.600"),
              },
              code: {
                color: theme("colors.violet.300"),
              },
              strong: {
                color: theme("colors.violet.500"),
              },
              input: {
                color: theme("colors.violet.500"),
              },
            },
          },
        },
      }),
      fontFamily: {},
    },
  },
  variants: {
    extend: {
      typography: ["dark"],
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
