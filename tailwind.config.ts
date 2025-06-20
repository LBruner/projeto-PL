import type {Config} from "tailwindcss";
const {heroui} = require("@heroui/react");

const config: Config = {

  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      typography: {
        // Customize the prose variant here
        'full': {
          css: {
            maxWidth: '100%', // Remove max-width
          },
        },
      },
      colors: {
        customGray: '#EAEAEA',
        customDarkBrown: '#E1AD7C',
        customDarkBg: '#040D12',
        customDarkNav: '#323232',
        customDarkFooter: '#18181B',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
            "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  darkMode: "class",
  plugins: [heroui(), require('@tailwindcss/typography')],
};
export default config;