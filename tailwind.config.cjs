/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

const fontFamily = require("tailwindcss/defaultTheme").fontFamily;

/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.tsx"],
  theme: {
    fontFamily: {
      sans: ["Sofia Pro", ...fontFamily.sans],
    },
    colors: {
      primary: "rgb(185,223,215)",
      secundary: "rgb(22,22,22)",
      tertiary: {
        1: "rgb(244,241,210)",
        2: "rgb(185,223,215)",
        3: "rgb(225,240,231)",
      },
      system: {
        info: "rgb(12,165,235)",
        danger: "rgb(255,115,115)",
        warn: "rgb(255,230,115)",
        success: "rgb(105,200,90)",
      },
    },
    extend: {},
  },
  plugins: [],
};
module.exports = config;
