/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontSize: {
      heading: ["60px", "65px"],
      topic: ["50px", "55px"],
      namedrink: ["20px", "40px"],
      maintopic: ["30px", "40px"],
      base: ["20px", "30px"],
      mini: ["16px", "20px"],
    },
    extend: {
      fontFamily: {
        Roboto: ["var(--font-roboto)"],
        // mono: ['var(--font-roboto-mono)'],
      },
      colors: {
        bblack: ["#212325"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
